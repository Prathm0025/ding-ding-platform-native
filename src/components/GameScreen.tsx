import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../utils/Atoms';
import { config } from '../utils/config';
import Loader from './Loader';

const GameScreen = () => {
  const gameWebViewRef = useRef(null);
  const loaderWebViewRef = useRef(null);
  const userState = useRecoilValue(userAtom);
  const authToken = userState?.user?.token;

  const socketURL = config.server;
  const baseGameUrl = "https://slot-cleopatra-dev.vercel.app";
  const loaderUrl = "https://loader.dingdinghouse.com";

  // Loader is visible initially
  const [isGameReady, setIsGameReady] = useState(false);
  const router = useRouter();
  console.log(isGameReady, "asdhajksd")
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Loader WebView - Visible until the game is ready */}
      {!isGameReady && (
        <Loader/>
      )}

      <WebView
        ref={gameWebViewRef}
        source={{ uri: baseGameUrl }}
        injectedJavaScriptObject={{
          socketURL,
          token: authToken,
        }}
        javaScriptEnabled={true}
        onMessage={(event) => {
          console.log('Message from Unity:', event.nativeEvent.data);
          if (event.nativeEvent.data === 'onExit') {
            router.replace("/home");
          } else if (event.nativeEvent.data === 'authToken') {
            setIsGameReady(true);
          }
        }}
        style={[
          styles.game,
          !isGameReady
            ? { width: 0, height: 0, opacity: 0, position: 'absolute' } // Load in background
            : { width, height } // Show full screen when ready
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
   
  }

});
