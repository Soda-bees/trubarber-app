import {
  ActivityIndicator,
  BackHandler,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './style';
import {colors, sizes} from '../../services';
import {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  getWalletBalance,
  handleIncreaseWallet,
} from '../../services/config/API';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authToken';
import {selectUserData, updateWalletRedux} from '../../store/userData';
import formatToJSON from '../../services/config/FormatToJson';
import {useFocusEffect} from '@react-navigation/native';
import images from '../../services/utilities/images';
import BackArrow from '../../components/BackArrow';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';
import {usePaymentSheet} from '@stripe/stripe-react-native';
import {BASE_URL} from '../../services/config/AxiosInstance';

export default function Wallet({navigation}) {
  const {initPaymentSheet, presentPaymentSheet} = usePaymentSheet();
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);
  const userData = useSelector(selectUserData);

  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [enterPaymentAmount, setEnterPaymentAmount] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const backAction = () => {
      if (btnLoader) {
        ToastAndroid.show('Please wait, loading...', ToastAndroid.SHORT);
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [btnLoader]);

  useFocusEffect(
    useCallback(() => {
      if (userData) {
        setWallet(userData?.wallet);
      }
    }, [userData]),
  );

  const handleGetWalletbalance = async () => {
    try {
      const response = await getWalletBalance(userData?._id, authToken);
      response?.data;
      if (response?.data?.success) {
        setWallet(response?.data?.balance);
        dispatch(updateWalletRedux(response?.data?.balance));
        setLoader(false);
      } else {
        setLoader(false);
        ToastAndroid.show('Some error, Try again later...', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      ToastAndroid.show('Some error, Try again later...', ToastAndroid.SHORT);
    }
  };

  const handleAddPayment = async () => {
    try {
      //  setBtnLoader(true)
      const numberValue = Number(amount);
      console.log('type===>', typeof numberValue);
      const body = {
        amount: numberValue,
      };
      const response = await handleIncreaseWallet(
        userData?._id,
        authToken,
        body,
      );
      console.log('add payment response===>', response?.data);
      if (response?.data?.success) {
        setWallet(response?.data?.balance);
        dispatch(updateWalletRedux(response?.data?.balance));
        //  setBtnLoader(false)
        //  ErrorShow('success', 'Congratulation!', response?.data?.message);
      } else {
        //  setBtnLoader(false)
        ErrorShow('error', 'Oops!', response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      //  setBtnLoader(false)
      ErrorShow('error', 'Oops!', error?.message);
    }
  };
  const handleNavigateToBack = () => {
    if (btnLoader) {
      ToastAndroid.show('Some error, Try again later...', ToastAndroid.SHORT);
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MyTabs');
    }
  };

  const togglePaymentAmount = () => {
    setEnterPaymentAmount(true);
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      ErrorShow('error', 'Invalid Amount', 'Please enter a valid amount.');
      setAmount('');
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}user/createPaymentIntent`,
        {amount: amount},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const {clientSecret} = await response.data;

      if (!clientSecret) {
        throw new Error('Failed to get clientSecret');
      }

      const {error: initError} = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        paymentMethodType: 'Card',
        // merchantDisplayName: 'My Store',
        billingDetails: {
          email: userData?.email || '',
        },
      });

      if (initError) {
        throw new Error(initError.message);
      }

      const {error: presentError} = await presentPaymentSheet();

      if (presentError) {
        throw new Error(presentError.message);
      }

      await handleAddPayment();

      Alert.alert(
        'Payment Successful',
        'Your payment has been processed successfully!',
      );
      setAmount('');
    } catch (error) {
      console.error('Error processing payment: ', error);
      Alert.alert('Payment Error', error.message);
      setAmount('');
    }
  };

  const handleButtonPress = () => {
    if (enterPaymentAmount) {
      setEnterPaymentAmount(false);
      handlePayment();
    } else {
      togglePaymentAmount();
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackArrow onPress={handleNavigateToBack} />
          <Text style={styles.headerText}>Wallet</Text>
          <View style={styles.emptyStyle}></View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            Platform.OS == 'android' ? styles.scrollView : styles.scrollViewIOS
          }
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={() => {
                handleGetWalletbalance();
              }}
              colors={[colors.black]}
              progressBackgroundColor="white"
            />
          }>
          <View style={styles.imageContainer}>
            <Image source={images.wallet} style={styles.waletImg} />
            <Text style={styles.currentBalanceText}>Current Balance</Text>
            <Text style={styles.amount}>{`$ ${
              wallet || userData?.wallet
            }`}</Text>
          </View>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={60} style={styles.keyboardView}>
          {enterPaymentAmount && (
            <View style={styles.paymentAmount}>
              <Text style={styles.amountText}>Enter Amount</Text>
              <TextInput
                placeholderTextColor={colors.placeholdertextgray}
                style={styles.inputColorIOS}
                keyboardType="numeric"
                placeholder="Amount"
                value={amount}
                onChangeText={text => setAmount(text)}
              />
            </View>
          )}
          {btnLoader ? (
            <View style={styles.addBtnLoader}>
              <ActivityIndicator color={colors.white} size={29} />
            </View>
          ) : (
            <TouchableOpacity style={styles.addBtn} onPress={handleButtonPress}>
              <Image source={images.addService} style={styles.addImage} />
              <Text style={styles.addText}>
                {enterPaymentAmount ? 'Submit Payment' : 'Add'}
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
        <Toast />
      </View>
    </SafeAreaView>
  );
}
