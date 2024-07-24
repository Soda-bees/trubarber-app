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
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.borderBottom}>
          <Header title={'Privacy Policy'} />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.gapText}>
            <Text style={styles.title}>1. Types data we collect</Text>
            <Text style={styles.textBlack}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et qua si architecto beatae
              vitae.
            </Text>
            <Text style={styles.textBlack}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit.
            </Text>
          </View>
          <View style={styles.gapText}>
            <Text style={styles.title}>2. Use of your personal data</Text>
            <Text style={styles.textBlack}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={styles.textBlack}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </Text>
          </View>
          <View style={styles.gapText}>
            <Text style={styles.title}>
              3. Disclosure of your personal data
            </Text>
            <Text style={styles.textBlack}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </Text>
            <Text style={styles.textBlack}>
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat facere possimus, omnis
              voluptas assumenda est, omnis dolor repellendus.
            </Text>
            <Text style={styles.textBlack}>
              Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae sint et
              molestiae non recusandae. Itaque earum rerum hic tenetur a
              sapiente delectus
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
