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
import formatToJSON from '../../services/config/FormatToJson/index.js';
import Header from '../../components/Header/index.js';
import moment from 'moment';
import { updateAppointmentStatus } from '../../services/config/API/index.js';
import { selectAuthToken } from '../../store/authToken/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function Appointments({ navigation }) {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken)
  const userData = useSelector(selectUserData);

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

  const calculateDuration = (time) => {
    const [startTime, endTime] = time.split(' - ');

    // Parse the times using Moment.js
    const start = moment(startTime, 'h:mm A');
    const end = moment(endTime, 'h:mm A');

    // Calculate the difference in minutes
    const durationInMinutes = end.diff(start, 'minutes');

    return durationInMinutes;

  }

  const handleUpdateAppointmentStatus = async (_id) => {
    try {
      const response = await updateAppointmentStatus(authToken, _id, 'Cancelled')
      console.log(formatToJSON(response?.data));
    } catch (error) {
      console.log(error);
    }
  }
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
                      // source={{ uri: item?.barber?.businessProfile }}
                      source={item?.profile ? { uri: item?.profile } : item?.gender === "male" ? images.male : images.female}
                      imageStyle={styles.barberHat}
                      resizeMode='contain'
                    >
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
                                  source={{ uri: item?.serviceIcon }}
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
                            )}/${item?.time} (${calculateDuration(item?.time)} min)`}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.bookBtn}
                        onPress={() =>
                          navigation.navigate('AppointmentDetails', { item })
                        }>
                        <Text style={styles.btnText}>See Details</Text>
                        <Image
                          source={images.arrowIcon}
                          resizeMode="contain"
                          style={styles.arrowStyle}
                        />
                      </TouchableOpacity>
                      {
                        item?.status === "Pending" &&
                        <TouchableOpacity
                          style={styles.bookBtn}
                          // onPress={() =>
                          //   navigation.navigate('AppointmentDetails', { item })
                          // }
                          onPress={() => handleUpdateAppointmentStatus(item?._id)}
                        >
                          <Text style={styles.btnText}>Cancel Appointment</Text>
                          <Image
                            source={images.crossbtn}
                            resizeMode="contain"
                            style={styles.crossStyle}
                          />
                        </TouchableOpacity>
                      }
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
              paddingBottom: Platform.OS == 'ios' ? sizes.screenHeight * 0.11 : sizes.screenHeight * 0.01,
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
