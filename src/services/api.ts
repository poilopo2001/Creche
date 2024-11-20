import axios, { AxiosError, AxiosResponse } from 'axios';
import env from '../config/env';
import { ApiResponse, ApiError } from '../types/api';

const api = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(handleApiError(error));
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse<ApiResponse> => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await api.post('/auth/refresh', { refreshToken });
          const { token } = response.data;
          localStorage.setItem('token', token);
          
          // Retry the original request
          const config = error.config;
          if (config) {
            config.headers.Authorization = `Bearer ${token}`;
            return api(config);
          }
        } catch (refreshError) {
          // If refresh fails, logout
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        // No refresh token, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(handleApiError(error));
  }
);

const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || 'An error occurred',
      errors: error.response.data?.errors,
    };
  }
  if (error.request) {
    return {
      status: 0,
      message: 'No response received from server',
    };
  }
  return {
    status: 0,
    message: error.message || 'Unknown error occurred',
  };
};

export default api; 