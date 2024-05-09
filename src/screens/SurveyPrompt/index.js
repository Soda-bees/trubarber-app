import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from '../ProfilePrompt/style.js';
import Button from '../../components/Button';

export default function SurveyPrompt({navigation}) {
  const [email, setEmail] = useState('');

  const handlegoBack = () => {
    navigation.goBack()
  }

  const handleCustomerPreferences = () => {
    navigation.navigate('CustomerPrefences')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlegoBack}>
        <Image
          style={styles.arrowblackleft}
          source={images.arrowblackleft}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.Hertotextcontainer}>
        <Text style={styles.heroText}>TRU BARBER SURVEY PROMPT</Text>
      </View>
      <View style={styles.Nextbtn}>
        <Button title={'Next'} onPress={handleCustomerPreferences} />
      </View>
    </View>
  );
}
