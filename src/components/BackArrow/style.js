import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  arrowContainer: {
    width: sizes.screenWidth * 0.055,
    height: sizes.screenHeight * 0.03,
    // backgroundColor:'red',
    justifyContent:'center'
  },
  arrowBlackleft: {
    width: sizes.screenWidth * 0.042,
    height: sizes.screenHeight * 0.020,
  },

  arrowWhiteleft: {
    width: sizes.screenWidth * 0.042,
    height: sizes.screenHeight * 0.023,
    tintColor: colors.white,
  },

});
