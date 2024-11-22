import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {styles} from './style';
import images from '../../services/utilities/images';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../store/userData';
import {useCallback, useEffect, useState} from 'react';
import {getAddressFromCoordinates} from '../../services/config/API';
import {colors} from '../../services';
import {selectlocation, setLocation} from '../../store/location';
import Geolocation from '@react-native-community/geolocation';
import {selectAuthToken} from '../../store/authToken';

export default function BarberLocation({user}) {
  const userData = useSelector(selectUserData);
  const navigation = useNavigation();
  const [address, setAddress] = useState(null);
  const [locationLoader, setLocationLoader] = useState(false);
  const location = useSelector(selectlocation);
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);

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
    if (location?.latitude && location?.longitude) {
      getAddress(location.latitude, location.longitude);
    }
  }, [location]);

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
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      return true;
    }
  };

  const initializeLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          dispatch(setLocation({latitude, longitude}));
          getAddress(latitude, longitude);
        },
        error => {
          console.log('Error getting location: ', error.message);
          Alert.alert(
            'Location Permission Required',
            'Location access is essential for using all features of this app. Please enable location services in your settings.',
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
        // {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
      );
    } else {
      Alert.alert(
        'Location Permission Required',
        'Please enable location permissions to use this feature.',
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
    }
  };

  return (
    <TouchableOpacity
      style={user ? styles.locationRowUser : styles.locationRow}
      activeOpacity={1}
      onPress={async () => {
        if (!authToken) {
          navigation.navigate('WelcomeScreen');
          return;
        }
        if (location) {
          user
            ? navigation.navigate('WholeMap')
            : navigation.navigate('EditBusinessProfile');
        } else {
          await initializeLocation();
          if (location) {
            user
              ? navigation.navigate('WholeMap')
              : navigation.navigate('EditBusinessProfile');
          }
        }
      }}>
      <View style={styles.locationContainertop}>
        {locationLoader ? (
          <ActivityIndicator size={20} color={colors.black} />
        ) : (
          <Image style={styles.iconImage} source={images.redLocation} />
        )}
      </View>
      <View style={styles.locationDetailColumn}>
        <Text style={styles.nearbyTxt}>
          {user ? 'Find barber near' : 'Barber’s Location'}
        </Text>
        {location ? (
          <Text
            style={
              Platform.OS == 'android'
                ? styles.currentLocationTxt
                : user
                ? styles.currentLocationTxtIOS
                : styles.currentLocationTxtIOSbarber
            }
            numberOfLines={1}
            ellipsizeMode="tail">
            {address}
          </Text>
        ) : (
          <Text style={styles.enableLocation}>Enable Location</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
