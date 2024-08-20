import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../services';

export default function Loader({title, appointmentButton, color}) {
  return (
    <>
      {appointmentButton ? (
        <View style={[styles.acceptBtn, {backgroundColor: color}]}>
          <ActivityIndicator color={colors.disabledBg} size={18} />
        </View>
      ) : (
        <View style={styles.btnView}>
          <Text style={styles.btnText}>{title}</Text>
          <ActivityIndicator color={colors.disabledBg} size={32} />
        </View>
      )}
    </>
  );
}
