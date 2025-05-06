import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const WeeklyInsightScreen = ({ navigation }) => {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(true);
  const [suggestedAction, setSuggestedAction] = useState(null);
  const [suggestedScreen, setSuggestedScreen] = useState(null);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/insights`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setInsight(data.insight);
  
        const suggestion = generateSuggestion(data.insight);
        setSuggestedAction(suggestion.action);
        setSuggestedScreen(suggestion.screen);
      } catch (error) {
        setInsight('Failed to load insights.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchInsight();
  }, []);

  const generateSuggestion = (insight) => {
    const lower = insight.toLowerCase();
  
    if (lower.includes('stressed') || lower.includes('anxious') || lower.includes('angry')) {
      return { action: 'Try a Calm Break Meditation', screen: 'CalmBreak' };
    }
  
    if (lower.includes('sad') || lower.includes('tired')) {
      return { action: 'Boost positivity with Gratitude Journal', screen: 'GratitudeJournal' };
    }
  
    if (lower.includes('confused') || lower.includes('neutral')) {
      return { action: 'Do a Mindful Check-In', screen: 'MindfulCheckIn' };
    }
  
    if (lower.includes('happy') || lower.includes('excited') || lower.includes('calm')) {
      return { action: 'Keep it up with a Guided Meditation', screen: 'GuidedMeditation' };
    }
  
    if (lower.includes('work') || lower.includes('school')) {
      return { action: 'Start a Productivity Challenge', screen: 'MotivationalChallenges' };
    }
  
    if (lower.includes('relationship') || lower.includes('family')) {
      return { action: 'Reflect with the Stress Journal', screen: 'StressJournal' };
    }
  
    if (lower.includes('health')) {
      return { action: 'Try a Body Scan Meditation', screen: 'BodyScanMeditation' };
    }
  
    return { action: 'Log your next mood to keep the streak!', screen: 'LogMood' };
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Insight</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00796b" />
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.insightText}>{insight}</Text>
          </View>

          {suggestedAction && (
            <View style={styles.suggestionBox}>
              <Text style={styles.suggestionTitle}>Suggested for you:</Text>
              <TouchableOpacity
                style={styles.suggestionButton}
                onPress={() => navigation.navigate(suggestedScreen)}
              >
                <Text style={styles.suggestionText}>{suggestedAction}</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E6F4EA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  insightText: {
    fontSize: 18,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  suggestionBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
    textAlign: 'center',
  },
  suggestionButton: {
    backgroundColor: '#00796b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  suggestionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeeklyInsightScreen;
