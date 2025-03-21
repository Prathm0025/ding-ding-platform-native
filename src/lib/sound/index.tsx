/* eslint-disable max-lines-per-function */

import { Audio } from 'expo-av';
import { AppState } from 'react-native';
import { create } from 'zustand';

import {
  getIsMuted,
  getIsPlaying,
  getVolume,
  setIsMuted,
  setIsPlaying,
} from './utils';

interface SoundState {
  isMuted: boolean;
  isPlaying: boolean;
  volume: number;
  sound: Audio.Sound | null;
  loadSound: (soundFile: any) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  mute: () => Promise<void>;
  unmute: () => Promise<void>;
  setVolume: (value: number) => void;
}

export const useSoundStore = create<SoundState>((set, get) => {
  let soundInstance: Audio.Sound | null = null;

  const loadSound = async (soundFile: any) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile, {
        shouldPlay: !getIsMuted(),
        isLooping: true,
        volume: getVolume(),
      });

      soundInstance = sound;
      set({
        sound,
        isPlaying: getIsPlaying(),
        isMuted: getIsMuted(),
        volume: getVolume(),
      });

      if (getIsPlaying() && !getIsMuted()) {
        await sound.playAsync();
      }

      AppState.addEventListener('change', (state) => {
        if (state === 'background') {
          sound.pauseAsync();
        } else if (state === 'active' && !get().isMuted) {
          sound.playAsync();
        }
      });
    } catch (error) {
      console.error('Failed to load sound:', error);
    }
  };

  const play = async () => {
    if (soundInstance && !get().isMuted) {
      await soundInstance.playAsync();
      set({ isPlaying: true });
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (soundInstance) {
      await soundInstance.pauseAsync();
      set({ isPlaying: false });
      setIsPlaying(false);
    }
  };

  const stop = async () => {
    if (soundInstance) {
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
      soundInstance = null;
      set({ isPlaying: false });
      setIsPlaying(false);
    }
  };

  const mute = async () => {
    if (soundInstance) {
      await soundInstance.setIsMutedAsync(true);
      set({ isMuted: true });
      setIsMuted(true);
    }
  };

  const unmute = async () => {
    if (soundInstance) {
      await soundInstance.setIsMutedAsync(false);
      set({ isMuted: false });
      setIsMuted(false);
      if (get().isPlaying) {
        await soundInstance.playAsync();
      }
    }
  };

  const setVolume = (value: number) => {
    if (soundInstance) {
      soundInstance.setVolumeAsync(value);
    }
    set({ volume: value });
    setVolume(value);
  };

  return {
    isMuted: getIsMuted(),
    isPlaying: getIsPlaying(),
    volume: getVolume(),
    sound: null,
    loadSound,
    play,
    pause,
    stop,
    mute,
    unmute,
    setVolume,
  };
});
