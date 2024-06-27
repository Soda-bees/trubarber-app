import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import {colors} from '../../services';
import Button from '../../components/Button';
import images from '../../services/utilities/images';
import {ScrollView} from 'react-native-gesture-handler';

export default function ServiceDetails({navigation, route}) {
  const {item} = route.params;
  // console.log('param wala naya data h bhaiii', item);
  const [modalOpen, setModalopen] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [styleMenu, setStyleMenu] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');

  // const handleMenu = index => {
  //   if (selectedIndices.includes(index)) {
  //     setSelectedIndices(selectedIndices.filter(i => i !== index));
  //   } else {
  //     setSelectedIndices([...selectedIndices, index]);
  //   }
  // };
  useEffect(() => {
    if (item && Array.isArray(item.options)) {
      setStyleMenu(item.options);
    }
  }, [route.params.item]);

  useEffect(() => {
    // console.log(selectedIndices);
    const total = selectedIndices.reduce(
      (sum, idx) => sum + parseFloat(styleMenu[idx]?.price || 0),
      0,
    );
    setTotalAmount(total);
  }, [selectedIndices, styleMenu]);

  const handleMenu = index => {
    setSelectedIndices(prevIndices => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter(i => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.allignment}>
            <View style={styles.arrowTop}>
              <BackArrow onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.headerText}>Service Details</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.detailContainer}>
            <View style={styles.row}>
              <View style={styles.serviceImagecontainer}>
                <Image
                  source={{uri: item.icon}}
                  style={styles.serviceImageresize}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.productText}>{item?.name}</Text>
            </View>
            <Text style={styles.description}>{item?.description}</Text>
            <Text style={styles.categoryName}>{item.name} Styles</Text>
          </View>
          {styleMenu.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={
                  selectedIndices.includes(index)
                    ? styles.styleMainView2
                    : styles.styleMainView
                }
                onPress={() => handleMenu(index)}>
                <Text style={styles.styleName}>{item?.name}</Text>
                <Text style={styles.styleName}>
                  <Text style={{color: colors.red}}>$</Text> {item?.price}
                </Text>
              </TouchableOpacity>
            );
          })}
          <Text style={styles.categoryImg}>Images</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {item?.pictures.map((item, index) => {
              return (
                <View style={styles.imageContainer} key={index}>
                  <Image source={{uri: item}} style={styles.imgStyle} />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.priceAndbtnContainer}>
            <View style={styles.borderRight}>
              <Text style={styles.serviceTime}>Total Amount</Text>
              <Text style={styles.price}>${totalAmount}</Text>
            </View>
            <View style={styles.btnWidth}>
              <TouchableOpacity
                style={selectedIndices.length === 0 ? styles.btn2 : styles.btn}
                disabled={selectedIndices.length === 0}
                onPress={() => navigation.navigate('BookingProcess', {selectedIndices})} >
                <Text style={selectedIndices.length === 0 ? styles.whiteText2 : styles.whiteText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 20}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
