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
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style';
import images from '../../services/utilities/images';
import { colors, sizes } from '../../services';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import * as Progress from 'react-native-progress';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../store/location';
import { socket, socketService } from "../../services/Socket"
import { selectUserData } from '../../store/userData';
import { selectAuthToken } from '../../store/authToken';

export default function BarberDashboard({ navigation }) {

  const dispatch = useDispatch()
  const userData = useSelector(selectUserData)
  const authToken = useSelector(selectAuthToken)

  const [appointmentDone, setAppointmentDone] = useState('03');
  const [appointmentCancelled, setAppointmentCancelled] = useState('03');
  const [profitAmount, setProfitAmount] = useState('1,760.00');
  const [profitPercent, setProfitPercent] = useState('10%');
  const [lossAmount, setLossAmount] = useState('1,760.00');
  const [lossPercent, setLossPercent] = useState('10%');
  const [region, setRegion] = useState(null);

  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );

  const [lastServices, setLastServices] = useState([
    {
      serviceName: 'Haircut',
      price: '25.0',
      date: 'Oct 30',
      time: '10:00 AM',
      status: 'Done',
    },
    {
      serviceName: 'Haircut',
      price: '25.0',
      date: 'Oct 30',
      time: '10:00 AM',
      status: 'Done',
    },
    {
      serviceName: 'Beard',
      price: '25.0',
      date: 'Oct 30',
      time: '10:00 AM',
      status: 'Cancelled',
    },
    {
      serviceName: 'Beard',
      price: '25.0',
      date: 'Oct 30',
      time: '10:00 AM',
      status: 'Cancelled',
    },
  ]);

  const [totalRating, setTotalRating] = useState([
    {
      star: '5',
      progress: '0.64',
      percentage: '64',
    },
    {
      star: '4',
      progress: '0.24',
      percentage: '24',
    },
    {
      star: '3',
      progress: '0.1',
      percentage: '10',
    },
    {
      star: '2',
      progress: '0.02',
      percentage: '2',
    },
    {
      star: '1',
      progress: '0.0',
      percentage: '0',
    },
  ]);
  const [rating, setRatings] = useState([
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '5',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '4',
    },
  ]);

  useEffect(() => {
    const cleanup = socketService(dispatch, authToken, userData)

    return () => {
      cleanup()
    }
  }, [userData])

  useEffect(() => {
    const initializeLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        checkLocationServices()
          .then(() => {
            getCurrentLocation(setRegion, dispatch);
          })
          .catch(error => {
            console.log('Location services not enabled', error.message);
            Alert.alert(
              'Location Services Disabled',
              'Please enable location services to use this feature.',
            );
          });
      }
    };

    initializeLocation();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to show your current position on the map.',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else {
          console.log('Location permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const checkLocationServices = () => {
    return LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        '<h2>Use Location?</h2> This app wants to change your device settings:<br/><br/>Use GPS for location<br/><br/>',
      ok: 'YES',
      cancel: 'NO',
    });
  };

  const getCurrentLocation = (setRegion, dispatch) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // console.log(
        //   position.coords,
        //   '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        // );
        const locationObj = {
          latitude,
          longitude,
        };
        dispatch(setLocation(locationObj));
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => {
        console.log('Error getting location: ', error.message);
        Alert.alert(
          'Error',
          'Unable to retrieve your location. Please try again.',
        );
      },
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000},
    );
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
              <TouchableOpacity
                style={styles.locationRow}
              // onPress={() => navigation.navigate('WholeMap')}
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
              </TouchableOpacity>
              <View style={styles.otherIconRow}>
                <TouchableOpacity
                  style={styles.notificationContainer}
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}>
                  <Image
                    style={styles.iconImage}
                    source={images.notification}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationContainer}
                  onPress={() => {
                    navigation.navigate('Chats');
                  }}>
                  <Image style={styles.iconImage} source={images.chat} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Image
                source={images.search}
                resizeMode="contain"
                style={styles.search}
              />
              <TextInput
                placeholderTextColor={colors.placeholdertextgray}
                style={styles.input}
                placeholder="Search..."
              />
            </View>
          </ImageBackground>
        </View>
        <ScrollView style={styles.ScrollViewContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.containerBody}>
            <View style={styles.detailRow}>
              <View style={styles.detailContainer}>
                <Image style={styles.boxImg} source={images.appointment} />
                <View>
                  <Text style={styles.appoitmentNumberTxt}>
                    {appointmentDone}
                  </Text>
                  <Text style={styles.detailTxt}>Done Appointments</Text>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <Image style={styles.boxImg} source={images.appointment} />
                <View>
                  <Text style={styles.appoitmentNumberTxt}>
                    {appointmentCancelled}
                  </Text>
                  <Text style={styles.detailTxt}>Cancelled Appointments</Text>
                </View>
              </View>
            </View>
            <Text style={styles.headingSummary}>Last Services</Text>
            <View style={styles.lastServicesContainer}>
              <View style={styles.rowThree}>
                <Text style={styles.serviceHeading}>Service</Text>
                <Text style={styles.priceHeading}>Price</Text>
                <Text style={styles.dateHeading}>Date & Time</Text>
                <Text style={styles.statusHeading}>Status</Text>
              </View>
              <ScrollView>
                {lastServices.map((item, index) => (
                  <View key={index} style={styles.serviceDetailRow}>
                    <Text style={styles.serviceHeading}>
                      {item.serviceName}
                    </Text>
                    <Text style={styles.priceHeadingTwo}>${item.price}</Text>
                    <View>
                      <Text style={styles.dateHeadingTwo}>{item.date}</Text>
                      <Text style={styles.timeHeading}>{item.time}</Text>
                    </View>
                    <Text style={Platform.OS == 'android' ? styles.statusHeadingTwo : styles.statusHeadingTwoIOS}>{item.status}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
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
                <Text style={styles.ratingNumber}>4.0</Text>
                <StarRatingDisplay
                  rating={4}
                  color={colors.gold}
                  emptyColor={colors.emptyStar}
                  starSize={sizes.screenHeight * 0.025}
                  starStyle={styles.startContainer}
                />
                <Text style={styles.totalReview}>783 Reviews</Text>
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
                      progress={parseFloat(item.progress)}
                      height={sizes.screenHeight * 0.006}
                    />
                    <Text style={styles.percentGoldenText}>
                      {item.percentage} %
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            {rating.map((item, index) => (
              <View key={index} style={styles.ratingContainer}>
                <View style={styles.ratingData}>
                  <View style={styles.rowAndmargin}>
                    <Image source={item.profilePic} style={styles.profilePic} />
                    <View style={styles.alignItems}>
                      <Text style={styles.usernameAllignment}>
                        {item.username}
                      </Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                  <View>
                    <StarRatingDisplay
                      rating={item.rating}
                      color={colors.gold}
                      starSize={sizes.screenHeight * 0.025}
                      starStyle={styles.startContainer}
                    />
                  </View>
                </View>
                <Text style={styles.descriptionContainer}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={Platform.OS == 'ios' && styles.paddingBtm} />
      </View>
    </SafeAreaView>
  );
}
