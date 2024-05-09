import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  arrowBlackleft: {
    marginTop: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.1,
    height: sizes.screenHeight * 0.023,
  },

  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },
  forgotPass: {
    marginTop: sizes.screenHeight * 0.09,
    textAlign: 'center',
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: '700',
  },
  text: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.02,
    fontSize: fontSize.medium,
    width: sizes.screenWidth * 0.7,
    color: colors.grayText,
    alignSelf: 'center',
  },
  input: {
    width: sizes.screenWidth * 0.7,
    paddingLeft: sizes.TinyMargin,
    color: colors.black,
  },

  wholeContainer: {
    marginTop: sizes.screenHeight * 0.12,
    backgroundColor: colors.selectorcolor,
    marginLeft: sizes.screenWidth * 0.04,
    marginRight: sizes.screenWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.07,
  },
  message: {
    height: sizes.screenHeight * 0.025,
    marginStart: sizes.screenWidth * 0.02,
  },
  nextBtn: {
    top: sizes.screenHeight * 0.395,
  },
});
