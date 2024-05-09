import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  arrowblackleft: {
    marginTop: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.1,
    height: sizes.screenHeight * 0.023,
  },

  Hertotextcontainer: {
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

  Nextbtn: {
    marginTop: sizes.screenHeight * 0.33,
  },
});
