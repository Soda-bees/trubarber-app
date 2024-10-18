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
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import {useDispatch, useSelector} from 'react-redux';
import {removeAuthToken, selectAuthToken} from '../../store/authToken/index.js';
import {removeRole} from '../../store/role/index.js';
import {removeUserData, selectUserData} from '../../store/userData/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import {removePaymentCard} from '../../store/paymentCard/index.js';
import {removeCart} from '../../store/cart/index.js';
import {
  deleteDeviceToken,
  getAddressFromCoordinates,
} from '../../services/config/API/index.js';
import Header from '../../components/Header/index.js';
import {selectlocation} from '../../store/location/index.js';

export default function Profile({navigation}) {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const location = useSelector(selectlocation) || userData?.location;

  const [address, setAddress] = useState('');
  const [locationLoader, setLocationLoader] = useState(false);
  const [cardDetails, setCardDetails] = useState({});

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
    handleDeleteDeviceToken();
    dispatch(removeAuthToken());
    dispatch(removeRole());
    dispatch(removePaymentCard());
    dispatch(removeCart());
    dispatch(removeUserData());
  };

  const getAddress = async (latitude, longitude) => {
    setLocationLoader(true);
    try {
      const response = await getAddressFromCoordinates(latitude, longitude);
      setAddress(response);
      setLocationLoader(false);
    } catch (error) {
      console.log(error);
      setLocationLoader(false);
    }
  };

  useEffect(() => {
    getAddress(location?.latitude, location?.longitude);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Header title={'Profile'} />
          <View style={styles.contentContainer}>
            <View style={styles.contentAlligment}>
              <Image
                source={
                  userData?.profile
                    ? {uri: userData?.profile}
                    : userData?.gender === 'male'
                    ? images.male
                    : images.female
                }
                style={styles.youngMan}
              />
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
              {/* <View style={styles.locationRow}>
                <Image
                  source={images.redLocation}
                  resizeMode="contain"
                  style={styles.redLocation}
                />
                <Text style={styles.locationText}>
                  {address ? `${address.area}, ${address.city}.` : 'Location'}
                </Text>
              </View> */}
              {/* <View style={styles.locationRow}>
              <Image
                source={images.redCall}
                resizeMode="contain"
                style={styles.redLocation}
              />
              <Text style={styles.locationText}>+1 1256864515</Text>
            </View> */}
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
              onPress={() => navigation.navigate('Wallet')}>
              <Text style={styles.navText}>Wallet</Text>
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
            <TouchableOpacity
              style={styles.naviRow}
              onPress={() => navigation.navigate('About')}>
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
        </View>

        <View style={Platform.OS == 'android' ? styles.btn : styles.btnIOS}>
          <Button title={'Logout'} onPress={() => handleLogout()} />
        </View>
        {/* <View style={Platform.OS == 'android' ? styles.btn : styles.btnIOS}>
          <Button title={'Buy'} onPress={handlePayment} />
        </View> */}
      </View>
    </SafeAreaView>
  );
}
