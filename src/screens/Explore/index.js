import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import images from '../../services/utilities/images';
import { styles } from './style';
import { colors, sizes } from '../../services';
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authToken';
import { getAllBarber, handleGetUserDetails } from '../../services/config/API';
import { ErrorShow } from '../../components/Error';
import { selectlocation, setLocation } from '../../store/location';
import { setBarber } from '../../store/barber';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { useFocusEffect } from '@react-navigation/native';
import formatToJSON from '../../services/config/FormatToJson';
import { socket, socketService } from '../../services/Socket';
import { selectUserData, setUserData } from '../../store/userData';
import ChatConponent from '../../components/ChatComponent';
import NotificationComponent from '../../components/NotificationComponent';
import Favourites from '../../components/FavouriteComponent';
import BarberLocation from '../../components/BarberLocationBox';

export default function Explore({ navigation }) {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const location = useSelector(selectlocation) || userData?.location;
  console.log('Location-=-=-=>', location);
  const [region, setRegion] = useState(null);
  const authToken = useSelector(selectAuthToken);
  const [loader, setLoader] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street ',
  );
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [barberData, setBarberdata] = useState([]);

  // useEffect(() => {
  //   const cleanup = socketService(dispatch, authToken, userData);

  //   return () => {
  //     cleanup();
  //   };
  // }, [userData]);

  let animation = React.createRef();

  useEffect(() => {
    animation.current?.play();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    handleGetAllBarber();
  }, []);

  const extractServiceData = data => {
    let servicesData = [];

    data?.forEach(barber => {
      if (barber.services) {
        barber.services.forEach(service => {
          const existingService = servicesData.find(
            s => s.name === service.name,
          );

          if (!existingService) {
            servicesData.push({
              name: service.name,
              icon: service.icon,
            });
          }
        });
      }
    });
    return servicesData;
  };

  const handleGetAllBarber = async () => {
    try {
      setLoader(true);
      const response = await getAllBarber(authToken);
      if (response?.status == 200) {
        const serviceData = await extractServiceData(response?.data?.barbers);
        setCategories(serviceData);
        setBarberdata(response?.data?.barbers);
        dispatch(setBarber(response?.data?.barbers));
        setLoader(false);
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      ErrorShow('error', 'Oops', response?.error?.message);
    }
  };
  const handleRunEveryTime = async () => {
    try {
      const response = await getAllBarber(authToken);
      if (response?.status == 200) {
        const serviceData = await extractServiceData(response?.data?.barbers);
        setCategories(serviceData);
        setBarberdata(response?.data?.barbers);
        dispatch(setBarber(response?.data?.barbers));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

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

  const getUserDetails = async () => {
    try {
      const response = await handleGetUserDetails(authToken);
      if (response?.status == 200) {
        console.log('userDetails in explore');
        dispatch(setUserData(response?.data?.userData));
      }
    } catch (error) {
      console.log('error in user details', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleRunEveryTime();
      getUserDetails();
    }, []),
  );

  const filteredBarbers = search
    ? (() => {
      const searchLower = search.toLowerCase();
      const filtered = barberData.filter(item =>
        item.name.toLowerCase().includes(searchLower),
      );
      return filtered.length > 0 ? filtered : null;
    })()
    : null;

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
      {loader ? (
        <View style={styles.laoderContainer}>
          <LottieView
            ref={animation}
            source={require('../../assestsAnimation/Flow4.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View style={styles.container}>
              <View style={styles.backgroundColor}>
                <ImageBackground
                  source={images.transparentBg}
                  resizeMode="contain"
                  style={styles.transparentBg}>
                  <View style={styles.topIconRow}>
                    <BarberLocation user={true} />
                    <View style={styles.otherIconRow}>
                      <Favourites />
                      <NotificationComponent />
                      <ChatConponent />
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
                      onChangeText={text => {
                        setSearch(text);
                      }}
                      style={styles.input}
                      placeholder="Search..."
                    />
                  </View>
                </ImageBackground>
              </View>
              <ScrollView style={styles.scrollContainer}>
                {filteredBarbers && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.cardRowNew}>
                      {filteredBarbers?.map((item, index) => {
                        const distance = calculateDistance(
                          location?.latitude,
                          location?.longitude,
                          item.location.latitude,
                          item.location.longitude,
                        );
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              navigation.navigate('BookAppointment', {
                                item,
                                tabName: 'About',
                              })
                            }>
                            <ImageBackground
                              source={item?.profile ? { uri: item?.profile } : item?.gender === "male" ? images.male : images.female}
                              imageStyle={styles.containerImage}
                              style={styles.containerImage}>
                              <View style={styles.row}>
                                <Text style={styles.textWhite}>
                                  {calculateAverageRating(item?.reviews)}
                                </Text>
                                <StarRating
                                  maxStars={1}
                                  starSize={12}
                                  color={colors.gold}
                                  rating={1}
                                />
                              </View>

                              <ImageBackground
                                source={images.bluredImg}
                                imageStyle={styles.bluredImg}
                                style={styles.bluredImg}>
                                <View style={styles.appointmentContainer}>
                                  <Text style={styles.textDarkerblack}>
                                    {item.name}
                                  </Text>
                                  <View style={styles.locationContainer}>
                                    <Image
                                      source={images.Location}
                                      resizeMode="contain"
                                      style={styles.locationImg}
                                    />
                                    <Text style={styles.textBlack}>
                                      {distance !== null && (
                                        <Text style={styles.textBlack}>
                                          {`${distance.toFixed(2)} km`}
                                        </Text>
                                      )}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    style={styles.bookBtn}
                                    onPress={() =>
                                      navigation.navigate('BookAppointment', {
                                        item,
                                        tabName: 'Services',
                                      })
                                    }>
                                    <Text style={styles.btnText}>
                                      Book Appointment
                                    </Text>
                                    <Image
                                      source={images.arrowIcon}
                                      resizeMode="contain"
                                      style={styles.arrowStyle}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </ImageBackground>
                            </ImageBackground>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                )}

                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                      latitude: location?.latitude,
                      longitude: location?.longitude,
                      latitudeDelta: 0.001,
                      longitudeDelta: 0.001,
                    }}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    showsUserLocation
                    showsCompass={true}>
                    {barberData?.map((item, index) => {
                      return (
                        <Marker
                          key={index}
                          coordinate={{
                            latitude: item?.location?.latitude,
                            longitude: item?.location?.longitude,
                          }}>
                          <ImageBackground
                            source={images.locationIcon}
                            style={styles.locationImgIcon}
                            resizeMode="contain">
                            <Image
                              source={item?.profile ? { uri: item?.profile } : item?.gender === "male" ? images.male : images.female}
                              style={styles.markerIngStyle}
                            />
                          </ImageBackground>
                        </Marker>
                      );
                    })}
                  </MapView>
                </View>
                <View style={styles.marginTop}>
                  {categories?.length > 0 && (
                    <Text style={styles.heading}>Categories</Text>
                  )}
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.categoryRow}>
                      {categories?.length > 0 &&
                        categories?.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={styles.categoryBox}
                              onPress={() =>
                                navigation.navigate('HaircutServices', {
                                  name: item?.name,
                                })
                              }>
                              <Image
                                source={{ uri: item?.icon }}
                                style={styles.imageResize}
                                resizeMode="contain"
                              />
                              <Text style={styles.categoryTxt}>
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                  </ScrollView>
                </View>
                <View style={styles.marginTop}>
                  <Text style={styles.heading}>Recommended</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View
                      style={
                        Platform.OS == 'android'
                          ? styles.cardRow
                          : styles.cardRowIOS
                      }>
                      {barberData?.map((item, index) => {
                        const distance = calculateDistance(
                          location?.latitude,
                          location?.longitude,
                          item.location.latitude,
                          item.location.longitude,
                        );
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              navigation.navigate('BookAppointment', {
                                item,
                                tabName: 'About',
                              })
                            }>
                            <ImageBackground
                              source={item?.profile ? { uri: item?.profile } : item?.gender === "male" ? images.male : images.female}
                              imageStyle={styles.containerImage}
                              style={styles.containerImage}>
                              <View style={styles.row}>
                                <Text style={styles.textWhite}>
                                  {calculateAverageRating(item?.reviews)}
                                </Text>
                                <StarRating
                                  maxStars={1}
                                  starSize={12}
                                  color={colors.gold}
                                  rating={1}
                                />
                              </View>

                              <ImageBackground
                                source={images.bluredImg}
                                imageStyle={styles.bluredImg}
                                style={styles.bluredImg}>
                                <View style={styles.appointmentContainer}>
                                  <Text style={styles.textDarkerblack}>
                                    {item.name}
                                  </Text>
                                  <View style={styles.locationContainer}>
                                    <Image
                                      source={images.Location}
                                      resizeMode="contain"
                                      style={styles.locationImg}
                                    />
                                    <Text style={styles.textBlack}>
                                      {distance !== null && (
                                        <Text style={styles.textBlack}>
                                          {`${distance.toFixed(2)} km`}
                                        </Text>
                                      )}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    style={styles.bookBtn}
                                    onPress={() =>
                                      navigation.navigate('BookAppointment', {
                                        item,
                                        tabName: 'Services',
                                      })
                                    }>
                                    <Text style={styles.btnText}>
                                      Book Appointment
                                    </Text>
                                    <Image
                                      source={images.arrowIcon}
                                      resizeMode="contain"
                                      style={styles.arrowStyle}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </ImageBackground>
                            </ImageBackground>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </ScrollView>
              <View style={Platform.OS == 'ios' && styles.paddingBtm} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}
