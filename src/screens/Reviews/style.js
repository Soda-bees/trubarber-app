import {StyleSheet} from 'react-native';
import {colors, sizes, fontSize} from '../../services';

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
    paddingHorizontal: sizes.screenWidth * 0.06,
  },
  ratingContainer: {
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    borderColor: colors.emptyStar,
    borderWidth: sizes.screenWidth * 0.003,
    marginTop: sizes.screenHeight * 0.01,
    paddingBottom: sizes.screenHeight * 0.01,
    flex: 1,
  },
  ratingData: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: sizes.screenWidth * 0.81,
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.012,
  },
  profilePic: {
    borderRadius: sizes.screenWidth * 0.3,
    height: sizes.screenHeight * 0.052,
    width: sizes.screenWidth * 0.11,
    resizeMode: 'contain',
  },
  alignItems: {
    marginLeft: sizes.screenWidth * 0.05,
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
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.screenWidth * 0.0222,
    height: sizes.screenHeight * 0.022,
  },
  descriptionContainer: {
    color: colors.black,
    fontSize: fontSize.small,
    marginTop: sizes.screenHeight * 0.012,
    marginHorizontal: sizes.screenWidth * 0.027,
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  rowAndmargin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizes.screenWidth * 0.015,
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.emptyStar,
    marginHorizontal: sizes.screenWidth * 0.05,
    height: sizes.screenHeight * 0.055,
    marginTop: sizes.screenHeight * 0.015,
    marginBottom: sizes.screenHeight * 0.015,
    width: sizes.screenWidth * 0.82,
    paddingHorizontal: sizes.screenWidth * 0.04,
    justifyContent: 'space-between',
  },
  search: {
    alignSelf: 'flex-end',
  },
  input: {
    color: colors.black,
    width: sizes.screenWidth * 0.68,
  },

  paddingBottom: {
    marginBottom: sizes.screenHeight * 0.09,
  },
});
