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
import CalendarStrip from 'react-native-calendar-strip';
import 'moment';
import moment from 'moment';
import BackArrow from '../../components/BackArrow';
import {colors} from '../../services/utilities/colors';
import {sizes} from '../../services/index.js';
import Button from '../../components/Button/index.js';

export default function BookingProcess({navigation, route}) {
  const {selectedIndices} = route.params;
  console.log('booking wala param', selectedIndices);
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.allignment}>
            <View style={styles.arrowTop}>
              <BackArrow onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.headerText}>Book Appointment</Text>
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
              {dateData.map((item, index) => (
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
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.bookContainer}>
          <ScrollView>
            <View style={styles.flexRow}>
              <Text style={styles.textBlack}>Haircuts</Text>
              <View style={styles.directionRow}>
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
              </View>
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
                  <Text style={styles.barberName}>RedBox Barber</Text>
                  <Text style={styles.time}>02:00-02:45</Text>
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
            <TouchableOpacity style={styles.textContainer}>
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
      </View>
    </SafeAreaView>
  );
}
