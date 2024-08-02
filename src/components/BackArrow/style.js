import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  arrowContainer: {
    width: 26,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding:13
  },
  arrowBlackleft: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  arrowWhiteleft: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});
