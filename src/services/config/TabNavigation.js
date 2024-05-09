import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {sizes} from '../utilities/sizes';
import {colors} from '../utilities/colors';
import images from '../utilities/images';
import {Image, Text, View} from 'react-native';
import {fontSize} from '../utilities/fonts';
import Profile from '../../screens/Profile';
import Explore from '../../screens/Explore';
import Catalogue from '../../screens/Catalogue';
import Appointments from '../../screens/Appointments';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          width: sizes.screenWidth,
          height: sizes.screenHeight * 0.075,
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
              source={!focused ? images.exploreTabBerfore : images.exploreTabAfter}
              style={{
                resizeMode: 'contain',
                width: sizes.screenWidth * 0.05,
                height: focused
                  ? sizes.screenWidth * 0.05
                  : sizes.screenWidth * 0.05,
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Explore" />
          ),
        }}
      />
      <Tab.Screen
        name="Catalogue"
        component={Catalogue}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={!focused ? images.catalogueTabBefore : images.catalogueTabAfter}
                style={{
                  resizeMode: 'contain',
                  width: sizes.screenWidth * 0.05,
                  height: focused
                    ? sizes.screenWidth * 0.05
                    : sizes.screenWidth * 0.05,
                }}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Catalogue" />
          ),
        }}
      />

      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={!focused ? images.appointmentTabBefore : images.appointmentTabAfter}
                style={{
                  resizeMode: 'contain',
                  width: sizes.screenWidth * 0.05,
                  height: focused
                    ? sizes.screenWidth * 0.05
                    : sizes.screenWidth * 0.05,
                }}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Appointments" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={!focused ? images.profileTabBefore : images.profileTabAfter}
                style={{
                  resizeMode: 'contain',
                  width: sizes.screenWidth * 0.05,
                  height: focused
                    ? sizes.screenWidth * 0.05
                    : sizes.screenWidth * 0.05,
                }}
              />
            </View>
          ),
         
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Profile" />
          ),
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
        color: focused ? colors.btnColor : colors.gray,
        fontSize: fontSize.small,
        marginBottom:sizes.screenHeight * 0.01,
        
      }}>
      {label}
    </Text>
  );
};
