import { StyleSheet } from 'react-native';
import { colors, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
    notificationContainer: {
        backgroundColor: colors.lightgray,
        height: sizes.screenHeight * 0.064,
        width: sizes.screenWidth * 0.13,
        borderRadius: sizes.screenWidth * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    iconImage: {
        height: sizes.screenHeight * 0.025,
        width: sizes.screenWidth * 0.04,
        resizeMode: 'contain',
    },
    unseenText: {
        color: colors.white,
        fontSize: fontSize.small,
        fontWeight: '600'
    },
    unseenTextContainer: {
        position: 'absolute',
        left: 35,
        bottom: 35,
        backgroundColor: colors.red,
        height: 18,
        width: 18,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    unseenTextContainerIOS: {
        position: 'absolute',
        left: 42,
        bottom: 45,
        backgroundColor: colors.red,
        height: 18,
        width: 18,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
})