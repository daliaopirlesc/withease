import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GoalActivitiesScreen = ({ route, navigation }) => {
  const { goal } = route.params;

  const allActivities = [
    { id: '1', title: 'Body Scan Meditation', screen: 'BodyScanMeditation' },
    { id: '2', title: 'Breathe & Relax', screen: 'BreatheRelax' },
    { id: '5', title: 'Focus Booster', screen: 'FocusBooster' },
    { id: '6', title: 'Gratitude Journal', screen: 'GratitudeJournal' },
    { id: '7', title: 'Guided Meditation', screen: 'GuidedMeditation' },
    { id: '9', title: 'Mindful Check-In', screen: 'MindfulCheckIn' },
    { id: '10', title: 'Mood Logging', screen: 'LogMood' },
    { id: '11', title: 'Motivational Challenges', screen: 'MotivationalChallenges' },
    { id: '12', title: 'Productivity Planner', screen: 'ProductivityPlanner' },
    { id: '14', title: 'Stress Journal', screen: 'StressJournal' },
  ];

  const goalActivities = allActivities.filter((a) => goal.activities.includes(a.title));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon name={goal.icon} size={40} color="#00796b" />
        <Text style={styles.title}>{goal.title}</Text>
      </View>

      {goalActivities.map((activity) => (
        <TouchableOpacity
          key={activity.id}
          style={styles.activityCard}
          onPress={() => navigation.navigate(activity.screen)}
        >
          <Text style={styles.activityTitle}>{activity.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 700,
    backgroundColor: '#E6F4EA',
    paddingTop: 70,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#00796b',
    fontWeight: 'bold',
    marginTop: 10,
  },
  activityCard: {
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
});

export default GoalActivitiesScreen;
