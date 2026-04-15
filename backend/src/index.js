const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const productosRoutes = require('./routes/productos');
const ventasRoutes = require('./routes/ventas');

// Importar middleware
const errorHandler = require('./middleware/errorHandler');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// Middleware de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8080'],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, './mock')));

// Rutas principales
app.get('/', (req, res) => {
  res.json({
    message: 'TP Aplicaciones Web 2 - Sales Core Platform API',
    version: '1.0.0',
    endpoints: {
      usuarios: '/api/usuarios',
      productos: '/api/productos',
      ventas: '/api/ventas'
    }
  });
});

// Rutas de la API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);

// Ruta para health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en esta API`,
    availableRoutes: [
      'GET /api/usuarios',
      'POST /api/usuarios',
      'PUT /api/usuarios/:id',
      'DELETE /api/usuarios/:id',
      'GET /api/productos',
      'POST /api/productos',
      'PUT /api/productos/:id',
      'GET /api/ventas',
      'POST /api/ventas',
      'PUT /api/ventas/:id'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n=== TP Aplicaciones Web 2 - Sales Core Platform API ===`);
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Documentación: http://localhost:${PORT}/api`);
  console.log(`\nRutas disponibles:`);
  console.log(`  GET  /api/usuarios - Obtener todos los usuarios`);
  console.log(`  GET  /api/usuarios/:id - Obtener usuario por ID`);
  console.log(`  POST /api/usuarios - Crear nuevo usuario`);
  console.log(`  PUT  /api/usuarios/:id - Actualizar usuario`);
  console.log(`  DELETE /api/usuarios/:id - Eliminar usuario`);
  console.log(`  GET  /api/productos - Obtener todos los productos`);
  console.log(`  GET  /api/productos/categoria/:categoria - Filtrar por categoría`);
  console.log(`  POST /api/productos - Crear nuevo producto`);
  console.log(`  PUT  /api/productos/:id - Actualizar producto`);
  console.log(`  GET  /api/ventas - Obtener todas las ventas`);
  console.log(`  GET  /api/ventas/usuario/:id - Obtener ventas por usuario`);
  console.log(`  POST /api/ventas - Crear nueva venta`);
  console.log(`  PUT  /api/ventas/:id - Actualizar venta`);
  console.log(`\n=== Servidor iniciado ===\n`);
});

module.exports = app;