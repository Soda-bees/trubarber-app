import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  backgroundColor: {
    backgroundColor: colors.pinkishwhite,
    height: sizes.screenHeight,
  },
  transparentBg: {
    height: sizes.screenHeight * 0.12,
    width: sizes.screenWidth,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.016,
  },

  headerContainer: {
    marginTop: sizes.screenHeight * 0.056,
    width: sizes.screenWidth * 0.852,
  },
  headerText: {
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '500',
  },

  contentMargin: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: sizes.screenWidth * 0.912,
    alignSelf: 'center',
  },

  contentMarginIOS: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: sizes.screenWidth * 0.912,
    alignSelf: 'center',
  },

  containerImage: {
    width: sizes.screenWidth * 0.44,
    height: sizes.screenHeight * 0.24,
    borderRadius: 12,
  },

  containerImageIOS: {
    width: sizes.screenWidth * 0.44,
    height: sizes.screenHeight * 0.24,
    borderRadius: 12,
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

  bluredImg: {
    height: sizes.screenHeight * 0.099,
    borderRadius: sizes.screenHeight * 0.012,
    width: sizes.screenWidth * 0.392,
    opacity: 0.9,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },

  textDarkerblack: {
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.small,
    marginLeft: sizes.screenWidth * 0.02,
    marginTop: sizes.screenHeight * 0.01,
  },
  textBlack: {
    color: colors.black,
    fontSize: fontSize.extraSmall,
    fontWeight: '700',
  },
  textBlackBarberLocation: {
    color: colors.black,
    fontSize: fontSize.extraSmall,
    fontWeight: '700',
  },

  loaderStyle: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  appointmentContainer: {
    gap: 6,
  },
  locationContainer: {
    left: sizes.screenWidth * 0.01,
    alignItems: 'center',
    flexDirection: 'row',
  },
  locationImg: {
    width: sizes.screenWidth * 0.04,
    height: sizes.screenHeight * 0.013,
  },
  bookBtn: {
    backgroundColor: colors.black,
    height: sizes.screenHeight * 0.032,
    width: sizes.screenWidth * 0.36,
    borderRadius: sizes.screenWidth * 0.022,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: fontSize.small,
    color: colors.white,
    marginLeft: sizes.screenWidth * 0.042,
  },
  arrowStyle: {
    height: sizes.screenHeight * 0.012,
  },
});
