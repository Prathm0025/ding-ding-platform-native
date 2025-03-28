import React from 'react';

import { type TxKeyPath } from '@/lib';
import { useSoundStore } from '@/lib/sound';

import { Item } from './item';

export const SoundItem = () => {
  const { isMuted, mute, unmute } = useSoundStore();

  const toggleSound = async () => {
    if (isMuted) {
      await unmute();
    } else {
      await mute();
    }
  };

  return (
    <Item
      text={'Sound' as unknown as TxKeyPath}
      value={isMuted ? '🔇 Muted' : '🔊 Unmuted'}
      onPress={toggleSound}
    />
  );
};
