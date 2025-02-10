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

const GratitudeJournalScreen = () => {
  const [morningGratitude, setMorningGratitude] = useState({ gratitude: '', makeTodayGreat: '', affirmation: '' });
  const [eveningReflection, setEveningReflection] = useState({ highlights: '', amazingThings: '', tomorrowGoal: '' });

  const handleSave = () => {
    alert('Journal saved!');
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

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Journal</Text>
        </TouchableOpacity>
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
  timeHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'Caveat',
    color: '#4A4A4A',
  },
  sunIcon: {
    fontSize: 30,
    color: '#F9A825',
    marginTop: 5,
  },
  moonIcon: {
    fontSize: 30,
    color: '#01579B',
  },
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
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Caveat',
  },
});

export default GratitudeJournalScreen;
