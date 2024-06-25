import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import {styles} from './style';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken, setAuthToken} from '../../store/authToken';
import {selectUserData, setUserData} from '../../store/userData';
import {signup} from '../../services/config/API';
import {ErrorShow} from '../../components/Error';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../services';
import { selectlocation } from '../../store/location';

export default function Congratulation({route}) {
  const dispatch = useDispatch();
  const {userData} = route.params;
  const location = useSelector(selectlocation)

  const [loader, setLoader] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoader(true);
      userData.location = location;
      const response = await signup(userData);
      if (response.status == 201) {
        setLoader(false);
        dispatch(setUserData(response?.data?.userData));
        dispatch(setAuthToken(response?.data?.token));
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      ErrorShow('error', 'Oops', error?.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrowStyle}>
          <BackArrow />
        </View>
        <View style={styles.mainView}>
          <Text style={styles.textStyle}>“Enhance Your Experience”</Text>
          <View style={styles.centerView}>
            <Image source={images.congoImg} style={styles.imgStyle} />
            <Text style={styles.textStyle}>Congratulation!</Text>
            <Text style={styles.textStyle1}>
              Your profile creation is now complete and ready to go.
            </Text>
          </View>
          <View style={styles.buttonStyle}>
            {loader ? (
              <View style={styles.loaderBtnStyle}>
                <ActivityIndicator color={colors.disabledBg} size={30} />
              </View>
            ) : (
              <Button
                title={'Get ready'}
                hideImage={true}
                onPress={handleSignUp}
              />
            )}
          </View>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
