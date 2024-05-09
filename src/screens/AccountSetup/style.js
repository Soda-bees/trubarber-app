import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  Forgotpass: {
    marginTop: sizes.screenHeight * 0.08,
    textAlign: 'center',
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: '700',
  },
  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },
  textContainer: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.02,
    marginLeft: sizes.screenWidth * 0.2,
    marginRight: sizes.screenWidth * 0.2,
    fontSize: fontSize.medium,
    color: colors.grayText,
  },
  input: {
    width: sizes.screenWidth * 0.7,
    color: colors.black,
    paddingLeft: sizes.screenWidth * 0.03,
  },
inputField: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.selectorcolor,
    height: sizes.screenHeight * 0.07,
  },

  wholeContainer: {
    marginTop: sizes.screenHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.selectorcolor,
    height: sizes.screenHeight * 0.07,
  },
  inputContainer: {
    marginLeft: sizes.screenWidth * 0.04,
    marginRight: sizes.screenWidth * 0.04,
  },
  Message: {
    height: sizes.screenHeight * 0.02,
  },
  Nextbtn: {
    marginTop: sizes.screenHeight * 0.46,
  },
  row: {
    alignItems: 'center',
    paddingLeft: sizes.screenWidth * 0.03,
    flexDirection: 'row',
  },

  inputImage: {
    height: sizes.screenHeight * 0.022,
    width: sizes.screenWidth * 0.06,
    resizeMode: 'contain',
  },
  nextBtn: {
    marginTop: sizes.screenHeight * 0.17,
  },

  nextBtnIOS: {
    // marginTop: sizes.screenHeight * 0.13,
    bottom:sizes.screenHeight * 0.1
    
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'start',
    marginHorizontal: sizes.screenWidth * 0.05,
    marginTop: sizes.screenHeight * 0.02,
  },
  checkboxViewIOS: {
    flexDirection: 'row',
    alignItems: 'start',
    marginHorizontal: sizes.screenWidth * 0.05,
    marginTop: sizes.screenHeight * 0.02,
    marginBottom: sizes.screenHeight * 0.22,
  },

  checkboxTitle: {
    color: colors.grayText,
    marginStart: sizes.screenWidth * 0.02,
    fontSize: fontSize.smallM,
  },
  checked: {
    height: sizes.screenHeight * 0.022,
    width: sizes.screenWidth * 0.05,
    marginTop: sizes.screenHeight * 0.005
  },
  tintColor:{
    tintColor: colors.disabledBg,

  }
});
