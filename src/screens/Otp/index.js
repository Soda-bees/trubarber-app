import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../services/utilities/images';
import { styles } from '../Otp/style.js';
import Button from '../../components/Button';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import { selectRole } from '../../store/role';
import { handleForgotPass } from '../../services/config/API';
import { ErrorShow } from '../../components/Error';
import Toast from 'react-native-toast-message';
import formatToJSON from '../../services/config/FormatToJson';

export default function Otp({ navigation, route }) {
  const role = useSelector(selectRole)
  const { email, otp } = route?.params
  const [value, setValue] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [loader, setLoader] = useState(false)
  const [oldOTP, setOldOTP] = useState('')

  useEffect(() => {
    if (otp) {
      setOldOTP(otp)
    }
  }, [otp])

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  clearText = () => {
    this.otpInput.clear();
  };

  const CELL_COUNT = 4;

  setText = () => {
    this.otpInput.setValue('1234');
  };

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const handleResetPassword = () => {
    if (value !== oldOTP) {
      return ErrorShow('error', 'Oops', "OTP doesn't match")
    }
    navigation.navigate('ResetPass', { email })
  }

  const handleResendOTP = async () => {
    try {
      setLoader(true)
      const body = { email, role }
      const response = await handleForgotPass(body)
      console.log(formatToJSON(response?.data));
      if (response?.status == 200) {
        setLoader(false)
        console.log(response?.data?.otp);
        setOldOTP(response?.data?.otp)
      } else {
        setLoader(false)
        ErrorShow('error', 'Oops', response?.data?.message)
      }
    } catch (error) {
      setLoader(false)
      console.log(error);
      ErrorShow('error', 'Oops', error?.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.forgotPass}>Enter OTP</Text>
      <View style={styles.adjustWidth}>
        <Text style={styles.subText}>
          You would’ve received an OTP on your email <Text style={{ fontWeight: '800' }}>{email}</Text>
        </Text>
      </View>
      <View style={styles.inputRow}>
        <CodeField
          ref={ref}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                Platform.OS == 'android' ? styles.cell : styles.cellIOS,
                isFocused && styles.focusCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View style={styles.recevieOTP}>
        <View style={styles.row}>
          <Text style={styles.textSize}>Didn’t receive the OTP?</Text>
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resend}> Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.otpTextContainer}>
            <Text style={styles.forgetText}>Resend code in </Text>

            {seconds > 9 ? (
              <Text style={styles.number}> 0:{seconds}</Text>
            ) : (
              <Text style={styles.number}>0:0{seconds}</Text>
            )}

            <Text style={styles.forgetText}> seconds </Text>
          </View> */}
      <View style={Platform.OS == 'android' ? styles.marginTop : styles.marginTopIOS}>
        {
          loader ?
            <Loader title={'Next'} /> :
            <Button title={'Next'} onPress={handleResetPassword} />
        }
      </View>
      <Toast />
    </View>
  );
}
