import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
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

export default function AppointmentDetails({navigation, route}) {
  const {item} = route?.params;
  console.log('wizzz bro', formatToJSON(item));
  const [selected, setSelected] = useState(null);

  const currentDate = moment();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleMonthChange = newMonthIndex => {
    setSelectedMonth(newMonthIndex);
  };

  const [dateData, setDatedata] = useState([
    {
      time: '1:00',
    },
    {
      time: '1:30',
    },
    {
      time: '2:00',
    },
    {
      time: '2:30',
    },
    {
      time: '3:00',
    },
    {
      time: '3:30',
    },
    {
      time: '4:00',
    },
    {
      time: '4:30',
    },
    {
      time: '5:00',
    },
    {
      time: '5:30',
    },
    {
      time: '6:00',
    },
    {
      time: '6:30',
    },
  ]);

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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.allignment}>
            <View style={styles.arrowTop}>
              <BackArrow onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.headerText}>Appoinment Details</Text>
          </View>
        </View>
        <View style={styles.topContentcontainer}>
          <View style={styles.rowcontainer}>
            <Text style={styles.datesHeading}>Select Date</Text>
            {/* <TouchableOpacity style={styles.row}>
                <Text style={styles.datesHeading}>Feb</Text>
                <Image
                  style={styles.redTriangle}
                  resizeMode="contain"
                  source={images.redTriangle}
                />
              </TouchableOpacity> */}
          </View>
          {/* <View style={styles.row}>
              <View style={styles.spaceTop}>
                <Text style={styles.days}>Sat</Text>
                <Text style={styles.dates}>31</Text>
              </View>
              <View style={styles.spaceTop}>
                <Text style={styles.days}>Sat</Text>
                <Text style={styles.dates}>31</Text>
              </View>
              <View style={styles.spaceTop}>
                <Text style={styles.days}>Sat</Text>
                <Text style={styles.dates}>31</Text>
              </View>
              <View style={styles.spaceTop}>
                <Text style={styles.days}>Sat</Text>
                <Text style={styles.dates}>31</Text>
              </View>
              <View style={styles.spaceTop}>
                <Text style={styles.days}>Sat</Text>
                <Text style={styles.dates}>31</Text>
              </View>
            </View> */}
          <View>
            <View style={styles.containerCheck}>
              <CalendarStrip
                daySelectionAnimation={{
                  type: 'border',
                  duration: 100,
                  borderWidth: 1,
                }}
                style={{
                  height: sizes.screenHeight * 0.16,
                  paddingTop: sizes.screenHeight * 0.01,
                  paddingBottom: sizes.screenHeight * 0.02,
                }}
                dayContainerStyle={{borderWidth: 1}}
                scrollerPaging
                useNativeDriver
                scrollable
                highlightDateNumberStyle={{color: colors.red}}
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
              {dateData.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.selected,
                      index === selected
                        ? styles.selectedItem
                        : styles.notSelected,
                    ]}
                    onPress={() => setSelected(index)}>
                    <Text
                      style={[
                        styles.selectedTextcolor,
                        index === selected
                          ? styles.selectedTextcolor
                          : styles.textBlack,
                      ]}>
                      {item.time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.bookContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.textBlack}>Haircuts</Text>
            {/* <View style={styles.directionRow}>
              <TouchableOpacity>
                <Text style={styles.change}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={images.crossbtn}
                  resizeMode="contain"
                  style={styles.crossbtn}
                />
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={styles.barberContainer}>
            <View style={styles.barberNameImage}>
              <View style={styles.imageContainer}>
                <Image
                  source={images.barberHat}
                  style={styles.imageContainer}
                />
              </View>
              <View>
                <Text style={styles.barberName}>{item?.barber?.name}</Text>
                <Text style={styles.time}>
                  {`${item?.time} - ${getOneHourLater(item?.time)}`}
                </Text>
              </View>
            </View>
            <View style={styles.marginTop}>
              <Text style={styles.priceSmalltext}>$25.00</Text>
            </View>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.priceBlack}>$25.00</Text>
          </View>
          {/* <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.addAnotherservice}>+ Add Another Service</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.paymentBorder}>
          <View style={styles.paymentTitle}>
            <Text style={styles.title}>Payments</Text>
          </View>
          <View style={styles.credtDebit}>
            <Text style={styles.creditText}>Credit / Debit Cards</Text>
            {/* <TouchableOpacity style={styles.blackPlusbox}>
              <Image
                source={images.whiteCross}
                style={styles.starSize}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
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
        {/* <View style={styles.btnMargin}>
          <Button title={'Book'} />
        </View> */}
      </View>
    </SafeAreaView>
  );
}
