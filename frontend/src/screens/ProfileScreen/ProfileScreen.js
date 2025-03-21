import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ navigation }) => {
  const [userInfo] = useState({
    name: 'John Doe',
    age: 28,
    gender: 'Male',
    occupation: 'Software Engineer',
    healthInfo: 'No specific conditions',
    goals: ['Reduce Stress', 'Meditate Daily', 'Sleep Better'],
    streak: 5, 
  });

  return (
    <View style={styles.container}>
   
      <Text style={styles.greeting}>Hello, {userInfo.name}!</Text>
      <Text style={styles.motivation}>Stay calm and take one day at a time.</Text>

      <View style={styles.streakContainer}>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>{userInfo.streak} Days</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Profile Information</Text>
          <Text style={styles.infoText}>Name: {userInfo.name}</Text>
          <Text style={styles.infoText}>Age: {userInfo.age}</Text>
          <Text style={styles.infoText}>Gender: {userInfo.gender}</Text>
          <Text style={styles.infoText}>Occupation: {userInfo.occupation}</Text>
          <Text style={styles.infoText}>Health Info: {userInfo.healthInfo}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileSetup')}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.goalsCard}>
          <Text style={styles.infoTitle}>Your Top Goals</Text>
          {userInfo.goals.map((goal, index) => (
            <Text key={index} style={styles.goalText}>
              • {goal}
            </Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="#555" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discover')}>
          <Icon name="compass-outline" size={30} color="#555" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="account-circle-outline" size={30} color="#00796b" />
          <Text style={[styles.navText, styles.activeNavText]}>Profile</Text>
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
    paddingTop: 100,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
  },
  motivation: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  streakContainer: {
    alignItems: 'center',
    marginVertical: 20, 
  },
  streakBadge: {
    backgroundColor: '#ffcc00', 
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  streakText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#00796b',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  goalText: {
    fontSize: 16,
    color: '#00796b',
    marginVertical: 5,
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
  activeNavText: {
    color: '#00796b',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
