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
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from './style.js';
import Button from '../../components/Button';
import BackArrow from '../../components/BackArrow';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';
import {colors, sizes} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ServiceInfo({navigation}) {
  const [imgUri, setImgUri] = useState(null);
  const [addServiceImage, setAddServiceImage] = useState(images.hairCut);
  const [serviceNameHeading, setserviceNameHeading] = useState('Haircut');
  const [serviceImg, setServiceImg] = useState(images.hairCut);
  const [serviceName, setServiceName] = useState('Haircut');
  const [serviceAbout, setServiceAbout] = useState(
    'Timeless styles rooted in tradition, offering a clean and polished appearance. These cuts, such as crew cuts and taper cuts, emphasize neatness and simplicity, making them versatile and suitable for various occasions.',
  );
  const [serviceDetail, setServiceDetail] = useState([
    {
      name: 'Buzz Cut',
      price: '10',
    },
    {
      name: 'Under Cut',
      price: '10',
    },
    {
      name: 'Crew Cut',
      price: '10',
    },
    {
      name: 'Traditional Cut',
      price: '10',
    },
  ]);

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
            setImgUri(uri);
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
        console.log('** Full Camera Response:**', response.assets[0].uri);
        try {
          const uri = response.assets[0].uri;
          if (!uri) {
            const cameraResponseUri = response.path || response.uri;
            if (cameraResponseUri) {
              console.log('Using alternative camera URI:', cameraResponseUri);
              setImgUri(cameraResponseUri);
            } else {
              console.log('No image URI found in camera response');
            }
          } else {
            setImgUri(uri);
          }
        } catch (error) {
          console.error('Error setting imgUri:', error);
        }
      });
    }
  };

  const deleteServiceDetails = index => {
    setServiceDetail(prevState => prevState.filter((_, i) => i !== index));
  };

  const addMoreService = () => {
    setServiceDetail(prevState => [...prevState, {name: '', price: ''}]);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.arrowTop}>
            <BackArrow onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{serviceNameHeading} Service</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <KeyboardAwareScrollView
            extraHeight={sizes.screenHeight * 0.24}
            enableOnAndroid={true}>
            <View style={styles.containerBody}>
              <View style={styles.serviceContainer}>
                <Text style={styles.serviceNameText}>
                  {serviceName} Details
                </Text>
                <View style={styles.uploadImage}>
                  {imgUri ? (
                    <Image
                      source={{uri: imgUri}}
                      style={styles.imagestyle}
                      resizeMode="cover"
                    />
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
                  <Image source={images.plusRed} />
                  <Text style={styles.uploadImgText}>Add Service Pictures</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.serviceDetailContainer}>
                <View style={styles.tableHeadingRow}>
                  <Text style={styles.tableServiceHeading}>{serviceName}</Text>
                  <Text style={styles.tablePriceHeading}>Price</Text>
                </View>
                {serviceDetail.map((item, index) => (
                  <View style={styles.serviceContentRow} key={index}>
                    <TouchableOpacity
                      onPress={() => deleteServiceDetails(index)}>
                      <Image source={images.minusRed} />
                    </TouchableOpacity>
                    <TextInput
                      onChangeText={text =>
                        setServiceDetail(prevState => {
                          const updateServiceDetail = [...prevState];
                          updateServiceDetail[index].name = text.replace('');
                          return updateServiceDetail;
                        })
                      }
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
                    navigation.navigate('OutletTags');
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
