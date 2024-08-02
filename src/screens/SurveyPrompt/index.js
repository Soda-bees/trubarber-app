import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SurveyPrompt({navigation, route}) {
  const {userData} = route.params;

  const [email, setEmail] = useState('');

  const handlegoBack = () => {
    navigation.goBack();
  };

  const handleCustomerPreferences = () => {
    navigation.navigate('CustomerPrefences', {userData});
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={() => navigation.goBack()} />
        </View>
        <View
          style={
            Platform.OS == 'android'
              ? styles.Hertotextcontainer
              : styles.HertotextcontainerIOS
          }>
          <Text
            style={
              Platform.OS == 'android' ? styles.heroText : styles.heroTextIOS
            }>
            TRU BARBER SURVEY PROMPT
          </Text>
        </View>
        <View
          style={Platform.OS == 'android' ? styles.Nextbtn : styles.NextbtnIOS}>
          <Button title={'Next'} onPress={handleCustomerPreferences} />
        </View>
      </View>
    </SafeAreaView>
  );
}
