import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const onSendPressed = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.1.135:8080/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        alert('A reset code has been sent to your email.');
        navigation.navigate('ResetPassword');
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error');
    }
  };
  
  
  const onSignInPressed = () => {
    navigation.navigate('SignIn'); 
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset Your Password</Text>
      <CustomInput
        placeholder="Email"
        value={email}
        setValue={setEmail}
      />
      <CustomButton text="Send Reset Link" onPress={onSendPressed} />
      <CustomButton
        text="Back to Sign In"
        onPress={onSignInPressed}
        type="SECONDARY"
      />
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

export default ForgotPasswordScreen;
