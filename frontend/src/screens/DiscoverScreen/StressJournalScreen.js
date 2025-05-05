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

const StressJournalScreen = ({ navigation }) => {
  const [journalEntries, setJournalEntries] = useState({
    stressCause: '',
    handlingMethod: '',
    futureStrategy: '',
    positiveDespiteStress: '',
  });

  const handleSave = async () => {
    const fullEntry = `
      Stress Cause: ${journalEntries.stressCause}
      Handling Method: ${journalEntries.handlingMethod}
      Future Strategy: ${journalEntries.futureStrategy}
      Positive Despite Stress: ${journalEntries.positiveDespiteStress}
    `;

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('You are not logged in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/stress-journal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ entry: fullEntry }),
      });

      if (response.ok) {
        alert('Stress Journal saved!');
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
        <Text style={styles.journalTitle}>Stress Journal 😌</Text>
        <View style={styles.sectionContainer}>
          <View style={styles.timeHeader}>
            <Text style={styles.dateText}>Today: {new Date().toLocaleDateString()}</Text>
          </View>

          <Text style={styles.heading}>What caused you the most stress today?</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={journalEntries.stressCause}
            onChangeText={(text) => setJournalEntries({ ...journalEntries, stressCause: text })}
            multiline
          />

          <Text style={styles.heading}>How did you handle that stressful situation?</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={journalEntries.handlingMethod}
            onChangeText={(text) => setJournalEntries({ ...journalEntries, handlingMethod: text })}
            multiline
          />

          <Text style={styles.heading}>What could you do differently next time?</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={journalEntries.futureStrategy}
            onChangeText={(text) => setJournalEntries({ ...journalEntries, futureStrategy: text })}
            multiline
          />

          <Text style={styles.heading}>What positive thing happened today despite the stress?</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={journalEntries.positiveDespiteStress}
            onChangeText={(text) => setJournalEntries({ ...journalEntries, positiveDespiteStress: text })}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('StressHistory')}>
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

export default StressJournalScreen;
