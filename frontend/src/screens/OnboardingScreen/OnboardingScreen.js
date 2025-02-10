import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  { 
    id: '1', 
    title: 'Track your stress levels easily.', 
    description: 'Use simple daily prompts to monitor and understand your stress patterns.' 
  },
  { 
    id: '2', 
    title: 'Learn personalized techniques to relax.', 
    description: 'Get guided meditations and exercises tailored to your needs.' 
  },
  { 
    id: '3', 
    title: 'Monitor your progress over time.', 
    description: 'Visualize your stress levels and see your improvements daily.' 
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);

  const onNextPressed = () => {
    if (currentSlide < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentSlide + 1 });
    } else {
      navigation.replace('ProfileSetup'); 
    }
  };

  const onSkipPressed = () => {
    navigation.replace('ProfileSetup'); 
  };

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
     
      <View style={styles.rectangle}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        />
      </View>


      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentSlide ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onSkipPressed}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNextPressed}>
          <Text style={styles.nextButton}>
            {currentSlide === slides.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00796b',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    marginTop: 30,
  },
  skipButton: {
    fontSize: 16,
    color: '#555',
  },
  nextButton: {
    fontSize: 16,
    color: '#00796b',
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
