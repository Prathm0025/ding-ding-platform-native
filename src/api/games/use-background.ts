import { client } from '../common';

//
export const useBackground = async (isBack: boolean) => {
  try {
    const response = await client.post('api/app/background', {
      isBack: isBack,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting background status:', error);
    throw error;
  }
};
