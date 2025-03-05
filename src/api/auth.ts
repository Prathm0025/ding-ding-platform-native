import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import { api } from "../utils/utils";
import * as Crypto from "expo-crypto";
import { v4 as uuidv4 } from "uuid";
import { atom, useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { userAtom } from '../utils/Atoms';

export const useAuth = () => {
    const [userState, setUserState] = useRecoilState(userAtom);
    const resetUserState = useResetRecoilState(userAtom);
  
    // Initialize auth state from SecureStore
    const initAuth = async () => {
      try {
        const token = await getAuthToken();
        if (token && await isTokenValid()) {
          const decoded: any = jwtDecode(token);
          const name = await getUserName();
          const platformId = await getPlatformId();
          
          setUserState({
            isAuthenticated: true,
            user: {
              token,
              name: name || "",
              platformId: platformId || ""
            }
          });
          return true;
        } else {
          resetUserState();
          return false;
        }
      } catch (error) {
        console.log("Init auth error:", error);
        resetUserState();
        return false;
      }
    };
  
    // Login function that updates Recoil state
    const login = async (username: string, password: string) => {
      try {
        const response = await api.post(`/api/users/login`, { username, password });
        const data = response.data;
        const token = data.token;
        
        // Save to SecureStore
        await saveToken(token);
        
        // Update Recoil state
        const decoded: any = jwtDecode(token);
        const platformId = await getPlatformId();
        
        setUserState({
          isAuthenticated: true,
          user: {
            token,
            name: decoded.username || "",
            platformId: platformId || ""
          }
        });
        
        return data;
      } catch (error: any) {
        console.log("Login error:", error.message);
        return { success: false, error: error.message };
      }
    };
  
    // Logout function that updates Recoil state
    const logout = async () => {
      try {
        const response = await api.post(`/api/users/logout`);
        const data = response.data;
        if(response.status===200){          
          await removeToken();
          resetUserState();

        }

        return true;
      } catch (error) {
        console.log("Logout error:", error);
        return false;
      }
    };
  
    // Check if user is authenticated
    const checkAuth = async () => {
      const isValid = await isTokenValid();
      if (!isValid) {
        resetUserState();
      }
      return isValid;
    };
  
    return {
      user: userState,
      isAuthenticated: userState.isAuthenticated,
      initAuth,
      login,
      logout,
      checkAuth
    };
  };
  
  //function to save token in SecureStore
  export const saveToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync('userToken', token, {
        // only accessible when device in unlocked
        keychainAccessible: SecureStore.WHEN_UNLOCKED
      });
      const decoded: any = jwtDecode(token);
      let platformId = await generateUUID();
      console.log(platformId);
      await SecureStore.setItemAsync('name', decoded.username);
      await SecureStore.setItemAsync("platformId", platformId);
    } catch (error) {
      console.log(error);
    }
  };
  
  //function to get token from SecureStore
  export const getAuthToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        return token;
      } else {
        console.log("No Token found");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  //function to remove token from SecureStore
  export const removeToken = async () => {
    try {
      
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('name');

    } catch (error) {
      console.log(error);
    }
  };
  
  //Check Token expiration
  export const isTokenValid = async () => {
    const authToken = await getAuthToken();
  
    if (!authToken) {
      return false;
    }
    try {
      const decoded: any = jwtDecode(authToken);
      if (decoded.exp * 1000 < Date.now()) {
        //logout if token has expired
        await removeToken();
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  
  //get user name from SecureStore
  export const getUserName = async () => {
    try {
      const name = await SecureStore.getItemAsync('name');
      return name;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  export const getPlatformId = async () => {
    try {
      const platformId = await SecureStore.getItemAsync('platformId');
      return platformId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  const generateUUID = async () => {
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    return uuidv4({ random: randomBytes });
  };