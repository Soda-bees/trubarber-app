import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {styles} from './style';
import {colors} from '../../services';
import Button from '../../components/Button';
import images from '../../services/utilities/images';
import BackArrow from '../../components/BackArrow';
import {handleAddPaymentCard} from '../../services/config/API';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authToken';
import {addPaymentCard} from '../../store/paymentCard';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';

export default function AddCard({navigation}) {
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();

  const [modalOpen, setModalopen] = useState(false);
  const [cardName, setCardname] = useState('');
  const [cardNumber, setCardnumber] = useState('');
  const [expiryDate, setExpirydate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [loader, setLoader] = useState(false);

  const setmodalTrue = () => {
    setModalopen(!modalOpen);
  };

  const handleFormatCardNumber = text => {
    const formattedText = text.replace(/\D/g, '');
    const formattedCardNumber = formattedText.replace(/(\d{4})/g, '$1 ');
    setCardnumber(formattedCardNumber.trim());
  };

  const handleFormatExpiryDate = text => {
    const formattedText = text.replace(/[^0-9]/g, '');

    if (formattedText.length > 2) {
      const formattedExpiryDate = formattedText.replace(
        /(\d{2})(\d{0,2})/,
        '$1/$2',
      );
      setExpirydate(formattedExpiryDate);
    } else {
      setExpirydate(formattedText);
    }
  };

  const handleConfirm = async () => {
    try {
      if (!cardName) {
        return ErrorShow('error', 'Error!', 'Please enter card name');
      }
      if (!cardNumber) {
        return ErrorShow('error', 'Error!', 'Please enter card number');
      }
      if (!expiryDate) {
        return ErrorShow('error', 'Error!', 'Please enter expiry date');
      }
      if (!securityCode) {
        return ErrorShow('error', 'Error!', 'Please enter cvv');
      }
      setLoader(true);
      const card = {
        name: cardName,
        number: cardNumber,
        expiryDate: expiryDate,
        cvv: securityCode,
      };
      const response = await handleAddPaymentCard(card, authToken);
      if (response.status == 200) {
        ErrorShow(
          'success',
          'Congratulation!',
          response?.data?.message,
          onHide,
        );
        dispatch(addPaymentCard(card));
        setLoader(false);
      } else {
        setLoader(false);
        ErrorShow('error', 'Error!', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      ErrorShow('error', 'Error!', error?.message);
    }
  };

  const onHide = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.allignment}>
              <View style={styles.arrowTop}>
                <BackArrow onPress={() => navigation.goBack()} />
              </View>
              <Text style={styles.headerText}>Add Card</Text>
            </View>
          </View>
          <View style={styles.addCardcontainer}>
            {/* <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={cardDetails => {
                // console.log('Card details:', cardDetails);
              }}
              onFocus={focusedField => {
                // console.log('focusField', focusedField);
              }}
            /> */}
            {/* <Text style={styles.title}>Name on Card</Text>
            <TextInput
              placeholderTextColor={colors.placeholdertextgray}
              style={
                Platform.OS == 'android'
                  ? styles.inputColor
                  : styles.inputColorIOS
              }
              placeholder="Name on Card"
              value={cardName}
              onChangeText={text => setCardname(text)}
            /> */}
            {/* <View style={styles.marginTop}>
              <Text style={styles.title}>Card Number</Text>
              <TextInput
                placeholderTextColor={colors.placeholdertextgray}
                style={
                  Platform.OS == 'android'
                    ? styles.inputColor
                    : styles.inputColorIOS
                }
                keyboardType="numeric"
                placeholder="xxxx xxxx xxxx xxxx"
                value={cardNumber}
                // onChangeText={text => setCardname(text)}
                onChangeText={handleFormatCardNumber}
                maxLength={19}
              />
            </View>
            <View style={styles.marginTop}>
              <View style={styles.row}>
                <View style={styles.fullWidth}>
                  <Text style={styles.title}>Expiry Date</Text>
                  <TextInput
                    placeholderTextColor={colors.placeholdertextgray}
                    style={
                      Platform.OS == 'android'
                        ? styles.inputColor
                        : styles.inputColorIOS
                    }
                    placeholder="Exp.Date"
                    value={expiryDate}
                    keyboardType="numeric"
                    onChangeText={handleFormatExpiryDate}
                    maxLength={5}
                    // onChangeText={text => setExpirydate(text)}
                  />
                </View>
                <View style={styles.fullWidth}>
                  <Text style={styles.title}>Security Code</Text>
                  <TextInput
                    placeholderTextColor={colors.placeholdertextgray}
                    style={
                      Platform.OS == 'android'
                        ? styles.inputColor
                        : styles.inputColorIOS
                    }
                    keyboardType="numeric"
                    placeholder="CVV"
                    value={securityCode}
                    onChangeText={text => setSecurityCode(text)}
                    maxLength={3}
                  />
                </View>
              </View>
            </View> */}
          </View>
          <View style={styles.button}>
            {loader ? (
              <Loader title={'Save'} />
            ) : (
              <Button onPress={handlePayment} title={'Save'} />
            )}
          </View>
          {/* <Modal
          isVisible={modalOpen}
          onBackdropPress={() => setModalopen(false)}
          backdropOpacity={0.5}>
          <View style={styles.modal}>
            <Image
              source={images.approvedWallet}
              resizeMode="contain"
              style={styles.approvedWallet}
            />
            <View>
              <Text style={styles.modalText}>
                Your credit card has been successfully added!
              </Text>
            </View>
          </View>
        </Modal> */}
          <Toast />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
