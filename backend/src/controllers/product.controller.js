const Product = require('../models/product.model');

class ProductController {
  constructor() {
    this.productModel = new Product();
  }

  // GET /api/productos
  async getProducts(req, res) {
    try {
      const { category, available, featured } = req.query;
      const products = this.productModel.findAll({ category, available, featured });
      
      res.json({
        success: true,
        data: products,
        total: products.length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // GET /api/productos/:id
  async getProductById(req, res) {
    try {
      const product = this.productModel.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }
      
      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST /api/productos
  async createProduct(req, res) {
    try {
      const { nombre, desc, precio, imagen, stock, categoria, available, featured, peso, garantia } = req.body;
      
      if (!nombre || !precio || !categoria) {
        return res.status(400).json({ success: false, error: 'Nombre, precio y categoría son obligatorios' });
      }

      const newProduct = this.productModel.create({
        nombre, desc, precio, imagen, stock, categoria, available, featured, peso, garantia
      });
      
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST /api/productos/search
  async searchProducts(req, res) {
    try {
      const { query, price_min, price_max, category } = req.body;
      const products = this.productModel.search({ query, price_min, price_max, category });
      
      res.json({
        success: true,
        data: products,
        total: products.length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // PUT /api/productos/:id
  async updateProduct(req, res) {
    try {
      const updatedProduct = this.productModel.update(req.params.id, req.body);
      
      if (!updatedProduct) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }
      
      res.json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ProductController;
