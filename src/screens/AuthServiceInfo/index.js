import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';
import {colors, sizes} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  addServices,
  updateService,
  uploadMultiplesImages,
} from '../../services/config/API';
import formatToJSON from '../../services/config/FormatToJson';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';
import {ErrorShow} from '../../components/Error';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authToken';
import {setUserData, updateServiceRedux} from '../../store/userData';

export default function AuthServiceInfo({navigation, route}) {
  const dispatch = useDispatch();

  // const { userData, services } = route.params;
  const userData = route?.params?.userData;
  const services = route?.params?.services;
  const isAdd = route?.params?.isAdd;
  const isEdit = route?.params?.isEdit;

  const authToken = useSelector(selectAuthToken);

  const [imgUri, setImgUri] = useState(null);
  const [addServiceImage, setAddServiceImage] = useState(images.hairCut);
  const [serviceNameHeading, setserviceNameHeading] = useState('Haircut');
  const [serviceImg, setServiceImg] = useState(images.hairCut);
  const [serviceName, setServiceName] = useState('Haircut');
  const [serviceAbout, setServiceAbout] = useState(
    'Timeless styles rooted in tradition, offering a clean and polished appearance. These cuts, such as crew cuts and taper cuts, emphasize neatness and simplicity, making them versatile and suitable for various occasions.',
  );
  const [serviceDetail, setServiceDetail] = useState([
    // {
    //   name: 'Buzz Cut',
    //   price: '10',
    // },
    // {
    //   name: 'Under Cut',
    //   price: '10',
    // },
    // {
    //   name: 'Crew Cut',
    //   price: '10',
    // },
    // {
    //   name: 'Traditional Cut',
    //   price: '10',
    // },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [servicesData, setServicesData] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (services) {
      setServicesData(services);
    }
  }, []);

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
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
      selectionLimit: 0, // 0 for unlimited selection
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const handleResponse = response => {
      try {
        const assets = response.assets || [];
        if (assets.length > 0) {
          handleUploadProfile(assets);
        } else {
          console.warn('No images found in response');
        }
      } catch (error) {
        console.error('Error processing response:', error);
      }
    };

    if (sourceType === 'library') {
      launchImageLibrary(options, handleResponse);
    } else if (sourceType === 'camera') {
      await requestCameraPermission();
      launchCamera(options, handleResponse);
    }
  };

  const handleUploadProfile = async images => {
    setLoader(true);
    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      });

      const response = await uploadMultiplesImages(formData);
      if (response.status == 200) {
        const uploadedUrls = response?.data?.images || [];
        setServicesData(prevServices => {
          const newServices = [...prevServices];
          newServices[currentIndex] = {
            ...newServices[currentIndex],
            pictures: [...newServices[currentIndex].pictures, ...uploadedUrls],
          };
          return newServices;
        });
        setLoader(false);
      } else {
        setLoader(false);
        console.log(response.message);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const deleteServiceDetails = optionsArrayIndex => {
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      const updatedOptions = newServices[currentIndex].options.filter(
        (_, idx) => idx !== optionsArrayIndex,
      );
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        options: updatedOptions,
      };
      return newServices;
    });
  };

  const deletePicture = pictureIndex => {
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        pictures: newServices[currentIndex].pictures.filter(
          (_, idx) => idx !== pictureIndex,
        ),
      };
      return newServices;
    });
  };

  const updateOption = (optionsArrayIndex, newName, newPrice) => {
    const sanitizedPrice = newPrice.replace(/[^0-9.]/g, '');
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      const updatedOptions = [...newServices[currentIndex].options];
      updatedOptions[optionsArrayIndex] = {
        ...updatedOptions[optionsArrayIndex],
        name: newName,
        price: sanitizedPrice,
      };
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        options: updatedOptions,
      };
      return newServices;
    });
  };

  const addMoreService = () => {
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        options: [...newServices[currentIndex].options, {name: '', price: ''}],
      };
      return newServices;
    });
  };

  const hasValidOptions = options => {
    return options.some(
      option => option.name.trim() !== '' && option.price.trim() !== '',
    );
  };

  const onHide = () => {
    navigation.navigate('BaberCatalogue');
  };

  const handleAddService = async () => {
    try {
      const serviceLength = services.length - 1;
      if (currentIndex == serviceLength) {
        if (servicesData[currentIndex]?.pictures?.length == 0) {
          return ErrorShow(
            'error',
            'Oops!',
            'Please upload at least one picture',
          );
        }
        if (!hasValidOptions(servicesData[currentIndex]?.options)) {
          return ErrorShow(
            'error',
            'Oops!',
            'Please add at least one valid option with both name and price',
          );
        }
        if (!servicesData[currentIndex]?.description) {
          return ErrorShow('error', 'Oops!', 'Description required');
        }
        setLoader(true);
        const body = {services: servicesData};
        const response = await addServices(body, authToken);
        if (response?.status == 201) {
          setLoader(false);
          ErrorShow(
            'success',
            'Congratulation!',
            response?.data?.message,
            onHide,
          );
          dispatch(setUserData(response?.data?.updateUser));
        } else {
          setLoader(false);
          ErrorShow('error', 'Oops!', response?.data?.message);
        }
      } else {
        if (servicesData[currentIndex]?.pictures?.length == 0) {
          return ErrorShow(
            'error',
            'Oops!',
            'Please upload at least one picture',
          );
        }
        if (!hasValidOptions(servicesData[currentIndex]?.options)) {
          return ErrorShow(
            'error',
            'Oops!',
            'Please add at least one valid option with both name and price',
          );
        }
        if (!servicesData[currentIndex]?.description) {
          return ErrorShow('error', 'Oops!', 'Description required');
        }
        setCurrentIndex(currentIndex + 1);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      ErrorShow('error', 'Oops!', error?.message);
    }
  };

  const handleUpdateService = async () => {
    try {
      if (servicesData[currentIndex]?.pictures?.length == 0) {
        return ErrorShow(
          'error',
          'Oops!',
          'Please upload at least one picture',
        );
      }
      if (!hasValidOptions(servicesData[currentIndex]?.options)) {
        return ErrorShow(
          'error',
          'Oops!',
          'Please add at least one valid option with both name and price',
        );
      }
      if (!servicesData[currentIndex]?.description) {
        return ErrorShow('error', 'Oops!', 'Description required');
      }
      setLoader(true);
      const response = await updateService(servicesData[0], authToken);
      if (response?.status == 200) {
        setLoader(false);
        ErrorShow(
          'success',
          'Congratulation!',
          response?.data?.message,
          onHide,
        );
        dispatch(updateServiceRedux(response?.data?.updatedService));
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

  const handleConfirm = async () => {
    const serviceLength = services.length - 1;
    if (currentIndex == serviceLength) {
      if (servicesData[currentIndex]?.pictures?.length == 0) {
        return ErrorShow(
          'error',
          'Oops!',
          'Please upload at least one picture',
        );
      }
      if (!hasValidOptions(servicesData[currentIndex]?.options)) {
        return ErrorShow(
          'error',
          'Oops!',
          'Please add atleast one valid option with both name and price',
        );
      }
      if (!servicesData[currentIndex]?.description) {
        return ErrorShow('error', 'Oops!', 'Description required');
      }
      userData.services = servicesData;
      navigation.navigate('OutletTags', {userData});
    } else {
      if (servicesData[currentIndex]?.pictures?.length == 0) {
        return ErrorShow(
          'error',
          'Oops!',
          'Please upload at least one picture',
        );
      }
      if (!hasValidOptions(servicesData[currentIndex]?.options)) {
        return ErrorShow(
          'error',
          'Oops!',
          'Please add atleast one valid option with both name and price',
        );
      }
      if (!servicesData[currentIndex]?.description) {
        return ErrorShow('error', 'Oops!', 'Description required');
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGoBack = async () => {
    if (currentIndex == 0) {
      navigation.goBack();
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const updateDescription = newDescription => {
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        description: newDescription,
      };
      return newServices;
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.arrowTop}>
            <BackArrow onPress={() => handleGoBack()} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {services[currentIndex]?.name} Service
            </Text>
          </View>
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraHeight={sizes.screenHeight * 0.15}
          extraScrollHeight={sizes.screenHeight * 0.2}
          showsVerticalScrollIndicator={false}
          >
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceNameText}>
              {services[currentIndex]?.name} Details
            </Text>
            <View style={styles.uploadImage}>
              {servicesData &&
              servicesData[currentIndex]?.pictures?.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {servicesData[currentIndex]?.pictures?.map((item, index) => {
                    return (
                      <View key={index} style={{position: 'relative'}}>
                        <TouchableOpacity
                          style={styles.crossImgTouchable}
                          onPress={() => deletePicture(index)}>
                          <Image
                            source={images.crossCircle}
                            style={styles.crossImg}
                          />
                        </TouchableOpacity>
                        <Image
                          source={{uri: item}}
                          style={
                            index == 0 ? styles.imagestyle : styles.imagestyle2
                          }
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <Image
                  style={styles.addimage}
                  source={addServiceImage}
                  resizeMode="contain"
                />
              )}
            </View>

            <TouchableOpacity
              style={styles.uplaodImageContianer}
              onPress={() => uploadPhoto('library')}>
              <Image source={images.plusRed} style={{tintColor:colors.blackGrey}} />
              <Text style={styles.uploadImgText}>Add Service Pictures</Text>
            </TouchableOpacity>
          </View>
          {/* <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}> */}

          <View style={styles.containerBody}>
            <View style={styles.serviceDetailContainer}>
              {servicesData &&
                servicesData[currentIndex]?.options?.length > 0 && (
                  <View style={styles.tableHeadingRow}>
                    <Text style={styles.tableServiceHeading}>
                      {/* {serviceName} */}
                      {services[currentIndex]?.name}
                    </Text>
                    <Text style={styles.tablePriceHeading}>Price</Text>
                  </View>
                )}
              {servicesData &&
                servicesData[currentIndex]?.options?.map((item, index) => (
                  <View style={styles.serviceContentRow} key={index}>
                    <TouchableOpacity
                      onPress={() => deleteServiceDetails(index)}>
                      <Image source={images.minusRed} resizeMode="contain" style={{tintColor:colors.black}}/>
                    </TouchableOpacity>
                    <TextInput
                      onChangeText={text =>
                        updateOption(index, text, item.price)
                      }
                      value={item.name}
                      placeholder="Name"
                      style={
                        Platform.OS == 'android'
                          ? styles.serviceInputContainer
                          : styles.serviceInputContainerIOS
                      }
                      placeholderTextColor={colors.black}
                    />
                    <TextInput
                      onChangeText={text =>
                        updateOption(index, item.name, text)
                      }
                      value={`$ ${item.price}`}
                      keyboardType="numeric"
                      style={
                        Platform.OS == 'android'
                          ? styles.priceInputContainer
                          : styles.priceInputContainerIOS
                      }
                    />
                  </View>
                ))}
              <TouchableOpacity
                style={styles.addMoreBtn}
                onPress={addMoreService}>
                <Text style={styles.addMoreBtnText}> + Add More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.descriptionContianer}>
              <Text style={styles.descriptionHeadingText}>Description</Text>
              <TextInput
                onChangeText={updateDescription}
                placeholder="Description"
                value={servicesData && servicesData[currentIndex]?.description}
                multiline={true}
                numberOfLines={4}
                style={
                  Platform.OS == 'android'
                    ? styles.descriptionTextContainer
                    : styles.descriptionTextContainerIOS
                }
                placeholderTextColor={colors.black}
              />
            </View>
            <View style={styles.saveChangeBtn}>
              {loader ? (
                <Loader title={'Save Changes'} />
              ) : (
                <Button
                  title={'Save Changes'}
                  onPress={() => {
                    if (isAdd) {
                      handleAddService();
                    } else if (isEdit) {
                      handleUpdateService();
                    } else {
                      handleConfirm();
                    }
                  }}
                />
              )}
            </View>
            <View
              style={
                Platform.OS == 'ios' && {
                  marginBottom: sizes.screenHeight * 0.07,
                }
              }></View>
          </View>

          {/* </View> */}
        </KeyboardAwareScrollView>
        {/* </ScrollView> */}
      <Toast />
      </View>
    </SafeAreaView>
  );
}
