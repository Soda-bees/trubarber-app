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

export default function BackArrow({light , back , onPress}) {
  return (
    <View>
      {light ? (
        <TouchableOpacity style={styles.arrowContainer} onPress={onPress}>
          <Image
            style={styles.arrowWhiteleft}
            source={images.arrowblackleft}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.arrowContainer} onPress={onPress}>
          <Image
            style={styles.arrowBlackleft}
            source={images.arrowblackleft}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

