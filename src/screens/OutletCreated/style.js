import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },

  backArrow: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.03,
  },
  forgotPass: {
    marginTop: sizes.screenHeight * 0.08,
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '700',
    marginLeft: sizes.screenWidth * 0.242,
    marginRight: sizes.screenWidth * 0.242,
  },
  containtext: {
    alignItems: 'center',
  },
  nextBtn: {
    position:'absolute',
    alignSelf:'center',
    bottom: sizes.screenHeight * 0.07,
  },
  nextBtnIOS: {
    top: sizes.screenHeight * 0.42,
  },

  grats: {
    justifyContent: 'center',
    alignItems: 'center',
    top: sizes.screenHeight * 0.17,
    gap: sizes.screenHeight * 0.022,
  },
  title: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '800',
  },
  subText: {
    marginLeft: sizes.screenHeight * 0.1,
    textAlign: 'center',
    marginRight: sizes.screenHeight * 0.1,
    color: colors.gratsText,
  },

  resizeImg: {
    height: sizes.screenHeight * 0.1,
  },

  gratsText: {
    alignItems: 'center',
    gap: sizes.screenHeight * 0.012
  },

  textBlack: {
    color: colors.black,
  },

  btnView: {
    marginTop:sizes.screenHeight* 0.02,
    backgroundColor: colors.btnColor,
    padding: sizes.screenWidth * 0.04,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnViewLoader: {
    marginTop:sizes.screenHeight* 0.02,
    backgroundColor: colors.btnColor,
    padding: sizes.screenWidth * 0.03,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    marginLeft : sizes.screenWidth * 0.032,
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: '600',
    fontSize: fontSize.h6,
  },

});
