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
import React, {useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../services';

export default function ChatDetails({navigation}) {
  const [chatName, setChatName] = useState('Cameron Wilson');
  const [chatRecieve, setChatRecieve] = useState([
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
      {Platform.OS == 'android' ? (
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
                  <TouchableOpacity>
                    <Image source={images.arrowBlackIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
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
              <TouchableOpacity style={{paddingLeft: 10}}>
                <Image source={images.arrowBlackIcon} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </SafeAreaView>
  );
}
