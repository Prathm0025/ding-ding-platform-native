/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useColorScheme } from 'nativewind';
import { Linking, StatusBar } from 'react-native';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { SoundItem } from '@/components/settings/sound-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { colors, ScrollView, View } from '@/components/ui';
import { Website } from '@/components/ui/icons';

export default function Settings() {
  // const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  // const { disconnect } = useSocket();

  return (
    <>
      <StatusBar hidden={true} />
      <ScrollView>
        <View className="flex-1 px-4 pt-2 ">
          {/* <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text> */}
          <ItemsContainer title="settings.generale">
            {/* <LanguageItem /> */}
            <ThemeItem />
            <SoundItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            {/* <Item text="settings.version" value={Env.VERSION} /> */}
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => Linking.openURL('https://www.dingdinghouse.com')}
            />
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  );
}
