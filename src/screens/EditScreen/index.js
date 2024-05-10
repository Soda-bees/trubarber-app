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
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import BackArrow from '../../components/BackArrow/index.js';
import {colors} from '../../services/index.js';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import {colors, sizes} from 'borderBottomcomponents/BackArrow/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function EditScreen({navigation}) {
  const [imgUri, setImgUri] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [cityAdress, setcityAdress] = useState('');

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
        <View style={styles.borderBottom}>
          <View style={styles.row}>
            <View style={styles.arrowTop}>
              <BackArrow onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>
        </View>
        <View style={styles.contentAlligment}>
          <TouchableOpacity onPress={() => uploadPhoto('library')}>
            {imgUri ? (
              <Image
                source={{uri: imgUri}}
                style={styles.youngMan}
                resizeMode="cover"
              />
            ) : (
              <Image source={images.youngMan} style={styles.youngMan} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadPhoto}
            onPress={() => uploadPhoto('library')}>
            <Image
              source={images.editProfileimg}
              style={styles.editProfileimg}
              resizeMode="contain"
            />
            <Text style={styles.photoText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView extraHeight={40} extraScrollHeight={90} enableOnAndroid={true}>
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
                  onChangeText={text => {
                    setEmail(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <View style={styles.rowInput}>
                <Image
                  source={images.Call}
                  style={styles.inputImage}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Phone Number"
                  style={styles.input}
                  keyboardType="number-pad"
                  placeholderTextColor={colors.placeholdertext}
                  value={phoneNumber}
                  onChangeText={text => {
                    setphoneNumber(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <View style={styles.rowInput}>
                <Image
                  source={images.Location}
                  style={styles.inputImage}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="City Address"
                  placeholderTextColor={colors.placeholdertext}
                  style={styles.input}
                  value={cityAdress}
                  onChangeText={text => {
                    setcityAdress(text);
                  }}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={Platform.OS == 'android' ? styles.btn : styles.btnIOS}>
          <Button
            title={'Save'}
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
