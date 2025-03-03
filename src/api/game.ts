import { config } from "../utils/config";
import { api } from "../utils/utils";

export async function fetchGames(category: string = "all") {
    try {
      const response = await api.get(`/api/games?platform=${config.platform}&category=${category}`);      
      const data = response.data;      
      return data;
    } catch (error) {
        console.log(error);
        
        console.error(error);
    }
  };
  