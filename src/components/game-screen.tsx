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

import GameLoader from './game-loader';

const GameScreen = ({ gameUrl }: { gameUrl: string }) => {
  // console.log(gameUrl, 'gameUrl');

  const gameWebViewRef = useRef<WebView>(null);
  const authToken = useAuth.use.token();
  // console.log(authToken);

  const socketURL = Env.API_URL;

  // Loader is visible initially
  const [isGameReady, setIsGameReady] = useState(false);
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  // const selectedUrl = useRecoilValue(selectedGameAtom)

  // i have a react native app (games platform) with unity games . im using react native webview to show the games in our app . the unity app has its own sound we need to make sure that when our app is not being actively used unity sound is also muted . we need to think about ways to resolve this issue .
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    lockOrientation();
    const backAction = () => {
      return true;
    };

    // Add back button listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        console.log('back');

        // gameWebViewRef.current?.injectJavaScript(`
        //   if (typeof unityInst!== 'undefined') {
        //     unityInst.SendMessage('AudioController', 'RecieveReactNativeAudioChanges’, false);
        //     console.log('unityInst is defined');
        //   }else{
        //     console.log('unityInst is not defined');
        // `);
      } else if (nextAppState === 'active') {
        console.log('front');
        // gameWebViewRef.current?.injectJavaScript(`
        //   if (typeof unityInst!== 'undefined') {
        //     unityInst.SendMessage('AudioController', 'RecieveReactNativeAudioChanges’, true);
        //     console.log('unityInst is defined');
        //   }else{
        //     console.log('unityInst is not defined');
        // `);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    // Cleanup the listener when component unmounts
    return () => {
      backHandler.remove();
      ScreenOrientation.unlockAsync();

      subscription.remove();
    };
  }, []);

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
      />
    </View>
  );
};

export default GameScreen;

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
