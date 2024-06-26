import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { styles } from './style';
import images from '../../services/utilities/images';
import { colors } from '../../services';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/userData';
import formatToJSON from '../../services/config/FormatToJson';

export default function BaberCatalogue({ navigation }) {
  const userData = useSelector(selectUserData)
  console.log(formatToJSON(userData));
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );
  const [servicesData, setserviceData] = useState([]);


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
        <View style={styles.containerBody}>
          <Text style={styles.headingSchedule}>Services</Text>
          <Text style={styles.txtBelowSchedule}>Your Service Offerings</Text>
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.serviceContainer}>
                {userData?.services?.map((item, index) => (
                  <TouchableOpacity
                    style={styles.serviceBox}
                    key={index}
                    onPress={() => navigation.navigate('BarberSevriceDetails', { serviceNameHeading: item.serviceName, serviceName: item.serviceName })}
                  >
                    <Image
                      source={{ uri: item.icon }}
                      style={styles.serviceImage}
                    />
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <Text style={styles.serviceStyle}>
                      {`${item?.options?.length} Styles`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          {/* SetUpServices */}
          <TouchableOpacity onPress={() => navigation.navigate('AddServices')}>
            <Image style={styles.addService} source={images.addBtn} />
          </TouchableOpacity>
        </View>
        <View style={Platform.OS == 'ios' && styles.paddingBtm} />
      </View>
    </SafeAreaView>
  );
}
