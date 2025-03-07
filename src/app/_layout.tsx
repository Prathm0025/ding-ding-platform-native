import { Stack, useRouter, useSegments } from "expo-router";
import Toast from "react-native-toast-message";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { isTokenValid, getAuthToken, useAuth } from "../api/auth";
import { userAtom } from "../utils/Atoms";
import { connectSocket } from "../socket/socket";

function AuthInitializer() {
  const router = useRouter();
  const segments = useSegments() as string[];
  const setUserState = useSetRecoilState(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { initAuth} = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAuthToken(); // Fetch token from SecureStore
      const isValid = token ? await isTokenValid() : false;

      if (isValid && token) {
     await initAuth()
    //  await connectSocket(setUserState);
      } else {
        setUserState({ isAuthenticated: false, user: { token: "", name: "", platformId: "" } });
      }

      setIsAuthenticated(isValid);

      if (isValid && segments.length === 0) {
        router.replace("/home");
      }


      if (!isValid && segments.length > 0) {
        router.replace("/");
      }
    };

    checkAuth();
  }, [segments]);

  if (isAuthenticated === null) {
    return null; 
  }

  return null; // This component only runs logic, no UI is needed.
}

export default function RootLayout() {
  return (
    <RecoilRoot>
      <AuthInitializer />
      <Stack screenOptions={{ statusBarHidden: true }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </RecoilRoot>
  );
}
