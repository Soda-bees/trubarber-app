import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import StarRating from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/userData/index.js';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default function Review({navigation, route}) {
  const barber = route?.params.barbar;
  const user = useSelector(selectUserData);

  const [services, setServices] = useState([]);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState(null);
  const [rating, setRating] = useState(0);

  const handleGoback = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setServices(barber?.services);
    console.log(barber.time);
    handleStatus(barber.time);
  }, [barber]);

  const handleStatus = openHours => {
    if (!openHours) {
      console.error('Open hours are undefined or not properly formatted');
      return;
    }

    const [startTime, endTime] = openHours.split(' - ');
    const currentTime = moment();

    const openTime = moment(startTime, 'hh:mm A');
    let closeTime = moment(endTime, 'hh:mm A');

    if (closeTime.isBefore(openTime)) {
      closeTime.add(1, 'day');
    }

    if (
      currentTime.isBetween(openTime, closeTime) ||
      currentTime.isSame(openTime)
    ) {
      setStatus('open');
    } else {
      setStatus('close');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          imageStyle={styles.headerImage}
          source={{uri: barber?.profile}}
          // style={}
        >
          <View style={styles.headerContainer}>
            <View style={styles.arrowTop}>
              <BackArrow light={true} onPress={handleGoback} />
            </View>
            <View style={styles.openButtonborder}>
              <ImageBackground
                style={styles.openBg}
                source={images.openBg}
                resizeMode="cover">
                <Text style={styles.openButton}>{status}</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.centerContent}>
            <View style={styles.barberDetailscontainer}>
              <View style={styles.alignedDetails}>
                <Text style={styles.barberName}>{barber?.name}</Text>
                <View style={styles.row}>
                  <Image
                    source={images.redLocation}
                    resizeMode="contain"
                    style={styles.redLocation}
                  />
                  <Text style={styles.barberLocation}>
                    Royal Ln. Mesa, New Jersey
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.containBookmark}>
                <Image
                  source={images.Bookmark}
                  resizeMode="contain"
                  style={styles.bookmark}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.ratingContainer}>
          <StarRating
            rating={rating}
            onChange={setRating}
            color={colors.gold}
            emptyColor={colors.gold}
            starSize={36}
          />
          <Text style={styles.disabledText2}>
            Tell us about your experience at {barber.name}
          </Text>
          <View style={styles.userRow}>
            <View style={styles.userRowLeft}>
              <Image source={{uri: user.profile}} style={styles.profile} />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
            <TouchableOpacity>
              <Image source={images.deleteIconn} style={styles.deleteIconn} />
            </TouchableOpacity>
          </View>
          <View style={styles.instructionsContainer}>
            <TextInput
              placeholder="Your review here.."
              placeholderTextColor={colors.disabledBg2}
              multiline
              value={comment}
              style={styles.descriptionInput}
              onChangeText={text => {
                setComment(text);
              }}
            />
          </View>
        </View>
        <KeyboardSpacer />
      </View>
    </SafeAreaView>
  );
}
