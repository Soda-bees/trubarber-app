import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
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

export default function Notifications({navigation}) {
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
  const calculateTimeAgo = postTime => {
    const inputFormat = 'MM-dd-yyyy hh:mm a';
    const parsedDate = parse(postTime, inputFormat, new Date());
    const outputFormat = 'yyyy-MM-dd HH:mm';
    const targetDate1 = format(parsedDate, outputFormat);
    const targetDate = new Date(targetDate1);
    const currentDate = new Date();
    const timeDifference = currentDate - targetDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutesAgo = Math.floor((timeDifference / (1000 * 60)) % 60);
    if (daysAgo > 0) {
      return `${daysAgo} day ago`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} hour ago`;
    } else if (minutesAgo > 0) {
      return `${minutesAgo} min ago`;
    } else {
      return 'Just now';
    }
  };


  const removeItemAtIndex = indexToRemove => {
    setNotification(prevList => {
      return prevList.filter((_, index) => index !== indexToRemove);
    });
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
        <View style={styles.row}>
          <View style={styles.arrowTop}>
            <BackArrow onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Notifications</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollContianer}>
          <View style={styles.containerBody}>
            {notification.map((item, index) => {
              const timeAgo = calculateTimeAgo(item.time);
              return (
                <SwipeProvider key={index}>
                  <SwipeItem
                    style={styles.notificationSwipeContainer}
                    swipeContainerStyle={{}}
                    leftButtons={leftButton(index)}>
                    <View style={styles.notficationContainer} key={index}>
                      <Image source={images.calendarIcon} />
                      <View style={styles.notficationDetailContainer}>
                        <Text style={styles.notificationTitle}>
                          {item.title}
                        </Text>
                        <Text style={styles.notificationDetail}>
                          {item.detail}
                        </Text>
                        <Text style={styles.notificationTime}>
                        {timeAgo}
                        </Text>
                      </View>
                    </View>
                  </SwipeItem>
                </SwipeProvider>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
