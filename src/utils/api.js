// api.js
const API_URL = 'http://152.58.156.220:5000';  // Mobile's public IP

export const getRestaurants = async () => {
  try {
    const response = await fetch(`${API_URL}/api/restaurants`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};
