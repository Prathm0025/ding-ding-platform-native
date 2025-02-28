import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import { api } from "../utils/utils";

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
        await SecureStore.setItemAsync('name',decoded.username)
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

export const getUserName= async () => {
    try {

        const name = await SecureStore.getItemAsync('name');
         return name;
    } catch (error) {
        console.log(error);

    }
}




