const Sale = require('../models/sale.model');

class SaleController {
  constructor() {
    this.saleModel = new Sale();
  }

  // GET /api/ventas
  async getSales(req, res) {
    try {
      const { status, user_id, payment_method } = req.query;
      const sales = this.saleModel.findAll({ status, user_id, payment_method });
      
      res.json({
        success: true,
        data: sales,
        total: sales.length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // GET /api/ventas/:id
  async getSaleById(req, res) {
    try {
      const sale = this.saleModel.findById(req.params.id);
      
      if (!sale) {
        return res.status(404).json({ success: false, error: 'Venta no encontrada' });
      }
      
      res.json({ success: true, data: sale });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST /api/ventas
  async createSale(req, res) {
    try {
      const { user_id, address, products, payment_method } = req.body;
      
      if (!user_id || !address || !products || !payment_method) {
        return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
      }

      const newSale = this.saleModel.create({ user_id, address, products, payment_method });
      
      res.status(201).json({ success: true, data: newSale });
    } catch (error) {
      if (error.message.includes('Usuario no válido') || error.message.includes('Producto') || error.message.includes('Stock')) {
        return res.status(400).json({ success: false, error: error.message });
      }
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST /api/ventas/estadisticas
  async getStatistics(req, res) {
    try {
      const { start_date, end_date, user_id } = req.body;
      const statistics = this.saleModel.getStatistics({ start_date, end_date, user_id });
      
      res.json({ success: true, data: statistics });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // PUT /api/ventas/:id
  async updateSale(req, res) {
    try {
      const updatedSale = this.saleModel.update(req.params.id, req.body);
      
      if (!updatedSale) {
        return res.status(404).json({ success: false, error: 'Venta no encontrada' });
      }
      
      res.json({ success: true, data: updatedSale });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = SaleController;
