import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  laoderContainer: {
    backgroundColor: '#FBFAFA',
    height: sizes.screenHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundColor: {
    backgroundColor: colors.pinkishwhite,
  },
  transparentBg: {
    height: sizes.screenHeight * 0.14,
    width: sizes.screenWidth,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizes.screenWidth * 0.04,
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.emptyStar,
    marginHorizontal: sizes.screenWidth * 0.05,
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 0.062,
    justifyContent: 'center',
  },
  search: {
    height: sizes.screenHeight * 0.024,
  },
  input: {
    color: colors.black,
    width: sizes.screenWidth * 0.78,
  },
  mapContainer: {
    // marginTop: sizes.screenHeight * 0.07,
    height: sizes.screenHeight * 0.23,
    width: sizes.screenWidth * 0.9,
    borderRadius: sizes.screenWidth * 0.04,
    alignSelf: 'center',
    borderWidth: sizes.screenWidth * 0.002,
    borderColor: colors.darkerBordercolor,
    overflow: 'hidden',
  },
  topIconRow: {
    flexDirection: 'row',
    marginHorizontal: sizes.screenWidth * 0.05,
    height: sizes.screenHeight * 0.064,
    marginVertical: sizes.screenHeight * 0.02,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationRow: {
    flexDirection: 'row',
    height: sizes.screenHeight * 0.064,
    width: sizes.screenWidth * 0.45,
    backgroundColor: colors.lightgray,
    borderRadius: sizes.screenWidth * 0.04,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.02,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  locationDetailColumn: {
    marginStart: sizes.screenWidth * 0.02,
    marginEnd: sizes.screenWidth * 0.04,
  },
  nearbyTxt: {
    color: colors.gray,
    fontSize: fontSize.small,
    fontWeight: '400',
  },
  currentLocationTxt: {
    color: colors.black,
    fontSize: fontSize.small,
    fontWeight: 'bold',
    width: sizes.screenWidth * 0.27,
    overflow: 'hidden',
  },
  locationContainertop: {
    backgroundColor: colors.grayBorder,
    height: sizes.screenHeight * 0.046,
    width: sizes.screenWidth * 0.09,
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContainer: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 0.064,
    width: sizes.screenWidth * 0.13,
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    // marginEnd:sizes.screenWidth* 0.02
  },
  iconImage: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenWidth * 0.042,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  otherIconRow: {
    flexDirection: 'row',
    height: sizes.screenHeight * 0.064,
    borderRadius: sizes.screenWidth * 0.04,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: sizes.screenWidth * 0.43,
  },
  mapStyle: {
    height: sizes.screenHeight * 0.3,
    width: sizes.screenWidth * 0.9,
    borderRadius: sizes.screenWidth * 0.04,
  },
  marginTop: {
    marginVertical: 4,
  },
  heading: {
    color: colors.black,
    fontSize: fontSize.extraLarge,
    fontWeight: '700',
    marginHorizontal: sizes.screenWidth * 0.05,
    marginBottom: 4,
  },
  headingAndroid: {
    color: colors.black,
    fontSize: fontSize.extraLarge,
    fontWeight: '700',
    marginHorizontal: sizes.screenWidth * 0.05,
    marginBottom: sizes.screenHeight * 0.008,
    marginTop: sizes.screenHeight * 0.015,
  },
  categoryRow: {
    marginStart: sizes.screenWidth * 0.05,
    marginTop: sizes.screenHeight * 0.01,
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.02,
    paddingRight: sizes.screenWidth * 0.05,
  },
  cardRow: {
    marginStart: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.04,
    paddingRight: sizes.screenWidth * 0.08,
    paddingBottom: sizes.screenHeight * 0.08,
  },
  cardRowNew: {
    marginStart: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.04,
    paddingRight: sizes.screenWidth * 0.08,
    paddingBottom: sizes.screenHeight * 0.02,
  },
  cardRowIOS: {
    marginStart: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    gap: 12,
    paddingRight: sizes.screenWidth * 0.08,
    paddingBottom: sizes.screenHeight * 0.055,
    // backgroundColor:'red'
  },
  categoryBox: {
    height: sizes.screenHeight * 0.1,
    width: sizes.screenWidth * 0.45,
    borderRadius: sizes.screenWidth * 0.02,
    backgroundColor: colors.userBarbertoggle,
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes.screenHeight * 0.005,
  },
  categoryTxt: {
    color: colors.black,
    // marginTop: sizes.screenHeight * 0.01,
    fontSize: fontSize.small,
  },

  imageResize: {
    height: sizes.screenWidth * 0.09,
    width: sizes.screenWidth * 0.09,
  },
  contentMargin: {
    marginLeft: sizes.screenWidth * 0.052,
    marginRight: sizes.screenWidth * 0.052,
    // marginTop: sizes.screenHeight * 0.02,
    // backgroundColor: 'red',
    height: sizes.screenHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.052,
  },

  contentMargin: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: sizes.screenWidth * 0.912,
    alignSelf: 'center',
  },

  contentMarginIOS: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: sizes.screenWidth * 0.912,
    alignSelf: 'center',
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
    color: colors.black,
    fontSize: fontSize.small,
  },

  bluredImg: {
    height: sizes.screenHeight * 0.099,
    borderRadius: sizes.screenHeight * 0.012,
    width: sizes.screenWidth * 0.392,
    opacity: 0.9,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },

  textDarkerblack: {
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.small,
    marginLeft: sizes.screenWidth * 0.02,
    marginTop: sizes.screenHeight * 0.01,
  },
  textBlack: {
    color: colors.black,
    fontSize: fontSize.extraSmall,
    fontWeight: '700',
  },
  textBlackBarberLocation: {
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
    // backgroundColor: 'purple',
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
    alignSelf: 'center',
  },
  btnText: {
    fontSize: fontSize.small,
    color: colors.white,
    marginLeft: sizes.screenWidth * 0.042,
  },
  arrowStyle: {
    height: sizes.screenHeight * 0.012,
    // backgroundColor: 'orange'
  },
  scrollContainer: {
    marginTop: sizes.screenHeight * 0.05,
    marginBottom: sizes.screenHeight * 0.025,
  },

  paddingBtm: {
    paddingBottom: sizes.screenHeight * 0.1,
  },

  lottie: {
    width: sizes.screenWidth * 0.96,
    height: sizes.screenHeight,
    marginBottom: sizes.screenHeight * 0.06,
  },

  locationImgIcon: {
    width: sizes.screenWidth * 0.25,
    height: sizes.screenWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex:1,
    // backgroundColor:'black'
  },

  markerIngStyle: {
    width: sizes.screenWidth * 0.08,
    height: sizes.screenWidth * 0.08,
    backgroundColor: 'red',
    marginBottom: 25,
    borderRadius: sizes.screenWidth * 0.1,
    borderColor: colors.white,
    borderWidth: 1,
  },

  loaderStyle: {
    alignSelf: 'start',
  },

  modalContainer: {
    width: sizes.screenWidth * 0.8,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.02,
    paddingVertical:15
  },

  modalTextHeading: {
    fontSize: sizes.fontLarge,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: sizes.screenHeight * 0.01,
    alignSelf: 'center',
  },

  modalMessage: {
    fontSize: sizes.fontMedium,
    color: colors.blackGrey,
    textAlign: 'center',
    marginBottom: sizes.screenHeight * 0.02,
  },

  supportButton: {
    backgroundColor: colors.primary,
    padding: sizes.screenHeight * 0.015,
    borderRadius: 5,
    width: sizes.screenWidth * 0.7,
    alignSelf:'center',
    // flex: 1,
    // marginLeft: sizes.screenWidth * 0.02,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: sizes.fontMedium,
    fontWeight: 'bold',
  },
});
