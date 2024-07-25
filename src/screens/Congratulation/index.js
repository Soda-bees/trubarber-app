import {
  View,
  Text,
  SafeAreaView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import {styles} from './style';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken, setAuthToken} from '../../store/authToken';
import {selectUserData, setUserData} from '../../store/userData';
import {signup} from '../../services/config/API';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../services';
import {selectlocation, setLocation} from '../../store/location';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

export default function Congratulation({route}) {
  const dispatch = useDispatch();
  const {userData} = route.params;
  const location = useSelector(selectlocation);

  const [loader, setLoader] = useState(false);
  const [region, setRegion] = useState();

  const handleLocation = () => {
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
  };

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

  const handleSignUp = async () => {
    try {
      setLoader(true);
      if (!location) {
        setLoader(false);
        return handleLocation();
      }
      userData.location = location;
      const response = await signup(userData);
      if (response.status == 201) {
        setLoader(false);
        dispatch(setUserData(response?.data?.userData));
        dispatch(setAuthToken(response?.data?.token));
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      ErrorShow('error', 'Oops', error?.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrowStyle}>
          <BackArrow />
        </View>
        <View style={styles.mainView}>
          <Text style={styles.textStyle}>“Enhance Your Experience”</Text>
          <View style={styles.centerView}>
            <Image source={images.congoImg} style={styles.imgStyle} />
            <Text style={styles.textStyle}>Congratulations!</Text>
            <Text style={styles.textStyle1}>
              Your profile creation is now complete and ready to go.
            </Text>
          </View>
        </View>

        <View style={styles.buttonStyle}>
          {loader ? (
            <View style={styles.loaderBtnStyle}>
              <ActivityIndicator color={colors.disabledBg} size={30} />
            </View>
          ) : (
            <Button
              title={'Get ready'}
              hideImage={true}
              onPress={handleSignUp}
            />
          )}
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
