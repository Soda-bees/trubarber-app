import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  btnView: {
    backgroundColor: colors.black,
    width: sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.07,
    paddingHorizontal: sizes.screenWidth * 0.05,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnView2: {
    backgroundColor: colors.black,
    width: sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.07,
    paddingHorizontal: sizes.screenWidth * 0.05,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    marginLeft: sizes.screenWidth * 0.032,
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: '600',
    fontSize: fontSize.h6,
  },
  btnText2: {
    // marginLeft : sizes.screenWidth * 0.032,
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: '600',
    fontSize: fontSize.h6,
  },
  arrowIcon: {
    height: sizes.screenHeight * 0.02,
    width: sizes.screenHeight * 0.02,
    marginRight: sizes.screenWidth * 0.03
  },

  btnViewLight: {
    backgroundColor: colors.blackGrey,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.white
  },
  btnViewLightCenter: {
    backgroundColor: colors.blackGrey,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.white
  },
  btnTextLight: {
    color: colors.white,
    marginLeft: sizes.screenWidth * 0.032,
    fontSize: fontSize.medium,
    fontWeight: '600',
    fontSize: fontSize.h6,
  },
  arrowIconLight: {
    marginRight: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.02,
    width: sizes.screenHeight * 0.02,
    tintColor: colors.white,
  },
});
