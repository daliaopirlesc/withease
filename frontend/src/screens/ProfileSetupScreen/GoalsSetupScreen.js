import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';
import goals from '../../data/goalsWithActivities';



const { width } = Dimensions.get('window');

// const goals = [
//   { id: '1', title: 'Reduce Anxiety', description: 'Helps you feel calmer over time.', icon: 'meditation' },
//   { id: '2', title: 'Develop Gratitude', description: 'Improves your overall positivity.', icon: 'leaf' },
//   { id: '3', title: 'Increase Happiness', description: 'Enhances your daily mood.', icon: 'emoticon-happy-outline' },
//   { id: '4', title: 'Reduce Stress', description: 'Promotes relaxation and focus.', icon: 'weather-sunny' },
//   { id: '5', title: 'Better Sleep', description: 'Improves your sleep quality.', icon: 'bed' },
//   { id: '6', title: 'Build Self Esteem', description: 'Boosts your confidence.', icon: 'account-star' },
//   { id: '7', title: 'Improve Focus', description: 'Enhances your productivity.', icon: 'eye' },
// ];

const GoalSetupScreen = ({ navigation }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const onGoalPress = (id) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(goalId => goalId !== id));
    } else {
      if (selectedGoals.length < 3) {
        setSelectedGoals([...selectedGoals, id]);
      } else {
        Alert.alert('Limit Reached', 'You can only select up to 3 goals.');
      }
    }
  };

  const onContinuePressed = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'No token found. Please sign in again.');
      return;
    }
  
    const goalTitles = selectedGoals.map(id => {
      const goal = goals.find(g => g.id === id);
      return goal?.title || '';
    });
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/me/goals`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(goalTitles),
      });
  
      if (response.ok) {
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Failed to save goals.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };
  
  

  const onExitPressed = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitButton} onPress={onExitPressed}>
        <Text style={styles.exitButtonText}>X</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          What brings you to <Text style={styles.withEase}>With Ease</Text>?
        </Text>
        <Text style={styles.subtitle}>
          This will help us recommend the right content for you.
        </Text>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.goalBox,
              selectedGoals.includes(item.id) ? styles.goalBoxSelected : null,
            ]}
            onPress={() => onGoalPress(item.id)}
          >
            <Icon
              name={item.icon}
              size={30}
              color={selectedGoals.includes(item.id) ? '#00796b' : '#555'}
              style={styles.icon}
            />
            <Text style={styles.goalTitle}>{item.title}</Text>
            <Text style={styles.goalDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.goalsList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={onContinuePressed}
        disabled={selectedGoals.length === 0}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#ccc',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
  },
  withEase: {
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    color: '#00796b',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  goalsList: {
    alignItems: 'center',
    marginVertical: 20,
  },
  goalBox: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  goalBoxSelected: {
    borderColor: '#00796b',
    backgroundColor: '#e6f7f7',
  },
  icon: {
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  goalDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: '#00796b',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    alignSelf: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GoalSetupScreen;
