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
    height: sizes.screenHeight * 0.17,
    width: sizes.screenWidth,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizes.screenWidth * 0.08,
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
    marginTop: sizes.screenHeight * 0.07,
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
  containerBody: {
    // marginTop: sizes.screenHeight * 0.05,
    paddingHorizontal: sizes.screenWidth * 0.06,
  },
  headingSchedule: {
    color: colors.black,
    fontSize: fontSize.h6,
    fontWeight: '600',
  },
  txtBelowSchedule: {
    marginTop: sizes.screenHeight * 0.01,
    color: colors.gratsText,
    fontSize: fontSize.smallM,
    width: sizes.screenWidth * 0.75,
    lineHeight: sizes.screenHeight * 0.02,
    fontWeight: '500',
  },
  clientView: {
    marginTop: sizes.screenHeight * 0.02,
  },
  clientHeading: {
    color: colors.blackishGray,
    fontSize: fontSize.smallM,
    fontWeight: '500',
  },
  clientContianer: {
    marginTop: sizes.screenHeight * 0.01,
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.88,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.01,
    borderColor: colors.outlineColor,
    borderWidth: sizes.screenWidth * 0.003,
    paddingHorizontal: sizes.screenWidth * 0.06,
    paddingVertical: sizes.screenHeight * 0.01,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientRowBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientBoxImg: {
    height: sizes.screenHeight * 0.04,
    width: sizes.screenWidth * 0.05,
    resizeMode: 'contain',
  },
  clientDetailTxt: {
    color: colors.gratsText,
    fontWeight: '500',
  },
  serviceDetailTxt: {
    color: colors.black,
    fontWeight: '400',
    marginStart: sizes.screenWidth * 0.01,
  },
  clientDetailTxtBlack: {
    color: colors.blackishGray,
    fontWeight: '500',
  },
  clientDetailTxtBlackTwo: {
    color: colors.blackishGray,
    fontWeight: '600',
  },
  containerRowThree: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerRowTwo: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.01,
  },
  calenderView: {
    marginTop: sizes.screenHeight * 0.02,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowImg: {
    height: 18,
    width: 18,
    marginLeft: 6,
    resizeMode: 'contain',
  },
  calenderHeaidng: {
    fontWeight: '500',
    color: colors.blackishGray,
    fontSize: fontSize.medium,
  },
  scrollContianer: {
    marginTop: sizes.screenHeight * 0.05,
    marginBottom: sizes.screenHeight * 0.08,
  },
  forwardArrow: {
    marginStart: sizes.screenWidth * 0.01,
  },
  modalView: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.7,
    borderRadius: sizes.screenWidth * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingVertical: sizes.screenHeight * 0.02,
  },
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBg,
  },
  modalHeading: {
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize.medium,
  },
  modalRow: {
    marginTop: sizes.screenHeight * 0.015,
    flexDirection: 'row',
  },
  modalRowTwo: {
    marginTop: sizes.screenHeight * 0.03,
    flexDirection: 'row',
  },
  modalServiceTxt: {
    color: colors.gratsText,
    fontSize: fontSize.smallM,
    fontWeight: 'bold',
    width: sizes.screenWidth * 0.23,
  },
  modalServiceTxtTwo: {
    color: colors.black,
    fontSize: fontSize.smallM,
    fontWeight: '500',
  },
  modalServiceTxtThree: {
    color: colors.red,
    fontSize: fontSize.smallM,
    fontWeight: '500',
  },
  modalServiceTxtFour: {
    color: colors.black,
    fontSize: fontSize.smallM,
    fontWeight: '500',
    marginStart: sizes.screenWidth * 0.01,
  },
  modalBtnView: {
    marginTop: sizes.screenHeight * 0.025,
    backgroundColor: colors.btnColor,
    paddingHorizontal: sizes.screenHeight * 0.015,
    paddingVertical: sizes.screenHeight * 0.015,
    width: sizes.screenWidth * 0.65,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBtnText: {
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: '600',
    fontSize: fontSize.medium,
  },
  modalArrowIcon: {
    height: sizes.screenHeight * 0.02,
    width: sizes.screenHeight * 0.02,
  },
  textBlack: {
    color: colors.black,
    fontSize: fontSize.smallM,
  },
  textGray: {
    color: colors.darkGray,
    fontSize: fontSize.smallM,
  },

  paddingBtm: {
    paddingBottom: sizes.screenHeight * 0.11,
  },
});
