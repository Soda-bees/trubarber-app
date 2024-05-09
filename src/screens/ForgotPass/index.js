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
import {colors} from '../../services';
import BackArrow from '../../components/BackArrow';

export default function ForgotPass({navigation}) {
  const [email, setEmail] = useState('');
  
  const handlegoBack = () => {
    navigation.goBack()
  }

  const handleOTP = () =>{
    navigation.navigate('Otp')
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.arrowTop}>
          <BackArrow onPress={handlegoBack}/>
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
        <View style={styles.nextBtn}>
          <Button title={'Next'} onPress={handleOTP}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
