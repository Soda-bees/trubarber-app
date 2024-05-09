import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import {colors} from '../../services';
import Button from '../../components/Button';
import images from '../../services/utilities/images';

export default function ServiceDetails({navigation}) {
  const [modalOpen, setModalopen] = useState(false);

  const setmodalTrue = () => {
    setModalopen(!modalOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.allignment}>
          <View style={styles.arrowTop}>
            <BackArrow onPress={() => navigation.goBack()}/>
          </View>
          <Text style={styles.headerText}>Service Details</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.row}>
          <View style={styles.serviceImagecontainer}>
            <Image
              source={images.hairCut}
              style={styles.serviceImageresize}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.productText}>Haircuts</Text>
        </View>
        <Text style={styles.description}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id es
        </Text>
      </View>
      <View style={styles.priceAndbtnContainer}>
        <View style={styles.borderRight}>
          <Text style={styles.serviceTime}>2 hour Service</Text>
          <Text style={styles.price}>$25.00</Text>
        </View>
        <View style={styles.btnWidth}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('MyTabs')}>
            <Text style={styles.whiteText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
