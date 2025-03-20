/* eslint-disable max-lines-per-function */

import { Audio } from 'expo-av';
import {
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from 'expo-av/build/Audio.types';
import { useEffect, useRef, useState } from 'react';
import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '../storage';

export const useSound = (soundFile: any) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useMMKVBoolean('IS_MUTED_STATE', storage);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(soundFile, {
          shouldPlay: !isMuted,
          isLooping: true,
          volume: 1.0,
        });
        soundRef.current = sound;

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: false,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });

        if (!isMuted) {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Failed to load audio:', error);
      }
    };

    loadAudio();

    return () => {
      const stopAudio = async () => {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
          soundRef.current = null;
          setIsPlaying(false);
        }
      };

      stopAudio();
    };
  }, [isMuted]);

  const play = async () => {
    if (soundRef.current && !isMuted) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stop = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setIsPlaying(false);
    }
  };

  const mute = async () => {
    if (soundRef.current) {
      await soundRef.current.setIsMutedAsync(true);
      setIsMuted(true);
    }
  };

  const unmute = async () => {
    if (soundRef.current) {
      await soundRef.current.setIsMutedAsync(false);
      setIsMuted(false); // ✅ Automatically saved to MMKV
      if (isPlaying) {
        await soundRef.current.playAsync();
      }
    }
  };

  return {
    isPlaying,
    isMuted,
    play,
    pause,
    stop,
    mute,
    unmute,
  };
};
