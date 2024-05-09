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
import {colors, sizes} from '../../services';
import Backarrow from '../../components/BackArrow';
import {Checkbox} from 'react-native-paper';
import BackArrow from '../../components/BackArrow';

export default function AccountSetup({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [cityAdress, setcityAdress] = useState('');
  const [checked, setChecked] = useState(false);

  const handleProfilePrompt = () =>{
    navigation.navigate('ProfilePrompt')
  }

  const handlegoBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.arrowTop}>
          <BackArrow onPress={handlegoBack}/>
        </View>
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
                onChangeText={text => {
                  setName(text);
                }}
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
                onChangeText={text => {
                  setEmail(text);
                }}
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
          <View style={styles.inputField}>
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
          </View>
        </View>

        <View style={styles.checkboxView}>
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
                  style={[styles.checked,styles.tintColor]}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.checkboxTitle}>
            By selecting the checkbox, you are indicating your agreement to the
            Terms and Policies.
          </Text>
        </View>

        <View style={styles.nextBtn}>
          <Button title={'Next'} onPress={handleProfilePrompt}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
