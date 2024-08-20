import {StyleSheet} from 'react-native';
import {colors} from '../../services/utilities/colors';
import {fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
    loaderContainer: {
      width:sizes.screenWidth * 0.8,
      height:sizes.screenHeight * 0.063,
      alignItems:'center',
      alignSelf:'center',
      justifyContent:'center',
      marginTop:sizes.screenHeight * 0.02,
      borderRadius:sizes.screenWidth * 0.04,
      backgroundColor:colors.btnPurple
      },

      btnView: {
        backgroundColor: colors.btnColor,
        // padding: sizes.screenHeight * 0.02,
        width: sizes.screenWidth * 0.85,
        height:sizes.screenHeight * 0.07,
        paddingHorizontal:sizes.screenWidth * 0.05,
        alignSelf: 'center',
        borderRadius: sizes.screenWidth * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      btnText: {
        marginLeft : sizes.screenWidth * 0.032,
        color: colors.white,
        fontSize: fontSize.medium,
        fontWeight: '600',
        fontSize: fontSize.h6,
      },

      acceptBtn:{
        // backgroundColor:colors.red,
        flexGrow:1,
        alignItems:'center',
        paddingVertical:sizes.screenWidth * 0.02,
        borderRadius:sizes.screenWidth * 0.02,
        justifyContent:'center',
        width:50
      },

      btnText1:{
        fontSize:fontSize.smallM,
        color:colors.white
      }
});