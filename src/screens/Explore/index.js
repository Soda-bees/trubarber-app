import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style';
import {colors, sizes} from '../../services';
import MapView, {Marker} from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authToken';
import {getAllBarber} from '../../services/config/API';
import {ErrorShow} from '../../components/Error';

export default function Explore({navigation}) {
  const authToken = useSelector(selectAuthToken);
  const [loader, setLoader] = useState(false);
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

  let animation = React.createRef();

  useEffect(() => {
    animation.current?.play();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    handleGetAllBarber();
  }, []);

  const handleGetAllBarber = async () => {
    try {
      setLoader(true);
      const response = await getAllBarber(authToken);
      console.log(response.data);
      console.log(response.status);
      if (response?.status == 200) {
        setLoader(false);
        setBarberdata(response?.data?.barbers);
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      ErrorShow('error', 'Oops', response?.error?.message);
    }
  };

  return (
    <SafeAreaView>
      {loader ? (
        <View style={styles.laoderContainer}>
          <LottieView
            ref={animation}
            source={require('../../assestsAnimation/Flow3.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
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
                    <Image
                      style={styles.iconImage}
                      source={images.redLocation}
                    />
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
                  // 24.816268411931333, 67.04173109688234
                  latitude: 24.816268411931333,
                  longitude: 67.04173109688234,
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
                  {/* {barberData.map((item, index) => (
                   
                  ))} */}
                  {barberData?.map((item, index) => {
                    console.log('barbar k items hain yeh',item.profile);
                    return (
                      <ImageBackground
                        key={index}
                        source={{uri:item.profile}}
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
                                {/* <Text style={styles.textBlack}>
                                  {item.location}
                                </Text> */}
                              </View>
                              <TouchableOpacity
                                style={styles.bookBtn}
                                onPress={() =>
                                  navigation.navigate('BookAppointment')
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
                        </View>
                      </ImageBackground>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
          <View style={Platform.OS == 'ios' && styles.paddingBtm} />
        </View>
      )}
    </SafeAreaView>
  );
}

{
  /* <ImageBackground
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
</View>
</ImageBackground> */
}
