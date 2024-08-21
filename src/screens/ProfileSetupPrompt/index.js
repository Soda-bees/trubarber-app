import { View, Text, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import { styles } from './style';
import BackArrow from '../../components/BackArrow';
import Button from '../../components/Button';

export default function ProfileSetupPrompt({ navigation, route }) {
  const { userData } = route.params;
  console.log(userData);


  const handlegoBack = () => {
    navigation.goBack();
  };

  const handleSurveryPrompt = () => {
    navigation.navigate('SurveyPrompt', { userData });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={handlegoBack} />
        </View>

        <View
          style={
            Platform.OS == 'android'
              ? styles.Hertotextcontainer
              : styles.HertotextcontainerIOS
          }>
          <Text style={styles.heroText}>
            HELP TRU BARBER VERIFY YOUR IDENTITY
          </Text>
        </View>
        <View
          style={
            Platform.OS == 'android' ? styles.buttonTop : styles.buttonTopIOS
          }>
          <Button title={'Next'} onPress={handleSurveryPrompt} />
        </View>
      </View>
    </SafeAreaView>
  );
}
