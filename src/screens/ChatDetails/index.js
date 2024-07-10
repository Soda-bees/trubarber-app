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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import {TextInput} from 'react-native-gesture-handler';
import {colors, sizes} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import LottieView from 'lottie-react-native';

export default function ChatDetails({navigation}) {
  const scrollViewRef = useRef();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: false});
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
  const [chatName, setChatName] = useState('Cameron Wilson');
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
      mergedChats.push({type: 'receive', chat: chatRecieve[receiveIndex]});
      receiveIndex++;
    }
    if (sendIndex < chatSend.length) {
      mergedChats.push({type: 'send', chat: chatSend[sendIndex]});
      sendIndex++;
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
            <Text style={styles.headerText}>{chatName}</Text>
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
                      ? {height: sizes.screenHeight * 0.46}
                      : {height: 25}
                  }
                />
                <View style={styles.containerBody}>
                  {conversation.map((item, index) => (
                    <View style={styles.chatRecieved} key={index}>
                      <Text style={styles.chatText}>{item.chat}</Text>
                    </View>
                  ))}
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
              />
              <TouchableOpacity style={styles.arrowBlackIcon}>
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
