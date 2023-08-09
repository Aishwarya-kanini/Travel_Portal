// HotelService.js
import axios from 'axios';

const API_URL = 'https://localhost:7134/api/Hotel'; // Replace with your API endpoint URL

const HotelService = {
  getHotels: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
};

export default HotelService;
