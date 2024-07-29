import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Backarrow from '../../components/BackArrow/index.js';
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import {useSelector} from 'react-redux';
import {selectbarber} from '../../store/barber/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import {selectlocation} from '../../store/location/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function Catalogue({navigation}) {
  const barbers = useSelector(selectbarber);
  // console.log('all barbers', formatToJSON(barbers));
  const [btnActive, setactive] = useState('barber');
  const location = useSelector(selectlocation);
  const [search, setSearch] = useState('');
  const [barberData, setBarberdata] = useState([]);
  const [servicesData, setserviceData] = useState([]);

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
  const extractServiceData = () => {
    let servicesData = [];

    barbers?.forEach(barber => {
      if (barber.services) {
        barber.services.forEach(service => {
          const existingService = servicesData.find(
            s => s.name === service.name,
          );

          if (!existingService) {
            servicesData.push({
              name: service.name,
              icon: service.icon,
            });
          }
        });
      }
    });
    return servicesData;
  };

  useEffect(() => {
    setserviceData(extractServiceData());
  }, [barbers]);

  // const filteredBarbers = search
  //   ? (() => {
  //       const searchLower = search.toLowerCase();
  //       const filtered = barbers.filter(item =>
  //         item.name.toLowerCase().includes(searchLower),
  //       );
  //       return filtered.length > 0 ? filtered : null;
  //     })()
  //   : null;

  const filteredBarbers = search
    ? barbers.filter(item => {
        const searchLower = search.toLowerCase();
        const nameMatches = item.name.toLowerCase().includes(searchLower);
        return nameMatches;
      })
    : barbers;

  const filteredServices = search
    ? servicesData.filter(item => {
        const searchLower = search.toLowerCase();
        const nameMatches = item.name.toLowerCase().includes(searchLower);
        return nameMatches;
      })
    : servicesData;

  const calculateAverageRating = reviews => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + parseFloat(review.rating),
        0,
      );
      return totalRating / reviews.length;
    } else {
      return 0;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backgroundColor}>
          <ImageBackground
            source={images.transparentBg}
            resizeMode="contain"
            style={styles.transparentBg}>
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
                onChangeText={text => {
                  setSearch(text);
                }}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={btnActive == 'barber' ? styles.active : styles.inActive}
            onPress={() => setactive('barber')}>
            <Text
              style={
                btnActive == 'barber'
                  ? styles.textColorwhite
                  : styles.toggleTextsize
              }>
              Barber
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={btnActive == 'services' ? styles.active : styles.inActive}
            onPress={() => setactive('services')}>
            <Text
              style={
                btnActive == 'services'
                  ? styles.textColorwhite
                  : styles.toggleTextsize
              }>
              Services
            </Text>
          </TouchableOpacity>
        </View>

        {btnActive === 'barber' ? (
          <ScrollView style={styles.scrollContainer}>
            <View
              style={
                Platform.OS == 'android'
                  ? styles.contentMargin
                  : styles.contentMarginIOS
              }>
              {filteredBarbers?.map((item, index) => {
                const distance = calculateDistance(
                  location?.latitude,
                  location?.longitude,
                  item.location.latitude,
                  item.location.longitude,
                );
                return (
                  <ImageBackground
                    key={index}
                    source={{uri: item?.profile}}
                    imageStyle={
                      Platform.OS == 'android'
                        ? styles.containerImage
                        : styles.containerImageIOS
                    }>
                    <View style={styles.row}>
                      <Text style={styles.textWhite}>
                        {calculateAverageRating(item.reviews)}
                      </Text>
                      <StarRating
                        maxStars={1}
                        starSize={12}
                        color={colors.gold}
                        rating={1}
                      />
                    </View>
                    <View style={styles.marginTop}>
                      <ImageBackground
                        source={images.bluredImg}
                        imageStyle={styles.bluredImg}>
                        <View style={styles.appointmentContainer}>
                          <Text style={styles.textDarkerblack}>
                            {item?.name}
                          </Text>
                          <View style={styles.locationContainer}>
                            <Image
                              source={images.Location}
                              resizeMode="contain"
                              style={styles.locationImg}
                            />
                            {/* <Text style={styles.textBlack}>{item.location}</Text> */}
                            {distance !== null && (
                              <Text style={styles.textBlack}>
                                {`${distance.toFixed(2)} km`}
                              </Text>
                            )}
                          </View>
                          <TouchableOpacity
                            style={styles.bookBtn}
                            onPress={() =>
                              navigation.navigate('BookAppointment', {item , tabName:'About'})
                            }>
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
                );
              })}
            </View>
            <View
              style={{
                paddingBottom:
                  Platform.OS == 'ios' && sizes.screenHeight * 0.08,
              }}
            />
          </ScrollView>
        ) : btnActive === 'services' ? (
          <ScrollView>
            <View style={styles.services}>
              {filteredServices?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.serviceImagecontainer}
                    onPress={() =>
                      navigation.navigate('HaircutServices', {name: item?.name})
                    }>
                    <Image
                      source={{uri: item?.icon}}
                      style={styles.serviceImageresize}
                      resizeMode="contain"
                    />
                    <Text style={styles.serviceTexts}>{item?.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                paddingBottom:
                  Platform.OS == 'ios' && sizes.screenHeight * 0.18,
              }}
            />
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

{
  /* <View style={styles.navMargin}>
  <View style={styles.navSelect}>
    <Image
      source={images.Discovery}
      style={styles.bottonNavimg}
      resizeMode="contain"
    />
    <Text>Explore</Text>
  </View>
  <Image source={images.Discovery} />
  <Image source={images.Discovery} />
  <Image source={images.Discovery} />
</View> */
}
