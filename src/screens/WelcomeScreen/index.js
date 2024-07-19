import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {useDispatch, useSelector} from 'react-redux';
import {selectlocation, setLocation} from '../../store/location/index.js';
import { notificationListners, requestUserPermission } from '../../services/config/NotificationService/index.js';

export default function WelcomeScreen({navigation}) {
  const dispatch = useDispatch();
  const location = useSelector(selectlocation);

  console.log('getting location', location);

  const [imgActive, setImgActive] = useState(0);
  const [itemList, setItem] = useState(['Text1', 'Text3', 'Text4']);
  const [region, setRegion] = useState(null);

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.round(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUP = () => {
    navigation.navigate('Signup');
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
        console.log('res===>', res);
        if (!!res && res === 'granted') {
          requestUserPermission()
          notificationListners()
          initializeLocation()
        }
        notificationListners()
        initializeLocation()
      }).catch((error) => {
        initializeLocation()
        console.log('error in get permission in app.js')
      })
    } else {

    }
  }, [])

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

  // useEffect(() => {
  //   const initializeLocation = async () => {
  //     const hasPermission = await requestLocationPermission();
  //     if (hasPermission) {
  //       checkLocationServices()
  //         .then(() => {
  //           getCurrentLocation(setRegion, dispatch);
  //         })
  //         .catch(error => {
  //           console.log('Location services not enabled', error.message);
  //           Alert.alert(
  //             'Location Services Disabled',
  //             'Please enable location services to use this feature.',
  //           );
  //         });
  //     }
  //   };

  //   initializeLocation();
  // }, []);

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
        dispatch(setLocation(locationObj))
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
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={({nativeEvent}) => onchange(nativeEvent)}>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <ImageBackground
              style={styles.letsGetStartedImg1}
              source={images.bigSliderhat}>
              <View style={styles.textContainer}>
                <Text
                  style={
                    Platform.OS == 'android'
                      ? styles.textBoldBlack
                      : styles.textBoldBlackIOS
                  }>
                  Welcome to True Barber
                </Text>
                <Text style={styles.subTitle}>Where Style Meets Precision</Text>
                <Text style={styles.description}>
                  A sleek and modern barber shop interior, with stylish barber
                  chairs, mirrors, and tools of the trade.
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <ImageBackground
              style={styles.letsGetStartedImg1}
              source={images.bigSliderbeard}>
              <View>
                <View style={styles.textContainer}>
                  <Text style={styles.textBoldBlack}>
                    Experience Excellence
                  </Text>
                  <Text style={styles.subTitle}>
                    Crafting Confidence, One Cut at a Time
                  </Text>
                  <Text style={styles.description}>
                    A diverse group of satisfied customers getting haircuts,
                    styled beards, and other grooming services at True Barber.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <ImageBackground
              style={styles.letsGetStartedImg1}
              source={images.bigSlidercut}>
              <View style={styles.textContainer}>
                <Text style={styles.textBoldBlack}>Unleash Your Style</Text>
                <Text style={styles.subTitle}>
                  Tailored Cuts for Every Individual
                </Text>
                <Text style={styles.description}>
                  Close-up shots of skilled barbers using scissors, clippers,
                  and other tools with precision.
                </Text>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>

        <View
          style={Platform.OS == 'android' ? styles.wrapDot : styles.wrapDotIOS}>
          {itemList?.map((item, index) => {
            return (
              <View key={index}>
                {imgActive !== 3 && (
                  <View>
                    {Platform.OS == 'android' ? (
                      <Text
                        // key={index}
                        style={
                          imgActive == index ? styles.dotActive : styles.dot
                        }>
                        __
                      </Text>
                    ) : (
                      <Text
                        // key={index}
                        style={
                          imgActive == index
                            ? styles.dotActiveIOS
                            : styles.dotIOS
                        }>
                        __
                      </Text>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <View
          style={
            Platform.OS == 'android'
              ? styles.buttonContainer
              : styles.buttonContainerIOS
          }>
          <TouchableOpacity style={styles.btnViewLight} onPress={handleLogin}>
            <Text style={styles.btnTextLight}>Sign In</Text>
            <Image
              source={images.arrowIcon}
              style={styles.arrowIconLight}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Button title={'Sign Up'} onPress={handleSignUP} />
        </View>
        {/* <View style={Platform.OS == 'ios' ? styles.wrapDotIOS : styles.wrapDot}>
          {item?.map((item, index) => {
            return (
              <View key={index}>
                {Platform.OS == 'android' ? (
                  <Text
                    key={index}
                    style={imgActive == index ? styles.dotActive : styles.dot}>
                    ⬤
                  </Text>
                ) : (
                  <Octicons
                    name={'dot-fill'}
                    color={colors.white}
                    size={sizes.screenHeight * 0.03}
                    style={imgActive == index ? styles.dotActive : styles.dot}
                  />
                )}
              </View>
            );
          })}
        </View> */}
      </View>
    </SafeAreaView>
  );
}
