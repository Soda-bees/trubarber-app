import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';

export default function OutletCreated({navigation}) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={() =>  navigation.goBack()}/>
        </View>
        <Text style={styles.forgotPass}>REDBOX OUTLET CREATED!</Text>
        <View style={styles.grats}>
          <Image
            source={images.grats}
            resizeMode="contain"
            style={styles.resizeImg}
          />
          <View style={styles.gratsText}>
            <Text style={styles.title}>Congratutions!</Text>
            <Text style={styles.subText}>
              Your Redbox Outlet profile is now complete and ready to go.
            </Text>
          </View>
        </View>
        <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
        <TouchableOpacity style={styles.btnView} onPress={() => navigation.navigate('BarberTabs')}>
          <Text style={styles.btnText}>Get Ready</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
