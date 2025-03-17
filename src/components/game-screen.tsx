import { Env } from '@env';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

import { View } from '@/components/ui';
import { useAuth } from '@/lib';

import GameLoader from './game-loader';

const GameScreen = ({ gameUrl }: { gameUrl: string }) => {
  const gameWebViewRef = useRef(null);
  const authToken = useAuth.use.token();

  const socketURL = Env.API_URL;

  // Loader is visible initially
  const [isGameReady, setIsGameReady] = useState(false);
  const router = useRouter();
  // const selectedUrl = useRecoilValue(selectedGameAtom);
  // const token = useAuth.use.token()

  // useEffect(() => {
  //   const backAction = () => {
  //     return true;
  //   };
  //
  //   // Add back button listener
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );
  //
  //   // Cleanup the listener when component unmounts
  //   return () => backHandler.remove();
  // }, []);

  return (
    <View className="relative size-full flex-1">
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
            router.replace('/home');
          } else if (event.nativeEvent.data === 'OnEnter') {
            setIsGameReady(true);
          }
        }}
        className={`z-1 flex-1 ${!isGameReady ? 'absolute size-0 opacity-0' : 'size-full'}`}
      />
    </View>
  );
};

export default GameScreen;
