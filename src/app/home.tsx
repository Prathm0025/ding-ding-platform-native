import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Header from '../components/Header';
import Games from '../components/Games';
import Footer from '../components/Footer';
import { Image, ImageBackground } from 'expo-image';
import { BlurView } from 'expo-blur';
import useSocket from '../socket/hooks/useSocket';

const Home = () => {
  const socket = useSocket();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      };
      lockOrientation();

      const configureAudio = async () => {
        try {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: false,
            playThroughEarpieceAndroid: false,
          });

          const { sound } = await Audio.Sound.createAsync(
            require('../assets/music/bg-audio.wav'),
            {
              shouldPlay: true,
              isLooping: true,
              volume: 1.0,
              rate: 1.0,
            }
          );

          setSound(sound);
          await sound.setVolumeAsync(1.0); // Max volume
          await sound.playAsync();
        } catch (error) {
          console.log('Error playing sound:', error);
        }
      };

      configureAudio();

      // Cleanup function to stop and unload sound when leaving Home page
      return () => {
        if (sound) {
          sound.stopAsync().then(() => sound.unloadAsync());
        }
      };
    }, [sound])
  );

  useEffect(() => {
    if (socket) {
      // Update credit logic here
    }
  }, [socket]);

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