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

export default function SetUpOutlet({navigation}) {
  const [outletName, setOutletName] = useState('RedBox Barber');
  const [description, setDescription] = useState(
    'Welcome to Redbox Barber, where grooming meets style and tradition merges with the contemporary. Established with a passion for precision and an eye for detail, we take pride in delivering exceptional grooming experiences that go beyond the ordinary.',
  );
  const [time, setTime] = useState('10:00 AM - 01:00 AM');
  const [location, setLocation] = useState('United States');
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
          <BackArrow onPress={() => navigation.goBack()} />
        </View>
        <View>
          <Text style={styles.Forgotpass}>Set-Up Outlet</Text>
          <TouchableOpacity
            style={styles.uploadImage}
            onPress={() => uploadPhoto('library')}>
            {imgUri ? (
              <Image
                source={{uri: imgUri}}
                style={styles.imagestyle}
                // resizeMode="center"
              />
            ) : (
              <Image style={styles.addimage} source={images.uploadImgbarber} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.uploadPress}>
          <Text style={styles.uploadCover}>Upload Cover</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Outlet Name</Text>
            <TextInput
              onChangeText={setOutletName}
              value={outletName}
              style={styles.description}></TextInput>
            {/* <Text style={styles.description}>RedBox Barber</Text> */}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={styles.description}
              onChangeText={setDescription}
              value={description}
              multiline={true}
              numberOfLines={4}></TextInput>
            {/* <Text style={styles.description}>
              Welcome to Redbox Barber, where grooming meets style and tradition
              merges with the contemporary. Established with a passion for
              precision and an eye for detail, we take pride in delivering
              exceptional grooming experiences that go beyond the ordinary.
            </Text> */}
          </View>
          {/* <TouchableOpacity style={styles.timeContainer}> */}
          <View style={styles.timeContainer}>
            <View>
              <Text style={styles.title}>Time</Text>
              <TextInput
                style={styles.description}
                onChangeText={setTime}
                value={time}></TextInput>
              {/* <Text style={styles.description}>10:00 AM - 01:00 AM</Text> */}
            </View>
            <Image
              source={images.clockIcon}
              style={styles.clockIcon}
              resizeMode="contain"
            />
          </View>

          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.timeContainer}> */}
          <Text style={styles.title}>Location</Text>
          <TouchableOpacity style={styles.timeContainer}>
            <Text style={styles.descriptionTwo}>{location}</Text>

            <Image
              source={images.dropDown}
              style={styles.clockIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.nextBtn}>
          <Button
            title={'Next'}
            onPress={() => navigation.navigate('SetUpServices')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
