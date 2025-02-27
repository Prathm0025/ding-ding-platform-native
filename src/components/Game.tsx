import React, { useRef, useMemo } from 'react';
import { WebView } from 'react-native-webview';

const GameScreen = () => {
  const webViewRef = useRef(null);
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTlkOGJmZWM1MWYwY2FmODRkNTY3NiIsInVzZXJuYW1lIjoidGVzdCIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE3NDA1NTkyNDAsImV4cCI6MTc0MTE2NDA0MH0.GtydMsAwpiqANeyAz_x_j5VCEURAYOD_i8M9kZEBia0";
  const socketURL = "https://game-crm-rtp-backend.onrender.com";
  
  // Use a local server or a service like ngrok to serve your test HTML file
  const baseGameUrl = 'https://ac39-49-205-44-46.ngrok-free.app/test-unity.html';

  // Encode the auth token and socket URL
  const encodedToken = encodeURIComponent(authToken);
  const encodedSocketURL = encodeURIComponent(socketURL);

  // Construct the full game URL with encoded parameters
  const gameUrl = useMemo(() => {
    return `${baseGameUrl}?token=${encodedToken}&socketUrl=${encodedSocketURL}`;
  }, [baseGameUrl, encodedToken, encodedSocketURL]);

  const injectedJavaScript = `
    function unityLoaded() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const socketUrl = urlParams.get('socketUrl');

      if (token && socketUrl) {
        console.log('Sending data to Unity');
        window.unityInstance.SendMessage('SocketIOManager', 'ReceiveAuthToken', JSON.stringify({
          type: "authToken",
          cookie: token,
          socketURL: socketUrl,
          console: true,
          loaderUrl: "https://loader.milkyway-casino.com/"
        }));
      } else {
        console.error('Token or socketUrl not found in URL');
      }
    }

    if (window.unityInstance) {
      unityLoaded();
    } else {
      window.addEventListener('unityLoaded', unityLoaded);
    }

    true;
  `;

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: gameUrl }}
      injectedJavaScript={injectedJavaScript}
      javaScriptEnabled={true}
      onMessage={(event) => {
        console.log('Message from Unity:', event.nativeEvent.data);
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GameScreen;