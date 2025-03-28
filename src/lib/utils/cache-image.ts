import { Asset } from 'expo-asset';

export const cacheImages = (images: any) => {
  return images.map((image: any) => Asset.fromModule(image).downloadAsync());
};
