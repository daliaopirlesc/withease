import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';

const reflectionQuestions = [
  "What is one thing you learned about yourself today?",
  "How did you handle challenges today?",
  "What moment made you feel proud today?",
  "What’s something you want to improve on?",
  "Who or what inspired you today?",
  "What small step did you take toward your goals?",
];

const growthChallenges = [
  "Express gratitude to someone today.",
  "Spend 5 minutes in complete silence, just reflecting.",
  "Write a letter to your future self.",
  "Do one thing outside of your comfort zone today.",
  "Take a deep breath and visualize your best self.",
  "Turn a negative thought into a positive one.",
];

const ReflectAndGrowScreen = () => {
  const [reflection, setReflection] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  
  const randomQuestion = reflectionQuestions[Math.floor(Math.random() * reflectionQuestions.length)];
  const randomChallenge = growthChallenges[Math.floor(Math.random() * growthChallenges.length)];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/notebook_background.png')}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.header}>🌱 Reflect & Grow</Text>

          <Text style={styles.question}>{randomQuestion}</Text>

          <TextInput
            style={styles.input}
            placeholder="Write your thoughts here..."
            placeholderTextColor="#aaa"
            value={reflection}
            onChangeText={setReflection}
            multiline
          />

          <Text style={styles.optionTitle}>Choose an Option:</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === "I felt confident today" && styles.optionSelected,
              ]}
              onPress={() => setSelectedOption("I felt confident today")}
            >
              <Text style={styles.optionText}>I felt confident today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === "I struggled but kept going" && styles.optionSelected,
              ]}
              onPress={() => setSelectedOption("I struggled but kept going")}
            >
              <Text style={styles.optionText}>I struggled but kept going</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === "I learned something new" && styles.optionSelected,
              ]}
              onPress={() => setSelectedOption("I learned something new")}
            >
              <Text style={styles.optionText}>I learned something new</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sliderTitle}>How much have you grown this week?</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={progress}
            onValueChange={setProgress}
            minimumTrackTintColor="#00796b"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#00796b"
          />
          <Text style={styles.sliderValue}>{progress} / 10</Text>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Reflection</Text>
          </TouchableOpacity>

          {submitted && (
            <View style={styles.challengeContainer}>
              <Text style={styles.challengeTitle}>🌟 Today's Growth Challenge:</Text>
              <Text style={styles.challengeText}>{randomChallenge}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  sectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  header: {
    fontSize: 26,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontFamily: 'Caveat',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 80,
    textAlignVertical: 'top',
    fontFamily: 'Caveat',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'Caveat',
    color: '#333',
    marginTop: 15,
  },
  optionsContainer: {
    marginVertical: 10,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  optionSelected: {
    backgroundColor: '#c8e6c9',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Caveat',
    textAlign: 'center',
  },
  sliderTitle: {
    fontSize: 18,
    fontFamily: 'Caveat',
    color: '#333',
    marginTop: 15,
  },
  slider: {
    width: '90%',
    marginVertical: 10,
  },
  sliderValue: {
    fontSize: 16,
    fontFamily: 'Caveat',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#00796b',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Caveat',
  },
  challengeContainer: {
    marginTop: 20,
    backgroundColor: '#dcedc8',
    padding: 12,
    borderRadius: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontFamily: 'Caveat',
    fontWeight: 'bold',
  },
  challengeText: {
    fontSize: 16,
    fontFamily: 'Caveat',
  },
});

export default ReflectAndGrowScreen;
