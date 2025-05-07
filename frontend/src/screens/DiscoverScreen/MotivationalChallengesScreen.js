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

const MotivationalChallengesScreen = ({ route, navigation }) => {
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

        <Text style={styles.header}>Mini-Games</Text>
        <View
          style={[
            styles.challengeCard,
            { backgroundColor: userStreak >= 3 ? '#00796b' : '#ccc' },
          ]}
        >
          <View style={styles.challengeCardHeader}>
            <Icon
              name={userStreak >= 3 ? 'gamepad-variant' : 'lock'}
              size={24}
              color="#fff"
            />
            <Text style={styles.challengeTitle}>Bubble Pop – Tap your stress away</Text>
          </View>
          <Text style={styles.challengeDescription}>
            A relaxing mini-game to reduce stress by popping negative thoughts.
          </Text>
          <Text style={styles.streakRequirement}>
            {userStreak >= 3 ? 'Unlocked' : 'Unlocks at Streak 3'}
          </Text>

          {userStreak >= 3 && (
            <TouchableOpacity
              style={styles.completeChallengeButton}
              onPress={() => navigation.navigate('BubblePopGame')}
            >
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f7',
    paddingHorizontal: 20,
    paddingTop: 60,
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
    marginVertical: 10,
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
    marginVertical: 5,
  },
  streakRequirement: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
});

export default MotivationalChallengesScreen;
