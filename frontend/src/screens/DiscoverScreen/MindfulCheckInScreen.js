import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../config/config';

const MindfulCheckInScreen = () => {
  const [step, setStep] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [feelings, setFeelings] = useState({
    Happy: 0,
    Content: 0,
    Alert: 0,
    Stressed: 0,
    Anxious: 0,
  });
  const [moodFactors, setMoodFactors] = useState([]);
  const [reflection, setReflection] = useState('');
  const navigation = useNavigation();

  const fadeTransition = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  const nextStep = () => {
    if (step < 4) {
      fadeTransition();
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      fadeTransition();
      setStep(step - 1);
    }
  };

  const handleMoodFactorSelect = (factor) => {
    setMoodFactors((prev) =>
      prev.includes(factor) ? prev.filter((item) => item !== factor) : [...prev, factor]
    );
  };

  const completeCheckIn = async () => {
    fadeTransition();
    setStep(5);
    const token = await AsyncStorage.getItem('token');
    await fetch(`${API_BASE_URL}/api/meditation-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        meditationTitle: 'Mindful Check-In',
        duration: 15,
      }),
    });
  };

  useEffect(() => {
    if (step === 5) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Home');
      });
    }
  }, [step]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>How Are You Feeling?</Text>
            {Object.keys(feelings).map((feeling) => (
              <View key={feeling} style={styles.feelingRow}>
                <Text style={styles.feelingText}>{feeling}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={10}
                  step={1}
                  minimumTrackTintColor="#00796b"
                  maximumTrackTintColor="#ccc"
                  thumbTintColor="#00796b"
                  value={feelings[feeling]}
                  onValueChange={(value) => setFeelings({ ...feelings, [feeling]: value })}
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderText}>Not at all</Text>
                  <Text style={styles.sliderText}>Extremely</Text>
                </View>
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.skipButton} onPress={nextStep}>
                <Text style={styles.buttonText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>What is Affecting Your Mood?</Text>
            {['Work/Studies', 'Relationships', 'Health', 'Finances', 'Personal Growth', 'Other'].map((factor) => (
              <TouchableOpacity
                key={factor}
                style={[
                  styles.moodFactorButton,
                  moodFactors.includes(factor) && styles.moodFactorSelected,
                ]}
                onPress={() => handleMoodFactorSelect(factor)}
              >
                <Text style={styles.moodFactorText}>{factor}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Write a Quick Reflection</Text>
            <TextInput
              style={styles.input}
              placeholder="Write about your thoughts..."
              placeholderTextColor="#aaa"
              value={reflection}
              onChangeText={setReflection}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={completeCheckIn}>
                <Text style={styles.buttonText}>Complete Check-In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 5 && (
          <Animated.View style={[styles.finalMessageContainer, { opacity: fadeAnim }]}>
            <Text style={styles.finalMessageBig}>
              “You’ve done something kind for yourself today.”
            </Text>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    padding: 20,
    justifyContent: 'center',
  },
  stepContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 25,
    textAlign: 'center',
  },
  feelingRow: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  feelingText: {
    fontSize: 18,
    fontFamily: 'Caveat',
    color: '#444',
  },
  slider: {
    width: '100%',
    marginTop: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sliderText: {
    fontSize: 12,
    fontFamily: 'Caveat',
    color: '#555',
  },
  moodFactorButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    elevation: 2,
  },
  moodFactorSelected: {
    backgroundColor: '#B2DFDB',
  },
  moodFactorText: {
    fontSize: 16,
    fontFamily: 'Caveat',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Caveat',
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  nextButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  skipButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Caveat',
    fontSize: 16,
  },
  finalMessageContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  finalMessageBig: {
    fontSize: 26,
    fontFamily: 'Caveat',
    color: '#00796b',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 50,
    lineHeight: 34,
  },
});

export default MindfulCheckInScreen;
