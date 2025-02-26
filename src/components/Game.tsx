import { useRef } from 'react';
import { WebView } from 'react-native-webview';

const GameScreen = () => {
  const webViewRef = useRef(null);

  // Inject JavaScript to send authentication token to Unity WebGL
  const injectedJavaScript = `
    window.dispatchEvent(new MessageEvent('message', {
      data: {
        type: 'authToken',
        cookie: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTIzNDhlY2FhMTdhNzAyYTFjYTJhYyIsInVzZXJuYW1lIjoiUmFuYSIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE3NDA0NTk2MTIsImV4cCI6MTc0MTA2NDQxMn0.FPmCkyzcJQQzc_bwb6K_WZ9CYEC374GI97ffUAEFmeE",
        socketURL: "https://game-crm-rtp-backend.onrender.com"
      }
    }));
    true;
  `;

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://5944-49-205-44-46.ngrok-free.app/' }}
      injectedJavaScript={injectedJavaScript}
      onMessage={(event) => {
        console.log('Message from Unity:', event);
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GameScreen;