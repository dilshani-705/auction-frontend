// ItemServices.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/item'; // Update with your backend API base URL

export const addItemToDatabase = async (itemData) => {
  try {
    const response = await axios.post(`${BASE_URL}/items`, itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/upload/image`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

