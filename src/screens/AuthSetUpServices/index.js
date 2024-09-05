import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';
import formatToJSON from '../../services/config/FormatToJson';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';

export default function AuthSetUpServices({navigation, route}) {
  const userData = route?.params?.userData;
  const previousServices = route?.params?.previousServices;

  const [servicesData, setserviceData] = useState([
    {
      icon: 'https://res.cloudinary.com/doohobw9k/image/upload/v1719221917/TruBarber/Profile/xph66mkuv5k2iluyveyj.png',
      name: 'Haircut',
    },
    {
      icon: 'https://res.cloudinary.com/doohobw9k/image/upload/v1719221945/TruBarber/Profile/nd7aapjxiwy92htjnctg.png',
      name: 'Beard',
    },
  ]);

  const filterServices = () => {
    // Create a set of names from previous services for quick lookup
    const previousServiceNames = new Set(
      previousServices?.map(service => service?.name),
    );

    // Filter servicesData to remove any services that are in previousServices based on name
    // return servicesData.filter(service => !previousServiceNames.has(service.name));
    const data = servicesData?.filter(
      service => !previousServiceNames.has(service.name),
    );
    // console.log(formatToJSON(data));
    setserviceData(data);
  };

  useEffect(() => {
    if (!userData) {
      // console.log(previousServices);
      filterServices();
    }
  }, []);

  const [selectedItem, setSelecteditem] = useState([]);

  const handleTagPress = tag => {
    setSelecteditem(prevSelecteditem => {
      if (prevSelecteditem.includes(tag)) {
        return prevSelecteditem.filter(item => item !== tag);
      } else {
        return [...prevSelecteditem, tag];
      }
    });
  };

  const handleConfirm = async () => {
    if (selectedItem.length === 0) {
      return ErrorShow('error', 'Oops!', 'Please select at least one service');
    }
    const services = selectedItem.map(item => ({
      ...item,
      pictures: [],
      description: '',
      options: [{name: '', price: '' , time:''}],
    }));
    if (userData) {
      navigation.navigate('AuthServiceInfo', {
        userData,
        services,
        isAdd: false,
        isEdit: false,
      });
    } else {
      navigation.navigate('ServiceInfo', {
        services,
        isAdd: true,
        isEdit: false,
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <View style={styles.backArrow}>
            <BackArrow onPress={() => navigation.goBack()} />
          </View>
          <View
            style={
              Platform.OS == 'android'
                ? styles.centerHeader
                : styles.centerHeaderIOS
            }>
            <Text style={styles.headerText}>Set-Up Services</Text>
            <Text style={styles.subText}>
              Choose from the options below to set up the services offered at
              your barber shop
            </Text>
          </View>
          <View style={styles.containerBody}>
            <View style={styles.services}>
              {servicesData.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.serviceImagecontainer,
                    selectedItem.includes(tag)
                      ? styles.selectedServiceimagecontainer
                      : styles.serviceImagecontainer,
                  ]}
                  onPress={() => handleTagPress(tag)}>
                  <Image
                    source={{uri: tag.icon}}
                    style={styles.serviceImageresize}
                    resizeMode="contain"
                  />
                  <Text style={styles.serviceTexts}>{tag.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View
          style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
          <Button title={'Next'} onPress={() => handleConfirm()} />
        </View>
        <Toast />
      </View>
    </SafeAreaView>
  );
}
