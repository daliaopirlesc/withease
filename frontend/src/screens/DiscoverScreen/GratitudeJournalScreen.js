import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const GratitudeJournalScreen = ({ navigation }) => {
  const [morningGratitude, setMorningGratitude] = useState({ gratitude: '', makeTodayGreat: '', affirmation: '' });
  const [eveningReflection, setEveningReflection] = useState({ highlights: '', amazingThings: '', tomorrowGoal: '' });

  const handleSave = async () => {
    const fullEntry = `
      Today I am grateful for: ${morningGratitude.gratitude}
      The way to make today great: ${morningGratitude.makeTodayGreat}
      Positive self affirmation: ${morningGratitude.affirmation}
      Highlights of the day: ${eveningReflection.highlights}
      Amazing things that happened today: ${eveningReflection.amazingThings}
      Tomorrow I am going to: ${eveningReflection.tomorrowGoal}
    `;
  
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('You are not logged in.');
        return;
      }
  
      const response = await fetch(`${API_BASE_URL}/api/gratitude-journal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ entry: fullEntry }),
      });
  
      if (response.ok) {
        alert('Journal saved!');
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save journal.');
    }
  };
  
  return (
    <ImageBackground source={require('../../../assets/images/notebook_background.png')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.journalTitle}>Gratitude Journal 📖</Text>

        <View style={styles.sectionContainer}>
          <View style={styles.timeHeader}>
            <Text style={styles.dateText}>Today: {new Date().toLocaleDateString()}</Text>
            <Text style={styles.sunIcon}>☀️</Text>
          </View>

          <Text style={styles.heading}>Today I am grateful for:</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={morningGratitude.gratitude}
            onChangeText={(text) => setMorningGratitude({ ...morningGratitude, gratitude: text })}
            multiline
          />

          <Text style={styles.heading}>The way to make today great:</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={morningGratitude.makeTodayGreat}
            onChangeText={(text) => setMorningGratitude({ ...morningGratitude, makeTodayGreat: text })}
            multiline
          />

          <Text style={styles.heading}>Positive self affirmation: I am...</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={morningGratitude.affirmation}
            onChangeText={(text) => setMorningGratitude({ ...morningGratitude, affirmation: text })}
            multiline
          />
        </View>

        <View style={[styles.sectionContainer, styles.tornPaper]}>
          <View style={styles.timeHeader}>
            <Text style={styles.moonIcon}>🌙</Text>
          </View>

          <Text style={styles.heading}>Highlights of the day:</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={eveningReflection.highlights}
            onChangeText={(text) => setEveningReflection({ ...eveningReflection, highlights: text })}
            multiline
          />

          <Text style={styles.heading}>Amazing things that happened today:</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={eveningReflection.amazingThings}
            onChangeText={(text) => setEveningReflection({ ...eveningReflection, amazingThings: text })}
            multiline
          />

          <Text style={styles.heading}>Tomorrow I am going to...</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={eveningReflection.tomorrowGoal}
            onChangeText={(text) => setEveningReflection({ ...eveningReflection, tomorrowGoal: text })}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('GratitudeHistory')}>
          <Text style={styles.historyLink}>View Past Entries</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, resizeMode: 'cover' },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  journalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Caveat',
    textAlign: 'center',
    marginBottom: 10,
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
  timeHeader: { alignItems: 'center', marginBottom: 10 },
  dateText: { fontSize: 18, fontFamily: 'Caveat', color: '#4A4A4A' },
  sunIcon: { fontSize: 30, color: '#F9A825', marginTop: 5 },
  moonIcon: { fontSize: 30, color: '#01579B' },
  heading: {
    fontSize: 18,
    color: '#444',
    marginTop: 15,
    fontStyle: 'italic',
    fontFamily: 'Caveat',
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
  tornPaper: {
    borderTopWidth: 6,
    borderTopColor: '#f4e1c1',
    borderStyle: 'dashed',
  },
  saveButton: {
    backgroundColor: '#F4B400',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '80%',
    elevation: 3,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Caveat',
  },
  historyLink: {
    fontSize: 16,
    color: '#00796b',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: 'Caveat',
  },
});

export default GratitudeJournalScreen;
