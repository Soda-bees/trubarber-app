import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },

  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth * 0.05,
    marginTop: sizes.screenHeight * 0.05,
  },

  openButtonborder: {
    borderStyle: 'solid',
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000044',
    paddingHorizontal: 20,
    paddingVertical: 2,
  },

  openButton: {
    fontSize: fontSize.smallM,
    color: colors.white,
    bottom: 1,
  },

  headerImage: {
    height: sizes.screenHeight * 0.4,
    width: sizes.screenWidth,
    borderBottomLeftRadius: sizes.screenWidth * 0.0562,
    borderBottomRightRadius: sizes.screenWidth * 0.0562,
  },

  openBg: {
    alignItems: 'center',
    width: sizes.screenWidth * 0.148,
    height: sizes.screenHeight * 0.021,
    justifyContent: 'center',
  },
  centerContent: {
    marginTop: sizes.screenHeight * 0.27,
    alignItems: 'center',
  },
  barberDetailscontainer: {
    backgroundColor: colors.lightgray,
    borderStyle: 'solid',
    borderWidth: sizes.screenWidth * 0.002,
    borderColor: colors.lightGray2,
    borderRadius: sizes.screenWidth * 0.02,
    height: sizes.screenHeight * 0.08,
    width: sizes.screenWidth * 0.79,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barberName: {
    fontSize: fontSize.large,
    marginLeft: sizes.screenWidth * 0.012,
    color: colors.black,
    fontWeight: '800',
  },
  alignedDetails: {
    marginTop: sizes.screenHeight * 0.012,
    marginLeft: sizes.screenHeight * 0.022,
    // backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  disabledText: {
    color: colors.disabledBg2,
  },

  reviewBtn: {
    width: sizes.screenWidth * 0.34,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.black,
  },

  pencil: {
    resizeMode: 'contain',
    height: 16,
    width: 16,
    marginRight: 8,
  },

  reviewBtnText: {
    color: colors.black,
    fontSize: fontSize.regular,
  },

  barberLocation: {
    fontSize: fontSize.small,
    color: colors.grayText,
  },
  redLocation: {
    justifyContent: 'flex-start',
    paddingRight: sizes.screenWidth * 0.021,
    height: sizes.screenHeight * 0.021,
    // backgroundColor : 'red',
  },

  containBookmark: {
    marginTop: sizes.screenHeight * 0.022,
    marginRight: sizes.screenHeight * 0.022,
    // backgroundColor: 'red',
    height: sizes.screenHeight * 0.0322,
    justifyContent: 'center',
    width: sizes.screenWidth * 0.054,
    alignItems: 'center',
  },
  bookmark: {
    height: sizes.screenHeight * 0.0262,
  },

  todoButtonscontainer: {
    marginTop: sizes.screenHeight * 0.032,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnColor: {
    backgroundColor: colors.pinkBtnbackground,
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.42,
    borderRadius: sizes.screenWidth * 0.04,
    marginRight: sizes.screenWidth * 0.03,
    marginLeft: sizes.screenWidth * 0.03,
    flexDirection: 'row',
  },
  direction: {
    height: sizes.screenHeight * 0.026,
  },
  btnText: {
    textAlign: 'center',
    color: colors.red,
    fontSize: fontSize.medium,
  },
  call: {
    borderStyle: 'solid',
    borderRightWidth: 0.5,
  },
  tabContainer: {
    marginTop: sizes.screenHeight * 0.032,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  tabs: {
    color: colors.black,
    fontWeight: '500',
    marginBottom: sizes.screenHeight * 0.012,
    fontSize: fontSize.medium,
    width: sizes.screenWidth * 0.2,
    textAlign: 'center',
  },
  borderBottom: {
    borderBottomWidth: sizes.screenWidth * 0.013,
    borderStyle: 'solid',
  },
  aboutContent: {
    color: colors.grayText,
    marginTop: sizes.screenHeight * 0.004,
    marginLeft: sizes.screenWidth * 0.092,
    marginRight: sizes.screenWidth * 0.092,
    // height:sizes.screenHeight * 0.25
  },
  btn: {
    position: 'absolute',
    top: sizes.screenHeight * 0.3,
    left: sizes.screenWidth * 0.08,
  },

  servicesContainer: {
    flexDirection: 'row',
    marginTop: sizes.screenHeight * 0.02,
    marginLeft: sizes.screenWidth * 0.0522,
    marginRight: sizes.screenWidth * 0.082,
    // paddingBottom : sizes.screenHeight * 0.030,
    // backgroundColor : 'red',
    width: sizes.screenWidth * 0.89,
    justifyContent: 'space-between',
  },
  serviceImagecontainer: {
    backgroundColor: colors.selectorcolor,
    width: sizes.screenWidth * 0.17,
    height: sizes.screenHeight * 0.082,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.04,
  },
  serviceImageresize: {
    height: sizes.screenWidth * 0.1,
    width: sizes.screenWidth * 0.1,
  },
  flexCol: {
    marginTop: sizes.screenHeight * 0.012,
    marginLeft: sizes.screenWidth * 0.022,
    flexDirection: 'column',
    // backgroundColor: 'red',
    width: sizes.screenWidth * 0.472,
  },
  title: {
    color: colors.black,
    fontWeight: '800',
  },
  description: {
    color: colors.grayText,
    fontSize: fontSize.small,
  },
  serviceTime: {
    color: colors.grayText,
    fontSize: fontSize.small,
    marginTop: sizes.screenHeight * 0.012,
    marginLeft: sizes.screenWidth * 0.042,
  },
  descriptionExtended: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookButton: {
    backgroundColor: colors.btnColor,
    marginLeft: sizes.screenWidth * 0.022,
    marginBottom: sizes.screenHeight * 0.005,
    height: sizes.screenHeight * 0.027,
    width: sizes.screenWidth * 0.16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.02,
  },
  bookWhite: {
    color: colors.white,
    fontSize: fontSize.small,
  },
  endContainer: {
    // backgroundColor: 'orange',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  serviceSpacebottom: {
    marginBottom: sizes.screenHeight * 0.03,
  },
  reviewsCenter: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.028,
    borderStyle: 'solid',
    borderBottomWidth: 0.4,
  },
  starNumber: {
    color: colors.black,
    fontSize: fontSize.h5,
    fontWeight: '900',
  },

  ratingData: {
    marginRight: sizes.screenWidth * 0.122,
    marginLeft: sizes.screenWidth * 0.122,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'orange',
    width: sizes.screenWidth * 0.812,
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.012,
  },
  profilePic: {
    borderRadius: sizes.screenWidth * 0.3,
    height: sizes.screenHeight * 0.052,
    width: sizes.screenWidth * 0.11,
  },
  rowAndmargin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignItems: {
    marginLeft: sizes.screenWidth * 0.072,
    marginTop: sizes.screenHeight * 0.0122,
  },
  usernameAllignment: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.black,
  },
  time: {
    fontSize: fontSize.small,
    color: colors.grayText,
  },
  startContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.screenWidth * 0.0222,
    height: sizes.screenHeight * 0.022,
  },
  descriptionContainer: {
    color: colors.grayText,
    fontSize: fontSize.small,
    marginTop: sizes.screenHeight * 0.012,
    marginRight: sizes.screenWidth * 0.022,
    marginLeft: sizes.screenWidth * 0.03,
    marginBottom: sizes.screenHeight * 0.02,
  },

  scrollView: {
    height: sizes.screenHeight * 0.28,
    marginTop: 10,
    // flex: 1,
  },

  ratingContainer: {
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    marginTop: 16,
    alignItems: 'center',
  },

  profile: {
    height: 70,
    width: 70,
    borderRadius: 70,
  },

  userRow: {
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  userRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userName: {
    fontSize: fontSize.regular,
    color: colors.black,
    fontWeight: '500',
    marginLeft: 8,
  },

  deleteIconn: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },

  disabledText2: {
    fontSize: fontSize.regular,
    color: colors.black,
    marginVertical: 8,
  },

  instructionsContainer: {
    height: sizes.screenHeight * 0.1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.disabledBg,
    marginTop: sizes.screenHeight * 0.02,
    marginBottom: sizes.screenHeight * 0.01,
    width: sizes.screenWidth * 0.9,
  },

  descriptionInput: {
    fontFamily: 'Satoshi-Medium',
    fontSize: fontSize.smallM,
    color: colors.black,
    maxWidth: sizes.screenWidth * 0.86,
  },

  buttonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.08,
  },

  modalMainView: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.9,
    borderRadius: sizes.screenWidth * 0.05,
    paddingVertical: 15,
  },
  modalMessage: {
    color: colors.black,
    alignSelf: 'center',
    paddingHorizontal: 15,
    fontSize: fontSize.medium,
    width: sizes.screenWidth * 0.85,
    textAlign: 'center',
  },
  btnMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  btnView1: {
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.05,
    width: sizes.screenWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.btnColor,
  },
  btnText1: {
    color: colors.white,
    fontSize: fontSize.h6,
  },
  btnView: {
    borderWidth: 1,
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.05,
    width: sizes.screenWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: colors.black,
    fontSize: fontSize.h6,
  },
});
