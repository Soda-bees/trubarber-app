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
import Button from '../../components/Button';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function HaircutServices({navigation}) {
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backgroundColor}>
          <ImageBackground
            source={images.transparentBg}
            resizeMode="contain"
            style={styles.transparentBg}>
            <View style={styles.row}>
              <BackArrow onPress={() => navigation.goBack()}/>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Haircuts Services</Text>
              </View>
            </View>
          </ImageBackground>
          <ScrollView>
            <View style={styles.contentMargin}>
              {barberData.map((item, index) => (
                <ImageBackground
                  key={index}
                  source={item.image}
                  imageStyle={styles.containerImage}
                  // style={}
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
                        <Text style={styles.textDarkerblack}>
                          {item.name}
                        </Text>
                        <View style={styles.locationContainer}>
                          <Image
                            source={images.Location}
                            resizeMode="contain"
                            style={styles.locationImg}
                          />
                          <Text style={styles.textBlack}>{item.location}</Text>
                        </View>
                        <TouchableOpacity style={styles.bookBtn} onPress={()=> navigation.navigate("BookAppointment")}> 
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
            <View style={{paddingBottom: sizes.screenHeight * 0.24}}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
