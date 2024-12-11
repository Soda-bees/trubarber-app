import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {sizes} from '../utilities/sizes';
import {colors} from '../utilities/colors';
import images from '../utilities/images';
import {Image, Platform, Text, View} from 'react-native';
import {fontSize} from '../utilities/fonts';
import Profile from '../../screens/Profile';
import Explore from '../../screens/Explore';
import Catalogue from '../../screens/Catalogue';
import Appointments from '../../screens/Appointments';
import {useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authToken';
import WelcomeScreen from '../../screens/WelcomeScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const authToken = useSelector(selectAuthToken);
  const bottomTabStyling = {
    backgroundColor: colors.white,
    width: sizes.screenWidth,
    height:
      Platform.OS == 'android'
        ? sizes.screenHeight * 0.075
        : sizes.screenHeight * 0.09,
    paddingTop: sizes.screenHeight * 0.01,
    paddingHorizontal: sizes.screenWidth * 0.04,
    borderTopRightRadius: sizes.screenWidth * 0.07,
    borderTopLeftRadius: sizes.screenWidth * 0.07,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          width: sizes.screenWidth,
          height:
            Platform.OS == 'android'
              ? sizes.screenHeight * 0.075
              : sizes.screenHeight * 0.09,
          paddingTop: sizes.screenHeight * 0.01,
          paddingHorizontal: sizes.screenWidth * 0.04,
          borderTopRightRadius: sizes.screenWidth * 0.07,
          borderTopLeftRadius: sizes.screenWidth * 0.07,
        },
      }}>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={images.exploreTabBerfore}
              style={{
                // resizeMode: 'contain',
                width: sizes.screenWidth * 0.06,
                height: focused
                  ? sizes.screenWidth * 0.06
                  : sizes.screenWidth * 0.06,
                tintColor: focused ? colors.black : colors.grayBorder,
              }}
            />
          ),
          // tabBarLabel: ({focused}) => (
          //   <CustomTabLabel focused={focused} label="Explore" />
          // ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Catalogue"
        component={Catalogue}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={images.catalogueTabBefore}
                style={{
                  resizeMode: 'contain',
                  width: sizes.screenWidth * 0.06,
                  height: focused
                    ? sizes.screenWidth * 0.06
                    : sizes.screenWidth * 0.06,
                  tintColor: focused ? colors.black : colors.grayBorder,
                }}
              />
            </View>
          ),
          // tabBarLabel: ({focused}) => (
          //   <CustomTabLabel focused={focused} label="Catalogue" />
          // ),
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="Appointments"
        component={authToken ? Appointments : WelcomeScreen}
        options={{
          tabBarStyle: authToken ? bottomTabStyling : {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={images.appointmentTabBefore}
                style={{
                  resizeMode: 'contain',
                  width: sizes.screenWidth * 0.06,
                  height: focused
                    ? sizes.screenWidth * 0.06
                    : sizes.screenWidth * 0.06,
                  tintColor: focused ? colors.black : colors.grayBorder,
                }}
              />
            </View>
          ),
          // tabBarLabel: ({focused}) => (
          //   <CustomTabLabel focused={focused} label="Appointments" />
          // ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={authToken ? Profile : WelcomeScreen}
        options={{
          tabBarStyle: authToken ? bottomTabStyling : {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={images.profileTabBefore}
                style={{
                  resizeMode: 'contain',
                  width: sizes.screenWidth * 0.06,
                  height: focused
                    ? sizes.screenWidth * 0.06
                    : sizes.screenWidth * 0.06,
                  tintColor: focused ? colors.black : colors.grayBorder,
                }}
              />
            </View>
          ),

          // tabBarLabel: ({focused}) => (
          //   <CustomTabLabel focused={focused} label="Profile" />
          // ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const CustomTabLabel = ({focused, label}) => {
  const inactiveColor = colors.black;
  const activeColor = colors.tealMix;
  return (
    <Text
      style={{
        color: focused ? colors.black : colors.grayBorder,
        fontSize: fontSize.small,
        marginBottom: sizes.screenHeight * 0.01,
        fontWeight: focused ? '500' : '400',
      }}>
      {label}
    </Text>
  );
};
