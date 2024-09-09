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
import React, { useCallback, useEffect, useState } from 'react';
import { styles } from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { colors, sizes } from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavouritesRedux,
  selectUserData,
} from '../../store/userData/index.js';
import { selectAuthToken } from '../../store/authToken/index.js';
import {
  addFavourite,
  createChatRoom,
  getAddressFromCoordinates,
  getAllBarber,
} from '../../services/config/API/index.js';
import { selectbarber, setBarber } from '../../store/barber/index.js';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ErrorShow } from '../../components/Error/index.js';
import { ActivityIndicator } from 'react-native-paper';
import { Linking } from 'react-native';

export default function BookAppointment({ navigation, route }) {
  const barbarId = route?.params?.item._id;
  const tabName = route?.params?.tabName;
  const allBarbers = useSelector(selectbarber);
  const dispatch = useDispatch();
  const barbar = allBarbers?.find(barber => barber?._id === barbarId);
  // console.log(barbar);
  const userData = useSelector(selectUserData);
  console.log('favourites', userData?.favourites?.length);

  const authToken = useSelector(selectAuthToken);
  const [services, setServices] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [barberReviews, setBarberReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [fav, setFav] = useState();
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState(null);
  const [locationLoader, setLocationLoader] = useState(false);

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

  useEffect(() => {
    if (tabName) {
      setTabs(tabName);
    }
  }, [route.params]);

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
      navigation.navigate('ChatDetails', { chatRoomId });
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

  const handleAddFavourites = async () => {
    try {
      setLoader(true);
      const body = { barberId: barbar?._id };
      const response = await addFavourite(authToken, body);
      console.log(response?.data);
      if (response?.data?.success) {
        dispatch(addFavouritesRedux(barbar));
        ErrorShow('success', 'Congratulation!', response?.data?.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    const isFavourite = userData?.favourites?.some(
      fav => fav._id === barbar._id,
    );
    setFav(isFavourite);
  }, [userData, barbar._id]);

  const dialNumber = phoneNumber => {
    let phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(err =>
      console.error('Error in opening dial pad', err),
    );
  };

  const getAddress = async (latitude, longitude) => {
    setLocationLoader(true);
    try {
      const response = await getAddressFromCoordinates(latitude, longitude);
      setAddress(response);
      setLocationLoader(false);
    } catch (error) {
      console.log(error);
      setLocationLoader(false);
    }
  };

  useEffect(() => {
    getAddress(barbar?.location?.latitude, barbar?.location?.longitude);
  }, []);

  const handleNavigateToInstagram = async (instagramUrl) => {
    try {
      const supported = await Linking.canOpenURL(instagramUrl);
      if (supported) {
        await Linking.openURL(instagramUrl);
      } else {
        await Linking.openURL(instagramUrl);
      }
    } catch (error) {
      ToastAndroid.show(
        'Something went wrong, please try again.',
        ToastAndroid.LONG,
      );
      console.error("Error opening Instagram URL:", error);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={styles.headerImage}
        // source={{ uri: barbar?.businessProfile }}
        >
          <View style={styles.headerContainer}>
            <BackArrow light={false} onPress={handleGoback} />
            <TouchableOpacity
              source={images.bookMarkedConatiner}
              style={
                fav ? styles.bookMarkedConatiner2 : styles.bookMarkedConatiner
              }
              onPress={() => {
                if (!loader) {
                  handleAddFavourites();
                }
              }}>
              {loader ? (
                <ActivityIndicator
                  size={22}
                  color={fav ? '#00000088' : colors.disabledBg}
                />
              ) : (
                <Image
                  source={fav ? images.Bookmark : images.bookMarkedFalse}
                  style={styles.bookMarkedFalse}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.centerContent}>
            <View style={styles.alignedDetails}>
              <View style={styles.maleContainer}>
                <Image
                  source={
                    barbar?.profile
                      ? { uri: barbar?.profile }
                      : barbar?.gender === 'male'
                        ? images.male
                        : images.female
                  }
                  style={styles.male}
                />
              </View>
              <View style={styles.barberNameContainer}>
                <Text style={styles.barberName}>{barbar?.name}</Text>
              </View>
              {
                locationLoader ?
                  <ActivityIndicator size={15} color={colors.black} />
                  :
                  <View style={styles.row}>
                    <Image
                      source={images.redLocation}
                      resizeMode="contain"
                      style={styles.redLocation}
                    />
                    <Text style={styles.barberLocation}>
                      {address ? `${address}.` : 'Location'}
                    </Text>
                  </View>
              }
            </View>
          </View>
        </View>
        <View style={styles.todoButtonscontainer}>
          <View style={styles.btnColorContainer}>
            <TouchableOpacity
              style={styles.btnColor}
              onPress={() => navigation.navigate('BarberDirection', { barbar })}>
              <Image
                style={styles.direction}
                source={images.direction}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Direction</Text>
          </View>

          <View style={styles.devider}></View>
          <View style={styles.btnColorContainer}>
            <TouchableOpacity
              style={styles.btnColor}
              onPress={() => {
                dialNumber(barbar.phone);
              }}>
              <Image
                style={styles.direction}
                source={images.redCall}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Call</Text>
          </View>
          <View style={styles.devider}></View>
          <View style={styles.btnColorContainer}>
            <TouchableOpacity
              style={styles.btnColor}
              onPress={handleNavigateToChat}>
              <Image
                style={styles.direction}
                source={images.Send}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Message</Text>
          </View>
          <View style={styles.devider}></View>
          <View style={styles.btnColorContainer}>
            <TouchableOpacity
              style={styles.btnColor}
              onPress={() => handleNavigateToInstagram(barbar?.instagram)}
            >
              <Image
                style={styles.direction}
                source={images.instagram}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Instagram</Text>
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
            <View style={Platform.OS == 'android' ? styles.btn : styles.btnIOS}>
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
                        source={{ uri: item?.icon }}
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
                          navigation.navigate('ServiceDetails', { item })
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
                        navigation.navigate('Review', { barbar });
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
                        source={{ uri: item?.userData?.profile }}
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
        <Toast />
      </View>
    </SafeAreaView>
  );
}