import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const IS_MUTED = 'IS_MUTED';
const IS_PLAYING = 'IS_PLAYING';
const VOLUME = 'VOLUME';

export const getIsMuted = () => storage.getBoolean(IS_MUTED) ?? false;
export const setIsMuted = (value: boolean) => storage.set(IS_MUTED, value);

export const getIsPlaying = () => storage.getBoolean(IS_PLAYING) ?? false;
export const setIsPlaying = (value: boolean) => storage.set(IS_PLAYING, value);

export const getVolume = () => storage.getNumber(VOLUME) ?? 1.0;
export const setVolume = (value: number) => storage.set(VOLUME, value);
