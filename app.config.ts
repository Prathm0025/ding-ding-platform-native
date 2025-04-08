/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: 'ding-ding-house-apk',
  version: Env.VERSION.toString(),
  orientation: 'landscape',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,

  updates: {
    fallbackToCacheTimeout: 0,
    url: `https://u.expo.dev/${Env.EAS_PROJECT_ID}`, // Dynamic URL based on your env
  },

  runtimeVersion: {
    policy: 'appVersion', // Uses version from appVersionSource
  },

  assetBundlePatterns: ['**/*'],

  androidStatusBar: {
    hidden: true,
    translucent: true,
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    config: {
      usesNonExemptEncryption: false,
    },
  },

  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#2E3C4B',
    },
    package: Env.PACKAGE,
  },

  web: {
    favicon: './assets/icon.png',
    bundler: 'metro',
  },

  experiments: {
    typedRoutes: true,
  },

  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#2E3C4B',
        image: './assets/icon.png',
        imageWidth: 150,
      },
    ],
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-localization',
    'expo-router',
    ['react-native-edge-to-edge'],
  ],

  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
