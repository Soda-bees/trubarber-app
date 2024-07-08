import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/userData';
import DatePicker from 'react-native-date-picker';

export default function AppoinmentBarber({navigation}) {
  const barber = useSelector(selectUserData);

  const [clientName, setClientName] = useState('John D.');
  const [clientDate, setClientDate] = useState('Mon, Aug 12');
  const [clientTime, setClientTime] = useState('1 PM');
  const [service, setService] = useState('Haircut');
  const [style, setStyle] = useState('Buzzcut');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalServiceName, setModalServiceName] = useState('Beard Trim');
  const [modalStatus, setModalStatus] = useState('Pending');
  const [modalServiceDate, setModalServiceDate] = useState('20 Jan , 2024 ');
  const [modalServiceTime, setModalServiceTime] = useState('1:00 PM - 1:45PM');
  const [modalClientName, setModalClientName] = useState('John Doe');
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [appointmentTimeline2, setAppointmentTimeline2] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const roundUpTime = time => {
    const hour = moment(time, 'h:mm A').hour();
    const minute = moment(time, 'h:mm A').minute();
    return minute > 0 ? hour + 1 : hour;
  };

  const setTimesFromDuration = duration => {
    const [start, end] = duration.split(' - ');

    const startHour = moment(start, 'h:mm A').hour();
    const roundedStartHour =
      moment(start, 'h:mm A').minute() > 0 ? startHour : startHour;

    const endHour = roundUpTime(end);

    setFrom(roundedStartHour);
    setTo(endHour);
  };

  const formatDate = date => {
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    return `${day} ${month}`;
  };

  const getOneHourLater = selected => {
    return `${selected} - ${moment(selected, 'h:mm A')
      .add(1, 'hour')
      .format('h:mm A')}`;
  };

  const mapBackendDataToAppointmentTimeline = backendData => {
    const transformedData = backendData.map(appointment => {
      const startDate = moment(
        `${appointment.date} ${appointment.time}`,
        'MM-DD-YYYY h:mm A',
      ).toDate();
      const endDate = moment(startDate).add(1, 'hour').toDate();
      return {
        clientName: appointment.user.name,
        service: appointment.services[0].name,
        startDate: startDate,
        endDate: endDate,
        duration: getOneHourLater(appointment.time),
      };
    });
    setAppointmentTimeline2(transformedData);
  };

  const RenderItem = ({style, item}) => {
    return (
      <View
        style={{
          ...style,
          height: 'auto',
          left: sizes.screenWidth * 0.15,
          width: 'auto',
          marginTop: 6,
        }}>
        <Text style={styles.textBlack}>{item.clientName}</Text>
        <Text style={styles.textGray}>{item.service}</Text>
        <Text style={styles.textGray}>{item.duration}</Text>
      </View>
    );
  };

  const formatDateShort = dateString => {
    const parts = dateString.split('-');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;
    const year = parseInt(parts[2], 10);

    const dateObj = new Date(year, month, day);

    const options = {weekday: 'short', month: 'short', day: 'numeric'};

    return dateObj.toLocaleDateString('en-US', options);
  };

  const setNextAppointmentData = () => {
    const currentDate = moment();
    const nextAppointment = barber.appoinment.find(appointment => {
      const appointmentDateTime = moment(
        `${appointment.date} ${appointment.time}`,
        'MM-DD-YYYY h:mm A',
      );
      return appointmentDateTime.isAfter(currentDate);
    });

    console.log(nextAppointment);

    if (nextAppointment) {
      setClientName(nextAppointment.user.name);
      setClientDate(formatDateShort(nextAppointment.date));
      setClientTime(nextAppointment.time);
      setService(nextAppointment.services[0].name);
      setStyle(nextAppointment.services[0].serviceName);
    } else {
      console.log('No future appointments found.');
    }
  };

  useEffect(() => {
    mapBackendDataToAppointmentTimeline(barber.appoinment);
    setTimesFromDuration(barber.time);
    setNextAppointmentData();
    setTimeout(() => {
      console.log(appointmentTimeline2);
    }, 2000);
  }, [barber]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backgroundColor}>
          <ImageBackground
            source={images.transparentBg}
            resizeMode="contain"
            style={styles.transparentBg}>
            <View style={styles.topIconRow}>
              <TouchableOpacity
                style={styles.locationRow}
                // onPress={() => navigation.navigate('WholeMap')}
              >
                <View style={styles.locationContainertop}>
                  <Image style={styles.iconImage} source={images.redLocation} />
                </View>
                <View style={styles.locationDetailColumn}>
                  <Text style={styles.nearbyTxt}>Barber’s Location</Text>
                  <Text style={styles.currentLocationTxt}>
                    {currentLocation}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.otherIconRow}>
                <TouchableOpacity
                  style={styles.notificationContainer}
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}>
                  <Image
                    style={styles.iconImage}
                    source={images.notification}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.notificationContainer}
                  onPress={() => {
                    navigation.navigate('Chats');
                  }}>
                  <Image style={styles.iconImage} source={images.chat} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Image
                source={images.search}
                resizeMode="contain"
                style={styles.search}
              />
              <TextInput
                placeholderTextColor={colors.placeholdertextgray}
                style={styles.input}
                placeholder="Search..."
              />
            </View>
          </ImageBackground>
        </View>
        <ScrollView
          style={styles.scrollContianer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerBody}>
            <Text style={styles.headingSchedule}>My Schedule</Text>
            <Text style={styles.txtBelowSchedule}>
              Your Schedule Overview: Keep track of upcoming and completed
              appointments here.
            </Text>

            <View style={styles.clientView}>
              <Text style={styles.clientHeading}>Next client</Text>
              <View style={styles.clientContianer}>
                <View style={styles.containerRow}>
                  <View style={styles.clientRowBox}>
                    <Image
                      source={images.profileSmall}
                      style={styles.clientBoxImg}
                    />
                    <Text style={styles.clientDetailTxt}>{clientName}</Text>
                  </View>
                  <View style={styles.clientRowBox}>
                    <Image
                      source={images.calendarSmall}
                      style={styles.clientBoxImg}
                    />
                    <Text style={styles.clientDetailTxt}>{clientDate}</Text>
                  </View>
                  <View style={styles.clientRowBox}>
                    <Image
                      source={images.clockSmall}
                      style={styles.clientBoxImg}
                    />
                    <Text style={styles.clientDetailTxt}>{clientTime}</Text>
                  </View>
                </View>
                <View style={styles.containerRowTwo}>
                  <View style={styles.containerRowThree}>
                    <Text style={styles.clientDetailTxtBlackTwo}>Service</Text>
                    <Image
                      source={images.arrowForward}
                      style={styles.forwardArrow}
                    />
                    <Text style={styles.serviceDetailTxt}>{service}</Text>
                  </View>
                  <View style={styles.containerRowThree}>
                    <Text style={styles.clientDetailTxtBlackTwo}>Style</Text>
                    <Image
                      source={images.arrowForward}
                      style={styles.forwardArrow}
                    />
                    <Text style={styles.serviceDetailTxt}>{style}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.calenderView}>
              <View style={styles.containerRow}>
                <Text style={styles.calenderHeaidng}>Calender</Text>
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => {
                    setOpen(true);
                  }}>
                  <Text style={styles.clientDetailTxtBlack}>
                    {formatDate(date)}
                  </Text>
                  <Image source={images.calendar} style={styles.arrowImg} />
                </TouchableOpacity>
              </View>

              <Timetable
                items={appointmentTimeline2}
                renderItem={props => <RenderItem {...props} />}
                date={date}
                timeStyle={{color: colors.black}}
                fromHour={from ? from : 0}
                toHour={to ? to : 24}
                is12Hour
                hourHeight={70}
              />
            </View>
          </View>
          <View style={Platform.OS == 'ios' && styles.paddingBtm} />
        </ScrollView>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalBg}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeading}>
                Service Completion Confirmation
              </Text>
              <View style={styles.modalRow}>
                <Text style={styles.modalServiceTxt}>Service</Text>
                <Text style={styles.modalServiceTxtTwo}>
                  {modalServiceName}
                </Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalServiceTxt}>Status</Text>
                <Text style={styles.modalServiceTxtThree}>{modalStatus}</Text>
              </View>
              <View style={styles.modalRowTwo}>
                <Image source={images.clockIconFill} />
                <Text style={styles.modalServiceTxtFour}>
                  {modalServiceDate} - {modalServiceTime}
                </Text>
              </View>
              <View style={styles.modalRow}>
                <Image source={images.profileIcon} />
                <Text style={styles.modalServiceTxtFour}>
                  {modalClientName}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalBtnView}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.modalBtnText}>Confirm</Text>
                <Image
                  source={images.arrowIcon}
                  style={styles.modalArrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
