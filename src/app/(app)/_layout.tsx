import { Redirect, SplashScreen, Stack } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useAuth, useIsFirstTime } from '@/lib';

export default function MainLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
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
    <Stack screenOptions={{ statusBarHidden: true, gestureEnabled: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Games',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
