import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {colors} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import {removeRole, selectRole, setRole} from '../../store/role';
import {ErrorShow} from '../../components/Error';
import {signin} from '../../services/config/API';
import Toast from 'react-native-toast-message';
import {setUserData} from '../../store/userData';
import {setAuthToken} from '../../store/authToken';
import Loader from '../../components/Loader';
import {addPaymentCard} from '../../store/paymentCard';
import messaging from '@react-native-firebase/messaging';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const role = useSelector(selectRole);

  const [showPass, setShowpass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);

  // const handleLogin = () => {
  //   if (role) {
  //     if (role === 'user') {
  //       navigation.navigate('MyTabs');
  //     } else {
  //       navigation.navigate('BarberTabs');
  //     }
  //   } else {
  //     console.warn('Please select role')
  //   }

  // };

  const handleForgotPassword = () => {
    if (!role) {
      return ErrorShow('error', 'Oops', 'Please select role');
    }
    navigation.navigate('ForgotPass');
    setEmail('');
    setPassword('');
  };

  const handleSignUP = () => {
    navigation.navigate('Signup');
    setEmail('');
    setPassword('');
  };

  const handleChangeRole = role => {
    dispatch(setRole(role));
  };

  const handleSignIn = async () => {
    if (role == null) {
      return ErrorShow('error', 'Oops', 'Please select role');
    }
    try {
      setLoader(true);
      const body = {
        email,
        password,
        role,
        deviceToken,
      };
      const response = await signin(body);
      console.log(response?.data?.user?.role);
      if (response.status == 200) {
        setLoader(false);
        dispatch(setUserData(response?.data?.user));
        dispatch(setAuthToken(response?.data?.token));
        dispatch(setRole(response?.data?.user?.role));
        dispatch(addPaymentCard(response?.data?.user?.card));
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      ErrorShow('error', 'Oops', error?.message);
    }
  };

  // const getFcmToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     setDeviceToken(token);
  //     console.log('Notification token Login=', token);
  //     return token;
  //   } catch (error) {
  //     console.log('Error in generating token:', error);
  //   }
  // };

  // useEffect(() => {
  //   getFcmToken();
  // }, []);

  const getFcmToken = async () => {
    try {
      // Register the device for remote messages (iOS only)
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }

      // Get the FCM token
      const token = await messaging().getToken();
      setDeviceToken(token);
      console.log('Notification token Login=', token);
      return token;
    } catch (error) {
      console.log('Error in generating token:', error);
    }
  };

  useEffect(() => {
    // Request notification permission (iOS only)
    const requestPermission = async () => {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
          getFcmToken();
        } else {
          console.log('Notification permission denied');
        }
      } else {
        getFcmToken(); // Directly get token for Android
      }
    };

    requestPermission();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={role === 'user' ? styles.active : styles.inActive}
          onPress={
            () => handleChangeRole('user')
            // setactive('user')
          }>
          <Text
            style={
              role == 'user' ? styles.textColorwhite : styles.toggleTextsize
            }>
            User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={role == 'barber' ? styles.active : styles.inActive}
          onPress={
            () => handleChangeRole('barber')
            // setactive('barber')
          }>
          <Text
            style={
              role == 'barber' ? styles.textColorwhite : styles.toggleTextsize
            }>
            Barber
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.inputFields}>
        <View style={styles.wholeContainer}>
          <Image
            source={images.Message}
            style={styles.inputImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.placeholdertext}
            style={styles.input}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>
        <View style={styles.passwordInput}>
          <Image
            source={images.lock}
            style={styles.inputImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.placeholdertext}
            style={styles.input}
            secureTextEntry={!showPass}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          {!showPass ? (
            <TouchableOpacity
              styles={styles.paddingRight}
              onPress={() => setShowpass(!showPass)}>
              <Image
                source={images.hidden}
                style={styles.eyeicon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowpass(!showPass)}>
              <Image
                source={images.show}
                style={styles.eyeicon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.flexEnd} onPress={handleForgotPassword}>
          <Text style={styles.forgotPass}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonTop}>
        {loader ? (
          <Loader title={'Login'} />
        ) : (
          <Button title={'Login'} onPress={handleSignIn} />
        )}
      </View>

      <View style={styles.signupContainer}>
        <View style={styles.centerText}>
          <Text style={styles.textColor}>Don’t have an account?</Text>
        </View>
        <Button title={'Sign Up'} light={true} onPress={handleSignUP} />
        {/* <Button title={'Sign Up'} light={true} onPress={handleSignUP}/> */}
      </View>
      <Toast />
    </SafeAreaView>
  );
}
