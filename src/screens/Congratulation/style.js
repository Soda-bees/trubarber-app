import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  mainView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: sizes.screenHeight * 0.54,
    marginTop: sizes.screenHeight * 0.05,
  },

  centerView: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: sizes.screenHeight * 0.7
  },
  imgStyle: {
    width: sizes.screenWidth * 0.3,
    height: sizes.screenWidth * 0.4,
    marginBottom: 15,
    resizeMode: 'contain'
  },

  textStyle: {
    color: colors.black,
    fontSize: fontSize.h1,
    fontWeight: '700',
    width: sizes.screenWidth * 0.8,
    textAlign: 'center',
  },

  textStyle1: {
    color: colors.black,
    width: sizes.screenWidth * 0.7,
    textAlign: 'center',
    fontSize: fontSize.large,
    fontWeight: '500'
  },

  backArrowStyle: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },

  loaderBtnStyle: {
    backgroundColor: colors.black,
    // padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.07,
    // paddingHorizontal:sizes.screenWidth * 0.05,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStyle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.07,
  },
  buttonStyleIOS: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.09,
  },
});
