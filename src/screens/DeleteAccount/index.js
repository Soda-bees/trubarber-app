import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import Header from '../../components/Header';
import images from '../../services/utilities/images';
import {useDispatch, useSelector} from 'react-redux';
import {removeUserData, selectUserData} from '../../store/userData';
import Button from '../../components/Button';
import {
  deleteDeviceToken,
  handleconfirmAndDeleteAccount,
  handleDeleteAccount,
} from '../../services/config/API';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import {removeAuthToken, selectAuthToken} from '../../store/authToken';
import {removeRole} from '../../store/role';
import Modal from 'react-native-modal';
import Loader from '../../components/Loader';
import {removePaymentCard} from '../../store/paymentCard';
import {removeCart} from '../../store/cart';
import {colors} from '../../services';
import {removelocation} from '../../store/location';

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [password, setPassword] = useState('');
  const token = useSelector(selectAuthToken);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handlePasswordCheck = async () => {
    try {
      setLoader(true);
      if (!password) {
        setLoader(false);
        return ErrorShow('error', 'Oops', 'Please enter your password');
      }
      const body = {
        password,
      };
      const response = await handleDeleteAccount(body, token);
      if (response.status === 200) {
        setLoader(false);
        setShowModal(true);
        console.log('teueee', response);
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', 'Invalid password');
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDeleteDeviceToken = async () => {
    try {
      const response = await deleteDeviceToken(authToken);
      if (response?.status == 200) {
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.log('error in user details', error);
    }
  };

  const handleDeleteAccountCompletely = async () => {
    setLoader(true);
    try {
      const response = await handleconfirmAndDeleteAccount(token);
      if (response.status === 200) {
        setLoader(false);
        setShowModal(false);
        ErrorShow(
          'success',
          'Account Deleted',
          'Your account has been deleted successfully.',
          () => {
            setTimeout(() => {
              handleDeleteDeviceToken();
              dispatch(removeAuthToken());
              dispatch(removeRole());
              dispatch(removePaymentCard());
              dispatch(removeCart());
              dispatch(removeUserData());
              dispatch(removelocation());
            }, 1000);
          },
        );
      } else {
        setLoader(false);
        console.log('Error in deletion process');
        ErrorShow('error', 'Oops', 'Something went wrong, please try again.');
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      ErrorShow('error', 'Oops', 'An unexpected error occurred.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Header title={'Delete Account'} />
        <View style={styles.imgNameMainView}>
          <Image
            source={
              userData?.profile
                ? {uri: userData?.profile}
                : userData?.gender === 'male'
                ? images.male
                : images.female
            }
            style={styles.profileImg}
          />
          <Text style={styles.userName}>{userData?.name}</Text>
        </View>
        <Text style={styles.deleteAccountText}>
          To confirm your account deletion, please verify your account password.
        </Text>
        <View style={styles.inputImgView}>
          <TextInput
            placeholder="Password"
            style={styles.inputField}
            value={password}
            secureTextEntry={!showPass}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          {!showPass ? (
            <TouchableOpacity
              styles={styles.paddingRight}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={images.hidden}
                style={styles.passImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Image
                source={images.show}
                style={styles.passImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonView}>
          {loader ? (
            <Loader title={'Continue'} />
          ) : (
            <Button title="Continue" onPress={handlePasswordCheck} />
          )}
        </View>
        <Toast />
        <Modal isVisible={showModal}>
          <View style={styles.modalMainView}>
            <Text style={styles.modalHeading}>Delete Account</Text>
            <Text style={styles.modalText}>
              You're about to delete all of the data in your TruBarber account.
              Are you absolutely positive to delete your account? There is no
              option to undo.
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteAccountCompletely}>
              {loader ? (
                <ActivityIndicator size={25} color={colors.black} />
              ) : (
                <Text style={styles.deleteButtonText}>
                  Delete {userData?.name}'s account
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
