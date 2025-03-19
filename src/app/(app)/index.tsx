import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React from 'react';

import type { Game } from '@/api';
import { useGames } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/components/ui';
import Header from '@/components/ui/header';

export default function Feed() {
  const { data, isPending, isError } = useGames();

  useFocusEffect(
    React.useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      };
      lockOrientation();

      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Game }) => (
      <View
        style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}
      >
        <Card {...item} />
      </View>
    ),
    []
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
