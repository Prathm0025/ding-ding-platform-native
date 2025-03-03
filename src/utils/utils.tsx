import axios from "axios";
import { config } from "./config";
import * as SecureStore from 'expo-secure-store';

//axios configure
//create api base

export const api = axios.create({
  baseURL:config.server ,
});

//configure token
api.interceptors.request.use(async (config) =>{
    const token = await SecureStore.getItemAsync('userToken'); 
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})



