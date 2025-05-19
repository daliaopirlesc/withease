import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';

const FullBodySilhouette = ({ highlightedArea }) => {
  const getColor = (area) => (highlightedArea === area ? '#FFD54F' : '#E0E0E0');
  const strokeColor = '#333';

  return (
    <Svg width={300} height={600} viewBox="0 0 200 400" fill="none">
      <Path d="M100 20 a15 15 0 1 0 0.0001 0" fill={getColor('head')} stroke={strokeColor} strokeWidth="2" />
      <Path d="M85 50 Q100 60 115 50 Q120 75 120 130 Q120 140 80 140 Q80 75 85 50 Z" fill={getColor('torso')} stroke={strokeColor} strokeWidth="2" />
      <Path d="M70 60 Q65 90 70 120 Q75 130 80 120 Q75 90 80 60 Z M130 60 Q135 90 130 120 Q125 130 120 120 Q125 90 120 60 Z" fill={getColor('arms')} stroke={strokeColor} strokeWidth="2" />
      <Path d="M85 140 L85 270 Q85 280 90 270 L95 140 Z" fill={getColor('legs')} stroke={strokeColor} strokeWidth="2" />
      <Path d="M105 140 L105 270 Q105 280 110 270 L115 140 Z" fill={getColor('legs')} stroke={strokeColor} strokeWidth="2" />
    </Svg>
  );
};

const steps = [
  { text: 'Gently bring your awareness to the top of your head. Breathe into this space and let any tension melt away.', area: 'head' },
  { text: 'Shift your focus to your chest and shoulders. Let your breath open your chest and soften your shoulders with every exhale.', area: 'torso' },
  { text: 'Now bring attention to your arms and hands. Feel them relax completely as if they’re melting into the earth.', area: 'arms' },
  { text: 'Finally, move your awareness to your legs. Allow them to become heavy, grounded, and completely at ease.', area: 'legs' },
];

const BodyScanMeditationScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);

  useEffect(() => {
    let timer;
    if (isMeditating && currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [isMeditating, currentStep]);

  const handleStartPause = () => {
    setIsMeditating(!isMeditating);
    if (!isMeditating) {
      setCurrentStep(0);
    }
  };

  const currentArea = steps[currentStep]?.area;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Body Scan Meditation </Text>
      <FullBodySilhouette highlightedArea={currentArea} />
      <ScrollView contentContainerStyle={styles.textContainer}>
        <Text style={styles.stepText}>{steps[currentStep]?.text || 'Your body is calm. Remain here as long as you need. ✨'}</Text>
      </ScrollView>
      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[styles.progressDot, currentStep >= index ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStartPause}>
        <Icon name={isMeditating ? 'pause-circle-outline' : 'play-circle-outline'} size={40} color="white" />
        <Text style={styles.startButtonText}>{isMeditating ? 'Pause' : 'Start Meditation'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00897b',
    marginBottom: 20,
    textAlign: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  stepText: {
    fontSize: 18,
    fontFamily: 'Georgia',
    color: '#444',
    textAlign: 'center',
    lineHeight: 26,
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
  activeDot: { backgroundColor: '#00796b' },
  inactiveDot: { backgroundColor: '#ccc' },
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
    fontFamily: 'Georgia',
  },
});

export default BodyScanMeditationScreen;
