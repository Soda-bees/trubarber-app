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
  BackHandler,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import {TextInput} from 'react-native-gesture-handler';
import {colors, fontSize, sizes} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData, setSeenTrueRedux} from '../../store/userData';
import {selectAuthToken} from '../../store/authToken';
import {
  sendMessage,
  setSeenTrue,
  uploadMultiplesChatImages,
} from '../../services/config/API';
import formatToJSON from '../../services/config/FormatToJson';
import ImageGrid from '../../components/ImageGrid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const ChatDetails = ({navigation, route}) => {
  const chatRoomId = route?.params?.chatRoomId;
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  const [chatName, setChatName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [text, setText] = useState('');
  const [showImgScreen, setShowImgScreen] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (chatRoomId) {
      console.log('chatRoomId-====', chatRoomId);
      setChatId(chatRoomId);
      handleSetChatName(chatRoomId);
      handleUpdateSeen(chatRoomId);
    }
  }, [route.params]);

  const handleSetChatName = _id => {
    const chat = userData?.chat?.find(chat => chat?._id === _id);
    if (userData?.role === 'user') {
      setChatName(chat?.barber?.name);
    } else {
      setChatName(chat?.user?.name);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
      setIsAtBottom(true);
      setShowScrollToBottom(false);
    }
  };

  const handlesendMessage = async () => {
    try {
      setText('');
      setSelectedImages([]);
      setShowImgScreen(false);
      const body = {text, image: selectedImages};
      const response = await sendMessage(authToken, chatId, body);
      console.log(response?.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSeen = async chatRoomId => {
    try {
      let filteredMessages = [];

      filteredMessages =
        userData?.chat
          ?.find(chat => chat?._id === chatRoomId)
          ?.messages?.filter(
            message =>
              message?.sender !== userData?._id && message.seen === false,
          )
          ?.map(message => message._id) || [];
      console.log(filteredMessages);
      if (filteredMessages?.length > 0) {
        dispatch(setSeenTrueRedux({chatRoomId, messageIds: filteredMessages}));
        const response = await setSeenTrue(authToken, filteredMessages);
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.log('-=-==--= ', error);
    }
  };

  const handleBackButtonClick = () => {
    if (showImgScreen) {
      setSelectedImages([]);
      setShowImgScreen(false);
      return true;
    } else {
      handleUpdateSeen(chatRoomId);
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      } else {
        navigation.navigate('Chats');
        return true;
      }
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );

    return () => backHandler.remove();
  }, [userData, showImgScreen]);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const isUserAtBottom = offsetY <= 20;
    setIsAtBottom(isUserAtBottom);
    if (!isUserAtBottom) {
      setShowScrollToBottom(true);
    } else {
      setShowScrollToBottom(false);
    }
  };

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
    }
  };

  const uploadPhoto = async sourceType => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 800,
      maxHeight: 600,
      includeBase64: false,
      saveToPhotos: true,
      selectionLimit: 0, // 0 for unlimited selection
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const handleResponse = response => {
      try {
        const assets = response.assets || [];
        if (assets.length > 0) {
          handleUploadImage(assets);
        } else {
          console.warn('No images found in response');
        }
      } catch (error) {
        console.error('Error processing response:', error);
      }
    };

    if (sourceType === 'library') {
      launchImageLibrary(options, handleResponse);
    } else if (sourceType === 'camera') {
      await requestCameraPermission();
      launchCamera(options, handleResponse);
    }
  };

  const handleUploadImage = async images => {
    try {
      setShowImgScreen(true);
      setLoader(true);
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      });
      const response = await uploadMultiplesChatImages(formData, authToken);
      console.log('for data', formatToJSON(response?.data));
      console.log('for status', response?.status);
      if (response?.status == 200) {
        setSelectedImages(response?.data?.images);
        setLoader(false);
        return;
      }
      setLoader(false);
      setShowImgScreen(false);
    } catch (error) {
      setLoader(false);
      setShowImgScreen(false);
      console.log(error);
    }
  };

  const handleCancelImage = () => {
    setShowImgScreen(false);
    setSelectedImages([]);
  };
  const selectedChat = userData?.chat?.find(chat => chat?._id === chatId);

  const getDateHeader = date => {
    const today = moment().startOf('day');
    const messageDate = moment(date).startOf('day');

    if (today.isSame(messageDate, 'day')) {
      return 'TODAY';
    }

    const yesterday = today.clone().subtract(1, 'day');

    if (yesterday.isSame(messageDate, 'day')) {
      return 'YESTERDAY';
    }

    return messageDate.format('MMM D, YYYY');
  };

  const prepareData = () => {
    if (!chatId || !userData?.chat?.length) return [];

    return userData.chat
      .filter(chat => chat?._id === chatId)
      .flatMap(chat => chat?.messages)
      .reduce((acc, message, index, arr) => {
        const prevDate = arr[index - 1]?.createdAt;
        const currentDate = message?.createdAt;
        const currentHeader = getDateHeader(currentDate);
        const prevHeader = getDateHeader(prevDate);

        if (currentHeader !== prevHeader) {
          acc.push({type: 'header', header: currentHeader});
        }
        acc.push({type: 'message', ...message});
        return acc;
      }, [])
      .reverse();
  };
  const data = prepareData();

  const renderItem = ({item, index}) => {
    if (item.type === 'header') {
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: sizes.screenWidth * 0.02,
            marginBottom: sizes.screenWidth * 0.01,
          }}>
          <View
            style={{
              backgroundColor: colors.disabledBg,
              borderRadius: 10,
              flex: 1,
              height: 2,
            }}></View>
          <Text
            style={{
              color: colors.disabledBg2,
              fontSize: fontSize.smallM,
              paddingHorizontal: sizes.screenWidth * 0.03,
            }}>
            {item.header}
          </Text>
          <View
            style={{
              backgroundColor: colors.disabledBg,
              borderRadius: 10,
              flex: 1,
              height: 2,
            }}></View>
        </View>
      );
    }
    return (
      <View
        style={
          item.sender === userData?._id ? styles.chatSend : styles.chatRecieved
        }
        key={index}>
        {item.image?.length > 0 ? (
          <ImageGrid images={item.image} />
        ) : (
          <Text style={styles.chatText}>{item.text}</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {showImgScreen ? (
        <View style={styles.laoderContainer}>
          {loader ? (
            <ActivityIndicator color={colors.white} size={40} />
          ) : (
            selectedImages?.length > 0 && (
              <View
                style={{
                  width: sizes.screenWidth,
                  height: sizes.screenHeight,
                  alignItems: 'flex-start',
                }}>
                <TouchableOpacity
                  style={{top: 20, left: 20, zIndex: 10}}
                  onPress={handleCancelImage}>
                  <Image
                    source={images.cancel}
                    style={{
                      width: sizes.screenWidth * 0.1,
                      height: sizes.screenWidth * 0.1,
                    }}
                  />
                </TouchableOpacity>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}>
                  {selectedImages?.map((item, index) => (
                    <Image
                      key={index}
                      source={{uri: item}}
                      style={{
                        width: sizes.screenWidth,
                        height: sizes.screenHeight,
                        resizeMode: 'contain',
                      }}
                    />
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.arrowBlackIcon}
                  onPress={handlesendMessage}>
                  <Image
                    source={images.sendSecond}
                    style={styles.sendBtnIconSecond}
                  />
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <BackArrow
              onPress={() => {
                handleUpdateSeen(chatRoomId);
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('Chats');
                }
              }}
            />
            <Text style={styles.headerText}>{chatName ? chatName : ''}</Text>
          </View>
          {/* {showScrollToBottom && (
            <TouchableOpacity
              style={styles.scrollTouchable}
              onPress={() => {
                scrollToBottom();
              }}
            >
              <Image
                source={images.chatScroll}
                style={styles.scrollImg}
              />
            </TouchableOpacity>
          )} */}
          {selectedChat?.messages?.length === 0 && (
            <Text
              style={{
                color: 'black',
                position: 'absolute',
                alignSelf: 'center',
                top: sizes.screenHeight * 0.4,
                textAlign: 'center',
                fontSize: fontSize.smallM,
                fontWeight: '500',
              }}>
              You're starting a new conversation. Say hi!
            </Text>
          )}
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            inverted
            // onScroll={handleScroll}
          />
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
              style={
                Platform.OS == 'android'
                  ? styles.textInputContainer
                  : styles.textInputContainerIOS
              }
              value={text}
              onChangeText={text => setText(text)}
            />
            {text ? (
              <TouchableOpacity onPress={handlesendMessage}>
                <Image
                  source={images.arrowBlackIcon}
                  style={styles.sendBtnIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.imageIconTouchable}
                onPress={() => uploadPhoto('library')}>
                <Image source={images.chatImg} style={styles.imgIcon} />
              </TouchableOpacity>
            )}
          </View>
          {Platform.OS == 'ios' && <KeyboardSpacer />}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatDetails;
