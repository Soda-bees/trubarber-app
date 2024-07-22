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
import { colors, fontSize, sizes } from '../../services';
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
  const [search, setSearch] = useState('')

  const calculateTimeAgo = time => {
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
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <ScrollView style={styles.scrollContianer}>
          {
            userData?.chat?.filter(item => item.messages.length > 0)?.length > 0 ? (
              <View >
                {
                  userData?.chat
                    ?.filter(item => item.messages.length > 0)
                    ?.filter(item => {
                      // Filter based on searchQuery
                      if (search.trim() === '') return true; // Show all chats if searchQuery is empty
                      const searchLowerCase = search.trim().toLowerCase();
                      const participantName = userData.role === 'user' ? item?.barber?.name : item?.user?.name;
                      return participantName.toLowerCase().includes(searchLowerCase);
                    })
                    ?.sort((a, b) => {
                      // Get the createdAt of the last message in each chat
                      const lastMessageA = a.messages[a.messages.length - 1];
                      const lastMessageB = b.messages[b.messages.length - 1];

                      // Sort chats based on the createdAt of the last message (descending)
                      return new Date(lastMessageB.createdAt || b.createdAt) - new Date(lastMessageA.createdAt || a.createdAt);
                    })
                    ?.map((item, index) => {
                      const lastMessage = item?.messages?.length > 0 ? item?.messages[item?.messages?.length - 1] : ''
                      // const lastMessageImg = ite?.me
                      console.log("last message", lastMessage);
                      const timeAgo = calculateTimeAgo(lastMessage?.createdAt ? lastMessage?.createdAt : item?.createdAt)
                      const messages = item?.messages || []
                      const oppositeMessage = messages.filter(obj => obj?.sender !== userData?._id);
                      const unseenMessages = oppositeMessage.filter(obj => obj.seen === false);
                      return (
                        // <SwipeProvider key={index}>
                        //   <SwipeItem
                        //     style={styles.chatSwipeContainer}
                        //     swipeContainerStyle={{}}
                        //     leftButtons={leftButton(index)}>
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
                                    <Text style={styles.chatDetail} numberOfLines={1}>
                                      {lastMessage?.image?.length > 0 ? "Photo" : lastMessage?.text}
                                    </Text>
                                  </View>
                                </View>
                                <View style={{ height: sizes.screenHeight * 0.06, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                  <Text style={styles.chatTime}>
                                    {timeAgo}
                                  </Text>
                                  {
                                    unseenMessages?.length > 0 ?
                                      <View style={styles.newMsgsContainer}>
                                        <Text style={{ color: 'black', fontSize: fontSize.small, fontWeight: '500' }}>
                                          {unseenMessages?.length > 0 && unseenMessages?.length}
                                        </Text>
                                      </View> : null
                                  }

                                </View>
                              </TouchableOpacity>
                            </View>
                        //   </SwipeItem>
                        // </SwipeProvider>
                      )
                    })
                }
              </View>
            ) : (<View style={styles.noChatView}>
              <Image source={images.noChatImg} style={styles.noChatImg}/>
              <Text style={styles.noChatText}>There is currently no chat to show</Text>
            </View>)
          }

        </ScrollView>
      </View>
    </SafeAreaView>
  );
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
