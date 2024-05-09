import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  forgotPass: {
    marginTop: sizes.screenHeight * 0.13,
    textAlign: 'center',
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: '700',
  },
  adjustwidth: {
    alignItems: 'center',
  },

  subText: {
    textAlign: 'center',
    width: sizes.screenWidth * 0.7,
    marginTop: sizes.screenHeight * 0.016,
    fontSize: fontSize.medium,
    color: colors.placeholdertextgray,
    alignSelf: 'center',
  },
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes.screenHeight * 0.08,
    borderRadius: sizes.screenWidth * 0.03,
    width: sizes.screenWidth * 0.85,
  },

  inputImage: {
    height: sizes.screenHeight * 0.025,
  },

  input: {
    width: sizes.screenWidth * 0.78,
    paddingLeft: sizes.screenWidth * 0.05,
    color: colors.black,
  },
  inputContainer: {
    marginTop: sizes.screenHeight * 0.12,
    marginLeft: sizes.screenWidth * 0.04,
    marginRight: sizes.screenWidth * 0.04,
    backgroundColor: colors.selectorcolor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.07,
  },
  wholeInput: {
    marginTop: sizes.screenHeight * 0.03,
    marginLeft: sizes.screenWidth * 0.04,
    marginRight: sizes.screenWidth * 0.04,
    backgroundColor: colors.selectorcolor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.07,
  },
  nextBtn: {
    top: sizes.screenHeight * 0.32,
  },
});
