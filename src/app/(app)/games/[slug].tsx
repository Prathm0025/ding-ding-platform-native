import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import GameScreen from '@/components/game-screen';
import { Text, View } from '@/components/ui';
import { useSocket } from '@/lib/socket/socket';
import { Events } from '@/lib/utils/events';

export default function Game() {
  const local = useLocalSearchParams<{ slug: string }>();

  const { socket } = useSocket();
  const [gameData, setGameData] = useState<{
    url?: string;
    message?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socket || !socket.connected || !local.slug) return;

    socket.emit(
      Events.PLAYGROUND_GAME_URL,
      { slug: local.slug },
      (res: any) => {
        setLoading(false);
        if (res.success) {
          setGameData({ url: res.data.url });
        } else {
          setGameData({ message: res.message });
        }
      }
    );
  }, [socket, local.slug]);
  // console.log(data, 'data', isPending, isError);

  return (
    <>
      <StatusBar hidden />

      <Stack.Screen options={{ headerShown: false }} />

      {loading ? (
        <View className="flex-1 justify-center p-3">
          <Text className="text-center">Error loading post</Text>
        </View>
      ) : (
        <GameScreen gameUrl={gameData?.url ?? ''} />
      )}
    </>
  );
}
