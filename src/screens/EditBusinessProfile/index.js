import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import TimePickerComponent from '../../components/TimePicketComponent';
import Loader from '../../components/Loader';
import {
  getAddressFromCoordinates,
  updateProfile,
  uploadProfile,
} from '../../services/config/API';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors, sizes} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData, setUserData} from '../../store/userData';
import formatToJSON from '../../services/config/FormatToJson';
import {selectAuthToken} from '../../store/authToken';
import {styles} from './style';
import Header from '../../components/Header';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {setLocation} from '../../store/location';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView} from 'react-native-gesture-handler';

export default function EditBusinessProfile({navigation, route}) {
  // const { userData } = route.params;
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      setImgUri(userData?.businessProfile);
      setDescription(userData?.description);
      setTime(userData?.time);
      setLocation(userData?.location);
      setInstagram(userData?.instagram);
      setOffDays(userData?.offDays);
      const undoScheduledUpdate = userData?.scheduled.map(item => {
        const {time, ...rest} = item;

        if (time) {
          const [startTime, endTime] = time.split(' - ');
          const formattedStartTime = formatToISO(startTime, item.day);
          const formattedEndTime = formatToISO(endTime, item.day);
          return {
            ...rest,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          };
        }

        return {
          ...rest,
          startTime: null,
          endTime: null,
        };
      });
      setScheduled(undoScheduledUpdate);
    }
  }, [userData]);

  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const [outletName, setOutletName] = useState('RedBox Barber');
  const [description, setDescription] = useState('');
  const [imgUri, setImgUri] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const [time, setTime] = useState('');
  const [address, setAddress] = useState(null);
  const [locationLoader, setLocationLoader] = useState(false);
  const [location, setLocalLocation] = useState();
  const [instagram, setInstagram] = useState('');
  const [days, setDays] = useState([
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);
  const [offDays, setOffDays] = useState([]);
  const [scheduled, setScheduled] = useState([]);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState({
    index: null,
    type: '',
  });

  const formatToISO = (timeStr, day) => {
    const now = new Date();

    const [time, period] = timeStr.split(' ');
    const [hour, minute] = time.split(':');

    let adjustedHour = parseInt(hour);
    if (period === 'PM' && adjustedHour !== 12) {
      adjustedHour += 12;
    } else if (period === 'AM' && adjustedHour === 12) {
      adjustedHour = 0;
    }

    const formattedDate = new Date(now.setHours(adjustedHour, minute, 0, 0));

    return formattedDate.toISOString();
  };

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.warn('Camera permission denied');
    }
  };

  const uploadPhoto = async sourceType => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 800,
      maxHeight: 600,
      includeBase64: false,
      saveToPhotos: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    if (sourceType === 'library') {
      launchImageLibrary(options, response => {
        console.log('Library Response:', response);

        try {
          const uri =
            response.uri || (response.assets && response.assets[0].uri);
          if (uri) {
            const img = response.assets[0];
            handleUploadProfile(img);
          } else {
            console.warn('No image URI found in library response');
          }
        } catch (error) {
          console.error('Error setting imgUri:', error);
        }
      });
    } else if (sourceType === 'camera') {
      await requestCameraPermission();

      launchCamera(options, response => {
        try {
          const uri = response.assets[0].uri;
          if (!uri) {
            const cameraResponseUri = response.path || response.uri;
            if (cameraResponseUri) {
              console.log('Using alternative camera URI:', cameraResponseUri);
              setImgUri(cameraResponseUri);
              const img = cameraResponseUri.assets[0];
              handleUploadProfile(img);
            } else {
              console.log('No image URI found in camera response');
            }
          } else {
            const img = response.assets[0];
            handleUploadProfile(img);
          }
        } catch (error) {
          console.error('Error setting imgUri:', error);
        }
      });
    }
  };

  const handleUploadProfile = async image => {
    setLoader(true);
    try {
      const img = {
        uri: image.uri,
        type: image.type,
        fileName: image.fileName,
      };
      const formData = new FormData();
      formData.append('image', {
        uri: img.uri,
        type: img.type,
        name: img.fileName,
      });
      const response = await uploadProfile(formData);
      if (response.status == 200) {
        setImgUri(response?.data?.url);
        setLoader(false);
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', response.message);
        console.log('eles =-=-=->', response.message);
      }
    } catch (error) {
      setLoader(false);
      ErrorShow('error', 'Oops', error.message);
      ErrorShow('error', 'Oops', error);
      console.log('catch=-=-=-=-', error);
    }
  };

  const handleConfirm = async () => {
    const updatedScheduled = scheduled.map(item => {
      const formattedStartTime = formatTime(item?.startTime);
      const formattedEndTime = formatTime(item?.endTime);
      const {startTime, endTime, ...rest} = item;
      return {
        ...rest,
        time: item?.available
          ? `${formattedStartTime} - ${formattedEndTime}`
          : '',
      };
    });
    console.log(formatToJSON(updatedScheduled));
    if (!instagram) {
      return ErrorShow(
        'error',
        'Oops!',
        'Please provide your instagram profile link',
      );
    }
    if (!description) {
      return ErrorShow('error', 'Oops!', 'Please fill the description');
    }
    try {
      setLoader(true);
      const body = {
        businessProfile: imgUri,
        description,
        location,
        instagram,
        offDays,
        scheduled: updatedScheduled,
      };
      const response = await updateProfile(body, authToken);
      if (response.status == 200) {
        setLoader(false);
        ErrorShow(
          'success',
          'Congratulation!',
          response?.data?.message,
          onHide,
        );
        dispatch(setUserData(response?.data?.updatedUser));
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops!', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      ErrorShow('error', 'Oops!', error?.message);
    }
  };

  const onHide = async () => [navigation.goBack()];

  const formatTime = isoTimeString => {
    const date = new Date(isoTimeString);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const checkDimensions = imgUri => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        imgUri,
        (width, height) => {
          const aspectRatio = width / height;
          let calculatedWidth, calculatedHeight;

          if (width > screenHeight * 0.3) {
            calculatedWidth = screenHeight * 0.3;
            calculatedHeight = calculatedWidth / aspectRatio;
          } else {
            calculatedWidth = width;
            calculatedHeight = height;
          }

          if (calculatedHeight > screenHeight * 0.3) {
            calculatedHeight = screenHeight * 0.3;
            calculatedWidth = calculatedHeight * aspectRatio;
          }

          resolve({width: calculatedWidth, height: calculatedHeight});
        },
        error => {
          reject(error);
        },
      );
    });
  };

  useEffect(() => {
    const calculateDimensions = async () => {
      try {
        if (!imgUri) {
          return;
        }
        const {width, height} = await checkDimensions(imgUri);
        setDimensions({width, height});
      } catch (error) {
        console.error('Error calculating image dimensions:', error);
      }
    };

    calculateDimensions();
  }, [imgUri]);
  const getAddress = async (latitude, longitude) => {
    setLocationLoader(true);
    try {
      const response = await getAddressFromCoordinates(latitude, longitude);
      setAddress(response);
      setLocationLoader(false);
    } catch (error) {
      console.log("location errer",error);
      setLocationLoader(false);
    }
  };

  useEffect(() => {
    getAddress(userData?.location?.latitude, userData?.location?.longitude);
  }, []);

  const handleLocation = () => {
    console.log('handleLocation');

    const initializeLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        checkLocationServices()
          .then(() => {
            getCurrentLocation();
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
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      return true;
    }
  };

  const checkLocationServices = async () => {
    // console.log("work checkLocationServices");
    // return LocationServicesDialogBox.checkLocationServicesIsEnabled({
    //   message:
    //     '<h2>Use Location?</h2> This app wants to change your device settings:<br/><br/>Use GPS for location<br/><br/>',
    //   ok: 'YES',
    //   cancel: 'NO',
    // });

    if (LocationServicesDialogBox) {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          '<h2>Use Location?</h2> This app wants to change your device settings:<br/><br/>Use GPS for location<br/><br/>',
        ok: 'YES',
        cancel: 'NO',
      })
        .then(() => {
          console.log('Location services enabled');
        })
        .catch(error => {
          console.error('Location services not enabled', error.message);
          throw error; // Re-throw the error to handle it in the calling function
        });
    } else {
      console.error('LocationServicesDialogBox is not initialized');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // console.log(
        //   position.coords,
        //   '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        // );
        const locationObj = {
          ...location,
          latitude: latitude,
          longitude: longitude,
        };
        console.log('location object ', locationObj);
        setLocalLocation(locationObj);
        getAddress(locationObj?.latitude, locationObj?.longitude);
        dispatch(setLocation(locationObj));
        // setRegion({
        //   latitude,
        //   longitude,
        //   latitudeDelta: 0.01,
        //   longitudeDelta: 0.01,
        // });
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

  const handleSelectDays = async item => {
    setOffDays(prevOffDays => {
      if (prevOffDays.includes(item)) {
        return prevOffDays.filter(day => day !== item);
      } else {
        return [...prevOffDays, item];
      }
    });
  };

  const handleActiveToggle = index => {
    setScheduled(prevScheduled =>
      prevScheduled.map((item, idx) =>
        idx === index ? {...item, available: !item.available} : item,
      ),
    );
  };

  const onStartTimeChangeIOS = (event, selectedDate) => {
    if (selectedIndex.index === null || !selectedIndex.type) return;

    setScheduled(prevScheduled =>
      prevScheduled.map((item, idx) =>
        idx === selectedIndex.index
          ? {
              ...item,
              [selectedIndex.type === 'start' ? 'startTime' : 'endTime']:
                selectedDate,
            }
          : item,
      ),
    );
  };

  const handleSetSelectedIndex = (index, type) => {
    setSelectedIndex({
      index: index,
      type: type,
    });
    setShowTimeModal(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Header title={'Edit Business Profile'} />
          <View style={{marginTop: sizes.screenHeight * 0.04}} />
          <View style={styles.timeContainer}>
            <Text
              style={Platform.OS == 'android' ? styles.title : styles.titleIOS}>
              Update Instagram account
            </Text>
            <View style={styles.timeSecond}>
              <Image
                source={images.instagram}
                style={styles.instagramIcon}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Add Link"
                style={styles.instagramInput}
                placeholderTextColor={colors.black}
                onChangeText={setInstagram}
                value={instagram}
              />
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text
                style={
                  Platform.OS == 'android' ? styles.title : styles.titleIOS
                }>
                Description
              </Text>
              <TextInput
                style={
                  Platform.OS == 'android'
                    ? styles.description
                    : styles.descriptionIOS
                }
                onChangeText={setDescription}
                value={description}
                multiline={true}
                numberOfLines={4}
                placeholder="Description"
                placeholderTextColor="black"
              />
            </View>
            <TouchableOpacity
              style={styles.timeContainer}
              activeOpacity={1}
              onPress={handleLocation}>
              <Text
                style={
                  Platform.OS == 'android' ? styles.title : styles.titleIOS
                }>
                Location
              </Text>
              <View style={styles.time}>
                {locationLoader ? (
                  <View style={{position: 'absolute', right: 10}}>
                    <ActivityIndicator color={colors.black} size={20} />
                  </View>
                ) : (
                  <Text
                    style={styles.description}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {address}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <ScrollView>
              <View>
                <Text style={styles.workingDaysHeading}>
                  Update Working Days and Hours
                </Text>
                {scheduled.map((item, index) => {
                  return (
                    <View style={styles.scheduleMainView} key={index}>
                      <TouchableOpacity
                        style={
                          item.available
                            ? styles.toggleBtn
                            : styles.toggleBtnUnactive
                        }
                        onPress={() => handleActiveToggle(index)}>
                        <View
                          style={
                            item.available
                              ? styles.toggleBtnColor
                              : styles.toggleBtnColorRed
                          }></View>
                      </TouchableOpacity>
                      <View
                        style={
                          item.available
                            ? styles.dayTimeView
                            : styles.dayTimeViewUnactive
                        }>
                        <Text style={styles.scheduleDay}>{item.day}</Text>
                        <View>
                          {item.available ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() =>
                                  handleSetSelectedIndex(index, 'start')
                                }>
                                <Text style={styles.scheduleDay}>{`${formatTime(
                                  item?.startTime,
                                )}`}</Text>
                              </TouchableOpacity>
                              <Text style={styles.scheduleDay}> - </Text>

                              <TouchableOpacity
                                onPress={() =>
                                  handleSetSelectedIndex(index, 'end')
                                }>
                                <Text style={styles.scheduleDay}>{`${formatTime(
                                  item?.endTime,
                                )}`}</Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <Text style={styles.scheduleDay}>Close</Text>
                          )}
                        </View>
                      </View>
                    </View>
                  );
                })}
                <View
                  style={
                    Platform.OS == 'android'
                      ? styles.nextBtn
                      : styles.nextBtnIOS
                  }>
                  {loader ? (
                    <Loader title={'Save'} />
                  ) : (
                    <Button title={'Save'} onPress={() => handleConfirm()} />
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <Toast />
      </View>
      <Modal
        onBackdropPress={() => setShowTimeModal(false)}
        onBackButtonPress={() => setShowTimeModal(false)}
        isVisible={showTimeModal}>
        <DateTimePicker
          testID="startTimePicker"
          value={startTime}
          mode="time"
          is24Hour={false}
          display="spinner"
          // textColor="red"
          positiveButton={{label: 'Done'}}
          negativeButton={{label: 'Cancel'}}
          onChange={onStartTimeChangeIOS}
          style={{
            backgroundColor: colors.bluishWhite,
            borderRadius: sizes.screenWidth * 0.03,
            overflow: 'hidden',
            width: sizes.screenWidth * 0.75,
            alignSelf: 'center',
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}
