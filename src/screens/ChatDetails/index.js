import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import { TextInput } from 'react-native-gesture-handler';
import { colors, sizes } from '../../services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/userData';
import { selectAuthToken } from '../../store/authToken';
import { sendMessage } from '../../services/config/API';
import formatToJSON from '../../services/config/FormatToJson';

export default function ChatDetails({ navigation, route }) {

  const chatRoomId = route?.params?.chatRoomId
  const userData = useSelector(selectUserData)
  const authToken = useSelector(selectAuthToken)

  console.log("chatRoomId", chatRoomId);

  useEffect(() => {
    if (chatRoomId) {
      setChatId(chatRoomId)
      handleSetChatName(chatRoomId)
    }
  }, [route.params])

  const scrollViewRef = useRef();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [chatId, setChatId] = useState(null)
  const [text, setText] = useState('')

  const handleSetChatName = (_id) => {
    const chat = userData?.chat?.find((chat => chat?._id === _id))
    if (userData?.role === 'user') {
      setChatName(chat?.barber?.name)
    } else {
      setChatName(chat?.user?.name)
    }
  }

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    } else {
      console.log('scrollViewRef.current is undefined');
    }
  };

  const handleLayout = () => {
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('Keyboard is open');
        setKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('Keyboard is closed');
        setKeyboardOpen(false);
      },
    );
  }, []);

  let animation = React.createRef();

  useEffect(() => {
    animation.current?.play();
  }, []);

  const [conversation, setConversation] = useState([
    {
      chat: 'Top Top Start start start start start start start start start start start start start start start start.......',
      user: 'Duis aute irure dolor.',
    },
    {
      chat: 'Start start start start start start start start start start start start start start start start',
      user: 'Duis aute irure dolor.',
    },
    {
      chat: 'Start start start start start start start start start start start start start start start start',
      user: 'Duis aute irure dolor.',
    },
    {
      chat: 'Start start start start start start start start start start start start start start start start',
      user: 'Duis aute irure dolor.',
    },
    {
      chat: 'Start start start start start start start start start start start start start start start start',
      user: 'Duis aute irure dolor.',
    },
    {
      chat: 'Start start start start start start start start start start start start start start start start',
      user: 'Duis aute irure dolor.',
    },
    {
      chat: 'Start start start start start start start start start start start start start start start start',
      user: 'Duis aute irure dolor.',
    },
    {
      chat: 'Start start start start start start start start start start start start start start start start',
      user: 'Duis aute irure dolor.',
    },
    {
      chat: 'End End Start start start start start start start start start start start start start start start start...',
      user: 'Duis aute irure dolor.',
    },
  ]);
  const [chatName, setChatName] = useState('');
  const [chatRecieve, setChatRecieve] = useState([
    {
      chat: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 111',
    },
    {
      chat: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
    },
    {
      chat: 'Excepteur sint occaecat cupidatat non proident',
    },
    {
      chat: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor',
    },
    {
      chat: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
    },
    {
      chat: 'Excepteur sint occaecat cupidatat non proident',
    },
  ]);
  const [chatSend, setChatSend] = useState([
    {
      chat: 'Duis aute irure dolor.',
    },
    {
      chat: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      chat: 'Sed do eiusmod tempor',
    },
    {
      chat: 'Duis aute irure dolor.',
    },
    {
      chat: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      chat: 'Sed do eiusmod tempor',
    },
  ]);

  const mergedChats = [];
  let receiveIndex = 0;
  let sendIndex = 0;
  while (receiveIndex < chatRecieve.length || sendIndex < chatSend.length) {
    if (receiveIndex < chatRecieve.length) {
      mergedChats.push({ type: 'receive', chat: chatRecieve[receiveIndex] });
      receiveIndex++;
    }
    if (sendIndex < chatSend.length) {
      mergedChats.push({ type: 'send', chat: chatSend[sendIndex] });
      sendIndex++;
    }
  }

  const handlesendMessage = async () => {
    try {
      // console.log(text);
      // console.log(chatId);
      setText('')
      const body = { text }
      const response = await sendMessage(authToken, chatId, body)
      console.log(response?.status);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      {loader ? (
        <View style={styles.laoderContainer}>
          <LottieView
            ref={animation}
            source={require('../../assestsAnimation/chatAnimatedLoader.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <BackArrow onPress={() => navigation.goBack()} />
            <Text style={styles.headerText}>{chatName ? chatName : ''}</Text>
            {/* <TouchableOpacity style={styles.phoneIcon}>
            <Image source={images.phoneIcon} />
          </TouchableOpacity> */}
          </View>
          <View style={styles.chatSubContianer}>
            <View>
              <ScrollView
                contentContainerStyle={styles.scrollContianer}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollToBottom()}
                onLayout={handleLayout}>
                <View
                  style={
                    keyboardOpen
                      ? { height: sizes.screenHeight * 0.46 }
                      : { height: 25 }
                  }
                />
                <View style={styles.containerBody}>
                  {/* {chatId &&
                    userData?.chat?.length > 0 &&
                    userData?.chat?.filter(chat => chat?._id === chatId)
                      .messages?.map((item, index) => (
                        <View style={styles.chatRecieved} key={index}>
                          <Text style={styles.chatText}>{item.chat}</Text>
                        </View>
                      ))} */}
                  {chatId &&
                    userData?.chat?.length > 0 &&
                    userData?.chat
                      .filter(chat => chat?._id === chatId)
                      .map((chat) =>
                        chat?.messages?.map((item, index) => {
                          // console.log(item);
                          return (
                            <View style={item?.sender === userData?._id ? styles.chatSend : styles.chatRecieved} key={index}>
                              <Text style={styles.chatText}>{item.text}</Text>
                            </View>
                          )
                        })
                      )}
                </View>
              </ScrollView>
            </View>
            <View
              style={
                Platform.OS === 'android'
                  ? styles.texInputView
                  : styles.texInputViewIOS
              }>
              <TextInput
                placeholder="Write Message.."
                placeholderTextColor={colors.black}
                multiline={true}
                numberOfLines={2}
                style={styles.textInputContainer}
                value={text}
                onChangeText={(text) => setText(text)}
              />
              <TouchableOpacity style={styles.arrowBlackIcon}
                onPress={handlesendMessage}
              >
                <Image source={images.arrowBlackIcon} />
              </TouchableOpacity>
            </View>
            <KeyboardSpacer topSpacing={sizes.screenHeight * 0.045} />
          </View>

          {/* <KeyboardAvoidingView
          behavior="padding" keyboardVerticalOffset={sizes.screenHeight * 0.03}
        > */}

          {/* </KeyboardAvoidingView> */}
        </View>
      )}
    </SafeAreaView>
  );
}
