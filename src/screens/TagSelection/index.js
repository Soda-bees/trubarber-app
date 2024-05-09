import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {colors} from '../../services';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackArrow from '../../components/BackArrow';

export default function TagSelection({navigation}) {
  const [tagsData, setTagsData] = useState([
    '#OfferedServices',
    '#HaircutStyles',
    '#Prices',
    '#ConvenientBooking',
    '#CustomerFeedback',
    '#BeardTrim',
    '#Stylists',
    '#CustomerService',
  ]);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagPress = tag => {
    setSelectedTags(prevSelectedTags => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter(item => item !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
  };

  const handleNext = () =>{
    navigation.navigate('MyTabs');

  }

  const handleGoback = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.arrowTop}>
          <BackArrow onPress={handleGoback}/>
        </View>
        <Text style={styles.forgotPass}>Tag Selection</Text>
        <View style={styles.adjustWidth}>
          <Text style={styles.subText}>
            Customize Your Experience: Choose Tags That Reflect Your
            Preferences!
          </Text>
        </View>
        <View style={styles.centerContent}>
          {tagsData.map((tag, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTagPress(tag)}
              style={[
                styles.tagContainerselected,
                selectedTags.includes(tag)
                  ? styles.tagContainerselected
                  : styles.tagContainernotSelected,
              ]}>
              <Text
                style={
                  selectedTags.includes(tag)
                    ? styles.selectedText
                    : styles.notSelectedtext
                }>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={Platform.OS == 'android' ? styles.Nextbtn :styles.NextbtnIOS}>
          <Button title={'Next'} onPress={handleNext}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
