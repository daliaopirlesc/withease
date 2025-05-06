import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const { width } = Dimensions.get('window');

const getColorForCause = (cause) => {
  const colors = {
    Work: '#00796b',
    School: '#ffa726',
    Relationship: '#fb8c00',
    Family: '#f06292',
    Health: '#4dd0e1',
  };
  return colors[cause] || '#ccc';
};

const InsightsScreen = ({ navigation }) => {
  const [moodData, setMoodData] = useState([]);
  const [dailyStreak, setDailyStreak] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE_URL}/api/mood-log`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (response.ok) setMoodData(result);
      } catch (err) {
        console.error('Error fetching mood data:', err);
      }
    };
    fetchData();
  }, []);

  const groupedByDate = moodData.reduce((acc, entry) => {
    const date = entry.timestamp.split('T')[0];
    acc[date] = acc[date] || [];
    acc[date].push(entry);
    return acc;
  }, {});

  const labels = Object.keys(groupedByDate).slice(-7);
  const stressValues = labels.map(date => {
    const entries = groupedByDate[date];
    const avg = entries.reduce((sum, e) => sum + (e.stressLevel || 0), 0) / entries.length;
    return avg;
  });

  const moodFrequency = {};
  const causeCounts = {};
  const moodDates = new Set();

  moodData.forEach(({ mood, cause, timestamp }) => {
    moodFrequency[mood] = (moodFrequency[mood] || 0) + 1;
    causeCounts[cause] = (causeCounts[cause] || 0) + 1;
    moodDates.add(timestamp.split('T')[0]);
  });

  const pieChartData = Object.entries(causeCounts).map(([cause, count]) => ({
    name: cause,
    population: count,
    color: getColorForCause(cause),
    legendFontColor: '#555',
    legendFontSize: 12,
  }));

  useEffect(() => {
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      if (moodDates.has(dateStr)) streak++;
      else break;
    }
    setDailyStreak(streak);
  }, [moodData]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Mood Insights</Text>

      <Text style={styles.sectionTitle}>Stress Over Time</Text>
      {stressValues.length > 0 ? (
        <LineChart
          data={{
            labels,
            datasets: [{ data: stressValues }],
          }}
          width={width - 40}
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noDataText}>No data available for this range.</Text>
      )}

      <Text style={styles.sectionTitle}>Mood Frequencies</Text>
      <BarChart
        data={{
          labels: Object.keys(moodFrequency),
          datasets: [{ data: Object.values(moodFrequency) }],
        }}
        width={width - 40}
        height={200}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.sectionTitle}>Top Triggers</Text>
      <PieChart
        data={pieChartData}
        width={width - 40}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        style={styles.chart}
      />

      <Text style={styles.sectionTitle}>Daily Streak</Text>
      <Text style={styles.streakText}>
        You’ve logged moods for {dailyStreak} consecutive days.
      </Text>

      <TouchableOpacity
        style={styles.insightButton}
        onPress={() => navigation.navigate('WeeklyInsight')}
      >
        <Text style={styles.insightButtonText}>See Weekly Summary</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#e6f7f7',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6F4EA',
  },
  title: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  streakText: {
    fontSize: 16,
    color: '#00796b',
    textAlign: 'center',
    marginVertical: 20,
  },
  insightButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  insightButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InsightsScreen;
