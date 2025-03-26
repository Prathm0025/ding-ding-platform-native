import { useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import {
  AppState,
  type AppStateStatus,
  BackHandler,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { useSoundStore } from '@/lib/sound';

import GameLoader from './game-loader';
import GameWebView from './game-webview';

const GameScreen = ({ gameUrl }: { gameUrl: string }) => {
  const [isGameReady, setIsGameReady] = useState(false);

  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { play } = useSoundStore();

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    lockOrientation();

    const backAction = () => {
      router.replace('/');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        console.log('App moved to background');
        router.replace('/');
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      backHandler.remove();
      play();
      subscription.remove();
    };
  }, []);

  return (
    <View style={[styles.container, { width, height }]}>
      {/* ✅ Show loader only if game is not ready */}
      {!isGameReady && <GameLoader />}

      <GameWebView gameUrl={gameUrl} onGameReady={() => setIsGameReady(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default GameScreen;
