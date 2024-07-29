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
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import {useSelector} from 'react-redux';
import {selectbarber} from '../../store/barber/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import {selectlocation} from '../../store/location/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function HaircutServices({navigation, route}) {
  const {name} = route?.params;
  const barbers = useSelector(selectbarber);
  const location = useSelector(selectlocation);
  const [barberData, setBarberdata] = useState([]);
  useEffect(() => {
    getSpecificBarberBarber();
  }, [name]);

  const getSpecificBarberBarber = () => {
    const data = barbers?.filter(barber => {
      return barber.services.some(service => service.name === name);
    });

    setBarberdata(data);
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
            <View style={styles.row}>
              <BackArrow onPress={() => navigation.goBack()} />
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}> {`${name} Services`}</Text>
              </View>
            </View>
          </ImageBackground>
          <ScrollView>
            <View
              style={
                Platform.OS == 'android'
                  ? styles.contentMargin
                  : styles.contentMarginIOS
              }>
              {barberData?.length > 0 &&
                barberData?.map((item, index) => {
                  const distance = calculateDistance(
                    location.latitude,
                    location.longitude,
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
                      }
                      style={styles.containerImage}
                      >
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
                        <ImageBackground
                          source={images.bluredImg}
                          imageStyle={styles.bluredImg}
                          style={styles.bluredImg}>
                          <View style={styles.appointmentContainer}>
                            <Text style={styles.textDarkerblack}>
                              {item.name}
                            </Text>
                            <View style={styles.locationContainer}>
                              <Image
                                source={images.Location}
                                resizeMode="contain"
                                style={styles.locationImg}
                              />
                              <Text style={styles.textBlack}>
                                {distance !== null && (
                                  <Text style={styles.textBlack}>
                                    {`${distance.toFixed(2)} km`}
                                  </Text>
                                )}
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={styles.bookBtn}
                              onPress={() =>
                                navigation.navigate('BookAppointment', {item , tabName:'About'})
                              }>
                              <Text style={styles.btnText}>
                                Book Appointment
                              </Text>
                              <Image
                                source={images.arrowIcon}
                                resizeMode="contain"
                                style={styles.arrowStyle}
                              />
                            </TouchableOpacity>
                          </View>
                        </ImageBackground>
                    </ImageBackground>
                    //   <ImageBackground
                    //   key={index}
                    //   source={{uri: item.profile}}
                    //   imageStyle={styles.containerImage}
                    //   // style={}
                    // >
                    //   <View style={styles.row}>
                    //     <Text style={styles.textWhite}>5.0</Text>
                    //     <StarRating
                    //       maxStars={1}
                    //       starSize={12}
                    //       color={colors.gold}
                    //       rating={1}
                    //     />
                    //   </View>
                    //   <View style={styles.marginCardtop}>
                    //     <ImageBackground
                    //       source={images.bluredImg}
                    //       imageStyle={styles.bluredImg}>
                    //       <View style={styles.appointmentContainer}>
                    //         <Text style={styles.textDarkerblack}>
                    //           {item.name}
                    //         </Text>
                    //         <View style={styles.locationContainer}>
                    //           <Image
                    //             source={images.Location}
                    //             resizeMode="contain"
                    //             style={styles.locationImg}
                    //           />
                    //           <Text style={styles.textBlack}>
                    //             {/* {`Lat: ${item.location.latitude}, Long: ${item.location.longitude}`} */}
                    //             {distance !== null && (
                    //               <Text style={styles.textBlack}>
                    //                 {`Distance: ${distance.toFixed(2)} km`}
                    //               </Text>
                    //             )}
                    //           </Text>
                    //         </View>
                    //         <TouchableOpacity
                    //           style={styles.bookBtn}
                    //           onPress={() =>
                    //             navigation.navigate('BookAppointment')
                    //           }>
                    //           <Text style={styles.btnText}>
                    //             Book Appointment
                    //           </Text>
                    //           <Image
                    //             source={images.arrowIcon}
                    //             resizeMode="contain"
                    //             style={styles.arrowStyle}
                    //           />
                    //         </TouchableOpacity>
                    //       </View>
                    //     </ImageBackground>
                    //   </View>
                    // </ImageBackground>
                  );
                })}
            </View>
            <View style={{paddingBottom: sizes.screenHeight * 0.05}}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
