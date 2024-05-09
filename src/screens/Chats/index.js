import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../../components/BackArrow';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors} from '../../services';
import { format, parse} from 'date-fns';
import {
  SwipeButtonsContainer,
  SwipeItem,
  SwipeProvider,
} from 'react-native-swipe-item';

export default function Chats({navigation}) {
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
          <View>
            {chatDetails.map((item, index) => {
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
