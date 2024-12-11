import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
  ToastAndroid,
  Platform,
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
import {addAppoinment, selectUserData} from '../../store/userData/index.js';
import {socket, socketService} from '../../services/Socket';
import Header from '../../components/Header/index.js';
import Modal from 'react-native-modal';

export default function BookingProcess({navigation, route}) {
  const dispatch = useDispatch();
  const barbers = useSelector(selectbarber);
  const cart = useSelector(selectCart);
  const paymentCard = useSelector(selectPaymentCard);
  const authToken = useSelector(selectAuthToken);
  const today = moment();

  const [selected, setSelected] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDuration, setTotalDuration] = useState();
  const [barber, setBarber] = useState();
  const [dateData, setDatedata] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [bookedTime, setBookedTime] = useState([]);
  const [dates, setDates] = useState(null);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [havePreviousBalance, setHavePreviousBalance] = useState(true);

  const userData = useSelector(selectUserData);

  useEffect(() => {
    const backAction = () => {
      if (loader) {
        ToastAndroid.show('Please wait, loading...', ToastAndroid.SHORT);
        return true;
      }
      return false;
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
    setTotalAmount(totalPrice);
  };

  const handleSetTotalDuration = () => {
    const services = cart?.services;
    const totalTime = services?.reduce(
      (acc, service) => acc + parseInt(service?.time, 10),
      0,
    );
    setTotalDuration(totalTime);
  };

  const handleCreateTimeSlotSecond = (
    startTime,
    endTime,
    timeToRemove,
    duration,
  ) => {
    console.log('create time slot =============>', timeToRemove);

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

    const convertToMinutes = (hour, minutes) => hour * 60 + minutes;

    let {hour: startHour, minutes: startMinutes} =
      convertTo24HourFormat(startTime);
    let {hour: endHour, minutes: endMinutes} = convertTo24HourFormat(endTime);

    // Adjust the endHour to include the last slot
    if (endMinutes > 0) {
      endHour += 1;
    }

    let startTotalMinutes = convertToMinutes(startHour, startMinutes);
    let endTotalMinutes = convertToMinutes(endHour, endMinutes);
    endTotalMinutes -= duration; // Subtract to avoid going past the end time

    while (startTotalMinutes < endTotalMinutes) {
      const hours = Math.floor(startTotalMinutes / 60) % 24;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = startTotalMinutes % 60;
      const formattedTime = `${formattedHour}:${formattedMinutes
        .toString()
        .padStart(2, '0')} ${ampm}`;

      timeSlots.push(formattedTime);

      console.log('loop');

      // Update start time for the next slot
      startTotalMinutes += 10;

      // Check if we go past the end time
      if (startTotalMinutes >= endTotalMinutes) {
        break;
      }
    }

    // Filter out time slots that fall within the removal intervals or cannot accommodate the service duration
    let filteredTimeSlots = [];
    if (timeToRemove) {
      filteredTimeSlots = timeSlots
        .filter(slot => {
          const slotStartTime = moment(slot, 'h:mm A');
          const slotEndTime = slotStartTime.clone().add(duration, 'minutes');
          return !timeToRemove.some(range => {
            const [removeStartTime, removeEndTime] = range
              .split(' - ')
              .map(time => moment(time, 'h:mm A'));
            // Check if the slot cannot be accommodated within removal intervals
            return (
              slotStartTime.isBefore(removeEndTime) &&
              slotEndTime.isAfter(removeStartTime)
            );
          });
        })
        .filter(slot => {
          const slotStartTime = moment(slot, 'h:mm A');
          const slotEndTime = slotStartTime.clone().add(duration, 'minutes');
          // Ensure the slot + duration does not exceed the end time
          return slotEndTime.isBefore(
            moment(endTime, 'h:mm A').add(1, 'minute'),
          );
        });
    } else {
      filteredTimeSlots = timeSlots.filter(slot => {
        const slotStartTime = moment(slot, 'h:mm A');
        const slotEndTime = slotStartTime.clone().add(duration, 'minutes');
        // Ensure the slot + duration does not exceed the end time
        return slotEndTime.isBefore(moment(endTime, 'h:mm A').add(1, 'minute'));
      });
    }

    return filteredTimeSlots;
  };

  useEffect(() => {
    findBarber();
    setTotalPrice();
    getNext30Days();
    handleSetTotalDuration();
    console.log('useEffect==>');
  }, [cart]);

  const deleteOptions = item => {
    setDatedata(null);
    dispatch(deleteCartItem(item));
  };

  const checkAndReturnTime = (startTime, formattedDate) => {
    console.log('loggggggggggggggg',startTime,formattedDate);
    const dateTime = moment(
      `${formattedDate} ${startTime}`,
      'MM-DD-YYYY h:mm A',
    );
    const currentDateTime = moment();

    // Function to round minutes to the nearest 5-minute interval
    const roundToNearest5 = minutes => {
      return Math.ceil(minutes / 5) * 5;
    };

    const adjustedDateTime = dateTime.isAfter(currentDateTime)
      ? dateTime
      : currentDateTime;

    const minutes = adjustedDateTime.minutes();
    const roundedMinutes = roundToNearest5(minutes);

    // Update the adjustedDateTime with rounded minutes
    adjustedDateTime.minutes(roundedMinutes);
    if (roundedMinutes === 60) {
      adjustedDateTime.hours(adjustedDateTime.hours() + 1);
      adjustedDateTime.minutes(0);
    }
console.log("loggghhhhhhhh",adjustedDateTime.format('hh:mm A'));
    return adjustedDateTime.format('hh:mm A');
  };

  const getDayOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = new Date().getDay();
    return daysOfWeek[currentDay];
  };

  const getNext30Days = () => {
    const daysArray = [];

    for (let i = 0; i < 30; i++) {
      const currentDate = moment().add(i, 'days');
      daysArray.push({
        date: currentDate.format('MM-DD-YYYY'), // Format: MM-DD-YYYY
        day: currentDate.format('ddd'), // Day of the week
      });
    }
    console.log(formatToJSON(daysArray));
    setDates(daysArray);
  };

  const getDayFromDate = dateString => {
    const date = moment(dateString, 'MM-DD-YYYY');
    return date.format('DD');
  };

  const getMonthsFromDateArray = dateArray => {
    const months = new Set(); // Use a Set to ensure unique month values

    dateArray.forEach(item => {
      const month = moment(item.date, 'MM-DD-YYYY').format('MMM'); // Extract the short month name
      months.add(month); // Add the month to the Set
    });

    return Array.from(months); // Convert the Set to an array and return it
  };

  const getDayObject = shortDay => {
    // Mapping short form to full day names
    const dayMap = {
      Sun: 'Sunday',
      Mon: 'Monday',
      Tue: 'Tuesday',
      Wed: 'Wednesday',
      Thu: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
    };

    // Get the full day name from the short day
    const fullDayName = dayMap[shortDay];

    // Find and return the object that matches the full day name
    return barber?.scheduled.find(item => item.day === fullDayName) || null; // Returns null if no match is found
  };

  const handleDateSelected = (formattedDate, day) => {
    const dayObject = getDayObject(day);
    console.log(formatToJSON(dayObject));

    setSelected(null);
    if (dayObject?.available == false) {
      setDatedata(null);
      setSelected(null);
      setSelectedDate(null);
      return ErrorShow(
        'error',
        'Oops!',
        'Barber is not available today kindly choose another day',
      );
    } else {
      setSelectedDate(formattedDate);
      const bookedTimesForSelectedDate = bookedTime
        .filter(booking => booking.date === formattedDate)
        .map(booking => booking.time);
      const [startTime1, endTime] = dayObject.time.split(' - ');
      console.log("start time 1" , startTime1);
      const startTime = checkAndReturnTime(startTime1, formattedDate);
      console.log("=--=-=-=",startTime , endTime);
      const availableTimeSlot = handleCreateTimeSlotSecond(
        startTime,
        endTime,
        bookedTimesForSelectedDate,
        totalDuration,
      );
      setDatedata(availableTimeSlot);
    }
    // const isOff = barber?.offDays?.includes(day);
    // if (isOff) {
    //   setDatedata(null);
    //   setSelected(null);
    //   setSelectedDate(null);
    //   return ErrorShow(
    //     'error',
    //     'Oops!',
    //     'Barber is not available today kindly choose another day',
    //   );
    // } else {
    //   setSelectedDate(formattedDate);
    //   const bookedTimesForSelectedDate = bookedTime
    //     .filter(booking => booking.date === formattedDate)
    //     .map(booking => booking.time);
    //   const [startTime1, endTime] = barber.time.split(' - ');
    //   const startTime = checkAndReturnTime(startTime1, formattedDate);
    //   const availableTimeSlot = handleCreateTimeSlotSecond(
    //     startTime,
    //     endTime,
    //     bookedTimesForSelectedDate,
    //     totalDuration,
    //   );
    //   setDatedata(availableTimeSlot);
    // }
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
    let selectedTime = moment(selected, 'hh:mm A');
    selectedTime = selectedTime.add(totalDuration, 'minutes');
    return selectedTime.format('hh:mm A');
  };

  const getBookedAppoinment = async id => {
    try {
      const response = await hanleGetBookedAppoinment(authToken, id);
      if (response.status == 200) {
        setBookedTime(response?.data?.appointments);
        console.log('get book appointment', response?.data?.appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const canBook = (array, barberId, date, time) =>
    array.some(
      ({barber, status, date, time}) =>
        barber._id === barberId &&
        status === 'Pending' &&
        selectedDate === date &&
        selected === time,
    );

  const addMinutesToTime = (timeStr, minutes) => {
    // Parse the time string into a Moment object
    const timeMoment = moment(timeStr, 'h:mm A');

    // Add the duration
    timeMoment.add(minutes, 'minutes');

    // Format the new time
    return timeMoment.format('h:mm A');
  };

  const onHideShowModal = () => {
    setShowRechargeModal(true);
  };

  const calculateTotalPriceForPendingAppointments = appointments => {
    return appointments
      ?.filter(appointment => appointment?.status === 'Pending') // Filter by Pending status
      ?.reduce((totalPrice, appointment) => {
        // For each appointment, calculate the sum of prices in the services array
        const servicesTotal = appointment?.services?.reduce((sum, service) => {
          return sum + Number(service?.price); // Convert price to a number and add to sum
        }, 0);

        return totalPrice + servicesTotal; // Add the services total to the overall total price
      }, 0);
  };

  const handleConfirm = async () => {
    if (!authToken) {
      return navigation.navigate('WelcomeScreen');
    }
    const previousPrice = calculateTotalPriceForPendingAppointments(
      userData?.appoinment,
    );
    const newAndTotalPrice = previousPrice + totalAmount;
    if (previousPrice > 0) {
      if (newAndTotalPrice > userData?.wallet) {
        setHavePreviousBalance(true);
        setShowRechargeModal(true);
        return;
      }
    }
    if (totalAmount > userData?.wallet) {
      return ErrorShow(
        'error',
        'Oops!',
        'Insufficient fund! please recharge your wallet',
        onHideShowModal,
      );
    }
    console.log(
      canBook(userData.appoinment, barber._id, selectedDate, selected),
    );
    if (canBook(userData.appoinment, barber._id, selectedDate, selected)) {
      return ErrorShow(
        'error',
        'Oops!',
        'You have already scheduled an appointment for this time slot.',
      );
    }
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
    const endTime = addMinutesToTime(selected, totalDuration);
    console.log('endTime=====>', endTime);

    const obj = {
      ...cart,
      date: selectedDate,
      time: `${selected} - ${endTime}`,
    };
    try {
      setLoader(true);
      const response = await bookAppoinment(obj, authToken);
      console.log(response.status);
      if (response.status == 200) {
        setLoader(false);
        ErrorShow(
          'success',
          'Congratulation!',
          response?.data?.message,
          onHide,
        );
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
    const cardNumberWithoutSpaces = cardNumber.replace(/\s+/g, '');

    if (cardNumberWithoutSpaces.length === 16) {
      const maskedCardNumber =
        '************' + cardNumberWithoutSpaces.slice(-4);

      return maskedCardNumber.replace(/(.{4})/g, '$1 ').trim();
    }

    return cardNumber;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Book Appointment'} />
        <ScrollView>
          <View style={styles.topContentcontainer}>
            <View style={styles.rowcontainer}>
              <Text style={styles.datesHeading}>Select Date</Text>
              <Text style={styles.datesHeading}>
                {dates ? getMonthsFromDateArray(dates)?.join('-') : null}
              </Text>
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // style={styles.containerCheck}
                contentContainerStyle={{
                  gap: sizes.screenWidth * 0.02,
                  marginTop: sizes.screenHeight * 0.02,
                }}>
                {/* <CalendarStrip
                  daySelectionAnimation={{
                    type: 'border',
                    duration: 100,
                    borderWidth: 1,
                  }}
                  style={{
                    height: sizes.screenHeight * 0.12,
                    paddingTop: sizes.screenHeight * 0.01,
                  }}
                  dayContainerStyle={{ borderWidth: 1 }}
                  scrollerPaging
                  useNativeDriver
                  scrollable
                  highlightDateNumberStyle={{ color: colors.black }}
                  calendarHeaderStyle={{ color: colors.black }}
                  highlightDateNameStyle={{ color: colors.black }}
                  highlightDateContainerStyle={{
                    backgroundColor: colors.grayBorder,
                    borderColor: colors.black,
                  }}
                  dateNameStyle={{ color: colors.black }}
                  dateNumberStyle={{ color: colors.black }}
                  leftSelector={[]}
                  rightSelector={[]}
                  onDateSelected={handleDateSelected}
                  minDate={today}
                /> */}
                {dates &&
                  dates?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={
                          item?.date === selectedDate
                            ? styles.datesTouchableSelected
                            : styles.datesTouchable
                        }
                        onPress={() =>
                          handleDateSelected(item?.date, item?.day)
                        }>
                        <Text style={styles.datesDay}>{item?.day}</Text>
                        <Text style={styles.datesDate}>
                          {getDayFromDate(item?.date)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
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
                      // source={{ uri: barber?.businessProfile }}
                      source={
                        barber?.profile
                          ? {uri: barber?.profile}
                          : barber?.gender === 'male'
                          ? images.male
                          : images.female
                      }
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
                          <Text
                            style={
                              styles.disabledText1
                            }>{`  (${item?.time} min)`}</Text>
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
              <View style={styles.textContainerBorder}>
                <TouchableOpacity
                  style={styles.textContainer}
                  onPress={() =>
                    navigation.navigate('BookAppointment', {item: barber})
                  }>
                  <Text style={styles.addAnotherservice}>
                    + Add Another Service
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <View style={styles.paymentBorder}>
            {/* <View style={styles.paymentTitle}>
              <Text style={styles.title}>Payments</Text>
            </View> */}
            {/* <View style={styles.credtDebit}>
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
            )} */}
          </View>
        </ScrollView>
        <View
          style={
            Platform.OS == 'android' ? styles.btnMargin : styles.btnMarginIOS
          }>
          {loader ? (
            <Loader title={'Book'} />
          ) : (
            <Button title={'Book'} onPress={handleConfirm} />
          )}
        </View>
        <Modal isVisible={showRechargeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              {havePreviousBalance && (
                <TouchableOpacity
                  onPress={() => {
                    setHavePreviousBalance(false);
                    setShowRechargeModal(false);
                  }}
                  style={{
                    position: 'absolute',
                    bottom:
                      Platform.OS == 'android'
                        ? sizes.screenHeight * 0.34
                        : sizes.screenHeight * 0.36,
                    right: 12,
                  }}>
                  <Image
                    source={images.crossIcon}
                    style={{
                      width: sizes.screenWidth * 0.05,
                      height: sizes.screenWidth * 0.05,
                    }}
                  />
                </TouchableOpacity>
              )}
              {havePreviousBalance ? (
                <Text style={styles.modalText}>
                  It looks like you don't have enough balance in your wallet to
                  book this appointment. You've already booked several other
                  appointments, which is why your current balance is
                  insufficient. To proceed, please recharge your wallet or
                  cancel one of your existing appointments.
                </Text>
              ) : (
                <Text style={styles.modalText}>
                  you don’t have enough balance in your wallet to book an
                  appointment.Recharge your account?
                </Text>
              )}
              {havePreviousBalance && (
                <View style={{marginBottom: sizes.screenWidth * 0.03}}>
                  <Button
                    title={'View Appointments'}
                    onPress={() => {
                      setHavePreviousBalance(false);
                      setShowRechargeModal(false);
                      navigation.navigate('Appointments');
                    }}
                  />
                </View>
              )}
              <Button
                title={'View Wallet'}
                onPress={() => {
                  setShowRechargeModal(false);
                  navigation.navigate('Wallet');
                }}
              />
              <View style={{marginTop: sizes.screenWidth * 0.03}}></View>
              {!havePreviousBalance && (
                <Button
                  title={'Cancel'}
                  light
                  hideImage
                  textCenter
                  onPress={() => setShowRechargeModal(false)}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
