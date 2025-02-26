import { useRef } from 'react';
import { WebView } from 'react-native-webview';

const GameScreen = () => {
  const webViewRef = useRef(null);

  const injectedJavaScript = `
    window.postMessage(${JSON.stringify({ authToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTIzNDhlY2FhMTdhNzAyYTFjYTJhYyIsInVzZXJuYW1lIjoiUmFuYSIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE3NDA0NTk2MTIsImV4cCI6MTc0MTA2NDQxMn0.FPmCkyzcJQQzc_bwb6K_WZ9CYEC374GI97ffUAEFmeE",socketUrl: "https://game-crm-rtp-backend.onrender.com" })}, '*');
    true;
  `;

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://slot-vikings-dev-sage.vercel.app/' }}
      injectedJavaScript={injectedJavaScript}
      onMessage={(event) => {
        console.log('Message from Unity:', event.nativeEvent.data);
      }}
      style={{ width: '90%', height: '80%' }}
    />
  );
};

export default GameScreen;