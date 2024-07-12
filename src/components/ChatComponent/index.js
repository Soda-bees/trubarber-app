import { TouchableOpacity } from "react-native-gesture-handler";
import images from "../../services/utilities/images";
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/userData";
import { useEffect, useState } from "react";
import { styles } from "./style";

export default function ChatConponent() {
    const userData = useSelector(selectUserData)
    const navigation = useNavigation();

    const [totalUnseenMessage, setTotalUnseenMessage] = useState(0)

    useEffect(() => {
        if (userData?.chat?.length > 0) {
            handleCelculateTotalUnseenMessage()
        }
    }, [userData]);

    const handleCelculateTotalUnseenMessage = async () => {
        let totalUnseenMessages = 0;

        userData?.chat?.forEach(chatRoom => {
            const unseenMessagesCount = chatRoom.messages.filter(message => !message.seen && message.sender !== userData._id).length;

            totalUnseenMessages += unseenMessagesCount;
        });

        setTotalUnseenMessage(totalUnseenMessages)
        console.log("Total unseen messages:", totalUnseenMessages);

    }

    return (
        <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => {
                navigation.navigate('Chats');
            }}>
            {
                totalUnseenMessage > 0 &&
                <View style={styles.unseenTextContainer}>
                    <Text style={styles.unseenText}>{totalUnseenMessage}</Text>
                </View>
            }
            <Image style={styles.iconImage} source={images.chat} />
        </TouchableOpacity>
    )
}