import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import TimePickerComponent from '../../components/TimePicketComponent';
import Loader from '../../components/Loader';
import { getAddressFromCoordinates, updateProfile, uploadProfile } from '../../services/config/API';
import { ErrorShow } from '../../components/Error';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, sizes } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setUserData } from '../../store/userData';
import formatToJSON from '../../services/config/FormatToJson';
import { selectAuthToken } from '../../store/authToken';
import { styles } from './style';
import Header from '../../components/Header';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { setLocation } from '../../store/location';

export default function EditBusinessProfile({ navigation, route }) {
    // const { userData } = route.params;
    const userData = useSelector(selectUserData)
    const authToken = useSelector(selectAuthToken)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userData) {
            setImgUri(userData?.businessProfile)
            setDescription(userData?.description)
            setTime(userData?.time)
            setLocation(userData?.location)
            setInstagram(userData?.instagram)
        }
    }, [userData])

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    const [outletName, setOutletName] = useState('RedBox Barber');
    const [description, setDescription] = useState('');
    const [imgUri, setImgUri] = useState(null);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [loader, setLoader] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [time, setTime] = useState('')
    const [address, setAddress] = useState(null);
    const [locationLoader, setLocationLoader] = useState(false);
    const [location, setLocalLocation] = useState()
    const [instagram, setInstagram] = useState('')

    const requestCameraPermission = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission granted');
        } else {
            console.warn('Camera permission denied');
        }
    };

    const uploadPhoto = async sourceType => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 800,
            maxHeight: 600,
            includeBase64: false,
            saveToPhotos: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        if (sourceType === 'library') {
            launchImageLibrary(options, response => {
                console.log('Library Response:', response);

                try {
                    const uri =
                        response.uri || (response.assets && response.assets[0].uri);
                    if (uri) {
                        const img = response.assets[0];
                        handleUploadProfile(img);
                    } else {
                        console.warn('No image URI found in library response');
                    }
                } catch (error) {
                    console.error('Error setting imgUri:', error);
                }
            });
        } else if (sourceType === 'camera') {
            await requestCameraPermission();

            launchCamera(options, response => {
                try {
                    const uri = response.assets[0].uri;
                    if (!uri) {
                        const cameraResponseUri = response.path || response.uri;
                        if (cameraResponseUri) {
                            console.log('Using alternative camera URI:', cameraResponseUri);
                            setImgUri(cameraResponseUri);
                            const img = cameraResponseUri.assets[0];
                            handleUploadProfile(img);
                        } else {
                            console.log('No image URI found in camera response');
                        }
                    } else {
                        const img = response.assets[0];
                        handleUploadProfile(img);
                    }
                } catch (error) {
                    console.error('Error setting imgUri:', error);
                }
            });
        }
    };

    const handleUploadProfile = async image => {
        setLoader(true);
        try {
            const img = {
                uri: image.uri,
                type: image.type,
                fileName: image.fileName,
            };
            const formData = new FormData();
            formData.append('image', {
                uri: img.uri,
                type: img.type,
                name: img.fileName,
            });
            const response = await uploadProfile(formData);
            if (response.status == 200) {
                setImgUri(response?.data?.url);
                setLoader(false);
            } else {
                setLoader(false);
                ErrorShow('error', 'Oops', response.message);
                console.log('eles =-=-=->', response.message);
            }
        } catch (error) {
            setLoader(false);
            ErrorShow('error', 'Oops', error.message);
            ErrorShow('error', 'Oops', error);
            console.log('catch=-=-=-=-', error);
        }
    };

    const handleConfirm = async () => {
        if (!instagram) {
            return ErrorShow('error', 'Oops!', 'Please provide your instagram profile link');
        }
        if (!description) {
            return ErrorShow('error', 'Oops!', 'Please fill the description');
        }
        try {
            setLoader(true);
            const body = {
                businessProfile: imgUri,
                description,
                location,
                instagram
            };
            const response = await updateProfile(
                body,
                authToken,
            );
            if (response.status == 200) {
                setLoader(false);
                ErrorShow(
                    'success',
                    'Congratulation!',
                    response?.data?.message,
                    onHide,
                );
                dispatch(setUserData(response?.data?.updatedUser));
            } else {
                setLoader(false);
                ErrorShow('error', 'Oops!', response?.data?.message);
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
            ErrorShow('error', 'Oops!', error?.message);
        }
    };

    const onHide = async () => [navigation.goBack()];

    const formatTime = date => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    };

    const checkDimensions = imgUri => {
        return new Promise((resolve, reject) => {
            Image.getSize(
                imgUri,
                (width, height) => {
                    const aspectRatio = width / height;
                    let calculatedWidth, calculatedHeight;

                    if (width > screenHeight * 0.3) {
                        calculatedWidth = screenHeight * 0.3;
                        calculatedHeight = calculatedWidth / aspectRatio;
                    } else {
                        calculatedWidth = width;
                        calculatedHeight = height;
                    }

                    if (calculatedHeight > screenHeight * 0.3) {
                        calculatedHeight = screenHeight * 0.3;
                        calculatedWidth = calculatedHeight * aspectRatio;
                    }

                    resolve({ width: calculatedWidth, height: calculatedHeight });
                },
                error => {
                    reject(error);
                },
            );
        });
    };

    useEffect(() => {
        const calculateDimensions = async () => {
            try {
                if (!imgUri) {
                    return;
                }
                const { width, height } = await checkDimensions(imgUri);
                setDimensions({ width, height });
            } catch (error) {
                console.error('Error calculating image dimensions:', error);
            }
        };

        calculateDimensions();
    }, [imgUri]);
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

    useEffect(() => {
        getAddress(userData?.location?.latitude, userData?.location?.longitude);
    }, []);

    const handleLocation = () => {
        console.log("handleLocation");

        const initializeLocation = async () => {
            const hasPermission = await requestLocationPermission();
            if (hasPermission) {
                checkLocationServices()
                    .then(() => {
                        getCurrentLocation();
                    })
                    .catch(error => {
                        console.log('Location services not enabled', error.message);
                        Alert.alert(
                            'Location Services Disabled',
                            'Please enable location services to use this feature.',
                        );
                    });
            }
        };

        initializeLocation();
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message:
                            'This app needs access to your location to show your current position on the map.',
                        buttonPositive: 'OK',
                    },
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location permission granted');
                    return true;
                } else {
                    console.log('Location permission denied');
                    return false;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            return true;
        }
    };

    const checkLocationServices = () => {
        return LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message:
                '<h2>Use Location?</h2> This app wants to change your device settings:<br/><br/>Use GPS for location<br/><br/>',
            ok: 'YES',
            cancel: 'NO',
        });
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                // console.log(
                //   position.coords,
                //   '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
                // );
                const locationObj = {
                    ...location,
                    latitude: latitude,
                    longitude: longitude,
                };
                console.log("location object ", locationObj);
                setLocalLocation(locationObj)
                getAddress(locationObj?.latitude, locationObj?.longitude);
                dispatch(setLocation(locationObj));
                // setRegion({
                //   latitude,
                //   longitude,
                //   latitudeDelta: 0.01,
                //   longitudeDelta: 0.01,
                // });
            },
            error => {
                console.log('Error getting location: ', error.message);
                Alert.alert(
                    'Error',
                    'Unable to retrieve your location. Please try again.',
                );
            },
            // {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000},
        );
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Header title={'Edit Business Profile'} />
                    <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={Platform.OS == 'ios' && sizes.screenHeight * 0.9}>
                        {/* <View>
                            <TouchableOpacity
                                style={imgUri ? {
                                    width: dimensions.width,
                                    height: dimensions.height,
                                    borderRadius: sizes.screenWidth * 0.04,
                                    alignSelf: 'center',
                                    marginTop: sizes.screenHeight * 0.03
                                } : styles.uploadImage}
                                onPress={() => uploadPhoto('library')}>
                                {imgUri ? (
                                    <Image
                                        source={{ uri: imgUri }}
                                        style={{
                                            width: dimensions.width,
                                            height: dimensions.height,
                                            borderRadius: sizes.screenWidth * 0.04,
                                        }}
                                    />
                                ) : (
                                    <Image
                                        style={styles.addimage}
                                        source={images.uploadImgbarber}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View
                            style={
                                Platform.OS == 'android'
                                    ? styles.uploadPress
                                    : styles.uploadPressIOS
                            }>
                            <Text style={styles.uploadCover}>Change Photo</Text>
                        </View> */}
                        <View style={{ marginTop: sizes.screenHeight * 0.04 }}></View>
                        <View style={styles.timeContainer}>
                            <Text style={
                                Platform.OS == 'android' ? styles.title : styles.titleIOS
                            }>Update Instagram account</Text>
                            <View style={styles.timeSecond}>
                                <Image
                                    source={images.instagram}
                                    style={styles.instagramIcon}
                                    resizeMode="contain"
                                />
                                <TextInput
                                    placeholder='Add Link'
                                    style={styles.instagramInput}
                                    placeholderTextColor={colors.black}
                                    onChangeText={setInstagram}
                                    value={instagram}
                                />
                            </View>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.textContainer}>
                                <Text
                                    style={
                                        Platform.OS == 'android' ? styles.title : styles.titleIOS
                                    }>
                                    Description
                                </Text>
                                <TextInput
                                    style={Platform.OS == 'android' ? styles.description : styles.descriptionIOS}
                                    onChangeText={setDescription}
                                    value={description}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder="Description"
                                    placeholderTextColor="black"
                                />
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={
                                    Platform.OS == 'android' ? styles.title : styles.titleIOS
                                }>Time</Text>
                                <View style={styles.time}>
                                    <Text style={styles.description}>{time}</Text>
                                    <Image
                                        source={images.clockIcon}
                                        style={styles.clockIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.timeContainer} activeOpacity={1} onPress={handleLocation}>
                                <Text style={
                                    Platform.OS == 'android' ? styles.title : styles.titleIOS
                                }>Location</Text>
                                <View style={styles.time}>
                                    {
                                        locationLoader ?
                                            <View style={{ position: 'absolute', right: 10 }}>
                                                <ActivityIndicator color={colors.black} size={20} />
                                            </View>
                                            :
                                            <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
                                                {address}
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>
                            {/* <View style={styles.timeContainer}>
                  <View style={styles.description}>
                    <TimePickerComponent
                      startTime={startTime}
                      setStartTime={setStartTime}
                      endTime={endTime}
                      setEndTime={setEndTime}
                      isBold={true}
                    />
                    <Image
                      source={images.clockIcon}
                      style={styles.clockIcon}
                      resizeMode="contain"
                    />
                  </View>
                </View> */}
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <Toast />
                <View style={Platform.OS == 'android' ? styles.nextBtn : styles.nextBtnIOS}>
                    {loader ? (
                        <Loader title={'Save'} />
                    ) : (
                        <Button title={'Save'} onPress={() => handleConfirm()} />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
