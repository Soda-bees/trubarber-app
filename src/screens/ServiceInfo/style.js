import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
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

  centerHeader: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.032,
  },
  containerBody: {
    paddingHorizontal: sizes.screenWidth * 0.05,
  },
  scrollContainer: {
    marginTop: sizes.screenHeight * 0.03,
    marginBottom: sizes.screenHeight * 0.02,
  },
  serviceContainer: {
    marginTop: sizes.screenHeight * 0.01,
  },
  serviceNameText: {
    fontWeight: '500',
    color: colors.black,
    fontSize: fontSize.medium,
  },
  imageContainer: {
    height: sizes.screenHeight * 0.17,
    width: sizes.screenWidth * 0.3,
    borderRadius: sizes.screenWidth * 0.02,
    resizeMode: 'cover',
    marginTop: sizes.screenHeight * 0.01,
    marginStart: sizes.screenHeight * 0.013,
  },
  
  uplaodImageContianer: {
    marginTop: sizes.screenHeight * 0.01,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems:'center'
  },
  uploadImgText: {
    color: colors.gratsText,
    fontSize: fontSize.medium,
    fontWeight: '600',
    marginStart: sizes.screenWidth * 0.01,
  },
  serviceDetailContainer: {
    marginTop: sizes.screenHeight * 0.02,
  },
  tableHeadingRow: {
    flexDirection: 'row',
    paddingHorizontal: sizes.screenWidth * 0.08,
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
    alignItems: 'center',
    // paddingHorizontal: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenHeight * 0.008,
    justifyContent: 'space-between',
  },
  serviceInputContainer: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.5,
    borderRadius: sizes.screenWidth * 0.02,
    marginStart: sizes.screenWidth * 0.02,
    height: sizes.screenHeight * 0.052,
  },
  priceInputContainer: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.27,
    borderRadius: sizes.screenWidth * 0.02,
    marginStart: sizes.screenWidth * 0.04,
    height: sizes.screenHeight * 0.052,
  },
  addMoreBtn: {
    backgroundColor: colors.btnColor,
    width: sizes.screenWidth * 0.27,
    height: sizes.screenHeight * 0.05,
    alignSelf: 'flex-end',
    marginTop: sizes.screenHeight * 0.01,
    borderRadius: sizes.screenWidth * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMoreBtnText: {
    color: colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  descriptionContianer: {
    marginTop: sizes.screenHeight * 0.01,
 
  },
  descriptionHeadingText: {
    fontWeight: '500',
    color: colors.black,
    fontSize: fontSize.medium,
  },
  descriptionTextContainer: {
    marginTop: sizes.screenHeight * 0.005,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenHeight * 0.01,
    paddingHorizontal: sizes.screenWidth * 0.02,
    borderWidth:sizes.screenWidth* 0.003,
    borderColor:colors.borderColor
  },
  saveChangeBtn: {
    marginTop: sizes.screenHeight * 0.02
  },
  uploadImage: {
    marginTop: sizes.screenHeight * 0.01,
    borderRadius: sizes.screenWidth * 0.02,
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.selectorcolor,
  },
  imagestyle: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.15,
    borderRadius: sizes.screenWidth * 0.02,
    backgroundColor: colors.selectorcolor,
  },
  addimage:{
    height: sizes.screenHeight * 0.05,
  },

  
});
