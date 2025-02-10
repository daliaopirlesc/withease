import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const affirmations = [
  "Let go of today, tomorrow is a fresh start.",
  "Breathe in peace, breathe out stress.",
  "Your body deserves rest. Allow yourself to relax.",
  "Nothing to worry about now. Just unwind.",
  "Close your eyes, feel the calm, and let go."
];

const EveningWindDownScreen = ({ navigation }) => {
  const [completionMessageVisible, setCompletionMessageVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const fadeStars = useState(new Animated.Value(0.4))[0];
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);

    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeStars, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeStars, {
          toValue: 0.4,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleCompleteSession = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setCompletionMessageVisible(true));
  };

  return (
    <LinearGradient colors={['#2C3E50', '#1C2833']} style={styles.container}>
      <Animated.View style={[styles.starAnimation, { opacity: fadeStars }]} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Prepare for a restful night</Text>
        <Text style={styles.affirmation}>{affirmation}</Text>

        <TouchableOpacity
          style={styles.stepButton}
          onPress={() => navigation.navigate('BreatheRelax')}
        >
          <Icon name="weather-windy" size={40} color="#ffffff" />
          <Text style={styles.stepText}>Breathe Deeply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stepButton}
          onPress={() => navigation.navigate('GratitudeJournal')}
        >
          <Icon name="book-open-outline" size={40} color="#ffffff" />
          <Text style={styles.stepText}>Clear Your Mind by Journaling</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stepButton}
          onPress={() => navigation.navigate('SleepSoundscape')}
        >
          <Icon name="music-note" size={40} color="#ffffff" />
          <Text style={styles.stepText}>Listen to Soothing Sounds</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stepButton}
          onPress={() => navigation.navigate('GuidedRelaxation')}
        >
          <Icon name="meditation" size={40} color="#ffffff" />
          <Text style={styles.stepText}>Try a Guided Relaxation</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>You've relaxed 3 nights in a row! 🎉</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.completeButton} onPress={handleCompleteSession}>
        <Text style={styles.completeButtonText}>I'm ready to sleep</Text>
      </TouchableOpacity>

      {completionMessageVisible && (
        <Animated.View style={[styles.completionMessageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.completionMessage}>
            Thank you for taking care of yourself tonight. Sweet dreams await.
          </Text>
        </Animated.View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  starAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  affirmation: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 25,
  },
  stepButton: {
    backgroundColor: '#5c6bc0',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  stepText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  progressContainer: {
    backgroundColor: '#3949ab',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  progressText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#3949ab',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completionMessageContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  completionMessage: {
    color: '#ffffff',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default EveningWindDownScreen;
