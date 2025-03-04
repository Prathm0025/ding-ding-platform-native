import { Stack, useRouter, useSegments } from "expo-router";
import Toast from 'react-native-toast-message';
import { RecoilRoot, useRecoilState } from 'recoil';

import { useEffect, useState } from "react";
import { isTokenValid } from "../api/auth";
import { userAtom } from "../utils/Atoms";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments() as string[];
  const [userState, setUserState] = useRecoilState(userAtom);

  useEffect(() => {
    const initializeAuth = async () => {
      const isValid: boolean = await isTokenValid() || false;
      setUserState(prevState => ({
        ...prevState,
        isAuthenticated: isValid,
      }));
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (userState.isAuthenticated === null) return;
    if (!userState.isAuthenticated && segments.length > 0) {
      router.replace("/");
    }
    if (userState.isAuthenticated && segments.length === 0) {
      router.replace("/home");
    }
  }, [segments, userState.isAuthenticated]);

  if (userState.isAuthenticated === null) {
    return null; // Prevent flickering while checking auth
  }


  return (
    <>
      <RecoilRoot>
        <Stack screenOptions={{ statusBarHidden: true }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="game" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </RecoilRoot>
    </>
  );
}
