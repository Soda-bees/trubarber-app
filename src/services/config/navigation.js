import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import Explore from '../../screens/Explore';
import Catalogue from '../../screens/Catalogue';
import WelcomeScreen from '../../screens/WelcomeScreen';
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import ForgotPass from '../../screens/ForgotPass';
import Otp from '../../screens/Otp';
import ResetPass from '../../screens/ResetPass';
import AccountSetup from '../../screens/AccountSetup';
import ProfileSetupPrompt from '../../screens/ProfileSetupPrompt';
import UploadProfilepic from '../../screens/UploadProfilepic';
import ProfilePrompt from '../../screens/ProfilePrompt';
import SurveyPrompt from '../../screens/SurveyPrompt';
import CustomerPrefences from '../../screens/CustomerPrefences';
import SetUpOutlet from '../../screens/SetUpOutlet';
import TagSelection from '../../screens/TagSelection';
import WholeMap from '../../screens/WholeMap';
import BookAppointment from '../../screens/BookAppointment';
import BookingProcess from '../../screens/BookingProcess';
import AddCard from '../../screens/AddCard';
import ServiceDetails from '../../screens/ServiceDetails';
import HaircutServices from '../../screens/HaircutServices';
import AppointmentDetails from '../../screens/AppointmentDetails';
import EditScreen from '../../screens/EditScreen';
import ProfileSecurity from '../../screens/ProfileSecurity';
import PrivacyPolicy from '../../screens/PrivacyPolicy';
import SetUpServices from '../../screens/SetUpServices';
import ServiceInfo from '../../screens/ServiceInfo';
import OutletTags from '../../screens/OutletTags';
import BusinessVerfication from '../../screens/BusinessVerfication';
import OutletCreated from '../../screens/OutletCreated';
import AppoinmentBarber from '../../screens/AppoinmentBarber';
import BarberDashboard from '../../screens/BarberDashboard';
import BarberProfile from '../../screens/BarberProfile';
import BarberSevriceDetails from '../../screens/BarberServiceDetails';
import EditService from '../../screens/EditService';
import BarberTabNavigation from './BarbertabNavigation';
import Reviews from '../../screens/Reviews';
import Notifications from '../../screens/Notifications';
import Chats from '../../screens/Chats';
import ChatDetails from '../../screens/ChatDetails';
import AddServices from '../../screens/AddServices';
import Congratulation from '../../screens/Congratulation';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authToken';
import { selectRole } from '../../store/role';
import Review from '../../screens/Review';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { sizes } from '../utilities/sizes';
import { colors } from '../utilities/colors';
import formatToJSON from './FormatToJson';
import { addAppoinment, selectUserData, setUserData } from '../../store/userData';
import { handleGetUserDetails } from './API';
import AuthSetUpServices from '../../screens/AuthSetUpServices';
import AuthServiceInfo from '../../screens/AuthServiceInfo';
import { socketService, socket } from '../Socket';
import BarberDirection from '../../screens/BarberDirection';



const Stack = createStackNavigator();

export default function MainNavigator() {
  const authToken = useSelector(selectAuthToken);
  const role = useSelector(selectRole);
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const cleanup = socketService(dispatch, authToken, userData);

    return () => {
      cleanup();
    };
  }, [userData]);

  const NAVIGATION_IDS = [
    'Notifications',
    'Appointments',
    'AppoinmentBarber',
    'ChatDetails',
  ];

  const getDetails = async () => {
    try {
      const response = await handleGetUserDetails(authToken);
      if (response?.status == 200) {
        console.log('get barber details navigation');
        dispatch(setUserData(response?.data?.userData));
      }
    } catch (error) {
      console.log('error in barber details', error);
    }
  };

  function buildDeepLinkFromNotificationData(data) {
    const navigationId = data?.navigationId;
    if (navigationId) {
      getDetails()
    }
    if (!NAVIGATION_IDS.includes(navigationId)) {
      console.warn('Unverified navigationId', navigationId);
      return null;
    }
    if (navigationId === 'Notifications') {
      return 'myapp://Notifications';
    }
    if (navigationId === 'AppoinmentBarber') {
      return 'myapp://AppoinmentBarber';
    }
    if (navigationId === 'Appointments') {
      return 'myapp://Appointments';
    }
    if (navigationId === 'ChatDetails') {
      const { chatRoomId } = data;
      return `myapp://ChatDetails/${chatRoomId}`;
    }
    return null;
  }

  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        Notifications: 'Notifications',
        ChatDetails: 'ChatDetails/:chatRoomId',
        BarberTabs: {
          screens: {
            AppoinmentBarber: 'AppoinmentBarber',
          },
        },
        MyTabs: {
          screens: {
            Appointments: 'Appointments',
          },
        },
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (typeof url === 'string') {
        return url;
      }
      //getInitialNotification: When the application is opened from a quit state.
      const message = await messaging().getInitialNotification();
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
      if (typeof deeplinkURL === 'string') {
        return deeplinkURL;
      }
    },
    subscribe(listener) {
      const onReceiveURL = ({ url }) => listener(url);

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

      //onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (typeof url === 'string') {
          listener(url);
        }
      });

      return () => {
        linkingSubscription.remove();
        unsubscribe();
      };
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {!authToken ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="ResetPass" component={ResetPass} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="AccountSetup" component={AccountSetup} />
          <Stack.Screen name="ProfilePrompt" component={ProfilePrompt} />
          <Stack.Screen name="UploadProfilepic" component={UploadProfilepic} />
          <Stack.Screen
            name="ProfileSetupPrompt"
            component={ProfileSetupPrompt}
          />
          <Stack.Screen name="SurveyPrompt" component={SurveyPrompt} />
          <Stack.Screen
            name="CustomerPrefences"
            component={CustomerPrefences}
          />
          <Stack.Screen name="SetUpOutlet" component={SetUpOutlet} />
          <Stack.Screen name="TagSelection" component={TagSelection} />
          <Stack.Screen name="Congratulation" component={Congratulation} />
          <Stack.Screen
            name="AuthSetUpServices"
            component={AuthSetUpServices}
          />
          <Stack.Screen name="AuthServiceInfo" component={AuthServiceInfo} />
          <Stack.Screen name="OutletTags" component={OutletTags} />
          <Stack.Screen
            name="BusinessVerfication"
            component={BusinessVerfication}
          />
          <Stack.Screen name="OutletCreated" component={OutletCreated} />
        </Stack.Navigator>
      ) : role === 'user' ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="BookAppointment" component={BookAppointment} />
          <Stack.Screen name="WholeMap" component={WholeMap} />
          <Stack.Screen name="BookingProcess" component={BookingProcess} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
          <Stack.Screen name="HaircutServices" component={HaircutServices} />
          <Stack.Screen
            name="AppointmentDetails"
            component={AppointmentDetails}
          />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="ProfileSecurity" component={ProfileSecurity} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen
            name="BarberSevriceDetails"
            component={BarberSevriceDetails}
          />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="ChatDetails" component={ChatDetails} />
          <Stack.Screen name="Review" component={Review} />
          <Stack.Screen name="BarberDirection" component={BarberDirection} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BarberTabs" component={BarberTabs} />
          <Stack.Screen name="WholeMap" component={WholeMap} />
          <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
          <Stack.Screen name="HaircutServices" component={HaircutServices} />
          <Stack.Screen
            name="AppointmentDetails"
            component={AppointmentDetails}
          />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="ProfileSecurity" component={ProfileSecurity} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="SetUpServices" component={SetUpServices} />
          <Stack.Screen name="ServiceInfo" component={ServiceInfo} />
          <Stack.Screen name="BarberProfile" component={BarberProfile} />
          <Stack.Screen
            name="BarberSevriceDetails"
            component={BarberSevriceDetails}
          />
          <Stack.Screen name="EditService" component={EditService} />
          <Stack.Screen name="Reviews" component={Reviews} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="ChatDetails" component={ChatDetails} />
          <Stack.Screen name="AddServices" component={AddServices} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const MyTabs = () => {
  return <TabNavigation />;
};

const BarberTabs = () => {
  return <BarberTabNavigation />;
};
