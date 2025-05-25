import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const questions = [
  'In the last week, how often have you felt unable to control important things in your life?',
  'In the last week, how often have you felt confident about your ability to handle personal problems?',
  'In the last week, how often have you felt that things were going your way?',
  'In the last week, how often have you felt difficulties were piling up so high you could not overcome them?',
  'In the last week, how often have you felt nervous or stressed?'
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Almost Never', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Fairly Often', value: 3 },
  { label: 'Very Often', value: 4 }
];

const StressAssessmentScreen = ({ navigation }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleSelect = (questionIndex, value) => {
    const updated = [...answers];
    updated[questionIndex] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert('Please answer all questions.');
      return;
    }

    const score = answers.reduce((a, b) => a + b, 0);
    const token = await AsyncStorage.getItem('token');

    try {
      await fetch(`${API_BASE_URL}/api/stress-assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
      });

      navigation.replace('GoalsSetup');
    } catch (error) {
      alert('An error occurred while saving your assessment.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Stress Level Assessment</Text>

      {questions.map((q, idx) => (
        <View key={idx} style={styles.questionBlock}>
          <Text style={styles.questionText}>{q}</Text>
          <View style={styles.optionsRow}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.label}
                style={[
                  styles.optionButton,
                  answers[idx] === opt.value && styles.selectedOption
                ]}
                onPress={() => handleSelect(idx, opt.value)}
              >
                <Text style={styles.optionText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    backgroundColor: '#E6F4EA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    paddingTop: 40,
    marginBottom: 20,
  },
  questionBlock: {
    marginBottom: 25,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00796b',
    marginVertical: 5,
    width: '48%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: '#00796b',
  },
  optionText: {
    color: '#00796b',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#00796b',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default StressAssessmentScreen;
