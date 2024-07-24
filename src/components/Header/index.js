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
import {styles} from './style.js';
import Button from '../Button';
import BackArrow from '../BackArrow';
import {useNavigation} from '@react-navigation/native';

export default function Header({title}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <BackArrow onPress={() => navigation.goBack()} />
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.emptyStyle}></View>
    </View>
  );
}
