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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import {TextInput} from 'react-native-gesture-handler';
import {colors, sizes} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default function ChatDetails({navigation}) {
  const scrollViewRef = useRef();

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

  const [conversation, setConversation] = useState([
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
      <View style={styles.container}>
        <View style={styles.row}>
          <BackArrow onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>{chatName}</Text>
          {/* <TouchableOpacity style={styles.phoneIcon}>
            <Image source={images.phoneIcon} />
          </TouchableOpacity> */}
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContianer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollToBottom()}
          onLayout={handleLayout}>
          <View style={styles.containerBody}>
            <View style={styles.chatContianer}>
              {conversation.map((item, index) => (
                <View style={styles.chatRecieved} key={index}>
                  <Text style={styles.chatText}>{item.chat}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        {/* <KeyboardAvoidingView
          behavior="padding" keyboardVerticalOffset={sizes.screenHeight * 0.03}
        > */}
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
        {/* <KeyboardSpacer topSpacing={sizes.screenHeight * 0.03} /> */}
        {/* </KeyboardAvoidingView> */}
      </View>
    </SafeAreaView>
  );
}
