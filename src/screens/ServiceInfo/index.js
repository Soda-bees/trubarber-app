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
import React, { useEffect, useState } from 'react';
import images from '../../services/utilities/images';
import { styles } from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, PermissionsIOS } from 'react-native';
import { colors, sizes } from '../../services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { uploadMultiplesImages } from '../../services/config/API';
import formatToJSON from '../../services/config/FormatToJson';

export default function ServiceInfo({ navigation, route }) {

  const { userData, services } = route.params;

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [servicesData, setServicesData] = useState()
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (services) {
      setServicesData(services)
      // setserviceNameHeading(services[currentIndex].name)
      // setServiceName(services[currentIndex].name)
      // setServiceDetail(services[currentIndex].options)
    }
  }, [])

  // const requestCameraPermission = async () => {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     console.log('Camera permission granted');
  //   } else {
  //     console.warn('Camera permission denied');
  //   }
  // };

  // const uploadPhoto = async sourceType => {
  //   let options = {
  //     mediaType: 'photo',
  //     quality: 1,
  //     maxWidth: 800,
  //     maxHeight: 600,
  //     includeBase64: false,
  //     saveToPhotos: true,
  //     selectionLimit: 0,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   if (sourceType === 'library') {
  //     launchImageLibrary(options, response => {
  //       console.log('Library Response:', response);

  //       try {
  //         const uri =
  //           response.uri || (response.assets && response.assets[0].uri);
  //         if (uri) {
  //           setImgUri(uri);
  //         } else {
  //           console.warn('No image URI found in library response');
  //         }
  //       } catch (error) {
  //         console.error('Error setting imgUri:', error);
  //       }
  //     });
  //   } else if (sourceType === 'camera') {
  //     await requestCameraPermission();

  //     launchCamera(options, response => {
  //       console.log('** Full Camera Response:**', response.assets[0].uri);
  //       try {
  //         const uri = response.assets[0].uri;
  //         if (!uri) {
  //           const cameraResponseUri = response.path || response.uri;
  //           if (cameraResponseUri) {
  //             console.log('Using alternative camera URI:', cameraResponseUri);
  //             setImgUri(cameraResponseUri);
  //           } else {
  //             console.log('No image URI found in camera response');
  //           }
  //         } else {
  //           setImgUri(uri);
  //         }
  //       } catch (error) {
  //         console.error('Error setting imgUri:', error);
  //       }
  //     });
  //   }
  // };

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
      console.log('Response:', response);

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
      console.log(response.status);

      console.log(formatToJSON(response?.data));
      if (response.status == 200) {
        const uploadedUrls = response?.data?.images || [];
        // setImgUris(uploadedUrls);
        // setServicesData((prevState) => {
        //   return {
        //     ...prevState,

        //   }
        // })
        setServicesData(prevServices => {
          const newServices = [...prevServices];
          newServices[currentIndex] = {
            ...newServices[currentIndex],
            pictures: [...newServices[currentIndex].pictures, ...uploadedUrls]
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
    // setServiceDetail(prevState => prevState.filter((_, i) => i !== index));
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      const updatedOptions = newServices[currentIndex].options.filter((_, idx) => idx !== optionsArrayIndex);
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        options: updatedOptions
      };
      return newServices;
    });
  };


  const deletePicture = pictureIndex => {
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        pictures: newServices[currentIndex].pictures.filter((_, idx) => idx !== pictureIndex)
      };
      return newServices;
    });
  }

  const updateOption = (optionsArrayIndex, newName, newPrice) => {
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      const updatedOptions = [...newServices[currentIndex].options];
      updatedOptions[optionsArrayIndex] = { ...updatedOptions[optionsArrayIndex], name: newName, price: newPrice };
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        options: updatedOptions
      };
      return newServices;
    });
  };

  const addMoreService = () => {
    // setServiceDetail(prevState => [...prevState, { name: '', price: '' }]);
    setServicesData(prevServices => {
      const newServices = [...prevServices];
      newServices[currentIndex] = {
        ...newServices[currentIndex],
        options: [...newServices[currentIndex].options, { name: "", price: "" }]
      };
      return newServices;
    });
  };

  const handleConfirm = async () => {
    // navigation.navigate('OutletTags');
    const serviceLength = services.length - 1
    if (currentIndex == serviceLength) {
      navigation.navigate('OutletTags');
    } else {
      setCurrentIndex(currentIndex + 1)
    }
    console.log(formatToJSON(servicesData));

  }

  const handleGoBack = async () => {
    if (currentIndex == 0) {
      navigation.goBack()
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.arrowTop}>
            <BackArrow onPress={() => handleGoBack()} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{services[currentIndex]?.name} Service</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <KeyboardAwareScrollView
            extraHeight={sizes.screenHeight * 0.24}
            enableOnAndroid={true}>
            <View style={styles.containerBody}>
              <View style={styles.serviceContainer}>
                <Text style={styles.serviceNameText}>
                  {services[currentIndex]?.name} Details
                </Text>
                <View style={styles.uploadImage}>
                  {
                    servicesData &&
                      servicesData[currentIndex]?.pictures?.length > 0 ?
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                          servicesData[currentIndex]?.pictures?.map((item, index) => {
                            return (
                              <View key={index}
                                style={{ position: 'relative' }}
                              >
                                <TouchableOpacity style={styles.crossImgTouchable}
                                  onPress={() => deletePicture(index)}
                                >
                                  <Image source={images.crossCircle} style={styles.crossImg} />
                                </TouchableOpacity>
                                <Image
                                  source={{ uri: item }}
                                  style={index == 0 ? styles.imagestyle : styles.imagestyle2}
                                />
                              </View>
                            )
                          })
                        }
                      </ScrollView>
                      :
                      <Image
                        style={styles.addimage}
                        source={addServiceImage}
                        resizeMode="contain"
                      />
                  }
                </View>

                <TouchableOpacity
                  style={styles.uplaodImageContianer}
                  onPress={() => uploadPhoto('library')}>
                  <Image source={images.plusRed} />
                  <Text style={styles.uploadImgText}>Add Service Pictures</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.serviceDetailContainer}>
                <View style={styles.tableHeadingRow}>
                  <Text style={styles.tableServiceHeading}>{serviceName}</Text>
                  <Text style={styles.tablePriceHeading}>Price</Text>
                </View>
                {servicesData &&
                  servicesData[currentIndex]?.options?.map((item, index) => (
                    <View style={styles.serviceContentRow} key={index}>
                      <TouchableOpacity
                        onPress={() => deleteServiceDetails(index)}>
                        <Image source={images.minusRed} />
                      </TouchableOpacity>
                      <TextInput
                        // onChangeText={text =>
                        //   setServiceDetail(prevState => {
                        //     const updateServiceDetail = [...prevState];
                        //     updateServiceDetail[index].name = text.replace('');
                        //     return updateServiceDetail;
                        //   })
                        // }
                        onChangeText={text => updateOption(index, text, item.price)}
                        value={item.name}
                        style={
                          Platform.OS == 'android'
                            ? styles.serviceInputContainer
                            : styles.serviceInputContainerIOS
                        }></TextInput>
                      <TextInput
                        onChangeText={text =>
                          setServiceDetail(prevState => {
                            const updateServiceDetail = [...prevState];
                            updateServiceDetail[index].price = text.replace(
                              '$',
                              '',
                            );
                            return updateServiceDetail;
                          })
                        }
                        value={`$ ${item.price}`}
                        style={
                          Platform.OS == 'android'
                            ? styles.priceInputContainer
                            : styles.priceInputContainerIOS
                        }></TextInput>
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
                  onChangeText={setServiceAbout}
                  value={serviceAbout}
                  multiline={true}
                  numberOfLines={4}
                  style={styles.descriptionTextContainer}
                />
              </View>
              <View style={styles.saveChangeBtn}>
                <Button
                  title={'Save Changes'}
                  onPress={() => {
                    handleConfirm()
                  }}
                />
              </View>
              <View style={Platform.OS == 'ios' && styles.saveChangeBtnIOS} />
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
