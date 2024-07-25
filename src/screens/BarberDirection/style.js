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
    // height: sizes.screenHeight * 0.17,
    width: sizes.screenWidth,
    // position: 'absolute',
    // top: sizes.screenHeight * 0.2
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizes.screenWidth * 0.04,
    borderWidth: sizes.screenWidth * 0.003,
    borderColor: colors.emptyStar,
    marginHorizontal: sizes.screenWidth * 0.05,
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 0.062,
    marginTop: sizes.screenHeight * 0.023,
    justifyContent: 'center',
    // position: 'absolute',
    // top: sizes.screenHeight * 0.003
  },
  search: {
    height: sizes.screenHeight * 0.024,
  },
  input: {
    width: sizes.screenWidth * 0.78,
    color: colors.black,
  },
  mapContainer: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  topIconRow: {
    flexDirection: 'row',
    marginHorizontal: sizes.screenWidth * 0.05,
    marginVertical:sizes.screenHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationRow: {
    flexDirection: 'row',
    height: sizes.screenHeight * 0.064,
    backgroundColor: colors.lightgray,
    borderRadius: sizes.screenWidth * 0.04,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.02,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  locationDetailColumn: {
    marginStart: sizes.screenWidth * 0.02,
    marginEnd: sizes.screenWidth * 0.04,
  },
  nearbyTxt: {
    color: colors.gray,
    fontSize: fontSize.small,
    fontWeight: '400',
  },
  currentLocationTxt: {
    color: colors.black,
    fontSize: fontSize.small,
    fontWeight: 'bold',
  },
  locationContainertop: {
    backgroundColor: colors.pinkBtnbackground,
    height: sizes.screenHeight * 0.046,
    width: sizes.screenWidth * 0.09,
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContainer: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight * 0.064,
    width: sizes.screenWidth * 0.13,
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    // marginEnd:sizes.screenWidth* 0.02
  },
  iconImage: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenWidth * 0.042,
    resizeMode: 'contain',
  },
  otherIconRow: {
    flexDirection: 'row',
    height: sizes.screenHeight * 0.064,
    borderRadius: sizes.screenWidth * 0.04,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: sizes.screenWidth * 0.29,
  },
  mapStyle: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
  },
  contentMargin: {
    marginLeft: sizes.screenWidth * 0.052,
    marginRight: sizes.screenWidth * 0.052,
    // marginTop: sizes.screenHeight * 0.02,
    // backgroundColor: 'red',
    height: sizes.screenHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.052,
  },

  containerImage: {
    // marginTop: sizes.screenHeight * 0.012,
    width: sizes.screenHeight * 0.42,
    height: sizes.screenHeight * 0.38,
    borderRadius: sizes.screenWidth * 0.042,
    // top: sizes.screenHeight
    // borderRadius: 22,
  },
  row: {
    marginTop: sizes.screenHeight * 0.019,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: sizes.screenWidth * 0.03,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: sizes.screenWidth * 0.8,
    alignItems: 'center',
  },

  textWhite: {
    color: colors.white,
    fontSize: fontSize.small,
  },

  marginCardtop: {
    marginTop: sizes.screenHeight * 0.197,
  },
  bluredImg: {
    height: sizes.screenHeight * 0.12,
    marginLeft: sizes.screenWidth * 0.03,
    marginRight: sizes.screenWidth * 0.03,
    borderRadius: sizes.screenHeight * 0.012,
    width: sizes.screenWidth * 0.782,
    opacity: 0.9,
  },

  textDarkerblack: {
    // backgroundColor: 'orange',
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.small,
  },
  textBlack: {
    color: colors.black,
    fontSize: fontSize.small,
    fontWeight: '700',
  },
  appointmentContainer: {
    // backgroundColor: 'red',
    marginLeft: sizes.screenWidth * 0.062,
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
    height: sizes.screenHeight * 0.042,
    width: sizes.screenWidth * 0.7,
    borderRadius: sizes.screenWidth * 0.022,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    // fontSize: fontSize.small,
    color: colors.white,
    marginLeft: sizes.screenWidth * 0.042,
  },
  arrowStyle: {
    height: sizes.screenHeight * 0.012,
    // backgroundColor: 'orange'
  },
  modalPosition: {
    top: sizes.screenHeight * 0.24,
    alignSelf: 'center',
    marginRight: sizes.screenWidth * 0.08,
  },
  crossIcon: {
    height: sizes.screenHeight * 0.018,
    marginTop: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.04,
  },

  locationImgIcon: {
    width: sizes.screenWidth * 0.25,
    height: sizes.screenWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex:1,
    // backgroundColor:'black'
  },

  customMarker: {
    // backgroundColor: '#2A9D8F',
    padding: 5,
    borderRadius: 5,
  },
  markerText: {
    color: '#fff',
    fontSize: 25,
  },

  markerIngStyle: {
    width: sizes.screenWidth * 0.08,
    height: sizes.screenWidth * 0.08,
    backgroundColor: 'red',
    marginBottom: 25,
    borderRadius: sizes.screenWidth * 0.1,
    borderColor: colors.white,
    borderWidth: 1,
  },

  bottomView:{
    backgroundColor:'white',
    width:sizes.screenWidth,
    height:sizes.screenHeight * 0.08,
    position:'absolute',
    bottom:0,
    borderTopLeftRadius:sizes.screenWidth * 0.07,
    borderTopRightRadius:sizes.screenWidth * 0.07,
  },
  distanceDuration:{
    backgroundColor:colors.white,
    width:sizes.screenWidth * 0.4,
    height:sizes.screenHeight * 0.08,
    position:'absolute',
    bottom:5,
    right:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    borderWidth:1,
    borderColor:'red'
  },
  distanceText:{
    color:'black',
    // backgroundColor:'red',
    fontSize:fontSize.medium,
  }
});
