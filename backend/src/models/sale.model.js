const fs = require('fs');
const path = require('path');

class Sale {
  constructor() {
    this.sales = JSON.parse(fs.readFileSync(path.join(__dirname, '../../mock/ventas.json'), 'utf8'));
    this.products = JSON.parse(fs.readFileSync(path.join(__dirname, '../../mock/productos.json'), 'utf8'));
    this.users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../mock/usuarios.json'), 'utf8'));
  }

  findAll(filters = {}) {
    let filteredSales = this.sales;

    if (filters.status) {
      filteredSales = filteredSales.filter(v => v.estado === filters.status);
    }

    if (filters.user_id) {
      filteredSales = filteredSales.filter(v => v.id_usuario === parseInt(filters.user_id));
    }

    if (filters.payment_method) {
      filteredSales = filteredSales.filter(v => v.metodo_pago === filters.payment_method);
    }

    return filteredSales;
  }

  findById(id) {
    return this.sales.find(v => v.id === parseInt(id));
  }

  create(saleData) {
    // Verificar si el usuario existe y está activo
    const user = this.users.find(u => u.id === parseInt(saleData.user_id));
    if (!user || !user.activo) {
      throw new Error('Usuario no válido o inactivo');
    }

    // Verificar stock de productos y calcular total
    let total = 0;
    for (const item of saleData.products) {
      const product = this.products.find(p => p.id === item.product_id);
      if (!product) {
        throw new Error(`Producto ${item.product_id} no encontrado`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${product.nombre}`);
      }
      item.precio_unitario = product.precio;
      item.subtotal = product.precio * item.quantity;
      total += item.subtotal;
    }

    const newSale = {
      id: Math.max(...this.sales.map(v => v.id)) + 1,
      id_usuario: parseInt(saleData.user_id),
      fecha: new Date().toISOString(),
      total,
      direccion: saleData.address,
      productos: saleData.products,
      metodo_pago: saleData.payment_method,
      envio_gratis: total >= 500,
      estado: 'pendiente',
      codigo_seguimiento: `ARG${Date.now()}`
    };

    this.sales.push(newSale);
    return newSale;
  }

  update(id, saleData) {
    const index = this.sales.findIndex(v => v.id === parseInt(id));
    if (index === -1) return null;

    const updatedSale = { ...this.sales[index], ...saleData };
    this.sales[index] = updatedSale;
    return updatedSale;
  }

  getStatistics(criteria = {}) {
    let filteredSales = this.sales;
    
    if (criteria.start_date && criteria.end_date) {
      filteredSales = filteredSales.filter(v => {
        const saleDate = new Date(v.fecha);
        return saleDate >= new Date(criteria.start_date) && saleDate <= new Date(criteria.end_date);
      });
    }

    if (criteria.user_id) {
      filteredSales = filteredSales.filter(v => v.id_usuario === parseInt(criteria.user_id));
    }

    const statistics = {
      total_sales: filteredSales.length,
      total_revenue: filteredSales.reduce((sum, v) => sum + v.total, 0),
      sales_by_status: filteredSales.reduce((acc, v) => {
        acc[v.estado] = (acc[v.estado] || 0) + 1;
        return acc;
      }, {}),
      sales_by_payment_method: filteredSales.reduce((acc, v) => {
        acc[v.metodo_pago] = (acc[v.metodo_pago] || 0) + 1;
        return acc;
      }, {})
    };

    return statistics;
  }
}

module.exports = Sale;
