import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },

  headerText: {
    // backgroundColor: 'orange',
    fontSize: fontSize.medium,
    color:colors.black,
    width: sizes.screenWidth * 0.8,
    // backgroundColor: 'red',
    marginTop: sizes.screenHeight * 0.06,
    textAlign: 'center',
    fontWeight: '500',
    marginRight: sizes.screenWidth * 0.1,
  },
  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.06,
  },
  allignment: {
    // backgroundColor : 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: sizes.screenHeight * 0.01,
  },

  serviceImagecontainer: {
    backgroundColor: colors.selectorcolor,
    width: sizes.screenWidth * 0.17,
    height: sizes.screenHeight * 0.082,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.screenWidth* 0.03,
  },
  serviceImageresize: {
    height: sizes.screenHeight * 0.04,
  },

  detailContainer: {
    marginLeft: sizes.screenWidth * 0.062,
    marginTop: sizes.screenHeight * 0.042,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productText: {
    marginLeft: sizes.screenWidth * 0.042,
    fontSize: fontSize.h6,
    color: colors.black
    ,
    fontWeight: '800',
  },
  description: {
    marginTop: sizes.screenHeight * 0.02,
    fontSize: fontSize.medium,
    // backgroundColor: 'red',
    width: sizes.screenWidth * 0.74,
    color: colors.grayText,
  },
  priceAndbtnContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    marginLeft: sizes.screenWidth * 0.0952,
    marginRight: sizes.screenWidth * 0.0952,
    marginTop: sizes.screenHeight * 0.59,
  },
  borderRight: {
    borderRightWidth: sizes.screenWidth* 0.002,
    alignItems: 'center',
    borderStyle: 'solid',
    // backgroundColor: 'orange',
    width: sizes.screenWidth * 0.42,
  },
  serviceTime: {
    color: colors.black,
    fontSize: fontSize.small,
  },
  price: {
    color: colors.black,
    fontWeight: '800',
    fontSize: fontSize.large,
  },

  btnWidth: {
    // backgroundColor: 'purple',
    width: sizes.screenWidth * 0.42,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: colors.btnColor,
    justifyContent: 'center',
    width: sizes.screenWidth * 0.312,
    height: sizes.screenHeight * 0.05,
    alignItems: 'center',
    borderRadius: sizes.screenWidth* 0.03,
  },
  whiteText: {
    color: colors.white,
    fontSize: fontSize.h6,
  },
});
