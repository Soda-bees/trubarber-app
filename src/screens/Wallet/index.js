import { ActivityIndicator, BackHandler, Image, RefreshControl, SafeAreaView, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { colors, sizes } from "../../services";
import { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import { getWalletBalance, handleIncreaseWallet } from "../../services/config/API";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthToken } from "../../store/authToken";
import { selectUserData, updateWalletRedux } from "../../store/userData";
import formatToJSON from "../../services/config/FormatToJson";
import { useFocusEffect } from "@react-navigation/native";
import images from "../../services/utilities/images";
import BackArrow from "../../components/BackArrow";
import { ErrorShow } from "../../components/Error";
import Toast from "react-native-toast-message";

export default function Wallet({ navigation }) {

    const dispatch = useDispatch()

    const authToken = useSelector(selectAuthToken)
    const userData = useSelector(selectUserData)

    const [loader, setLoader] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);
    const [wallet, setWallet] = useState(null)

    useEffect(() => {
        const backAction = () => {
            if (btnLoader) {
                ToastAndroid.show('Please wait, loading...', ToastAndroid.SHORT);
                return true; // Prevent default behavior
            }
            return false; // Allow default behavior
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [btnLoader]);

    useFocusEffect(
        useCallback(() => {
            if (userData) {
                setWallet(userData?.wallet)
            }
        }, [userData]),
    );

    const handleGetWalletbalance = async () => {
        try {
            const response = await getWalletBalance(userData?._id, authToken)
            response?.data
            if (response?.data?.success) {
                setWallet(response?.data?.balance)
                dispatch(updateWalletRedux(response?.data?.balance))
                setLoader(false)
            } else {
                setLoader(false)
                ToastAndroid.show('Some error, Try again later...', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);
            setLoader(false)
            ToastAndroid.show('Some error, Try again later...', ToastAndroid.SHORT);
        }
    }
    const handleAddPayment = async () => {
        navigation.navigate('AddCard')
        // try {
        //     setBtnLoader(true)
        //     const body = {
        //         amount: 5
        //     }
        //     const response = await handleIncreaseWallet(userData?._id, authToken, body)
        //     console.log(response?.data);
        //     if (response?.data?.success) {
        //         setWallet(response?.data?.balance)
        //         dispatch(updateWalletRedux(response?.data?.balance))
        //         setBtnLoader(false)
        //         ErrorShow('success', 'Congratulation!', response?.data?.message);
        //     } else {
        //         setBtnLoader(false)
        //         ErrorShow('error', 'Oops!', response?.data?.message);
        //     }
        // } catch (error) {
        //     console.log(error);
        //     setBtnLoader(false)
        //     ErrorShow('error', 'Oops!', error?.message);
        // }
    }
    const handleNavigateToBack = () => {
        if (btnLoader) {
            ToastAndroid.show('Some error, Try again later...', ToastAndroid.SHORT);
          } else if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('MyTabs');  // Replace 'SpecificScreen' with your desired screen
          }
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* <Header title={"Wallet"} /> */}
                <View style={styles.header}>
                    <BackArrow 
                    // onPress={() => btnLoader ? ToastAndroid.show('Some error, Try again later...', ToastAndroid.SHORT) : navigation.goBack()}
                    onPress={handleNavigateToBack}
                    />
                    <Text style={styles.headerText}>Wallet</Text>
                    <View style={styles.emptyStyle}></View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={loader}
                            onRefresh={() => {
                                handleGetWalletbalance();
                            }}
                            colors={[colors.black]}
                            progressBackgroundColor="white"
                        />
                    }
                >
                    <View style={styles.imageContainer}>
                        <Image source={images.wallet} style={styles.waletImg} />
                        <Text style={styles.currentBalanceText}>Current Balance</Text>
                        <Text style={styles.amount}>{`$ ${wallet || userData?.wallet}`}</Text>
                    </View>
                    {
                        btnLoader ?
                            <View style={styles.addBtnLoader}>
                                <ActivityIndicator color={colors.white} size={29} />
                            </View> :
                            <TouchableOpacity style={styles.addBtn} onPress={handleAddPayment}>
                                <Image source={images.addService} style={styles.addImage} />
                                <Text style={styles.addText}>Add</Text>
                            </TouchableOpacity>
                    }
                </ScrollView>
                <Toast />
            </View>
        </SafeAreaView>
    )
}