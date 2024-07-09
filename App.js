import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import MainNavigator from './src/services/config/navigation';
import { LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import socket from "./src/services/Socket"

export default function App() {

  useEffect(() => {
    LogBox.ignoreAllLogs()
  },[])

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}