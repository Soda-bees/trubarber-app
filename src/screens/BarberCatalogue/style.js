import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  backgroundColor: {
    backgroundColor: colors.pinkishwhite,
  },
  transparentBg: {
    // height: sizes.screenHeight * 0.17,
    paddingVertical: sizes.screenHeight*0.03,
    width: sizes.screenWidth,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizes.screenWidth * 0.06,
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
    // height: sizes.screenHeight * 0.064,
    // marginTop: sizes.screenHeight * 0.05,
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
  },
  iconImage: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenWidth * 0.042,
    resizeMode: 'contain',
    tintColor: colors.black
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
    marginTop: sizes.screenHeight * 0.05,
    paddingHorizontal: sizes.screenWidth * 0.06,
    flex: 1,
  },
  headingSchedule: {
    color: colors.black,
    fontSize: fontSize.h6,
    fontWeight: '600',
  },
  txtBelowSchedule: {
    marginTop: sizes.screenHeight * 0.01,
    color: colors.gray,
    fontSize: fontSize.medium,
    lineHeight: sizes.screenHeight * 0.02,
    fontWeight: '400',
  },
  addService: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  serviceContainer: {
    flexDirection: 'row',
    marginTop: sizes.screenHeight * 0.01,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceBox: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.43,
    height: sizes.screenHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.selectorcolor,
    marginBottom: sizes.screenHeight * 0.01,
  },
  serviceBoxSelected: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.43,
    height: sizes.screenHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.black,
    marginBottom: sizes.screenHeight * 0.01,
  },
  serviceImage: {
    width: sizes.screenWidth * 0.1,
    height: sizes.screenHeight * 0.06,
    resizeMode: 'contain',
  },
  serviceName: {
    color: colors.black,
    marginTop: sizes.screenHeight * 0.01,
    fontWeight: 'bold',
    fontSize: fontSize.medium,
  },
  serviceStyle: {
    color: colors.black,
    fontWeight: '500',
    fontSize: fontSize.smallM,
    marginTop: sizes.screenHeight * 0.005,
  },
  scrollContainer: {
    marginTop: sizes.screenHeight * 0.01,
    marginBottom: sizes.screenHeight * 0.02,
  },

  paddingBtm: {
    paddingBottom: sizes.screenHeight * 0.1,
  },
  plusBtn: {
    position: 'absolute',
    // bottom: sizes.screenHeight*0.12,
    right: 0,
  },
  textContainer: {
    position: 'relative'
  }
});
