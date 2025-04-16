import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const ResetPasswordScreen = ({ navigation }) => {
  const route = useRoute();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (route?.params?.token) {
      setToken(route.params.token);
    }
  }, [route]);

  const onResetPressed = async () => {
    if (!token || !password || !confirmPassword) {
        alert('Complete all fields');
        return;
      }
      if (!/^\d{6}$/.test(token)) {
        alert('Token must be exactly 6 digits');
        return;
      }
      
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.135:8080/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        alert('Password reset successfully');
        navigation.navigate('SignIn');
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert('Reset failed: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Reset error:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Set New Password</Text>
      <CustomInput placeholder="Reset Code" value={token} setValue={setToken} />
      <CustomInput placeholder="New Password" value={password} setValue={setPassword} secureTextEntry />
      <CustomInput placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry />
      <CustomButton text="Reset Password" onPress={onResetPressed} />
      <CustomButton text="Back to Sign In" onPress={() => navigation.navigate('SignIn')} type="SECONDARY" />
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

export default ResetPasswordScreen;
