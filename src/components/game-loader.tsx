import { ImageBackground } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const GameLoader = () => {
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
  }, [progressAnim]);

  return (
    <ImageBackground
      // source={uri: "https://images.unsplash.com/photo-1535376472810-5d229c65da09?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
      source={
        'https://images.unsplash.com/photo-1535376472810-5d229c65da09?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
      className="absolute z-20 size-full items-center justify-center bg-black/80"
      contentFit="cover"
    ></ImageBackground>
  );
};

// const ProgressBar = ({
//   progressWidth,
// }: {
//   progressWidth: Animated.AnimatedInterpolation<string | number>;
// }) => (
//   <View className="mt-[3%] h-[2%] w-[50%] overflow-hidden rounded-[5%] bg-white">
//     <Animated.View
//       style={{ width: progressWidth }}
//       className="h-full bg-yellow-500"
//     />
//   </View>
// );

export default GameLoader;
