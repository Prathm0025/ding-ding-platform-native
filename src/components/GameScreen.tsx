import React, { useRef, useMemo, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { getAuthToken } from '../api/auth';

const GameScreen = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
    
        const token:any= await getAuthToken();
        setAuthToken(token);
    
    };

    fetchToken();
  }, []);
  const webViewRef = useRef(null);

  const socketURL = "https://gl9r1h24-5002.inc1.devtunnels.ms/";

  // Use a local server or a service like ngrok to serve your test HTML file
  const baseGameUrl = "https://slot-cleopatra-dev.vercel.app/";

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
