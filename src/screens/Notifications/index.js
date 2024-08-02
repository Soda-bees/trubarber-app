import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import {
  SwipeButtonsContainer,
  SwipeItem,
  SwipeProvider,
} from 'react-native-swipe-item';
import {
  differenceInMilliseconds,
  format,
  formatDistanceToNow,
  parse,
} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectUserData,
  setNotificationSeenTrueRedux,
} from '../../store/userData';
import formatToJSON from '../../services/config/FormatToJson';
import moment from 'moment';
import {handleNotificationSeenTrue} from '../../services/config/API';
import {selectAuthToken} from '../../store/authToken';
import Header from '../../components/Header';

export default function Notifications({navigation}) {
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState([
    {
      title: 'Booking Done!',
      detail: 'The haircut appointment has been scheduled.',
      time: format(new Date(), 'MM-dd-yyyy hh:mm a'),
    },
    {
      title: 'Booking Done!',
      detail: 'The haircut appointment has been scheduled.',
      time: format(new Date(), 'MM-dd-yyyy hh:mm a'),
    },
    {
      title: 'Booking Done!',
      detail: 'The haircut appointment has been scheduled.',
      time: format(new Date(), 'MM-dd-yyyy hh:mm a'),
    },
  ]);
  const userData = useSelector(selectUserData);
  // console.log(formatToJSON(userData?.notification[0]));

  const calculateTimeAgo = createdAt => {
    const currentDate = new Date();
    const timestamp = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - timestamp);

    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const removeItemAtIndex = indexToRemove => {
    setNotification(prevList => {
      return prevList.filter((_, index) => index !== indexToRemove);
    });
  };

  useEffect(() => {
    setSeenTrue();
  }, []);

  const setSeenTrue = async () => {
    try {
      let notificationsIds = [];
      if (userData?.role == 'user') {
        notificationsIds = userData?.notification.filter(
          notification => notification?.userSeen === false,
        );
      } else {
        notificationsIds = userData?.notification.filter(
          notification => notification?.barberSeen === false,
        );
      }
      if (notificationsIds?.length > 0) {
        const response = await handleNotificationSeenTrue(
          authToken,
          notificationsIds,
        );
        dispatch(setNotificationSeenTrueRedux());
      }
    } catch (error) {
      console.log('Error in update notification', error);
    }
  };

  const leftButton = index => (
    <SwipeButtonsContainer style={styles.swipeItem}>
      <View style={styles.swipeContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('left button clicked');
            removeItemAtIndex(index);
          }}>
          <Image style={styles.swipeDeleteIcon} source={images.deleteIconBig} />
        </TouchableOpacity>
      </View>
    </SwipeButtonsContainer>
  );
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Notifications'} />
        <ScrollView style={Platform.OS === "android" ? styles.scrollContianer : styles.scrollContianerIOS}>
          <View style={styles.containerBody}>
            {userData?.notification?.length > 0 ? (
              userData?.notification
                ?.map((item, index) => {
                  const timeAgo = calculateTimeAgo(item.createdAt);
                  return (
                    // <SwipeProvider key={index}>
                    //   <SwipeItem
                    //     style={styles.notificationSwipeContainer}
                    //     swipeContainerStyle={{}}
                    //     leftButtons={leftButton(index)}>
                    <View style={styles.notficationContainer} key={index}>
                      <Image source={images.calendarIcon} />
                      <View style={styles.notficationDetailContainer}>
                        <Text style={styles.notificationTitle}>
                          {item.title}
                        </Text>
                        <Text style={styles.notificationDetail}>
                          {item.body}
                        </Text>
                        <Text style={styles.notificationTime}>{timeAgo}</Text>
                      </View>
                    </View>
                    //   </SwipeItem>
                    // </SwipeProvider>
                  );
                })
                .reverse()
            ) : (
              <View style={styles.noChatView}>
                <Image
                  style={styles.noChatImg}
                  source={images.noNotification}
                />
                <Text style={styles.noChatText}>
                  You don't have any notifications yet
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
