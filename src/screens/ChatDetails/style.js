import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluishWhite,
    paddingBottom: sizes.screenWidth * 0.01,
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
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: sizes.screenWidth * 0.02,
    // backgroundColor:'red'
    // marginTop: sizes.screenHeight * 0.01,
    // backgroundColor:'green'
  },
  containerBody: {
    marginTop: sizes.screenHeight * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.02,
    // height: sizes.screenHeight,
    // marginBottom: 40,
    paddingBottom: sizes.screenWidth * 0.02,
    // backgroundColor:'red',
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
    backgroundColor: 'red',
  },

  chatRecieved: {
    backgroundColor: colors.chatRecievedBg,
    alignSelf: 'flex-start',
    paddingLeft: 5,
    paddingRight: 6,
    paddingVertical: 4,
    borderBottomEndRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: sizes.screenWidth * 0.015,
    maxWidth: sizes.screenWidth * 0.8,
    marginLeft: sizes.screenWidth * 0.03,
  },
  chatText: {
    color: colors.black,
    fontSize: fontSize.medium,
  },
  chatSend: {
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
    paddingLeft: 5,
    paddingRight: 6,
    paddingVertical: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    marginBottom: sizes.screenWidth * 0.015,
    maxWidth: sizes.screenWidth * 0.8,
    borderWidth: 0.5,
    borderColor: colors.disabledBg,
    marginRight: sizes.screenWidth * 0.03,
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
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.screenWidth * 0.96,
    alignSelf: 'center',
    borderColor: colors.disabledBg,
    borderWidth: 1,
  },
  textInputContainer: {
    backgroundColor: 'white',
    width: sizes.screenWidth * 0.75,
    height: sizes.screenHeight * 0.07,
    color: colors.black,
  },
  textInputContainerIOS: {
    backgroundColor: 'white',
    width: sizes.screenWidth * 0.75,
    height: sizes.screenHeight * 0.07,
    color: colors.black,
    // backgroundColor:'red',
    paddingTop: 10,
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
  scrollImg: {
    width: sizes.screenWidth * 0.1,
    height: sizes.screenWidth * 0.1,
  },
  scrollTouchable: {
    position: 'absolute',
    right: 15,
    bottom: sizes.screenHeight * 0.1,
    zIndex: 10,
  },

  chatNoLonger: {
    textAlign: 'center',
    fontSize: fontSize.medium,
    fontWeight: '500',
    color: 'red',
  },

  newChatStarted: {
    color: 'black',
    position: 'absolute',
    alignSelf: 'center',
    top: sizes.screenHeight * 0.4,
    textAlign: 'center',
    fontSize: fontSize.smallM,
    fontWeight: '500',
  },
});
