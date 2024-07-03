import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style.js';
import images from '../../services/utilities/images';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import BackArrow from '../../components/BackArrow';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/index.js';
import Button from '../../components/Button/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectbarber } from '../../store/barber/index.js';
import {
  deleteCartItem,
  removeCart,
  selectCart,
  setCart,
  updateCart,
} from '../../store/cart/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import { ErrorShow } from '../../components/Error/index.js';
import Toast from 'react-native-toast-message';

export default function BookingProcess({ navigation, route }) {
  const dispatch = useDispatch();
  const barbers = useSelector(selectbarber);
  const cart = useSelector(selectCart);
  const today = moment();

  const [selected, setSelected] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [barber, setBarber] = useState();
  const [dateData, setDatedata] = useState();
  const [selectedDate, setSelectedDate] = useState(null);

  const findBarber = async () => {
    const barber = await barbers.find(barber => barber._id === cart?.barber);
    setBarber(barber);
    handleCreateTimeSlot(barber);
  };
  const setTotalPrice = () => {
    let totalPrice = 0;
    cart.services.forEach(service => {
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
      const availableTimeSlot = handleCreateTimeSlotSecond(startTime, endTime)
      setDatedata(availableTimeSlot)
    } else {
      console.log('Invalid time format');
    }
  };

  const handleCreateTimeSlotSecond = (startTime, endTime, timeToRemove) => {
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
      return { hour, minutes };
    };

    let { hour: startHour, minutes: startMinutes } =
      convertTo24HourFormat(startTime);
    let { hour: endHour, minutes: endMinutes } = convertTo24HourFormat(endTime);

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

  const handleDateSelected = (date) => {
    setSelectedDate(date.format('MM-DD-YYYY'));
  };

  const getOneHourLater = (selected) => {
    return moment(selected, "h:mm A").add(1, 'hour').format('h:mm A');
  };

  const handleConfirm = async () => {
    if (!selectedDate) {
      return ErrorShow('error', 'Oops!', 'Please select date');
    }
    if (!selected) {
      return ErrorShow('error', 'Oops!', 'Please select time');
    }
    if(cart?.services?.length  === 0) {
      return ErrorShow('error', 'Oops!', 'Please select service');
    }
    const obj = {
      ...cart,
      date: selectedDate,
      time: selected
    }
    console.log(formatToJSON(obj));
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.allignment}>
            <View style={styles.arrowTop}>
              <BackArrow
                onPress={() => {
                  // dispatch(removeCart());
                  navigation.goBack();
                }}
              />
            </View>
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
                  dayContainerStyle={{ borderWidth: 1 }}
                  scrollerPaging
                  useNativeDriver
                  scrollable
                  highlightDateNumberStyle={{ color: colors.red }}
                  calendarHeaderStyle={{ color: colors.black }}
                  highlightDateNameStyle={{ color: colors.red }}
                  highlightDateContainerStyle={{
                    backgroundColor: colors.dateSelected,
                    borderColor: colors.red,
                  }}
                  dateNameStyle={{ color: colors.black }}
                  dateNumberStyle={{ color: colors.black }}
                  leftSelector={[]}
                  rightSelector={[]}
                  onDateSelected={handleDateSelected}
                  minDate={today}
                />
              </View>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <ScrollView horizontal>
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
          <View style={styles.bookContainer}>
            <ScrollView>
              <View style={styles.barberContainer}>
                <View style={styles.barberNameImage}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: barber?.profile }}
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
              <View style={{ marginTop: 20 }}>
                {cart.services?.map((item, index) => {
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
                        style={styles.disabledText}>{`$ ${item.price}.00`}</Text>
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
                  navigation.navigate('BookAppointment', { item: barber })
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
            <TouchableOpacity style={styles.cardDetailscontainer}>
              <View style={styles.row}>
                <Image
                  source={images.masterCard}
                  resizeMode="contain"
                  style={styles.masterCard}
                />
                <Text style={styles.cardText}>************6489</Text>
              </View>
              <Image
                source={images.arrowRight}
                style={styles.arrowRight}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.btnMargin}>
            <Button title={'Book'} onPress={handleConfirm} />
          </View>
        </ScrollView>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
