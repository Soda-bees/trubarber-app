import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bluishWhite,
    height: sizes.screenHeight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.04,
  },
  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
  },
  headerContainer: {
    width: sizes.screenWidth * 0.852,
  },
  headerText: {
    textAlign: 'center',
    fontSize: fontSize.h7,
    color: colors.black,
    fontWeight: '700',
  },
  containerBody: {
    marginTop: sizes.screenHeight * 0.02,
    // paddingHorizontal: sizes.screenWidth * 0.06,
  },
  scrollContianer: {
    marginTop: sizes.screenHeight * 0.03,
  },
  notficationContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: sizes.screenHeight * 0.1,
    borderRadius: sizes.screenWidth * 0.03,
    flexDirection: 'row',
    paddingHorizontal: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
  },
  notficationDetailContainer: {
    flexDirection: 'column',
    marginStart: sizes.screenWidth * 0.03,
    justifyContent: 'space-between',
  },
  notificationTitle: {
    fontSize: fontSize.smallM,
    color: colors.black,
    fontWeight: '500',
  },
  notificationDetail: {
    fontSize: fontSize.smallM,
    color: colors.black,
    lineHeight: sizes.screenHeight * 0.03,
  },
  notificationTime: {
    fontSize: fontSize.small,
    color: colors.black,
    fontWeight: '600',
    lineHeight: sizes.screenHeight * 0.02,
  },
  swipeItem: {
    aspectRatio: 1,
    flexDirection: 'column',
  },
  swipeContainer: {
    height: sizes.screenHeight * 0.1,
    width: sizes.screenWidth * 0.15,
  },
  swipeDeleteIcon: {
    height: sizes.screenHeight * 0.1,
    width: sizes.screenWidth * 0.07,
    resizeMode: 'contain',
    marginStart: sizes.screenWidth * 0.05,
  },
  notificationSwipeContainer: {
    height: sizes.screenHeight * 0.1,
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.02,
  },
});
