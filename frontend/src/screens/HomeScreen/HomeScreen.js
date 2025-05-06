import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../../config/config';

const { width } = Dimensions.get('window');

const dailyTips = [
  'Take a deep breath and smile.',
  'Drink more water today.',
  'Go for a 10-minute walk.',
  'Write down something positive.',
  'Stretch for a few minutes.',
  'Disconnect from your phone for 1 hour.',
  'Compliment yourself today.',
];

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [stressLevel, setStressLevel] = useState(0);
  const [dailyTip, setDailyTip] = useState('');

  useEffect(() => {
    const today = new Date().getDay();
    setDailyTip(dailyTips[today % dailyTips.length]);
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      const name = await AsyncStorage.getItem('userName');
      const token = await AsyncStorage.getItem('token');
      if (name) setUserName(name);
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/me/stress-level`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setStressLevel(data.level || 0);
      } catch (error) {
        console.error('Failed to fetch stress level:', error);
      }
    };
    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Welcome, {userName}!</Text>
        <Text style={styles.subheader}>Take a deep breath and relax.</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Stress Level</Text>
          <ProgressBar progress={stressLevel} color="#00796b" style={styles.progressBar} />
          <Text style={styles.stressLevelText}>{Math.floor(stressLevel * 100)}% Stress</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('LogMood')}>
              <Icon name="emoticon-happy-outline" size={30} color="#00796b" />
              <Text style={styles.actionText}>Log Mood</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Insights')}>
              <Icon name="chart-line" size={30} color="#00796b" />
              <Text style={styles.actionText}>Insights</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Reminders')}>
              <Icon name="bell-ring-outline" size={30} color="#00796b" />
              <Text style={styles.actionText}>Reminders</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily Tip</Text>
          <Text style={styles.tipText}>{dailyTip}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={30} color="#00796b" />
          <Text style={styles.navTextActive}>Home</Text>
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
    backgroundColor: '#E6F4EA',
    paddingTop: 40,
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 32,
    color: '#00796b',
    fontFamily: 'DMSerifDisplay-Regular',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#00796b',
    fontFamily: 'DMSerifDisplay-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  stressLevelText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#00796b',
    marginTop: 5,
  },
  tipText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  navTextActive: {
    fontSize: 12,
    color: '#00796b',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default HomeScreen;
