import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from 'react-native-progress/Bar';

const ProductivityPlannerScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);
  const [streak, setStreak] = useState(0);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const newCompletedTasks = updatedTasks.filter((task) => task.completed).length;
    setCompletedTasks(newCompletedTasks);

    if (newCompletedTasks === tasks.length) {
      setStreak(streak + 1);
    }
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
    setCompletedTasks(0);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/notebook_background.png')}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.header}>📒 Productivity Planner</Text>

          <View style={styles.taskInputContainer}>
            <TextInput
              style={styles.taskInput}
              placeholder="Write a task here..."
              placeholderTextColor="#aaa"
              value={taskInput}
              onChangeText={setTaskInput}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Icon name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.taskItem, item.completed && styles.completedTask]}
                onPress={() => toggleTaskCompletion(item.id)}
              >
                <Text style={[styles.taskText, item.completed && styles.completedText]}>
                  {item.text}
                </Text>
                <Icon
                  name={item.completed ? 'check-circle' : 'checkbox-blank-circle-outline'}
                  size={24}
                  color={item.completed ? '#00796b' : '#aaa'}
                />
              </TouchableOpacity>
            )}
          />

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Completed {completedTasks}/{tasks.length} tasks
            </Text>
            <ProgressBar
              progress={tasks.length > 0 ? completedTasks / tasks.length : 0}
              width={200}
              color="#00796b"
            />
          </View>
          <Text style={styles.streakText}>🔥 Streak: {streak} days</Text>

          <TouchableOpacity
            style={styles.focusButton}
            onPress={() => navigation.navigate('FocusBooster')}
          >
            <Icon name="timer-outline" size={24} color="#fff" />
            <Text style={styles.focusButtonText}>Start Focus Session</Text>
          </TouchableOpacity>

          {completedTasks > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearCompletedTasks}>
              <Text style={styles.clearButtonText}>Clear Completed Tasks</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  sectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  header: {
    fontSize: 26,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 15,
  },
  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    fontFamily: 'Caveat',
  },
  addButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  completedTask: {
    backgroundColor: '#d9f7e6',
  },
  taskText: {
    fontSize: 16,
    fontFamily: 'Caveat',
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'Caveat',
    marginBottom: 5,
  },
  streakText: {
    fontSize: 18,
    fontFamily: 'Caveat',
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 10,
  },
  focusButton: {
    flexDirection: 'row',
    backgroundColor: '#00796b',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  focusButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Caveat',
    marginLeft: 10,
  },
  clearButton: {
    backgroundColor: '#ff5252',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Caveat',
  },
});

export default ProductivityPlannerScreen;
