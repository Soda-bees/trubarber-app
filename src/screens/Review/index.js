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
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import StarRating from 'react-native-star-rating-widget';
import { colors, sizes } from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/userData/index.js';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { selectAuthToken } from '../../store/authToken/index.js';
import Modal from 'react-native-modal';
import {
  deleteReview,
  postReview,
  updateReview,
} from '../../services/config/API/index.js';
import { ErrorShow } from '../../components/Error';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader/index.js';

export default function Review({ navigation, route }) {
  const barber = route?.params.barbar;
  const user = useSelector(selectUserData);
  const token = useSelector(selectAuthToken);
  const [showModal1, setShowModal1] = useState(false);

  const [services, setServices] = useState([]);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState(null);
  const [rating, setRating] = useState(0);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [review, setReview] = useState();
  const [errMsg, setErrMsg] = useState('');

  const handleGoback = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setServices(barber?.services);
    console.log(barber.time);
    handleStatus(barber.time);
    setReview();
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

  const onHide = () => {
    navigation.goBack()
  }

  const handlePostReview = async () => {
    try {
      setLoader(true);
      if (comment && rating !== 0) {
        const body = {
          barberData: barber?._id,
          comment,
          rating,
        };
        const response = await postReview(body, token);
        if (response?.data?.success) {
          setReview(response?.data?.review);
          setLoader(false);
          ErrorShow('success', 'Congratulation!', response?.data?.message, onHide);
        } else {
          console.log(response.data.message);
          setLoader(false);
          ErrorShow('error', 'Error!', response?.data?.message);
        }
      } else {
        ErrorShow(
          'error',
          'Error!',
          'Please provide rating and some comments to post your review',
        );
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      ErrorShow('error', 'Error!', error);
      setLoader(false);
    }
  };

  const handleUpdateReview = async () => {
    try {
      setLoader(true);

      if (comment && rating !== 0) {
        const body = {
          reviewId: review?._id,
          comment,
          rating,
        };
        console.log(body);
        const response = await updateReview(body, token);

        if (response.data.success) {
          setReview(response?.data?.review);
          setLoader(false);
          ErrorShow('success', 'Review Updated!', response?.data?.message, onHide);
        } else {
          console.log(response.data.message);
          setLoader(false);
          ErrorShow('error', 'Error!', response?.data?.message);
        }
      } else {
        ErrorShow(
          'error',
          'Error!',
          'Please provide rating and some comments to update your review',
        );
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      ErrorShow('error', 'Error!', error);
      setLoader(false);
    }
  };

  const handleDeleteReview = async () => {
    try {
      setLoader2(true);
      const reviewId = review._id;
      const response = await deleteReview(reviewId, token);

      if (response.data.success) {
        console.log(response.data);
        setLoader2(false);
        setReview(null);
        setComment('');
        setRating(0);
        ErrorShow('success', 'Congratulation!', response?.data?.message, onHide);
        setShowModal1(false);
      } else {
        console.log(response.data.message);
        setLoader2(false);
        ErrorShow('error', 'Error!', response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      ErrorShow('error', 'Error!', error);
      setLoader2(false);
    }
  };

  const findAndSetReview = (userReviews, barberReviews) => {
    console.log('===========', barberReviews);
    if (
      !userReviews ||
      !barberReviews ||
      !userReviews.length ||
      !barberReviews.length
    ) {
      setReview(null);
      setComment('');
      setRating(0);
      return;
    }

    const matchingReview = userReviews.find(userReview =>
      barberReviews.some(barberReview => barberReview._id === userReview._id),
    );
    console.log(matchingReview, '========');
    if (matchingReview) {
      setReview(matchingReview);
      setComment(matchingReview.comment);
      setRating(matchingReview.rating);
    } else {
      setReview(null);
      setComment('');
      setRating(0);
    }
  };

  useEffect(() => {
    if (user && user.reviews && barber && barber.reviews) {
      findAndSetReview(user?.reviews, barber?.reviews);
    } else {
      setReview(null);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          imageStyle={styles.headerImage}
          source={{ uri: barber?.profile }}
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
            enableHalfStar={false}
          />
          <Text style={styles.disabledText2}>
            Tell us about your experience at {barber.name}
          </Text>
          <View style={styles.userRow}>
            <View style={styles.userRowLeft}>
              <Image source={{ uri: user.profile }} style={styles.profile} />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
            {review ? (
              <TouchableOpacity
                onPress={() => {
                  setShowModal1(true);
                }}>
                <Image source={images.deleteIconn} style={styles.deleteIconn} />
              </TouchableOpacity>
            ) : null}
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
        <TouchableOpacity style={styles.buttonContainer}>
          {loader ? (
            <Loader title={'Submit'} />
          ) : (
            <Button
              title={'Submit'}
              onPress={() => {
                review ? handleUpdateReview() : handlePostReview();
              }}
            />
          )}
        </TouchableOpacity>
        <Toast />
      </View>

      <Modal
        isVisible={showModal1}
        onBackdropPress={() => setShowModal1(false)}>
        <View style={styles.modalMainView}>
          <Text style={styles.modalMessage}>
            Are you sure want to delete this review ?
          </Text>
          <View style={styles.btnMainView}>
            <TouchableOpacity
              style={styles.btnView1}
              onPress={!loader2 && handleDeleteReview}>
              {
                loader2 ?
                  <ActivityIndicator color={colors.white}/> :
                  <Text style={styles.btnText1}>Confirm</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => setShowModal1(false)}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
