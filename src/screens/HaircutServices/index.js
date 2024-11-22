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
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import {useSelector} from 'react-redux';
import {selectbarber} from '../../store/barber/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import {selectlocation} from '../../store/location/index.js';
import {selectUserData} from '../../store/userData/index.js';
import Header from '../../components/Header/index.js';
import {getAddressFromCoordinates} from '../../services/config/API/index.js';

export default function HaircutServices({navigation, route}) {
  const {name} = route?.params;
  const userData = useSelector(selectUserData);
  const barbers = useSelector(selectbarber);
  const location = useSelector(selectlocation) || userData?.location;
  const [barberData, setBarberdata] = useState([]);
  const [addresses, setAddresses] = useState({});
  const [locationLoader, setLocationLoader] = useState({});
  
  useEffect(() => {
    getSpecificBarberBarber();
  }, [name]);

  const getSpecificBarberBarber = () => {
    const data = barbers?.filter(barber => {
      return barber.services.some(service => service.name === name);
    });

    setBarberdata(data);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const calculateAverageRating = reviews => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + parseFloat(review.rating),
        0,
      );
      return totalRating / reviews.length;
    } else {
      return 0;
    }
  };

  const getAddress = async (latitude, longitude, barberId) => {
    setLocationLoader(prev => ({...prev, [barberId]: true}));
    try {
      const response = await getAddressFromCoordinates(latitude, longitude);
      setAddresses(prev => ({
        ...prev,
        [barberId]: response,
      }));
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setLocationLoader(prev => ({...prev, [barberId]: false}));
    }
  };

  useEffect(() => {
    barbers?.forEach(barber => {
      const {latitude, longitude} = barber.location || {};
      if (latitude && longitude && !addresses[barber._id]) {
        getAddress(latitude, longitude, barber._id);
      }
    });
  }, [barbers]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backgroundColor}>
          <Header title={`${name} Services`} />
          <ScrollView>
            <View
              style={
                Platform.OS == 'android'
                  ? styles.contentMargin
                  : styles.contentMarginIOS
              }>
              {barberData?.length > 0 &&
                barberData?.map((item, index) => {
                  const distance = calculateDistance(
                    location?.latitude,
                    location?.longitude,
                    item?.location?.latitude,
                    item?.location?.longitude,
                  );
                  return (
                    <ImageBackground
                      key={index}
                      source={
                        item?.profile
                          ? {uri: item?.profile}
                          : item?.gender === 'male'
                          ? images.male
                          : images.female
                      }
                      imageStyle={
                        Platform.OS == 'android'
                          ? styles.containerImage
                          : styles.containerImageIOS
                      }
                      style={styles.containerImage}>
                      <View style={styles.row}>
                        <Text style={styles.textWhite}>
                          {calculateAverageRating(item.reviews)}
                        </Text>
                        <StarRating
                          maxStars={1}
                          starSize={12}
                          color={colors.gold}
                          rating={1}
                        />
                      </View>
                      <ImageBackground
                        source={images.bluredImg}
                        imageStyle={styles.bluredImg}
                        style={styles.bluredImg}>
                        <View style={styles.appointmentContainer}>
                          <Text style={styles.textDarkerblack}>
                            {item.name}
                          </Text>
                          <View style={styles.locationContainer}>
                            <Image
                              source={images.Location}
                              resizeMode="contain"
                              style={styles.locationImg}
                            />
                            {/* <Text style={styles.textBlack}> */}
                              <View
                                style={{
                                  width: sizes.screenWidth * 0.34,
                                }}>
                                {location ? (
                                  distance !== null && (
                                    <Text style={styles.textBlack}>
                                      {`${distance.toFixed(2)} km`}
                                    </Text>
                                  )
                                ) : locationLoader[item._id] ? (
                                  <ActivityIndicator
                                    size={1}
                                    color={colors.black}
                                    style={styles.loaderStyle}
                                  />
                                ) : (
                                  <Text
                                    style={styles.textBlackBarberLocation}
                                    numberOfLines={2}>
                                    {addresses[item._id] ||
                                      `${distance.toFixed(2)} km`}
                                  </Text>
                                )}
                              </View>
                            {/* </Text> */}
                          </View>
                          <TouchableOpacity
                            style={styles.bookBtn}
                            onPress={() =>
                              navigation.navigate('BookAppointment', {
                                item,
                                tabName: 'About',
                              })
                            }>
                            <Text style={styles.btnText}>Book Appointment</Text>
                            <Image
                              source={images.arrowIcon}
                              resizeMode="contain"
                              style={styles.arrowStyle}
                            />
                          </TouchableOpacity>
                        </View>
                      </ImageBackground>
                    </ImageBackground>
                  );
                })}
            </View>
            <View
              style={
                Platform.OS == 'android'
                  ? {paddingBottom: sizes.screenHeight * 0.05}
                  : {paddingBottom: sizes.screenHeight * 0.1}
              }></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
