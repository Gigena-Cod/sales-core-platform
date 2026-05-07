import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Services
export const productsAPI = {
  // Get all products with optional filters
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.featured !== undefined) params.append('featured', filters.featured);
    if (filters.search) params.append('search', filters.search);
    
    const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/api/categories');
    return response.data;
  },
};

export const usersAPI = {
  // Create new user
  createUser: async (userData) => {
    const response = await api.post('/api/users', userData);
    return response.data;
  },

  // User login
  login: async (credentials) => {
    const response = await api.post('/api/users/login', credentials);
    return response.data;
  },
};

export const salesAPI = {
  // Create new sale
  createSale: async (saleData) => {
    const response = await api.post('/api/sales', saleData);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
