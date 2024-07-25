import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import * as Progress from 'react-native-progress';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {useDispatch, useSelector} from 'react-redux';
import {setLocation} from '../../store/location';
import {socket, socketService} from '../../services/Socket';
import {selectUserData, setUserData} from '../../store/userData';
import {selectAuthToken} from '../../store/authToken';
import formatToJSON from '../../services/config/FormatToJson';
import ChatConponent from '../../components/ChatComponent';
import moment from 'moment';
import {handleGetUserDetails} from '../../services/config/API';
import {useFocusEffect} from '@react-navigation/native';
import NotificationComponent from '../../components/NotificationComponent';

export default function BarberDashboard({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);

  const [numberOfCompletedAppointments, setNumberOfCompletedAppointments] =
    useState(0);
  const [numberOfPendingAppointments, setNumberOfPendingAppointments] =
    useState(0);

  const [appointmentDone, setAppointmentDone] = useState('03');
  const [appointmentCancelled, setAppointmentCancelled] = useState('03');
  const [profitAmount, setProfitAmount] = useState('1,760.00');
  const [profitPercent, setProfitPercent] = useState('10%');
  const [lossAmount, setLossAmount] = useState('1,760.00');
  const [lossPercent, setLossPercent] = useState('10%');
  const [region, setRegion] = useState(null);
  const [barberReviews, setBarberReviews] = useState([]);

  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );

  const [totalRating, setTotalRating] = useState([
    {
      star: '5',
    },
    {
      star: '4',
    },
    {
      star: '3',
    },
    {
      star: '2',
    },
    {
      star: '1',
    },
  ]);


  const formatDateShort = dateString => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return '';
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;
    const year = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day);
    const options = {month: 'short', day: 'numeric'};

    return dateObj.toLocaleDateString('en-US', options);
  };

  const calculateTotalAmount = services => {
    return services.reduce(
      (total, service) => total + parseFloat(service.price),
      0,
    );
  };

  const filterAndSetAppointments = appointments => {
    const completedAppointments = appointments.filter(
      appointment => appointment?.status.toLowerCase() === 'completed',
    );
    const pendingAppointments = appointments.filter(
      appointment => appointment?.status.toLowerCase() === 'pending',
    );

    setNumberOfCompletedAppointments(completedAppointments.length);
    setNumberOfPendingAppointments(pendingAppointments.length);
  };

  useEffect(() => {
    if (userData?.appoinment) {
      filterAndSetAppointments(userData?.appoinment);
    }
    if (userData?.reviews) {
      const sortedReviews = [...userData.reviews].sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt)),
      );
      setBarberReviews(sortedReviews);
    }
  }, [userData]);

  useFocusEffect(
    useCallback(() => {
      getBarberDetails();
    }, []),
  );

  const getBarberDetails = async () => {
    try {
      const response = await handleGetUserDetails(authToken);
      if (response?.status == 200) {
        console.log('get barber details');
        dispatch(setUserData(response?.data?.userData));
      }
    } catch (error) {
      console.log('error in barber details', error);
    }
  };

  const formatDate = createdAt => {
    return moment(createdAt).format('DD MMMM YYYY');
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

  const calculateStarPercentage = (barberReviews, numberOfStars) => {
    if (!barberReviews || barberReviews.length === 0) {
      return 0;
    }

    const totalReviews = barberReviews.length;
    const matchingReviews = barberReviews.filter(
      review => Number(review.rating) == numberOfStars,
    ).length;

    const percentage = (matchingReviews / totalReviews) * 100;
    return percentage.toFixed(1);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backgroundColor}>
          <ImageBackground
            source={images.transparentBg}
            resizeMode="contain"
            style={styles.transparentBg}>
            <View style={styles.topIconRow}>
              <View
                style={styles.locationRow}
              >
                <View style={styles.locationContainertop}>
                  <Image style={styles.iconImage} source={images.redLocation} />
                </View>
                <View style={styles.locationDetailColumn}>
                  <Text style={styles.nearbyTxt}>Barber’s Location</Text>
                  <Text style={styles.currentLocationTxt}>
                    {currentLocation}
                  </Text>
                </View>
              </View>
              <View style={styles.otherIconRow}>
                <NotificationComponent />
                <ChatConponent />
              </View>
            </View>
          </ImageBackground>
        </View>
        <ScrollView
          style={styles.ScrollViewContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerBody}>
            <View style={styles.detailRow}>
              <View style={styles.detailContainer}>
                <Image style={styles.boxImg} source={images.appointment} />
                <View>
                  <Text style={styles.appoitmentNumberTxt}>
                    {numberOfCompletedAppointments}
                  </Text>
                  <Text style={styles.detailTxt}>Completed Appointments</Text>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <Image style={styles.boxImg} source={images.appointment} />
                <View>
                  <Text style={styles.appoitmentNumberTxt}>
                    {numberOfPendingAppointments}
                  </Text>
                  <Text style={styles.detailTxt}>Pending Appointments</Text>
                </View>
              </View>
            </View>
            {userData.appoinment?.length == 0 ? (
              <View style={styles.noAppointmentMainView}>
                <Image
                  source={images.noAppointment}
                  style={styles.appointmentStyle}
                />
                <Text style={styles.appointmentText}>
                  You have no scheduled appointments at this moment.
                </Text>
              </View>
            ) : (
              <View style={{marginBottom: 15}}>
                <View style={styles.appointmentBtn}>
                  <Text style={styles.headingSummary}>Appointments</Text>
                  <TouchableOpacity
                    style={styles.viewAllBtn}
                    onPress={() => navigation.navigate('AppoinmentBarber')}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Image
                      style={styles.arrowImage}
                      source={images.rightArrowRed}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.lastServicesContainer}>
                  <View style={styles.rowThree}>
                    <Text style={styles.serviceHeading}>Service</Text>
                    <Text style={styles.priceHeading}>Price</Text>
                    <Text style={styles.dateHeading}>Date & Time</Text>
                    <Text style={styles.statusHeading}>Status</Text>
                  </View>
                  {userData?.appoinment?.slice(0, 4).map((item, index) => {
                    return (
                      <View key={index} style={styles.serviceDetailRow}>
                        <Text style={styles.serviceHeading}>
                          {item?.services[0]?.serviceName}
                        </Text>
                        <Text style={styles.priceHeadingTwo}>
                          ${calculateTotalAmount(item?.services)}
                        </Text>
                        <View>
                          <Text style={styles.dateHeadingTwo}>
                            {formatDateShort(item?.date)}
                          </Text>
                          <Text style={styles.timeHeading}>{item?.time}</Text>
                        </View>
                        <Text
                          style={
                            Platform.OS == 'android'
                              ? styles.statusHeadingTwo
                              : styles.statusHeadingTwoIOS
                          }>
                          {item?.status}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {barberReviews?.length > 0 ? (
              <>
                <View style={styles.rowFour}>
                  <Text style={styles.reviewHeading}>Reviews</Text>
                  <TouchableOpacity
                    style={styles.viewAllBtn}
                    onPress={() => navigation.navigate('Reviews')}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Image
                      style={styles.arrowImage}
                      source={images.rightArrowRed}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.reviewContainer}>
                  <View style={styles.reviewInsideContainer}>
                    <Text style={styles.ratingNumber}>
                      {calculateAverageRating(barberReviews)}
                    </Text>
                    <StarRatingDisplay
                      rating={calculateAverageRating(barberReviews)}
                      color={colors.gold}
                      emptyColor={colors.emptyStar}
                      starSize={sizes.screenHeight * 0.025}
                      starStyle={styles.startContainer}
                    />
                    <Text style={styles.totalReview}>
                      {barberReviews?.length} Reviews
                    </Text>
                  </View>
                  <View style={styles.reviewBarContainer}>
                    {totalRating.map((item, index) => (
                      <View style={styles.reviewBarRow} key={index}>
                        <Text style={styles.ratingGoldenText}>{item.star}</Text>
                        <Image source={images.star} style={styles.starImage} />
                        <Progress.Bar
                          width={sizes.screenWidth * 0.28}
                          unfilledColor={colors.white}
                          borderColor={colors.white}
                          color={colors.goldText}
                          progress={
                            calculateStarPercentage(
                              userData?.reviews,
                              item?.star,
                            ) / 100
                          }
                          height={sizes.screenHeight * 0.006}
                        />
                        <Text style={styles.percentGoldenText}>
                          {calculateStarPercentage(
                            userData?.reviews,
                            item?.star,
                          )}{' '}
                          %
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                {barberReviews?.map((item, index) => (
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
                            {formatDate(item?.createdAt)}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <StarRatingDisplay
                          rating={item?.rating}
                          color={colors.gold}
                          starSize={sizes.screenHeight * 0.025}
                          starStyle={styles.startContainer}
                        />
                      </View>
                    </View>
                    <Text style={styles.descriptionContainer}>
                      {item?.comment}
                    </Text>
                  </View>
                ))}
              </>
            ) : null}
          </View>
        </ScrollView>
        <View style={Platform.OS == 'ios' && styles.paddingBtm} />
      </View>
    </SafeAreaView>
  );
}
