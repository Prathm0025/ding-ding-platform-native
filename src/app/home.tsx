import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import Games from '../components/Games';
import Footer from '../components/Footer';
import { Image, ImageBackground } from 'expo-image';
import { BlurView } from 'expo-blur';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';  // Import Asset to handle local files
import useSocket from '../socket/hooks/useSocket';

const Home = () => {
  const socket = useSocket();
  const audioRef: any = useRef(null);
  const [audioUri, setAudioUri] = React.useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      };
      lockOrientation();

      // Cleanup function to stop audio when leaving Home page
      return () => {
        if (audioRef.current) {
          audioRef.current.injectJavaScript('document.getElementById("bg-audio").pause();');
        }
      };
    }, [])
  );

  useEffect(() => {
    if (socket) {
      // Update credit logic here
    }
  }, [socket]);

  // Load audio file on mount
  useEffect(() => {
    const loadAudio = async () => {
      const asset = Asset.fromModule(require('../assets/music/bg-audio.wav'));
      await asset.downloadAsync();
      setAudioUri(asset.uri);
    };
    loadAudio();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/whole-bg.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <BlurView intensity={50} style={styles.blurOverlay} tint="dark" />
        <View style={styles.coinContainer}>
          <Image source={require('../assets/images/coin.gif')} style={styles.coinGif} />
        </View>

        <View style={styles.mainContainer}>
          <Header />
          <Games />
          <Footer />
        </View>

        {/* WebView to play audio without external packages */}
        {audioUri && (
          <WebView
            ref={audioRef}
            source={{
              html: `
                <audio id="bg-audio" autoplay loop>
                  <source src="${audioUri}" type="audio/wav" />
                </audio>
                <script>
                  document.getElementById("bg-audio").volume = 1.0;
                </script>
              `,
            }}
            style={styles.audioPlayer}
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled
          />
        )}
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  coinContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
  },
  coinGif: {
    width: '80%',
    height: '80%',
    opacity: 0.7,
  },
  audioPlayer: {
    width: 0,
    height: 0,
  },
});
