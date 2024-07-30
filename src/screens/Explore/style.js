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
    height: sizes.screenHeight * 0.17,
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
    marginTop: sizes.screenHeight * 0.023,
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
    marginTop: sizes.screenHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationRow: {
    flexDirection: 'row',
    height: sizes.screenHeight * 0.064,
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
  },
  locationContainertop: {
    backgroundColor: colors.pinkBtnbackground,
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
  },
  otherIconRow: {
    flexDirection: 'row',
    height: sizes.screenHeight * 0.064,
    borderRadius: sizes.screenWidth * 0.04,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: sizes.screenWidth * 0.29,
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
    gap: sizes.screenWidth * 0.08,
    paddingRight: sizes.screenWidth * 0.08,
    paddingBottom: sizes.screenHeight * 0.08,
  },
  cardRowIOS: {
    marginStart: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.09,
    paddingRight: sizes.screenWidth * 0.08,
    paddingBottom: sizes.screenHeight * 0.08,
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

  containerImage: {
    // marginTop: sizes.screenHeight * 0.012,
    width: sizes.screenHeight * 0.22,
    height: sizes.screenHeight * 0.24,
    borderRadius: sizes.screenWidth * 0.042,
    // borderRadius: 22,
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

  marginCardtop: {
    marginTop: sizes.screenHeight * 0.092,
  },
  bluredImg: {
    height: sizes.screenHeight * 0.099,
    marginLeft: sizes.screenWidth * 0.03,
    marginRight: sizes.screenWidth * 0.03,
    borderRadius: sizes.screenHeight * 0.012,
    width: sizes.screenWidth * 0.392,
    opacity: 0.9,
  },

  textDarkerblack: {
    // backgroundColor: 'orange',
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.small,
  },
  textBlack: {
    color: colors.black,
    fontSize: fontSize.small,
    fontWeight: '700',
  },
  appointmentContainer: {
    // backgroundColor: 'red',
    marginLeft: sizes.screenWidth * 0.042,
    marginTop: sizes.screenHeight * 0.009,
    gap: sizes.screenHeight * 0.007,
  },
  locationContainer: {
    // marginTop: sizes.screenHeight * 0.007,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  locationImg: {
    width: sizes.screenWidth * 0.04,
    // backgroundColor: 'purple',
    height: sizes.screenHeight * 0.013,
  },
  bookBtn: {
    // marginBottom: sizes.screenHeight * 0.02,
    backgroundColor: colors.btnColor,
    height: sizes.screenHeight * 0.032,
    width: sizes.screenWidth * 0.362,
    borderRadius: sizes.screenWidth * 0.022,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
