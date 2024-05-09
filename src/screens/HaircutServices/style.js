import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  backgroundColor: {
    backgroundColor: colors.pinkishwhite,
  },
  transparentBg: {
    height: sizes.screenHeight * 0.12,
    width: sizes.screenWidth,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.016,
  
},

  headerContainer: {
    // backgroundColor: 'yellow',
    marginTop: sizes.screenHeight * 0.056,
    width: sizes.screenWidth * 0.852
  },
  headerText: {
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '500',
  },

  contentMargin: {
    marginLeft: sizes.screenWidth * 0.052,
    marginRight: sizes.screenWidth * 0.052,
    marginTop: sizes.screenHeight * 0.02,
    // backgroundColor: 'red',
    height: sizes.screenHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.052,
  },

  containerImage: {
    marginTop: sizes.screenHeight * 0.012,
    width: sizes.screenHeight * 0.22,
    height: sizes.screenHeight * 0.24,
    borderRadius: sizes.screenWidth * 0.042,
    // borderRadius: 22,
  },

  row: {
    marginTop: sizes.screenHeight * 0.019,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: sizes.screenWidth * 0.03,
  },

  textWhite: {
    color: colors.white,
    fontSize: fontSize.small,
  },

  marginTop: {
    marginTop: sizes.screenHeight * 0.107,
  },
  bluredImg: {
    height: sizes.screenHeight * 0.099,
    marginLeft: sizes.screenWidth * 0.03,
    marginRight: sizes.screenWidth * 0.03,
    borderRadius: sizes.screenHeight * 0.012,
    width: sizes.screenWidth * 0.392,
    opacity: 0.9,
  },

  textDarkerblack: {
    // backgroundColor: 'orange',
    color:colors.black,
    fontWeight: '700',
    fontSize: fontSize.small,
  },
  textBlack: {
    color: colors.black,
    fontSize: fontSize.extraSmall,
    fontWeight: '700',
  },
  appointmentContainer: {
    // backgroundColor: 'red',
    marginLeft: sizes.screenWidth * 0.042,
    marginTop: sizes.screenHeight * 0.009,
    gap: sizes.screenHeight * 0.007,
  },
  locationContainer: {
    // marginTop: sizes.screenHeight * 0.007,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  locationImg: {
    width: sizes.screenWidth * 0.04,
    // backgroundColor: 'purple',
    height: sizes.screenHeight * 0.013,
  },
  bookBtn: {
    // marginTop: sizes.screenHeight * 0.002,
    backgroundColor: colors.btnColor,
    height: sizes.screenHeight * 0.032,
    width: sizes.screenWidth * 0.362,
    borderRadius: sizes.screenWidth * 0.022,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    fontSize: fontSize.small,
    color: colors.white,
    marginLeft: sizes.screenWidth * 0.042,
  },
  arrowStyle: {
    height: sizes.screenHeight * 0.012,
    // backgroundColor: 'orange'
  },

  // reviewContainer: {
  //   height : sizes.screenHeight
  // },
});
