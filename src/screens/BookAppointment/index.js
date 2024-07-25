import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../store/userData/index.js';
import {selectAuthToken} from '../../store/authToken/index.js';
import {createChatRoom, getAllBarber} from '../../services/config/API/index.js';
import {selectbarber, setBarber} from '../../store/barber/index.js';
import {useFocusEffect} from '@react-navigation/native';

export default function BookAppointment({navigation, route}) {
  const barbarId = route?.params?.item._id;
  const allBarbers = useSelector(selectbarber);
  const dispatch = useDispatch();
  const barbar = allBarbers?.find(barber => barber?._id === barbarId);
  // console.log(barbar);
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const [services, setServices] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [barberReviews, setBarberReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  // console.log('==========', userReview, '==========', barberReviews);
  const [rating, setRatings] = useState([
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
  ]);

  const [tab, setTabs] = useState('About');
  const [status, setStatus] = useState(null);

  const handleGoback = () => {
    navigation.goBack();
  };

  const handleGetAllBarber = async () => {
    try {
      const response = await getAllBarber(authToken);
      if (response?.status == 200) {
        dispatch(setBarber(response?.data?.barbers));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetAllBarber();
    }, []),
  );
  useEffect(() => {
    setServices(barbar?.services);
    handleStatus(barbar.time);
    findChat();
  }, [barbar]);

  const findChat = async () => {
    try {
      const isChat = await findChatInRedux();
      console.log('isChat', isChat);
      if (!isChat) {
        const body = {
          user: userData?._id,
          barber: barbar?._id,
        };
        console.log('api hit hog i chat room baner g');
        const response = await createChatRoom(authToken, body);
        console.log(response?.status, response?.data?.message);
        if (response?.status == 201) {
          setChatRoomId(response?.data?.newChat?._id);
        } else {
          setChatRoomId(null);
          console.log(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findChatInRedux = async () => {
    const name = barbar?._id + userData?._id;
    const name2 = userData?._id + barbar?._id;
    const chat = await userData?.chat?.find(
      chat => chat.name === name || chat.name === name2,
    );
    if (chat) {
      setChatRoomId(chat?._id);
      return true;
    } else {
      setChatRoomId(null);
      return false;
    }
  };

  const handleStatus = openHours => {
    const [startTime, endTime] = openHours.split(' - ');
    const currentTime = moment();
    const openTime = moment(startTime, 'hh:mm A');
    let closeTime = moment(endTime, 'hh:mm A');
    if (closeTime.isBefore(openTime)) {
      closeTime.add(1, 'day');
    }
    if (
      currentTime.isBetween(openTime, closeTime) ||
      currentTime.isSame(openTime)
    ) {
      setStatus('open');
    } else {
      setStatus('close');
    }
  };

  const handleNavigateToChat = async () => {
    if (chatRoomId) {
      navigation.navigate('ChatDetails', {chatRoomId});
    } else {
      ToastAndroid.show(
        'Something wents wrong, Please try again',
        ToastAndroid.LONG,
      );
    }
  };

  useEffect(() => {
    if (barbar && userData) {
      setReviews(barbar.reviews, userData._id);
    }
  }, [barbar, userData]);

  const setReviews = (reviews, userId) => {
    if (reviews && userId) {
      const sortedReviews = [...reviews].sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt)),
      );

      const userReview = sortedReviews.find(
        review => review.userData._id === userId,
      );

      if (userReview) {
        const filteredReviews = sortedReviews.filter(
          review => review._id !== userReview._id,
        );
        setBarberReviews([userReview, ...filteredReviews]);
      } else {
        setBarberReviews(sortedReviews);
      }

      setUserReview(userReview || null);
    }
  };

  const formatCreatedAt = dateString => {
    return moment(dateString).format('DD MMMM YYYY');
  };

  const calculateAverageRating = reviews => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + parseFloat(review.rating),
        0,
      );
      return totalRating / reviews.length;
    } else {
      return 0;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          imageStyle={styles.headerImage}
          source={{uri: barbar?.profile}}
          // style={}
        >
          <View style={styles.headerContainer}>
            <View style={styles.arrowTop}>
              <BackArrow light={true} onPress={handleGoback} />
            </View>
            <View style={styles.openButtonborder}>
              <ImageBackground
                style={styles.openBg}
                source={images.openBg}
                resizeMode="cover">
                <Text style={styles.openButton}>{status}</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.centerContent}>
            <View style={styles.barberDetailscontainer}>
              <View style={styles.alignedDetails}>
                <Text style={styles.barberName}>{barbar?.name}</Text>
                <View style={styles.row}>
                  <Image
                    source={images.redLocation}
                    resizeMode="contain"
                    style={styles.redLocation}
                  />
                  <Text style={styles.barberLocation}>
                    Royal Ln. Mesa, New Jersey
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.containBookmark}>
                <Image
                  source={images.Bookmark}
                  resizeMode="contain"
                  style={styles.bookmark}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.todoButtonscontainer}>
          <View style={styles.call}>
            <TouchableOpacity
              style={styles.btnColor}
              onPress={() => navigation.navigate('BarberDirection', {barbar})}>
              <Image
                style={styles.direction}
                source={images.direction}
                resizeMode="contain"
              />
              <Text style={styles.btnText}>Direction</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.btnColor}
              onPress={handleNavigateToChat}>
              <Image
                style={styles.direction}
                source={images.Send}
                resizeMode="contain"
              />
              <Text style={styles.btnText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setTabs('About')}>
            <View style={tab === 'About' ? styles.borderBottom : null}>
              <Text style={styles.tabs}>About</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabs('Services')}>
            <View style={tab === 'Services' ? styles.borderBottom : null}>
              <Text style={styles.tabs}>Services</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabs('Reviews')}>
            <View style={tab === 'Reviews' ? styles.borderBottom : null}>
              <Text style={styles.tabs}>Reviews</Text>
            </View>
          </TouchableOpacity>
        </View>
        {tab === 'About' ? (
          <View>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.aboutContent}>{barbar?.description}</Text>
            </ScrollView>
            <View style={styles.btn}>
              <Button
                title={'Book Appointment'}
                onPress={() => {
                  // navigation.navigate('BookingProcess')
                  setTabs('Services');
                }}
              />
            </View>
          </View>
        ) : tab === 'Services' ? (
          <ScrollView>
            {services?.length > 0 &&
              services?.map((item, index) => (
                <View key={index}>
                  <View style={styles.servicesContainer}>
                    <View style={styles.serviceImagecontainer}>
                      <Image
                        source={{uri: item?.icon}}
                        style={styles.serviceImageresize}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.flexCol}>
                      <Text style={styles.title}>{item?.name}</Text>
                      <View style={styles.descriptionExtended}>
                        <Text style={styles.description} numberOfLines={2}>
                          {item.description}
                        </Text>
                        {/* <Text style={styles.serviceTime}>2h</Text> */}
                      </View>
                    </View>
                    <View style={styles.endContainer}>
                      <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() =>
                          navigation.navigate('ServiceDetails', {item})
                        }>
                        <Text style={styles.bookWhite}>Book</Text>
                      </TouchableOpacity>
                      {/* <Text style={styles.title}>{item.Price}</Text> */}
                    </View>
                  </View>
                </View>
              ))}
            <View
              style={{
                paddingBottom:
                  Platform.OS == 'android'
                    ? sizes.screenHeight * 0.04
                    : sizes.screenHeight * 0.09,
              }}></View>
          </ScrollView>
        ) : tab === 'Reviews' ? (
          <View style={styles.reviewContainer}>
            <ScrollView
              style={{
                marginTop: sizes.screenHeight * 0.014,
                paddingBottom: sizes.screenHeight * 0.162,
              }}>
              <View style={styles.row3}>
                <View>
                  <View style={styles.row2}>
                    <Text style={styles.starNumber}>
                      {calculateAverageRating(barberReviews)}
                    </Text>
                    <StarRatingDisplay
                      rating={calculateAverageRating(barberReviews)}
                      color={colors.gold}
                      emptyColor={colors.emptyStar}
                      starSize={20}
                      starStyle={styles.startContainer}
                    />
                  </View>

                  <Text style={styles.disabledText}>
                    {barberReviews ? barberReviews?.length : 0} Reviews
                  </Text>
                </View>
                <View>
                  {tab === 'Reviews' ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Review', {barbar});
                      }}
                      style={styles.reviewBtn}>
                      <Image source={images.pencil} style={styles.pencil} />
                      {userReview ? (
                        <Text style={styles.reviewBtnText}>Edit review</Text>
                      ) : (
                        <Text style={styles.reviewBtnText}>Write a review</Text>
                      )}
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>

              {barberReviews.map((item, index) => (
                <View key={index} style={styles.ratingContainer}>
                  <View style={styles.ratingData}>
                    <View style={styles.rowAndmargin}>
                      <Image
                        source={{uri: item?.userData?.profile}}
                        style={styles.profilePic}
                      />
                      <View style={styles.alignItems}>
                        <Text style={styles.usernameAllignment}>
                          {item?.userData?.name}
                        </Text>
                        <Text style={styles.time}>
                          {formatCreatedAt(item?.createdAt)}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <StarRatingDisplay
                        rating={item?.rating}
                        color={colors.gold}
                        starSize={20}
                        starStyle={styles.startContainer}
                        // style={styles.startContainer}
                      />
                    </View>
                  </View>
                  <Text style={styles.descriptionContainer}>
                    {item?.comment}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  paddingBottom:
                    Platform.OS == 'android'
                      ? sizes.screenHeight * 0.71
                      : sizes.screenHeight * 0.73,
                }}></View>
            </ScrollView>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
