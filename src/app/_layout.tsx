import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';


export default function RootLayout() {

  return (
    <>
      <Stack screenOptions={{ statusBarHidden: true }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
