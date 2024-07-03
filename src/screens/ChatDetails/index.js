import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import { TextInput } from 'react-native-gesture-handler';
import { colors, sizes } from '../../services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ChatDetails({ navigation }) {
  const scrollViewRef = useRef();
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
      mergedChats.push({ type: 'receive', chat: chatRecieve[receiveIndex] });
      receiveIndex++;
    }
    if (sendIndex < chatSend.length) {
      mergedChats.push({ type: 'send', chat: chatSend[sendIndex] });
      sendIndex++;
    }
  }
  return (
    <SafeAreaView>
      {/* {Platform.OS == 'android' ? ( */}
      <View style={styles.container}>
        <View style={styles.row}>
          <BackArrow onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>{chatName}</Text>
        </View>
        {/* <View style={{ height: sizes.screenHeight }}> */}
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={sizes.screenHeight * 0.36}
          extraHeight={sizes.screenHeight * 0.5}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: sizes.screenHeight * 0.85, backgroundColor: 'red' }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollToBottom()}
              onLayout={handleLayout}
            // StickyHeaderComponent={true}
            >
              {mergedChats.map((item, index) => (
                <View
                  style={
                    item.type === 'receive'
                      ? styles.chatRecieved
                      : styles.chatSend
                  }
                  key={index}>
                  <Text style={styles.chatText}>{item.chat.chat}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View
            style={
              Platform.OS == 'android'
                ? styles.texInputView
                : styles.texInputViewIOS
            }>
            <TextInput
              placeholder="Write Message.."
              placeholderTextColor={colors.black}
              multiline={true}
              numberOfLines={2}
              style={styles.textInputContainer} />
            <TouchableOpacity>
              <Image source={images.arrowBlackIcon} />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        {/* </View> */}
      </View>
      {/* ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <BackArrow onPress={() => navigation.goBack()} />
            <Text style={styles.headerText}>{chatName}</Text>
            <TouchableOpacity style={styles.phoneIcon}>
              <Image source={images.phoneIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContianer}>
            <View style={styles.containerBody}>
              <View style={styles.todayRow}>
                <View style={styles.line} />
                <Text style={styles.todayHeading}>TODAY</Text>
                <View style={styles.line} />
              </View>
              <View style={styles.chatContianer}>
                {mergedChats.map((item, index) => (
                  <View
                    style={
                      item.type === 'receive'
                        ? styles.chatRecieved
                        : styles.chatSend
                    }
                    key={index}>
                    <Text style={styles.chatText}>{item.chat.chat}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
          <KeyboardAvoidingView behavior='padding'>
            <View
              style={
                Platform.OS == 'android'
                  ? styles.texInputView
                  : styles.texInputViewIOS
              }>
              <TextInput
                placeholder="Write Message.."
                placeholderTextColor={colors.black}
                multiline={true}
                numberOfLines={2}
                style={styles.textInputContainer}></TextInput>
              <TouchableOpacity style={{ paddingLeft: 10 }}>
                <Image source={images.arrowBlackIcon} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      )} */}
    </SafeAreaView>
  );
}
