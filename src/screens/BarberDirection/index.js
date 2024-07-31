import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {selectlocation} from '../../store/location';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {fontSize} from '../../services';

const {width, height} = Dimensions.get('window');

export default function BarberDirection({navigation, route}) {
  const {barbar} = route?.params;
  // console.log(barbar.location);
  // console.log(formatToJSON(barberData));
  // const location = useSelector(selectlocation);
  const [routeInfo, setRouteInfo] = useState({distance: null, duration: null});
  const [location, setLocation] = useState(null);
  const reduxLocation = useSelector(selectlocation);
  const mapViewRef = useRef(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'ios') {
          const permission = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          if (permission === RESULTS.GRANTED) {
            checkLocationServices();
          } else {
            console.error('Location permission denied');
          }
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This app needs to access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            checkLocationServices();
          } else {
            console.error('Location permission denied');
          }
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    const checkLocationServices = () => {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          '<h2>Use Location?</h2> This app wants to change your device settings:<br/><br/>Use GPS for location<br/><br/>',
        ok: 'YES',
        cancel: 'NO',
      })
        .then(() => {
          getCurrentLocation();
        })
        .catch(error => {
          console.log('Location services not enabled', error.message);
          Alert.alert(
            'Location Services Disabled',
            'Please enable location services to use this feature.',
            [
              {
                text: 'OK',
                onPress: () => navigation.goBack(), // Navigate back if location services are not enabled
              },
            ],
          );
        });
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => {
          console.error('Error getting current position:', error);
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 10000,
        },
      );
    };
    if (Platform.OS === 'ios') {
      if (reduxLocation) {
        setLocation(reduxLocation);
      }
    } else {
      requestLocationPermission();
    }
  }, []);

  useEffect(() => {
    const watchUserLocation = () => {
      const watchId = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});

          if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(
              {
                latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              },
              1000,
            );
          }
        },
        error => {
          console.error('Error watching position:', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
          timeout: 15000,
        },
      );

      return () => Geolocation.clearWatch(watchId);
    };

    if (location) {
      watchUserLocation();
    }
  }, [location]);

  if (!location) {
    return (
      <Text
        style={{
          color: 'black',
          fontSize: fontSize.medium,
          alignSelf: 'center',
          marginTop: 200,
        }}>
        Please enable your location to use this feature
      </Text>
    );
  }

  const handleArrival = () => {
    Alert.alert(
      'Destination Reached',
      'You have reached your destination.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
      {cancelable: false},
    );
  };

  console.log('locaaaaaaaaaation', location);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={[styles.mapContainer, {zIndex: 0}]}>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: location?.latitude,
              longitude: location?.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            followsUserLocation={true}
            showsMyLocationButton={true}
            showsUserLocation
            showsCompass={true}
            ref={mapViewRef}>
            {/* <UrlTile
            urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            maximumZ={100}
          /> */}
            <Marker
              coordinate={{
                latitude: barbar?.location?.latitude,
                longitude: barbar?.location?.longitude,
              }}>
              <ImageBackground
                source={images.locationIcon}
                style={styles.locationImgIcon}
                resizeMode="contain">
                <Image
                  source={{uri: barbar?.profile}}
                  style={styles.markerIngStyle}
                />
              </ImageBackground>
            </Marker>
            {location && (
              <MapViewDirections
                origin={{
                  latitude: location?.latitude,
                  longitude: location?.longitude,
                }}
                destination={{
                  latitude: barbar?.location?.latitude,
                  longitude: barbar?.location?.longitude,
                }}
                strokeWidth={5}
                strokeColor="red"
                timePrecision={'now'}
                onError={errorMessage => {
                  console.error('Error with directions:', errorMessage);
                }}
                onReady={result => {
                  setRouteInfo({
                    distance: result.distance,
                    duration: result.duration,
                  });

                  if (result.distance < 0.03) {
                    handleArrival();
                  }
                }}
              />
            )}
          </MapView>
          {/* <View style={styles.distanceDuration}>
            <Text style={styles.distanceText}>
              Distance:{' '}
              {routeInfo.distance
                ? `${routeInfo.distance.toFixed(2)} km`
                : 'N/A'}
            </Text>
            <Text style={styles.distanceText}>
              Duration:{' '}
              {routeInfo.duration
                ? `${routeInfo.duration.toFixed(2)} min`
                : 'N/A'}
            </Text>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
