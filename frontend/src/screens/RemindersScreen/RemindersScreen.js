import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../../config/config';

const RemindersScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/reminders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setReminders(data);
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const toggleReminder = async (reminder) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const updatedReminder = {
      id: reminder.id,
      message: reminder.message,
      time: reminder.time,
      repeatInterval: reminder.repeatInterval,
      active: !reminder.active,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/reminders/${reminder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedReminder),
      });

      if (response.ok) {
        fetchReminders();
      } else {
        console.warn('Failed to update reminder');
      }
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  const deleteReminder = async (id) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/reminders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchReminders();
      } else {
        console.warn('Failed to delete reminder');
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteReminder(id) },
      ]
    );
  };

  const renderReminder = ({ item }) => (
    <View style={styles.reminderBox}>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => confirmDelete(item.id)}>
        <Icon name="trash-can-outline" size={22} color="#c62828" />
      </TouchableOpacity>
      <Text style={styles.title}>{item.message}</Text>
      <Text style={styles.time}>{new Date(item.time).toLocaleString()}</Text>
      <Text style={styles.repeat}>Repeats: {item.repeatInterval}</Text>
      <View style={styles.switchRow}>
        <Text style={styles.status}>{item.active ? 'Active' : 'Inactive'}</Text>
        <Switch value={item.active} onValueChange={() => toggleReminder(item)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderReminder}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateReminder')}>
        <Text style={styles.addButtonText}>+ Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

// ... aceeași logică, doar actualizează styles și partea de listă
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 20,
    textAlign: 'center',
  },
  reminderBox: {
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
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    paddingRight: 30,
  },
  time: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  repeat: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  status: {
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#00796b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RemindersScreen;
