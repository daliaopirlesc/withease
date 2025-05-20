import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GuidedMeditationScreen = ({ navigation }) => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isGuiding, setIsGuiding] = useState(false);
  const animatedScale = useState(new Animated.Value(1))[0];

  const sessions = [
    {
      id: '1',
      title: 'Body Scan Meditation',
      duration: 10,
      description: 'Relax each part of your body mindfully.',
      screen: 'BodyScanMeditation',
    },
    {
      id: '2',
      title: 'Breath Awareness',
      duration: 5,
      description: 'Calm your mind by focusing on your breath.',
      screen: 'BreatheRelax',
    },
    {
      id: '3',
      title: 'Loving-Kindness Meditation',
      duration: 10,
      description: 'Cultivate compassion and positive emotions.',
      steps: [
        'May I be happy. May I be healthy.',
        'May you be happy. May you be healthy.',
        'May we all be safe. May we all be at peace.',
        'Send loving thoughts to someone you care about.',
        'Now to someone neutral.',
        'Now to someone difficult.',
        'May all beings be free from suffering.',
      ],
    },
    {
      id: '4',
      title: 'Mindful Awareness',
      duration: 15,
      description: 'Observe your thoughts without judgment.',
      screen: 'MindfulCheckIn',
    },
  ];

  const techniques = [
    {
      id: '5',
      title: 'Box Breathing',
      description: 'Inhale 4 sec, hold 4 sec, exhale 4 sec, hold 4 sec.',
      steps: [
        'Inhale... 2... 3... 4...',
        'Hold... 2... 3... 4...',
        'Exhale... 2... 3... 4...',
        'Hold... 2... 3... 4...',
      ],
    },
    {
      id: '6',
      title: 'Grounding Exercise',
      description: 'Name 5 things you see, hear, and feel.',
      steps: [
        'Name 5 things you can see...',
        'Name 4 things you can touch...',
        'Name 3 things you can hear...',
        'Name 2 things you can smell...',
        'Name 1 thing you can taste...',
      ],
    },
    {
      id: '7',
      title: 'Mantra Meditation',
      description: 'Silently repeat a calming word (e.g., "peace").',
      steps: [
        'Sit comfortably and close your eyes...',
        'Silently repeat: "peace"...',
        'Let your thoughts pass like clouds...',
        'Return gently to your mantra...',
      ],
    },
  ];

  useEffect(() => {
    let interval = null;
    if (isGuiding && selectedTechnique) {
      interval = setInterval(() => {
        const flow = selectedTechnique.steps || [];
        if (stepIndex < flow.length - 1) {
          setStepIndex(stepIndex + 1);
        } else {
          setIsGuiding(false);
          const saveProgress = async () => {
            const token = await AsyncStorage.getItem('token');
            await fetch(`${API_BASE_URL}/api/meditation-progress`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                meditationTitle: selectedTechnique.title,
                duration: selectedTechnique.duration || 5,
              }),
            });
          };
          saveProgress();
        }
      }, 4000);

      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedScale, {
            toValue: 1.1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedScale, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
    return () => clearInterval(interval);
  }, [isGuiding, stepIndex, selectedTechnique]);

  const openTechnique = (technique) => {
    setSelectedTechnique(technique);
    setShowModal(true);
    setStepIndex(0);
    setIsGuiding(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Guided Journey</Text>
      <Text style={styles.subHeader}>Find calm. Reconnect with yourself. Choose a path below.</Text>

      <Text style={styles.sectionTitle}>Meditation Sessions</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.meditationCard}
            onPress={() =>
              item.steps
                ? openTechnique(item)
                : navigation.navigate(item.screen)
            }
          >
            <Text style={styles.meditationTitle}>{item.title}</Text>
            <Text style={styles.meditationDescription}>{item.description}</Text>
            <Text style={styles.meditationDuration}>{item.duration} min</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Mini Techniques</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.techniquesContainer}>
        {techniques.map((technique) => (
          <TouchableOpacity key={technique.id} style={styles.techniqueBubble} onPress={() => openTechnique(technique)}>
            <Text style={styles.techniqueTitle}>{technique.title}</Text>
            <Text style={styles.techniqueDescription}>{technique.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTechnique?.title}</Text>
            <Animated.View style={[styles.breathCircle, { transform: [{ scale: animatedScale }] }]} />
            <Text style={styles.modalBody}>
              {selectedTechnique?.steps?.[stepIndex] || selectedTechnique?.description}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsGuiding(!isGuiding)}>
              <Text style={styles.modalButtonText}>{isGuiding ? 'Pause' : 'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ccc', marginTop: 10 }]} onPress={() => setShowModal(false)}>
              <Text style={[styles.modalButtonText, { color: '#333' }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontFamily: 'DMSerifDisplay-Regular',
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
    backgroundColor: 'white',
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
    paddingBottom: 50,
  },

  techniqueBubble: {
    backgroundColor: 'white',
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 22,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 10,
  },

  modalBody: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },

  modalButton: {
    backgroundColor: '#00796b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  breathCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#b2dfdb',
    marginVertical: 20,
    opacity: 0.8,
  },
});

export default GuidedMeditationScreen;
