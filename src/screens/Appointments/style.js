import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  borderBottom: {
    borderBottomWidth: sizes.screenWidth * 0.002,
    borderColor: colors.grayBorder,
  },

  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },
  transparentBg: {
    height: sizes.screenHeight * 0.08,
    width: sizes.screenWidth * 0.042,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerContainer: {
    marginTop: sizes.screenHeight * 0.03,
    width: sizes.screenWidth * 0.852,
  },
  headerText: {
    textAlign: 'center',
    fontSize: fontSize.h7,
    color: colors.black,
    fontWeight: '700',
  },

  contentMargin: {
    marginLeft: sizes.screenWidth * 0.052,
    marginRight: sizes.screenWidth * 0.052,
    marginTop: sizes.screenHeight * 0.02,
    height: sizes.screenHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.052,
  },

  barberHat: {
    // backgroundColor: colors.red,
    marginLeft: sizes.screenWidth * 0.042,
    marginRight: sizes.screenWidth * 0.042,
    marginTop: sizes.screenWidth * 0.042,
    height: sizes.screenHeight * 0.22,
    width: sizes.screenWidth * 0.91,
    borderRadius: sizes.screenWidth * 0.042,
    resizeMode: 'cover',
  },

  contextText: {
    color: colors.black,
    fontWeight: '800',
    fontSize: fontSize.large,
  },
  innerContainer: {
    marginTop: sizes.screenHeight * 0.052,
    marginLeft: sizes.screenWidth * 0.1,
    alignItems: 'flex-start',
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.02,
    width:sizes.screenWidth * 0.55,
  },
  whiteLocation: {
    height: sizes.screenHeight * 0.017,
    width: sizes.screenWidth * 0.032,
  },
  location: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: '400',
  },
  detailsContainer: {
    backgroundColor: colors.lightgray,
    width: sizes.screenWidth * 0.806,
    // height: sizes.screenHeight * 0.15,
    marginTop: sizes.screenHeight * 0.032,
    marginLeft: sizes.screenWidth * 0.09,
    borderRadius: sizes.screenWidth * 0.03,
    borderWidth: sizes.screenWidth * 0.002,
    borderColor: colors.emptyStar,
    paddingBottom: 10,
  },

  contentAllignemnt: {
    marginTop: sizes.screenHeight * 0.01,
    marginHorizontal: sizes.screenWidth * 0.025,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  serviceImagecontainer: {
    backgroundColor: colors.selectorcolor,
    width: sizes.screenWidth * 0.14,
    height: sizes.screenHeight * 0.072,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.screenWidth * 0.02,
  },
  serviceImageresize: {
    resizeMode: 'contain',
    height: sizes.screenWidth * 0.07,
    width: sizes.screenWidth * 0.07,
  },

  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.03,
  },
  textBlack: {
    color: colors.black,
    fontWeight: '600',
  },
  duration: {
    fontWeight: '300',
    color: colors.durationColor,
  },

  price: {
    borderWidth: sizes.screenWidth * 0.002,
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes.screenHeight * 0.032,
    width: sizes.screenWidth * 0.14,
    borderRadius: sizes.screenWidth * 0.022,
  },
  priceText: {
    fontSize: fontSize.small,
    color: colors.black,
  },

  dateTimepriceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: sizes.screenHeight * 0.004,
  },
  dateAndtime: {
    color: colors.black,
    fontSize: fontSize.smallM,
  },
  dateAndtimeView: {
    // width:sizes.screenWidth * 0.3,
    marginLeft: sizes.screenWidth * 0.03,
  },

  bookBtn: {
    marginTop: sizes.screenHeight * 0.012,
    marginHorizontal: sizes.screenWidth * 0.012,
    backgroundColor: colors.black,
    height: sizes.screenHeight * 0.042,
    width: sizes.screenWidth * 0.762,
    borderRadius: sizes.screenWidth * 0.022,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  btnText: {
    color: colors.white,
    marginLeft: sizes.screenWidth * 0.082,
  },
  arrowStyle: {
    height: sizes.screenWidth * 0.04,
    marginRight: sizes.screenWidth * 0.042,
  },
  crossStyle: {
    height: sizes.screenWidth * 0.06,
    marginRight: sizes.screenWidth * 0.02,
  },
  scrollContainer: {
    // marginTop: sizes.screenHeight * 0.02,
    marginBottom: sizes.screenHeight * 0.07,
  },

  optionsCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: colors.disabledBg,
    marginTop: 10,
    paddingTop: 10,
  },
  nameView: {
    flexDirection: 'row',
    width: sizes.screenWidth * 0.8,
    justifyContent: 'space-between',
  },
  statusText: {
    backgroundColor: colors.black,
    padding: sizes.screenWidth * 0.011,
    paddingHorizontal:12,
    fontSize: fontSize.medium,
    fontWeight: '500',
    color: colors.white,
    borderRadius: sizes.screenWidth * 0.02,
    overflow: 'hidden',
  },

  appointmentStyle: {
    resizeMode: 'contain',
    width: sizes.screenWidth * 0.1,
    height: sizes.screenWidth * 0.1,
  },

  noAppointmentMainView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: sizes.screenHeight * 0.75,
  },

  appointmentText: {
    color: colors.black,
    fontSize: fontSize.medium,
    marginLeft: 5,
    textAlign: 'center',
    width: sizes.screenWidth * 0.7,
  },

  redLocation: {
    justifyContent: 'flex-start',
    paddingRight: 6,
    height: 16,
    tintColor: colors.black,
    // backgroundColor : 'red',
  },

  barberLocation: {
    fontSize: fontSize.small,
    // color: colors.grayText,
    maxWidth: sizes.screenWidth * 0.5,
    textAlign: 'center',
    // width: sizes.screenWidth * 0.5,
  },
});
