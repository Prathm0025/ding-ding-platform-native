import { Stack, useLocalSearchParams } from 'expo-router';

import { useGame } from '@/api/games/use-game';
import GameScreen from '@/components/game-screen';
import { Text, View } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Game() {
  const local = useLocalSearchParams<{ slug: string }>();
  const token = useAuth.use.token();
  const { data, isPending, isError } = useGame({
    //@ts-ignore
    variables: { slug: local.slug, token },
  });

  console.log(data, 'data', isPending, isError);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {isError ? (
        <View className="flex-1 justify-center p-3">
          <Text className="text-center">Error loading post</Text>
        </View>
      ) : (
        <GameScreen gameUrl={data?.url} />
      )}
    </>
  );
}
