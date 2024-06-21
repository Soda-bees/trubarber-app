import {StyleSheet} from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: sizes.screenHeight,
  },
  mainView: {
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'space-between',
    height: sizes.screenHeight * 0.84,
    marginTop:sizes.screenHeight * 0.05,
  },

  centerView:{
    justifyContent: 'center',
    alignItems:'center',
  },
  imgStyle:{
    width:sizes.screenWidth * 0.2,
    height:sizes.screenWidth * 0.2,
    marginBottom:15
  },

  textStyle:{
    color:colors.black,
    fontSize:fontSize.h3,
    fontWeight:'600',
    width:sizes.screenWidth * 0.6,
    textAlign:'center',
  },

  textStyle1:{
    color:colors.disabledBg3,
    width:sizes.screenWidth * 0.7,
    textAlign:'center',
    fontSize:fontSize.medium,
  },

  backArrowStyle:{
    marginLeft: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.04,
  },

  loaderBtnStyle:{
    backgroundColor: colors.btnColor,
    // padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.85,
    height:sizes.screenHeight * 0.07,
    // paddingHorizontal:sizes.screenWidth * 0.05,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
