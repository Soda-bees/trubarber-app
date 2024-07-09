import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import BackArrow from '../../components/BackArrow';
import {colors} from '../../services/utilities/colors';
import {sizes} from '../../services/index.js';
import Button from '../../components/Button/index.js';
import {useDispatch, useSelector} from 'react-redux';
import {selectbarber} from '../../store/barber/index.js';
import {
  deleteCartItem,
  removeCart,
  selectCart,
  setCart,
  updateCart,
} from '../../store/cart/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import {ErrorShow} from '../../components/Error/index.js';
import Toast from 'react-native-toast-message';
import {selectPaymentCard} from '../../store/paymentCard/index.js';
import Loader from '../../components/Loader/index.js';
import {selectAuthToken} from '../../store/authToken/index.js';
import {
  bookAppoinment,
  hanleGetBookedAppoinment,
} from '../../services/config/API/index.js';
import {addAppoinment} from '../../store/userData/index.js';
import {socket, socketService} from '../../services/Socket';

export default function BookingProcess({navigation, route}) {
  const dispatch = useDispatch();
  const barbers = useSelector(selectbarber);
  const cart = useSelector(selectCart);
  const paymentCard = useSelector(selectPaymentCard);
  const authToken = useSelector(selectAuthToken);
  const today = moment();

  const [selected, setSelected] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [barber, setBarber] = useState();
  const [dateData, setDatedata] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [bookedTime, setBookedTime] = useState([]);

  useEffect(() => {
    const backAction = () => {
      if (loader) {
        ToastAndroid.show('Please wait, loading...', ToastAndroid.SHORT);
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [loader]);

  const findBarber = async () => {
    const barber = await barbers.find(barber => barber._id === cart?.barber);
    setBarber(barber);
    // handleCreateTimeSlot(barber);
    getBookedAppoinment(barber._id);
  };
  const setTotalPrice = () => {
    let totalPrice = 0;
    cart?.services.forEach(service => {
      totalPrice += parseFloat(service.price);
    });
    console.log('price', totalPrice);
    setTotalAmount(totalPrice);
  };

  const handleCreateTimeSlot = async barber => {
    const time = barber?.time;

    if (typeof time === 'string') {
      const [startTime, endTime] = time.split(' - ');
      const bookedSlots = ['2:00 PM', '4:00 PM', '8:00 PM'];
      const availableTimeSlot = handleCreateTimeSlotSecond(startTime, endTime);
      setDatedata(availableTimeSlot);
    } else {
      console.log('Invalid time format');
    }
  };

  const handleCreateTimeSlotSecond = (
    startTime,
    endTime,
    timeToRemove,
    formattedDate,
  ) => {
    const timeSlots = [];

    const convertTo24HourFormat = time => {
      let [hour, minutes] = time.split(':');
      minutes = minutes.slice(0, 2);
      const modifier = time.slice(-2);
      hour = parseInt(hour);
      minutes = parseInt(minutes);

      if (modifier === 'PM' && hour !== 12) {
        hour += 12;
      }
      if (modifier === 'AM' && hour === 12) {
        hour = 0;
      }
      return {hour, minutes};
    };

    let {hour: startHour, minutes: startMinutes} =
      convertTo24HourFormat(startTime);
    let {hour: endHour, minutes: endMinutes} = convertTo24HourFormat(endTime);

    // Adjust the endHour to include the last slot
    if (endMinutes > 0) {
      endHour += 1;
    }

    while (
      startHour < endHour ||
      (startHour === endHour && startMinutes < endMinutes) ||
      (startHour >= endHour && endHour < 24)
    ) {
      const hours = startHour % 24;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
      const formattedTime = `${formattedHour}:${startMinutes
        .toString()
        .padStart(2, '0')} ${ampm}`;
      timeSlots.push(formattedTime);

      startHour = (startHour + Math.floor((startMinutes + 60) / 60)) % 24;
      startMinutes = (startMinutes + 60) % 60;

      if (startHour === endHour && startMinutes === endMinutes) {
        break;
      }
    }

    if (timeToRemove) {
      const filteredTimeSlots = timeSlots.filter(
        time => !timeToRemove.includes(time),
      );

      return filteredTimeSlots;
    }
    return timeSlots;
  };

  useEffect(() => {
    findBarber();
    setTotalPrice();
  }, [cart]);

  const deleteOptions = item => {
    dispatch(deleteCartItem(item));
  };

  const checkAndReturnTime = (startTime, formattedDate) => {
    const dateTime = moment(
      `${formattedDate} ${startTime}`,
      'MM-DD-YYYY h:mm A',
    );
    const currentDateTime = moment();
    if (dateTime.isAfter(currentDateTime)) {
      return startTime;
    } else {
      return currentDateTime.format('hh:mm A');
    }
  };

  const handleDateSelected = date => {
    const formattedDate = date?.format('MM-DD-YYYY');
    setSelectedDate(formattedDate);

    const bookedTimesForSelectedDate = bookedTime
      .filter(booking => booking.date === formattedDate)
      .map(booking => booking.time);

    console.log(bookedTimesForSelectedDate);

    const [startTime1, endTime] = barber.time.split(' - ');
    const startTime = checkAndReturnTime(startTime1, formattedDate);

    // Parse start and end times
    let [startHour, startMinute, startPeriod] = parseTime(startTime);
    let [endHour, endMinute, endPeriod] = parseTime(endTime);

    // Round start time up to the nearest hour
    if (startMinute > 0) {
      startHour += 1;
      if (startHour === 12 && startPeriod === 'AM') {
        startPeriod = 'PM'; // Handle AM to PM transition at 12:00
      }
    }

    // Round end time up to the nearest hour
    if (endMinute > 0) {
      endHour += 1;
      if (endHour === 12 && endPeriod === 'AM') {
        endPeriod = 'PM'; // Handle AM to PM transition at 12:00
      }
    }

    // Convert rounded hours back to 12-hour format
    startHour = startHour > 12 ? startHour - 12 : startHour;
    endHour = endHour > 12 ? endHour - 12 : endHour;

    // Format rounded times back to 'hh:mm AM/PM' format
    const roundedStartTime = formatTime(startHour, startMinute, startPeriod);
    const roundedEndTime = formatTime(endHour, endMinute, endPeriod);

    console.log(roundedStartTime, roundedEndTime);

    // Continue with your logic here

    const availableTimeSlot = handleCreateTimeSlotSecond(
      roundedStartTime,
      roundedEndTime,
      bookedTimesForSelectedDate,
      formattedDate,
    );
    setDatedata(availableTimeSlot);
  };

  const parseTime = timeString => {
    const [time, period] = timeString.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    return [hour, minute, period];
  };

  const formatTime = (hour, minute, period) => {
    const formattedHour = (hour % 12 === 0 ? 12 : hour % 12)
      .toString()
      .padStart(2, '0');
    const formattedMinute = minute === 0 ? '00' : '00';
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  const getOneHourLater = selected => {
    return moment(selected, 'h:mm A').add(1, 'hour').format('h:mm A');
  };

  const getBookedAppoinment = async id => {
    try {
      const response = await hanleGetBookedAppoinment(authToken, id);
      if (response.status == 200) {
        setBookedTime(response?.data?.appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async () => {
    if (!selectedDate) {
      return ErrorShow('error', 'Oops!', 'Please select date');
    }
    if (!selected) {
      return ErrorShow('error', 'Oops!', 'Please select time');
    }
    if (cart?.services?.length === 0) {
      return ErrorShow('error', 'Oops!', 'Please select service');
    }
    if (!paymentCard) {
      return ErrorShow('error', 'Oops!', 'Please enter card info');
    }
    const obj = {
      ...cart,
      date: selectedDate,
      time: selected,
    };
    try {
      setLoader(true);
      const response = await bookAppoinment(obj, authToken);
      if (response.status == 200) {
        ErrorShow(
          'success',
          'Congratulation!',
          response?.data?.message,
          onHide,
        );
        dispatch(addAppoinment(response?.data?.appoinment));
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops!', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const onHide = () => {
    navigation.navigate('Appointments');
    setLoader(false);
    dispatch(removeCart());
  };

  const maskCardNumber = cardNumber => {
    // Remove spaces from the card number
    const cardNumberWithoutSpaces = cardNumber.replace(/\s+/g, '');

    // Check if the card number is 16 digits
    if (cardNumberWithoutSpaces.length === 16) {
      // Mask all but the last 4 digits
      const maskedCardNumber =
        '************' + cardNumberWithoutSpaces.slice(-4);

      // Add spaces back to the masked card number
      return maskedCardNumber.replace(/(.{4})/g, '$1 ').trim();
    }

    // If the card number is not 16 digits, return it as is (or handle the error)
    return cardNumber;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.allignment}>
            {!loader && (
              <View style={styles.arrowTop}>
                <BackArrow
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </View>
            )}
            <Text style={styles.headerText}>Book Appointment</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.topContentcontainer}>
            <View style={styles.rowcontainer}>
              <Text style={styles.datesHeading}>Select Date</Text>
            </View>
            <View>
              <View style={styles.containerCheck}>
                <CalendarStrip
                  daySelectionAnimation={{
                    type: 'border',
                    duration: 100,
                    borderWidth: 1,
                  }}
                  style={{
                    height: sizes.screenHeight * 0.12,
                    paddingTop: sizes.screenHeight * 0.01,
                    // paddingBottom: sizes.screenHeight * 0.02,
                  }}
                  dayContainerStyle={{borderWidth: 1}}
                  scrollerPaging
                  useNativeDriver
                  scrollable
                  highlightDateNumberStyle={{color: colors.red}}
                  calendarHeaderStyle={{color: colors.black}}
                  highlightDateNameStyle={{color: colors.red}}
                  highlightDateContainerStyle={{
                    backgroundColor: colors.dateSelected,
                    borderColor: colors.red,
                  }}
                  dateNameStyle={{color: colors.black}}
                  dateNumberStyle={{color: colors.black}}
                  leftSelector={[]}
                  rightSelector={[]}
                  onDateSelected={handleDateSelected}
                  minDate={today}
                />
              </View>
            </View>
          </View>
          {dateData?.length > 0 && (
            <View style={styles.timeContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.timeAlligment}>
                  {dateData?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={
                        item === selected ? styles.selected : styles.notSelected
                      }
                      onPress={() => setSelected(item)}>
                      <Text
                        style={
                          item === selected
                            ? styles.selectedTextcolor
                            : styles.textBlack
                        }>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          <View style={styles.bookContainer}>
            <ScrollView>
              <View style={styles.barberContainer}>
                <View style={styles.barberNameImage}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: barber?.profile}}
                      style={styles.imageContainer}
                    />
                  </View>
                  <View>
                    <Text style={styles.barberName}>{barber?.name}</Text>
                    <Text style={styles.time}>
                      {selected && `${selected} - ${getOneHourLater(selected)}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                {cart &&
                  cart?.services?.map((item, index) => {
                    return (
                      // <View key={index}>
                      <View style={styles.flexRow} key={index}>
                        <View style={styles.flexRow1}>
                          <TouchableOpacity
                            onPress={() => {
                              deleteOptions(item);
                            }}>
                            <Image
                              source={images.crossIcon}
                              style={styles.crossIcon}
                            />
                          </TouchableOpacity>
                          <Text style={styles.disabledText}>{item?.name}</Text>
                          <Text
                            style={
                              styles.disabledText1
                            }>{` (${item?.serviceName})`}</Text>
                        </View>
                        <Text
                          style={
                            styles.disabledText
                          }>{`$ ${item.price}.00`}</Text>
                      </View>
                      // </View>
                    );
                  })}
              </View>
              <View style={styles.total}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.priceBlack}>{`$${parseFloat(
                  totalAmount,
                )?.toFixed(2)}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.textContainer}
                onPress={() =>
                  navigation.navigate('BookAppointment', {item: barber})
                }>
                <Text style={styles.addAnotherservice}>
                  + Add Another Service
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.paymentBorder}>
            <View style={styles.paymentTitle}>
              <Text style={styles.title}>Payments</Text>
            </View>
            <View style={styles.credtDebit}>
              <Text style={styles.creditText}>Credit / Debit Cards</Text>
              <TouchableOpacity
                style={styles.blackPlusbox}
                onPress={() => navigation.navigate('AddCard')}>
                <Image
                  source={images.whiteCross}
                  style={styles.starSize}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {paymentCard && (
              <View style={styles.cardDetailscontainer}>
                <View style={styles.row}>
                  <Image
                    source={images.masterCard}
                    resizeMode="contain"
                    style={styles.masterCard}
                  />
                  <Text style={styles.cardText}>
                    {maskCardNumber(paymentCard?.number)}
                  </Text>
                </View>
                <Image
                  source={images.arrowRight}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.btnMargin}>
          {loader ? (
            <Loader title={'Book'} />
          ) : (
            <Button title={'Book'} onPress={handleConfirm} />
          )}
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
