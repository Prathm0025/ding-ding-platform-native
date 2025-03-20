import React from 'react';

import type { OptionType } from '@/components/ui';
import { Options, useModal } from '@/components/ui';
import { type TxKeyPath } from '@/lib';
import { useSound } from '@/lib/hooks/use-sound';

import { Item } from './item';

export const SoundItem = () => {
  const modal = useModal();

  const { isMuted, mute, unmute } = useSound(
    require('../../../assets/music/bg-audio.wav')
  );

  const onSelect = React.useCallback(
    async (option: OptionType) => {
      if (option.value === 'mute' && !isMuted) {
        await mute();
      } else if (option.value === 'unmute' && isMuted) {
        await unmute();
      }
      modal.dismiss();
    },
    [mute, unmute, isMuted, modal]
  );

  const soundOptions = React.useMemo(
    () => [
      { label: '🔇 Mute', value: 'mute' },
      { label: '🔊 Unmute', value: 'unmute' },
    ],
    []
  );

  const selectedOption = React.useMemo(
    () =>
      isMuted
        ? soundOptions.find((option) => option.value === 'mute')
        : soundOptions.find((option) => option.value === 'unmute'),
    [isMuted, soundOptions]
  );

  return (
    <>
      <Item
        text={'Sound' as unknown as TxKeyPath}
        value={selectedOption?.label}
        onPress={modal.present}
      />
      <Options
        ref={modal.ref}
        options={soundOptions}
        onSelect={onSelect}
        value={selectedOption?.value}
      />
    </>
  );
};
