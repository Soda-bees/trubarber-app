import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  header: {
    width: sizes.screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.03,
    borderBottomColor: colors.disabledBg,
    borderBottomWidth: 1,
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingBottom: 8,
  },

  headerText: {
    textAlign: 'center',
    fontSize: fontSize.h7,
    color: colors.black,
    fontWeight: '700',
  },

  emptyStyle: {
    width: 24,
  },
});
