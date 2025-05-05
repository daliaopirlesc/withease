import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Image } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const SignInScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        const savedToken = await AsyncStorage.getItem('token');

        if (savedToken) {
          const profileResponse = await fetch(`${API_BASE_URL}/api/users/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${savedToken}`,
              'Content-Type': 'application/json',
            },
          });

          const profileData = await profileResponse.json();

          if (profileData.name) {
            await AsyncStorage.setItem('userName', profileData.name);
          }
          
          if (profileResponse.ok && profileData.profileCompleted) {
            navigation.replace('Home');
          } else {
            navigation.replace('ProfileSetup');
          }
          
        } else {
          alert('Token was not saved. Please try again.');
        }
      } else {
        alert('Login failed: ' + (data.message || 'Invalid credentials'));
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
      <CustomButton text="Sign In" onPress={onSignInPressed} />
      <TouchableOpacity onPress={onForgotPasswordPressed}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={onSignUpPressed}>
          <Text style={styles.link}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
    paddingTop: 150,
    backgroundColor: '#e6f7f7',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    marginVertical: 10,
  },
  link: {
    color: '#00796b',
    marginVertical: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#555',
  },
});

export default SignInScreen;
