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
import React, { useState } from 'react';
import images from '../../services/utilities/images';
import { styles } from './style.js';
import Button from '../../components/Button';
import { colors } from '../../services';
import BackArrow from '../../components/BackArrow';
import { ErrorShow } from '../../components/Error';
import { useSelector } from 'react-redux';
import { selectRole } from '../../store/role';
import { handleForgotPass } from '../../services/config/API';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';

export default function ForgotPass({ navigation }) {

  const role = useSelector(selectRole)

  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false)

  const handlegoBack = () => {
    navigation.goBack()
  }

  const handleConfirm = async () => {
    try {
      setLoader(true)
      const body = { email, role }
      const response = await handleForgotPass(body)
      if (response?.status == 200) {
        setLoader(false)
        console.log(response?.data?.otp);
        navigation.navigate('Otp', { email, otp: response?.data?.otp })
      } else {
        setLoader(false)
        ErrorShow('error', 'Oops', response?.data?.message)
      }
    } catch (error) {
      setLoader(false)
      console.log(error);
      ErrorShow('error', 'Oops', error?.message)
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.arrowTop}>
          <BackArrow onPress={handlegoBack} />
        </View>
        <Text style={styles.forgotPass}>Forgot Password?</Text>
        <Text style={styles.text}>
          Please enter your email to receive a verification code
        </Text>

        <View style={styles.wholeContainer}>
          <Image
            source={images.Message}
            style={styles.message}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor={colors.placeholdertextgray}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>
        <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
          {
            loader ?
              <Loader title={'Next'} /> :
              <Button title={'Next'} onPress={handleConfirm} />
          }
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
