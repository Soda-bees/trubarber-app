import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  forgotPass: {
    marginTop: sizes.screenHeight * 0.07,
    textAlign: 'center',
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: '600',
  },

  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },

  adjustWidth: {
    alignItems: 'center',
  },

  subText: {
    textAlign: 'center',
    width: sizes.screenWidth * 0.7,
    marginTop: sizes.screenHeight * 0.012,
    fontSize: fontSize.medium,
    color: colors.placeholdertextgray,
  },

  centerContent: {
    justifyContent: 'center',
    marginTop: sizes.screenHeight * 0.072,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: sizes.screenWidth * 0.08,
  },

  tagContainernotSelected: {
    marginRight: sizes.screenWidth * 0.017,
    backgroundColor: colors.selectorcolor,
    marginBottom: sizes.screenHeight * 0.009,
    height: sizes.screenHeight * 0.06,
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
  },
  tagContainerselected: {
    marginRight: sizes.screenWidth * 0.017,
    backgroundColor: colors.selected,
    marginBottom: sizes.screenHeight * 0.009,
    height: sizes.screenHeight * 0.06,
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
  },
  notSelectedtext: {
    color: colors.grayText,
    paddingLeft: sizes.screenWidth * 0.02,
    paddingRight: sizes.screenWidth * 0.02,
  },
  selectedText: {
    color: colors.black,
    fontWeight: '400',
    paddingLeft: sizes.screenWidth * 0.02,
    paddingRight: sizes.screenWidth * 0.02,
  },

  Nextbtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.07,
  },

  NextbtnIOS: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.1,
  },
});
