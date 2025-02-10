import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const steps = [
  "Close your eyes. Take a deep breath in… and out…",
  "Focus on your toes. Feel them relax and release any tension.",
  "Move your awareness up to your feet. Let them soften.",
  "Now, shift your focus to your legs. Imagine a warm, soothing energy flowing through them.",
  "Relax your hips and lower back. Let go of any tightness.",
  "Bring awareness to your stomach and chest. Breathe deeply and feel them expand with ease.",
  "Soften your shoulders. Let them drop naturally.",
  "Relax your arms, from your fingers up to your shoulders.",
  "Now, focus on your neck and jaw. Let go of any clenching.",
  "Finally, relax your forehead and face. Feel the tension melt away.",
  "Your entire body is now at ease. Carry this calmness with you."
];

const BodyScanMeditationScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);

  useEffect(() => {
    let timer;
    if (isMeditating && currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isMeditating, currentStep]);

  const handleStartPause = () => {
    setIsMeditating(!isMeditating);
    if (!isMeditating) {
      setCurrentStep(0);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Body Scan Meditation 🧘‍♂️</Text>

      
      <ScrollView contentContainerStyle={styles.textContainer}>
        <Text style={styles.stepText}>{steps[currentStep]}</Text>
      </ScrollView>

      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              currentStep >= index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartPause}>
        <Icon name={isMeditating ? "pause-circle-outline" : "play-circle-outline"} size={40} color="white" />
        <Text style={styles.startButtonText}>{isMeditating ? "Pause" : "Start Meditation"}</Text>
      </TouchableOpacity>

      {currentStep === steps.length && (
        <Text style={styles.completionMessage}>
          Your body is at ease. Carry this calmness with you.
        </Text>
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    fontFamily: 'DMSerifDisplay-Regular',
    marginBottom: 20,
    paddingTop: 60
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  stepText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'DMSerifDisplay-Regular',
  },
  progressContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00796b',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#00796b',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'DMSerifDisplay-Regular',
  },
  completionMessage: {
    fontSize: 20,
    color: '#00796b',
    textAlign: 'center',
    fontFamily: 'DMSerifDisplay-Regular',
    marginTop: 20,
  },
});

export default BodyScanMeditationScreen;
