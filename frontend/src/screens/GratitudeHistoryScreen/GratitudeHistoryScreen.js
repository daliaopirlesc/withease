import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const GratitudeHistoryScreen = ({ navigation }) => {
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
          setEntries(data);
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

  if (loading)
    return <ActivityIndicator size="large" color="#00796b" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Gratitude Journal</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F4EA', paddingTop: 60, paddingHorizontal: 20 },
  title: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 20,
    textAlign: 'center',
  },
  entryContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  date: { fontSize: 12, color: '#777', marginBottom: 8 },
  text: { fontSize: 16, color: '#333' },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GratitudeHistoryScreen;
