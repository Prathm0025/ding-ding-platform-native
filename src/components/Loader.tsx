import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing, useWindowDimensions } from 'react-native';

const Loader = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

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

  const responsiveSize = (percentage:number) => (percentage / 100) * Math.min(width, height);

  return (
    <View style={[styles.overlay, { width, height }]}> 
      <Animated.View
        style={[
          styles.loader,
          {
            width: responsiveSize(15),
            height: responsiveSize(15),
            borderRadius: responsiveSize(7.5),
            borderWidth: responsiveSize(1.5),
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loader: {
    borderTopColor: '#F69E04', // Spinning part
    borderRightColor: '#F69E04',
    borderBottomColor: '#fff', // Invisible bottom
    borderLeftColor: '#fff',
  },
});
