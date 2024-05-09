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

export default function ProfilePrompt({navigation}) {
  const [email, setEmail] = useState('');

  const handlegoBack = () => {
    navigation.goBack()
  }

  const handleUploadProfilePic = () =>{
    navigation.navigate('UploadProfilepic')
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlegoBack}>
          <Image
            style={styles.arrowblackleft}
            source={images.arrowblackleft}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.Hertotextcontainer}>
          <Text style={styles.heroText}>TRU BARBER</Text>
          <Text style={Platform.OS == 'android' ? styles.heroText : styles.heroTextIOS}>SETUP YOUR PROFILE</Text>
          <Text style={styles.heroText}>PROMPT</Text>
        </View>
        <View style={Platform.OS == 'android' ? styles.Nextbtn : styles.Nextbtn1IOS}>
          <Button title={'Next'} onPress={handleUploadProfilePic}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
