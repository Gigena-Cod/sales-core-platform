import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

// Backend API URL
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3004';

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Helper function for backend requests
const backendRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${BACKEND_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Backend request error: ${method} ${endpoint}`, error.message);
    throw error;
  }
};

// BFF Routes - Optimized for Frontend

// Products
app.get('/api/products', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    let endpoint = '/api/products';
    
    if (search) {
      // Use search endpoint for text search
      const searchData = { query: search };
      if (category) searchData.category = category;
      const result = await backendRequest('POST', '/api/products/search', searchData);
      return res.json(result);
    }
    
    // Use filters for category and featured
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (featured !== undefined) params.append('featured', featured);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    const result = await backendRequest('GET', endpoint);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch products',
      message: error.message 
    });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const result = await backendRequest('GET', `/api/products/${req.params.id}`);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch product',
      message: error.message 
    });
  }
});

// Categories (extracted from products)
app.get('/api/categories', async (req, res) => {
  try {
    const result = await backendRequest('GET', '/api/products');
    
    if (result.success) {
      // Extract unique categories
      const categories = [...new Set(
        result.data.map(product => product.categoria).filter(Boolean)
      )].sort();
      
      res.json({
        success: true,
        data: categories,
        total: categories.length
      });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch categories',
      message: error.message 
    });
  }
});

// Users
app.post('/api/users', async (req, res) => {
  try {
    const result = await backendRequest('POST', '/api/users', req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create user',
      message: error.message 
    });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const result = await backendRequest('POST', '/api/users/login', req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Login failed',
      message: error.message 
    });
  }
});

// Sales
app.post('/api/sales', async (req, res) => {
  try {
    // Transform frontend cart to backend format
    const { user_id, address, payment_method, cart } = req.body;
    
    const saleData = {
      user_id: parseInt(user_id),
      address,
      payment_method,
      products: cart.map(item => ({
        id_producto: parseInt(item.id),
        cantidad: parseInt(item.quantity)
      }))
    };
    
    const result = await backendRequest('POST', '/api/sales', saleData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create sale',
      message: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'bff',
    timestamp: new Date().toISOString(),
    backend: BACKEND_URL
  });
});

// Serve static files (frontend React app)
app.use(express.static('../dist'));

// Catch all handler for SPA - serve React app
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../dist' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('BFF Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`BFF Server running on http://localhost:${PORT}`);
  console.log(`Backend API: ${BACKEND_URL}`);
  console.log('BFF Routes:');
  console.log('- GET /api/products - List products with filters');
  console.log('- GET /api/products/:id - Get product by ID');
  console.log('- GET /api/categories - Get product categories');
  console.log('- POST /api/users - Create user');
  console.log('- POST /api/users/login - User login');
  console.log('- POST /api/sales - Create sale');
});
