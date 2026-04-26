import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Product {
  constructor() {
    this.products = JSON.parse(fs.readFileSync(path.join(__dirname, '../../mock/productos.json'), 'utf8'));
  }

  findAll(filters = {}) {
    let filteredProducts = this.products;

    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.categoria.toLowerCase() === filters.category.toLowerCase()
      );
    }
    if (filters.available !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        p.disponible === (filters.available === 'true')
      );
    }
    if (filters.featured !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        p.destacado === (filters.featured === 'true')
      );
    }

    return filteredProducts;
  }

  findById(id) {
    return this.products.find(p => p.id === parseInt(id));
  }

  search(criteria) {
    let filteredProducts = this.products;

    if (criteria.query) {
      filteredProducts = filteredProducts.filter(p => 
        p.nombre.toLowerCase().includes(criteria.query.toLowerCase()) ||
        p.desc.toLowerCase().includes(criteria.query.toLowerCase())
      );
    }

    if (criteria.price_min !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        p.precio >= parseFloat(criteria.price_min)
      );
    }

    if (criteria.price_max !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        p.precio <= parseFloat(criteria.price_max)
      );
    }

    if (criteria.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.categoria.toLowerCase() === criteria.category.toLowerCase()
      );
    }

    return filteredProducts;
  }

  create(productData) {
    const newProduct = {
      id: Math.max(...this.products.map(p => p.id)) + 1,
      nombre: productData.nombre,
      desc: productData.desc || '',
      precio: parseFloat(productData.precio),
      imagen: productData.imagen || '',
      stock: parseInt(productData.stock) || 0,
      categoria: productData.categoria,
      disponible: productData.available !== undefined ? productData.available : true,
      destacado: productData.featured || false,
      peso: parseFloat(productData.peso) || 0,
      garantia: parseInt(productData.garantia) || 12
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id, productData) {
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;

    const updatedProduct = { ...this.products[index], ...productData };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }
}

export default Product;
