import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {colors} from '../../services';
import Backarrow from '../../components/BackArrow';

export default function OutletTags({navigation}) {
  const [tagsData, setTagsData] = useState([
    '#BarberSkills',
    '#PrecisionCuts',
    '#Economical',
    '#GroomingSpecialist',
    '#CustomerFeedback',
    '#ShavingMaestro',
    '#Stylists',
    '#HairExpert',
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backArrow}>
        <Backarrow onPress={() =>  navigation.goBack()}/>
        </View>
        <Text style={styles.forgotPass}>Outlet Tags</Text>
        <View style={styles.adjustWidth}>
          <Text style={styles.subText}>
          Tailor Your Profile: Choose Tags That Represent Your Barbering Style!
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
        

        <View style={Platform.OS == 'android' ? styles.Nextbtn : styles.NextbtnIOS}>
          <Button title={'Next'} onPress={()=>navigation.navigate("BusinessVerfication")}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
