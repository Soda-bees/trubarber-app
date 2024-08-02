import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  containerCheck: {
    // flex: 1,
    // marginBottom: sizes.screenHeight * 0.12,
    // height: sizes.screenHeight * 0.2
    // backgroundColor:'red'
  },
  calender: {
    height: sizes.screenHeight * 0.2,
    // backgroundColor: 'red',
    gap: sizes.screenWidth * 0.1,
  },

  header: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'center',
    borderBottomWidth: 0.4,
    // marginBottom : sizes.screenHeight * 0.12
  },

  arrowTop: {
    // marginLeft: sizes.screenWidth * 0.01,
    marginTop: sizes.screenHeight * 0.03,
  },
  headerText: {
    // backgroundColor: 'orange',
    fontSize: fontSize.h7,
    color: colors.black,
    width: sizes.screenWidth * 0.87,
    marginTop: sizes.screenHeight * 0.03,
    textAlign: 'center',
    fontWeight: '700',
  },
  allignment: {
    // backgroundColor : 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: sizes.screenHeight * 0.01,
  },
  topContentcontainer: {
    marginTop: sizes.screenHeight * 0.03,
    marginLeft: sizes.screenWidth * 0.052,
    marginRight: sizes.screenWidth * 0.052,
    // backgroundColor: 'red',
  },

  rowcontainer: {
    marginRight: sizes.screenWidth * 0.052,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datesHeading: {
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.medium,
  },
  redTriangle: {
    height: sizes.screenHeight * 0.012,
  },
  spaceTop: {
    marginTop: sizes.screenHeight * 0.022,
    marginRight: sizes.screenWidth * 0.022,
    // backgroundColor: 'red',
    width: sizes.screenWidth,
    height: sizes.screenHeight * 0.482,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 200,
    flex: 1,
  },
  days: {
    color: colors.black,
    fontSize: fontSize.small,
  },
  dates: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '900',
  },

  timeContainer: {
    marginTop: sizes.screenHeight * 0.03,
    // backgroundColor: 'red',
    height: sizes.screenHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: sizes.screenWidth * 0.002,
    borderBottomWidth: sizes.screenWidth * 0.002,
    borderColor: colors.lightBordercolor,
  },

  timeAlligment: {
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.04,
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth*0.03
  },
  bookContainer: {
    marginTop: sizes.screenHeight * 0.04,
    marginLeft: sizes.screenWidth * 0.07,
    marginRight: sizes.screenWidth * 0.05,
    gap: sizes.screenHeight * 0.01,
    // flexDirection: 'row',
  },
  selected: {
    borderWidth: 1,
    width: sizes.screenWidth * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: sizes.screenHeight * 0.04,
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.dateSelected,
    borderColor: colors.red,
  },
  notSelected: {
    borderWidth: 0,
    width: sizes.screenWidth * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: sizes.screenHeight * 0.04,
    borderRadius: sizes.screenWidth * 0.08,
    backgroundColor: colors.lightgray,
  },
  selectedTextcolor: {
    color: colors.red,
    fontWeight: '600',
  },

  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  flexRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  textBlack: {
    color: colors.black,
    fontWeight: '500',
  },
  change: {
    color: colors.btnColor,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: colors.btnColor,
  },
  crossbtn: {
    height: sizes.screenHeight * 0.028,
    width: sizes.screenWidth * 0.05,
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.02,
  },
  imageContainer: {
    width: sizes.screenWidth * 0.16,
    height: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenWidth * 0.04,
  },
  barberContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barberName: {
    color: colors.black,
    fontWeight: '600',
    fontSize: fontSize.medium,
  },
  
  barberName2: {
    color: colors.black,
    fontWeight: '600',
    fontSize: fontSize.medium,
    marginVertical: 4
  },
  
  time: {
    color: colors.durationColor,
  },
  nameTimecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barberNameImage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.04,
  },
  marginTop: {
    marginTop: sizes.screenHeight * 0.02,
    borderWidth: sizes.screenWidth * 0.002,
    width: sizes.screenWidth * 0.16,
    alignItems: 'center',
    height: sizes.screenHeight * 0.03,
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.02,
    borderColor: colors.black,
  },
  priceSmalltext: {
    color: colors.black,
    fontSize: fontSize.small,
  },
  total: {
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.03,
    marginTop: sizes.screenHeight * 0.02,
    borderBottomWidth: sizes.screenWidth * 0.002,
    borderColor: colors.lightBordercolor,
  },

  totalText: {
    fontSize: fontSize.small,
    color: colors.black,
    fontWeight: '400',
    marginBottom: sizes.screenHeight * 0.01,
    borderColor: colors.lightBordercolor,
  },
  priceBlack: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontWeight: '900',
    marginBottom: sizes.screenHeight * 0.01,
  },
  addAnotherservice: {
    color: colors.btnColor,
    fontWeight: '600',
    borderColor: colors.btnColor,
  },
  paymentBorder: {
    marginTop: sizes.screenHeight * 0.03,
    borderTopWidth: sizes.screenWidth * 0.002,
    borderColor: colors.lightBordercolor,
    gap: sizes.screenHeight * 0.02,
  },
  paymentTitle: {
    // backgroundColor: 'orange',
    marginTop: sizes.screenHeight * 0.03,
    marginLeft: sizes.screenWidth * 0.05,
    marginRight: sizes.screenWidth * 0.05,
  },
  title: {
    color: colors.black,
    fontWeight: '500',
  },
  credtDebit: {
    flexDirection: 'row',
    marginLeft: sizes.screenWidth * 0.07,
    marginRight: sizes.screenWidth * 0.07,
    justifyContent: 'space-between',
  },
  creditText: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '700',
  },
  blackPlusbox: {
    backgroundColor: colors.black,
    justifyContent: 'center',
    height: sizes.screenHeight * 0.03,
  },
  starSize: {
    height: sizes.screenHeight * 0.014,
  },
  cardDetailscontainer: {
    marginLeft: sizes.screenWidth * 0.08,
    marginRight: sizes.screenWidth * 0.08,
    borderWidth: sizes.screenWidth * 0.002,
    height: sizes.screenHeight * 0.05,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizes.screenHeight * 0.01,
    borderColor: colors.lightBordercolor,
    justifyContent: 'space-between',
    // paddingLeft: sizes.screenWidth * 0.01,
    // paddingRight: sizes.screenWidth * 0.03,
  },
  masterCard: {
    height: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.1,
  },
  cardText: {
    color: colors.durationColor,
  },
  arrowRight: {
    height: sizes.screenHeight * 0.02,
    paddingRight: sizes.screenWidth * 0.09,
  },
  btnMargin: {
    marginTop: sizes.screenHeight * 0.02,
    marginBottom: sizes.screenHeight * 0.03,
  },
  btnMarginIOS: {
    position:'absolute',
    alignSelf:'center',
    bottom:sizes.screenHeight * 0.09
  },
  textContainer: {
    // backgroundColor: 'orange',
    marginTop: sizes.screenHeight * 0.01,
    width: sizes.screenWidth * 0.47,
  },

  disabledText: {
    color: colors.grayBorder,
    fontWeight: '600',
  },
  disabledText1: {
    color: colors.grayBorder,
    fontWeight: '800',
  },
  crossIcon: {
    height: 20,
    width: 20,
    marginRight: 6,
    marginVertical: 3
  },
});
