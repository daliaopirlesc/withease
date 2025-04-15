import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import Navigation from './src/navigation';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const fetchFonts = async () => {
  await Font.loadAsync({
    'Caveat': require('./assets/fonts/Caveat-Regular.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      await fetchFonts();
      await requestNotificationPermissions();
      setFontLoaded(true);
      await SplashScreen.hideAsync();
    };

    const requestNotificationPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications not granted');
      }
    };

    loadResources();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return <Navigation />;
};

export default App;
