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

export default function Explore({navigation}) {
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );

  const [categories, setCategories] = useState([
    {
      name: 'Haircuts',
      image: images.hairCut,
    },
    {
      name: 'Makeup',
      image: images.blush,
    },
    {
      name: 'Manicure',
      image: images.HDmanicure,
    },
    {
      name: 'Massage',
      image: images.hairDresserchair,
    },
    {
      name: 'Beard',
      image: images.beardTrim,
    },
  ]);
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
            <View style={styles.topIconRow}>
              <TouchableOpacity
                style={styles.locationRow}
                onPress={() => navigation.navigate('WholeMap')}>
                <View style={styles.locationContainertop}>
                  <Image style={styles.iconImage} source={images.redLocation} />
                </View>
                <View style={styles.locationDetailColumn}>
                  <Text style={styles.nearbyTxt}>Find barber near</Text>
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
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}></MapView>
          </View>
          <View style={styles.marginTop}>
            <Text style={styles.heading}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryRow}>
                {categories.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.categoryBox}
                    onPress={() => navigation.navigate('ServiceDetails')}>
                    <Image
                      source={item.image}
                      style={styles.imageResize}
                      resizeMode="contain"
                    />
                    <Text style={styles.categoryTxt}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={styles.marginTop}>
            <Text style={styles.heading}>Recommended</Text>
            <ScrollView horizontal>
              <View style={styles.cardRow}>
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
                    <View style={styles.marginCardtop}>
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
                            <Text style={styles.textBlack}>
                              {item.location}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={styles.bookBtn}
                            onPress={() =>
                              navigation.navigate('BookAppointment')
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
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
