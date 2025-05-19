import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const affirmations = [
  "I am at peace with the present moment.",
  "My breath guides me to calmness.",
  "I release tension and embrace relaxation.",
  "I am in control of my thoughts and emotions.",
  "Calmness is within me at all times."
];

const CalmBreakScreen = ({ navigation }) => {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [animation] = useState(new Animated.Value(1));
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      handleEndSession();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleStartTimer = (duration) => {
    setTimer(duration);
    setIsTimerActive(true);
  };

  const handleEndSession = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsTimerActive(false);
      navigation.navigate("Home");
    });
  };

  const handleNewAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Take a Calm Break 🌿</Text>

      <Animated.View style={[styles.visualizationBox, { opacity: animation }]}>
        <Text style={styles.visualizationText}>Imagine yourself in a peaceful place...</Text>
      </Animated.View>

      <TouchableOpacity style={styles.affirmationBox} onPress={handleNewAffirmation}>
        <Text style={styles.affirmationText}>{currentAffirmation}</Text>
        <Text style={styles.tapText}>(Tap for a new affirmation)</Text>
      </TouchableOpacity>

      {!isTimerActive && (
        <View style={styles.timerSection}>
          <Text style={styles.timerText}>Choose a relaxation time:</Text>
          <View style={styles.timerButtons}>
            <TouchableOpacity style={styles.timerButton} onPress={() => handleStartTimer(60)}>
              <Text style={styles.timerButtonText}>1 min</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timerButton} onPress={() => handleStartTimer(180)}>
              <Text style={styles.timerButtonText}>3 min</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timerButton} onPress={() => handleStartTimer(300)}>
              <Text style={styles.timerButtonText}>5 min</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isTimerActive && <Text style={styles.timerCountdown}>Time Remaining: {timer} sec</Text>}

      {isTimerActive && (
        <TouchableOpacity style={styles.endSessionButton} onPress={handleEndSession}>
          <Text style={styles.endSessionText}>I'm Ready to Continue</Text>
        </TouchableOpacity>
      )}

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.breatheButton} onPress={() => navigation.navigate("BreatheRelax")}>
          <Icon name="weather-windy" size={24} color="#fff" />
          <Text style={styles.breatheButtonText}>Try Breathe & Relax</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F4EA',
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 40,
  },
  visualizationBox: {
    backgroundColor: '#C3E8D5',
    padding: 30,
    borderRadius: 16,
    width: '100%',
    marginBottom: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  visualizationText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Georgia',
    color: '#00796b',
  },
  affirmationBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  affirmationText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Georgia',
    color: '#444',
    lineHeight: 28,
  },
  tapText: {
    fontSize: 14,
    color: '#888',
    marginTop: 12,
  },
  timerSection: {
    alignItems: 'center',
    marginBottom: 50,
    width: '100%',
  },
  timerText: {
    fontSize: 18,
    fontFamily: 'Georgia',
    color: '#00796b',
    marginBottom: 20,
  },
  timerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  timerButton: {
    backgroundColor: '#00796b',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  timerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerCountdown: {
    fontSize: 20,
    fontFamily: 'Georgia',
    color: '#00796b',
    marginBottom: 40,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
    gap: 20,
  },
  breatheButton: {
    flexDirection: 'row',
    backgroundColor: '#00796b',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  breatheButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'DMSerifDisplay-Regular',
  },
  endSessionButton: {
    backgroundColor: '#444',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
  },
  endSessionText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Georgia',
  },
});

export default CalmBreakScreen;
