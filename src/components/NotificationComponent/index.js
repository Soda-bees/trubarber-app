import { TouchableOpacity } from "react-native-gesture-handler";
import images from "../../services/utilities/images";
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/userData";
import { useEffect, useState } from "react";
import { styles } from "./style";

export default function NotificationComponent() {
    const userData = useSelector(selectUserData)
    const navigation = useNavigation();

    const [totalUnseenNotification, setTotalUnseenNotification] = useState(0)

    useEffect(() => {
        if (userData?.notification?.length > 0) {
            handleCalculateTotalUnseenNotification()
        }
    }, [userData]);

    const handleCalculateTotalUnseenNotification = async () => {
        const totalUnseenNotification = userData?.notification?.filter(notification => userData?.role == 'user' ? notification?.userSeen === false : notification?.barberSeen === false).length

        setTotalUnseenNotification(totalUnseenNotification)
        console.log("Total unseen notification:", totalUnseenNotification);

    }

    return (
        <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => {
                navigation.navigate('Notifications');
            }}>
            {
                totalUnseenNotification > 0 &&
                <View style={styles.unseenTextContainer}>
                    <Text style={styles.unseenText}>{totalUnseenNotification}</Text>
                </View>
            }
            <Image style={styles.iconImage} source={images.notification} />
        </TouchableOpacity>
    )
}