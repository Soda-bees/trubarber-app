import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import {styles} from '../CustomerPrefences/style.js';
import Button from '../../components/Button';
import SurveyPrompt from '../SurveyPrompt';
import BackArrow from '../../components/BackArrow';

export default function CustomerPrefences({navigation}) {
  const [select, setSelect] = useState('');
  const [hairCut, selectedHaircut] = useState(false);
  const [beardTrim, selectedBeardtrim] = useState(false);
  const [shave, selectedShave] = useState(false);
  const [hairStyling, selectedHairstyling] = useState(false);
  const [email, selectedEmail] = useState(false);
  const [sms, selectedSms] = useState(false);
  const [notifyApp, selectednotifyApp] = useState(false);
  const [call, selectedcall] = useState(false);
  const [location, selectedLocation] = useState(false);
  const [price, selectedPrice] = useState(false);
  const [reviewRating, selectedReviewrating] = useState(false);
  const [atmosphere, selectedAtmosphere] = useState(false);
  const [survey, selectSurvey] = useState('onceMonth');

  const next = () => {
    if (survey === 'onceMonth') {
      selectSurvey('hairCut');
    }
    if (survey === 'hairCut') {
      selectSurvey('contact');
    }
    if (survey === 'contact') {
      selectSurvey('influence');
    }
    if (survey === 'influence') {
      // selectSurvey('influence');
      navigation.navigate('TagSelection');
    }
  };

  const previous = () => {
    if (survey === 'influence') {
      selectSurvey('contact');
    }
    if (survey === 'contact') {
      selectSurvey('hairCut');
    }
    if (survey === 'hairCut') {
      selectSurvey('onceMonth');
    }
    if (survey === 'onceMonth') {
      selectSurvey('onceMonth');
    }
  };

  const handleGoback = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.arrowTop}>
          <BackArrow back={previous} onPress={handleGoback} />
        </View>
        <View style={styles.heroTextcontainer}>
          <Text style={styles.headertext}>Customer Preferences Survey</Text>
          <Text style={styles.textUnderhero}>
            Help Us Tailor Your Barber Shop Experience: Take Our Quick Survey!
          </Text>
        </View>
        {survey === 'onceMonth' ? (
          <View>
            <View style={styles.heroTextcontainer}>
              <Text style={styles.heroText}>
                How often do you typically visit a barber shop?
              </Text>
            </View>
            <TouchableOpacity
              style={select === 'Once' ? styles.selected : styles.notSelected}
              onPress={() => setSelect('Once')}>
              <Text
                style={select === 'Once' ? styles.blackText : styles.grayText}>
                Once a month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={select === 'Twice' ? styles.selected : styles.notSelected}
              onPress={() => setSelect('Twice')}>
              <Text
                style={select === 'Twice' ? styles.blackText : styles.grayText}>
                Every couple of months
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={select === 'Few' ? styles.selected : styles.notSelected}
              onPress={() => setSelect('Few')}>
              <Text
                style={select === 'Few' ? styles.blackText : styles.grayText}>
                Every eight weeks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={select === 'Six' ? styles.selected : styles.notSelected}
              onPress={() => setSelect('Six')}>
              <Text
                style={select === 'Six' ? styles.blackText : styles.grayText}>
                Once every six months
              </Text>
            </TouchableOpacity>
          </View>
        ) : survey === 'hairCut' ? (
          <View>
            <View style={styles.heroTextcontainer}>
              <Text style={styles.heroText}>
                What services are you interested in? (Select all that apply)
              </Text>
            </View>
            <TouchableOpacity
              style={hairCut ? styles.selected : styles.notSelected}
              onPress={() => selectedHaircut(!hairCut)}>
              <Text style={hairCut ? styles.blackText : styles.grayText}>
                Haircut
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={beardTrim ? styles.selected : styles.notSelected}
              onPress={() => selectedBeardtrim(!beardTrim)}>
              <Text style={beardTrim ? styles.blackText : styles.grayText}>
                Beard Trim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={shave ? styles.selected : styles.notSelected}
              onPress={() => selectedShave(!shave)}>
              <Text style={shave ? styles.blackText : styles.grayText}>
                Shave
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={hairStyling ? styles.selected : styles.notSelected}
              onPress={() => selectedHairstyling(!hairStyling)}>
              <Text style={hairStyling ? styles.blackText : styles.grayText}>
                Hair styling
              </Text>
            </TouchableOpacity>
          </View>
        ) : survey === 'contact' ? (
          <View>
            <View style={styles.heroTextcontainer}>
              <Text style={styles.heroText}>
                What is your preferred method of communication for appointment
                reminders and updates?{' '}
              </Text>
            </View>
            <TouchableOpacity
              style={email ? styles.selected : styles.notSelected}
              onPress={() => selectedEmail(!email)}>
              <Text style={email ? styles.blackText : styles.grayText}>
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sms ? styles.selected : styles.notSelected}
              onPress={() => selectedSms(!sms)}>
              <Text style={sms ? styles.blackText : styles.grayText}>
                SMS text messages
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={notifyApp ? styles.selected : styles.notSelected}
              onPress={() => selectednotifyApp(!notifyApp)}>
              <Text style={notifyApp ? styles.blackText : styles.grayText}>
                Push notifications through the app
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={call ? styles.selected : styles.notSelected}
              onPress={() => selectedcall(!call)}>
              <Text style={call ? styles.blackText : styles.grayText}>
                Calling
              </Text>
            </TouchableOpacity>
          </View>
        ) : survey === 'influence' ? (
          <View>
            <View style={styles.heroTextcontainer}>
              <Text style={styles.heroText}>
                What factors influence your choice of a barber shop? (Select all
                that apply)
              </Text>
            </View>
            <TouchableOpacity
              style={location ? styles.selected : styles.notSelected}
              onPress={() => selectedLocation(!location)}>
              <Text style={location ? styles.blackText : styles.grayText}>
                Location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={price ? styles.selected : styles.notSelected}
              onPress={() => selectedPrice(!price)}>
              <Text style={price ? styles.blackText : styles.grayText}>
                Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={reviewRating ? styles.selected : styles.notSelected}
              onPress={() => selectedReviewrating(!reviewRating)}>
              <Text style={reviewRating ? styles.blackText : styles.grayText}>
                Reviews and ratings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={atmosphere ? styles.selected : styles.notSelected}
              onPress={() => selectedAtmosphere(!atmosphere)}>
              <Text style={atmosphere ? styles.blackText : styles.grayText}>
                Atmosphere/Decor
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          survey === 'onceMonth'
        )}

        <View style={styles.Nextbtn}>
          <Button title={'Next'} onPress={next} />
        </View>
      </View>
    </SafeAreaView>
  );
}

{
  /* <TouchableOpacity style={styles.notSelected}>
    <Text style={styles.grayText}>Every Couple of months</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.notSelected}>
    <Text style={styles.grayText}>Once every six months</Text>
  </TouchableOpacity> */
}
