import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';

export default function BusinessVerfication({navigation}) {
  const [imgUri, setImgUri] = useState(null);

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
            setImgUri(uri);
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
        console.log('** Full Camera Response:**', response.assets[0].uri);
        try {
          const uri = response.assets[0].uri;
          if (!uri) {
            const cameraResponseUri = response.path || response.uri;
            if (cameraResponseUri) {
              console.log('Using alternative camera URI:', cameraResponseUri);
              setImgUri(cameraResponseUri);
            } else {
              console.log('No image URI found in camera response');
            }
          } else {
            setImgUri(uri);
          }
        } catch (error) {
          console.error('Error setting imgUri:', error);
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={() =>  navigation.goBack()} />
        </View>
        <Text style={styles.forgotPass}>Business Verification </Text>
        <Text style={styles.subText}>
          Verify Your Business: Upload Required Documents
        </Text>
        <TouchableOpacity
          style={styles.uploadImage}
          onPress={() => uploadPhoto('library')}>
          {imgUri ? (
            <Image
              source={{uri: imgUri}}
              style={styles.imagestyle}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={styles.addimage}
              source={images.clipDocument}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
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
        <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
          <Button title={'Next'} onPress={()=>navigation.navigate("OutletCreated")}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
