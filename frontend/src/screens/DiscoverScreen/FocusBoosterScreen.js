import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FOCUS_DURATION = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 10 * 60;

const FocusBoosterScreen = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [infoVisible, setInfoVisible] = useState(false);
  const animation = useState(new Animated.Value(1))[0];

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        setTimeLeft(FOCUS_DURATION);
        setIsBreak(false);
      } else {
        const nextBreak = cycleCount === 3 ? LONG_BREAK : SHORT_BREAK;
        setTimeLeft(nextBreak);
        setIsBreak(true);
        setCycleCount((prev) => (prev === 3 ? 0 : prev + 1));
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startPauseTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning) animateFocus();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setCycleCount(0);
    setTimeLeft(FOCUS_DURATION);
  };

  const animateFocus = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Focus Booster</Text>

      <TouchableOpacity style={styles.infoButton} onPress={() => setInfoVisible(true)}>
        <Icon name="information-outline" size={26} color="#00796b" />
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <Text style={styles.sessionLabel}>{isBreak ? 'Break Time' : 'Focus Time'}</Text>

        <Animated.View style={[styles.timerCircle, { transform: [{ scale: animation }] }]}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </Animated.View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={startPauseTimer}>
            <Icon name={isRunning ? 'pause-circle' : 'play-circle'} size={60} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={resetTimer}>
            <Icon name="restart" size={60} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.message}>
          {isRunning
            ? isBreak
              ? 'Relax and recharge...'
              : 'Stay focused and do your best!'
            : 'Press play to begin your session.'}
        </Text>
      </View>

      <Modal visible={infoVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>What is Pomodoro?</Text>
            <Text style={styles.modalText}>
              The Pomodoro Technique is a simple time management method created by Francesco Cirillo. You work for 25 minutes, then take a short break. After 4 focus sessions, enjoy a longer break. It's designed to boost focus, reduce fatigue, and improve productivity.
            </Text>
            <TouchableOpacity onPress={() => setInfoVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>Got it</Text>
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
    backgroundColor: '#E6F4EA',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 0,
  },
  infoButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionLabel: {
    fontSize: 18,
    color: '#00796b',
    marginBottom: 40,
  },
  timerCircle: {
    width: 265,
    height: 265,
    borderRadius: 130,
    backgroundColor: '#00796b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  timerText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'DMSerifDisplay-Regular',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  controlButton: {
    marginHorizontal: 20,
  },
  message: {
    fontSize: 16,
    color: '#00796b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    color: '#00796b',
    fontFamily: 'DMSerifDisplay-Regular',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#00796b',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FocusBoosterScreen;