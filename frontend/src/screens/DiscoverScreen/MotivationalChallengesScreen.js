import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dailyChallenges = [
  { title: 'Stress Relief', icon: 'meditation', challenge: "Write down 3 things making you feel stressed, then rip the paper." },
  { title: 'Gratitude Focus', icon: 'heart-outline', challenge: "Send a thank-you message to someone you appreciate." },
  { title: 'Self-Reflection', icon: 'book-open-page-variant', challenge: "Write down one thing you love about yourself." },
  { title: 'Digital Detox', icon: 'cellphone-off', challenge: "Turn off notifications for 2 hours and do something mindful." },
  { title: 'Body Awareness', icon: 'yoga', challenge: "Do a 5-minute stretch while focusing on your breath." },
];

const allChallenges = [
  { id: '1', title: '7-Day Mindfulness Challenge', streakRequired: 3, description: 'Complete small mindful tasks every day for a week.' },
  { id: '2', title: '3-Day Stress-Free Challenge', streakRequired: 10, description: 'Daily exercises to reduce stress levels.' },
  { id: '3', title: 'Boost Self-Esteem Challenge', streakRequired: 15, description: 'Activities to enhance confidence and self-worth.' },
  { id: '4', title: 'Digital Detox 1-Week Challenge', streakRequired: 30, description: 'One week of controlled screen time and focus.' },
  { id: '5', title: 'Mindfulness Mastery Challenge', streakRequired: 50, description: 'Advanced mindfulness exercises to master focus.' },
];

const MotivationalChallengesScreen = ({ route }) => {
  const userStreak = route.params?.streak || 0; 
  const [dailyChallenge, setDailyChallenge] = useState(dailyChallenges[0]);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    
    const challengeIndex = new Date().getDate() % dailyChallenges.length;
    setDailyChallenge(dailyChallenges[challengeIndex]);
  }, []);

  const getNewChallenge = () => {
    let newChallenge;
    do {
      newChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
    } while (newChallenge === dailyChallenge);
    setDailyChallenge(newChallenge);
  };

  const completeChallenge = () => {
    setCompletedChallenges(completedChallenges + 1);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.header}>Today's Challenge</Text>
        <Animated.View style={[styles.dailyChallengeContainer, { opacity: fadeAnim }]}>
          <View style={styles.challengeTitleContainer}>
            <Icon name={dailyChallenge.icon} size={30} color="#00796b" />
            <Text style={styles.challengeCategory}>{dailyChallenge.title}</Text>
          </View>
          <Text style={styles.challengeText}>{dailyChallenge.challenge}</Text>
          <View style={styles.challengeButtons}>
            <TouchableOpacity style={styles.newChallengeButton} onPress={getNewChallenge}>
              <Text style={styles.buttonText}>New Challenge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.completeChallengeButton} onPress={completeChallenge}>
              <Text style={styles.buttonText}>Mark as Complete</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Text style={styles.header}>Your Challenge Progress</Text>
        {allChallenges.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={[
              styles.challengeCard,
              { backgroundColor: userStreak >= challenge.streakRequired ? '#00796b' : '#ccc' },
            ]}
            disabled={userStreak < challenge.streakRequired}
          >
            <View style={styles.challengeCardHeader}>
              <Icon name={userStreak >= challenge.streakRequired ? "lock-open-outline" : "lock"} size={24} color="#fff" />
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
            </View>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
            <Text style={styles.streakRequirement}>
              {userStreak >= challenge.streakRequired
                ? "Unlocked"
                : `Unlocks at Streak ${challenge.streakRequired}`}
            </Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f7',
    paddingHorizontal: 20,
    paddingTop: 60
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  dailyChallengeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    alignItems: 'center',
  },
  challengeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  challengeCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  challengeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  challengeButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  newChallengeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  completeChallengeButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  challengeCard: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  challengeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#fff',
  },
  streakRequirement: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
});

export default MotivationalChallengesScreen;
