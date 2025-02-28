import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, useWindowDimensions, Animated, Pressable } from 'react-native';

const GameCard = () => {
  const { width, height } = useWindowDimensions(); // Get screen dimensions dynamically

  // 🔹 Helper functions for responsive scaling
  const resWidth = (percentage: number) => (percentage / 100) * width;
  const resHeight = (percentage: number) => (percentage / 100) * height;
  const resSize = (percentage: number) => (percentage / 100) * Math.min(width, height);

  const scaleAnim = useState(new Animated.Value(1))[0]; // Animated value for scale

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95, // Scale down to 95%
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1, // Scale back to normal
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.cardContainer,
          {
            width: resWidth(18),
            height: resHeight(53),
            borderRadius: resSize(5),
            borderWidth: resSize(0.4),
            padding: resSize(.5),
            shadowRadius: resSize(1.8),
            shadowOffset: { width: resSize(0.4), height: resSize(0.8) },
            marginHorizontal: resSize(1.5),
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Background Image */}
        <ImageBackground
          source={require('../assets/images/game.png')}
          style={styles.background}
          imageStyle={{ borderRadius: resSize(4) }}
        />
      </Animated.View>
    </Pressable>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    backgroundColor: '#ff0000',
    borderColor: '#FFD700', // Solid yellow border
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
