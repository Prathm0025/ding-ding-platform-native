import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../utils/Atoms';
import { config } from '../utils/config';

const GameScreen = () => {
  const gameWebViewRef = useRef(null);
  const loaderWebViewRef = useRef(null);
  const userState = useRecoilValue(userAtom)
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzZlM2Q4OWViNGExODEzODFkZDljMyIsInVzZXJuYW1lIjoicmFuYS10ZXN0Iiwicm9sZSI6InBsYXllciIsImlhdCI6MTc0MTA5MTIzNSwiZXhwIjoxNzQxNjk2MDM1fQ.nz_KiD8BwtJBhHP34NBOXk74MzFhzmIsA2U92oqXhKE";
  
  const socketURL = config.server;

  const baseGameUrl = "https://slot-cleopatra-dev.vercel.app";
  const loaderUrl = "https://loader.dingdinghouse.com";
  const [isGameReady, setIsGameReady] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
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
            socketURL
          }
          else if (event.nativeEvent.data === 'authToken') {
            setIsGameReady(true);
          }
        }}
        style={styles.game}
      />

      {!isGameReady && (
        <WebView
          ref={loaderWebViewRef}
          source={{ uri: loaderUrl }}
          style={styles.loader}
        />
      )}
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
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 10, // Increased zIndex to ensure loader appears on top
  },
  game: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  }
});
