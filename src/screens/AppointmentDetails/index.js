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
import BackArrow from '../../components/BackArrow';
// import {colors, sizes} from '../../services/index.js';
import Button from '../../components/Button';
import CalendarStrip from 'react-native-calendar-strip';
import 'moment';
import moment from 'moment';
import {colors} from '../../services/utilities/colors';
import {sizes} from '../../services/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import Header from '../../components/Header/index.js';

export default function AppointmentDetails({navigation, route}) {
  const today = moment();
  const {item, showButtons} = route?.params;
  const [selected, setSelected] = useState(null);

  const currentDate = moment();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [datesArray, setDatesArray] = useState([]);
  const [totalPrice, setTotlPrice] = useState(0);

  const handleMonthChange = newMonthIndex => {
    setSelectedMonth(newMonthIndex);
  };

  const [dateData, setDatedata] = useState([]);

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

  const getOneHourLater = selected => {
    return moment(selected, 'h:mm A').add(1, 'hour').format('h:mm A');
  };

  const handleSelectDate = async () => {
    setSelected('2024-07-08T07:21:20.776Z');
  };

  useEffect(() => {
    if (item) {
      handleCreateDatesArray(item?.date);
      handleCreateTimesArray(item?.time);
      handleSetTotalPrice(item.services);
    }
  }, [item]);

  const handleCreateTimesArray = async time => {
    const centerTime = moment(time, 'hh:mm');

    const timesArray = [];

    timesArray.push({
      time: centerTime.format('hh:mm'),
    });

    for (let i = 1; i <= 2; i++) {
      const previousTime = centerTime.clone().subtract(i * 60, 'minutes');
      timesArray.unshift({
        time: previousTime.format('hh:mm'),
      });
    }

    for (let i = 1; i <= 2; i++) {
      const nextTime = centerTime.clone().add(i * 60, 'minutes');
      timesArray.push({
        time: nextTime.format('hh:mm'),
      });
    }

    setDatedata(timesArray);
  };

  const handleCreateDatesArray = async date => {
    const centerDate = moment(date, 'MM-DD-YYYY');

    const datesArray = [];

    for (let i = -2; i <= 2; i++) {
      const currentDate = centerDate.clone().add(i, 'days');
      datesArray.push({
        day: currentDate.format('ddd'),
        date: currentDate.format('DD'),
        month: currentDate.format('MMMM'),
      });
    }
    setDatesArray(datesArray);
  };

  const handleSetTotalPrice = services => {
    let totalPrice = 0;
    services.forEach(service => {
      totalPrice += parseFloat(service.price);
    });
    setTotlPrice(totalPrice);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Appointment Details'} />
        <View style={styles.topContentcontainer}>
          <View style={styles.rowcontainer}>
            <Text style={styles.datesHeading}>Select Date</Text>
            <Text style={styles.datesHeading}>
              {datesArray && datesArray[2]?.month}
            </Text>
          </View>
          <View>
            <View style={styles.containerCheck}>
              {datesArray?.length > 0 &&
                datesArray?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={
                        index === 2
                          ? styles.dateRoundSelected
                          : styles.dateRound
                      }>
                      <Text
                        style={
                          index === 2
                            ? styles.dateRoundTextSelected
                            : styles.dateRoundText
                        }>
                        {item.day}
                      </Text>
                      <Text
                        style={
                          index === 2
                            ? styles.dateRoundTextSelected
                            : styles.dateRoundText
                        }>
                        {item.date}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <ScrollView horizontal>
            <View style={styles.timeAlligment}>
              {dateData?.length > 0 &&
                dateData?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.selected,
                        index === 2 ? styles.selectedItem : styles.notSelected,
                      ]}>
                      <Text
                        style={[
                          styles.selectedTextcolor,
                          index === 2
                            ? styles.selectedTextcolor
                            : styles.textBlack,
                        ]}>
                        {item.time}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.bookContainer}>
          <View style={styles.barberContainer}>
            <View style={styles.barberNameImage}>
              <View style={styles.imageContainer}>
                {showButtons ? (
                  <Image
                    source={{uri: item?.user?.profile}}
                    style={styles.imageContainer}
                  />
                ) : (
                  <Image
                    source={{uri: item?.barber?.profile}}
                    style={styles.imageContainer}
                  />
                )}
              </View>
              <View>
                {showButtons ? (
                  <Text style={styles.barberName}>{item?.user?.name}</Text>
                ) : (
                  <Text style={styles.barberName}>{item?.barber?.name}</Text>
                )}
                <Text style={styles.time}>
                  {`${item?.time} - ${getOneHourLater(item?.time)}`}
                </Text>
              </View>
            </View>
          </View>
          <View>
            {item?.services?.map((item, index) => {
              return (
                <View style={styles.flexRow} key={index}>
                  <View style={styles.flexRow1}>
                    <Text
                      style={
                        showButtons
                          ? styles.disabledTextShowButton
                          : styles.disabledText
                      }>
                      {item?.name}
                    </Text>
                    <Text
                      style={
                        showButtons
                          ? styles.disabledTextShowButton
                          : styles.disabledText1
                      }>{` (${item?.serviceName})`}</Text>
                  </View>
                  <Text
                    style={
                      showButtons
                        ? styles.disabledTextShowButton
                        : styles.disabledText
                    }>{`$ ${item.price}.00`}</Text>
                </View>
              );
            })}
            {showButtons && <View style={styles.horizontalLine} />}
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.priceBlack}>{`$${parseFloat(
              totalPrice,
            )?.toFixed(2)}`}</Text>
          </View>
        </View>
        {/* {showButtons && (
          <View style={styles.btnView}>
            <TouchableOpacity style={styles.acceptBtn}>
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineBtn}>
              <Text style={styles.btnText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
}
