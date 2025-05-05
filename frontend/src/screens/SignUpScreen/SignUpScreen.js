import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { API_BASE_URL } from '../../config/config';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignUpPressed = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const userData = {
      username: fullName,
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json().catch(() => ({}));
  
      if (response.ok) {
        alert('Account created!');
        navigation.navigate('ProfileSetup');
      } else {
        alert('Signup failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error connecting to server');
    }
  };
  

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an Account</Text>
      <CustomInput placeholder="Full Name" value={fullName} setValue={setFullName} />
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
      <CustomInput placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry />
      <CustomButton text="Sign Up" onPress={onSignUpPressed} />
      <CustomButton text="Already have an account? Sign In" onPress={onSignInPressed} type="SECONDARY" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e6f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    marginVertical: 10,
  },
});

export default SignUpScreen;
