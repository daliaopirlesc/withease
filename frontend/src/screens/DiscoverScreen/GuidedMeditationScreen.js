import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GuidedMeditationScreen = ({ navigation }) => {
  const guidedMeditations = [
    { id: '1', title: 'Body Scan Meditation', duration: '10 min', description: 'Relax each part of your body mindfully.', screen: 'BodyScanMeditation' },
    { id: '2', title: 'Breath Awareness', duration: '5 min', description: 'Calm your mind by focusing on your breath.', screen: 'BreatheRelax' },
    { id: '3', title: 'Loving-Kindness Meditation', duration: '10 min', description: 'Cultivate compassion and positive emotions.', screen: 'LovingKindnessMeditation' },
    { id: '4', title: 'Mindful Awareness', duration: '15 min', description: 'Observe your thoughts without judgment.', screen: 'MindfulCheckIn' },
  ];

  const meditationTechniques = [
    { id: '5', title: 'Box Breathing', description: 'Inhale 4 sec, hold 4 sec, exhale 4 sec, hold 4 sec.' },
    { id: '6', title: 'Grounding Exercise', description: 'Name 5 things you see, hear, and feel.' },
    { id: '7', title: 'Mantra Meditation', description: 'Silently repeat a calming word (e.g., "peace").' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Guided Meditation</Text>
      <Text style={styles.subHeader}>Find your inner peace. Select a meditation to begin.</Text>

      <Text style={styles.sectionTitle}>Meditation Sessions</Text>
      <FlatList
        data={guidedMeditations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.meditationCard} onPress={() => navigation.navigate(item.screen)}>
            <Text style={styles.meditationTitle}>{item.title}</Text>
            <Text style={styles.meditationDescription}>{item.description}</Text>
            <Text style={styles.meditationDuration}>{item.duration}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Meditation Techniques</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.techniquesContainer}>
        {meditationTechniques.map((technique) => (
          <View key={technique.id} style={styles.techniqueBubble}>
            <Text style={styles.techniqueTitle}>{technique.title}</Text>
            <Text style={styles.techniqueDescription}>{technique.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 10,
    marginBottom: 10,
  },
  meditationCard: {
    backgroundColor: '#E6D5B8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  meditationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Caveat',
    color: '#00796b',
  },
  meditationDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  meditationDuration: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  techniquesContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingBottom: 50
  },
  techniqueBubble: {
    backgroundColor: '#E6D5B8',
    borderRadius: 80,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    alignItems: 'center',
    width: 180,
  },
  techniqueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Caveat',
    color: '#00796b',
    textAlign: 'center',
  },
  techniqueDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default GuidedMeditationScreen;
