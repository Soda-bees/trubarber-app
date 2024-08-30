import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 1.05,
  },
  containerIOS: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 0.9,
  },

  backArrow: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },
  forgetPass: {
    marginTop: sizes.screenHeight * 0.03,
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
    backgroundColor: colors.selectorcolor,
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
    position: 'absolute',
    bottom: sizes.screenHeight * 0.06,
    alignSelf: 'center',
  },

  nextBtnIOS: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.02,
  },
  genderContainer: {
    alignSelf: 'center',
    width: sizes.screenWidth * 0.85,
    height: sizes.screenWidth * 0.12,
    paddingHorizontal: sizes.screenWidth * 0.04,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: sizes.screenWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bluishWhite,
    zIndex: 1,
  },
  genderSelectText: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
  },
  genderArrow: {
    width: sizes.screenWidth * 0.03,
    height: sizes.screenWidth * 0.03,
  },
  dropdownContainer: {
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    backgroundColor: colors.selectorcolor,
    borderRadius: sizes.screenWidth * 0.02,
  },
  optionTouchable: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenWidth * 0.015,
  },
  genderMainContainer: {
    marginTop: 13,
    backgroundColor: colors.selectorcolor,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.04,
  },
});
