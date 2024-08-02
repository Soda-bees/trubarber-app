import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
    justifyContent: 'space-between',
  },
  borderBottom: {
    borderBottomWidth: sizes.screenWidth * 0.002,
    borderColor: colors.grayBorder,
  },
  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },
  transparentBg: {
    height: sizes.screenHeight * 0.08,
    width: sizes.screenWidth * 0.042,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerContainer: {
    marginTop: sizes.screenHeight * 0.03,
    width: sizes.screenWidth * 0.852,
  },
  headerText: {
    textAlign: 'center',
    fontSize: fontSize.h7,
    color: colors.black,
    fontWeight: '700',
  },
  contentContainer: {
    marginTop: sizes.screenHeight * 0.042,
    marginLeft: sizes.screenWidth * 0.072,
    marginRight: sizes.screenWidth * 0.072,
    borderWidth: sizes.screenWidth * 0.002,
    borderColor: colors.selectorcolor,
    borderRadius: sizes.screenWidth * 0.042,
    paddingVertical: sizes.screenWidth * 0.02,
  },
  contentAlligment: {
    marginTop: sizes.screenHeight * 0.012,
    marginLeft: sizes.screenWidth * 0.042,
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.06,
  },
  youngMan: {
    borderRadius: sizes.screenWidth * 200,
    height: sizes.screenWidth * 0.22,
    width: sizes.screenWidth * 0.22,
  },
  nameContainer: {
    width: sizes.screenWidth,
  },
  firstName: {
    fontSize: fontSize.h6,
    fontWeight: '700',
    color: colors.black,
  },
  lastName: {
    fontSize: fontSize.h6,
    color: colors.black,
  },
  locationPhonecontainer: {
    marginLeft: sizes.screenHeight * 0.023,
    marginTop: sizes.screenHeight * 0.016,
    gap: sizes.screenHeight * 0.005,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.012,
  },
  redLocation: {
    width: sizes.screenHeight * 0.022,
    height: sizes.screenHeight * 0.015,
  },
  locationText: {
    fontSize: fontSize.small,
    color: colors.black,
    fontWeight: '500',
  },
  navigation: {
    marginLeft: sizes.screenWidth * 0.07,
    marginRight: sizes.screenWidth * 0.07,
    marginTop: sizes.screenHeight * 0.042,
    gap: sizes.screenHeight * 0.02,
  },
  naviRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowRight: {
    height: sizes.screenHeight * 0.016,
  },
  navText: {
    color: colors.black,
    fontWeight: '500',
  },

  btn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.12,
  },
  btnIOS: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.19,
  },
});
