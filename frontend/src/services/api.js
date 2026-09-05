import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        
        const response = await axios.post('/api/v1/auth/refresh', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/user/profile'),
};

export const mlApi = {
  recommendCrop: (data) => api.post('/ml/crop-recommendation', data),
  predictYield: (data) => api.post('/ml/yield-prediction', data),
  recommendFertilizer: (data) => api.post('/ml/fertilizer-recommendation', data),
};

export const marketApi = {
  getLatestPrices: (cropId) => api.get(`/market/prices/latest/${cropId}`),
  getPrices: (params) => api.get('/market/prices', { params }),
  getMandis: (params) => api.get('/market/mandis', { params }),
  getMarketChartData: (cropId, stateId, days = 15) => api.get('/market/prices/chart', { params: { cropId, stateId, days } })
};

export const aiApi = {
  chat: (message) => api.post('/ai/chat', { message }),
};

export const adminApi = {
  getAllUsers: () => api.get('/admin/users'),
  activateUser: (id) => api.post(`/admin/users/${id}/activate`),
  deactivateUser: (id) => api.post(`/admin/users/${id}/deactivate`),
  getStats: () => api.get('/admin/stats'),
};

export const farmerApi = {
  getLands: () => api.get('/farmer/lands'),
  addLand: (data) => api.post('/farmer/lands', data),
  getCrops: () => api.get('/farmer/crops'),
  addCrop: (data) => api.post('/farmer/crops', data),
};

export const cropApi = {
  getCategories: () => api.get('/crops/categories'),
  getCrops: (params) => api.get('/crops', { params }),
};

export const geographyApi = {
  getStates: () => api.get('/geography/states'),
  getDistricts: (stateId) => api.get(`/geography/states/${stateId}/districts`),
};

export default api;
