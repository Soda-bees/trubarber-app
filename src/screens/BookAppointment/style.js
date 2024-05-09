import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },

  headerImage: {
    height: sizes.screenHeight * 0.4,
    width: sizes.screenWidth,
    borderBottomLeftRadius: sizes.screenWidth * 0.0562,
    borderBottomRightRadius:  sizes.screenWidth * 0.0562,
  },

  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.06,
  },

  headerContainer: {
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  openButtonborder: {
    borderStyle: 'solid',
    marginTop: sizes.screenHeight * 0.059,
    marginRight: sizes.screenWidth * 0.059,
    borderColor: colors.white,
    borderWidth: sizes.screenWidth*0.002,
    width: sizes.screenWidth * 0.152,
    borderRadius: sizes.screenWidth*0.02,
    height: sizes.screenHeight * 0.025,
    alignItems: 'center',
    justifyContent: 'center',
  },

  openButton: {
    fontSize: fontSize.small,
    color:colors.white,
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
    borderWidth: sizes.screenWidth*0.002,
    borderColor: colors.lightGray2,
    borderRadius: sizes.screenWidth*0.02,
    height: sizes.screenHeight * 0.08,
    width: sizes.screenWidth * 0.79,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barberName: {
    fontSize: fontSize.large,
    marginLeft: sizes.screenWidth * 0.012,
    color:colors.black,
    fontWeight: '800',
  },
  alignedDetails: {
    marginTop: sizes.screenHeight * 0.012,
    marginLeft: sizes.screenHeight * 0.022,
    // backgroundColor: 'red',
  },
  row: {
    // backgroundColor :  'red',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent : 'flex-start'
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
    height: sizes.screenHeight * 0.072,
    width: sizes.screenWidth * 0.154,
    borderRadius: sizes.screenWidth* 0.04,
    marginRight: sizes.screenWidth * 0.062,
    marginLeft: sizes.screenWidth * 0.062,
  },
  direction: {
    height: sizes.screenHeight * 0.026,
  },
  btnText: {
    textAlign: 'center',
    marginRight: sizes.screenWidth * 0.062,
    marginLeft: sizes.screenWidth * 0.062,
    color: colors.grayText,
    marginTop: sizes.screenHeight * 0.012,
  },
  call: {
    borderStyle: 'solid',
    borderLeftWidth: 0.5,
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
    borderBottomWidth: sizes.screenWidth* 0.013,
    borderStyle: 'solid',
  },
  aboutContent: {
    color: colors.grayText,
    marginTop: sizes.screenHeight * 0.032,
    marginLeft: sizes.screenWidth * 0.092,
    marginRight: sizes.screenWidth * 0.092,
  },
  btn: {
    marginTop: sizes.screenHeight * 0.052,
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
    borderRadius: sizes.screenWidth*0.04,
  },
  serviceImageresize: {
    height: sizes.screenHeight * 0.04,
  },
  flexCol: {
    marginTop: sizes.screenHeight * 0.012,
    marginLeft: sizes.screenWidth * 0.022,
    flexDirection: 'column',
    // backgroundColor: 'red',
    width: sizes.screenWidth * 0.472,
  },
  title: {
    color:colors.black,
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
    borderRadius: sizes.screenWidth* 0.02,
  },
  bookWhite: {
    color:colors.white,
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
  ratingContainer: {
    alignItems: 'center',
    borderStyle: 'solid',
    marginLeft: sizes.screenWidth * 0.0312,
    marginRight: sizes.screenWidth * 0.0312,
    borderWidth: sizes.screenWidth* 0.005,
    borderColor: colors.bordercolorgray,
    borderRadius: sizes.screenWidth* 0.02,
    marginTop: sizes.screenHeight * 0.012,
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
    borderRadius: sizes.screenWidth* 0.3,
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
  // reviewContainer: {
  //   height : sizes.screenHeight
  // },
});
