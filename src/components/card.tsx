/* eslint-disable max-lines-per-function */

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
  const resSize = (percentage: number) =>
    (percentage / 100) * Math.min(width, height);

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
          {
            overflow: 'hidden',
            backgroundColor: '#ff0000',
            borderColor: '#FFD700',
            shadowColor: '#FFD700',
            shadowOpacity: 0.8,
            width: resWidth(20),
            height: resHeight(53),
            borderRadius: resSize(5),
            borderWidth: resSize(0.4),
            padding: resSize(0.5),
            shadowRadius: resSize(1.8),
            shadowOffset: { width: resSize(0.4), height: resSize(0.8) },
            marginHorizontal: resSize(1.5),
          },
          animatedStyle,
        ]}
      >
        <ImageBackground
          source={{ uri: thumbnail }}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          imageStyle={{ borderRadius: resSize(4) }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 5,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {title}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

export default Card;
