import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from './style';
import Header from '../../components/Header';

export default function About() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Privacy Policy'} />
      <View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.paragraph}>
            Welcome to TruBarber, the ultimate app for discovering and booking
            local barbers that fit your style! Whether you're looking for a
            quick trim, a full grooming session, or a personalized style
            consultation, TruBarber makes it easy to find barbers who offer
            exactly what you need. Simply browse through available barbers,
            check their schedules, and book an appointment that suits your
            convenience.
          </Text>
          <Text style={styles.subHeading}>Key Features</Text>

          <View style={styles.featureContainer}>
            <Text style={styles.featureTitle}>Book Appointments:</Text>
            <Text style={styles.featureText}>
              TruBarber makes booking appointments a breeze. Browse through
              available barbers, view their profiles, and select an appointment
              time that fits your schedule.
            </Text>
          </View>

          <View style={styles.featureContainer}>
            <Text style={styles.featureTitle}>Barber Availability:</Text>
            <Text style={styles.featureText}>
              Barbers can list their available slots, allowing users to quickly
              find times that work for them. Never miss an opportunity to get
              the perfect cut.
            </Text>
          </View>

          <View style={styles.featureContainer}>
            <Text style={styles.featureTitle}>Barber Shop Registration:</Text>
            <Text style={styles.featureText}>
              Barbers can register their shop on TruBarber, showcasing their
              services, specialties, and availability. It’s the perfect way to
              reach new clients and grow your business.
            </Text>
          </View>

          <View style={styles.featureContainer}>
            <Text style={styles.featureTitle}>In-App Chat:</Text>
            <Text style={styles.featureText}>
              The built-in chat feature lets users communicate directly with
              their barber. Discuss styles, ask questions, or confirm details
              about your upcoming appointment in real-time.
            </Text>
          </View>

          <View style={styles.featureContainer1}>
            <Text style={styles.featureTitle}>Service Listings:</Text>
            <Text style={styles.featureText}>
              Barbers can list their services and pricing, so users can find
              exactly what they’re looking for. From cuts to shaves and beyond,
              TruBarber makes it easy to explore all available options.
            </Text>
          </View>

          <View style={styles.featureContainer}>
            <Text style={styles.featureTitle}>Contact Us:</Text>
            <Text style={styles.featureText}>
              If you have any questions regarding privacy while using the
              Application, please contact us via email at{' '}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('mailto:brian@simationstudios.com')
                }>
                <Text style={styles.emailLink}>brian@simationstudios.com</Text>
              </TouchableOpacity>
              .
            </Text>
          </View>

          <Text style={styles.finalNote}>
            With TruBarber, getting the perfect cut is just a few clicks away.
            Whether you’re booking an appointment or chatting with your barber,
            TruBarber is designed to make your grooming experience smooth,
            simple, and enjoyable. Download now and discover your new favorite
            barber today!
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
