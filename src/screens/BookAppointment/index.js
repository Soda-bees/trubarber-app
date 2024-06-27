import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';

export default function BookAppointment({navigation, route}) {
  const barbar = route?.params?.item;
  // console.log('param wala data h yeh', formatToJSON(barbar));
  const [services, setServices] = useState([]);

  const [rating, setRatings] = useState([
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    },
  ]);

  const [tab, setTabs] = useState('About');

  const handleGoback = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setServices(barbar?.services);
  }, [barbar]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          imageStyle={styles.headerImage}
          source={{uri: barbar.profile}}
          // style={}
        >
          <View style={styles.headerContainer}>
            <View style={styles.arrowTop}>
              <BackArrow light={true} onPress={handleGoback} />
            </View>
            <TouchableOpacity style={styles.openButtonborder}>
              <ImageBackground
                style={styles.openBg}
                source={images.openBg}
                resizeMode="cover">
                <Text style={styles.openButton}>OPEN</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.centerContent}>
            <View style={styles.barberDetailscontainer}>
              <View style={styles.alignedDetails}>
                <Text style={styles.barberName}>{barbar?.name}</Text>
                <View style={styles.row}>
                  <Image
                    source={images.redLocation}
                    resizeMode="contain"
                    style={styles.redLocation}
                  />
                  <Text style={styles.barberLocation}>
                    Royal Ln. Mesa, New Jersey
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.containBookmark}>
                <Image
                  source={images.Bookmark}
                  resizeMode="contain"
                  style={styles.bookmark}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.todoButtonscontainer}>
          <View style={styles.call}>
            <TouchableOpacity style={styles.btnColor}>
              <Image
                style={styles.direction}
                source={images.direction}
                resizeMode="contain"
              />
              <Text style={styles.btnText}>Direction</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.call}>
            <TouchableOpacity style={styles.btnColor}>
              <Image
                style={styles.direction}
                source={images.redCall}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Call</Text>
          </View> */}
          <View>
            <TouchableOpacity style={styles.btnColor}>
              <Image
                style={styles.direction}
                source={images.Send}
                resizeMode="contain"
              />
              <Text style={styles.btnText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setTabs('About')}>
            <View style={tab === 'About' ? styles.borderBottom : null}>
              <Text style={styles.tabs}>About</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabs('Services')}>
            <View style={tab === 'Services' ? styles.borderBottom : null}>
              <Text style={styles.tabs}>Services</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabs('Reviews')}>
            <View style={tab === 'Reviews' ? styles.borderBottom : null}>
              <Text style={styles.tabs}>Reviews</Text>
            </View>
          </TouchableOpacity>
        </View>
        {tab === 'About' ? (
          <View>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.aboutContent}>{barbar?.description}</Text>
            </ScrollView>
            <View style={styles.btn}>
              <Button
                title={'Book Appointment'}
                onPress={() => navigation.navigate('BookingProcess')}
              />
            </View>
          </View>
        ) : tab === 'Services' ? (
          <ScrollView>
            {services?.length > 0 &&
              services?.map((item, index) => (
                <View key={index}>
                  <View style={styles.servicesContainer}>
                    <View style={styles.serviceImagecontainer}>
                      <Image
                        source={{uri:item?.icon}}
                        style={styles.serviceImageresize}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.flexCol}>
                      <Text style={styles.title}>{item?.name}</Text>
                      <View style={styles.descriptionExtended}>
                        <Text style={styles.description} numberOfLines={2}>
                          {item.description}
                        </Text>
                        {/* <Text style={styles.serviceTime}>2h</Text> */}
                      </View>
                    </View>
                    <View style={styles.endContainer}>
                      <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() => navigation.navigate('ServiceDetails', {item})}>
                        <Text style={styles.bookWhite}>Book</Text>
                      </TouchableOpacity>
                      {/* <Text style={styles.title}>{item.Price}</Text> */}
                    </View>
                  </View>
                </View>
              ))}
            <View
              style={{
                paddingBottom:
                  Platform.OS == 'android'
                    ? sizes.screenHeight * 0.04
                    : sizes.screenHeight * 0.09,
              }}></View>
          </ScrollView>
        ) : tab === 'Reviews' ? (
          <View style={styles.reviewContainer}>
            <ScrollView
              style={{
                marginTop: sizes.screenHeight * 0.014,
                paddingBottom: sizes.screenHeight * 0.162,
              }}>
              <View
                style={{
                  marginBottom: sizes.screenHeight * 0.02,
                  alignItems: 'center',
                }}>
                <Text style={styles.starNumber}>4.8</Text>
                <StarRatingDisplay
                  rating={4}
                  color={colors.gold}
                  emptyColor={colors.emptyStar}
                  starSize={20}
                  starStyle={styles.startContainer}
                />
                <Text
                  style={{
                    color: colors.grayText,
                    marginTop: sizes.screenHeight * 0.013,
                  }}>
                  783 Reviews
                </Text>
              </View>
              {rating.map((item, index) => (
                <View key={index} style={styles.ratingContainer}>
                  <View style={styles.ratingData}>
                    <View style={styles.rowAndmargin}>
                      <Image
                        source={item.profilePic}
                        style={styles.profilePic}
                      />
                      <View style={styles.alignItems}>
                        <Text style={styles.usernameAllignment}>
                          {item.username}
                        </Text>
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                    </View>
                    <View>
                      <StarRatingDisplay
                        rating={5}
                        color={colors.gold}
                        starSize={20}
                        starStyle={styles.startContainer}
                        // style={styles.startContainer}
                      />
                    </View>
                  </View>
                  <Text style={styles.descriptionContainer}>
                    {item.description}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  paddingBottom:
                    Platform.OS == 'android'
                      ? sizes.screenHeight * 0.71
                      : sizes.screenHeight * 0.73,
                }}></View>
            </ScrollView>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
