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




// Save credits securely
export const setCredits = async (credits: number) => {
    try {
      await SecureStore.setItemAsync('userCredits', JSON.stringify(credits));
    } catch (error) {
      console.error("❌ Error saving credits:", error);
    }
  };
  
  // Retrieve credits securely
  export const getCredits = async (): Promise<number | null> => {
    try {
      const credits = await SecureStore.getItemAsync('userCredits');
      return credits ? JSON.parse(credits) : null;
    } catch (error) {
      console.error("❌ Error fetching credits:", error);
      return null;
    }
  };
  