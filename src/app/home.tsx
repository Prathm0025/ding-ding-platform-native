import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import Games from '../components/Games';
import Footer from '../components/Footer';
import { Image, ImageBackground } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';  // Import Audio from expo-av
import useSocket from '../socket/hooks/useSocket';

const Home = () => {
  const socket = useSocket();
  const audioRef = useRef<Audio.Sound | null>(null);  // Use Audio.Sound for audioRef

  useFocusEffect(
    React.useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      };
      lockOrientation();

      // Cleanup function to stop and unload audio when leaving Home page
      return () => {
        if (audioRef.current) {
          audioRef.current.stopAsync();
          audioRef.current.unloadAsync();
        }
      };
    }, [])
  );

  useEffect(() => {
    if (socket) {
      // Update credit logic here
    }
  }, [socket]);

  // Load and play audio file on mount
  useEffect(() => {
    const loadAndPlayAudio = async () => {
      try {
        const asset = Asset.fromModule(require('../assets/music/bg-audio.wav'));
        await asset.downloadAsync();

        const { sound } = await Audio.Sound.createAsync(
          { uri: asset.localUri || asset.uri },
          { isLooping: true, volume: 1.0 }
        );
        audioRef.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.error('Failed to load or play audio:', error);
      }
    };

    loadAndPlayAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.stopAsync();
        audioRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent />
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
});
