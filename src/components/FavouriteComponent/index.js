import { TouchableOpacity } from "react-native-gesture-handler";
import images from "../../services/utilities/images";
import { useNavigation } from '@react-navigation/native';
import { Image, Platform, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/userData";
import { useEffect, useState } from "react";
import { styles } from "./style";

export default function Favourites() {
    const userData = useSelector(selectUserData)
    const navigation = useNavigation();

    // const [totalUnseenNotification, setTotalUnseenNotification] = useState(0)

    // useEffect(() => {
    //     if (userData?.notification?.length > 0) {
    //         handleCalculateTotalUnseenNotification()
    //     }
    // }, [userData]);

    // const handleCalculateTotalUnseenNotification = async () => {
    //     const totalUnseenNotification = userData?.notification?.filter(notification => userData?.role == 'user' ? notification?.userSeen === false : notification?.barberSeen === false).length

    //     setTotalUnseenNotification(totalUnseenNotification)
    //     console.log("Total unseen notification:", totalUnseenNotification);

    // }

    return (
        <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => {
                navigation.navigate('UserFavourites');
            }}
            >
            <Image style={styles.iconImage} source={images.Bookmark} />
        </TouchableOpacity>
    )
}