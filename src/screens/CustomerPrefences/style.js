import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  heroTextcontainer: {
    marginTop: sizes.screenHeight * 0.02,
    alignItems: 'center',
    marginLeft: sizes.screenWidth * 0.08,
    marginRight: sizes.screenWidth * 0.08,
  },

  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04
  },

  heroText: {
    marginTop: sizes.screenHeight * 0.04,
    textAlign: 'center',
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    width: sizes.screenWidth * 0.6,
  },
  heroText1IOS: {
    marginTop: sizes.screenHeight * 0.015,
    textAlign: 'center',
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    width: sizes.screenWidth * 0.7,
  },
  heroTextIOS: {
    marginTop: sizes.screenHeight * 0.04,
    textAlign: 'center',
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    width: sizes.screenWidth * 0.8,
  },
  headertext: {
    fontWeight: '700',
    color: colors.black,
    fontSize: fontSize.h5,
  },
  textUnderhero: {
    textAlign: 'center',
    paddingTop: sizes.screenHeight * 0.01,
    fontSize: fontSize.medium,
    color: colors.grayText,
  },
  Nextbtn: {
    position: 'absolute',
    bottom: sizes.screenHeight*0.07,
    alignSelf: 'center'
  },

  NextbtnIOS: {
    top: sizes.screenHeight * 0.07,
  },
  notSelected: {
    color: colors.grayText,
    marginTop: sizes.screenHeight * 0.04,
    backgroundColor: colors.selectorcolor,
    alignItems: 'center',
    marginLeft: sizes.screenWidth * 0.08,
    marginRight: sizes.screenWidth * 0.08,
    height: sizes.screenHeight * 0.07,
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.04,
  },

  grayText: {
    color: colors.grayText,
    fontWeight: '500',
  },
  blackText: {
    color: colors.black,
    fontWeight: '500',
  },

  selected: {
    backgroundColor: colors.selected,
    marginTop: sizes.screenHeight * 0.04,
    alignItems: 'center',
    color: colors.black,
    marginLeft: sizes.screenWidth * 0.08,
    marginRight: sizes.screenWidth * 0.08,
    height: sizes.screenHeight * 0.07,
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.04,
  },
});
