/* eslint-disable max-lines-per-function */

import { Image, ImageBackground } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

const GameLoader = () => {
  const { width, height } = useWindowDimensions();
  const resSize = (percentage: number) =>
    (percentage / 100) * Math.min(width, height);

  // Progress bar animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = () => {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => loopAnimation());
    };

    loopAnimation();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black overlay
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height,
      zIndex: 20,
    },
    loader: {
      width: resSize(55), // Adjust size as needed
      height: resSize(25), // Adjust size as needed
    },
    progressBarContainer: {
      width: resSize(50),
      height: resSize(2),
      backgroundColor: '#fff',
      borderRadius: resSize(5),
      overflow: 'hidden',
      marginTop: resSize(3),
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#F49F2D', // Yellow theme
    },
  });

  return (
    <ImageBackground
      source={require('../../assets/game-loader-bg.png')} // Replace with your background image path
      style={styles.overlay}
      resizeMode="cover"
    >
      <Image source={require('../../assets/logo.gif')} style={styles.loader} />
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
    </ImageBackground>
  );
};

export default GameLoader;
