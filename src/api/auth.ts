import axios from "axios";
import { config } from "../utils/config";
import * as SecureStore from 'expo-secure-store';

export const loginUser= async(username:string, password:string)=>{
try {
    
    const response = await axios.post(`${config.server}/api/users/login`, {username, password});
    const data = response.data; 
    const token = data.token;  
    await saveToken(token);
} catch (error:any) {
    console.log(error.message);
}
}



export const saveToken = async (token:string)=>{
    try {
        
       await SecureStore.setItemAsync('userToken', token, {
        keychainAccessible:SecureStore.WHEN_UNLOCKED
       });
    } catch (error) {
        console.log(error);
        
    }
}


export const getAuthToken = async ()=>{
try{
    const token = await SecureStore.getItemAsync('userToken');
    if(token){
     console.log("Token from Secure Store", token);
     return token;
    }else{
        console.log("No Token found");
        
    }
}catch(error){
    console.log(error);
    
}
}


export const removeToken = async ()=>{
    try{
    await SecureStore.deleteItemAsync('userToken');
    console.log("Token Removed SuccessFully");
    
    }catch(error){
        console.log(error);   
    }
}



