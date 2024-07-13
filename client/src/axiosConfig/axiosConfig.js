// axiosConfig.js

import axios from 'axios';

// Get the access token from localStorage (or any other storage method)
const accessToken = localStorage.getItem('accessToken');

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
});

// Set the Authorization header for every request
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export default axiosInstance;