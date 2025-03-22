/* eslint-disable max-lines-per-function */

import { BlurView } from 'expo-blur';
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

  const resWidth = (percentage: number) => (percentage / 100) * width;
  const resHeight = (percentage: number) => (percentage / 100) * height;

  const router = useRouter();
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
        style={[
          animatedStyle,
          {
            width: resWidth(18),
            height: resHeight(48),
          },
        ]}
        className="mx-2 overflow-hidden rounded-lg border border-yellow-400 shadow-md"
      >
        {/* Background Image */}

        {/* Blur Overlay */}
        <BlurView intensity={30} className="z-1 absolute inset-0" tint="dark" />

        {/* Thumbnail */}
        <ImageBackground
          source={{ uri: thumbnail }}
          className="size-full items-center justify-end rounded-lg"
        >
          <View className="w-full items-center bg-black/50 p-2">
            <Text className="text-center text-base font-bold text-white">
              {title}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

export default Card;
