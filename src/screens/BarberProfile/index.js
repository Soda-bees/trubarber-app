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
import React, { useEffect, useState } from 'react';
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
import { selectlocation } from '../../store/location/index.js';
import { getAddressFromCoordinates } from '../../services/config/API/index.js';
import { removeCart } from '../../store/cart/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function Profile({ navigation }) {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCbWOArVUIn-uRQ8S3fsvayHrep5El4ab4';
  const userData = useSelector(selectUserData)
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const location = useSelector(selectlocation)

  const [address, setAddress] = useState(null);
  const [locationLoader, setLocationLoader] = useState(false)

  const getAddress = async (latitude, longitude) => {
    setLocationLoader(true)
    try {
      const response = await getAddressFromCoordinates(latitude, longitude)
      setAddress({ area: response?.area, city: response?.city })
      console.log("Location" , response);
      setLocationLoader(false)
    } catch (error) {
      console.log(error);
      setLocationLoader(false)
    }
  }

  // useEffect(() => {
  //   getAddress(location?.latitude, location?.longitude);
  // }, []);


  const handleLogout = async () => {
    dispatch(removeAuthToken());
    dispatch(removeRole());
    dispatch(removeUserData())
    dispatch(removePaymentCard())
    dispatch(removeCart())
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.borderBottom}>
          <View style={styles.transparentBg}>
            <View style={styles.row}>
              <View style={styles.arrowTop}>
                <BackArrow onPress={() => navigation.goBack()} />
              </View>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Profile</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentAlligment}>
            <Image source={{ uri: userData?.profile }} style={styles.youngMan} />
            <View style={styles.nameContainer}>
              <Text style={styles.firstName}>{userData?.name}</Text>
              {/* <Text style={styles.lastName}>Williamson</Text> */}
            </View>
          </View>
          <View style={styles.locationPhonecontainer}>

            {
              locationLoader ?
                <View style={styles.locationRow}>
                  <ActivityIndicator size={15} color={'red'} />
                </View>
                :
                <View style={styles.locationRow}>
                  <Image
                    source={images.redLocation}
                    resizeMode="contain"
                    style={styles.redLocation}
                  />
                  <Text style={styles.locationText}>
                    {address ? `${address.area}, ${address.city}.` : "Location"}
                  </Text>
                </View>
            }
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
          {/* <TouchableOpacity style={styles.naviRow}>
            <Text style={styles.navText}>Edit Shop</Text>
            <Image
              source={images.arrowRight}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
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
          <Button title={'Logout'} onPress={() => handleLogout()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
