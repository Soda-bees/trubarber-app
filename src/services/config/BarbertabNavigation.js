import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {sizes} from '../utilities/sizes';
import {colors} from '../utilities/colors';
import images from '../utilities/images';
import {Image, Text, View, Platform} from 'react-native';
import {fontSize} from '../utilities/fonts';
import {Shadow} from 'react-native-shadow-2';
import BaberCatalogue from '../../screens/BarberCatalogue';
import AppoinmentBarber from '../../screens/AppoinmentBarber';
import BarberDashboard from '../../screens/BarberDashboard';
import BarberProfile from '../../screens/BarberProfile';

const Tab = createBottomTabNavigator();
export default function BarberTabNavigation() {
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
        name="BarberDashboard"
        component={BarberDashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={
                  // !focused
                  // ? images.dashboardTabBefore
                  // :
                  images.dashboardTabAfter
                }
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
          // tabBarLabel: ({ focused }) => (
          //   <CustomTabLabel focused={focused} label="Dashboard" />
          // ),
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="BaberCatalogue"
        component={BaberCatalogue}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                // !focused ?
                images.catalogueTabBefore
                // :
                // images.catalogueTabAfter
              }
              style={{
                resizeMode: 'contain',
                width: sizes.screenWidth * 0.06,
                height: focused
                  ? sizes.screenWidth * 0.06
                  : sizes.screenWidth * 0.06,
                tintColor: focused ? colors.black : colors.grayBorder,
              }}
            />
          ),
          // tabBarLabel: ({ focused }) => (
          //   <CustomTabLabel focused={focused} label="Catalogue" />
          // ),

          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="AppoinmentBarber"
        component={AppoinmentBarber}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={
                  // !focused
                  images.appointmentTabBefore
                  // : images.appointmentTabAfter
                }
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
          // tabBarLabel: ({ focused }) => (
          //   <CustomTabLabel focused={focused} label="Appointment" />
          // ),

          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={BarberProfile}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={images.profileTabAfter}
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

          // tabBarLabel: ({ focused }) => (
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
