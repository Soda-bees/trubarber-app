import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors} from '../../services';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/userData';
import formatToJSON from '../../services/config/FormatToJson';
import ChatConponent from '../../components/ChatComponent';
import NotificationComponent from '../../components/NotificationComponent';
import BarberLocation from '../../components/BarberLocationBox';
import BarberServiceDetails from '../BarberServiceDetails';
import Toast from 'react-native-toast-message';
import {ErrorShow} from '../../components/Error';
import {useFocusEffect} from '@react-navigation/native';

export default function BaberCatalogue({navigation}) {
  const userData = useSelector(selectUserData);
  const [currentLocation, setCurrentLocation] = useState(
    'Rachael McPhail Street...',
  );
  const [servicesData, setserviceData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [showToast, setShowToast] = useState('');

  const filteredServices = search
    ? userData?.services?.filter(item => {
        const searchLower = search.toLowerCase();
        const nameMatches = item.name.toLowerCase().includes(searchLower);
        return nameMatches;
      })
    : userData?.services;

  const handleSetServices = item => {
    if (selectedService?._id === item?._id) {
      setSelectedService(null);
    } else {
      setSelectedService(item);
    }
  };

  useEffect(() => {
    shoDeleteResponseMessage();
  }, [showToast]);

  const shoDeleteResponseMessage = async () => {
    if (showToast?.type === 'success') {
      setSelectedService(null);
    }
    if (showToast !== '') {
      ErrorShow(showToast?.type, showToast?.text, showToast?.message, onHide);
    }
  };

  const onHide = async () => {
    console.log('on hoide');
    setShowToast('');
  };

  useFocusEffect(
    useCallback(() => {
      if (selectedService) {
        const service = filteredServices?.find(
          service => service?._id === selectedService?._id,
        );
        setSelectedService(service);
      }
    }, [userData]),
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backgroundColor}>
          <ImageBackground
            source={images.transparentBg}
            resizeMode="contain"
            style={styles.transparentBg}>
            <View style={styles.topIconRow}>
              <BarberLocation />
              <View style={styles.otherIconRow}>
                <NotificationComponent />
                <ChatConponent />
              </View>
            </View>
          </ImageBackground>
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
            onChangeText={text => {
              if (selectedService) {
                setSelectedService('');
              }
              setSearch(text);
            }}
          />
        </View>
        <View style={styles.containerBody}>
          <View style={styles.textContainer}>
            <Text style={styles.headingSchedule}>Services</Text>
            <Text style={styles.txtBelowSchedule}>Your Service Offerings</Text>
            {userData?.services?.length < 2 && (
              <TouchableOpacity
                style={styles.plusBtn}
                onPress={() =>
                  navigation.navigate('SetUpServices', {
                    previousServices: userData?.services,
                  })
                }>
                <Image style={styles.addService} source={images.addBtn} />
              </TouchableOpacity>
            )}
          </View>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.serviceContainer}>
                {filteredServices?.map((item, index) => (
                  <TouchableOpacity
                    style={
                      selectedService?._id === item?._id
                        ? styles.serviceBoxSelected
                        : styles.serviceBox
                    }
                    key={index}
                    // onPress={() => navigation.navigate('BarberSevriceDetails', { item })}
                    onPress={() => handleSetServices(item)}>
                    <Image
                      source={{uri: item.icon}}
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
            {selectedService && (
              <BarberServiceDetails
                item={selectedService}
                showToast={showToast}
                setShowToast={setShowToast}
              />
            )}
          </ScrollView>
          {/* {
            userData?.services?.length < 2 &&
            <TouchableOpacity style={styles.plusBtn} onPress={() => navigation.navigate('SetUpServices', { previousServices: userData?.services })}>
              <Image style={styles.addService} source={images.addBtn} />
            </TouchableOpacity>
          } */}
        </View>
        <Toast />
        <View style={Platform.OS == 'ios' && styles.paddingBtm} />
      </View>
    </SafeAreaView>
  );
}
