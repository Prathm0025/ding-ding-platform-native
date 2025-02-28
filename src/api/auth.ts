import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import { api } from "../utils/utils";
import * as Crypto from "expo-crypto";
import { v4 as uuidv4 } from "uuid";

//function to login user
export const loginUser = async (username: string, password: string) => {
    try {

        const response = await api.post(`/api/users/login`, { username, password });
        const data = response.data;
        const token = data.token;
        //save the token in secureStore after login
        await saveToken(token);
        console.log(await isTokenValid());

        return data;
    } catch (error: any) {
        console.log(error.message);
    }
}


//function to save token in superStore
export const saveToken = async (token: string) => {
    try {

        await SecureStore.setItemAsync('userToken', token, {
            // only accessible when device in unlocked
            keychainAccessible: SecureStore.WHEN_UNLOCKED
        });
        const decoded: any = jwtDecode(token);
        let platformId = await generateUUID();
        console.log(platformId)          
        await SecureStore.setItemAsync('name',decoded.username);
        await SecureStore.setItemAsync("platformId", platformId);
    } catch (error) {
        console.log(error);

    }
}


//function to get token from superStore
export const getAuthToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
            // console.log("Token from Secure Store", token);
            return token;
        } else {
            console.log("No Token found");
        }
    } catch (error) {
        console.log(error);

    }
}

//function to remove token from superStore
export const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync('userToken');
        // console.log("Token Removed SuccessFully");

    } catch (error) {
        console.log(error);
    }
}


//Check Token expiration

export const isTokenValid = async () => {

    const authTokn = await getAuthToken();

    if (!authTokn) {
        return false;
    }
    try {
        const decoded: any = jwtDecode(authTokn);
        if (decoded.exp * 1000 < Date.now()) {
            //logout if token has expired
            await removeToken();
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);

    }


}

//get user name from super store
export const getUserName= async () => {
    try {
        const name = await SecureStore.getItemAsync('name');
         return name;
    } catch (error) {
        console.log(error);

    }
}

export const getPlatformId = async () =>{
 try {
    const platformId = await SecureStore.getItemAsync('platformId');
    return platformId;
 } catch (error) {
    
 }   
}




const generateUUID = async () => {
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    return uuidv4({ random: randomBytes });
  };
  