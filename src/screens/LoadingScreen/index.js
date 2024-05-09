import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.loadingTextcontainer}>
        <Image
          source={images.loadingScreen}
          resizeMode="center"
          style={styles.loadingScreen}
        />
      </View>
    </View>
  );
}
