import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useCallback } from 'react';

import type { Game } from '@/api';
import { useGames } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/components/ui';
import Header from '@/components/ui/header';
import { useSound } from '@/lib/hooks/use-sound';

export default function Feed() {
  const { data, isPending, isError } = useGames();
  const { stop } = useSound(require('../../../assets/music/bg-audio.wav'));

  // Lock to Landscape Mode
  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      };

      lockOrientation();

      return () => {
        stop(); // Stop sound on exit
        ScreenOrientation.unlockAsync();
      };
    }, [stop])
  );

  const renderItem = ({ item }: { item: Game }) => (
    <View
      style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}
    >
      <Card {...item} />
    </View>
  );

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <View className="w-full flex-1">
      <Header />
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
