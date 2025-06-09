// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Use a porta correta da sua API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;