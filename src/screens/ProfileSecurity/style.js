import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  borderBottom: {
    // backgroundColor: colors.lightgray,
    borderBottomWidth: sizes.screenWidth* 0.002,
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
    width: sizes.screenWidth * 0.5,
    textAlign: 'center',
    color: colors.black,
    fontWeight: '600',
    marginTop: sizes.screenHeight * 0.052
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


  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes.screenHeight * 0.08,
    borderRadius: sizes.screenWidth * 0.03,
    width: sizes.screenWidth * 0.85
    
  },

  inputimage: {
    height: sizes.screenHeight * 0.025,
  },

  input: {
    width: sizes.screenWidth * 0.7,
    paddingLeft : sizes.screenWidth * 0.050,
    color: colors.black,
  },
  inputContainer: {
    marginTop: sizes.screenHeight * 0.06,
    marginLeft: sizes.screenWidth * 0.08,
    marginRight: sizes.screenWidth * 0.08,
    alignItems: 'center',
    gap: sizes.screenHeight * 0.032
  },
  wholeInput: {
    marginLeft: sizes.screenWidth * 0.08,
    marginRight: sizes.screenWidth * 0.08,
    backgroundColor: colors.selectorcolor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    height: sizes.screenHeight * 0.07,
  },

  btn: {
    marginTop: sizes.screenHeight* 0.33
  },
  btnIOS: {
    marginTop: sizes.screenHeight* 0.29
  },
});
