/* eslint-disable max-lines-per-function */

import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useCallback, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import type { Game } from '@/api';
import { useGames } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/components/ui';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { useSoundStore } from '@/lib/sound';

export default function Feed() {
  const { data, isPending, isError } = useGames();
  const loadSound = useSoundStore((state) => state.loadSound);
  const { isMuted, stop } = useSoundStore();
  useEffect(() => {
    loadSound(require('../../../assets/music/bg-audio.wav'));

    return () => {
      stop();
    };
  }, [isMuted]);

  // Lock to Landscape Mode
  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      };

      lockOrientation();

      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  const renderItem = ({ item }: { item: Game }) => (
    <View
      style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}
    >
      <Card {...item} />
    </View>
  );

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <View className="h-dvh w-full flex-1">
      <StatusBar hidden />
      <ImageBackground
        source={require('../../../assets/whole-bg.webp')}
        className="size-full flex-1"
        resizeMode="cover"
      >
        <View style={styles.coinContainer}>
          <BlurView intensity={50} style={styles.blurOverlay} tint="dark" />

          <Image
            source={require('../../../assets/coin.gif')}
            style={styles.coinGif}
          />
        </View>

        <Header />
        <FocusAwareStatusBar />
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => `item-${index}`}
          ListEmptyComponent={<EmptyList isLoading={isPending} />}
          estimatedItemSize={300}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View className="bottom-9 z-10 flex items-center justify-between">
          <Footer />
        </View>
      </ImageBackground>
    </View>
  );
}

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
    zIndex: 0,
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
