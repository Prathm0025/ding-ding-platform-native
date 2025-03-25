/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppState,
  type AppStateStatus,
  BackHandler,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { useAuth } from '@/lib';
import { useSoundStore } from '@/lib/sound';

import GameLoader from './game-loader';

const GameScreen = ({ gameUrl }: { gameUrl: string }) => {
  // console.log(gameUrl, 'gameUrl');

  const isBack = useRef(false);

  const gameWebViewRef = useRef<WebView>(null);
  const authToken = useAuth.use.token();
  // console.log(authToken);

  const socketURL = Env.API_URL;

  // Loader is visible initially
  const [isGameReady, setIsGameReady] = useState(false);
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  // const selectedUrl = useRecoilValue(selectedGameAtom)
  const { play } = useSoundStore();

  // const sendToUnity = (data: object) => {
  //   const message = JSON.stringify(data);
  //   gameWebViewRef.current?.injectJavaScript(`
  //     window.dispatchEvent(new MessageEvent('message', { data: '${message}' }));
  //     true;
  //   `);
  // };
  // const sendToUnityTest = () => {
  //   gameWebViewRef.current?.injectJavaScript(`
  //     SendMessage('AudioController', 'RecieveReactNativeAudioChanges’, false);
  //   `);
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Add back button listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        console.log('back');
        isBack.current = true;
        // sendToUnity({ type: `appState` });
        // sendToUnityTest();

        // eslint-disable-next-line react-hooks/rules-of-hooks
        // await useBackground(isBack.current);
        router.replace('/');
      } else if (nextAppState === 'active') {
        console.log('front');
        if (isBack.current) {
          isBack.current = false;
          // sendToUnity({ type: `appState ` });
          // sendToUnityTest();
        }
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    // Cleanup the listener when component unmounts
    return () => {
      backHandler.remove();
      play();

      subscription.remove();
    };
  }, [isGameReady]);

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Loader WebView - Visible until the game is ready */}
      {!isGameReady && <GameLoader />}

      <WebView
        ref={gameWebViewRef}
        source={{ uri: gameUrl }}
        injectedJavaScriptObject={{
          socketURL,
          token: authToken,
          nameSpace: '',
        }}
        javaScriptEnabled={true}
        onMessage={(event) => {
          console.log('Message from Unity:', event.nativeEvent.data);
          if (event.nativeEvent.data === 'onExit') {
            router.replace('/');
          } else if (event.nativeEvent.data === 'OnEnter') {
            setIsGameReady(true);
          }
        }}
        style={[
          styles.game,
          !isGameReady
            ? { width: 0, height: 0, opacity: 0, position: 'absolute' }
            : { width, height },
        ]}
        renderLoading={() => <GameLoader />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 20,
  },
  game: {
    flex: 1,
    zIndex: 1,
  },
});

export default GameScreen;
