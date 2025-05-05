import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const stressLevel = 0.6;
  const dailyTip = 'Drink water and take a short walk.';

  useEffect(() => {
    const loadUserName = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (name) setUserName(name);
    };
    loadUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, {userName}!</Text>
        <Text style={styles.quote}>Take a deep breath and relax.</Text>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.sectionTitle}>Your Stress Level</Text>
        <ProgressBar progress={stressLevel} color="#00796b" style={styles.progressBar} />
        <Text style={styles.stressLevelText}>{Math.round(stressLevel * 100)}% Stress</Text>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('LogMood')}>
            <Icon name="emoticon-happy-outline" size={30} color="#00796b" />
            <Text style={styles.actionText}>Log Mood</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Insights')}>
            <Icon name="chart-line" size={30} color="#00796b" />
            <Text style={styles.actionText}>View Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Reminders')}>
            <Icon name="bell-ring-outline" size={30} color="#00796b" />
            <Text style={styles.actionText}>Reminders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dailyTip}>
          <Text style={styles.tipTitle}>Daily Tip</Text>
          <Text style={styles.tipText}>{dailyTip}</Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={30} color="#00796b" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discover')}>
          <Icon name="compass-outline" size={30} color="#555" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-circle-outline" size={30} color="#555" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f7',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
  },
  quote: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  stressLevelText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#00796b',
    marginTop: 5,
  },
  dailyTip: {
    alignItems: 'center',
    marginVertical: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    width: '110%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
});

export default HomeScreen;
