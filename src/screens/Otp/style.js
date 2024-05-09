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
  input: {
    backgroundColor: colors.selectorcolor,
    maxWidth: sizes.screenWidth * 0.42,
    marginRight: sizes.screenWidth * 0.012,
    borderRadius: sizes.screenWidth * 0.03,
  },

  adjustWidth: {
    width: sizes.screenWidth * 1,
    alignItems: 'center',
  },

  subText: {
    textAlign: 'center',
    width: sizes.screenWidth * 0.7,
    marginTop: sizes.screenHeight * 0.02,
    fontSize: fontSize.medium,
    color: colors.grayText,
  },

  inputRow: {
    marginTop: sizes.screenHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  codeFieldRoot: {
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
  },

  cell: {
    backgroundColor: colors.selectorcolor,
    fontFamily: 'Satoshi-Bold',
    width: sizes.screenWidth * 0.16,
    height: sizes.screenHeight * 0.08,
    lineHeight: sizes.screenHeight * 0.08,
    fontSize: fontSize.h4,
    textAlign: 'center',
    color: colors.black,
    borderRadius: sizes.screenWidth * 0.03,
  },
  textcenter: {
    marginTop: sizes.screenHeight * 0.092,
    textAlign: 'center',
  },
  recevieOTP: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  row: {
    flexDirection: 'row',
  },

  textSize: {
    color: colors.placeholdertext,
    fontWeight:'400'
  },

  resend: {
    fontWeight: '700',
    color: colors.placeholdertext,
  },
  marginTop: {
    top: sizes.screenHeight * 0.33,
  },
});
