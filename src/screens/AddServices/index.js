import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import BackArrow from '../../components/BackArrow';
import Button from '../../components/Button';
import {styles} from './style';

export default function AddServices({navigation}) {
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

//   const [selectedItem, setSelecteditem] = useState([]);

  
  const [selectedItem, setSelecteditem] = useState(null);

  const handleTagPress = tag => {
    setSelecteditem(tag === selectedItem ? null : tag);
  };

    // const handleTagPress = tag => {
    //   setSelecteditem(prevSelecteditem => {
    //     if (prevSelecteditem.includes(tag)) {
    //       return prevSelecteditem.filter(item => item !== tag);
    //     } else {
    //       return [...prevSelecteditem, tag];
    //     }
    //   });
    // };
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
                  source={tag.serviceImage}
                  style={styles.serviceImageresize}
                  resizeMode="contain"
                />
                <Text style={styles.serviceTexts}>{tag.serviceText}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.nextBtn}>
            <Button
              title={'Next'}
              onPress={() => navigation.navigate('ServiceInfo')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
