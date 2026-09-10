import axios from 'axios';

const API = axios.create({
  baseURL: 'https://shop-ecommerce-backend.vercel.app', // Live Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;