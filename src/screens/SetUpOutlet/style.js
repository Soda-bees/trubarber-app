import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: sizes.screenHeight * 0.03
  },

  backArrow: {
    marginLeft: sizes.screenWidth * 0.042,
    marginTop: sizes.screenHeight * 0.03,
  },
  Forgotpass: {
    marginTop: sizes.screenHeight * 0.07,
    marginLeft: sizes.screenWidth * 0.09,
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '700',
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
    marginTop: sizes.screenHeight * 0.04,
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
    // backgroundColor: 'red',
    // gap: sizes.screenHeight * 0.004,
    // justifyContent: 'space-between',
    alignSelf: 'center',
  },
  timeContainer: {
    // gap: sizes.screenHeight * 0.004,
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // alignItems: 'center',
    alignSelf: 'center',
  },

  clockIcon: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
    // top:15
    position: 'absolute',
    right: sizes.screenWidth * 0.03,
    top: sizes.screenWidth * 0.025
  },
  clockIcon1: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
  },

  title: {
    color: colors.durationColor,
    fontSize: fontSize.small,
    marginStart: sizes.screenWidth * 0.01,
    paddingBottom: sizes.screenWidth * 0.01
  },

  titleIOS: {
    color: colors.durationColor,
    fontSize: fontSize.small,
    marginVertical: sizes.screenHeight * 0.007,
    // marginStart: sizes.screenWidth * 0.01,
  },
  imagestyle: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.3,
    borderRadius: sizes.screenWidth * 0.04,
    backgroundColor: colors.selectorcolor,
  },
  nextBtn: {
    top: sizes.screenHeight * 0.045,
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
});
