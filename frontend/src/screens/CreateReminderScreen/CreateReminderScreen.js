import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import { API_BASE_URL } from '../../config/config';

const CreateReminderScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(new Date());
  const [repeatInterval, setRepeatInterval] = useState('DAILY');
  const [showPicker, setShowPicker] = useState(false);

  const onSave = async () => {
    const token = await AsyncStorage.getItem('token');
    const isoTime = time.toISOString();

    const response = await fetch(`${API_BASE_URL}/api/reminders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        time: isoTime,
        repeatInterval,
        active: true,
      }),
    });

    if (response.ok) {
      await scheduleNotification();
      navigation.navigate('Reminders');
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.warn('Server response:', errorData);
      alert('Error saving reminder');
    }
  };

  const scheduleNotification = async () => {
    let repeatType = null;

    if (repeatInterval === 'DAILY') repeatType = 'day';
    else if (repeatInterval === 'WEEKLY') repeatType = 'week';
    else if (repeatInterval === 'MONTHLY') repeatType = 'month';
    else if (repeatInterval === 'YEARLY') repeatType = 'year';

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: message,
        sound: true,
      },
      trigger: {
        date: time,
        repeats: repeatInterval !== 'ONCE',
        ...(repeatType ? { repeatInterval: repeatType } : {}),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Reminder message"
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.pickerButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.pickerButtonText}>
          {`Select Time: ${time.toLocaleString()}`}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setTime(selectedDate);
          }}
        />
      )}

      <Picker
        selectedValue={repeatInterval}
        onValueChange={(itemValue) => setRepeatInterval(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Daily" value="DAILY" />
        <Picker.Item label="Weekly" value="WEEKLY" />
        <Picker.Item label="Monthly" value="MONTHLY" />
        <Picker.Item label="Yearly" value="YEARLY" />
        <Picker.Item label="Once" value="ONCE" />
      </Picker>

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Save Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#00796b',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  pickerButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#00796b',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default CreateReminderScreen;
