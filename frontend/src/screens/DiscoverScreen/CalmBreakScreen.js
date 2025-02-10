import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
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
    <View style={styles.container}>
      
        <View style={styles.titleContainer}>
          <Text style={styles.header}>Take a Calm Break 🌿</Text>
        </View>

      <Animated.View style={[styles.visualizationBox, { opacity: animation }]}>
        <Text style={styles.visualizationText}>Imagine yourself in a peaceful place...</Text>
      </Animated.View>

      <TouchableOpacity style={styles.affirmationBox} onPress={handleNewAffirmation}>
        <Text style={styles.affirmationText}>{currentAffirmation}</Text>
        <Text style={styles.tapText}>(Tap for a new affirmation)</Text>
      </TouchableOpacity>

      {!isTimerActive && (
        <View style={styles.timerContainer}>
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

      <TouchableOpacity style={styles.breatheButton} onPress={() => navigation.navigate("BreatheRelax")}>
        <Icon name="weather-windy" size={24} color="#fff" />
        <Text style={styles.breatheButtonText}>Try Breathe & Relax</Text>
      </TouchableOpacity>

      {isTimerActive && (
        <TouchableOpacity style={styles.endSessionButton} onPress={handleEndSession}>
          <Text style={styles.endSessionText}>I'm Ready to Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingTop: 40,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    fontFamily: 'DMSerifDisplay-Regular',
    marginBottom: 20,
  },
  visualizationBox: {
    backgroundColor: '#C3E8D5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  visualizationText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
  },
  affirmationBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  affirmationText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#444',
  },
  tapText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  timerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 10,
  },
  timerButtons: {
    flexDirection: 'row',
  },
  timerButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  timerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  timerCountdown: {
    fontSize: 18,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 20,
  },
  breatheButton: {
    flexDirection: 'row',
    backgroundColor: '#00796b',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: 10,
  },
  breatheButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'DMSerifDisplay-Regular',
  },
  endSessionButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  endSessionText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'DMSerifDisplay-Regular',
  },
});

export default CalmBreakScreen;
