import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Backarrow from '../../components/BackArrow/index.js';
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function Catalogue({navigation}) {
  const [btnActive, setactive] = useState('barber');

  const [barberData, setBarberdata] = useState([
    {
      image: images.barberHat,
      name: 'Alex WILLIAMS',
      location: '2.5km',
    },
    {
      image: images.barberUsingdry,
      name: 'Alex WILLIAMS',
      location: '2.5km',
    },
    {
      image: images.barberCutting,
      name: 'Alex WILLIAMS',
      location: '2.5km',
    },
    {
      image: images.barberHat,
      name: 'Alex WILLIAMS',
      location: '2.5km',
    },
    {
      image: images.barberUsingdry,
      name: 'Alex WILLIAMS',
      location: '2.5km',
    },
    {
      image: images.barberCutting,
      name: 'Alex WILLIAMS',
      location: '2.5km',
    },
    {
      image: images.barberHat,
      name: 'Alex WILLIAMS',
      location: '2.5km',
    },
  ]);
  const [servicesData, setserviceData] = useState([
    {
      serviceImage: images.hairCut,
      serviceText: 'Haircuts',
    },
    {
      serviceImage: images.hairDresserchair,
      serviceText: 'Makeup',
    },
    {
      serviceImage: images.HDblush,
      serviceText: 'Manicure',
    },
    {
      serviceImage: images.HDmanicure,
      serviceText: 'Massage',
    },
    {
      serviceImage: images.beardTrim,
      serviceText: 'Beard',
    },
    {
      serviceImage: images.hairCut,
      serviceText: 'Makeup',
    },
 
  ]);

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
            <View style={styles.contentMargin}>
              {barberData.map((item, index) => (
                <ImageBackground
                  key={index}
                  source={item.image}
                  imageStyle={styles.containerImage}
                >
                  <View style={styles.row}>
                    <Text style={styles.textWhite}>5.0</Text>
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
                        <Text style={styles.textDarkerblack}>{item.name}</Text>
                        <View style={styles.locationContainer}>
                          <Image
                            source={images.Location}
                            resizeMode="contain"
                            style={styles.locationImg}
                          />
                          <Text style={styles.textBlack}>{item.location}</Text>
                        </View>
                        <TouchableOpacity style={styles.bookBtn} onPress={()=>navigation.navigate("BookAppointment")}>
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
              ))}
            </View>
          </ScrollView>
        ) : btnActive === 'services' ? (
          <ScrollView>
            <View style={styles.services}>
              {servicesData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceImagecontainer} 
                  onPress={()=>navigation.navigate("HaircutServices")}
                  >
                  <Image
                    source={item.serviceImage}
                    style={styles.serviceImageresize}
                    resizeMode="contain"
                  />
                  <Text style={styles.serviceTexts}>{item.serviceText}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
