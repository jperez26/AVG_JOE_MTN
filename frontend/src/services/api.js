import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  },
};

// Summits API
export const summitsAPI = {
  getAll: async (type = null) => {
    const params = type ? { type } : {};
    const response = await apiClient.get('/summits', { params });
    return response.data;
  },
  getOne: async (id) => {
    const response = await apiClient.get(`/summits/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/summits', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/summits/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/summits/${id}`);
    return response.data;
  },
};

// Gear API
export const gearAPI = {
  getAll: async (category = null) => {
    const params = category ? { category } : {};
    const response = await apiClient.get('/gear', { params });
    return response.data;
  },
  getOne: async (id) => {
    const response = await apiClient.get(`/gear/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/gear', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/gear/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/gear/${id}`);
    return response.data;
  },
};

// Gallery API
export const galleryAPI = {
  getAll: async () => {
    const response = await apiClient.get('/gallery');
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/gallery', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/gallery/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/gallery/${id}`);
    return response.data;
  },
};

// Stats API
export const statsAPI = {
  get: async () => {
    const response = await apiClient.get('/stats');
    return response.data;
  },
};
