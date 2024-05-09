import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.black,
  },

  body: {
    width: sizes.screenWidth,
    alignItems: 'center',
    height: sizes.screenHeight * 0.8,
    justifyContent: 'center',
  },

  bodyIOS: {
    width: sizes.screenWidth,
    alignItems: 'center',
    height: sizes.screenHeight * 0.7,
    justifyContent: 'center',
  },

  letsGetStartedImg1: {
    alignSelf: 'center',
    width: sizes.screenWidth,
    height: sizes.screenHeight * 0.8,
  },

  letsGetStartedImg4: {
    resizeMode: 'contain',
    width: sizes.screenWidth,
    height: sizes.screenHeight * 0.75,
    position: 'absolute',
  },

  textBoldBlack: {
    fontFamily: 'Satoshi-Bold',
    color: colors.white,
    fontSize: fontSize.h2,
    width: sizes.screenWidth * 0.5,
    fontWeight: '700',
  },
  subTitle: {
    color: colors.white,
    fontSize: fontSize.extraLarge,
    width: sizes.screenWidth * 0.6,
  },
  description: {
    color: colors.white,
    opacity: 0.5,
    width: sizes.screenWidth * 0.7,
    // fontSize: fontSize.ba
  },

  textContainer: {
    // backgroundColor: 'red',
    top: sizes.screenHeight * 0.47,
    marginLeft: sizes.screenWidth * 0.08,
    gap: sizes.screenHeight * 0.009,
  },

  bottomBtnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.04,
  },
  bottomBtnContainerIOS: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.11,
  },

  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 30,
  },

  buttonContainer: {
    // backgroundColor: 'red',
    bottom: sizes.screenHeight * 0.052,
    gap: sizes.screenHeight * 0.01,
  },

  btnViewLight: {
    backgroundColor: colors.black,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.white,
  },
  btnTextLight: {
    color: colors.white,
    marginLeft: sizes.screenWidth * 0.032,

    fontSize: fontSize.medium,
    fontWeight: '600',
    fontSize: fontSize.h6,
  },
  arrowIconLight: {
    marginRight: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.02,
    width: sizes.screenHeight * 0.02,
    // tintColor: colors.black,
  },
  wrapDot: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: sizes.screenHeight * 0.07,
  },
  wrap: {
    width: sizes.screenWidth * 0.1,
  },
  dotActive: {
    // marginLeft:18,
    color: colors.white,
    fontSize: fontSize.h2,
    width: sizes.screenWidth * 0.1,
  },
  dot: {
    margin: sizes.screenHeight * 0.0,
    color: colors.disabledBg2,
    opacity: 0.6,
    fontSize: fontSize.h2,
    width: sizes.screenWidth * 0.1,
  },
});
