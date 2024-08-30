import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height: sizes.screenHeight
  },
  arrowblackleft: {
    marginTop: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.1,
    height: sizes.screenHeight * 0.023,
  },

  backArrow: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },

  Hertotextcontainer: {
    marginTop: sizes.screenHeight * 0.32,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  HertotextcontainerIOS: {
    marginTop: sizes.screenHeight * 0.32,
    // backgroundColor: 'red',
    alignItems: 'center',
  },

  heroText:{
    textAlign: 'center',
    fontSize : fontSize.h5,
    color : 'black',
    fontWeight : '900',
    // backgroundColor : 'orange',
    width : sizes.screenWidth * 0.5100,
  },
  heroTextIOS:{
    textAlign: 'center',
    fontSize : fontSize.h5,
    color : 'black',
    fontWeight : '900',
    // backgroundColor : 'orange',
    width : sizes.screenWidth * 0.5100,
  },

  Nextbtn: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.07,
    alignSelf: 'center'
  },
  NextbtnIOS: {
    // position: 'absolute',
    // bottom: sizes.screenHeight * 0.09,
    // alignSelf: 'center'
  },
  logoBlack: {
    width: sizes.screenWidth * 0.35,
    height: sizes.screenWidth * 0.25,
    resizeMode: 'contain'
  }
});
