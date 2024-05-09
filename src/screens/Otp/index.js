import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from '../Otp/style.js';
import Button from '../../components/Button';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export default function Otp({navigation}) {
  const [value, setValue] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  // const route = useRoute();
  // const {isUser} = route.params;

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

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const handleResetPassword = () => {
    navigation.navigate('ResetPass')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.forgotPass}>Enter OTP</Text>
      <View style={styles.adjustWidth}>
        <Text style={styles.subText}>
          You would’ve received an OTP on your email ***@gmail.com
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
          renderCell={({index, symbol, isFocused}) => (
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
          <TouchableOpacity>
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
      <View style={styles.marginTop}>
        <Button title={'Next'} onPress={handleResetPassword}/>
      </View>
    </View>
  );
}
