import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

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

const InsightsScreen = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [dailyStreak, setDailyStreak] = useState(0);

  const stressData = {
    week: [3, 5, 4, 6, 7, 5, 4],
    month: [5, 6, 4, 7, 5, 4, 6, 7, 8, 4, 5, 6, 7, 5, 6, 5],
    all: [3, 4, 5, 5, 6, 4, 5],
  };

  const moodFrequency = {
    happy: 5,
    calm: 3,
    sad: 2,
    anxious: 4,
  };

  const moodEntries = [
    { date: '2024-11-15', cause: 'Work' },
    { date: '2024-11-16', cause: 'School' },
    { date: '2024-11-16', cause: 'Relationship' },
    { date: '2024-11-17', cause: 'Work' },
    { date: '2024-11-17', cause: 'Work' },
  ];

  const data = stressData[timeRange] || [];
  const averageStress = data.length > 0 ? (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1) : 'N/A';

  const causeCounts = moodEntries.reduce((acc, entry) => {
    acc[entry.cause] = (acc[entry.cause] || 0) + 1;
    return acc;
  }, {});

  const totalEntries = moodEntries.length;
  const pieChartData = Object.entries(causeCounts).map(([cause, count]) => ({
    name: cause,
    population: count,
    color: getColorForCause(cause),
    legendFontColor: '#555',
    legendFontSize: 12,
  }));

  useEffect(() => {
    const uniqueDates = [...new Set(moodEntries.map((entry) => entry.date))];
    let streak = 0;
    let yesterday = new Date().toISOString().split('T')[0];

    for (let i = uniqueDates.length - 1; i >= 0; i--) {
      if (uniqueDates.includes(yesterday)) {
        streak++;
        yesterday = new Date(new Date(yesterday).setDate(new Date(yesterday).getDate() - 1))
          .toISOString()
          .split('T')[0];
      } else {
        break;
      }
    }
    setDailyStreak(streak);
  }, [moodEntries]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Weekly Insights</Text>

      <Text style={styles.sectionTitle}>Stress Levels</Text>
      {data.length > 0 ? (
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data }],
          }}
          width={width - 40}
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#e6f7f7',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
          }}
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
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#e6f7f7',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
        }}
        style={styles.chart}
      />

    
      <Text style={styles.sectionTitle}>Top Causes of Stress</Text>
      <PieChart
        data={pieChartData}
        width={width - 40}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        style={styles.chart}
      />


      <Text style={styles.sectionTitle}>Daily Streak</Text>
      <Text style={styles.streakText}>
        You’ve logged entries for {dailyStreak} consecutive days.
      </Text>


      <View style={styles.summary}>
        <Text>Average Stress Level: {averageStress}/10</Text>
        <Text>Number of Entries: {totalEntries}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796b',
    paddingTop: 35,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b', 
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  streakText: {
    fontSize: 16,
    color: '#00796b',
    marginBottom: 20,
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default InsightsScreen;
