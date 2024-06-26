import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import { colors } from '../../services';
import { useSelector } from 'react-redux';
import { selectRole } from '../../store/role';
import { ErrorShow } from '../../components/Error';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';
import { resetPassword } from '../../services/config/API';

export default function ResetPass({ navigation, route }) {

  const { email } = route?.params

  const role = useSelector(selectRole)

  const [showPass, setShowpass] = useState(false);
  const [showSecondpass, setShowsecondpass] = useState(false);
  const [password, setPassword] = useState('');
  const [reEnterpassword, setReenterPassword] = useState('');
  const [loader, setLoader] = useState(false)

  const onHide = () => {
    navigation.navigate('Login')
  }

  const handleResetPassword = async () => {
    try {
      setLoader(true)
      const body = { email, password, role }
      if (reEnterpassword !== password) {
        setLoader(false)
        return ErrorShow('error', 'Oops', "Password doesn't match")
      }
      const response = await resetPassword(body)
      if (response.status == 200) {
        setLoader(false)
        ErrorShow('success', 'Congratulation!', response?.data?.message, 'Login', navigation)
      } else {
        setLoader(false)
        ErrorShow('error', 'Oops', response?.data?.message)
      }
    } catch (error) {
      setLoader(false)
      ErrorShow('error', 'Oops', error?.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.forgotPass}>Reset Password</Text>
      <Text style={styles.subText}>
        Enter a new password to reset the password of your account
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputStyle}>
          <TextInput
            placeholder="Enter New Password"
            style={styles.input}
            secureTextEntry={!showPass}
            placeholderTextColor={colors.placeholdertextgray}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          {!showPass ? (
            <TouchableOpacity onPress={() => setShowpass(!showPass)}>
              <Image
                source={images.hidden}
                style={styles.inputImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowpass(!showPass)}>
              <Image
                source={images.show}
                style={styles.inputImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.wholeInput}>
        <View style={styles.inputStyle}>
          <TextInput
            placeholder="Re-enter Password"
            style={styles.input}
            secureTextEntry={!showSecondpass}
            placeholderTextColor={colors.placeholdertextgray}
            value={reEnterpassword}
            onChangeText={text => {
              setReenterPassword(text);
            }}
          />
          {!showSecondpass ? (
            <TouchableOpacity
              onPress={() => setShowsecondpass(!showSecondpass)}>
              <Image
                source={images.hidden}
                style={styles.inputImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setShowsecondpass(!showSecondpass)}>
              <Image
                source={images.show}
                style={styles.inputImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
        {
          loader ?
            <Loader title={'Next'} /> :
            <Button title={'Next'} onPress={handleResetPassword} />
        }
      </View>
      <Toast />
    </View>
  );
}
