const express = require('express');
const SaleController = require('../controllers/sale.controller');

const router = express.Router();
const saleController = new SaleController();

// GET /api/ventas
router.get('/', saleController.getSales.bind(saleController));

// GET /api/ventas/:id
router.get('/:id', saleController.getSaleById.bind(saleController));

// POST /api/ventas
router.post('/', saleController.createSale.bind(saleController));

// POST /api/ventas/estadisticas
router.post('/estadisticas', saleController.getStatistics.bind(saleController));

// PUT /api/ventas/:id
router.put('/:id', saleController.updateSale.bind(saleController));

module.exports = router;
