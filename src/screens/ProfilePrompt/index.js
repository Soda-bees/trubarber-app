import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import images from '../../services/utilities/images';
import { styles } from './style.js';
import Button from '../../components/Button';
import { fontSize, sizes } from '../../services';

export default function ProfilePrompt({ navigation, route }) {
  const { userData } = route.params;
  const [email, setEmail] = useState('');

  const handlegoBack = () => {
    navigation.goBack()
  }

  const handleUploadProfilePic = () => {
    navigation.navigate('UploadProfilepic', { userData })
  }

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
        <TouchableOpacity onPress={handlegoBack}>
          <Image
            style={styles.arrowblackleft}
            source={images.arrowblackleft}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: sizes.screenHeight * 0.75 }}>
          <Image source={images.logoBlack} style={styles.logoBlack} />
          <View>
            <SlidingText text={"Setup"} bold slow={false} />
            <SlidingText text={"Your"} bold slow={false} />
            <SlidingText text={"Profile!"} bold slow={false} />
          </View>
          <View>
            <SlidingText text={"Complete your profile"} bold={false} slow={false} />
            <SlidingText text={"requirements for personalisation. "} bold={false} slow={false} />
          </View>
        </View>

        <View style={Platform.OS == 'android' ? styles.Nextbtn : styles.Nextbtn1IOS}>
          <Button title={'Next'} onPress={handleUploadProfilePic} />
        </View>
      </View>
    </SafeAreaView>
  );
}
