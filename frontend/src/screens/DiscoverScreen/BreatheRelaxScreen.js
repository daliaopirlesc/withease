import React, { useState, useRef, useEffect } from 'react'; 
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const BreatheRelaxScreen = ({ navigation }) => {
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [duration, setDuration] = useState(30);
  const [remainingTime, setRemainingTime] = useState(duration);
  const animation = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearInterval(timerRef.current);
        setIsExerciseActive(false);
        setRemainingTime(duration);
      };
    }, [duration])
  );

  const startBreathingExercise = () => {
    setIsExerciseActive(true);
    setRemainingTime(duration);
    animateBreathing();
    countdownTimer(duration);
  };

  const animateBreathing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.5,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const countdownTimer = (time) => {
    let timer = time;
    timerRef.current = setInterval(() => {
      timer -= 1;
      setRemainingTime(timer);
      if (timer <= 0) {
        clearInterval(timerRef.current);
        setIsExerciseActive(false);
        Alert.alert("Session Complete", "You've finished your breathing session.");
      }
    }, 1000);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setRemainingTime(newDuration);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Breathe & Relax</Text>
      </View>

      <Text style={styles.timerText}>{remainingTime} sec</Text>

      <Animated.View style={[styles.circle, { transform: [{ scale: animation }] }]} />

      {isExerciseActive && (
        <Text style={styles.breathingText}>
          {remainingTime % 8 < 4 ? 'Inhale' : 'Exhale'}
        </Text>
      )}

      {!isExerciseActive && (
        <TouchableOpacity style={styles.startButton} onPress={startBreathingExercise}>
          <Text style={styles.startButtonText}>Start Exercise</Text>
        </TouchableOpacity>
      )}

      {!isExerciseActive && (
        <View style={styles.durationContainer}>
          <Text style={styles.customizationText}>Choose Duration</Text>
          <View style={styles.timerOptions}>
            <TouchableOpacity
              style={[styles.timerButton, duration === 30 && styles.selectedTimer]}
              onPress={() => handleDurationChange(30)}
            >
              <Text style={styles.timerButtonText}>30 sec</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timerButton, duration === 60 && styles.selectedTimer]}
              onPress={() => handleDurationChange(60)}
            >
              <Text style={styles.timerButtonText}>1 min</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timerButton, duration === 120 && styles.selectedTimer]}
              onPress={() => handleDurationChange(120)}
            >
              <Text style={styles.timerButtonText}>2 min</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 60,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00796b',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 20,
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#00796b',
    opacity: 0.4,
  },
  breathingText: {
    fontSize: 28,
    color: '#00796b',
    fontWeight: 'bold',
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#00796b',
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  durationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  customizationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  timerOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timerButton: {
    backgroundColor: '#b2dfdb',
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 5,
  },
  selectedTimer: {
    backgroundColor: '#00796b',
  },
  timerButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BreatheRelaxScreen;
