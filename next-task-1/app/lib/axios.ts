import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001', 
  withCredentials: true, // ✅ keep cookies for session auth
});
