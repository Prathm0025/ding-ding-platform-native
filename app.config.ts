/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

// const appIconBadgeConfig: AppIconBadgeConfig = {
//   enabled: false,
//   badges: [
//     {
//       text: 'Ding Ding',
//       type: 'banner',
//       color: 'white',

//     },
//     {
//       text: Env.VERSION.toString(),
//       type: 'ribbon',
//       color: 'white',
//     },
//   ],
// };

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: 'ding-ding',
  version: Env.VERSION.toString(),
  orientation: 'landscape',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/ff3702db-2b39-4340-a46c-ca66d6d88e0e', // Add this
  },
  runtimeVersion: '1.0.0', // Add this (can match your version or use semver-based versioning)

  assetBundlePatterns: ['**/*'],
  androidStatusBar: {
    hidden: true,
    translucent: true,
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    config: {
      usesNonExemptEncryption: false, // Avoid the export compliance warning on the app store
    },
  },
  experiments: {
    typedRoutes: true,
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
