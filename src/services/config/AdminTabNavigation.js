import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdminRewards from '../../screens/AdminRewards';
import {sizes} from '../utilities/sizes';
import {colors} from '../utilities/colors';
import AdminChangePassword from '../../screens/AdminChangePassword';
import {Image, Text, Platform} from 'react-native';
import images from '../utilities/images';
import {fontSize} from '../utilities/fonts';
import AdminDashboard from '../../screens/AdminDashboard';
import AdminMenu from '../../screens/AdminMenu';
import AdminOffers from '../../screens/AdminOffers';
import AdminEvents from '../../screens/AdminEvents';

const Tab = createBottomTabNavigator();

export default function AdminTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colors.white,
          width: sizes.screenWidth,
          height: sizes.screenHeight * 0.09,
          paddingBottom: Platform.OS == 'android' ? sizes.screenHeight * 0.01 : sizes.screenHeight * 0.02,
          paddingHorizontal: sizes.screenWidth * 0.04,
          borderTopWidth: 1,
          borderColor: colors.bgLight,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          bottom: 0,
          position: 'absolute',
          elevation: 20,
          shadowColor: colors.black,
          shadowOffset: {width: 10, height: 10},
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      }}>
      <Tab.Screen
        name={'Menu'}
        component={AdminMenu}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? images.menuTabOn : images.menuTabOff}
              style={{
                resizeMode: 'contain',
                width: sizes.screenWidth * 0.08,
                height: sizes.screenWidth * 0.08,
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Menu" />
          ),
        }}
      />
      <Tab.Screen
        name={'AdminOffers'}
        component={AdminOffers}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? images.offerTabOn : images.offerTabOff}
              style={{
                resizeMode: 'contain',
                width: sizes.screenWidth * 0.08,
                height: sizes.screenWidth * 0.08,
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Offers" />
          ),
        }}
      />
      <Tab.Screen
        name={'Dashboard'}
        component={AdminDashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? images.dashboardTabOn : images.dashboardTabOff}
              style={{
                resizeMode: 'contain',
                width: sizes.screenWidth * 0.08,
                height: sizes.screenWidth * 0.08,
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Dashboard" />
          ),
        }}
      />
      <Tab.Screen
        name={'AdminEvents'}
        component={AdminEvents}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? images.eventTabOn : images.eventTabOff}
              style={{
                resizeMode: 'contain',
                width: sizes.screenWidth * 0.08,
                height: sizes.screenWidth * 0.08,
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Events" />
          ),
        }}
      />
      <Tab.Screen
        name={'Settings'}
        component={AdminRewards}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? images.rewardsTabOn : images.rewardsTabOff}
              style={{
                resizeMode: 'contain',
                width: sizes.screenWidth * 0.08,
                height: sizes.screenWidth * 0.08,
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <CustomTabLabel focused={focused} label="Rewards" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const CustomTabLabel = ({focused, label}) => {
  const inactiveColor = colors.black;
  const activeColor = colors.darkTeal;
  return (
    <Text
      style={{
        color: focused ? activeColor : inactiveColor,
        fontSize: fontSize.smallM,
      }}>
      {label}
    </Text>
  );
};
