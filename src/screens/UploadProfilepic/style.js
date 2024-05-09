import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },

  backArrow: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,

  },
  forgetPass: {
    marginTop: sizes.screenHeight * 0.05,
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '700',
  },
  containtext: {
    alignItems: 'center',
  },
  subText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.01,
    color: colors.grayText,
    // fontWeight: '500',
  },

  uploadImage: {
    // marginTop: sizes.screenHeight * 0.04,
    // marginLeft: sizes.screenWidth * 0.12,
    // marginRight: sizes.screenWidth * 0.12,
    // borderRadius: sizes.screenWidth * 0.04,
    // alignItems: 'center',
    // backgroundColor: colors.selectorcolor,
    // width:sizes.screenWidth* 0.75,
    // height:sizes.screenHeight* 0.18,

    marginTop: sizes.screenHeight * 0.04,
    borderRadius: sizes.screenWidth * 0.04,
    width: sizes.screenWidth * 0.75,
    height: sizes.screenHeight * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.selectorcolor
  },

  imagestyle: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.2,
    borderRadius: sizes.screenWidth * 0.04,
    backgroundColor: colors.selectorcolor,
  },
  addimage: {
    width: sizes.screenWidth * 0.2,
    height: sizes.screenHeight * 0.1,
    borderRadius: sizes.screenWidth * 0.04,
    backgroundColor: colors.selectorcolor,
  },

  imageUploadbuttonsContainer: {
    marginTop: sizes.screenHeight * 0.03,
    // marginLeft: sizes.screenWidth * 0.042,
    // marginRight: sizes.screenWidth * 0.042,
    alignSelf: 'center',
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenWidth * 0.04,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: sizes.screenWidth * 0.003,
  },
  imageResize: {
    width: sizes.screenWidth * 0.05,
    resizeMode: 'contain',
  },
  textSize: {
    marginStart: sizes.screenWidth * 0.02,
    color: colors.grayText,
    fontWeight: '500',
  },

  nextBtn: {
   top: sizes.screenHeight * 0.29,
  },

  nextBtnIOS: {
   top: sizes.screenHeight * 0.24,
  },
});
