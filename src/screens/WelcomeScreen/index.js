import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';

export default function WelcomeScreen({navigation}) {
  const [imgActive, setImgActive] = useState(0);
  const [itemList, setItem] = useState(['Text1', 'Text3', 'Text4']);

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.round(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUP = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={({nativeEvent}) => onchange(nativeEvent)}>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <ImageBackground
              style={styles.letsGetStartedImg1}
              source={images.bigSliderhat}>
              <View style={styles.textContainer}>
                <Text style={Platform.OS == 'android' ? styles.textBoldBlack : styles.textBoldBlackIOS}>Welcome to True Barber</Text>
                <Text style={styles.subTitle}>Where Style Meets Precision</Text>
                <Text style={styles.description}>
                  A sleek and modern barber shop interior, with stylish barber
                  chairs, mirrors, and tools of the trade.
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <ImageBackground
              style={styles.letsGetStartedImg1}
              source={images.bigSliderbeard}>
              <View>
                <View style={styles.textContainer}>
                  <Text style={styles.textBoldBlack}>
                    Experience Excellence
                  </Text>
                  <Text style={styles.subTitle}>
                    Crafting Confidence, One Cut at a Time
                  </Text>
                  <Text style={styles.description}>
                    A diverse group of satisfied customers getting haircuts,
                    styled beards, and other grooming services at True Barber.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <ImageBackground
              style={styles.letsGetStartedImg1}
              source={images.bigSlidercut}>
              <View style={styles.textContainer}>
                <Text style={styles.textBoldBlack}>Unleash Your Style</Text>
                <Text style={styles.subTitle}>
                  Tailored Cuts for Every Individual
                </Text>
                <Text style={styles.description}>
                  Close-up shots of skilled barbers using scissors, clippers,
                  and other tools with precision.
                </Text>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>

        <View style={Platform.OS == 'android' ? styles.wrapDot : styles.wrapDotIOS}>
          {itemList?.map((item, index) => {
            return (
              <View key={index}>
                {imgActive !== 3 && (
                  <View>
                 {Platform.OS == 'android' ? (
                     <Text
                     // key={index}
                     style={
                       imgActive == index ? styles.dotActive : styles.dot
                     }>
                     __
                   </Text>
                 ) : (
                  <Text
                  // key={index}
                  style={
                    imgActive == index ? styles.dotActiveIOS : styles.dotIOS
                  }>
                  __
                </Text>
                 )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <View style={Platform.OS == 'android' ? styles.buttonContainer : styles.buttonContainerIOS}>
          <TouchableOpacity style={styles.btnViewLight} onPress={handleLogin}>
            <Text style={styles.btnTextLight}>Sign In</Text>
            <Image
              source={images.arrowIcon}
              style={styles.arrowIconLight}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Button title={'Sign Up'}  onPress={handleSignUP}/>
        </View>
        {/* <View style={Platform.OS == 'ios' ? styles.wrapDotIOS : styles.wrapDot}>
          {item?.map((item, index) => {
            return (
              <View key={index}>
                {Platform.OS == 'android' ? (
                  <Text
                    key={index}
                    style={imgActive == index ? styles.dotActive : styles.dot}>
                    ⬤
                  </Text>
                ) : (
                  <Octicons
                    name={'dot-fill'}
                    color={colors.white}
                    size={sizes.screenHeight * 0.03}
                    style={imgActive == index ? styles.dotActive : styles.dot}
                  />
                )}
              </View>
            );
          })}
        </View> */}
      </View>
    </SafeAreaView>
  );
}
