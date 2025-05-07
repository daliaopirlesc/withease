import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const NEGATIVE_WORDS = [  'stress', 'anxious', 'overwhelmed', 'worried', 'panic',
  'fear', 'sad', 'angry', 'guilt', 'tired',
  'helpless', 'frustrated', 'insecure', 'lonely', 'upset',
  'worthless', 'moody', 'burnout', 'shame', 'restless'];
const POSITIVE_WORDS = [ 'calm', 'peaceful', 'grateful', 'confident', 'strong',
  'hopeful', 'energized', 'joyful', 'relaxed', 'brave',
  'motivated', 'balanced', 'loved', 'mindful', 'safe',
  'resilient', 'serene', 'cheerful', 'stable', 'focused'];

const getRandomWord = () => {
  const isNegative = Math.random() < 0.6; 
  const wordList = isNegative ? NEGATIVE_WORDS : POSITIVE_WORDS;
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  return { word, isNegative };
};

const BubblePopGameScreen = ({ navigation }) => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const bubbleIdRef = useRef(0);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      const newBubble = {
        id: bubbleIdRef.current++,
        ...getRandomWord(),
        left: Math.random() * (width - 80),
        anim: new Animated.Value(height),
      };
      setBubbles((prev) => [...prev, newBubble]);

      Animated.timing(newBubble.anim, {
        toValue: -100,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    }, 1000);

    const gameTimer = setTimeout(() => {
      clearInterval(gameInterval);
      setGameOver(true);
    }, 60000);

    return () => {
      clearInterval(gameInterval);
      clearTimeout(gameTimer);
    };
  }, []);

  const handlePop = (bubbleId, isNegative) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
    setScore((prev) => prev + (isNegative ? 1 : -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Pop negative thoughts!</Text>

      {!gameOver && bubbles.map((bubble) => (
        <Animated.View
          key={bubble.id}
          style={[
            styles.bubble,
            {
              left: bubble.left,
              transform: [{ translateY: bubble.anim }],
              backgroundColor: bubble.isNegative ? '#ef5350' : '#81c784',
            },
          ]}
        >
          <TouchableOpacity onPress={() => handlePop(bubble.id, bubble.isNegative)}>
            <Text style={styles.bubbleText}>{bubble.word}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {gameOver && (
        <View style={styles.resultBox}>
          <Text style={styles.scoreText}>🎉 You cleared {score} negative thoughts!</Text>
          <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('MotivationalChallenges')}
>
  <Text style={styles.buttonText}>Back</Text>
</TouchableOpacity>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F2F1', paddingTop: 60 },
  timerText: { fontSize: 32,
    color: '#00796b',
    fontFamily: 'DMSerifDisplay-Regular',
    textAlign: 'center', marginBottom: 10 },
  bubble: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    zIndex: 2,
  },
  bubbleText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  resultBox: {
    position: 'absolute',
    top: height / 3,
    left: 40,
    right: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  scoreText: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default BubblePopGameScreen;
