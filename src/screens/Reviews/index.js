import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/userData';
import moment from 'moment';
import Header from '../../components/Header';

export default function Reviews({navigation}) {
  const userData = useSelector(selectUserData);
  console.log(userData);

  const [rating, setRatings] = useState([
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '5',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '4',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '4.5',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '4.5',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '4.5',
    },
  ]);

  const [barberReviews, setBarberReviews] = useState([]);

  useEffect(() => {
    if (userData?.reviews) {
      const sortedReviews = [...userData.reviews].sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt)),
      );
      setBarberReviews(sortedReviews);
    }
  }, [userData]);

  const formatDate = createdAt => {
    return moment(createdAt).format('DD MMMM YYYY');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Reviews'} />
        <ScrollView>
          <KeyboardAwareScrollView extraHeight={sizes.screenHeight * 0.18}>
            <View style={styles.containerBody}>
              {barberReviews?.map((item, index) => (
                <View key={index} style={styles.ratingContainer}>
                  <View style={styles.ratingData}>
                    <View style={styles.rowAndmargin}>
                      <Image
                        source={{uri: item?.userData?.profile}}
                        style={styles.profilePic}
                      />
                      <View style={styles.alignItems}>
                        <Text style={styles.usernameAllignment}>
                          {item?.userData?.name}
                        </Text>
                        <Text style={styles.time}>
                          {formatDate(item?.createdAt)}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <StarRatingDisplay
                        rating={item?.rating}
                        color={colors.gold}
                        starSize={sizes.screenHeight * 0.025}
                        starStyle={styles.startContainer}
                      />
                    </View>
                  </View>
                  <Text style={styles.descriptionContainer}>
                    {item?.comment}
                  </Text>
                  {/* <View style={styles.inputContainer}>
                    <TextInput
                      placeholderTextColor={colors.gratsText}
                      style={styles.input}
                      placeholder="Reply..."
                      multiline={true}
                      numberOfLines={3}
                    />
                    <TouchableOpacity>
                      <Image source={images.sendRed} />
                    </TouchableOpacity>
                  </View> */}
                </View>
              ))}
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        <View style={Platform.OS == 'ios' && styles.paddingBottom} />
      </View>
    </SafeAreaView>
  );
}
