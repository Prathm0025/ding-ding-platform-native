import { useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, StatusBar, View } from 'react-native';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/lib';

export default function Login() {
  const login = useAuth.use.login();
  const status = useAuth.use.status();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    lockOrientation();

    if (status === 'signIn') {
      setLoading(false); // Stop loader when signed in
      router.replace('/');
    }
    setLoading(false); // Stop loader when signed in

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [status, router]);

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    Keyboard.dismiss();
    login(data.username, data.password);
  };

  if (loading) {
    return (
      <View className="size-full flex-1 items-center justify-center bg-black">
        {/* Custom animated loader */}
        <ActivityIndicator size="large" color="#F69E04" />
        {/* <Text className="text-lg text-white mt-4">Signing in...</Text> */}
      </View>
    );
  }

  return (
    <>
      <StatusBar hidden />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
