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

const BreatheRelaxScreen = () => {
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [duration, setDuration] = useState(30);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  const animation = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        animationRef.current?.stop();
        setIsExerciseActive(false);
        setRemainingTime(duration);
        setIsPaused(false);
      };
    }, [duration])
  );

  const animateBreathing = () => {
    animationRef.current = Animated.loop(
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
    );
    animationRef.current.start();
  };

  useEffect(() => {
    if (!isExerciseActive || isPaused) return;

    animateBreathing();

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          animationRef.current?.stop();
          setIsExerciseActive(false);
          Alert.alert('Session Complete', "You've finished your breathing session.");
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isExerciseActive, isPaused]);

  const startBreathingExercise = () => {
    setIsExerciseActive(true);
    setIsPaused(false);
    setRemainingTime(duration);
  };

  const pauseOrResumeExercise = () => {
    setIsPaused((prev) => !prev);
  };

  const stopExercise = () => {
    animationRef.current?.stop();
    setIsExerciseActive(false);
    setIsPaused(false);
    setRemainingTime(duration);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setRemainingTime(newDuration);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Breathe & Relax</Text>

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

      {isExerciseActive && (
        <View style={styles.controlRow}>
          <TouchableOpacity style={styles.controlButton} onPress={pauseOrResumeExercise}>
            <Text style={styles.controlButtonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, { backgroundColor: '#ccc' }]} onPress={stopExercise}>
            <Text style={[styles.controlButtonText, { color: '#333' }]}>Stop</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isExerciseActive && (
        <View style={styles.durationContainer}>
          <Text style={styles.customizationText}>Choose Duration</Text>
          <View style={styles.timerOptions}>
            {[30, 60, 120].map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.timerButton, duration === time && styles.selectedTimer]}
                onPress={() => handleDurationChange(time)}
              >
                <Text style={styles.timerButtonText}>
                  {time === 30 ? '30 sec' : time === 60 ? '1 min' : '2 min'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 24,
    fontFamily: 'Caveat',
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 15,
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#00796b',
    opacity: 0.3,
  },
  breathingText: {
    fontSize: 28,
    fontFamily: 'Caveat',
    color: '#00796b',
    marginTop: 25,
  },
  startButton: {
    backgroundColor: '#00796b',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Caveat',
    fontWeight: 'bold',
  },
  durationContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  customizationText: {
    fontSize: 16,
    fontFamily: 'Caveat',
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 6,
  },
  selectedTimer: {
    backgroundColor: '#00796b',
  },
  timerButtonText: {
    fontSize: 16,
    fontFamily: 'Caveat',
    color: '#fff',
    fontWeight: 'bold',
  },
  controlRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  controlButton: {
    backgroundColor: '#00796b',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Caveat',
  },
});

export default BreatheRelaxScreen;
