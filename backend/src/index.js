const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const saleRoutes = require('./routes/sale.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sales', saleRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sales Core Platform API - MVC Pattern',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      users: '/api/users',
      sales: '/api/sales'
    },
    architecture: {
      pattern: 'MVC (Model-View-Controller)',
      models: ['Product', 'User', 'Sale'],
      controllers: ['ProductController', 'UserController', 'SaleController'],
      routes: ['product.routes', 'user.routes', 'sale.routes']
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('MVC Pattern Architecture:');
  console.log('- Models: src/models/');
  console.log('- Controllers: src/controllers/');
  console.log('- Routes: src/routes/');
});
