import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import * as Progress from 'react-native-progress';
export default function BarberDashboard({navigation}) {
  const [appointmentDone, setAppointmentDone] = useState('03');
  const [appointmentCancelled, setAppointmentCancelled] = useState('03');
  const [profitAmount, setProfitAmount] = useState('1,760.00');
  const [profitPercent, setProfitPercent] = useState('10%');
  const [lossAmount, setLossAmount] = useState('1,760.00');
  const [lossPercent, setLossPercent] = useState('10%');

  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );

  const [lastServices, setLastServices] = useState([
    {
      serviceName: 'Haircut',
      price: '25.0',
      date: 'Oct 30',
      time: '10:00 AM',
      status: 'Done',
    },
    {
      serviceName: 'Haircut',
      price: '25.0',
      date: 'Oct 30',
      time: '10:00 AM',
      status: 'Done',
    },
    {
      serviceName: 'Beard',
      price: '25.0',
      date: 'Oct 30',
      time: '10:00 AM',
      status: 'Cancelled',
    },
    {
      serviceName: 'Beard',
      price: '25.0',
      date: 'Oct 30',
      time: '10:00 AM',
      status: 'Cancelled',
    },
  ]);

  const [totalRating, setTotalRating] = useState([
    {
      star: '5',
      progress: '0.64',
      percentage: '64',
    },
    {
      star: '4',
      progress: '0.24',
      percentage: '24',
    },
    {
      star: '3',
      progress: '0.1',
      percentage: '10',
    },
    {
      star: '2',
      progress: '0.02',
      percentage: '2',
    },
    {
      star: '1',
      progress: '0.0',
      percentage: '0',
    },
  ]);
  const [rating, setRatings] = useState([
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '5',
    },
    {
      profilePic: images.profilePic,
      username: 'Kita Chihoko',
      time: '02 February 2023',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      rating: '4',
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
                <TouchableOpacity style={styles.notificationContainer}
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
        <ScrollView style={styles.ScrollViewContainer}>
          <View style={styles.containerBody}>
            <View style={styles.detailRow}>
              <View style={styles.detailContainer}>
                <Image style={styles.boxImg} source={images.appointment} />
                <View>
                  <Text style={styles.appoitmentNumberTxt}>
                    {appointmentDone}
                  </Text>
                  <Text style={styles.detailTxt}>Done Appointments</Text>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <Image style={styles.boxImg} source={images.appointment} />
                <View>
                  <Text style={styles.appoitmentNumberTxt}>
                    {appointmentCancelled}
                  </Text>
                  <Text style={styles.detailTxt}>Cancelled Appointments</Text>
                </View>
              </View>
            </View>
            <Text style={styles.headingSummary}>Last Services</Text>
            <View style={styles.lastServicesContainer}>
              <View style={styles.rowThree}>
                <Text style={styles.serviceHeading}>Service</Text>
                <Text style={styles.priceHeading}>Price</Text>
                <Text style={styles.dateHeading}>Date & Time</Text>
                <Text style={styles.statusHeading}>Status</Text>
              </View>
              <ScrollView>
                {lastServices.map((item, index) => (
                  <View key={index} style={styles.serviceDetailRow}>
                    <Text style={styles.serviceHeading}>
                      {item.serviceName}
                    </Text>
                    <Text style={styles.priceHeadingTwo}>${item.price}</Text>
                    <View>
                      <Text style={styles.dateHeadingTwo}>{item.date}</Text>
                      <Text style={styles.timeHeading}>{item.time}</Text>
                    </View>
                    <Text style={styles.statusHeadingTwo}>{item.status}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.rowFour}>
              <Text style={styles.reviewHeading}>Reviews</Text>
              <TouchableOpacity
                style={styles.viewAllBtn}
                onPress={() => navigation.navigate('Reviews')}>
                <Text style={styles.viewAllText}>View All</Text>
                <Image
                  style={styles.arrowImage}
                  source={images.rightArrowRed}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewInsideContainer}>
                <Text style={styles.ratingNumber}>4.0</Text>
                <StarRatingDisplay
                  rating={4}
                  color={colors.gold}
                  emptyColor={colors.emptyStar}
                  starSize={sizes.screenHeight * 0.025}
                  starStyle={styles.startContainer}
                />
                <Text style={styles.totalReview}>783 Reviews</Text>
              </View>
              <View style={styles.reviewBarContainer}>
                {totalRating.map((item, index) => (
                  <View style={styles.reviewBarRow} key={index}>
                    <Text style={styles.ratingGoldenText}>{item.star}</Text>
                    <Image source={images.star} style={styles.starImage} />
                    <Progress.Bar
                      width={sizes.screenWidth * 0.28}
                      unfilledColor={colors.white}
                      borderColor={colors.white}
                      color={colors.goldText}
                      progress={parseFloat(item.progress)}
                      height={sizes.screenHeight * 0.006}
                    />
                    <Text style={styles.percentGoldenText}>
                      {item.percentage} %
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            {rating.map((item, index) => (
              <View key={index} style={styles.ratingContainer}>
                <View style={styles.ratingData}>
                  <View style={styles.rowAndmargin}>
                    <Image source={item.profilePic} style={styles.profilePic} />
                    <View style={styles.alignItems}>
                      <Text style={styles.usernameAllignment}>
                        {item.username}
                      </Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                  <View>
                    <StarRatingDisplay
                      rating={item.rating}
                      color={colors.gold}
                      starSize={sizes.screenHeight * 0.025}
                      starStyle={styles.startContainer}
                    />
                  </View>
                </View>
                <Text style={styles.descriptionContainer}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
