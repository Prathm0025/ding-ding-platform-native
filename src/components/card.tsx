import { useRouter } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { Game } from '@/api';

type Props = Game;

export const Card = ({ name: title, _id, thumbnail, slug }: Props) => {
  const { width, height } = useWindowDimensions();

  // Responsive helper functions
  const resWidth = (percentage: number) => (percentage / 100) * width;
  const resHeight = (percentage: number) => (percentage / 100) * height;
  const resSize = (percentage: number) =>
    (percentage / 100) * Math.min(width, height);

  const router = useRouter();

  // Shared value for scale animation using reanimated
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        setTimeout(() => {
          router.replace(`/games/${slug}`);
        }, 200);
      }}
    >
      <Animated.View
        className="overflow-hidden border border-yellow-500 bg-red-500 shadow-lg"
        style={[
          {
            width: resWidth(20),
            height: resHeight(53),
            borderRadius: resSize(5),
            borderWidth: resSize(0.4),
            padding: resSize(0.5),
            marginHorizontal: resSize(1.5),
            shadowRadius: resSize(1.8),
            shadowOffset: { width: resSize(0.4), height: resSize(0.8) },
          },
          animatedStyle,
        ]}
      >
        <ImageBackground
          source={{ uri: thumbnail }}
          className="flex-1 items-center justify-end"
          imageStyle={{ borderRadius: resSize(40) }}
        >
          <View className="w-full items-center bg-black bg-opacity-50 p-1">
            <Text className="text-center text-sm font-bold text-white">
              {title}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

export default Card;
