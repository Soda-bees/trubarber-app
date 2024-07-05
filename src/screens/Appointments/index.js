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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';
import { colors, sizes } from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../store/userData/index.js';
import { removeCart, selectCart } from '../../store/cart/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function Appointments({ navigation }) {

  const dispatch = useDispatch()
  const userData = useSelector(selectUserData)
  console.log(userData?.appoinment.length);

  const [appointmentData, setappointmentData] = useState([
    {
      image: images.largerBarberhat,
      productTitle: 'REDBOX BARBER',
      product: images.hairCut,
      name: 'Alex WILLIAMS',
      price: '$25',
      duration: '42min',
      time: '02 Feb/02:00AM',
      productName: 'Haircuts',
      location: 'Royal Ln. Mesa, New Jersey',
    },
    {
      image: images.largerBarberhat,
      productTitle: 'REDBOX BARBER',
      product: images.hairCut,
      name: 'Alex WILLIAMS',
      price: '$25',
      duration: '42min',
      time: '02 Feb/02:00AM',
      productName: 'Haircuts',
      location: 'Royal Ln. Mesa, New Jersey',
    },
    {
      image: images.largerBarberhat,
      productTitle: 'REDBOX BARBER',
      product: images.hairCut,
      name: 'Alex WILLIAMS',
      price: '$25',
      duration: '42min',
      time: '02 Feb/02:00AM',
      productName: 'Haircuts',
      location: 'Royal Ln. Mesa, New Jersey',
    },
    {
      image: images.largerBarberhat,
      productTitle: 'REDBOX BARBER',
      product: images.hairCut,
      name: 'Alex WILLIAMS',
      price: '$25',
      duration: '42min',
      time: '02 Feb/02:00AM',
      productName: 'Haircuts',
      location: 'Royal Ln. Mesa, New Jersey',
    },
  ]);

  useEffect(() => {
    dispatch(removeCart())
  }, [userData])

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
                <Text style={styles.headerText}>Appoinments</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {appointmentData.map((item, index) => (
            <View key={index}>
              <ImageBackground
                source={item.image}
                imageStyle={styles.barberHat}
                resizeMode="cover">
                <View style={styles.innerContainer}>
                  <Text style={styles.contextText}>{item.productTitle}</Text>
                  <View style={styles.locationContainer}>
                    <Image
                      source={images.whiteLocation}
                      style={styles.whiteLocation}
                      resizeMode="contain"
                    />
                    <Text style={styles.location}>{item.location}</Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.detailsContainer}>
                <View style={styles.contentAllignemnt}>
                  <View style={styles.directionRow}>
                    <View style={styles.serviceImagecontainer}>
                      <Image
                        source={item.product}
                        style={styles.serviceImageresize}
                        resizeMode="contain"
                      />
                    </View>
                    <View>
                      <Text style={styles.textBlack}>{item.productName}</Text>
                      <Text style={styles.duration}>{item.duration}</Text>
                    </View>
                  </View>
                  <View style={styles.dateTimepriceContainer}>
                    <View style={styles.price}>
                      <Text style={styles.priceText}>{item.price}</Text>
                    </View>
                    <Text style={styles.dateAndtime}>{item.time}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.bookBtn}
                  onPress={() => navigation.navigate('AppointmentDetails')}>
                  <Text style={styles.btnText}>See Details</Text>
                  <Image
                    source={images.arrowIcon}
                    resizeMode="contain"
                    style={styles.arrowStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View
            style={{
              paddingBottom: Platform.OS == 'ios' && sizes.screenHeight * 0.09,
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
