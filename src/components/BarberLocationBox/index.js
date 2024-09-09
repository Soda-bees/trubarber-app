import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import images from "../../services/utilities/images";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/userData";
import { useCallback, useEffect, useState } from "react";
import { getAddressFromCoordinates } from "../../services/config/API";
import { colors } from "../../services";

export default function BarberLocation({ user }) {
    const userData = useSelector(selectUserData)
    const navigation = useNavigation();

    const [address, setAddress] = useState(null);
    const [locationLoader, setLocationLoader] = useState(false);

    const getAddress = async (latitude, longitude) => {
        setLocationLoader(true);
        try {
            const response = await getAddressFromCoordinates(latitude, longitude);
            setAddress(response)
            setLocationLoader(false);
        } catch (error) {
            console.log(error);
            setLocationLoader(false);
        }
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         if (userData?.location?.latitude && userData?.location?.longitude) {
    //             getAddress(userData.location.latitude, userData.location.longitude);
    //         }

    //     }, [userData])
    // );

    useEffect(() => {
        if (userData?.location?.latitude && userData?.location?.longitude) {
            getAddress(userData.location.latitude, userData.location.longitude);
        }
    }, [userData])

    return (
        <TouchableOpacity style={user ? styles.locationRowUser : styles.locationRow}
            activeOpacity={1}
            onPress={() => {
                user ?
                    navigation.navigate('WholeMap') : navigation.navigate('EditBusinessProfile')
            }}
        >
            <View style={styles.locationContainertop}>
                {
                    locationLoader ?
                        <ActivityIndicator size={20} color={colors.black} /> :
                        <Image style={styles.iconImage} source={images.redLocation} />
                }
            </View>
            <View style={styles.locationDetailColumn}>
                <Text style={styles.nearbyTxt}>
                    {user ? "Find barber near" : "Barber’s Location"}
                </Text>
                <Text style={Platform.OS == 'android' ? styles.currentLocationTxt : styles.currentLocationTxtIOS} numberOfLines={1} ellipsizeMode="tail"> 
                    {address}
                </Text>
            </View>
        </TouchableOpacity>
    )
}