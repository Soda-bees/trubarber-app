import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';
import Loader from '../../components/Loader';
import {uploadProfile} from '../../services/config/API';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import {sizes} from '../../services';

export default function BusinessVerfication({navigation, route}) {
  const {userData} = route.params;
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  const [imgUri, setImgUri] = useState(null);
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

  const handleConfirm = async () => {
    if (!imgUri) {
      return ErrorShow(
        'error',
        'Oops!',
        'Please Upload business verification photo',
      );
    }
    userData.businessVerification = imgUri;
    navigation.navigate('OutletCreated', {userData});
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.forgotPass}>Business Verification </Text>
        <Text style={styles.subText}>
          Verify Your Business: Upload Required Documents
        </Text>
        <View
          style={
            imgUri
              ? {
                  width: dimensions.width,
                  height: dimensions.height,
                  borderRadius: sizes.screenWidth * 0.04,
                  marginTop: sizes.screenHeight * 0.04,
                  alignSelf: 'center',
                }
              : styles.uploadImage
          }>
          {imgUri ? (
            <Image
              source={{uri: imgUri}}
              style={{
                width: dimensions.width,
                height: dimensions.height,
                borderRadius: sizes.screenWidth * 0.04,
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={styles.addimage}
              source={images.clipDocument}
              resizeMode="contain"
            />
          )}
        </View>
        <Text style={styles.smallText}>
          Please attach your Business License or Registration Certificate for
          verification
        </Text>
        <TouchableOpacity
          style={styles.imageUploadbuttonsContainer}
          onPress={() => uploadPhoto('camera')}>
          <Image source={images.camera} style={styles.imageResize} />
          <Text style={styles.textSize}>use Camera</Text>
        </TouchableOpacity>
        <View style={styles.borderRow}>
          <View style={styles.border}></View>
          <Text style={styles.gapText}>Or</Text>
          <View style={styles.border}></View>
        </View>
        <TouchableOpacity
          style={styles.borderRow}
          onPress={() => uploadPhoto('library')}>
          <Image
            source={images.uploadimg}
            style={styles.imageSmall}
            resizeMode="contain"
          />
          <Text style={styles.textBlack}>Choose picture from gallery</Text>
        </TouchableOpacity>
        <View
          style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
          {loader ? (
            <Loader title={'Next'} />
          ) : (
            <Button title={'Next'} onPress={() => handleConfirm()} />
          )}
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
