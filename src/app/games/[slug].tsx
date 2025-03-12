// import { Stack, useLocalSearchParams } from 'expo-router';
// import * as React from 'react';

import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { useGame } from '@/api/games/use-game';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { useAuth } from '@/lib';

export default function Post() {
  const local = useLocalSearchParams<{ slug: string }>();
  const token = useAuth.use.token();

  const { data, isPending, isError } = useGame({
    //@ts-ignore
    variables: { slug: local.slug, token },
  });
  useEffect(() => {
    console.log('gameurl', data);
  }, [data]);

  console.log(data, 'data', isPending, isError);

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen
          options={{ title: local.slug, headerBackTitle: 'Games' }}
        />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen
          options={{ title: local.slug, headerBackTitle: 'Games' }}
        />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading post</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-3 ">
      <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <Text className="text-center text-lg font-bold">{data?.url}</Text>
      <Text>{data?.url} </Text>
    </View>
  );
}
