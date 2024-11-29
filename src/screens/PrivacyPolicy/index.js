import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style.js';
import images from '../../services/utilities/images/index.js';
import Button from '../../components/Button/index.js';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import BackArrow from '../../components/BackArrow/index.js';
import {colors} from '../../services/index.js';
import Header from '../../components/Header/index.js';
// import {colors, sizes} from 'borderBottomcomponents/BackArrow/index.js';
// import UserTabNavigation from '../../services/config/UserTabNavigation.js';

export default function PrivacyPolicy({navigation}) {
  const handleEmailPress = () => {
    Linking.openURL('mailto:brian@simationstudios.com');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title={'Privacy Policy'} />
        </View>

        <ScrollView
          style={styles.inputContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.gapText}>
            <Text style={styles.titleMain}>Privacy Policy</Text>
            <Text style={styles.textBlack}>
              Your privacy matters to us. We are dedicated to safeguarding your
              personal information and ensuring transparency in our data
              practices.
            </Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.title}>Information Collection and Use</Text>
            <Text style={styles.textBlack}>
              The TruBarber app (referred to as "Application") collects
              information when you download and use it. This may include:
            </Text>
            <Text style={styles.textBlack}>
              - "App would like to access your location"
            </Text>
            <Text style={styles.textBlack}>- "Track user's location"</Text>
            <Text style={styles.textBlack}>
              Location data helps provide personalized content, relevant
              recommendations, and location-based services. Aggregated and
              anonymized data also helps improve the application's performance.
            </Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.title}>Third-Party Services</Text>
            <Text style={styles.textBlack}>
              The Application uses the following third-party services, which may
              periodically receive anonymized data:
            </Text>
            <Text style={styles.textBlack}>- Google Play Services</Text>
            <Text style={styles.textBlack}>
              - Google Analytics for Firebase
            </Text>
            <Text style={styles.textBlack}>- Firebase Crashlytics</Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.title}>Opt-Out Rights</Text>
            <Text style={styles.textBlack}>
              You can stop all data collection by uninstalling the Application.
            </Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.title}>Data Retention Policy</Text>
            <Text style={styles.textBlack}>
              User-provided data is retained for as long as you use the
              Application and for a reasonable time thereafter. For data
              deletion requests, contact{' '}
              <Text style={styles.link} onPress={handleEmailPress}>
                brian@simationstudios.com
              </Text>
              .
            </Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.title}>Children</Text>
            <Text style={styles.textBlack}>
              The Application does not knowingly collect personal information
              from children under 13. Please contact us if you are aware of such
              activity.
            </Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.title}>Security</Text>
            <Text style={styles.textBlack}>
              We take appropriate measures to safeguard the confidentiality of
              your information.
            </Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.title}>Changes</Text>
            <Text style={styles.textBlack}>
              This policy may be updated periodically. Please review it
              regularly.
            </Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.title}>Your Consent</Text>
            <Text style={styles.textBlack}>
              By using the Application, you consent to this Privacy Policy.
            </Text>
          </View>

          <View style={styles.gapText}>
            <Text style={styles.textBlack}>
              If you have any questions, please contact us via email at{' '}
              <Text style={styles.link} onPress={handleEmailPress}>
                brian@simationstudios.com
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
