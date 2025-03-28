import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  StatusBar,
  View,
} from 'react-native';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/lib';

export default function Login() {
  const login = useAuth.use.login();
  const status = useAuth.use.status();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'signIn') {
      setLoading(false);
      router.replace('/');
    }
    setLoading(false);
  }, [status, router]);

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    Keyboard.dismiss();
    login(data.username, data.password);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#F69E04" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/bg.webp')}
      className="flex-1"
      resizeMode="cover"
    >
      <StatusBar hidden />
      <LoginForm onSubmit={onSubmit} />
    </ImageBackground>
  );
}
