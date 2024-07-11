import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {colors} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import {selectRole, setRole} from '../../store/role';
import {validateEmailAvailability} from '../../services/config/API';
import Toast from 'react-native-toast-message';
import {ErrorShow} from '../../components/Error';
import Loader from '../../components/Loader';
import {setAuthToken} from '../../store/authToken';

export default function Signup({navigation}) {
  const role = useSelector(selectRole);
  const dispatch = useDispatch();

  const [showPass, setShowpass] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleEmailValidation = async () => {
    if (role !== null) {
      if (email && password && userName) {
        if (password.length < 8) {
          return ErrorShow(
            'error',
            'Oops!',
            'Password must contain atleast 8 characters',
          );
        }
        if (!checked) {
          return ErrorShow('error', 'Oops!', 'Please select the checkbox');
        }
        try {
          setLoader(true);
          const response = await validateEmailAvailability(email);
          if (response.data.success) {
            const userData = {
              name: userName,
              email,
              password,
              role,
            };

            console.log(userData);

            if (role === 'user') {
              navigation.navigate('ProfilePrompt', {userData});
            } else {
              navigation.navigate('SetUpOutlet', {userData});
            }
            setLoader(false);
          } else {
            setLoader(false);
            return ErrorShow('error', 'Oops!', response.data.message);
          }
        } catch (error) {
          console.log(error);
          setLoader(false);
        }
      } else {
        ErrorShow('error', 'Oops!', 'All fields are required');
      }
    } else {
      ErrorShow('error', 'Oops!', 'Please select your Role');
    }
  };

  const handleChangeRole = r => {
    dispatch(setRole(r));
  };
  // console.log(role);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={role == 'user' ? styles.active : styles.inActive}
          onPress={
            () => handleChangeRole('user')
            //  setactive('user')
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
            By selecting the checkbox, you are indicating your agreement to the
            Terms and Policies.
          </Text>
        </View>
      </View>
      <View style={styles.forgotPass}>
        {loader ? (
          <Loader title={'Sign Up'} />
        ) : (
          <Button title={'Sign Up'} onPress={() => handleEmailValidation()} />
        )}
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
      <View style={styles.toasterStyle}>
        <Toast />
      </View>
    </SafeAreaView>
  );
}
