import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './style.js';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { colors, sizes } from '../../services';
import BackArrow from '../../components/BackArrow/index.js';
import Modal from 'react-native-modal'

export default function BarberServiceDetails({ route, navigation }) {
  // const [serviceNameHeading, setserviceNameHeading] = useState('Hair Cuts');
  // const {serviceNameHeading, serviceName} = route.params;
  const { item } = route?.params

  const [serviceAbout, setserviceAbout] = useState(
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
  );
  // const [serviceName, setServiceName] = useState('Haircut');

  const [modalVisible, setModalVisible] = useState(false);
  const [serviceDetail, setServiceDetail] = useState([
    {
      name: 'Buzz Cut',
      price: '10',
    },
    {
      name: 'Under Cut',
      price: '10',
    },
    {
      name: 'Crew Cut',
      price: '10',
    },
    {
      name: 'Traditional Cut',
      price: '10',
    },
  ]);
  const [serviceImage, setServiceImage] = useState([
    { image: images.barberUsingdry },
    { image: images.barberUsingdry },
    { image: images.barberUsingdry },
    { image: images.barberUsingdry },
    { image: images.barberUsingdry },
  ]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.arrowTop}>
            <BackArrow onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{item?.name}</Text>
          </View>
          <TouchableOpacity
            style={{ padding: sizes.screenWidth * 0.02 }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image source={images.threeDots} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.ScrollViewContainer}>
          <View style={styles.containerBody}>
            <View style={styles.aboutContainer}>
              <Text style={styles.aboutHeading}>About</Text>
              <Text style={styles.aboutDescription}>{item?.description}</Text>
            </View>
            <View style={styles.serviceDetailContainer}>
              <View style={styles.tableHeadingRow}>
                <Text style={styles.tableServiceHeading}>{item?.name}</Text>
                <Text style={styles.tablePriceHeading}>Price</Text>
              </View>
              {item?.options?.map((item, index) => (
                <View style={styles.serviceContentRow} key={index}>
                  <Text style={styles.serviceNameText}>{item.name}</Text>
                  <Text style={styles.priceText}>$ {item.price}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.imageView}>
          <Text style={styles.imageHeading}>Images</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {item?.pictures?.map((item, index) => (
              <View key={index}>
                <Image style={styles.imageContainer} source={{ uri: item }} />
              </View>
            ))}
          </ScrollView>
        </View>
        <Modal
          animationIn={'slideInRight'}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalRow}
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('ServiceInfo', { services: [item], isAdd: false, isEdit: true })
              }}
            // onPress={() => {
            //   navigation.navigate('EditService', {
            //     serviceNameHeading,
            //     serviceName,
            //   });
            // }}
            >
              <Image source={images.editIcon} />
              <Text style={styles.modalText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalRow}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image source={images.deleteIcon} />
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
