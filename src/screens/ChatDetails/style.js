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
    marginTop: sizes.screenHeight * 0.05,
    paddingHorizontal: sizes.screenWidth * 0.06,
    // height: sizes.screenHeight,
    // marginBottom: 40,
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
    paddingVertical: sizes.screenHeight * 0.022,
    paddingHorizontal: sizes.screenWidth * 0.035,
    borderBottomEndRadius: sizes.screenWidth * 0.05,
    borderTopLeftRadius: sizes.screenWidth * 0.05,
    borderTopRightRadius: sizes.screenWidth * 0.05,
    marginBottom: sizes.screenHeight * 0.02,
    marginEnd: sizes.screenWidth * 0.15,
  },
  chatText: {
    color: colors.black,
    fontSize: fontSize.small,
    lineHeight: sizes.screenHeight * 0.019,
  },
  chatSend: {
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
    paddingVertical: sizes.screenHeight * 0.022,
    paddingHorizontal: sizes.screenWidth * 0.035,
    borderTopLeftRadius: sizes.screenWidth * 0.05,
    borderTopRightRadius: sizes.screenWidth * 0.05,
    borderBottomStartRadius: sizes.screenWidth * 0.05,
    marginBottom: sizes.screenHeight * 0.02,
    marginStart: sizes.screenWidth * 0.15,
  },
  texInputView: {
    backgroundColor: colors.white,
    // marginTop:sizes.screenHeight* 0.15,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom:sizes.screenHeight * 0,
    // bottom:sizes.screenHeight* 0.1,
    // backgroundColor:colors.black
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
    width: sizes.screenWidth * 0.72,
    height: sizes.screenHeight * 0.07,
    color: colors.black,
  },
  arrowBlackIcon: {
    resizeMode: 'contain',
    width: sizes.screenWidth * 0.05,
    height: sizes.screenWidth * 0.05,
  },
  laoderContainer: {
    backgroundColor: '#FBFAFA',
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
});
