import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


export const ErrorShow = (type, title, message, onHide) => {
  // const navigation = useNavigation()
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    onHide: onHide || (() => { onHide }),
    // onHide: () => {
    //   if (screenName) {
    //     navigation.replace(screenName)
    //   }
    // }
  });
}
