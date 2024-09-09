import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
    locationRow: {
        flexDirection: 'row',
        height: sizes.screenHeight * 0.064,
        backgroundColor: colors.lightgray,
        borderRadius: sizes.screenWidth * 0.04,
        paddingHorizontal: sizes.screenWidth * 0.03,
        paddingVertical: sizes.screenHeight * 0.02,
        alignItems: 'center',
        alignSelf: 'flex-start',
        width:sizes.screenWidth * 0.55
    },
    locationRowUser: {
        flexDirection: 'row',
        height: sizes.screenHeight * 0.064,
        backgroundColor: colors.lightgray,
        borderRadius: sizes.screenWidth * 0.04,
        paddingHorizontal: sizes.screenWidth * 0.03,
        paddingVertical: sizes.screenHeight * 0.02,
        alignItems: 'center',
        alignSelf: 'flex-start',
        width:sizes.screenWidth * 0.43
    },
    locationContainertop: {
        backgroundColor: colors.grayBorder,
        height: sizes.screenHeight * 0.046,
        width: sizes.screenWidth * 0.09,
        borderRadius: sizes.screenWidth * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        height: sizes.screenHeight * 0.03,
        width: sizes.screenWidth * 0.042,
        resizeMode: 'contain',
        tintColor: colors.black
    },
    locationDetailColumn: {
        marginStart: sizes.screenWidth * 0.02,
        marginEnd: sizes.screenWidth * 0.04,
        overflow:'hidden'
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
    currentLocationTxtIOS: {
        color: colors.black,
        fontSize: fontSize.small,
        fontWeight: 'bold',
        width:sizes.screenWidth * 0.3,
    },
})