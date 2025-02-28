import React, { useRef, useMemo } from 'react';
import { WebView } from 'react-native-webview';

const GameScreen = () => {
  const webViewRef = useRef(null);
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkxOTI3OTgxYmU0MzlkMjkyYjg4OSIsInVzZXJuYW1lIjoiTWVodWwiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNzQwNjQwODA2LCJleHAiOjE3NDEyNDU2MDZ9.mE6MFKJzX_gvnALAiTmXBKk7sXmt0YwEb8oiMhq2hDU";
  const socketURL = "https://gl9r1h24-5002.inc1.devtunnels.ms/";

  // Use a local server or a service like ngrok to serve your test HTML file
  const baseGameUrl = "https://cf37-49-205-44-46.ngrok-free.app";

  // Encode the auth token and socket URL
  // const encodedToken = encodeURIComponent(authToken);
  // const encodedSocketURL = encodeURIComponent(socketURL);



  return (
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
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GameScreen;
