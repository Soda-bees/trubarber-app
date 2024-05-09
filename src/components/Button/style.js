import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  btnView: {
    backgroundColor: colors.btnColor,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    marginLeft : sizes.screenWidth * 0.032,
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: '600',
    fontSize: fontSize.h6,
  },
  arrowIcon: {
    height: sizes.screenHeight * 0.02,
    width: sizes.screenHeight * 0.02,
    marginRight : sizes.screenWidth * 0.03
  },

    btnViewLight: {
      backgroundColor: colors.lightgray,
      padding: sizes.screenHeight * 0.02,
      width: sizes.screenWidth * 0.85,
      alignSelf: 'center',
      borderRadius: sizes.screenWidth * 0.05,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: sizes.screenWidth * 0.003
    },
    btnTextLight: {
      color: colors.black,
      marginLeft : sizes.screenWidth * 0.032,

      fontSize: fontSize.medium,
      fontWeight: '600',
      fontSize: fontSize.h6,
    },
    arrowIconLight: {
      marginRight : sizes.screenWidth * 0.03,
      height: sizes.screenHeight * 0.02,
      width: sizes.screenHeight * 0.02,
      tintColor: colors.black,
    },
});
