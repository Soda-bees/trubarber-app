import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigator from './src/services/config/navigation';
import {LogBox, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import socket from './src/services/Socket';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PUBLISH_KEY } from '@env';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs();
  }, []);

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  // console.log('hiiiii',PUBLISH_KEY);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StripeProvider 
        // publishableKey="pk_live_eolzvsZWGgGEdxhhUSZcISQT00f7ponOKE" // client key
        publishableKey={PUBLISH_KEY}
        >
          <MainNavigator />
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
}
