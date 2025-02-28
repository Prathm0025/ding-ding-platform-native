import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Loader = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000, // 1-second rotation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.loader, { transform: [{ rotate: spin }] }]} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loader: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderTopColor: '#F69E04', // Spinning part
    borderRightColor: '#F69E04',
    borderBottomColor: '#000', // Invisible bottom
    borderLeftColor: '#000',
  },
});
