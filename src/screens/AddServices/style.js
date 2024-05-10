import { StyleSheet } from "react-native";
import { colors, fontSize, sizes } from "../../services";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightgray,
        height: sizes.screenHeight,
      },
    
      backArrow: {
        marginLeft: sizes.screenWidth * 0.042,
        marginTop: sizes.screenHeight * 0.03,
      },
    
      centerHeader: {
        alignItems: 'center',
        marginTop: sizes.screenHeight * 0.032,
      },
    
      headerText: {
        fontWeight: '900',
        color: colors.black,
        fontSize: fontSize.large,
      },
    
      subText: {
        textAlign: 'center',
        fontSize: fontSize.medium,
        paddingHorizontal: sizes.screenWidth * 0.06,
        marginTop: sizes.screenHeight * 0.01
      },
    
      serviceImagecontainer: {
        backgroundColor: colors.selectorcolor,
        width: sizes.screenWidth * 0.43,
        height: sizes.screenHeight * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: sizes.screenWidth* 0.05,
        borderWidth:sizes.screenWidth* 0.003,
        borderColor:colors.selectorcolor,
        marginBottom:sizes.screenHeight* 0.01
      },
    
      selectedServiceimagecontainer: {
        // backgroundColor: colors.selectorcolor,
        width: sizes.screenWidth * 0.43,
        height: sizes.screenHeight * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: sizes.screenWidth* 0.05,
        borderWidth:sizes.screenWidth* 0.003,
        borderColor:colors.black,
        marginBottom:sizes.screenHeight* 0.01
      },
    
      serviceImageresize: {
        width: sizes.screenWidth * 0.152,
        height: sizes.screenHeight * 0.09,
        // backgroundColor: 'red'
      },
    
      addServicecontainer: {
        marginTop: sizes.screenHeight * 0.02,
        marginLeft: sizes.screenWidth * 0.092,
        marginRight: sizes.screenWidth * 0.092,
        backgroundColor: colors.selectorcolor,
        height: sizes.screenHeight * 0.042,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius :sizes.screenWidth * 0.012
      },
    
      textBlack: {
        fontSize: fontSize.small,
        color: colors.black,
        fontWeight: '600',
      },
    
      serviceTexts: {
        color:colors.black,
        marginTop:sizes.screenHeight* 0.01,
        fontWeight:'bold',
        fontSize:fontSize.medium
      },
      services: {
        flexDirection:'row',
        marginTop:sizes.screenHeight*0.02,
        flexWrap:'wrap',
        justifyContent: 'space-between',
      },
      nextBtn: {
        top: sizes.screenHeight * 0.06
      },

      nextBtnIOS: {
        top: sizes.screenHeight * 0.02
      },
    
      description: {
        color: colors.black,
        fontWeight: '600',
      },
      containerBody: {
        marginTop: sizes.screenHeight * 0.01,
        paddingHorizontal: sizes.screenWidth * 0.06,
    
      },
    
})