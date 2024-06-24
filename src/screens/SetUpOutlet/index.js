import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import images from '../../services/utilities/images';
import { styles } from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, PermissionsIOS } from 'react-native';
import TimePickerComponent from '../../components/TimePicketComponent';
import Loader from '../../components/Loader';
import { uploadProfile } from '../../services/config/API';
import { ErrorShow } from '../../components/Error';
import Toast from 'react-native-toast-message';

export default function SetUpOutlet({ navigation, route }) {

  const { userData } = route.params;

  const [outletName, setOutletName] = useState('RedBox Barber');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('United States');
  const [imgUri, setImgUri] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [loader, setLoader] = useState(false);

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
              setImgUri(cameraResponseUri);
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

  const handleConfirm = async () => {
    if (!imgUri) {
      return ErrorShow('error', 'Oops!', 'Please Upload photo');
    }
    if (!description) {
      return ErrorShow('error', 'Oops!', 'Please fill the description');
    }
    const time = `${formatTime(startTime)} - ${formatTime(endTime)}`
    Object.assign(userData, { profile: imgUri, description, time });
    navigation.navigate('SetUpServices', { userData })
  }

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View >
          <View style={styles.backArrow}>
            <BackArrow onPress={() => navigation.goBack()} />
          </View>
          <View>
            <Text style={styles.Forgotpass}>Set-Up Business Profile</Text>
            <TouchableOpacity
              style={styles.uploadImage}
              onPress={() => uploadPhoto('library')}>
              {imgUri ? (
                <Image
                  source={{ uri: imgUri }}
                  style={styles.imagestyle}
                  resizeMode="contain"
                />
              ) : (
                <Image style={styles.addimage} source={images.uploadImgbarber} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={
              Platform.OS == 'android'
                ? styles.uploadPress
                : styles.uploadPressIOS
            }>
            <Text style={styles.uploadCover}>Upload Cover</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text
                style={Platform.OS == 'android' ? styles.title : styles.titleIOS}>
                Description
              </Text>
              <TextInput
                style={styles.description}
                onChangeText={setDescription}
                value={description}
                multiline={true}
                numberOfLines={4}
                placeholder='Description'
              ></TextInput>
            </View>
            <View style={styles.timeContainer}>
              <Text
                style={
                  Platform.OS == 'android' ? styles.title : styles.titleIOS
                }>
                Time
              </Text>
              <View style={styles.description} >
                <TimePickerComponent
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                />
                <Image
                  source={images.clockIcon}
                  style={styles.clockIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
        <Toast />
        {
          loader ?
            <Loader title={'Next'} />
            : <Button
              title={'Next'}
              onPress={() => handleConfirm()}
            />
        }
      </View>
    </SafeAreaView>
  );
}
