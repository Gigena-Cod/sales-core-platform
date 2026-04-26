import express from 'express';
import ProductController from '../controllers/product.controller.js';

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

export default router;
