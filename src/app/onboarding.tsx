import { useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Image } from 'react-native';

import { useInstall } from '@/api/games/use-install';
import { Button, SafeAreaView, Text, View } from '@/components/ui';
import { useIsFirstTime } from '@/lib';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  const { refetch, isFetched } = useInstall({ enabled: false });

  useLayoutEffect(() => {
    setIsFirstTime(false);
    handleInstall();
    router.replace('/login');
  }, []);

  const handleInstall = () => {
    if (!isFetched) {
      refetch();
    }
  };
  return (
    <View className="flex-1 items-center justify-center bg-black">
      {/* <FocusAwareStatusBar /> */}

      {/* GIF Logo */}
      <Image
        source={require('../../assets/logo.gif')}
        className="h-40 w-64" // Adjust size as needed
        resizeMode="contain"
      />

      {/* Heading */}
      <Text className="mt-4 text-2xl font-bold text-white">
        Welcome to Ding Ding!
      </Text>
      <Text className="mt-2 px-6 text-center text-gray-400">
        The easiest way to manage your game and have fun!
      </Text>

      <SafeAreaView className="mt-10 w-full px-8">
        <Button
          label="Let's Get Started"
          onPress={() => {
            setIsFirstTime(false);
            handleInstall();
            router.replace('/login');
          }}
          className="rounded-full bg-yellow-500 "
          textClassName="text-black font-bold text-lg"
        />
      </SafeAreaView>
    </View>
  );
}
