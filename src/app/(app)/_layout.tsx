/* eslint-disable react/no-unstable-nested-components */
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { View } from '@/components/ui';
import {
  Feed as FeedIcon,
  Settings as SettingsIcon,
} from '@/components/ui/icons';
import { signOut, useAuth, useIsFirstTime } from '@/lib';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Games',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          headerRight: () => <LogoutItem />,
          tabBarButtonTestID: 'games-tab',
        }}
      />

      {/* <Tabs.Screen */}
      {/*   name="style" */}
      {/*   options={{ */}
      {/*     title: 'Style', */}
      {/*     headerShown: false, */}
      {/*     tabBarIcon: ({ color }) => <StyleIcon color={color} />, */}
      {/*     tabBarButtonTestID: 'style-tab', */}
      {/*   }} */}
      {/* /> */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarButtonTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

// const CreateNewPostLink = () => {
//   return (
//     <Link href="/feed/add-post" asChild>
//       <Pressable>
//         <Text className="px-3 text-primary-300">Create</Text>
//       </Pressable>
//     </Link>
//   );
// };
const LogoutItem = () => {
  return (
    <View className="m-4">
      <ItemsContainer>
        <Item text="settings.logout" onPress={signOut} />
      </ItemsContainer>
    </View>
  );
};
