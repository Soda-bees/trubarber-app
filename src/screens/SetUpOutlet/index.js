import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../services/utilities/images';
import { styles } from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import TimePickerComponent from '../../components/TimePicketComponent';
import Loader from '../../components/Loader';
import { uploadProfile } from '../../services/config/API';
import { ErrorShow } from '../../components/Error';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, sizes } from '../../services';

export default function SetUpOutlet({ navigation, route }) {
  const { userData } = route.params;
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const [outletName, setOutletName] = useState('RedBox Barber');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('United States');
  const [imgUri, setImgUri] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [instagram , setInstagram] = useState('')

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
    if (!instagram) {
      return ErrorShow('error', 'Oops!', 'Please provide your instagram profile link');
    }
    if (!description) {
      return ErrorShow('error', 'Oops!', 'Please fill the description');
    }
    // const time = `${formatTime(startTime)} - ${formatTime(endTime)}`;
    const time = `6:00 AM - 10:00 PM`;
    Object.assign(userData, { businessProfile: imgUri, description, time , instagram});
    console.log(userData);

    navigation.navigate('AuthSetUpServices', { userData });
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

          resolve({ width: calculatedWidth, height: calculatedHeight });
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
        const { width, height } = await checkDimensions(imgUri);
        setDimensions({ width, height });
      } catch (error) {
        console.error('Error calculating image dimensions:', error);
      }
    };

    calculateDimensions();
  }, [imgUri]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <View style={styles.backArrow}>
            <BackArrow onPress={() => navigation.goBack()} />
          </View>
          <Text style={styles.Forgotpass}>Set-Up Business Profile</Text>
          <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={Platform.OS == 'ios' && sizes.screenHeight * 0.9}>
            <View>
              {/* <TouchableOpacity
                style={imgUri ? {
                  width: dimensions.width,
                  height: dimensions.height,
                  borderRadius: sizes.screenWidth * 0.04,
                  alignSelf: 'center',
                  marginTop: sizes.screenHeight * 0.03
                } : styles.uploadImage}
                onPress={() => uploadPhoto('library')}>
                {imgUri ? (
                  <Image
                    source={{ uri: imgUri }}
                    style={{
                      width: dimensions.width,
                      height: dimensions.height,
                      borderRadius: sizes.screenWidth * 0.04,
                    }}
                  />
                ) : (
                  <Image
                    style={styles.addimage}
                    source={images.uploadImgbarber}
                  />
                )}
              </TouchableOpacity> */}
            </View>
            {/* <View
              style={
                Platform.OS == 'android'
                  ? styles.uploadPress
                  : styles.uploadPressIOS
              }>
              <Text style={styles.uploadCover}>Upload Photo</Text>
            </View> */}
            <View style={styles.timeContainer}>
              <Text style={
                Platform.OS == 'android' ? styles.title : styles.titleIOS
              }>Instagram account</Text>
              <View style={styles.timeSecond}>
                <Image
                  source={images.instagram}
                  style={styles.instagramIcon}
                  resizeMode="contain"
                />
                <TextInput 
                placeholder='Add Link' 
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
                  style={Platform.OS == 'android' ? styles.description : styles.descriptionIOS}
                  onChangeText={setDescription}
                  value={description}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Description"
                  placeholderTextColor="black"
                />
              </View>
              <View style={styles.timeContainer}>
                <Text style={
                  Platform.OS == 'android' ? styles.title : styles.titleIOS
                }>Time</Text>
                <View style={styles.time}>
                  <Text style={styles.description}>6:00 AM - 10:00 PM</Text>
                  <Image
                    source={images.clockIcon}
                    style={styles.clockIcon}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* <View style={styles.timeContainer}>
                <View style={styles.description}>
                  <TimePickerComponent
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    isBold={true}
                  />
                  <Image
                    source={images.clockIcon}
                    style={styles.clockIcon}
                    resizeMode="contain"
                  />
                </View>
              </View> */}
            </View>
          </KeyboardAwareScrollView>
        </View>
        <Toast />
        <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
          {loader ? (
            <Loader title={'Next'} />
          ) : (
            <Button title={'Next'} onPress={() => handleConfirm()} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
