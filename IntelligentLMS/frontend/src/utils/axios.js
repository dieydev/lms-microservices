import axios from 'axios';

const instance = axios.create({
  // Port 5000 là cổng của gateway-1 trong Docker của Diey
  baseURL: 'http://localhost:5000', 
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Tự động đính kèm Token nếu có (cho auth-service)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;