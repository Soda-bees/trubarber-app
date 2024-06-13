import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import { colors } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { removeRole, selectRole, setRole } from '../../store/role';

export default function Login({ navigation }) {

  const dispatch = useDispatch()

  const role = useSelector(selectRole)

  const [showPass, setShowpass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (role) {
      if (role === 'user') {
        navigation.navigate('MyTabs');
      } else {
        navigation.navigate('BarberTabs');
      }
    } else {
      console.warn('Please select role')
    }

  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPass');
  };

  const handleSignUP = () => {
    navigation.navigate('Signup');
  };

  const handleChangeRole = (role) => {
    dispatch(setRole(role))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={role === 'user' ? styles.active : styles.inActive}
          onPress={() =>
            handleChangeRole('user')
            // setactive('user')
          }>
          <Text
            style={
              role == 'user'
                ? styles.textColorwhite
                : styles.toggleTextsize
            }>
            User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={role == 'barber' ? styles.active : styles.inActive}
          onPress={() =>
            handleChangeRole('barber')
            // setactive('barber')
          }>
          <Text
            style={
              role == 'barber'
                ? styles.textColorwhite
                : styles.toggleTextsize
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
        <Button title={'Login'} onPress={handleLogin} />
      </View>

      <View style={styles.signupContainer}>
        <View style={styles.centerText}>
          <Text style={styles.textColor}>Don’t have an account?</Text>
        </View>
        <Button title={'Sign Up'} light={true} onPress={handleSignUP} />
        {/* <Button title={'Sign Up'} light={true} onPress={handleSignUP}/> */}
      </View>
    </SafeAreaView>
  );
}
