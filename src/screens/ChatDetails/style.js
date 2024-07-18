import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bluishWhite,
    height: sizes.screenHeight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.02,
    paddingBottom: sizes.screenHeight * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.04,
  },

  headerText: {
    fontSize: fontSize.large,
    color: colors.black,
    fontWeight: '400',
    marginStart: sizes.screenWidth * 0.02,
  },
  phoneIcon: {
    marginStart: sizes.screenWidth * 0.4,
  },
  scrollContianer: {
    marginTop: sizes.screenHeight * 0.01,
  },
  containerBody: {
    marginTop: sizes.screenHeight * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.02,
    // height: sizes.screenHeight,
    // marginBottom: 40,
    paddingBottom: sizes.screenWidth * 0.02
  },
  containerBody1: {
    marginTop: sizes.screenHeight * 0.02,
    // paddingHorizontal: sizes.screenWidth * 0.06,
    height: sizes.screenHeight,
  },
  line: {
    borderBottomWidth: sizes.screenWidth * 0.002,
    borderColor: colors.gratsText,
    width: sizes.screenWidth * 0.31,
  },
  todayRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  todayHeading: {
    color: colors.gratsText,
    fontSize: fontSize.smallM,
    fontWeight: '500',
    marginHorizontal: sizes.screenWidth * 0.08,
  },
  chatContianer: {
    // marginTop: sizes.screenHeight * 0.03,
    // justifyContent: 'flex-end',
    backgroundColor: colors.red,
    // backgroundColor: colors.black,
    // minHeight: sizes.screenHeight*0.82,
  },

  chatSubContianer: {
    height: sizes.screenHeight * 0.92,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  chatRecieved: {
    backgroundColor: colors.chatRecievedBg,
    alignSelf: 'flex-start',
    padding: sizes.screenWidth * 0.01,
    borderBottomEndRadius: sizes.screenWidth * 0.02,
    borderTopLeftRadius: sizes.screenWidth * 0.02,
    borderTopRightRadius: sizes.screenWidth * 0.02,
    marginBottom: sizes.screenWidth * 0.015,
    maxWidth: sizes.screenWidth * 0.8
  },
  chatText: {
    color: colors.black,
    fontSize: fontSize.smallM,
    lineHeight: sizes.screenHeight * 0.019,
  },
  chatSend: {
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
    padding: sizes.screenWidth * 0.01,
    borderTopLeftRadius: sizes.screenWidth * 0.02,
    borderTopRightRadius: sizes.screenWidth * 0.02,
    borderBottomLeftRadius: sizes.screenWidth * 0.02,
    marginBottom: sizes.screenWidth * 0.015,
    maxWidth: sizes.screenWidth * 0.8,
    borderWidth: 0.5,
    borderColor: colors.disabledBg
  },
  texInputView: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.screenWidth * 0.97,
    alignSelf: 'center',
    borderColor: colors.disabledBg,
    borderWidth: 1,
  },
  texInputViewIOS: {
    backgroundColor: colors.white,
    marginTop: sizes.screenHeight * 0.01,
    marginBottom: sizes.screenHeight * 0.09,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  textInputContainer: {
    backgroundColor: 'white',
    width: sizes.screenWidth * 0.75,
    height: sizes.screenHeight * 0.07,
    color: colors.black,
  },

  laoderContainer: {
    backgroundColor: 'black',
    height: sizes.screenHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: sizes.screenWidth,
    height: sizes.screenHeight,
    // marginBottom: sizes.screenHeight * 0.06,
  },
  imageIconTouchable: {
    // backgroundColor:'red'
  },
  imgIcon: {
    width: sizes.screenWidth * 0.07,
    height: sizes.screenWidth * 0.07,
    resizeMode: 'contain',
  },
  sendBtnIcon: {
    width: sizes.screenWidth * 0.07,
    height: sizes.screenWidth * 0.07,
    resizeMode: 'contain',
  },
  sendBtnIconSecond: {
    width: sizes.screenWidth * 0.12,
    height: sizes.screenWidth * 0.12,
    resizeMode: 'contain',
  },
  arrowBlackIcon: {
    alignSelf: 'flex-end',
    bottom: 40,
    right: 20,
    // resizeMode: 'contain',
    // width: sizes.screenWidth * 0.05,
    // height: sizes.screenWidth * 0.05,
    // marginRight:sizes.screenWidth * 0.01,
    // backgroundColor:'yellow'
  },
});
