import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const { width } = Dimensions.get('window');

const LogMoodScreen = ({ navigation }) => {
  const [stressLevel, setStressLevel] = useState(5);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedCause, setSelectedCause] = useState(null);
  const [customCause, setCustomCause] = useState('');
  const [notes, setNotes] = useState('');

  const moods = [
    { id: '1', emoji: '😀', label: 'Happy' },
    { id: '2', emoji: '😊', label: 'Calm' },
    { id: '3', emoji: '😐', label: 'Neutral' },
    { id: '4', emoji: '😟', label: 'Anxious' },
    { id: '5', emoji: '😢', label: 'Sad' },
    { id: '6', emoji: '😠', label: 'Angry' },
    { id: '7', emoji: '😰', label: 'Stressed' },
    { id: '8', emoji: '🥱', label: 'Tired' },
    { id: '9', emoji: '🤔', label: 'Confused' },
    { id: '10', emoji: '😄', label: 'Excited' },
  ];

  const causes = [
    { id: '1', label: 'Work' },
    { id: '2', label: 'School' },
    { id: '3', label: 'Relationship' },
    { id: '4', label: 'Family' },
    { id: '5', label: 'Health' },
    { id: '6', label: 'Other' },
  ];

  const onSavePressed = async () => {
    if (!selectedMood || !selectedCause) {
      alert('Please complete all fields before saving.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const cause = selectedCause === '6' ? customCause : causes.find((c) => c.id === selectedCause).label;
    const mood = moods.find((m) => m.id === selectedMood).label;

    const moodLog = { mood, stressLevel, cause, notes };

    try {
      const response = await fetch(`${API_BASE_URL}/api/mood-log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(moodLog),
      });

      if (response.ok) {
        alert('Mood saved!');
        navigation.goBack();
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      alert('Error connecting to server.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log Your Mood</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Stress Level: {stressLevel}</Text>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Feeling at peace</Text>
          <Text style={styles.sliderLabel}>The storm will pass</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={stressLevel}
          onValueChange={(value) => setStressLevel(value)}
          minimumTrackTintColor="#00796b"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#00796b"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>How are you feeling?</Text>
        <View style={styles.moodSelector}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[styles.moodButton, selectedMood === mood.id && styles.selected]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodText}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>What made you feel this way?</Text>
        <View style={styles.causeSelector}>
          {causes.map((cause) => (
            <TouchableOpacity
              key={cause.id}
              style={[styles.causeButton, selectedCause === cause.id && styles.selected]}
              onPress={() => setSelectedCause(cause.id)}
            >
              <Text style={styles.causeText}>{cause.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedCause === '6' && (
          <TextInput
            style={styles.input}
            placeholder="Please specify"
            value={customCause}
            onChangeText={setCustomCause}
            multiline
          />
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={onSavePressed}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F4EA',
    padding: 20,
    paddingBottom: 20,
    paddingTop: 40
  },
  title: {
    fontSize: 32,
    color: '#00796b',
    fontFamily: 'DMSerifDisplay-Regular',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
    fontFamily: 'DMSerifDisplay-Regular',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
    color: '#555',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  moodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: 70,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  moodEmoji: {
    fontSize: 36,
  },
  moodText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  selected: {
    borderColor: '#00796b',
    backgroundColor: '#e6f7f7',
  },
  causeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  causeButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  causeText: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#00796b',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'DMSerifDisplay-Regular',
  },
});

export default LogMoodScreen;
