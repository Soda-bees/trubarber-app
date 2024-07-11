import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import BackArrow from '../../components/BackArrow';
import { styles } from './style';
import images from '../../services/utilities/images';
import { colors } from '../../services';
import { format, parse } from 'date-fns';
import {
  SwipeButtonsContainer,
  SwipeItem,
  SwipeProvider,
} from 'react-native-swipe-item';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/userData';
import formatToJSON from '../../services/config/FormatToJson';
import moment from 'moment';

export default function Chats({ navigation }) {
  const userData = useSelector(selectUserData)
  const [chatDetails, setChatDetails] = useState([
    {
      image: images.youngMan,
      name: 'Cameron Wilson',
      time: format(new Date(), 'MM-dd-yyyy hh:mm a'),
      message: 'Lorem ipsum dolor sit amet, consecteture',
    },
    {
      image: images.youngMan,
      name: 'Cameron Wilson',
      time: format(new Date(), 'MM-dd-yyyy hh:mm a'),
      message: 'Lorem ipsum dolor sit amet, consecteture',
    },

  ]);

  const calculateTimeAgo = time => {
    // const inputFormat = 'MM-dd-yyyy hh:mm a';
    // const parsedDate = parse(postTime, inputFormat, new Date());
    // const outputFormat = 'yyyy-MM-dd HH:mm';
    // const targetDate1 = format(parsedDate, outputFormat);
    // const targetDate = new Date(targetDate1);
    // const currentDate = new Date();
    // const timeDifference = currentDate - targetDate;
    // const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // const hoursAgo = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    // const minutesAgo = Math.floor((timeDifference / (1000 * 60)) % 60);
    // if (daysAgo > 0) {
    //   return `${daysAgo} day ago`;
    // } else if (hoursAgo > 0) {
    //   return `${hoursAgo} hour ago`;
    // } else if (minutesAgo > 0) {
    //   return `${minutesAgo} min ago`;
    // } else {
    //   return 'Just now';
    // }
    const now = moment();
    const timeMoment = moment(time);

    if (now.isSame(timeMoment, 'day')) {
      return timeMoment.format('h:mm A'); // 4:20 PM
    } else if (now.subtract(1, 'days').isSame(timeMoment, 'day')) {
      return 'Yesterday';
    } else {
      return timeMoment.format('DD/MMM'); // 04/Apr
    }
  };

  const removeItemAtIndex = indexToRemove => {
    setChatDetails(prevList => {
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
            <Text style={styles.headerText}>Chats</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={images.search}
            resizeMode="contain"
            style={styles.search}
          />
          <TextInput
            placeholderTextColor={colors.placeholdertextgray}
            style={styles.input}
            placeholder="Search..."
          />
        </View>
        <ScrollView style={styles.scrollContianer}>
          {
            userData?.chat?.length > 0 ? (
              <View >
                {
                  userData?.chat?.map((item, index) => {
                    const timeAgo = calculateTimeAgo(item?.createdAt)
                    const lastMessage = item?.messages?.length > 0 ? item?.messages[item?.messages?.length - 1]?.text : ''
                    return (
                      <SwipeProvider key={index}>
                        <SwipeItem
                          style={styles.chatSwipeContainer}
                          swipeContainerStyle={{}}
                          leftButtons={leftButton(index)}>
                          <View style={styles.chatContainer} key={index}>
                            <TouchableOpacity
                              style={styles.chatDetailContainer}
                              onPress={() => {
                                navigation.navigate('ChatDetails', { chatRoomId: item?._id });
                              }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                  source={userData?.role == 'user' ? { uri: item?.barber?.profile } : { uri: item?.user?.profile }}
                                  style={styles.profileImage} />
                                <View style={styles.chatDetailsColumn}>
                                  <Text style={styles.chatName}>
                                    {userData?.role == 'user' ? item?.barber.name : item?.user?.name}
                                  </Text>
                                  <Text style={styles.chatDetail}>
                                    {lastMessage}
                                  </Text>
                                </View>
                              </View>
                              <Text style={styles.chatTime}>
                                {timeAgo}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </SwipeItem>
                      </SwipeProvider>
                    )
                  })
                }
              </View>
            ) : (<Text></Text>)
          }
          {/* <View>
            {userData?.chat?.length > 0 && userData?.chat?.map((item, index) => {
              const timeAgo = calculateTimeAgo(item.time);
              return (
                <SwipeProvider key={index}>
                  <SwipeItem
                    style={styles.chatSwipeContainer}
                    swipeContainerStyle={{}}
                    leftButtons={leftButton(index)}>
                    <View style={styles.chatContainer} key={index}>
                      <TouchableOpacity
                        style={styles.chatDetailContainer}
                        onPress={() => {
                          navigation.navigate('ChatDetails');
                        }}>
                        <Image
                          source={item.image}
                          style={styles.profileImage} />
                        <View style={styles.chatDetailsColumn}>
                          <Text style={styles.chatName}>
                            {item.name}
                          </Text>
                          <Text style={styles.chatDetail}>
                            {item.message}
                          </Text>
                        </View>
                        <Text style={styles.chatTime}>
                          {timeAgo}

                        </Text>
                      </TouchableOpacity>
                    </View>
                  </SwipeItem>
                </SwipeProvider>
              );
            })}
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
