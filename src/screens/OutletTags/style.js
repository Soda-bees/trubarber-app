import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  backArrow: {
    marginLeft: sizes.screenWidth * 0.042,
    marginTop: sizes.screenHeight * 0.03,
  },

  forgotPass: {
    marginTop: sizes.screenHeight * 0.07,
    textAlign: 'center',
    fontSize: fontSize.h4,
    color:colors.black,
    fontWeight: '900',
  },

  adjustWidth: {
    alignItems: 'center',
  },

  subText: {
    textAlign: 'center',
    width: sizes.screenWidth * 0.7,
    marginTop: sizes.screenHeight * 0.01,
    fontSize: fontSize.medium,
    color: colors.placeholdertextgray
  },

  centerContent: {
      justifyContent: 'center',
      marginTop: sizes.screenHeight * 0.072,
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    marginHorizontal:sizes.screenWidth* 0.08

  },

  tagContainernotSelected: {
    marginRight: sizes.screenWidth * 0.017,
    backgroundColor: colors.selectorcolor,
    marginBottom: sizes.screenHeight * 0.009,
    height: sizes.screenHeight * 0.06,
    justifyContent: 'center',
    borderRadius: sizes.screenWidth* 0.03,
    alignItems: 'center',
  },
  tagContainerselected: {
    marginRight: sizes.screenWidth * 0.017,
    backgroundColor: colors.blackGrey,
    marginBottom: sizes.screenHeight * 0.009,
    height: sizes.screenHeight * 0.06,
    justifyContent: 'center',
    borderRadius: sizes.screenWidth* 0.03,
    alignItems: 'center',
  
  },
  notSelectedtext:{
    color: colors.grayText,
    paddingLeft: sizes.screenWidth * 0.02,
    paddingRight: sizes.screenWidth * 0.02,
  },
  selectedText:{
    color: colors.white,
    fontWeight: '400',
    paddingLeft: sizes.screenWidth * 0.02,
    paddingRight: sizes.screenWidth * 0.02,
  },


  Nextbtn: {
    position: 'absolute',
    bottom: sizes.screenHeight*0.07,
    alignSelf: 'center'
  },

  NextbtnIOS: {
    position: 'absolute',
    bottom: sizes.screenHeight*0.1,
    alignSelf: 'center'  },

});
