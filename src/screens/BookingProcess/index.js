import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import 'moment';
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

export default function BookingProcess({navigation, route}) {
  const dispatch = useDispatch();
  const barbers = useSelector(selectbarber);
  const cart = useSelector(selectCart);
  // console.log(formatToJSON(cart));

  const [selected, setSelected] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [barber, setBarber] = useState();
  const [dateData, setDatedata] = useState();

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

      // console.log('Start Time:', startTime);
      // console.log('End Time:', endTime);
      // handleCreateTimeSlotSecond(startTime, endTime);
    } else {
      console.log('Invalid time format');
    }
  };

  // const handleCreateTimeSlotSecond = (startTime, endTime) => {
  //   const timeSlots = [];

  //   const convertTo24HourFormat = time => {
  //     let [hour, minutes] = time.split(':');
  //     minutes = minutes.slice(0, 2);
  //     const modifier = time.slice(-2);
  //     hour = parseInt(hour);
  //     minutes = parseInt(minutes);

  //     if (modifier === 'PM' && hour !== 12) {
  //       hour += 12;
  //     }
  //     if (modifier === 'AM' && hour === 12) {
  //       hour = 0;
  //     }
  //     return { hour, minutes };
  //   };

  //   let { hour: startHour, minutes: startMinutes } = convertTo24HourFormat(startTime);
  //   let { hour: endHour, minutes: endMinutes } = convertTo24HourFormat(endTime);

  //   let currentHour = startHour;

  //   // Adjust the endHour to include the last slot
  //   if (endMinutes > 0) {
  //     endHour += 1;
  //   }

  //   while (currentHour !== endHour) {
  //     const hours = currentHour % 24;
  //     const ampm = hours >= 12 ? 'PM' : 'AM';
  //     const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  //     const formattedTime = `${formattedHour}:00 ${ampm}`;
  //     timeSlots.push(formattedTime);
  //     currentHour = (currentHour + 1) % 24;
  //   }
  //   return timeSlots;
  // };

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
      (startHour === endHour && startMinutes < endMinutes)
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
    const startTime = '10:00 AM';
    const endTime = '6:00 PM';
    // const bookedSlots = ['11:00 AM', '1:00 PM'];
    const bookedSlots = null;
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    setDatedata(handleCreateTimeSlotSecond(startTime, endTime));
    // console.log('slots:', slots);
  }, [cart]);

  const deleteOptions = item => {
    dispatch(deleteCartItem(item));
  };

  const currentDate = moment();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleMonthChange = newMonthIndex => {
    setSelectedMonth(newMonthIndex);
  };

  // useEffect(() => {
  //   const calculateTotal = () => {
  //     let total = 0;
  //     services?.forEach(serviceItem => {
  //       const service = serviceItem?.service;
  //       const selectedIndexes = serviceItem?.selectedIndexes;
  //       selectedIndexes?.forEach(index => {
  //         total += parseFloat(service?.options[index]?.price);
  //       });
  //     });
  //     setTotalAmount(total);
  //   };

  //   calculateTotal();
  // }, [services]);

  return (
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
                    index === selected ? styles.selected : styles.notSelected
                  }
                  onPress={() => setSelected(index)}>
                  <Text
                    style={
                      index === selected
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
                    source={{uri: barber?.profile}}
                    style={styles.imageContainer}
                  />
                </View>
                <View>
                  <Text style={styles.barberName}>{barber?.name}</Text>
                  <Text style={styles.time}>02:00-02:45</Text>
                </View>
              </View>
            </View>

            {/* {services?.map((item, serviceIndex) => {
              const service = item?.service;
              const selectedIndexes = item?.selectedIndexes;
              const selectedOptions = getSelectedOptions(
                service,
                selectedIndexes,
              );
              return (
                <View key={serviceIndex}>
                  {
                    selectedIndexes?.length >0?
                  <Text style={styles.barberName2}>{service?.name}</Text>:null
                  }
                  {selectedOptions?.map((item, optionIndex) => {
                    return (
                      <View style={styles.flexRow} key={optionIndex}>
                        <View style={styles.flexRow}>
                          <TouchableOpacity
                            onPress={() => {
                              deleteOptions(serviceIndex, optionIndex);
                            }}>
                            <Image
                              source={images.crossIcon}
                              style={styles.crossIcon}
                            />
                          </TouchableOpacity>
                          <Text style={styles.disabledText}>{item?.name}</Text>
                        </View>
                        <Text style={styles.disabledText}>{`$${parseFloat(
                          item?.price,
                        )?.toFixed(2)}`}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })} */}
            <View style={{marginTop: 20}}>
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
          <Button title={'Book'} />
        </View>
      </ScrollView>
    </View>
  );
}
