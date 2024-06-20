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
import React, {useEffect, useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import {colors, sizes} from '../../services';
import Backarrow from '../../components/BackArrow';
import {Checkbox} from 'react-native-paper';
import BackArrow from '../../components/BackArrow';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';

export default function AccountSetup({navigation, route}) {
  const {userData} = route.params;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState(null);
  const [cityAdress, setcityAdress] = useState('');
  const [checked, setChecked] = useState(false);
  const [stateChange, setStateChange] = useState(true);

  // const handleProfilePrompt = () => {
  //   navigation.navigate('ProfilePrompt');
  // };

  const handlegoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, []);

  const handleConfirm = () => {
    if (!phoneNumber) {
      return ErrorShow('error', 'Oops!', 'Please enter phone Number');
    }
    if (!checked) {
      return ErrorShow('error', 'Oops!', 'Please select the checkbox');
    }
    userData.phone = phoneNumber;
    navigation.navigate('ProfilePrompt', {userData});
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.arrowTop}>
          <BackArrow onPress={handlegoBack} />
        </View>
        <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={40}>
          <Text style={styles.Forgotpass}>Account SetUp</Text>
          <Text style={styles.textContainer}>
            Set Up Your Account by Filling in Your Details!
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.wholeContainer}>
              <View style={styles.row}>
                <Image source={images.user} style={styles.inputImage} />
                <TextInput
                  placeholder="Tyler Simons"
                  style={styles.input}
                  placeholderTextColor={colors.placeholdertext}
                  value={name}
                  // onChangeText={text => {
                  //   setName(text);
                  // }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <View style={styles.row}>
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
                  // onChangeText={text => {
                  //   setEmail(text);
                  // }}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <View style={styles.row}>
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
            {/* <View style={styles.inputField}>
              <View style={styles.row}>
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
            </View> */}
          </View>

          <View
            style={
              Platform.OS == 'android'
                ? styles.checkboxView
                : styles.checkboxViewIOS
            }>
            <View>
              {checked ? (
                <TouchableOpacity onPress={() => setChecked(!checked)}>
                  <Image
                    source={images.checked}
                    resizeMode="contain"
                    style={styles.checked}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setChecked(!checked)}>
                  <Image
                    source={images.unchecked}
                    resizeMode="contain"
                    style={[styles.checked, styles.tintColor]}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.checkboxTitle}>
              By selecting the checkbox, you are indicating your agreement to
              the Terms and Policies.
            </Text>
          </View>
        </KeyboardAwareScrollView>

        <View
          style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
          <Button title={'Next'} onPress={handleConfirm} />
        </View>
        <View style={styles.toasterStyle}>
          <Toast />
        </View>
      </View>
    </SafeAreaView>
  );
}
