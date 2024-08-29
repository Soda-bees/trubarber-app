import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  backgroundColor: {
    backgroundColor: colors.pinkishwhite,
  },
  transparentBg: {
    height: sizes.screenHeight * 0.12,
    width: sizes.screenWidth,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizes.screenWidth * 0.04,
    borderWidth: sizes.screenWidth * 0.004,
    borderColor: colors.darkerBordercolor,
    marginRight: sizes.screenWidth * 0.1,
    marginLeft: sizes.screenWidth * 0.1,
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 0.062,
    marginTop: sizes.screenHeight * 0.092,
  },
  input: {
    color: colors.black,
    width: sizes.screenWidth * 0.67,
  },
  search: {
    height: sizes.screenHeight * 0.0243,
  },

  toggleContainer: {
    borderWidth: sizes.screenWidth * 0.004,
    borderColor: colors.darkerBordercolor,
    height: sizes.screenHeight * 0.06,
    marginTop: sizes.screenHeight * 0.06,
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

  textColorwhite: {
    color: colors.white,
    fontSize: fontSize.medium,
  },

  inActive: {
    width: sizes.screenWidth * 0.32,
    height: sizes.screenHeight * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },

  toggleTextsize: {
    fontSize: fontSize.medium,
    color: colors.black,
  },

  contentMargin: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: sizes.screenWidth*0.912,
    alignSelf: 'center'
  },
  contentMarginIOS: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: sizes.screenWidth*0.912,
    alignSelf: 'center'
  },

  containerImage: {
    width: sizes.screenWidth * 0.44,
    height: sizes.screenHeight * 0.24,
    borderRadius: 12,
  },
  
  containerImageIOS: {
    width: sizes.screenWidth * 0.44,
    height: sizes.screenHeight * 0.24,
    borderRadius: 12,
  },

  row: {
    marginTop: sizes.screenHeight * 0.019,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: sizes.screenWidth * 0.03,
  },

  textWhite: {
    color: colors.white,
    fontSize: fontSize.small,
  },

  marginTop: {
    marginTop: sizes.screenHeight * 0.107,
  },
  bluredImg: {
    height: sizes.screenHeight * 0.099,
    borderRadius: sizes.screenHeight * 0.012,
    width: sizes.screenWidth * 0.392,
    opacity: 0.9,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center'
  },

  textDarkerblack: {
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.small,
    marginLeft: sizes.screenWidth*0.02,
    marginTop: sizes.screenHeight*0.01
  },
  textBlack: {
    color: colors.black,
    fontSize: fontSize.extraSmall,
    fontWeight: '700',
  },
  appointmentContainer: {
    gap: 6,
  },
  locationContainer: {
    left: sizes.screenWidth * 0.01,
    alignItems: 'center',
    flexDirection: 'row',
  },
  locationImg: {
    width: sizes.screenWidth * 0.04,
    height: sizes.screenHeight * 0.013,
  },
  bookBtn: {
    backgroundColor: colors.black,
    height: sizes.screenHeight * 0.032,
    width: sizes.screenWidth * 0.36,
    borderRadius: sizes.screenWidth * 0.022,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  btnText: {
    fontSize: fontSize.small,
    color: colors.white,
    marginLeft: sizes.screenWidth * 0.042,
  },
  arrowStyle: {
    height: sizes.screenHeight * 0.012,
  },

  bottomNav: {
    height: sizes.screenHeight * 0.102,
  },
  bottonNavimg: {
    height: sizes.screenHeight * 0.032,
  },
  navMargin: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  serviceImagecontainer: {
    backgroundColor: colors.selectorcolor,
    width: sizes.screenWidth * 0.4,
    height: sizes.screenHeight * 0.182,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.screenHeight * 0.02,
    gap: sizes.screenHeight * 0.012,
  },
  serviceImageresize: {
    width: sizes.screenWidth * 0.152,
    height: sizes.screenHeight * 0.09,
  },

  serviceTexts: {
    color: colors.black,
    fontWeight: '700',
  },
  services: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes.screenHeight * 0.022,
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.042,
  },
  scrollContainer: {
    // marginTop: sizes.screenHeight * 0.02,
    // marginBottom: sizes.screenHeight * 0.09,
    // backgroundColor:''
  },
});
