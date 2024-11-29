import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backArrow: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.03,
  },
  Forgotpass: {
    marginTop: sizes.screenHeight * 0.03,
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: sizes.screenHeight * 0.05,
  },
  addimage: {
    width: sizes.screenWidth * 0.2,
    height: sizes.screenHeight * 0.1,
    borderRadius: sizes.screenWidth * 0.04,
  },

  containtext: {
    alignItems: 'center',
  },
  subText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.01,
    color: colors.grayText,
    fontWeight: '500',
  },

  uploadImage: {
    marginTop: sizes.screenHeight * 0.03,
    borderRadius: sizes.screenWidth * 0.04,
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.selectorcolor,
  },

  uploadPress: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.012,
  },

  uploadPressIOS: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.022,
  },

  uploadCover: {
    color: colors.black,
    fontWeight: '600',
    fontSize: fontSize.medium,
  },
  content: {
    // marginHorizontal: sizes.screenWidth * 0.08,
    marginTop: sizes.screenHeight * 0.012,
    gap: sizes.screenHeight * 0.02,
  },
  textContainer: {
    alignSelf: 'center',
  },
  timeContainer: {
    alignSelf: 'center',
  },

  clockIcon: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
    position: 'absolute',
    right: sizes.screenWidth * 0.03,
    top: sizes.screenWidth * 0.025,
    tintColor: colors.black,
  },
  instagramIcon: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
    position: 'absolute',
    left: sizes.screenWidth * 0.03,
    top: sizes.screenWidth * 0.026,
    tintColor: colors.black,
  },
  clockIcon1: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
  },

  title: {
    color: colors.durationColor,
    fontSize: fontSize.small,
    marginStart: sizes.screenWidth * 0.01,
    paddingBottom: sizes.screenWidth * 0.01,
  },

  titleIOS: {
    color: colors.durationColor,
    fontSize: fontSize.small,
    marginVertical: sizes.screenHeight * 0.007,
  },
  imagestyle: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.3,
    borderRadius: sizes.screenWidth * 0.04,
    backgroundColor: colors.selectorcolor,
  },
  description: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    paddingHorizontal: sizes.screenWidth * 0.02,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
  },
  time: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
    height: sizes.screenWidth * 0.09,
    alignItems: 'start',
    justifyContent: 'center',
  },
  timeSecond: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
    height: sizes.screenWidth * 0.1,
    alignItems: 'start',
    justifyContent: 'center',
  },
  instagramInput: {
    // backgroundColor:'red',
    fontSize: fontSize.small,
    marginLeft: sizes.screenWidth * 0.08,
    fontWeight: '500',
    color: colors.black,
  },
  instagramInputIOS: {
    fontSize: fontSize.small,
    marginLeft: sizes.screenWidth * 0.08,
    fontWeight: '500',
    color: colors.black,
    width: sizes.screenWidth * 0.8,
    paddingVertical: 11,
    paddingLeft: 3,
  },
  descriptionIOS: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    paddingHorizontal: sizes.screenWidth * 0.02,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
    height: sizes.screenHeight * 0.1,
    paddingTop: 10,
  },
  descriptionTwo: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.83,
    marginStart: sizes.screenWidth * 0.01,
  },
  descriptionTwoIOS: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.83,
  },

  nextBtn: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.07,
    alignSelf: 'center',
  },
  nextBtnIOS: {
    marginTop:30,
    marginBottom:100,
    // position: 'absolute',
    // bottom: sizes.screenHeight * 0.09,
    // alignSelf: 'center',
  },
  daysContainer: {
    width: sizes.screenWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  daysTouchable: {
    height: sizes.screenWidth * 0.11,
    width: sizes.screenWidth * 0.118,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: sizes.screenWidth * 0.03,
  },
  daysTouchableSelected: {
    backgroundColor: colors.black,
    height: sizes.screenWidth * 0.11,
    width: sizes.screenWidth * 0.118,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: sizes.screenWidth * 0.03,
  },
  daysText: {
    fontSize: fontSize.smallM,
    color: colors.black,
    fontWeight: '500',
  },
  daysTextSelected: {
    fontSize: fontSize.smallM,
    color: colors.white,
    fontWeight: '500',
  },
  daysContainerIOS: {
    width: sizes.screenWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  toggleBtn: {
    backgroundColor: colors.outlineColor,
    width: sizes.screenWidth * 0.13,
    height: sizes.screenHeight * 0.06,
    borderRadius: sizes.screenWidth * 0.03,
    justifyContent: 'center',
  },

  toggleBtnUnactive: {
    backgroundColor: colors.darkerBordercolor,
    width: sizes.screenWidth * 0.13,
    height: sizes.screenHeight * 0.06,
    borderRadius: sizes.screenWidth * 0.03,
    justifyContent: 'center',
  },

  toggleBtnColor: {
    backgroundColor: 'green',
    width: sizes.screenWidth * 0.05,
    height: sizes.screenHeight * 0.025,
    borderRadius: sizes.screenWidth * 0.1,
    alignSelf: 'center',
  },

  toggleBtnColorRed: {
    backgroundColor: 'red',
    width: sizes.screenWidth * 0.05,
    height: sizes.screenHeight * 0.025,
    borderRadius: sizes.screenWidth * 0.1,
    alignSelf: 'center',
  },

  dayTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.75,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: 10,
    marginLeft: 10,
    backgroundColor: colors.outlineColor,
  },
  dayTimeViewUnactive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.75,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: 10,
    marginLeft: 10,
    backgroundColor: colors.darkerBordercolor,
  },

  scheduleDay: {
    fontSize: fontSize.medium,
    fontWeight: '500',
  },

  scheduleMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center'
  },
});
