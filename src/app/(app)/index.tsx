/* eslint-disable max-lines-per-function */

import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import type { Game } from '@/api';
import { useGames } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, View } from '@/components/ui';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { useSoundStore } from '@/lib/sound';

export default function Feed() {
  const { data, isPending } = useGames();
  const loadSound = useSoundStore((state) => state.loadSound);
  const { isMuted, stop } = useSoundStore();
  const [OrientationLock, setIsOrientationLocked] = useState(false);

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
        setIsOrientationLocked(true);
      };

      lockOrientation();
    }, [])
  );

  if (isPending) {
    return null;
  }

  const renderItem = ({ item }: { item: Game }) => (
    <View style={styles.cardContainer}>
      <Card {...item} />
    </View>
  );

  if (!OrientationLock) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../../../assets/whole-bg.webp')}
        style={styles.background}
        contentFit="cover"
      >
        {/* Coin GIF with Blur */}
        <View style={styles.coinContainer}>
          <BlurView intensity={50} style={styles.blurOverlay} tint="dark" />
          <Image
            source={require('../../../assets/coin.gif')}
            style={styles.coinGif}
          />
        </View>

        {/* Header */}
        <Header />
        <FocusAwareStatusBar />

        {/* FlashList */}
        {/* Only render FlashList when ready */}
        {OrientationLock && data && (
          <FlashList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item?._id.toString()}
            ListEmptyComponent={<EmptyList isLoading={isPending} />}
            estimatedItemSize={300}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flashListContent}
          />
        )}

        {/* Footer */}
        <View style={styles.footerContainer}>
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
  cardContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashListContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  coinGif: {
    width: '80%',
    height: '80%',
    opacity: 0.7,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
