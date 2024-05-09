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
import React, {useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';

export default function AppoinmentBarber({navigation}) {
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );
  const [clientName, setClientName] = useState('John D.');
  const [clientDate, setClientDate] = useState('Mon, Aug 12');
  const [clientTime, setClientTime] = useState('1 PM');
  const [service, setService] = useState('Haircut');
  const [style, setStyle] = useState('Buzzcut');
  const [modalVisible, setModalVisible] = useState(true);
  const [modalServiceName, setModalServiceName] = useState('Beard Trim');
  const [modalStatus, setModalStatus] = useState('Pending');
  const [modalServiceDate, setModalServiceDate] = useState('20 Jan , 2024 ');
  const [modalServiceTime, setModalServiceTime] = useState('1:00 PM - 1:45PM');
  const [modalClientName, setModalClientName] = useState('John Doe');

  const formatDate = date => {
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    return `${day} ${month}`;
  };

  const currentDate = new Date();

  const [date] = useState(new Date());
  const [appointmentTimeline] = useState([
    {
      clientName: 'Sam',
      service: 'Haircut & Beard',
      startDate: moment().startOf('day').add(10, 'hours').toDate(),
      endDate: moment().startOf('day').add(11, 'hours').toDate(),
      duration: '10 AM - 11 AM',
    },
    {
      clientName: 'John Doe',
      service: 'Haircut',
      startDate: moment().startOf('day').add(11, 'hours').toDate(),
      endDate: moment().startOf('day').add(12, 'hours').toDate(),
      duration: '11 AM - 12 PM',
    },
    {
      clientName: 'Eil King',
      service: 'Haircut & Beard',
      startDate: moment().startOf('day').add(12, 'hours').toDate(),
      endDate: moment().startOf('day').add(13, 'hours').toDate(),
      duration: '12 PM - 1 PM',
    },
    {
      clientName: 'Omron Samadi',
      service: 'Haircut',
      startDate: moment().startOf('day').add(13, 'hours').toDate(),
      endDate: moment().startOf('day').add(14, 'hours').toDate(),
      duration: '1 PM - 2 PM',
    },
    {
      clientName: 'Arya',
      service: 'Haircut & Beard',
      startDate: moment().startOf('day').add(14, 'hours').toDate(),
      endDate: moment().startOf('day').add(15, 'hours').toDate(),
      duration: '2 PM - 3 PM',
    },
    {
      clientName: 'Joseph De',
      service: 'Haircut & Beard',
      startDate: moment().startOf('day').add(15, 'hours').toDate(),
      endDate: moment().startOf('day').add(16, 'hours').toDate(),
      duration: '3 PM - 4 PM',
    },
    {
      clientName: 'Osman Semedo',
      service: 'Haircut',
      startDate: moment().startOf('day').add(16, 'hours').toDate(),
      endDate: moment().startOf('day').add(17, 'hours').toDate(),
      duration: '4 PM - 5 PM',
    },
    {
      clientName: 'Brooklyn Simons',
      service: 'Haircut',
      startDate: moment().startOf('day').add(17, 'hours').toDate(),
      endDate: moment().startOf('day').add(18, 'hours').toDate(),
      duration: '5 PM - 6 PM',
    },
  ]);
  const RenderItem = ({style, item}) => {
    return (
      <View
        style={{
          ...style,
          height: 'auto',
          left: sizes.screenWidth * 0.15,
          width: 'auto',
          marginTop:sizes.screenHeight* 0.002
}}>
        <Text style={styles.textBlack}>{item.clientName}</Text>
        <Text style={styles.textGray}>{item.service}</Text>
        <Text style={styles.textGray}>{item.duration}</Text>
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
              <TouchableOpacity
                style={styles.locationRow}
                onPress={() => navigation.navigate('WholeMap')}>
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
        <ScrollView style={styles.scrollContianer}>
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
                <View style={styles.optionRow}>
                  <Text style={styles.clientDetailTxtBlack}>
                    {formatDate(currentDate)}
                  </Text>
                  <Image
                    source={images.dropDownBlack}
                    style={styles.arrowImg}
                  />
                </View>
              </View>
              
              <Timetable
                items={appointmentTimeline}
                renderItem={props => <RenderItem {...props} />}
                date={date}
                is12Hour
               
              />
            </View>
          </View>
        </ScrollView>
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
