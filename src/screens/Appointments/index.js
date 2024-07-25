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
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../store/userData/index.js';
import {removeCart, selectCart} from '../../store/cart/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import Header from '../../components/Header/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function Appointments({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
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

  const calculateTotalAmount = services => {
    return services.reduce(
      (total, service) => total + parseFloat(service.price),
      0,
    );
  };

  const convertDateFormat = dateString => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Split the input date string into parts
    const [month, day, year] = dateString.split('-');

    // Get the month name from the months array
    const monthName = months[parseInt(month, 10) - 1];

    // Format the date in "DD/MM" format
    return `${day}-${monthName}`;
  };

  const truncateNameAtSpace = name => {
    const indexOfSpace = name.indexOf(' ');
    if (indexOfSpace !== -1) {
      return `${name.substring(0, indexOfSpace)}...`;
    }
    return name;
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Appointments'} />
        <ScrollView style={styles.scrollContainer}>
          {userData?.appoinment?.length > 0 ? (
            userData?.appoinment
              ?.map((item, index) => {
                return (
                  <View key={index}>
                    <ImageBackground
                      source={{uri: item?.barber?.profile}}
                      imageStyle={styles.barberHat}
                      resizeMode="cover">
                      <View style={styles.innerContainer}>
                        <View style={styles.nameView}>
                          <Text style={styles.contextText}>
                            {truncateNameAtSpace(item?.barber?.name)}
                          </Text>
                          <Text style={styles.statusText}>{item?.status}</Text>
                        </View>
                        <View style={styles.locationContainer}>
                          <Image
                            source={images.whiteLocation}
                            style={styles.whiteLocation}
                            resizeMode="contain"
                          />
                        </View>
                      </View>
                    </ImageBackground>
                    <View style={styles.detailsContainer}>
                      {item?.services?.map((item, index) => {
                        return (
                          <View style={styles.contentAllignemnt} key={index}>
                            <View style={styles.directionRow}>
                              <View style={styles.serviceImagecontainer}>
                                <Image
                                  source={{uri: item?.serviceIcon}}
                                  style={styles.serviceImageresize}
                                  resizeMode="contain"
                                />
                              </View>
                              <View>
                                <Text style={styles.textBlack}>
                                  {item?.serviceName}
                                </Text>
                                <Text style={styles.duration}>
                                  {item?.name}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.dateTimepriceContainer}>
                              <View style={styles.price}>
                                <Text style={styles.priceText}>
                                  ${item?.price}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                      <View>
                        <View style={styles.optionsCart}>
                          <Text style={styles.dateAndtime}>Total Amount:</Text>
                          <View style={styles.price}>
                            <Text style={styles.priceText}>
                              {`$ ${calculateTotalAmount(item?.services)}`}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.dateAndtimeView}>
                          <Text
                            style={styles.dateAndtime}>{`${convertDateFormat(
                            item?.date,
                          )}/${item?.time} (60min)`}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.bookBtn}
                        onPress={() =>
                          navigation.navigate('AppointmentDetails', {item})
                        }>
                        <Text style={styles.btnText}>See Details</Text>
                        <Image
                          source={images.arrowIcon}
                          resizeMode="contain"
                          style={styles.arrowStyle}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
              .reverse()
          ) : (
            <View style={styles.noAppointmentMainView}>
              <Image
                source={images.noAppointment}
                style={styles.appointmentStyle}
              />
              <Text style={styles.appointmentText}>
                You have not booked any appointments yet.
              </Text>
            </View>
          )}
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
