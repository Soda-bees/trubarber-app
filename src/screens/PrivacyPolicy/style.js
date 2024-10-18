import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  borderBottom: {
    // backgroundColor: colors.lightgray,
    borderBottomWidth: sizes.screenWidth* 0.002,
    borderColor: colors.grayBorder,
    // marginTop: sizes.screenHeight * 0.021
    // opacity: 0.4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: sizes.screenHeight * 0.04,
    marginBottom: sizes.screenHeight * 0.0098,
  },
  // arrowTop:{
  //     marginTop: sizes.screenHeight *0.052,
  //     // backgroundColor : 'red',
  // },
  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
  },

  headerText: {
    color: colors.black,
    fontWeight: '700',
    // backgroundColor: 'red',
    flexGrow: 1,
    marginRight: sizes.screenWidth * 0.07,
    textAlign: 'center',
    fontSize: fontSize.h7,

  },

  inputContainer: {
    // backgroundColor: 'red',
    marginBottom: sizes.screenHeight * 0.12,
    marginLeft: sizes.screenWidth * 0.052,
    marginRight: sizes.screenWidth * 0.062,
    // gap: sizes.screenHeight * 0.012
  },
  gapText: {
    gap: sizes.screenHeight * 0.012,
  },

  title: {
    color: colors.black,
    fontWeight: '700',
    marginTop:sizes.screenHeight * 0.02
  },
  titleMain: {
    color: colors.black,
    fontWeight: '700',
    marginTop:sizes.screenHeight * 0.02
  },

  textBlack: {
    color: colors.black,
    fontSize: fontSize.smallM
  },
});
