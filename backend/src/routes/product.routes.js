const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();
const productController = new ProductController();

// GET /api/productos
router.get('/', productController.getProducts.bind(productController));

// GET /api/productos/:id
router.get('/:id', productController.getProductById.bind(productController));

// POST /api/productos
router.post('/', productController.createProduct.bind(productController));

// POST /api/productos/search
router.post('/search', productController.searchProducts.bind(productController));

// PUT /api/productos/:id
router.put('/:id', productController.updateProduct.bind(productController));

module.exports = router;
