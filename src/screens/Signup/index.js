import {
  Image,
  SafeAreaView,
  StyleSheet,
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


export default function Signup({ navigation }) {

  const role = useSelector(selectRole)
  const dispatch = useDispatch()

  const [showPass, setShowpass] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleSignUP = () => {
    if (role) {
      if (role === 'user') {
        navigation.navigate('AccountSetup');
      } else {
        navigation.navigate('SetUpOutlet');
      }
    } else {
      console.warn('Please select role')
    }
  };

  const handleChangeRole = (role) => {
    dispatch(setRole(role))
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={role == 'user' ? styles.active : styles.inActive}
          onPress={() =>
            handleChangeRole('user')
            //  setactive('user')
          }
        >
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
          }
        >
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
      <Text style={styles.loginText}>Sign Up</Text>
      <View style={styles.inputfields}>
        <View style={styles.inputContainer}>
          <Image
            source={images.user}
            style={styles.inputImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor={colors.placeholdertextgray}
            style={styles.input}
            value={userName}
            onChangeText={text => {
              setuserName(text);
            }}
          />
        </View>
        <View style={styles.inputEmailcontainer}>
          <Image
            source={images.Message}
            style={styles.inputImage}
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
        <View style={styles.inputPasswordcontainer}>
          <Image
            source={images.lock}
            style={styles.inputImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor={colors.placeholdertextgray}
            secureTextEntry={!showPass}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          {!showPass ? (
            <TouchableOpacity onPress={() => setShowpass(!showPass)}>
              <Image
                source={images.hidden}
                style={styles.eye}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowpass(!showPass)}>
              <Image
                source={images.show}
                style={styles.eye}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.forgotPass}>
        <Button title={'Sign Up'} onPress={handleSignUP} />
      </View>
      <View style={styles.SignupContainer}>
        <Text style={styles.fontWeight}>Already have an account?</Text>

        <Button title={'Sign In'} light={true} onPress={handleSignIn} />
        {/* <View style={styles.textContainer}>
          <Text style={styles.textOpacity}>
            By signing up I agree to the the Privacy Policy and Terms and
            Conditions
          </Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
