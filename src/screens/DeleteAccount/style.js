import { StyleSheet } from "react-native";
import { colors, fontSize, sizes } from "../../services";

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.lightgray,
        height: sizes.screenHeight,
    },

    profileImg:{
        width: sizes.screenWidth * 0.22,
        height: sizes.screenHeight * 0.1,
        borderRadius: sizes.screenWidth * 0.9,
        resizeMode:'contain',
        borderWidth:1,
        borderColor:colors.grayBg2
    },

    userName:{
        fontSize: fontSize.h4,
        marginLeft:10
    },

    imgNameMainView:{
        flexDirection: 'row',
        alignItems:'center',
        marginTop:sizes.screenHeight * 0.05,
        marginLeft:sizes.screenWidth * 0.07
    },

    deleteAccountText:{
        fontSize: fontSize.medium,
        padding:20
    },

    inputField:{
        width:sizes.screenWidth * 0.85,
        height:sizes.screenHeight * 0.06,
        alignSelf:'center',
        borderBottomColor:'black',
        borderBottomWidth:1
    },

    buttonView:{
        position:'absolute',
        bottom:sizes.screenHeight * 0.1,
        alignSelf:'center'
    },

    modalMainView:{
        width:sizes.screenWidth * 0.9,
        backgroundColor:colors.white,
        borderRadius:15,
        padding:15
    },

    modalHeading:{
        fontSize: fontSize.h5,
        fontWeight:'600'
    },

    modalText:{
        fontSize: fontSize.medium,
        marginTop:6
    },

    deleteButton:{
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:sizes.screenWidth * 0.02,
        paddingVertical:16,
        marginTop:sizes.screenHeight * 0.05,
        marginBottom:12
    },

    deleteButtonText:{
        fontSize: fontSize.large,
        color:colors.white,
        fontWeight:'600'
    },
    cancelButton:{
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:sizes.screenWidth * 0.02,
        paddingVertical:15,
        borderWidth:1
    },

    cancelButtonText:{
        fontSize: fontSize.large,
        color:colors.black,
        fontWeight:'600'
    },

    inputImgView:{
        flexDirection:'row',
        // backgroundColor:'yellow',
        alignSelf:'center'
    },

    passImg:{
        height: sizes.screenHeight * 0.025,
        width: sizes.screenHeight * 0.025,
        position:'absolute',
        right:10,
        top:15
        // alignSelf:'flex-end',
    },

})