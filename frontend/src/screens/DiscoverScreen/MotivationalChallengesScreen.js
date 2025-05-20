import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dailyChallenges = [
  { title: 'Stress Relief', icon: 'meditation', challenge: "Write down 3 things making you feel stressed, then rip the paper." },
  { title: 'Gratitude Focus', icon: 'heart-outline', challenge: "Send a thank-you message to someone you appreciate." },
  { title: 'Self-Reflection', icon: 'book-open-page-variant', challenge: "Write down one thing you love about yourself." },
  { title: 'Digital Detox', icon: 'cellphone-off', challenge: "Turn off notifications for 2 hours and do something mindful." },
  { title: 'Body Awareness', icon: 'yoga', challenge: "Do a 5-minute stretch while focusing on your breath." },
];

const unlockables = [
  {
    title: 'Bubble Pop – Tap your stress away',
    description: 'Mini-game to reduce stress by popping negative thoughts.',
    icon: 'gamepad-variant',
    requiredStreak: 3,
    screen: 'BubblePopGame',
  },
  {
    title: 'Affirmation Mirror',
    challenge: 'Stand in front of a mirror and say 3 affirmations aloud.',
    icon: 'mirror-variant',
    requiredStreak: 5,
  },
  {
    title: 'Acts of Kindness',
    challenge: 'Do a random act of kindness and journal how it felt.',
    icon: 'hand-heart',
    requiredStreak: 7,
  },
  {
    title: 'Sunrise Moment',
    challenge: 'Wake up early and enjoy 10 minutes of silence at sunrise.',
    icon: 'weather-sunset-up',
    requiredStreak: 10,
  },
  {
    title: 'Gratitude Letter',
    challenge: 'Write a heartfelt letter to someone you’re grateful for.',
    icon: 'email-heart-outline',
    requiredStreak: 15,
  },
  {
    title: 'Silence Challenge',
    challenge: 'Spend 1 hour in silence, observing your thoughts.',
    icon: 'volume-off',
    requiredStreak: 20,
  },
  {
    title: 'Reflection Walk',
    challenge: 'Go on a mindful walk and reflect on your growth.',
    icon: 'walk',
    requiredStreak: 25,
  },
  {
    title: 'Self-Celebration',
    challenge: 'Celebrate your progress: write 5 things you’ve improved.',
    icon: 'star-outline',
    requiredStreak: 30,
  },
];

const MotivationalChallengesScreen = ({ route, navigation }) => {
  const userStreak = route.params?.streak || 0;
  const [dailyChallenge, setDailyChallenge] = useState(dailyChallenges[0]);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    const index = new Date().getDate() % dailyChallenges.length;
    setDailyChallenge(dailyChallenges[index]);
  }, []);

  const completeChallenge = () => {
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
        </Animated.View>

        <Text style={styles.header}>Milestone Challenges</Text>
        {unlockables.map((item, index) => {
          const unlocked = userStreak >= item.requiredStreak;
          return (
            <View
              key={index}
              style={[styles.challengeCard, { backgroundColor: unlocked ? '#00796b' : '#ccc' }]}
            >
              <View style={styles.challengeCardHeader}>
                <Icon name={unlocked ? item.icon : 'lock'} size={24} color="#fff" />
                <Text style={styles.challengeTitle}>{item.title}</Text>
              </View>
              <Text style={styles.streakRequirement}>
                {unlocked ? 'Unlocked' : `Unlocks at Streak ${item.requiredStreak}`}
              </Text>
              {unlocked && !item.screen && (
                <TouchableOpacity onPress={() => setSelectedChallenge(item)} style={styles.viewButton}>
                  <Text style={styles.buttonText}>View Challenge</Text>
                </TouchableOpacity>
              )}
              {unlocked && item.screen && (
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.screen)}
                  style={styles.viewButton}
                >
                  <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      <Modal visible={!!selectedChallenge} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedChallenge?.title}</Text>
            <Text style={styles.modalText}>{selectedChallenge?.challenge}</Text>
            <TouchableOpacity onPress={() => setSelectedChallenge(null)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  dailyChallengeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#00796b',
  },
  challengeText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
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
  streakRequirement: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
    marginTop: 5,
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: '#004d40',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#00796b',
    padding: 12,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
});

export default MotivationalChallengesScreen;
