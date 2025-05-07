import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00796b" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

        <Text style={styles.title}>Welcome back, {userInfo?.username}!</Text>
        <Text style={styles.subtitle}>Stay calm and take one day at a time.</Text>

        {userInfo && (
          <View style={styles.streakBox}>
            <Icon name="star-circle" size={20} color="#fbc02d" style={{ marginRight: 8 }} />
            <Text style={styles.streakText}>{userInfo.streak || 0} Day Streak</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile Details</Text>
          <Text style={styles.detail}>Username: {userInfo.username}</Text>
          <Text style={styles.detail}>Email: {userInfo.email}</Text>
          <Text style={styles.detail}>Name: {userInfo.name || 'Not set'}</Text>
          <Text style={styles.detail}>Age: {userInfo.age || 'Not set'}</Text>
          <Text style={styles.detail}>Gender: {userInfo.gender || 'Not set'}</Text>
          <Text style={styles.detail}>Occupation: {userInfo.occupation || 'Not set'}</Text>
          <Text style={styles.detail}>Health Info: {userInfo.healthInfo || 'Not set'}</Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileSetup')}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('MoodHistory')}>
            <Text style={styles.buttonText}>Mood History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Goals</Text>
          {userInfo.goals?.length ? (
            userInfo.goals.map((goal, i) => (
              <Text key={i} style={styles.goal}>• {goal}</Text>
            ))
          ) : (
            <Text style={styles.goal}>No goals added yet.</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="#555" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
          <Icon name="compass-outline" size={30} color="#555" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="account-circle-outline" size={30} color="#00796b" />
          <Text style={[styles.navText, styles.active]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F4EA', paddingTop: 30 },
  scroll: { padding: 20, paddingBottom: 100 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E6F4EA' },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: { fontSize: 26, fontFamily: 'DMSerifDisplay-Regular', color: '#00796b', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#555', marginTop: 5 },
  streakBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4', // buttery yellow
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 16,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  streakText: { fontSize: 15, fontWeight: '600', color: '#555' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 20,
    color: '#00796b',
    fontFamily: 'DMSerifDisplay-Regular',
    marginBottom: 10,
  },
  detail: { fontSize: 16, color: '#444', marginBottom: 5 },
  goal: { fontSize: 16, color: '#00796b', marginBottom: 5 },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#00796b',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
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
  navText: { fontSize: 12, color: '#555', textAlign: 'center' },
  active: { color: '#00796b', fontWeight: 'bold' },
});

export default ProfileScreen;
