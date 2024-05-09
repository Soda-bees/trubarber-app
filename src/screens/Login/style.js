import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },

  toggleContainer: {
    backgroundColor: colors.userBarbertoggle,
    height: sizes.screenHeight * 0.06,
    marginTop: sizes.screenHeight * 0.1,
    borderRadius: sizes.screenWidth * 0.04,
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  active: {
    backgroundColor: colors.black,
    width: sizes.screenWidth * 0.32,
    height: sizes.screenHeight * 0.044,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.03,
  },

  inActive: {
    width: sizes.screenWidth * 0.32,
    height: sizes.screenHeight * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColorwhite: {
    color: colors.white,
    fontSize: fontSize.medium,
  },
  toggleTextsize: {
    fontSize: fontSize.medium,
    color: colors.black,
  },
  loginText: {
    fontSize: fontSize.h2,
    marginLeft: sizes.screenWidth * 0.05,
    marginTop: sizes.screenWidth * 0.2,
    marginBottom: sizes.screenWidth * 0.03,
    fontWeight: '700',
    color: colors.black,
  },

  wholeContainer: {
    backgroundColor: colors.selectorcolor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.07,
  },

  inputFields: {
    marginLeft: sizes.screenWidth * 0.04,
    marginRight: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.01,
  },

  input: {
    width: sizes.screenWidth * 0.66,
    color: colors.black,
  },

  inputImage: {
    height: sizes.screenHeight * 0.025,
    marginStart: sizes.screenWidth * 0.02,
  },

  eyeicon: {
    height: sizes.screenHeight * 0.03,
    alignSelf:'flex-end'
  },

  forgotPass: {
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.smallM,
    marginTop: sizes.screenHeight * 0.02,
    marginBottom: sizes.screenHeight * 0.02,
  },

  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.selectorcolor,
    height: sizes.screenHeight * 0.07,
    marginTop: sizes.screenHeight * 0.03,
    borderRadius: sizes.screenWidth * 0.03,
  },
  signupContainer: {
    marginTop: sizes.screenHeight * 0.14,
  },

  centerText: {
    alignItems: 'center',
  },
  Signup: {
    fontSize: fontSize.h5,
    fontWeight: '600',
    color: colors.black,
    borderStyle: 'solid',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  textColor: {
    color: colors.grayText,
    fontSize: fontSize.smallM,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: sizes.screenHeight * 0.01,
  },
  buttonTop: {
    top: sizes.screenHeight * 0.03,
  },
});
