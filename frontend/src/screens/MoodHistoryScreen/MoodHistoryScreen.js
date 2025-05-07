import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';


const MoodHistoryScreen = () => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/mood-log`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setMoods(data);
        } else {
          console.warn('Failed to fetch mood history');
        }
      } catch (error) {
        console.error('Error fetching mood history:', error);
      }
    };

    fetchMoodHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.mood}>{item.mood}</Text>
      <Text style={styles.detail}>Stress Level: {item.stressLevel || '-'}</Text>
      <Text style={styles.detail}>Cause: {item.cause || '-'}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      {item.notes && <Text style={styles.notes}>Notes: {item.notes}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood History</Text>
      <FlatList
        data={moods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 100,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  mood: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  notes: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#444',
  },
});

export default MoodHistoryScreen;
