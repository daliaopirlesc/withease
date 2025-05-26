import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = () => {
  const [progress, setProgress] = useState(null);
  const [stressHistory, setStressHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const [progressRes, stressRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/users/me/progress`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/users/me/stress-history`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const progressData = await progressRes.json();
        const stressData = await stressRes.json();
        setProgress(progressData);
        setStressHistory(stressData.reverse());
      } catch (err) {
        console.error('Error fetching progress data:', err);
      }
    };
    fetchData();
  }, []);

  if (!progress || stressHistory.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading progress...</Text>
      </View>
    );
  }

  const chartData = {
    labels: stressHistory.map(entry => entry.date.slice(5)),
    datasets: [
      {
        data: stressHistory.map(entry => Math.round((entry.score / 20) * 100)),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Progress</Text>

      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Stress Level Over Time</Text>
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: '#E6F4EA',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
            labelColor: () => '#555',
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#00796b',
            },
          }}
          bezier
          style={{ borderRadius: 10, marginTop: 10 }}
        />
        <Text style={styles.chartFooter}>Look how far you've come. Every step matters.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Mood Tracking</Text>
        <Text style={styles.text}>Mood logs: {progress.moodLogs}</Text>
        <Text style={styles.text}>Most common mood: {progress.commonMood}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Stress Assessments</Text>
        <Text style={styles.text}>Assessments completed: {progress.stressAssessments}</Text>
        <Text style={styles.text}>Last score: {Math.round((progress.lastStressScore / 20) * 100)}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Meditation</Text>
        <Text style={styles.text}>Sessions: {progress.meditationSessions}</Text>
        <Text style={styles.text}>Total minutes: {progress.totalMeditationMinutes}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Journaling</Text>
        <Text style={styles.text}>Gratitude entries: {progress.gratitudeJournals}</Text>
        <Text style={styles.text}>Stress entries: {progress.stressJournals}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Reminders</Text>
        <Text style={styles.text}>Active: {progress.activeReminders}</Text>
        <Text style={styles.text}>Completed: {progress.completedReminders}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: '#E6F4EA',
  },
  header: {
    fontSize: 28,
    paddingTop: 40,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  chartFooter: {
    marginTop: 12,
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProgressScreen;
