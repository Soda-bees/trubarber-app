import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {styles} from './style';
import {colors} from '../../services';
import Button from '../../components/Button';
import images from '../../services/utilities/images';
import BackArrow from '../../components/BackArrow';

export default function AddCard({navigation}) {
  const [modalOpen, setModalopen] = useState(false);
  const [cardName, setCardname] = useState('');
  const [cardNumber, setCardnumber] = useState('');
  const [expiryDate, setExpirydate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const setmodalTrue = () => {
    setModalopen(!modalOpen);
  };


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.allignment}>
            <View style={styles.arrowTop}>
              <BackArrow onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.headerText}>Add Card</Text>
          </View>
        </View>
        <View style={styles.addCardcontainer}>
          <Text style={styles.title}>Name on Card</Text>
          <TextInput
            placeholderTextColor={colors.placeholdertextgray}
            style={
              Platform.OS == 'android'
                ? styles.inputColor
                : styles.inputColorIOS
            }
            placeholder="Name on Card"
            value={cardName}
            onChangeText={text => setCardname(text)}
          />
          <View style={styles.marginTop}>
            <Text style={styles.title}>Card Number</Text>
            <TextInput
              placeholderTextColor={colors.placeholdertextgray}
              style={
                Platform.OS == 'android'
                  ? styles.inputColor
                  : styles.inputColorIOS
              }
              keyboardType="numeric"
              placeholder="xxxxxxxxxxxxxxxxxx"
              value={cardNumber}
              onChangeText={text => setCardname(text)}
            />
          </View>
          <View style={styles.marginTop}>
            <View style={styles.row}>
              <View style={styles.fullWidth}>
                <Text style={styles.title}>Expiry Date</Text>
                <TextInput
                  placeholderTextColor={colors.placeholdertextgray}
                  style={
                    Platform.OS == 'android'
                      ? styles.inputColor
                      : styles.inputColorIOS
                  }
                  placeholder="Exp.Date"
                  value={expiryDate}
                  keyboardType="numeric"
                  onChangeText={text => setExpirydate(text)}
                />
              </View>
              <View style={styles.fullWidth}>
                <Text style={styles.title}>Security Code</Text>
                <TextInput
                  placeholderTextColor={colors.placeholdertextgray}
                  style={
                    Platform.OS == 'android'
                      ? styles.inputColor
                      : styles.inputColorIOS
                  }
                  keyboardType="numeric"
                  placeholder="CVV"
                  value={securityCode}
                  onChangeText={text => setSecurityCode(text)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button onPress={setmodalTrue} title={'Save'} />
        </View>
        <Modal
          isVisible={modalOpen}
          onBackdropPress={() => setModalopen(false)}
          backdropOpacity={0.5}>
          <View style={styles.modal}>
            <Image
              source={images.approvedWallet}
              resizeMode="contain"
              style={styles.approvedWallet}
            />
            <View>
              <Text style={styles.modalText}>
                Your credit card has been successfully added!
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
