import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bluishWhite,
    width: sizes.screenWidth,
    height: sizes.screenHeight,
    // backgroundColor:'red'
  },
  imageContainer: {
    // backgroundColor:
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waletImg: {
    width: sizes.screenWidth * 0.4,
    height: sizes.screenWidth * 0.4,
    resizeMode: 'contain',
  },
  currentBalanceText: {
    color: colors.grayBorder,
    marginTop: sizes.screenHeight * 0.02,
    fontSize: fontSize.medium,
    fontWeight: '500',
  },
  amount: {
    fontSize: fontSize.large,
    color: colors.black,
    fontWeight: '800',
    marginTop: sizes.screenHeight * 0.01,
  },
  addBtnLoader: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.screenWidth * 0.75,
    borderRadius: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenWidth * 0.02,
  },
  addBtn: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.screenWidth * 0.75,
    borderWidth:1,
    borderRadius: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenWidth * 0.03,
  },
  addText: {
    color: colors.white,
    fontSize: fontSize.medium,
  },
  addImage: {
    width: sizes.screenWidth * 0.05,
    height: sizes.screenWidth * 0.05,
    tintColor: colors.white,
  },
  header: {
    width: sizes.screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.03,
    borderBottomColor: colors.disabledBg,
    borderBottomWidth: 1,
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingBottom: 8,
  },

  headerText: {
    textAlign: 'center',
    fontSize: fontSize.h7,
    color: colors.black,
    fontWeight: '700',
  },

  emptyStyle: {
    width: 24,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: sizes.screenHeight * 0.05,
  },

  scrollViewIOS: {
    flexGrow: 0.92,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: sizes.screenHeight * 0.05,
  },

  paymentAmount: {
    height: sizes.screenHeight * 0.12,
    width: sizes.screenWidth * 0.7,
    // position: 'absolute',
    // bottom: sizes.screenHeight * 0.05,
    borderTopLeftRadius: sizes.screenWidth * 0.06,
    borderTopRightRadius: sizes.screenWidth * 0.06,
    borderColor: colors.black,
    borderWidth: 1,
    alignSelf: 'center',
  },

  amountText: {
    color: colors.black,
    fontSize: fontSize.large,
    marginVertical: sizes.screenWidth * 0.04,
    alignSelf: 'center',
  },

  inputColorIOS: {
    backgroundColor: colors.selectorcolor,
    color: colors.black,
    paddingLeft: sizes.screenWidth * 0.032,
    height: sizes.screenHeight * 0.05,
    width: sizes.screenWidth * 0.69,
    alignSelf: 'center',
    top: 3,
  },

  keyboardView:{
    bottom:100,
    alignSelf:'center'
  },
});
