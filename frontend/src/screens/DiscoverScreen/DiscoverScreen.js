import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import allGoals from '../../data/goalsWithActivities';
import { API_BASE_URL } from '../../config/config';

const DiscoverScreen = ({ navigation }) => {
  const activities = [
    { id: '1', title: 'Body Scan Meditation', screen: 'BodyScanMeditation' },
    { id: '2', title: 'Breathe & Relax', screen: 'BreatheRelax' },
    { id: '5', title: 'Focus Booster', screen: 'FocusBooster' },
    { id: '6', title: 'Gratitude Journal', screen: 'GratitudeJournal' },
    { id: '7', title: 'Guided Meditation', screen: 'GuidedMeditation' },
    { id: '9', title: 'Mindful Check-In', screen: 'MindfulCheckIn' },
    { id: '10', title: 'Mood Logging', screen: 'LogMood' },
    { id: '11', title: 'Motivational Challenges', screen: 'MotivationalChallenges' },
    // { id: '12', title: 'Productivity Planner', screen: 'ProductivityPlanner' },
    { id: '14', title: 'Stress Journal', screen: 'StressJournal' }
  ].sort((a, b) => a.title.localeCompare(b.title));

  const [searchQuery, setSearchQuery] = useState('');
  const [userGoals, setUserGoals] = useState([]);

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        const goalTitles = data.goals || [];
        const matchedGoals = allGoals.filter(goal => goalTitles.includes(goal.title));
        setUserGoals(matchedGoals);
      } catch (error) {
        console.error('Failed to load user goals:', error);
      }
    };

    fetchGoals();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search activities..."
          placeholderTextColor="#555"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <FlatList
          data={userGoals}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.goalsList}
          renderItem={({ item: goal }) => (
            <TouchableOpacity
              style={styles.goalCard}
              onPress={() => navigation.navigate('GoalActivities', { goal })}
            >
              <Icon name={goal.icon} size={36} color="#00796b" style={{ marginBottom: 10 }} />
              <Text style={styles.goalTitle}>{goal.title}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.sectionTitle}>All Activities</Text>
        <View style={styles.activitiesContainer}>
          {filteredActivities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              onPress={() => navigation.navigate(activity.screen)}
            >
              <Text style={styles.activityTitle}>{activity.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="#555" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discover')}>
          <Icon name="compass-outline" size={30} color="#00796b" />
          <Text style={styles.navTextActive}>Discover</Text>
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
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 32,
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'DMSerifDisplay-Regular',
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  sectionTitle: {
    fontSize: 22,
    color: '#00796b',
    marginVertical: 10,
    fontFamily: 'DMSerifDisplay-Regular',
  },
  goalsList: {
    paddingVertical: 5,
    paddingRight: 10,
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    padding: 15,
    width: 150,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
  },
  activitiesContainer: {
    flexDirection: 'column',
  },
  activityCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
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
  },
  navTextActive: {
    fontSize: 12,
    color: '#00796b',
    fontWeight: 'bold',
  },
});

export default DiscoverScreen;
