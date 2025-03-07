import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet, View, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRecoilValue } from 'recoil';
import { selectedGameAtom, userAtom } from '../utils/Atoms';
import { config } from '../utils/config';
import GameLoader from './GameLoader';

const GameScreen = () => {
  const gameWebViewRef = useRef(null);
  const userState = useRecoilValue(userAtom);
  const authToken = userState?.user?.token;
  // Loader is visible initially
  const [isGameReady, setIsGameReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      if (!isGameReady) {
       
        router.replace("/home");
        return true;
      }
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

  
    return () => backHandler.remove();
  }, [isGameReady, router]);
  

  const socketURL = config.server;



 
  const { height } = useWindowDimensions();
  const selectedUrl = useRecoilValue(selectedGameAtom)

  return (
    <View style={styles.container}>
           <StatusBar
            translucent
             />
      {!isGameReady && (
        <GameLoader />
      )}

      <WebView
        ref={gameWebViewRef}
        source={{ uri: selectedUrl }}
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
            ? { width: 0, height: 0, opacity: 0, position: 'absolute' } 
            : { width: '100%',height,} 
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
    width: '100%',
    height: '100%',
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
    width: '100%',
    height: '100%',
  }
});
