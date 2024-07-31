import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style';
import {colors, sizes} from '../../services';
import MapView, {Marker} from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import Modal from 'react-native-modal';
import BackArrow from '../../components/BackArrow';
import {useSelector} from 'react-redux';
import {selectlocation} from '../../store/location';
import {selectbarber} from '../../store/barber';
import formatToJSON from '../../services/config/FormatToJson';
import { selectUserData } from '../../store/userData';

export default function WholeMap({navigation}) {
  const barberData = useSelector(selectbarber);
  const userData = useSelector(selectUserData)
  // console.log(formatToJSON(barberData));
  const [selectedBarber, setSelectedBarber] = useState('');
  const location = useSelector(selectlocation) || userData?.location
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );
  const [openModal, setModalopen] = useState(false);

  const handleGoback = () => {
    navigation.goBack();
  };

  const handleSelectBarber = item => {
    setSelectedBarber(item);
    setModalopen(true);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={[styles.backgroundColor, {zIndex: 1}]}>
          <ImageBackground
            source={images.transparentBg}
            resizeMode="contain"
            style={styles.transparentBg}>
            <View style={styles.topIconRow}>
              <View>
                <BackArrow onPress={handleGoback} />
              </View>
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
            {/* <View style={styles.inputContainer}>
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
            </View> */}
          </ImageBackground>
        </View>
        <View style={[styles.mapContainer, {zIndex: 0}]}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: location?.latitude,
              longitude: location?.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            followsUserLocation={true}
            showsMyLocationButton={true}
            showsUserLocation
            showsCompass={true}>
            {barberData?.map((item, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item?.location?.latitude,
                    longitude: item?.location?.longitude,
                  }}
                  onPress={() => handleSelectBarber(item)}>
                  <ImageBackground
                    source={images.locationIcon}
                    style={styles.locationImgIcon}
                    resizeMode="contain">
                    <Image
                      source={{uri: item.profile}}
                      style={styles.markerIngStyle}
                    />
                  </ImageBackground>
                </Marker>
              );
            })}
          </MapView>
        </View>
      </View>
      <Modal
        isVisible={openModal}
        onBackdropPress={() => setModalopen(false)}
        backdropOpacity={0.5}
        style={styles.modalPosition}>
        {selectedBarber && (
          <ImageBackground
            source={{uri: selectedBarber.profile}}
            imageStyle={styles.containerImage}
            // style={}
          >
            <View style={styles.spaceBetween}>
              <View style={styles.row}>
                <Text style={styles.textWhite}>5.0</Text>
                <StarRating
                  maxStars={1}
                  starSize={12}
                  color={colors.gold}
                  rating={1}
                />
              </View>
              <TouchableOpacity onPress={() => setModalopen(!openModal)}>
                <Image
                  source={images.whiteCrossexit}
                  resizeMode="contain"
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.marginCardtop}>
              <ImageBackground
                source={images.bluredImg}
                imageStyle={styles.bluredImg}>
                <View style={styles.appointmentContainer}>
                  <Text style={styles.textDarkerblack}>
                    {selectedBarber.name}
                  </Text>
                  <View style={styles.locationContainer}>
                    <Image
                      source={images.Location}
                      resizeMode="contain"
                      style={styles.locationImg}
                    />
                    <Text style={styles.textBlack}>
                      {calculateDistance(
                        location.latitude,
                        location.longitude,
                        selectedBarber?.location.latitude,
                        selectedBarber?.location.longitude,
                      ).toFixed(2)}{' '}
                      km
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() => {
                      setModalopen(false);
                      navigation.navigate('BookAppointment', {
                        item: selectedBarber,
                      });
                    }}>
                    <Text style={styles.btnText}>Book Appointment</Text>
                    <Image
                      source={images.arrowIcon}
                      resizeMode="contain"
                      style={styles.arrowStyle}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </ImageBackground>
        )}
      </Modal>
    </SafeAreaView>
  );
}
