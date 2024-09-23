import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style';
import images from '../../services/utilities/images';
import { colors, sizes } from '../../services';
import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/userData';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Loader from '../../components/Loader';
import { ErrorShow } from '../../components/Error';
import { selectAuthToken } from '../../store/authToken';
import {
  acceptAppointment,
  updateAppointmentStatus,
} from '../../services/config/API';
import formatToJSON from '../../services/config/FormatToJson';
import Toast from 'react-native-toast-message';
import ChatConponent from '../../components/ChatComponent';
import NotificationComponent from '../../components/NotificationComponent';
import BarberLocation from '../../components/BarberLocationBox';
export default function AppoinmentBarber({ navigation }) {
  const barber = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);

  const [startTime, setStartTime] = useState(new Date());
  const [clientName, setClientName] = useState('');
  const [clientDate, setClientDate] = useState('');
  const [clientTime, setClientTime] = useState('');
  const [service, setService] = useState('');
  const [style, setStyle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalServiceName, setModalServiceName] = useState('Beard Trim');
  const [modalStatus, setModalStatus] = useState('Pending');
  const [modalServiceDate, setModalServiceDate] = useState('20 Jan , 2024 ');
  const [modalServiceTime, setModalServiceTime] = useState('1:00 PM - 1:45PM');
  const [modalClientName, setModalClientName] = useState('John Doe');
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );
  const [modalItem, setModalItem] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [appointmentTimeline2, setAppointmentTimeline2] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [loader, setLoader] = useState(false);
  const [tab, setTab] = useState('schedule');
  // const [acceptLoader, setAcceptLoader] = useState(false);
  // const [rejectLoader, setRejectLoader] = useState(false);

  const roundUpTime = time => {
    const hour = moment(time, 'h:mm A').hour();
    const minute = moment(time, 'h:mm A').minute();
    return minute > 0 ? hour + 1 : hour;
  };

  const setTimesFromDuration = duration => {
    if (!duration) return;

    const [start, end] = duration.split(' - ');

    const startHour = moment(start, 'h:mm A').hour();
    const roundedStartHour =
      moment(start, 'h:mm A').minute() > 0 ? startHour : startHour;

    const endHour = roundUpTime(end);

    setFrom(roundedStartHour);
    setTo(endHour);
  };

  const formatDate = date => {
    if (!date) return '';

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  };

  const getOneHourLater = selected => {
    if (!selected) return '';

    return `${selected} - ${moment(selected, 'h:mm A')
      .add(1, 'hour')
      .format('h:mm A')}`;
  };

  const mapBackendDataToAppointmentTimeline = backendData => {
    if (!backendData) return;

    const transformedData = backendData
      .map(appointment => {
        if (!appointment) return null;

        const startDate = moment(
          `${appointment?.date} ${appointment?.time}`,
          'MM-DD-YYYY h:mm A',
        ).toDate();
        const endDate = moment(startDate).add(1, 'hour').toDate();
        return {
          clientName: appointment?.user?.name || '',
          service:
            appointment?.services
              ?.map(service => service?.serviceName)
              .join(' & ') || '',
          startDate: startDate || new Date(),
          endDate: endDate || new Date(),
          duration: appointment?.time || '',
          status: appointment?.status || '',
          date: appointment?.date || '',
          id: appointment?._id || '',
          time: appointment?.time,
        };
      })
      .filter(item => item !== null);

    setAppointmentTimeline2(transformedData);
  };

  const RenderItem = ({ style, item }) => {
    if (!item) return null;

    return (
      <TouchableOpacity
        style={{
          ...style,
          height: 'auto',
          left: sizes.screenWidth * 0.17,
          width: 'auto',
          marginTop: 6,
        }}
        onPress={() => {
          setModalItem(item);
          setModalVisible(true);
        }}>
        <Text style={styles.textBlack}>{item.clientName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textGray}>{item.service}: </Text>
          <Text style={styles.textGray}> {item.duration}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const formatDateShort = dateString => {
    if (!dateString) return '';

    const parts = dateString.split('-');
    if (parts.length !== 3) return '';

    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;
    const year = parseInt(parts[2], 10);

    const dateObj = new Date(year, month, day);

    const options = { weekday: 'short', month: 'short', day: 'numeric' };

    return dateObj.toLocaleDateString('en-US', options);
  };

  const setNextAppointmentData = () => {
    const currentDate = moment();

    let allAppointments = barber?.appoinment ? [...barber.appoinment] : [];

    let appointments = allAppointments.filter(
      item => item.status !== 'Pending' && item.status !== 'Rejected',
    );

    const sortedAppointments = appointments.sort((a, b) => {
      const aDateTime = moment(
        `${a.date || ''} ${a.time || ''}`,
        'MM-DD-YYYY h:mm A',
      );
      const bDateTime = moment(
        `${b.date || ''} ${b.time || ''}`,
        'MM-DD-YYYY h:mm A',
      );
      return aDateTime - bDateTime;
    });
    // console.log('yhhhhhhh', formatToJSON(barber?.appoinment?.status));

    const nextAppointment = sortedAppointments.find(appointment => {
      const appointmentDateTime = moment(
        `${appointment?.date} ${appointment?.time}`,
        'MM-DD-YYYY h:mm A',
      );
      return appointmentDateTime?.isAfter(currentDate);
    });

    if (nextAppointment) {
      // console.log('yagooo', formatToJSON(nextAppointment.status));
      setClientName(nextAppointment?.user?.name);
      setClientDate(formatDateShort(nextAppointment?.date));
      setClientTime(nextAppointment?.time);
      const allServices = nextAppointment?.services
        ?.map(service => service?.name)
        .join(' & ');
      setStyle(allServices);

      const allStyles = nextAppointment?.services
        ?.map(service => service?.serviceName)
        .join(' & ');
      setService(allStyles);
    } else {
      console.log('No future appointments found.');
    }
  };

  useEffect(() => {
    if (barber?.appoinment) {
      const filteredAppointment = barber?.appoinment.filter(
        item => item.status !== 'Pending' && item.status !== 'Rejected',
      );
      mapBackendDataToAppointmentTimeline(filteredAppointment);
    }
    if (barber?.time) {
      setTimesFromDuration(barber.time);
    }
    setNextAppointmentData();
  }, [barber]);

  const handleSetDate = async (event, selectedDate) => {
    setOpen(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSetDateIOS = async (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const isFutureTime = (startTime, formattedDate) => {
    const dateTime = moment(
      `${formattedDate} ${startTime}`,
      'MM-DD-YYYY h:mm A',
    );
    const currentDateTime = moment();
    return dateTime.isAfter(currentDateTime);
  };

  const handleUpdateAppointmentStatus = async (status, _id) => {
    try {
      if (status === 'Completed') {
        setLoader(true);
        // } else if (status === 'Scheduled') {
        //   setAcceptLoader(true);
        // } else if (status === 'Rejected') {
        //   setRejectLoader(true);
      }
      console.log('function==>', _id);

      const response = await updateAppointmentStatus(authToken, _id, status);
      if (response?.status == 200) {
        setLoader(false);
        // setAcceptLoader(false);
        // setRejectLoader(false);
        // setModalVisible(false);
        ErrorShow('success', 'Congratulation!', response?.data?.message);
      } else {
        setLoader(false);
        // setAcceptLoader(false);
        // setRejectLoader(false);
        // setModalVisible(false);
        ErrorShow('error', 'Error!', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      // setAcceptLoader(false);
      // setRejectLoader(false);
      // console.log(error?.message);
      ErrorShow('error', 'Error!', error?.message);
    }
  };

  const handleChangeTab = async name => {
    setTab(name);
  };

  const requestAppointment = barber?.appoinment?.filter(
    item => item.status === 'Pending',
  );

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
  const renderRequest = ({ item }) => (
    <View style={styles.requestContainer}>
      <View style={styles.requestContainerFirst}>
        <View style={styles.userView}>
          <Image
            style={styles.userImg}
            source={
              item?.user?.profile
                ? { uri: item?.user?.profile }
                : item?.user?.gender === 'male'
                  ? images.male
                  : images.female
            }
          />
          <Text style={styles.userName}>{item?.user?.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.seeDetailsView}
          onPress={() =>
            navigation.navigate('AppointmentDetails', { item, showButtons: true })
          }>
          <Text style={styles.seeDetailsText}>See Details</Text>
          <Image style={styles.rightRedArrow} source={images.rightRedArrow} />
        </TouchableOpacity>
      </View>
      <View style={styles.requestContainerSecond}>
        <View style={styles.serviceContainer}>
          <View style={styles.serviceContainerFirst}>
            <View style={styles.serviceImagecontainer}>
              <Image
                source={{ uri: item?.services[0].serviceIcon }}
                style={styles.serviceIcon}
              />
            </View>
            <View>
              <Text style={styles.textBlackBold}>
                {item?.services[0]?.serviceName}
              </Text>
              <Text style={styles.durationText}>{item?.services[0]?.name}</Text>
            </View>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>
              {`$ ${item?.services[0].price}`}
            </Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View
          style={[
            styles.serviceContainerFirst,
            { marginTop: sizes.screenWidth * 0.035 },
          ]}>
          <View>
            <Text>Total Amount</Text>
            <Text>{`${convertDateFormat(item?.date)} / ${item?.time} `}</Text>
          </View>
          <View style={styles.price}>
            <Text>{`$ ${calculateTotalAmount(item?.services)}`}</Text>
          </View>
        </View>
        <View style={styles.btnView}>
          {/* {acceptLoader ? (
            <Loader appointmentButton={true} color={colors.red} />
          ) : ( */}
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() =>
              handleUpdateAppointmentStatus('Scheduled', item?._id)
            }
          // onPress={() =>
          //   handleAcceptAppointment('Scheduled', item)
          // }
          >
            <Text style={styles.btnText}>Accept</Text>
          </TouchableOpacity>
          {/* )} */}
          {/* {rejectLoader ? (
            <Loader appointmentButton={true} color={colors.placeholdertext} />
          ) : ( */}
          <TouchableOpacity
            style={styles.declineBtn}
            onPress={() => handleUpdateAppointmentStatus('Rejected', item?._id)}
          // onPress={() => setRejectLoader(!rejectLoader)}
          >
            <Text style={styles.btnText}>Reject</Text>
          </TouchableOpacity>
          {/* )} */}
        </View>
      </View>
    </View>
  );

  const handleAcceptAppointment = async (status, appointment) => {
    // try {

    const sameDateAndTimeAppointments = requestAppointment.filter(
      req =>
        req.date === appointment.date &&
        req.time === appointment.time &&
        req._id !== appointment._id,
    );

    const sameAppointmentIds = sameDateAndTimeAppointments?.map(req => req._id);

    console.log(sameAppointmentIds);

    //   console.log(formatToJSON(appointment?._id));
    //   const sameDateAndTimeAppointments = requestAppointment.filter(req =>
    //     req.date === appointment.date &&
    //     req.time === appointment.time &&
    //     req._id !== appointment._id
    //   );
    //   const sameAppointmentIds = sameDateAndTimeAppointments?.map(req => req._id);
    //   const body = {
    //     status: status,
    //     acceptAppointment: appointment?._id,
    //     rejectedAppointment: sameAppointmentIds,
    //     rejectedStatus: 'Rejected'
    //   }
    //   const response = await acceptAppointment(authToken, body)
    //   console.log(response?.data);
    //   if (response?.success) {
    //     ErrorShow('success', 'Congratulation!', response?.data?.message);
    //   } else {
    //     console.log(response?.data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // try {

    //   await handleUpdateAppointmentStatus(status, appointment?._id)
    //   console.log("id=====>", appointment?._id);
    //   const sameDateAndTimeAppointments = requestAppointment.filter(req =>
    //     req.date === appointment.date &&
    //     req.time === appointment.time &&
    //     req._id !== appointment._id
    //   );
    //   const sameAppointmentIds = sameDateAndTimeAppointments?.map(req => req._id);
    //   console.log("ids=====>", sameAppointmentIds);

    //   if (sameAppointmentIds?.length > 0) {
    //     for (const id of sameAppointmentIds) {
    //       await handleUpdateAppointmentStatus('Rejected', id);
    //     }
    //   }

    // const body = {
    //   status: status,
    //   acceptAppointment: appointment?._id,
    //   rejectedAppointment: sameAppointmentIds,
    //   rejectedStatus: 'Rejected'
    // }
    // const response = await acceptAppointment(authToken, body)
    // console.log(response?.data);
    // if (response?.success) {
    //   ErrorShow('success', 'Congratulation!', response?.data?.message);
    // } else {
    //   console.log(response?.data);
    // }

    // } catch (error) {
    //   console.log(error);
    // }
  };

  const renderHour = timeInMinutes => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;

    // Format the time to a readable format (e.g., 12:15 AM/PM)
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes
      } ${hours >= 12 ? 'PM' : 'AM'}`;

    return (
      <View style={styles.hourContainer}>
        <Text style={styles.hourText}>{formattedTime}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backgroundColor}>
          <ImageBackground
            source={images.transparentBg}
            resizeMode="contain"
            style={styles.transparentBg}>
            <View style={styles.topIconRow}>
              <BarberLocation />
              <View style={styles.otherIconRow}>
                <NotificationComponent />
                <ChatConponent />
              </View>
            </View>

          </ImageBackground>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={
              tab === 'schedule' ? styles.selectedTab : styles.unSelectedTab
            }
            onPress={() => handleChangeTab('schedule')}>
            <Text
              style={
                tab === 'schedule'
                  ? styles.selectedText
                  : styles.unSelectedText
              }>
              Schedule
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              tab === 'request' ? styles.selectedTab : styles.unSelectedTab
            }
            onPress={() => handleChangeTab('request')}>
            <Text
              style={
                tab === 'request'
                  ? styles.selectedText
                  : styles.unSelectedText
              }>
              Request
            </Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' && (
          <Modal
            isVisible={open}
            onBackdropPress={() => setOpen(false)}
            onBackButtonPress={() => setOpen(false)}>
            <DateTimePicker
              testID="startTimePicker"
              value={date}
              mode="date"
              is24Hour={false}
              display="spinner"
              // textColor="red"
              positiveButton={{ label: 'Done' }}
              negativeButton={{ label: 'Cancel' }}
              onChange={
                Platform.OS === 'android' ? handleSetDate : handleSetDateIOS
              }
              style={{
                backgroundColor: colors.bluishWhite,
                borderRadius: sizes.screenWidth * 0.03,
                overflow: 'hidden',
              }}
            />
          </Modal>
        )}

        {tab === 'schedule' && (
          <ScrollView
            style={
              Platform.OS == 'android'
                ? styles.scrollContianer
                : styles.scrollContianerIOS
            }
            showsVerticalScrollIndicator={false}>
            <View style={styles.containerBody}>
              <Text style={styles.headingSchedule}>My Schedule</Text>
              <Text style={styles.txtBelowSchedule}>
                Your Schedule Overview: Keep track of upcoming and completed
                appointments here.
              </Text>
              {clientName || clientDate ? (
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
                        <Text style={styles.clientDetailTxtBlackTwo}>
                          Service
                        </Text>
                        {/* <Image
                        source={images.arrowForward}
                        style={styles.forwardArrow}
                      /> */}
                        <Text style={styles.serviceDetailTxt}>{service}</Text>
                      </View>
                      <View style={styles.containerRowThree}>
                        <Text style={styles.clientDetailTxtBlackTwo}>
                          Style
                        </Text>
                        {/* <Image
                        source={images.arrowForward}
                        style={styles.forwardArrow}
                      /> */}
                        <Text style={styles.serviceDetailTxt}>{style}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : null}
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
                  // // timeStyle={colors}
                  // fromHour={from ? from : 0}
                  // toHour={to ? to : 24}
                  fromHour={0}
                  toHour={24}
                  is12Hour
                  hourHeight={sizes.screenHeight * 0.1}
                  style={{
                    time: { color: colors.disabledBg2 },
                    timeContainer: { backgroundColor: 'transparent' },
                    contentContainer: { width: sizes.screenWidth * 0.88 },
                    lines: {
                      width:
                        Platform.OS == 'android'
                          ? sizes.screenWidth * 0.75
                          : sizes.screenWidth * 0.72,
                      marginLeft: sizes.screenWidth * 0.14,
                    },
                    nowLine: {
                      dot: { backgroundColor: colors.red },
                      line: { backgroundColor: colors.red },
                    },
                  }}
                />
              </View>
            </View>
            <View style={Platform.OS == 'ios' && styles.paddingBtm} />
          </ScrollView>
        )}
        {tab === 'request' && (
          <View
            // style={[
            //   { marginTop: sizes.screenWidth * 0.06 },
            //   Platform.OS == 'android' && {
            //     maxHeight: sizes.screenHeight * 0.75,
            //   },
            // ]}>
            style={Platform.OS == 'android' ? styles.requestView : styles.requestViewIOS}> 
            {barber?.appoinment?.filter(item => item.status === 'Pending')
              ?.length > 0 ? (
              <FlatList
                data={requestAppointment}
                renderItem={renderRequest}
                keyExtractor={item => item._id}
                style={Platform.OS == 'ios' && styles.marginBottom}
              // inverted
              />
            ) : (
              <View style={styles.noAppointment}>
                <Image
                  source={images.crossIcon}
                  style={styles.noAppointmentImg}
                />
                <Text style={styles.noAppointmentText}>
                  You currently do not have any appointment requests.
                </Text>
              </View>
            )}
          </View>
        )}

        {Platform.OS === 'android' && open && (
          <DateTimePicker
            testID="startTimePicker"
            value={date}
            mode="date"
            is24Hour={false}
            display="spinner"
            // themeVariant="dark"
            // textColor="red"
            positiveButton={{ label: 'Done' }}
            negativeButton={{ label: 'Cancel' }}
            onChange={handleSetDate}
          />
        )}

        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.3}
          onBackdropPress={() => {
            if (!loader) {
              setModalVisible(false);
            }
          }}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeading}>
              Service Completion Confirmation
            </Text>
            <View style={styles.modalRow}>
              <Text style={styles.modalServiceTxt}>Service</Text>
              <Text style={styles.modalServiceTxtTwo}>
                {modalItem?.service}
              </Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalServiceTxt}>Status</Text>
              <Text style={styles.modalServiceTxtThree}>
                {modalItem?.status}
              </Text>
            </View>
            <View style={styles.modalRowTwo}>
              <Image source={images.clockIconFill} />
              <Text style={styles.modalServiceTxtFour}>
                {modalItem?.date
                  ? `${formatDateShort(modalItem?.date)} - ${modalItem?.duration
                  }`
                  : null}
              </Text>
            </View>
            <View style={styles.modalRow}>
              <Image source={images.profileIcon} />
              <Text style={styles.modalServiceTxtFour}>
                {modalItem?.clientName}
              </Text>
            </View>
            {loader ? (
              <View style={styles.modalBtnView}>
                <Text style={styles.modalBtnText}>Confirm</Text>
                <ActivityIndicator color={colors.white} size={18} />
              </View>
            ) : (
              <TouchableOpacity
                disabled={
                  isFutureTime(modalItem?.time, modalItem?.date) ||
                  modalItem?.status === 'Completed' ||
                  modalItem?.status === 'Cancelled'
                }
                style={
                  isFutureTime(modalItem?.time, modalItem?.date) ||
                    modalItem?.status === 'Completed' ||
                    modalItem?.status === 'Cancelled'
                    ? styles.modalBtnViewDisable
                    : styles.modalBtnView
                }
                onPress={() =>
                  handleUpdateAppointmentStatus('Completed', modalItem?.id)
                }>
                <Text
                  style={
                    isFutureTime(modalItem?.time, modalItem?.date) ||
                      modalItem?.status === 'Completed' ||
                      modalItem?.status === 'Cancelled'
                      ? styles.modalBtnTextDissable
                      : styles.modalBtnText
                  }>
                  Confirm
                </Text>
                <Image
                  source={images.arrowIcon}
                  style={
                    isFutureTime(modalItem?.time, modalItem?.date) ||
                      modalItem?.status === 'Completed' ||
                      modalItem?.status === 'Cancelled'
                      ? styles.modalArrowIconDsiable
                      : styles.modalArrowIcon
                  }
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </Modal>
        <Toast />
      </View>
    </SafeAreaView>
  );
}
