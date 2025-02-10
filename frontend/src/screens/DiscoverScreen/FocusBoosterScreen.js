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

const FocusBoosterScreen = () => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(1800);
  const animation = useState(new Animated.Value(1))[0];

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startPauseTimer = () => {
    setIsRunning(!isRunning);
    animateFocus();
  };

  const resetTimer = () => {
    setTimeLeft(selectedTime);
    setIsRunning(false);
  };

  const animateFocus = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const setTimerDuration = (duration) => {
    setSelectedTime(duration);
    setTimeLeft(duration);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Focus Booster</Text>
      </View>

      <Text style={styles.subHeader}>Choose your session duration</Text>

      <View style={styles.timerOptions}>
        <TouchableOpacity
          style={[styles.timerButton, selectedTime === 900 && styles.selectedTimer]}
          onPress={() => setTimerDuration(900)}
        >
          <Text style={styles.timerButtonText}>15 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timerButton, selectedTime === 1800 && styles.selectedTimer]}
          onPress={() => setTimerDuration(1800)}
        >
          <Text style={styles.timerButtonText}>30 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timerButton, selectedTime === 3600 && styles.selectedTimer]}
          onPress={() => setTimerDuration(3600)}
        >
          <Text style={styles.timerButtonText}>1 hour</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.timerCircle, { transform: [{ scale: animation }] }]}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </Animated.View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={startPauseTimer}>
          <Icon name={isRunning ? "pause-circle" : "play-circle"} size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Icon name="restart" size={50} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.motivationText}>
        {isRunning ? "Stay focused. You're doing great!" : "Take a deep breath and start fresh!"}
      </Text>
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
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
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
  timerCircle: {
    width: 300,
    height: 300,
    borderRadius: 175,
    backgroundColor: '#00796b',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 45,
    color: '#fff',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 15,
  },
  motivationText: {
    fontSize: 16,
    color: '#00796b',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default FocusBoosterScreen;
