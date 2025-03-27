import { Env } from '@env';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';

import { useAuth } from '@/lib';

type Props = {
  gameUrl: string;
  onGameReady: () => void;
};

const GameWebView = ({ gameUrl, onGameReady }: Props) => {
  console.log(gameUrl, 'gameUrl');

  const gameWebViewRef = useRef<WebView>(null);
  const authToken = useAuth.use.token();
  const socketURL = useMemo(() => Env.API_URL, []);

  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const webView = useMemo(
    () => (
      <WebView
        ref={gameWebViewRef}
        source={{ uri: gameUrl }}
        injectedJavaScriptObject={{
          socketURL,
          token: authToken,
          nameSpace: 'game',
        }}
        javaScriptEnabled={true}
        onMessage={(event) => {
          console.log('Message from Unity:', event.nativeEvent.data);
          if (event.nativeEvent.data === 'onExit') {
            router.replace('/');
          } else if (event.nativeEvent.data === 'OnEnter') {
            onGameReady();
          }
        }}
        style={[styles.game, { width, height }]}
      />
    ),
    [gameUrl, authToken, socketURL]
  );

  return webView;
};

const styles = StyleSheet.create({
  game: {
    flex: 1,
  },
});

export default GameWebView;
