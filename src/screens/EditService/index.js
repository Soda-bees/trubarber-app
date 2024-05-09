import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import BackArrow from '../../components/BackArrow';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {PermissionsAndroid, PermissionsIOS} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../../services';

export default function EditService({route,navigation}) {
  const {serviceNameHeading,serviceName} = route.params

  // const [serviceNameHeading, setserviceNameHeading] = useState('Hair Cuts');
  // const [serviceName, setServiceName] = useState('Haircut');
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
  const [serviceImage, setServiceImage] = useState([
    {image: images.barberUsingdry},
    {image: images.barberUsingdry},
    {image: images.barberUsingdry},
    {image: images.barberUsingdry},
    {image: images.barberUsingdry},
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
          const uri = response.assets[0].uri;
          if (uri) {
            setServiceImage(prevState => [...prevState, {image: {uri}}]);
          } else {
            console.warn('No image URI found in response');
          }
        } catch (error) {
          console.error('Error setting image:', error);
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
  const deleteImage = index => {
    setServiceImage(prevState => prevState.filter((_, i) => i !== index));
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
            <Text style={styles.headerText}>{serviceNameHeading}</Text>
          </View>
          <TouchableOpacity>
            <Image source={images.threeDots} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.containerBody}>
            <View style={styles.serviceContainer}>
              <Text style={styles.serviceNameText}>{serviceName} Details</Text>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {serviceImage.map((item, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={styles.deleteImageContainer}
                      onPress={() => deleteImage(index)}>
                      <Image
                        source={images.crossCircle}
                        style={styles.deleteImage}
                      />
                    </TouchableOpacity>
                    <Image style={styles.imageContainer} source={item.image} />
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.uplaodImageContianer}
                onPress={() => uploadPhoto('library')}>
                <Image source={images.uploadImgIcon} />
                <Text style={styles.uploadImgText}>Upload Images</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.serviceDetailContainer}>
              <View style={styles.tableHeadingRow}>
                <Text style={styles.tableServiceHeading}>{serviceName}</Text>
                <Text style={styles.tablePriceHeading}>Price</Text>
              </View>
              {serviceDetail.map((item, index) => (
                <View style={styles.serviceContentRow} key={index}>
                  <TouchableOpacity onPress={() => deleteServiceDetails(index)}>
                    <Image source={images.minusRed} />
                  </TouchableOpacity>
                  <TextInput
                  onChangeText={text => setServiceDetail(prevState => {
                    const updateServiceDetail = [...prevState]
                    updateServiceDetail[index].name = text.replace('')
                    return updateServiceDetail
                  })}
                  value={item.name}
                    style={styles.serviceInputContainer}></TextInput>
                  <TextInput
                  onChangeText={text => setServiceDetail(prevState => {
                    const updateServiceDetail = [...prevState]
                    updateServiceDetail[index].price = text.replace('$','')
                    return updateServiceDetail
                  })}
                  value={`$ ${item.price}`}
                    style={styles.priceInputContainer}></TextInput>
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
                  navigation.navigate('BarberSevriceDetails');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
