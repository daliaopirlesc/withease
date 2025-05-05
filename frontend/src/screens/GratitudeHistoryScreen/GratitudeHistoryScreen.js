import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const GratitudeHistoryScreen = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/gratitude-journal`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setEntries(data); // e deja sortat în backend
        } else {
          console.error('Error fetching entries');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.date}>{new Date(item.timestamp).toLocaleString()}</Text>
      <Text style={styles.text}>{item.entry}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#00796b" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Gratitude Journal</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f7f7', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00796b', marginBottom: 20 },
  entryContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  date: { fontSize: 12, color: '#777', marginBottom: 5 },
  text: { fontSize: 16, color: '#333' },
});

export default GratitudeHistoryScreen;
