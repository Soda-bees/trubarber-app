import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  Hertotextcontainer: {
    marginTop: sizes.screenHeight * 0.35,
    alignItems: 'center',
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
  },
  HertotextcontainerIOS: {
    marginTop: sizes.screenHeight * 0.35,
    alignItems: 'center',
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
  },

  heroText: {
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '800',
    lineHeight: sizes.screenHeight * 0.04,
  },
  buttonTop: {
    marginTop: sizes.screenHeight * 0.4,
  },

  buttonTopIOS: {
    marginTop: sizes.screenHeight * 0.34,
  },

  backArrow: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },
});
