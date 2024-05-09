import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height:sizes.screenHeight
  },
  arrowblackleft: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
    height: sizes.screenHeight * 0.023,
  },

  Hertotextcontainer: {
    marginTop: sizes.screenHeight * 0.32,
    alignItems: 'center',
    width : sizes.screenWidth * 0.5,
    alignSelf:'center',
  },

  HertotextcontainerIOS: {
    marginTop: sizes.screenHeight * 0.4,
    alignItems: 'center',
    width : sizes.screenWidth,
    alignSelf:'center',
  },

  heroText:{
    textAlign: 'center',
    fontSize : fontSize.h5,
    color : colors.black,
    fontWeight : '800',
    lineHeight:sizes.screenHeight* 0.04,
    width : sizes.screenWidth * 0.6,
  },
  heroTextIOS:{
    textAlign: 'center',
    fontSize : fontSize.h5,
    color : colors.black,
    fontWeight : '800',
    lineHeight:sizes.screenHeight* 0.04,
    width : sizes.screenWidth * 0.7,
  },

  Nextbtn: {
    marginTop: sizes.screenHeight * 0.38,
  },

  NextbtnIOS: {
    marginTop: sizes.screenHeight * 0.35,
  },
  Nextbtn1IOS: {
    marginTop: sizes.screenHeight * 0.33,
  },
});
