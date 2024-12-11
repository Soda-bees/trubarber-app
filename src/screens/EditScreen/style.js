import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  borderBottom: {
    // backgroundColor: colors.lightgray,
    borderBottomWidth: sizes.screenWidth * 0.002,
    borderColor: colors.grayBorder,
    // marginTop: sizes.screenHeight * 0.021
    // opacity: 0.4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: sizes.screenHeight * 0.04,
    marginBottom: sizes.screenHeight * 0.0098,
  },
  // arrowTop:{
  //     marginTop: sizes.screenHeight *0.052,
  //     // backgroundColor : 'red',
  // },
  arrowTop: {
    marginLeft: sizes.screenWidth * 0.03,
  },

  headerText: {
    color: colors.black,
    fontWeight: '700',
    // backgroundColor: 'red',
    flexGrow: 1,
    marginRight: sizes.screenWidth * 0.07,
    textAlign: 'center',
    fontSize: fontSize.h7,
  },
  contentContainer: {
    // backgroundColor: 'orange',
    marginTop: sizes.screenHeight * 0.042,
    marginLeft: sizes.screenWidth * 0.072,
    marginRight: sizes.screenWidth * 0.072,
    height: sizes.screenHeight * 0.21,
    borderWidth: sizes.screenWidth * 0.002,
    borderColor: colors.selectorcolor,
    borderRadius: sizes.screenWidth * 0.042,
  },
  contentAlligment: {
    marginTop: sizes.screenHeight * 0.04,
    // marginLeft: sizes.screenWidth * 0.042,
    // flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.05,
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },
  youngMan: {
    borderRadius: sizes.screenWidth * 200,
    height: sizes.screenWidth * 0.22,
    width: sizes.screenWidth * 0.22,
  },

  uploadPhoto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.0122,
  },

  editProfileimg: {
    height: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.05,
  },
  photoText: {
    color: colors.black,
    fontWeight: '500',
    borderBottomWidth: sizes.screenWidth * 0.002,
    borderColor: colors.black,
    fontSize: fontSize.medium,
    // paddingTop: sizes.screenHeight
  },

  inputField: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.selectorcolor,
    height: sizes.screenHeight * 0.07,
  },
  inputFieldDes: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.selectorcolor,
    // height: sizes.screenHeight * 0.07,
  },

  wholeContainer: {
    marginTop: sizes.screenHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.selectorcolor,
    height: sizes.screenHeight * 0.07,
  },
  inputContainer: {
    marginLeft: sizes.screenWidth * 0.04,
    marginRight: sizes.screenWidth * 0.04,
  },
  Message: {
    height: sizes.screenHeight * 0.02,
  },
  Nextbtn: {
    marginTop: sizes.screenHeight * 0.46,
  },
  rowInput: {
    alignItems: 'center',
    paddingLeft: sizes.screenWidth * 0.03,
    flexDirection: 'row',
  },

  inputImage: {
    height: sizes.screenHeight * 0.017,
    width: sizes.screenWidth * 0.06,
    resizeMode: 'contain',
  },
  input: {
    width: sizes.screenWidth * 0.7,
    color: colors.black,
    fontSize: fontSize.small,
    marginLeft: sizes.screenWidth * 0.01
  },

  btn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.03,
  },
  btn2: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.screenHeight * 0.11,
  },

  btnIOS: {
    position: 'absolute',
    alignSelf: "center",
    bottom: sizes.screenHeight * 0.1
  },
  btnIOS2: {
    position: 'absolute',
    alignSelf: "center",
    bottom: sizes.screenHeight * 0.18
  },
  description: {
    color: colors.black,
    // fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    paddingHorizontal: sizes.screenWidth * 0.03,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
  },
  descriptionIOS: {
    color: colors.black,
    // fontWeight: '600',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.selectorcolor,
    paddingHorizontal: sizes.screenWidth * 0.03,
    borderRadius: sizes.screenWidth * 0.02,
    position: 'relative',
    height: sizes.screenHeight * 0.1,
    paddingTop: sizes.screenHeight * 0.01
  },
  clockIcon: {
    height: sizes.screenHeight * 0.0222,
    width: sizes.screenWidth * 0.042,
    // top:15
    position: 'absolute',
    right: sizes.screenWidth * 0.03,
    top: sizes.screenWidth * 0.025
  },
  modalContainer: {
    paddingVertical:sizes.screenWidth * 0.03,
    width: sizes.screenWidth,
    // height: sizes.screenHeight * 0.12,
    backgroundColor: colors.disabledBg,
    alignSelf: 'center',
    // position: 'absolute',
    bottom: 0,
    borderTopRightRadius: sizes.screenWidth * 0.05,
    borderTopLeftRadius: sizes.screenWidth * 0.05,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  modalContainerIOS: {
    paddingVertical:sizes.screenWidth * 0.05,
    width: sizes.screenWidth,
    // height: sizes.screenHeight * 0.12,
    backgroundColor: colors.disabledBg,
    alignSelf: 'center',
    // position: 'absolute',
    bottom: sizes.screenHeight * 0.06,
    borderTopRightRadius: sizes.screenWidth * 0.05,
    borderTopLeftRadius: sizes.screenWidth * 0.05,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },

  imgStyle:{
    resizeMode:'contain',
    width:sizes.screenWidth * 0.07,
    height:sizes.screenWidth * 0.07,
    // backgroundColor:'yellow'
  },

  bottomViewImg:{
    padding:10,
    // backgroundColor:'red',
    borderRadius:sizes.screenHeight * 0.1,
    borderWidth:1,
    borderColor:colors.black,
  },

  deleteText:{
    marginLeft: sizes.screenWidth * 0.032,
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

  btnViewLightCenter: {
    backgroundColor: colors.red,
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
});
