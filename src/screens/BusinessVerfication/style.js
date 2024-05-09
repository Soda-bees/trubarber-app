import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },

  backArrow: {
    marginLeft: sizes.screenWidth * 0.042,
    marginTop: sizes.screenHeight * 0.03,
  },
  forgotPass: {
    marginTop: sizes.screenHeight * 0.05,
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '700',
  },
  containtext: {
    alignItems: 'center',
  },

  addimage:{
    height: sizes.screenHeight * 0.08
  },
  subText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.01,
    color: colors.grayText,
    fontWeight: '500',
    fontSize: fontSize.medium,
    marginLeft: sizes.screenWidth * 0.242,
    marginRight: sizes.screenWidth * 0.242,
  },

  uploadImage: {
    marginTop: sizes.screenHeight * 0.04,
    borderRadius: sizes.screenWidth * 0.02,
    width: sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.selectorcolor
  },

  imageUploadbuttonsContainer: {
    marginTop: sizes.screenHeight * 0.03,
    marginLeft: sizes.screenWidth * 0.12,
    marginRight: sizes.screenWidth * 0.12,
    height: sizes.screenHeight * 0.06,
    borderRadius: sizes.screenWidth * 0.04,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: sizes.screenWidth * 0.003,
  },
  imageResize: {
    width: sizes.screenWidth * 0.042,
    resizeMode: 'contain',
  },
  textSize: {
    marginStart: sizes.screenWidth * 0.02,
    fontSize: fontSize.smallM,
    color: colors.grayText,
    fontWeight: '500',
  },
  imagestyle: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.2,
    borderRadius: sizes.screenWidth * 0.04,
    backgroundColor: colors.selectorcolor,
  },
  nextBtn: {
    top: sizes.screenHeight * 0.23,
  },
  nextBtnIOS: {
    top: sizes.screenHeight * 0.16,
  },

  smallText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.03,
    marginLeft: sizes.screenWidth * 0.12,
    marginRight: sizes.screenWidth * 0.12,
    fontSize: fontSize.small,
    color: colors.black,
  },
  borderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes.screenHeight * 0.022,
    gap: sizes.screenWidth * 0.04,
    marginLeft: sizes.screenWidth * 0.23,
    marginRight: sizes.screenWidth * 0.23,
  },
  gapText: {
    color: colors.borderspacecolor,
    fontSize: fontSize.small,
  },

  border: {
    borderTopWidth: sizes.screenWidth* 0.003,
    width: sizes.screenWidth * 0.1,
    borderColor: colors.borderspacecolor,
  },
  imageSmall: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenHeight * 0.03,
  },
  textBlack: {
    color: colors.black,
  },

  galleryContainer: {
    marginTop: sizes.screenHeight * 0.022,
    gap: sizes.screenWidth * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  directionRow: {},
});
