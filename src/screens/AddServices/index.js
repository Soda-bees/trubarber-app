import {View, Text, SafeAreaView, Image, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import BackArrow from '../../components/BackArrow';
import Button from '../../components/Button';
import {styles} from './style';

export default function AddServices({navigation}) {
  const [servicesData, setserviceData] = useState([
    {
      icon: "https://res.cloudinary.com/doohobw9k/image/upload/v1719221917/TruBarber/Profile/xph66mkuv5k2iluyveyj.png",
      name: 'Haircut',
    },
    {
      icon: "https://res.cloudinary.com/doohobw9k/image/upload/v1719221945/TruBarber/Profile/nd7aapjxiwy92htjnctg.png",
      name: 'Beard',
    },
  ]);

  
  const [selectedItem, setSelecteditem] = useState(null);

  const handleTagPress = tag => {
    setSelecteditem(tag === selectedItem ? null : tag);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.centerHeader}>
          <Text style={styles.headerText}>Add Services</Text>
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
                  selectedItem === tag
                    ? styles.selectedServiceimagecontainer
                    : null,
                //   selectedItem.includes(tag)
                //     ? styles.selectedServiceimagecontainer
                //     : styles.serviceImagecontainer,
                ]}
                onPress={() => handleTagPress(tag)}>
                <Image
                  source={{uri:tag.icon}}
                  style={styles.serviceImageresize}
                  resizeMode="contain"
                />
                <Text style={styles.serviceTexts}>{tag.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
          <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
            <Button
              title={'Next'}
              onPress={() => navigation.navigate('ServiceInfo')}
            />
          </View>
      </View>
    </SafeAreaView>
  );
}
