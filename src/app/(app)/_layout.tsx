/* eslint-disable max-lines-per-function */

import { Redirect, SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useAuth, useIsFirstTime } from '@/lib';
import { cacheImages } from '@/lib/utils/cache-image';

export default function MainLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    async function loadAssets() {
      const imageAssets = cacheImages([
        require('../../../assets/ALL.webp'),
        require('../../../assets/SLOT.webp'),
        require('../../../assets/KENO.webp'),
        require('../../../assets/OTHER.webp'),
        require('../../../assets/fotter-coin.gif'),
        require('../../../assets/footer-bg.webp'),
        require('../../../assets/whole-bg.webp'),
      ]);

      await Promise.all(imageAssets);
    }
    loadAssets();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          edges={['top', 'left', 'right', 'bottom']}
        >
          <StatusBar hidden />
          <Stack
            screenOptions={{ statusBarHidden: true, gestureEnabled: true }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'Games',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                title: 'Settings',
                // headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                title: 'login',
                headerShown: false,
              }}
            />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
