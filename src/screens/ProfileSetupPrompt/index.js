import {
  View, Text, SafeAreaView, Platform,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import images from '../../services/utilities/images';
import { styles } from './style';
import BackArrow from '../../components/BackArrow';
import Button from '../../components/Button';
import { fontSize, sizes } from '../../services';

export default function ProfileSetupPrompt({ navigation, route }) {
  const { userData } = route.params;
  console.log(userData);


  const handlegoBack = () => {
    navigation.goBack();
  };

  const handleSurveryPrompt = () => {
    navigation.navigate('SurveyPrompt', { userData });
  };

  const SlidingText = ({ text, bold, slow }) => {
    const screenWidth = Dimensions.get('window').width; // Get screen width
    const slideAnim = useRef(new Animated.Value(screenWidth)).current; // Start the text off-screen (to the right)

    useEffect(() => {
      // Animate the text from right to left
      Animated.timing(slideAnim, {
        toValue: 0, // Final position (starting from the left)
        duration: slow ? 1600 : 800, // Duration of the animation (2 seconds)
        useNativeDriver: true, // Use native driver for better performance
        easing: Easing.out(Easing.ease),
      }).start();
    }, [slideAnim]);

    return (
      <View>
        <Animated.Text
          style={{
            // backgroundColor: 'red',
            width: sizes.screenWidth, // Full screen width
            transform: [{ translateX: slideAnim }], // Apply the animation to slide horizontally
            fontSize: bold ? fontSize.custom : fontSize.extraLarge,
            fontWeight: bold ? '900' : '500',
            // textAlign: 'center',
            color: 'black',
            paddingLeft: sizes.screenWidth * 0.06
          }}
        >
          {text}
        </Animated.Text>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={handlegoBack} />
        </View>

        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: sizes.screenHeight * 0.75 }}>
          <Image source={images.logoBlack} style={styles.logoBlack} />
          <View>
            <SlidingText text={"Verify"} bold slow={false} />
            <SlidingText text={"Your"} bold slow={false} />
            <SlidingText text={"Identity!"} bold slow={false} />
          </View>
          <View>
            <SlidingText text={"Complete the verification process"} bold={false} slow={false} />
            <SlidingText text={"to let the barbers know the real"} bold={false} slow={false} />
            <SlidingText text={"you!"} bold={false} slow={false} />
          </View>
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
