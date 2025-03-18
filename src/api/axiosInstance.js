import axios from "axios";
import { logout } from "./../store/authSLice"; 
import store from "../store/store";



export const ax = axios.create({
    baseURL : import.meta.env.VITE_API_BACKEND,
    headers: { "Content-Type": "application/json" },
})

ax.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, (error) => {
    return Promise.reject(error);
})


ax.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        store.dispatch(logout()); 
      }
      return Promise.reject(error);
    }
  );
  

export const register = async (authData) => {
    const { data } = await ax.post('/register',authData);
    return data;
}

export const login = async (authData) => {
    const { data } = await ax.post('/login', authData);
    return data;
}

export const resetPassword = async (dataUser) => {
    try {
        const { data } = await ax.post('/forgot-password',dataUser )
        return data
    } catch (error) {
        throw error?.response?.data || error 
    }
}