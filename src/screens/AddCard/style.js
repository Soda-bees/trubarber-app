import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },



  header: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'center',
    borderBottomWidth: 0.4,
    // marginBottom : sizes.screenHeight * 0.12
  },
  headerText: {
    // backgroundColor: 'orange',
    fontSize: fontSize.h7,
    color: colors.black,
    width: sizes.screenWidth * 0.8,
    marginTop: sizes.screenHeight * 0.06,
    textAlign: 'center',
    fontWeight: '700',
    marginRight : sizes.screenWidth * 0.092
  },

  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.06,
  },

  allignment: {
    // backgroundColor : 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: sizes.screenHeight * 0.01,
  },
  addCardcontainer: {
    marginTop: sizes.screenHeight * 0.042,
    marginLeft: sizes.screenWidth * 0.082,
    marginRight: sizes.screenWidth * 0.082,
  },

  title: {
    color:colors.black,
    fontWeight: '600',
  },
  grayText: {
    color: colors.grayText,
  },
  inputColor: {
    marginTop: sizes.screenHeight * 0.012,
    backgroundColor: colors.selectorcolor,
    color: colors.grayText,
    borderRadius: sizes.screenWidth* 0.03,
    paddingLeft: sizes.screenWidth * 0.032,
  },
  inputColorIOS: {
    marginTop: sizes.screenHeight * 0.012,
    backgroundColor: colors.selectorcolor,
    color: colors.grayText,
    borderRadius: sizes.screenWidth* 0.03,
    paddingLeft: sizes.screenWidth * 0.032,
    height:sizes.screenHeight * 0.05
  },

  marginTop: {
    marginTop: sizes.screenHeight * 0.042,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullWidth: {
    // backgroundColor: 'orange',
    width: sizes.screenWidth * 0.4,
  },

  button: {
    // marginTop: sizes.screenHeight * 0.342,
    position:'absolute',
    bottom:sizes.screenHeight * 0.1,
    alignSelf:'center',
  },


  modal: {
    backgroundColor: colors.lightgray,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: sizes.screenWidth * 0.17,
    marginRight: sizes.screenWidth * 0.17,
    height: sizes.screenHeight * 0.24,
    borderRadius: sizes.screenWidth* 0.03,
  },

  approvedWallet: {
    height: sizes.screenHeight * 0.082,
  },

  modalText: {
    marginTop: sizes.screenHeight * 0.022,
    textAlign: 'center',
    width: sizes.screenWidth * 0.4,
    fontSize : fontSize.medium,
    fontWeight : '400',
    color: colors.black,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
  },


  btn:{
    width: sizes.screenWidth*0.5,
    alignSelf: 'center',
    backgroundColor: colors.black
  }
});
