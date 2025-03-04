import { useRouter } from 'expo-router';
import React, { useRef, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const GameScreen = () => {
  const webViewRef = useRef(null);
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkxOTI3OTgxYmU0MzlkMjkyYjg4OSIsInVzZXJuYW1lIjoiTWVodWwiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNzQwNjQwODA2LCJleHAiOjE3NDEyNDU2MDZ9.mE6MFKJzX_gvnALAiTmXBKk7sXmt0YwEb8oiMhq2hDU";
  const socketURL = "https://gl9r1h24-5002.inc1.devtunnels.ms/";
  const baseGameUrl = "https://slot-cleopatra-dev.vercel.app/";
  const loaderUrl = "https://loader.dingdinghouse.com"

  const [isGameReady, setIsGameReady] = useState(false);

  const router = useRouter()

  // Encode the auth token and socket URL
  // const encodedToken = encodeURIComponent(authToken);
  // const encodedSocketURL = encodeURIComponent(socketURL);



  return (
    <>
      {isGameReady ? null : (
        <WebView
          ref={webViewRef}
          source={{ uri: loaderUrl }}
          style={styles.loader}
        />
      )}
      <WebView
        ref={webViewRef}
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
          }
        }}
        onLoadEnd={() => {
          setIsGameReady(true);
        }}
        style={styles.game}
      />

    </>
  );
};

export default GameScreen;


const styles = StyleSheet.create({
  loader: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  game: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  }
});
