import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../services/utilities/images';
import {useNavigation} from '@react-navigation/native';
import {Image, Platform, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../store/userData';
import {useEffect, useState} from 'react';
import {styles} from './style';
import {removelocation} from '../../store/location';
import { selectAuthToken } from '../../store/authToken';

export default function Favourites() {
  const userData = useSelector(selectUserData);
  const navigation = useNavigation();
  const authToken = useSelector(selectAuthToken)

  return (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => {
        if (!authToken) {
          navigation.navigate('WelcomeScreen');
        } else {
          navigation.navigate('UserFavourites');
        }
      }}>
      <Image style={styles.iconImage} source={images.Bookmark} />
    </TouchableOpacity>
  );
}
