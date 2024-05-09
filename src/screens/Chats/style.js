import {StyleSheet} from 'react-native';
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
  
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizes.screenWidth * 0.08,
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.emptyStar,
    marginHorizontal: sizes.screenWidth * 0.05,
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 0.062,
    marginTop: sizes.screenHeight * 0.04,
    justifyContent: 'center',
  },
  search: {
    height: sizes.screenHeight * 0.024,
  },
  input: {
    color: colors.black,
    width: sizes.screenWidth * 0.78,
  },
  scrollContianer: {
    marginTop: sizes.screenHeight * 0.01,
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
  chatSwipeContainer: {
    height: sizes.screenHeight * 0.1,
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.02,
  },
  chatContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 0.1,
    borderRadius: sizes.screenWidth * 0.03,
    flexDirection: 'row',
    paddingHorizontal: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
},
  chatDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  chatName: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '600',
  },
  chatDetail: {
    fontSize: fontSize.smallM,
    color: colors.gratsText,
    lineHeight: sizes.screenHeight * 0.03,
    fontWeight: '500',
  },
  chatTime: {
    fontSize: fontSize.small,
    color: colors.gratsText,
    fontWeight: '500',
    alignSelf: 'flex-start',
    right:sizes.screenWidth*0.04,
  },
  profileImage: {
    height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.12,
    borderRadius: sizes.screenWidth * 0.5,
    resizeMode: 'contain',
  },
  chatDetailsColumn: {
    marginStart: sizes.screenWidth * 0.02,
    flexDirection: 'column',
  },
});
