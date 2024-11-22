import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { styles } from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';
import { colors, sizes } from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthToken, selectAuthToken } from '../../store/authToken/index.js';
import { removeRole } from '../../store/role/index.js';
import { selectUserData } from '../../store/userData/index.js';
import axios from 'axios';
import { removelocation, selectlocation } from '../../store/location/index.js';
import {
  deleteDeviceToken,
  getAddressFromCoordinates,
} from '../../services/config/API/index.js';
import { removeCart } from '../../store/cart/index.js';
import Header from '../../components/Header/index.js';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';

export default function Profile({ navigation }) {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);

  const location = useSelector(selectlocation) || userData?.location

  const [address, setAddress] = useState(null);
  const [locationLoader, setLocationLoader] = useState(false);
  const [confirmLogoutModal, setConfirmLogoutModal] = useState(false);

  const getAddress = async (latitude, longitude) => {
    setLocationLoader(true);
    try {
      const response = await getAddressFromCoordinates(latitude, longitude);
      // setAddress({ area: response?.area, city: response?.city });
      setAddress(response)
      console.log('Location', response);
      setLocationLoader(false);
    } catch (error) {
      console.log(error);
      setLocationLoader(false);
    }
  };


  useFocusEffect(
    useCallback(() => {  
      if (userData?.location?.latitude && userData?.location?.longitude) {
        getAddress(userData.location.latitude, userData.location.longitude);
      }
  
    }, [userData]) 
  );

  const handleDeleteDeviceToken = async () => {
    try {
      const response = await deleteDeviceToken(authToken);
      if (response?.status == 200) {
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.log('error in user details', error);
    }
  };

  const handleLogout = async () => {
    setConfirmLogoutModal(false);
    handleDeleteDeviceToken();
    dispatch(removeAuthToken());
    dispatch(removeRole());
    dispatch(removePaymentCard());
    dispatch(removeCart());
    dispatch(removeUserData());
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Profile'} />
        <View style={styles.contentContainer}>
          <View style={styles.contentAlligment}>
            <Image
              // source={{uri: userData?.profile}} 
              source={userData?.profile ? { uri: userData?.profile } : userData?.gender === 'male' ? images.male : images.female}
              style={styles.youngMan} />
            <View style={styles.nameContainer}>
              <Text style={styles.firstName}>{userData?.name}</Text>
              {/* <Text style={styles.lastName}>Williamson</Text> */}
            </View>
          </View>
          <View style={styles.locationPhonecontainer}>
            {locationLoader ? (
              <View style={styles.locationRow}>
                <ActivityIndicator size={15} color={colors.black} />
              </View>
            ) : (
              <View style={styles.locationRow}>
                <Image
                  source={images.redLocation}
                  resizeMode="contain"
                  style={styles.redLocation}
                />
                <Text style={styles.locationText}>
                  {address ? `${address}.` : 'Location'}
                </Text>
              </View>
            )}
          </View>

        </View>
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.naviRow}
            onPress={() => navigation.navigate('EditScreen')}>
            <Text style={styles.navText}>Edit Profile</Text>
            <Image
              source={images.arrowRight}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.naviRow}
            onPress={() => navigation.navigate('EditBusinessProfile')}
          >
            <Text style={styles.navText}>Edit Business Profile</Text>
            <Image
              source={images.arrowRight}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.naviRow}
            onPress={() => navigation.navigate('ProfileSecurity')}>
            <Text style={styles.navText}>Security</Text>
            <Image
              source={images.arrowRight}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.naviRow}>
            <Text style={styles.navText}>About</Text>
            <Image
              source={images.arrowRight}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.naviRow}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.navText}>Privacy Policy</Text>
            <Image
              source={images.arrowRight}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.naviRow}>
            <Text style={styles.navText}>FAQs</Text>
            <Image
              source={images.arrowRight}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={Platform.OS == 'android' ? styles.btn : styles.btnIOS}>
          <Button title={'Logout'} onPress={() => setConfirmLogoutModal(true)} />
        </View>
        <Modal isVisible={confirmLogoutModal}>
        <View style={styles.mainContainer}>
          <Text style={styles.modalHeading}>Are you leaving?</Text>
          <Text style={styles.modalText}>
            Are you sure you want to{' '}
            <Text style={{color: colors.red}}>Logout</Text>? You’ll need to
            signin again to access your account.
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              activeOpacity={0.7}
              onPress={() => setConfirmLogoutModal(false)}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn2}
              activeOpacity={0.7}
              onPress={() => handleLogout()}>
              <Text style={styles.btnText2}>Logout Anyway</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
    </SafeAreaView>
  );
}
