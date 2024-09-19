import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './style';
import images from '../../services/utilities/images';

export default function Button({
  title,
  light,
  setmodalTrue,
  onPress,
  hideImage,
  textCenter
}) {
  return (
    <View>
      {light ? (
        <TouchableOpacity style={textCenter ? styles.btnViewLightCenter : styles.btnViewLight} onPress={onPress}>
          <Text style={styles.btnTextLight}>{title}</Text>
          {!hideImage && (
            <Image
              source={images.arrowIcon}
              style={styles.arrowIconLight}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={hideImage ? styles.btnView2 : styles.btnView}
          onPress={onPress}>
          <Text style={hideImage ? styles.btnText2 : styles.btnText}>
            {title}
          </Text>
          {!hideImage && (
            <Image
              source={images.arrowIcon}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
