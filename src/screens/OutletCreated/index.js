import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {formToJSON} from 'axios';
import Loader from '../../components/Loader';
import {colors} from '../../services';
import {handleBarberSignup} from '../../services/config/API';
import {setUserData} from '../../store/userData';
import {setAuthToken} from '../../store/authToken';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import formatToJSON from '../../services/config/FormatToJson';
import {selectlocation, setLocation} from '../../store/location';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

export default function OutletCreated({navigation, route}) {
  const location = useSelector(selectlocation);
  const dispatch = useDispatch();
  const {userData} = route.params;

  const [loader, setLoader] = useState(false);
  const [region, setRegion] = useState(null);

  // useEffect(() => {

  // }, []);

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
    if (Platform.OS === 'ios') {
      return new Promise((resolve, reject) => {
        Geolocation.requestAuthorization(); // Request authorization on iOS
        Geolocation.getCurrentPosition(
          () => {
            console.log('Location services enabled');
            resolve();
          },
          error => {
            console.error('Location services not enabled', error.message);
            Alert.alert(
              'Location Permission Required',
              'Location access is required to display your shop’s location to nearby users. Please enable location permissions in your settings to proceed.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Open Settings',
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
              ],
            );
            // reject(new Error('Location services are disabled'));
          },
          // {enableHighAccuracy: true, timeout: 20000},
        );
      });
    } else {
      return LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          '<h2>Use Location?</h2> This app wants to change your device settings:<br/><br/>Use GPS for location<br/><br/>',
        ok: 'YES',
        cancel: 'NO',
      });
    }
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
          'Location Permission Required',
          'Location access is required to display your shop’s location to nearby users. Please enable location permissions in your settings to proceed.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000},
    );
  };

  const handleConfirm = async () => {
    try {
      setLoader(true);
      if (!location) {
        setLoader(false);
        return handleLocation();
      }
      userData.location = location;
      console.log('locaaaaa', location);
      const response = await handleBarberSignup(userData);
      if (response.status == 201) {
        setLoader(false);
        dispatch(setUserData(response?.data?.barber));
        dispatch(setAuthToken(response?.data?.token));
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      ErrorShow('error', 'Oops', error?.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.forgotPass}>PROFILE CREATED!</Text>
        <View style={styles.grats}>
          <Image
            source={images.grats}
            resizeMode="contain"
            style={styles.resizeImg}
          />
          <View style={styles.gratsText}>
            <Text style={styles.title}>Congratutions!</Text>
            <Text style={styles.subText}>
              Your profile is now complete and ready to go.
            </Text>
          </View>
        </View>
        <View
          style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
          {loader ? (
            <View style={styles.btnViewLoader}>
              <ActivityIndicator color={colors.disabledBg} size={32} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => handleConfirm()}>
              <Text style={styles.btnText}>Get Ready</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
