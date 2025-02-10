import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './src/navigation';


SplashScreen.preventAutoHideAsync();

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
      setFontLoaded(true);
      await SplashScreen.hideAsync(); 
    };
    loadResources();
  }, []);

  if (!fontLoaded) {
    return null; 
  }

  return <Navigation />;
};

export default App;
