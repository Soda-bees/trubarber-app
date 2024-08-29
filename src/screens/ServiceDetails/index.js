import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import {colors, sizes} from '../../services';
import Button from '../../components/Button';
import images from '../../services/utilities/images';
import {ScrollView} from 'react-native-gesture-handler';
import formatToJSON from '../../services/config/FormatToJson';
import {useDispatch, useSelector} from 'react-redux';
import {removeCart, selectCart, setCart, updateCart} from '../../store/cart';
import {selectbarber} from '../../store/barber';
import {selectUserData} from '../../store/userData';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header';

export default function ServiceDetails({navigation, route}) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const {item} = route.params;
  const userData = useSelector(selectUserData);
  const [modalOpen, setModalopen] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState(null);
  const [styleMenu, setStyleMenu] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    if (item && Array.isArray(item.options)) {
      setStyleMenu(item.options);
    }
  }, [route.params.item]);

  const handleMenu = (index, price) => {
    console.log(price);
    setSelectedIndices(prevIndex => {
      if (prevIndex === index) {
        setTotalAmount(prevAmount => prevAmount - price);
        return null; 
      } else {
        // Select a new index
        setTotalAmount(prevAmount => prevAmount - prevAmount);
        setTotalAmount(prevAmount => prevAmount + price);
        return index;
      }
    });
  };

  const handleAddnewBarber = async () => {
    dispatch(removeCart());
    let newArray = item.options
      .filter((_, index) => index === selectedIndices)
      .map(option => ({
        ...option,
        serviceName: item.name,
        serviceIcon: item.icon,
      }));
    const obj = {
      barber: item?.barber,
      services: newArray,
      status: 'Pending',
    };
    dispatch(setCart(obj));
    setModalopen(!modalOpen);
    navigation.navigate('BookingProcess');
  };

  useEffect(() => {
    setInitialIndex();
  }, [item]);

  const setInitialIndex = async () => {
    if (cart?.barber == item?.barber) {
      const matchingService = cart.services.find(
        service => service.serviceName === item.name,
      );
      if (matchingService) {
        const index = item.options.findIndex(
          option =>
            option.name === matchingService.name &&
            option.price === matchingService.price,
        );
        if (index !== -1) {
          setSelectedIndices(index);
        }
      }
    }
  };

  const handleBookingProcess = () => {
    if (cart) {
      if (cart?.barber !== item?.barber) {
        setModalopen(true);
      } else {
        const serviceNameExists = cart.services.some(
          service => service.serviceName === item.name,
        );
        if (serviceNameExists) {
          let newArray = item.options
            .filter((_, index) => index === selectedIndices)
            .map(option => ({
              ...option,
              serviceName: item.name,
              serviceIcon: item.icon,
            }));
          const obj = {
            barber: item?.barber,
            user: userData?._id,
            services: newArray,
            status: 'Pending',
          };
          console.log(obj);
          dispatch(updateCart(obj));
          navigation.navigate('BookingProcess');
        } else {
          const oldCart = cart;
          let newArray = item.options
            .filter((_, index) => index === selectedIndices)
            .map(option => ({
              ...option,
              serviceName: item.name,
              serviceIcon: item.icon,
            }));
          const newCart = {
            ...oldCart,
            services: [...oldCart?.services, ...newArray],
          };
          dispatch(setCart(newCart));
          navigation.navigate('BookingProcess');
        }
      }
    } else {
      let newArray = item.options
        .filter((_, index) => index === selectedIndices)
        .map(option => ({
          ...option,
          serviceName: item.name,
          serviceIcon: item.icon,
        }));
      const obj = {
        barber: item?.barber,
        services: newArray,
        status: 'Pending',
      };
      dispatch(setCart(obj));
      navigation.navigate('BookingProcess');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Service Details'} />
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
                  selectedIndices == index
                    ? styles.styleMainView2
                    : styles.styleMainView
                }
                onPress={() => handleMenu(index, item?.price)}>
                <Text style={styles.styleName}>{item?.name}</Text>
                <Text style={styles.styleName}>
                  <Text style={{color: colors.red}}>$</Text>{' '}
                  {`${parseFloat(item?.price)?.toFixed(2)}`}
                </Text>
              </TouchableOpacity>
            );
          })}
          <Text style={styles.categoryImg}>Images</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:12}}>
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
              <Text style={styles.price}>
                {/* {`$${parseFloat(totalAmount)?.toFixed(
                2,
              )}`} */}
                {/* {`$ ${totalAmount || '0.00'}`} */}
                {`$${parseFloat(totalAmount || '0.00')?.toFixed(2)}`}
              </Text>
            </View>
            <View style={styles.btnWidth}>
              <TouchableOpacity
                style={selectedIndices == null ? styles.btn2 : styles.btn}
                disabled={selectedIndices == null}
                // onPress={() => navigation.navigate('BookingProcess',  { item, selectedIndices })}
                onPress={() => handleBookingProcess()}>
                <Text
                  style={
                    selectedIndices == null
                      ? styles.whiteText2
                      : styles.whiteText
                  }>
                  Book
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 20}} />
        <View style={Platform.OS == 'ios' && {paddingBottom:sizes.screenHeight * 0.08}}/>

        </ScrollView>
        <Toast />
      </View>
      <Modal isVisible={modalOpen} onBackdropPress={() => setModalopen(false)}>
        <View style={styles.modalMainView}>
          <Text style={styles.modalMessage}>
            You have already selected a different barber. Are you sure you want
            to remove the previously selected barber? Please confirm to proceed.
          </Text>
          <View style={styles.btnMainView}>
            <TouchableOpacity
              style={styles.btnView1}
              onPress={handleAddnewBarber}>
              <Text style={styles.btnText1}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => setModalopen(false)}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
