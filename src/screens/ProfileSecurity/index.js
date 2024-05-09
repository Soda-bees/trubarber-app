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
import React, {useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images/index.js';
import Button from '../../components/Button/index.js';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import BackArrow from '../../components/BackArrow/index.js';
import {colors} from '../../services/index.js';
// import {colors, sizes} from 'borderBottomcomponents/BackArrow/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function ProfileSecurity({navigation}) {
  const [showPass, setShowpass] = useState(false);
  const [showRenteredpass, setShowrenterPass] = useState(false);
  const [showEnternewPass, setShowenterNewpass] = useState(false);

  const [password, setPassword] = useState('');
  const [reEnterpassword, setReenterPassword] = useState('');
  const [enterNewpassword, setEnternewPassword] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.borderBottom}>
          <View style={styles.row}>
            <View style={styles.arrowTop}>
              <BackArrow onPress={() => navigation.goBack()}/>
            </View>
            <Text style={styles.headerText}>Security</Text>
          </View>
        </View>
        <View style={styles.contentAlligment}>
          <Text style={styles.contentContainer}>
            Create a new password on your account.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.wholeInput}>
            <View style={styles.inputStyle}>
              <TextInput
                placeholder="Old Password"
                style={styles.input}
                secureTextEntry={!showPass}
                placeholderTextColor={colors.placeholdertextgray}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
              {!showPass ? (
                <TouchableOpacity onPress={() => setShowpass(!showPass)}>
                  <Image
                    source={images.hidden}
                    style={styles.inputimage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShowpass(!showPass)}>
                  <Image
                    source={images.show}
                    style={styles.inputimage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.wholeInput}>
            <View style={styles.inputStyle}>
              <TextInput
                placeholder="Enter New Password"
                style={styles.input}
                secureTextEntry={!showEnternewPass}
                placeholderTextColor={colors.placeholdertextgray}
                value={enterNewpassword}
                onChangeText={text => {
                  setEnternewPassword(text);
                }}
              />
              {!showEnternewPass ? (
                <TouchableOpacity
                  onPress={() => setShowenterNewpass(!showEnternewPass)}>
                  <Image
                    source={images.hidden}
                    style={styles.inputimage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowenterNewpass(!showEnternewPass)}>
                  <Image
                    source={images.show}
                    style={styles.inputimage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.wholeInput}>
            <View style={styles.inputStyle}>
              <TextInput
                placeholder="Re-enter Password"
                style={styles.input}
                secureTextEntry={!reEnterpassword}
                placeholderTextColor={colors.placeholdertextgray}
                value={reEnterpassword}
                onChangeText={text => {
                  setReenterPassword(text);
                }}
              />
              {!showRenteredpass ? (
                <TouchableOpacity
                  onPress={() => setShowrenterPass(!showRenteredpass)}>
                  <Image
                    source={images.hidden}
                    style={styles.inputimage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowrenterPass(!showRenteredpass)}>
                  <Image
                    source={images.show}
                    style={styles.inputimage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={Platform.OS == 'android' ? styles.btn : styles.btnIOS}>
          <Button title={'Save'} onPress={() => navigation.navigate('Profile')}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
