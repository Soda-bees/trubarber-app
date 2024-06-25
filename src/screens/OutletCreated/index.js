import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import images from '../../services/utilities/images';
import { styles } from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, PermissionsIOS } from 'react-native';
import { formToJSON } from 'axios';
import Loader from '../../components/Loader';
import { colors } from '../../services';
import { handleBarberSignup } from '../../services/config/API';
import { setUserData } from '../../store/userData';
import { setAuthToken } from '../../store/authToken';
import { ErrorShow } from '../../components/Error';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import formatToJSON from '../../services/config/FormatToJson';
import { selectlocation } from '../../store/location';

export default function OutletCreated({ navigation, route }) {
  const location = useSelector(selectlocation)
  const dispatch = useDispatch()
  const { userData } = route.params;

  const [loader, setLoader] = useState(false)

  const handleConfirm = async () => {
    // navigation.navigate('BarberTabs')
    try {
      setLoader(true)
      userData.location = location;
      const response = await handleBarberSignup(userData)
      if (response.status == 201) {
        setLoader(false);
        dispatch(setUserData(response?.data?.barber));
        dispatch(setAuthToken(response?.data?.token));
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      ErrorShow('error', 'Oops', error?.message);
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <BackArrow onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.forgotPass}>PROFILE CREATED!</Text>
        <View style={styles.grats}>
          <Image
            source={images.grats}
            resizeMode="contain"
            style={styles.resizeImg}
          />
          <View style={styles.gratsText}>
            <Text style={styles.title}>Congratutions!</Text>
            <Text style={styles.subText}>
              Your profile is now complete and ready to go.
            </Text>
          </View>
        </View>
        <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
          {
            loader ?
              <View style={styles.btnViewLoader}>
                <ActivityIndicator color={colors.disabledBg} size={32} />
              </View>
              : <TouchableOpacity style={styles.btnView} onPress={() => handleConfirm()}>
                <Text style={styles.btnText}>Get Ready</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
