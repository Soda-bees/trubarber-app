import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    TextInput,
    SafeAreaView,
    Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../services/utilities/images';
import Backarrow from '../../components/BackArrow/index.js';
import Button from '../../components/Button';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';
import { colors, sizes } from '../../services';
import { useSelector } from 'react-redux';
import { selectbarber } from '../../store/barber/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import { selectlocation } from '../../store/location/index.js';
import { selectUserData } from '../../store/userData/index.js';
import Header from '../../components/Header/index.js';
import { styles } from './style.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function UserFavourites({ navigation }) {
    const userData = useSelector(selectUserData)
    const barbers = userData?.favourites
    const [btnActive, setactive] = useState('barber');
    const location = useSelector(selectlocation) || userData?.location
    const [search, setSearch] = useState('');
    const [barberData, setBarberdata] = useState([]);
    const [servicesData, setserviceData] = useState([]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };
    const extractServiceData = () => {
        let servicesData = [];

        barbers?.forEach(barber => {
            if (barber.services) {
                barber.services.forEach(service => {
                    const existingService = servicesData.find(
                        s => s.name === service.name,
                    );

                    if (!existingService) {
                        servicesData.push({
                            name: service.name,
                            icon: service.icon,
                        });
                    }
                });
            }
        });
        return servicesData;
    };

    useEffect(() => {
        setserviceData(extractServiceData());
    }, [barbers]);

    // const filteredBarbers = search
    //   ? (() => {
    //       const searchLower = search.toLowerCase();
    //       const filtered = barbers.filter(item =>
    //         item.name.toLowerCase().includes(searchLower),
    //       );
    //       return filtered.length > 0 ? filtered : null;
    //     })()
    //   : null;

    const filteredBarbers = search
        ? barbers.filter(item => {
            const searchLower = search.toLowerCase();
            const nameMatches = item.name.toLowerCase().includes(searchLower);
            return nameMatches;
        })
        : barbers;

    const calculateAverageRating = reviews => {
        if (reviews && reviews.length > 0) {
            const totalRating = reviews.reduce(
                (sum, review) => sum + parseFloat(review.rating),
                0,
            );
            return totalRating / reviews.length;
        } else {
            return 0;
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Header title={'Favourites'} />
                <View style={styles.inputContainer}>
                    <Image
                        source={images.search}
                        resizeMode="contain"
                        style={styles.search}
                    />
                    <TextInput
                        placeholderTextColor={colors.placeholdertextgray}
                        style={styles.input}
                        placeholder="Search..."
                        onChangeText={text => {
                            setSearch(text);
                        }}
                    />
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <View
                        style={
                            Platform.OS == 'android'
                                ? styles.contentMargin
                                : styles.contentMarginIOS
                        }>
                        {filteredBarbers?.length > 0 ? filteredBarbers?.map((item, index) => {
                            console.log("filter length", filteredBarbers?.length);
                            const distance = calculateDistance(
                                location?.latitude,
                                location?.longitude,
                                item.location.latitude,
                                item.location.longitude,
                            );
                            return (
                                <ImageBackground
                                    key={index}
                                    source={{ uri: item?.businessProfile }}
                                    imageStyle={
                                        Platform.OS == 'android'
                                            ? styles.containerImage
                                            : styles.containerImageIOS
                                    }
                                    style={styles.containerImage}
                                >
                                    <View style={styles.row}>
                                        <Text style={styles.textWhite}>
                                            {calculateAverageRating(item.reviews)}
                                        </Text>
                                        <StarRating
                                            maxStars={1}
                                            starSize={12}
                                            color={colors.gold}
                                            rating={1}
                                        />
                                    </View>
                                    <ImageBackground
                                        source={images.bluredImg}
                                        imageStyle={styles.bluredImg}
                                        style={styles.bluredImg}>
                                        <View style={styles.appointmentContainer}>
                                            <Text style={styles.textDarkerblack}>
                                                {item?.name}
                                            </Text>
                                            <View style={styles.locationContainer}>
                                                <Image
                                                    source={images.Location}
                                                    resizeMode="contain"
                                                    style={styles.locationImg}
                                                />
                                                {distance !== null && (
                                                    <Text style={styles.textBlack}>
                                                        {`${distance.toFixed(2)} km`}
                                                    </Text>
                                                )}
                                            </View>
                                            <TouchableOpacity
                                                style={styles.bookBtn}
                                                onPress={() =>
                                                    navigation.navigate('BookAppointment', { item, tabName: 'About' })
                                                }>
                                                <Text style={styles.btnText}>Book Appointment</Text>
                                                <Image
                                                    source={images.arrowIcon}
                                                    resizeMode="contain"
                                                    style={styles.arrowStyle}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                </ImageBackground>
                            );
                        })
                            : userData?.favourites?.length > 0 ?
                                <View style={styles.noFavConatiner}>
                                    <Image style={styles.noFavIcon} source={images.noSearch} />
                                    <Text style={styles.noFavText}>Not found</Text>
                                </View> :
                                <View style={styles.noFavConatiner}>
                                    <Image style={styles.noFavIcon} source={images.noBookmark} />
                                    <Text style={styles.noFavText}>You don't have any favourite barbers</Text>
                                </View>
                        }
                    </View>
                    <View
                        style={{
                            paddingBottom:
                                Platform.OS == 'ios' && sizes.screenHeight * 0.18,
                        }}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

