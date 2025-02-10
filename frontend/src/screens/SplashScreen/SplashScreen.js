import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const logoFadeAnim = useRef(new Animated.Value(0)).current; 
  const screenFadeAnim = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    Animated.timing(logoFadeAnim, {
      toValue: 1, 
      duration: 1500, 
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(screenFadeAnim, {
          toValue: 0, 
          duration: 1000, 
          useNativeDriver: true,
        }).start(() => {
          navigation.replace('SignIn'); 
        });
      }, 1000); 
    });
  }, [logoFadeAnim, screenFadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: screenFadeAnim }]}>
      <Animated.View style={[styles.logoContainer, { opacity: logoFadeAnim }]}>
        <Image
          source={require('../../../assets/images/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.tagline}>Your companion to a stress-free life.</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#00796b',
    textAlign: 'center',
  },
});

export default SplashScreen;
