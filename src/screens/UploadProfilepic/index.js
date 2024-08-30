import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import {uploadProfile} from '../../services/config/API';
import Loader from '../../components/Loader';
import {colors, sizes} from '../../services';

export default function UploadProfilepic({navigation, route}) {
  const {userData} = route.params;
  const [imgUri, setImgUri] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [gender, setGender] = useState('');

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
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
        // console.log('** Full Camera Response:**', response?.assets[0]?.uri);
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

  const handlegoBack = () => {
    navigation.goBack();
  };

  const handlePhoteUpdate = () => {
    if (!gender) {
      return ErrorShow('error', 'Oops!', 'Please select gender');
    }
    userData.profile = imgUri;
    userData.gender = gender;
    navigation.navigate('ProfileSetupPrompt', {userData});
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
      console.log(response?.data);
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

  const handleSelectGender = async value => {
    setGender(value);
    setShowGenderDropdown(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={Platform.OS  == 'android' ? styles.container : styles.containerIOS}>
          <View style={styles.backArrow}>
            <BackArrow onPress={handlegoBack} />
          </View>
          <Text style={styles.forgetPass}>Upload Profile Picture</Text>
          <Text style={styles.subText}>Upload your profile picture here</Text>
          <View
            style={styles.uploadImage}
            onPress={() => uploadPhoto('library')}>
            {imgUri ? (
              <Image
                source={{uri: imgUri}}
                style={styles.imagestyle}
                resizeMode="cover"
              />
            ) : (
              <Image
                style={styles.addimage}
                source={images.addimage}
                resizeMode="contain"
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.imageUploadbuttonsContainer}
            onPress={() => uploadPhoto('camera')}>
            <Image source={images.camera} style={styles.imageResize} />
            <Text style={styles.textSize}>Take a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageUploadbuttonsContainer}
            onPress={() => uploadPhoto('library')}>
            <Image source={images.uploadimg} style={styles.imageResize} />
            <Text style={styles.textSize}>Choose picture from gallery</Text>
          </TouchableOpacity>

          <Text style={styles.forgetPass}>Select Your Gender</Text>
          <View style={styles.genderMainContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.genderContainer}
              onPress={() => setShowGenderDropdown(!showGenderDropdown)}>
              <Text style={styles.genderSelectText}>
                {gender ? gender : 'Select your gender'}
              </Text>
              <Image
                style={styles.genderArrow}
                source={
                  showGenderDropdown ? images.genderDown : images.genderUp
                }
              />
            </TouchableOpacity>
            {showGenderDropdown && (
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.optionTouchable}
                  onPress={() => handleSelectGender('male')}>
                  <Text style={styles.genderSelectText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionTouchable}
                  onPress={() => handleSelectGender('female')}>
                  <Text style={styles.genderSelectText}>Female</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View
            style={
              Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS
            }>
            {loader ? (
              <Loader title={'Next'} />
            ) : (
              <Button title={'Next'} onPress={handlePhoteUpdate} />
            )}
          </View>
        </View>

        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
}
