import {StyleSheet} from 'react-native';
import {sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    // marginTop: 16,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'justify',
    marginBottom: 20,
  },
  featureContainer: {
    marginBottom: 20,
  },
  featureContainer1: {
    marginBottom: 20,
    paddingHorizontal: sizes.screenWidth * 0.01,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  featureText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  emailLink: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  finalNote: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: sizes.screenHeight * 0.06,
  },
});
