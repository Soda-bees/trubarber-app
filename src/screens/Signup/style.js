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
    marginTop: sizes.screenWidth * 0.12,
    // marginTop: sizes.screenWidth * 0.12,
    marginBottom: sizes.screenWidth * 0.032,
    fontWeight: '700',
    color: colors.black,
  },

  fontWeight: {
    color: colors.grayText,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: sizes.screenHeight * 0.02,
  },

  inputContainer: {
    backgroundColor: colors.selectorcolor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.07,
  },

  inputEmailcontainer: {
    marginTop: sizes.screenHeight * 0.03,
    backgroundColor: colors.selectorcolor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.07,
  },

  inputfields: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.01,
    marginRight: sizes.screenWidth * 0.04,
  },

  input: {
    width: sizes.screenWidth * 0.68,
    color: colors.black,
    marginLeft: sizes.screenWidth * 0.017,
  },

  inputImage: {
    marginStart: sizes.screenWidth * 0.05,
    height: sizes.screenHeight * 0.025,
    marginStart: sizes.screenWidth * 0.02,
  },
  eye: {
    height: sizes.screenHeight * 0.03,
  },

  forgotPass: {
    marginTop: sizes.screenHeight * 0.06,
  },

  inputPasswordcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.selectorcolor,
    height: sizes.screenHeight * 0.07,
    marginTop: sizes.screenHeight * 0.03,
    borderRadius: sizes.screenWidth * 0.03,
  },
  SignupContainer: {
    marginTop: sizes.screenHeight * 0.08,
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
  textContainer: {
    marginTop: sizes.screenHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textOpacity: {
    textAlign: 'center',
    width: sizes.screenWidth * 0.7,
    fontSize: fontSize.smallM,
    color: colors.disabledBg2,
  },

  toasterStyle:{
    position:"absolute",
    alignSelf:'center',
    // marginTop:sizes.screenHeight * 0.11
    // marginBottom:sizes.screenHeight * 0.5
  },
});
