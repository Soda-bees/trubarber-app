import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Touchable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import BackArrow from '../../components/BackArrow/index.js';
import {colors, sizes} from '../../services/index.js';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData, setUserData} from '../../store/userData/index.js';
import {updateProfile, uploadProfile} from '../../services/config/API/index.js';
import Loader from '../../components/Loader/index.js';
import {selectAuthToken} from '../../store/authToken/index.js';
import {ErrorShow} from '../../components/Error/index.js';
import Toast from 'react-native-toast-message';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import TimePickerComponent from '../../components/TimePicketComponent/index.js';
import {selectRole} from '../../store/role/index.js';
import {parse, format} from 'date-fns';
import Header from '../../components/Header/index.js';
import Modal from 'react-native-modal';

// import {colors, sizes} from 'borderBottomcomponents/BackArrow/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function EditScreen({navigation}) {
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const role = useSelector(selectRole);
  console.log('userdata wallet profile ==========>>', userData?.wallet);

  const dispatch = useDispatch();

  const [imgUri, setImgUri] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loader, setLoader] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // const parseTimeString = time => {
  //   const [startTimeString, endTimeString] = time.split(' - ');
  //   const startTime = parseSingleTimeString(startTimeString);
  //   const endTime = parseSingleTimeString(endTimeString);
  //   return {startTime, endTime};
  // };

  const parseSingleTimeString = timeString => {
    const [time, modifier] = timeString.split(' ');

    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  };

  useEffect(() => {
    if (userData) {
      if (role == 'user') {
        setImgUri(userData?.profile);
        setEmail(userData?.email);
        setName(userData?.name);
      } else {
        setImgUri(userData?.profile);
        setEmail(userData?.email);
        setName(userData?.name);
        setDescription(userData?.description);
        // const {startTime, endTime} = parseTimeString(userData?.time);
        // setStartTime(startTime);
        // setEndTime(endTime);
        setPhone(userData?.phone);
      }
    }
  }, [userData]);

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
            // setImgUri(uri);
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
        // console.log('** Full Camera Response:**', response.assets[0].uri);
        try {
          const uri = response.assets[0].uri;
          if (!uri) {
            const cameraResponseUri = response.path || response.uri;
            if (cameraResponseUri) {
              console.log('Using alternative camera URI:', cameraResponseUri);
              // setImgUri(cameraResponseUri);
              const img = cameraResponseUri.assets[0];
              handleUploadProfile(img);
            } else {
              console.log('No image URI found in camera response');
            }
          } else {
            // setImgUri(uri);
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
        console.log(response.message);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const formatTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };

  const onHide = async () => [navigation.goBack()];

  const handleUpdateProfile = async () => {
    try {
      setLoader(true);
      const userBody = {
        name,
        profile: imgUri,
      };
      const BarberBody = {
        name,
        profile: imgUri,
        description,
        // time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
      };
      const response = await updateProfile(
        role == 'user' ? userBody : BarberBody,
        authToken,
      );
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
  const handleDeleteProfile = async () => {
    try {
      setIsVisible(false);
      setLoader(true);
      const userBody = {
        profile: '',
      };
      const BarberBody = {
        profile: '',
      };
      const response = await updateProfile(
        role == 'user' ? userBody : BarberBody,
        authToken,
      );
      if (response.status == 200) {
        setImgUri('');
        setLoader(false);
        ErrorShow(
          'success',
          'Congratulation!',
          response?.data?.message,
          // onHide,
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

  const handleLibrary = () => {
    setIsVisible(false);
    setTimeout(() => {
      uploadPhoto('library');
    }, 1000);
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setIsVisible(false);
        }}>
        <View style={styles.container}>
          <View style={styles.borderBottom}>
            <Header title={'Edit Profile'} />
          </View>
          <View style={styles.contentAlligment}>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              // onPress={() => uploadPhoto('library')}
            >
              {/* {imgUri ? ( */}
              <Image
                source={
                  imgUri
                    ? {uri: imgUri}
                    : userData?.gender === 'male'
                    ? images.male
                    : images.female
                }
                style={styles.youngMan}
                resizeMode="cover"
              />
              {/* ) : (
              <Image source={images.youngMan} style={styles.youngMan} />
            )} */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadPhoto}
              // onPress={() => uploadPhoto('library')}

              onPress={() => setIsVisible(true)}>
              <Image
                source={images.editProfileimg}
                style={styles.editProfileimg}
                resizeMode="contain"
              />
              <Text style={styles.photoText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            extraHeight={90}
            extraScrollHeight={220}
            enableOnAndroid={true}>
            <View style={styles.inputContainer}>
              <View style={styles.wholeContainer}>
                <View style={styles.rowInput}>
                  <Image source={images.user} style={styles.inputImage} />
                  <TextInput
                    placeholder="Name"
                    style={styles.input}
                    placeholderTextColor={colors.placeholdertext}
                    value={name}
                    onChangeText={text => {
                      setName(text);
                    }}
                  />
                </View>
              </View>
              <View style={styles.inputField}>
                <View style={styles.rowInput}>
                  <Image
                    source={images.Message}
                    style={styles.inputImage}
                    resizeMode="contain"
                  />
                  <TextInput
                    placeholder="tyler13@email.com"
                    style={styles.input}
                    placeholderTextColor={colors.placeholdertext}
                    value={email}
                    editable={false}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                  />
                </View>
              </View>
              {role == 'barber' && (
                <View style={styles.inputField}>
                  <View style={styles.rowInput}>
                    <Image
                      source={images.Call}
                      style={styles.inputImage}
                      resizeMode="contain"
                    />
                    <TextInput
                      placeholder="Phone"
                      style={styles.input}
                      placeholderTextColor={colors.placeholdertext}
                      keyboardType="numeric"
                      value={phone}
                      onChangeText={text => {
                        setPhone(text);
                      }}
                    />
                  </View>
                </View>
              )}

              {/* {role == 'barber' && (
                <View style={styles.inputField}>
                  <View style={styles.description}>
                    <TimePickerComponent
                      startTime={startTime}
                      setStartTime={setStartTime}
                      endTime={endTime}
                      setEndTime={setEndTime}
                      isBold={false}
                    />
                    <Image
                      source={images.clockIcon}
                      style={styles.clockIcon}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )} */}
              {/* {role == 'barber' && (
                <View style={styles.inputFieldDes}>
                  <TextInput
                    style={
                      Platform.OS === 'android'
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
              )} */}
            </View>
          </KeyboardAwareScrollView>
          <View style={Platform.OS == 'android' ? styles.btn2 : styles.btnIOS2}>
            <TouchableOpacity
              style={styles.btnViewLightCenter}
              onPress={() => navigation.navigate('DeleteAccount')}>
              <Text style={styles.deleteText}>Delete Account</Text>
              <Image
                source={images.arrowIcon}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={Platform.OS == 'android' ? styles.btn : styles.btnIOS}>
            {loader ? (
              <Loader title={'Save'} />
            ) : (
              <Button title={'Save'} onPress={() => handleUpdateProfile()} />
            )}
          </View>
          <Toast />
          {isVisible && (
            <View
              style={
                Platform.OS == 'android'
                  ? styles.modalContainer
                  : styles.modalContainerIOS
              }
              onStartShouldSetResponder={() => true}>
              <TouchableOpacity
                style={styles.bottomViewImg}
                onPress={handleLibrary}
                // onPress={
                //   () => uploadPhoto('library')}
              >
                <Image source={images.uploadimg} style={styles.imgStyle} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomViewImg}
                onPress={handleDeleteProfile}>
                <Image source={images.deleteIconBig} style={styles.imgStyle} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
