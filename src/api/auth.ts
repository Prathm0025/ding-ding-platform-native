import axios from "axios";
import { config } from "../utils/config";
import * as SecureStore from 'expo-secure-store';

//function to login user
export const loginUser = async (username: string, password: string) => {
    try {

        const response = await axios.post(`${config.server}/api/users/login`, { username, password });
        const data = response.data;
        const token = data.token;
       //save the token in secureStore after login
        await saveToken(token);
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



