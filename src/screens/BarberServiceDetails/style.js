import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';
import {ScrollView} from 'react-native-gesture-handler';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.screenWidth * 0.9,
    justifyContent: 'space-between',
    alignSelf: 'center',
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
  aboutContainer: {
    marginTop: sizes.screenHeight * 0.02,
  },
  aboutHeading: {
    color: colors.black,
    fontWeight: '500',
    fontSize: fontSize.medium,
  },
  aboutDescription: {
    fontSize: fontSize.medium,
    color: colors.gratsText,
    fontWeight: '500',
  },
  serviceDetailContainer: {
    marginTop: sizes.screenHeight * 0.03,
  },
  tableHeadingRow: {
    flexDirection: 'row',
    backgroundColor: colors.tableHeadingBg,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.01,
    borderRadius: sizes.screenHeight * 0.01,
    justifyContent: 'space-between',
  },
  tableServiceHeading: {
    fontSize: fontSize.medium,
    color: colors.tableHeadingColor,
    fontWeight: '500',
    textAlign: 'center',
  },
  tablePriceHeading: {
    fontSize: fontSize.medium,
    color: colors.tableHeadingColor,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: sizes.screenWidth * 0.1,
  },
  serviceContentRow: {
    flexDirection: 'row',
    paddingHorizontal: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenHeight * 0.016,
    justifyContent: 'space-between',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: sizes.screenHeight * 0.001,
  },
  serviceNameText: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    textAlign: 'center',
  },
  priceText: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: sizes.screenWidth * 0.13,
  },

  imageView: {
    marginTop: sizes.screenHeight * 0.03,
    paddingBottom: sizes.screenHeight * 0.02,
  },
  imageHeading: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    marginLeft: sizes.screenWidth * 0.04,
  },
  imageContainer: {
    height: sizes.screenHeight * 0.25,
    width: sizes.screenWidth * 0.34,
    borderRadius: sizes.screenWidth * 0.02,
    marginTop: sizes.screenHeight * 0.01,
    marginRight: sizes.screenWidth * 0.02,
    resizeMode: 'cover',
  },
  ScrollViewContainer: {
    marginTop: sizes.screenHeight * 0.02,
  },
  modalView: {
    backgroundColor: colors.lightgray,
    width: sizes.screenWidth * 0.3,
    // marginTop:sizes.screenHeight* 0.09,
    alignSelf: 'flex-end',
    marginRight: sizes.screenHeight * 0.02,
    paddingHorizontal: sizes.screenHeight * 0.02,
    paddingVertical: sizes.screenHeight * 0.01,
    borderRadius: sizes.screenWidth * 0.02,
    borderWidth: sizes.screenWidth * 0.002,
    borderColor: colors.borderColor,
    position: 'absolute',
    top: sizes.screenHeight * 0.07,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.01,
    marginBottom: sizes.screenHeight * 0.01,
  },
  modalText: {
    fontSize: fontSize.smallM,
    color: colors.black,
    fontWeight: '500',
    marginStart: sizes.screenWidth * 0.02,
  },
  modalMainView: {
    backgroundColor: colors.white,
    // height:sizes.screenHeight * 0.21,
    width: sizes.screenWidth * 0.9,
    borderRadius: sizes.screenWidth * 0.05,
    paddingVertical: 15,
  },
  modalMessage: {
    color: colors.black,
    alignSelf: 'center',
    paddingHorizontal: 15,
    fontSize: fontSize.medium,
    width: sizes.screenWidth * 0.85,
    textAlign: 'center',
  },
  btnMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  btnView1: {
    // borderWidth:1,
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.05,
    width: sizes.screenWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.btnColor,
  },
  btnText1: {
    color: colors.white,
    fontSize: fontSize.h6,
  },
  btnView: {
    borderWidth: 1,
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.05,
    width: sizes.screenWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: colors.black,
    fontSize: fontSize.h6,
  },
});
