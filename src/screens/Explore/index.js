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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style';
import {colors, sizes} from '../../services';
import MapView, {Marker} from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authToken';
import {getAllBarber} from '../../services/config/API';
import {ErrorShow} from '../../components/Error';
import {selectlocation, setLocation} from '../../store/location';
import {setBarber} from '../../store/barber';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import formatToJSON from '../../services/config/FormatToJson';

export default function Explore({navigation}) {
  const dispatch = useDispatch();
  const location = useSelector(selectlocation);
  // console.log(location);
  const [region, setRegion] = useState(null);
  const authToken = useSelector(selectAuthToken);
  const [loader, setLoader] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );

  const [categories, setCategories] = useState([]);
  const [barberData, setBarberdata] = useState([]);

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

    // Loop through each barber's data
    data?.forEach(barber => {
      if (barber.services) {
        // Loop through each service of the current barber
        barber.services.forEach(service => {
          // Check if the service name already exists in servicesData
          const existingService = servicesData.find(
            s => s.name === service.name,
          );

          // If service name does not exist in servicesData, add it
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
    // setCategories(servicesData);
  };

  const handleGetAllBarber = async () => {
    try {
      setLoader(true);
      const response = await getAllBarber(authToken);
      // console.log(formatToJSON(response.data));
      // console.log(response.data);
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
        const {latitude, longitude} = position.coords;
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
      {loader ? (
        <View style={styles.laoderContainer}>
          <LottieView
            ref={animation}
            source={require('../../assestsAnimation/Flow3.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.backgroundColor}>
            <ImageBackground
              source={images.transparentBg}
              resizeMode="contain"
              style={styles.transparentBg}>
              <View style={styles.topIconRow}>
                <TouchableOpacity
                  style={styles.locationRow}
                  onPress={() => navigation.navigate('WholeMap')}>
                  <View style={styles.locationContainertop}>
                    <Image
                      style={styles.iconImage}
                      source={images.redLocation}
                    />
                  </View>
                  <View style={styles.locationDetailColumn}>
                    <Text style={styles.nearbyTxt}>Find barber near</Text>
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
                  <TouchableOpacity
                    style={styles.notificationContainer}
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
          <ScrollView style={styles.scrollContainer}>
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
                      }}
                      // onPress={() => handleSelectBarber(item)}
                    >
                      <ImageBackground
                        source={images.locationIcon}
                        style={styles.locationImgIcon}
                        resizeMode="contain">
                        <Image
                          source={{uri: item.profile}}
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
                              name: item.name,
                            })
                          }>
                          <Image
                            source={{uri: item?.icon}}
                            style={styles.imageResize}
                            resizeMode="contain"
                          />
                          <Text style={styles.categoryTxt}>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </ScrollView>
            </View>
            <View style={styles.marginTop}>
              <Text style={styles.heading}>Recommended</Text>
              <ScrollView horizontal>
                <View style={styles.cardRow}>
                  {/* {barberData.map((item, index) => (
                   
                  ))} */}
                  {barberData?.map((item, index) => {
                    // const distance = location
                    //   ? calculateDistance(location, item.location)
                    //   : null;
                    const distance = calculateDistance(
                      location?.latitude,
                      location?.longitude,
                      item.location.latitude,
                      item.location.longitude,
                    );
                    // console.log('barbar k items hain yeh',item.profile);
                    return (
                      <ImageBackground
                        key={index}
                        source={{uri: item.profile}}
                        imageStyle={styles.containerImage}
                        // style={}
                      >
                        <View style={styles.row}>
                          <Text style={styles.textWhite}>5.0</Text>
                          <StarRating
                            maxStars={1}
                            starSize={12}
                            color={colors.gold}
                            rating={1}
                          />
                        </View>
                        <View style={styles.marginCardtop}>
                          <ImageBackground
                            source={images.bluredImg}
                            imageStyle={styles.bluredImg}>
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
                                  {/* {`Lat: ${item.location.latitude}, Long: ${item.location.longitude}`} */}
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
                                  navigation.navigate('BookAppointment', {item})
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
                        </View>
                      </ImageBackground>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
          <View style={Platform.OS == 'ios' && styles.paddingBtm} />
        </View>
      )}
    </SafeAreaView>
  );
}

{
  /* <ImageBackground
key={index}
source={item.image}
imageStyle={styles.containerImage}
// style={}
>
<View style={styles.row}>
  <Text style={styles.textWhite}>5.0</Text>
  <StarRating
    maxStars={1}
    starSize={12}
    color={colors.gold}
    rating={1}
  />
</View>
<View style={styles.marginCardtop}>
  <ImageBackground
    source={images.bluredImg}
    imageStyle={styles.bluredImg}>
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
          {item.location}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() =>
          navigation.navigate('BookAppointment')
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
</View>
</ImageBackground> */
}
