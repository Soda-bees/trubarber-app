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
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';

export default function SetUpServices({navigation}) {
  const [servicesData, setserviceData] = useState([
    {
      serviceImage: images.hairCut,
      serviceText: 'Haircuts',
    },
    {
      serviceImage: images.HDblush,
      serviceText: 'Makeup',
    },
    {
      serviceImage: images.HDmanicure,
      serviceText: 'Manicure',
    },
    {
      serviceImage: images.hairDresserchair,
      serviceText: 'Manicure',
    },
    {
      serviceImage: images.beardTrim,
      serviceText: 'Beard',
    },
  ]);

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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={() => navigation.goBack()} />
        </View>
        <View style={Platform.OS == 'android' ? styles.centerHeader : styles.centerHeaderIOS}>
          <Text style={styles.headerText}>Set-Up Services</Text>
          <Text style={styles.subText}>
            Choose from the options below to set up the services offered at your
            barber shop
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
                source={tag.serviceImage}
                style={styles.serviceImageresize}
                resizeMode="contain"
              />
              <Text style={styles.serviceTexts}>{tag.serviceText}</Text>
            </TouchableOpacity>
          ))}
        </View>
          <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
            <Button
              title={'Next'}
              onPress={() =>
                navigation.navigate('ServiceInfo')
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
