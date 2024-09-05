import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },

  headerText: {
    // backgroundColor: 'orange',
    fontSize: fontSize.medium,
    color: colors.black,
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
    borderRadius: sizes.screenWidth * 0.03,
  },
  serviceImageresize: {
    height: sizes.screenWidth * 0.11,
    width: sizes.screenWidth * 0.11,
    // backgroundColor:'red'
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
    color: colors.black,
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
    marginTop: sizes.screenHeight * 0.05,
  },
  borderRight: {
    borderRightWidth: sizes.screenWidth * 0.002,
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
    backgroundColor: colors.black,
    justifyContent: 'center',
    width: sizes.screenWidth * 0.312,
    height: sizes.screenHeight * 0.05,
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
  },
  btn2: {
    backgroundColor: colors.grayBorder,
    justifyContent: 'center',
    width: sizes.screenWidth * 0.312,
    height: sizes.screenHeight * 0.05,
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
  },
  whiteText: {
    color: colors.white,
    fontSize: fontSize.h6,
  },
  whiteText2: {
    color: colors.black,
    fontSize: fontSize.h6,
  },

  categoryName: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '600',
    marginTop: sizes.screenHeight * 0.03,
    marginBottom: sizes.screenHeight * 0.02,
  },
  categoryImg: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '600',
    marginTop: sizes.screenHeight * 0.03,
    marginBottom: sizes.screenHeight * 0.02,
    marginLeft: sizes.screenHeight * 0.03,
  },

  styleMainView: {
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    width: sizes.screenWidth * 0.9,
    // height: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.outlineColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.004,
    paddingVertical: sizes.screenWidth * 0.02
  },

  styleMainView2: {
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    width: sizes.screenWidth * 0.9,
    // height: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.grayBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.004,
    paddingVertical: sizes.screenWidth * 0.02
  },

  timeText: {
    color: colors.black,
    fontWeight: '500',
    fontSize: fontSize.small
  },

  styleName: {
    color: colors.black,
    fontSize: fontSize.h6,
    fontWeight: '600',
  },
  imgStyle: {
    // resizeMode:'contain',
    width: sizes.screenWidth * 0.35,
    height: sizes.screenWidth * 0.5,
    borderRadius: sizes.screenWidth * 0.04,
    // backgroundColor:'red',
    // marginLeft:sizes.screenWidth * 0.02
  },
  imageContainer: {
    flexDirection: 'row',
    marginLeft: sizes.screenWidth * 0.02,
    // marginHorizontal: sizes.screenWidth * 0.015,
    // backgroundColor:'red',
    width: sizes.screenWidth * 0.35,
    height: sizes.screenWidth * 0.5,
  },

  modalMainView: {
    backgroundColor: colors.white,
    // height:sizes.screenHeight * 0.21,
    width: sizes.screenWidth * 0.9,
    borderRadius: sizes.screenWidth * 0.05,
    paddingVertical: 15
  },

  modalMessage: {
    color: colors.black,
    alignSelf: 'center',
    paddingHorizontal: 15,
    fontSize: fontSize.medium,
    width: sizes.screenWidth * 0.85,
    textAlign: 'center'
  },

  btnText: {
    color: colors.black,
    fontSize: fontSize.h6,
  },
  btnText1: {
    color: colors.white,
    fontSize: fontSize.h6,
  },

  btnMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15
  },

  btnView: {
    borderWidth: 1,
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.05,
    width: sizes.screenWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView1: {
    // borderWidth:1,
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.05,
    width: sizes.screenWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
});
