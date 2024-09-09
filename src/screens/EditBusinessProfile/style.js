import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backArrow: {
    // marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.03,
    backgroundColor:'red'
  },
  Forgotpass: {
    // marginTop: sizes.screenHeight * 0.03,
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '700',
    alignSelf: 'center'
  },
  addimage: {
    width: sizes.screenWidth * 0.2,
    height: sizes.screenHeight * 0.1,
    borderRadius: sizes.screenWidth * 0.04,
  },

  containtext: {
    alignItems: 'center',
  },
  subText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.01,
    color: colors.grayText,
    fontWeight: '500',
  },

  uploadImage: {
    marginTop: sizes.screenHeight*0.03,
    borderRadius: sizes.screenWidth * 0.04,
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.selectorcolor,
  },

  uploadPress: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.012,
  },

  uploadPressIOS: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.022,
  },

  uploadCover: {
    color: colors.black,
    fontWeight: '600',
    fontSize: fontSize.medium,
  },
  content: {
    // marginHorizontal: sizes.screenWidth * 0.08,
    marginTop: sizes.screenHeight * 0.012,
    gap: sizes.screenHeight * 0.02,
  },
  textContainer: {
    alignSelf: 'center',
  },
  timeContainer: {
    alignSelf: 'center',
  },

  clockIcon: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
    position: 'absolute',
    right: sizes.screenWidth * 0.03,
    top: sizes.screenWidth * 0.025
  },
  clockIcon1: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
  },

  title: {
    color: colors.durationColor,
    fontSize: fontSize.small,
    marginStart: sizes.screenWidth * 0.01,
    paddingBottom: sizes.screenWidth * 0.01,
  },

  titleIOS: {
    color: colors.durationColor,
    fontSize: fontSize.small,
    marginVertical: sizes.screenHeight * 0.007,
  },
  imagestyle: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.3,
    borderRadius: sizes.screenWidth * 0.04,
    backgroundColor: colors.selectorcolor,
  },
  description: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    paddingHorizontal: sizes.screenWidth * 0.02,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
  },
  time: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
    height:sizes.screenWidth * 0.09,
    alignItems:'start',
    justifyContent:'center'
  },
  descriptionIOS: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    paddingHorizontal: sizes.screenWidth * 0.02,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
    height:sizes.screenHeight * 0.1,
    paddingTop:10
  },
  descriptionTwo: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.83,
    marginStart: sizes.screenWidth * 0.01,
  },
  descriptionTwoIOS: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.83,
  },

  nextBtn: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.07,
    alignSelf: 'center'
  },
  nextBtnIOS: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.09,
    alignSelf: 'center'
  },
  title: {
    color: colors.durationColor,
    fontSize: fontSize.small,
    marginStart: sizes.screenWidth * 0.01,
    paddingBottom: sizes.screenWidth * 0.01
  },

  titleIOS: {
    color: colors.durationColor,
    fontSize: fontSize.small,
    marginVertical: sizes.screenHeight * 0.007,
  },
  timeSecond: {
    color: colors.black,
    fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
    height:sizes.screenWidth * 0.1,
    alignItems:'start',
    justifyContent:'center',
  },
  instagramInput:{
    // backgroundColor:'red',
    fontSize:fontSize.small,
    marginLeft:sizes.screenWidth * 0.08,
    fontWeight:'500',
    color:colors.black
  },
  instagramIcon: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
    position: 'absolute',
    left: sizes.screenWidth * 0.03,
    top: sizes.screenWidth * 0.026,
    tintColor:colors.black
  },
  daysContainer: {
    width: sizes.screenWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  daysTouchable: {
    height: sizes.screenWidth * 0.11,
    width: sizes.screenWidth * 0.118,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: sizes.screenWidth * 0.03,
  },
  daysTouchableSelected: {
    backgroundColor: colors.black,
    height: sizes.screenWidth * 0.11,
    width: sizes.screenWidth * 0.118,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: sizes.screenWidth * 0.03,
  },
  daysText: {
    fontSize: fontSize.smallM,
    color: colors.black,
    fontWeight: '500'
  },
  daysTextSelected: {
    fontSize: fontSize.smallM,
    color: colors.white,
    fontWeight: '500'
  },
  daysContainerIOS: {
    width: sizes.screenWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  daysMainConatner:{
    alignSelf:'center',
    marginTop:sizes.screenWidth * 0.05
  }
});
