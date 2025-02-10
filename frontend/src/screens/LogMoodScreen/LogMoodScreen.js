import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';

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

  const onSavePressed = () => {
    if (!selectedMood || !selectedCause) {
      alert('Please complete all fields before saving.');
      return;
    }

    const cause = selectedCause === '6' ? customCause : causes.find((c) => c.id === selectedCause).label;

    const moodLog = {
      stressLevel,
      mood: moods.find((mood) => mood.id === selectedMood).label,
      cause,
      notes,
    };

    console.log('Mood Log:', moodLog);

    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Log Your Mood</Text>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stress Level: {stressLevel}</Text>
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

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <View style={styles.moodSelector}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodButton,
                selectedMood === mood.id ? styles.moodButtonSelected : null,
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What made you feel this way?</Text>
        <View style={styles.causeSelector}>
          {causes.map((cause) => (
            <TouchableOpacity
              key={cause.id}
              style={[
                styles.causeButton,
                selectedCause === cause.id ? styles.causeButtonSelected : null,
              ]}
              onPress={() => setSelectedCause(cause.id)}
            >
              <Text style={styles.causeLabel}>{cause.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedCause === '6' && (
          <TextInput
            style={styles.textBox}
            placeholder="Please specify"
            value={customCause}
            onChangeText={setCustomCause}
          />
        )}
      </View>

      
      <TouchableOpacity style={styles.saveButton} onPress={onSavePressed}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f7',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 35,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
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
  moodButtonSelected: {
    borderColor: '#00796b',
    backgroundColor: '#e6f7f7',
  },
  moodEmoji: {
    fontSize: 40, 
  },
  moodLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  causeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  causeButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  causeButtonSelected: {
    borderColor: '#00796b',
    backgroundColor: '#e6f7f7',
  },
  causeLabel: {
    fontSize: 14,
    color: '#555',
  },
  textBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#00796b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LogMoodScreen;
