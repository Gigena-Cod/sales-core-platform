const express = require('express');
const router = express.Router();

// Importar datos mock
const productos = require('../../mock/productos.json');

// Middleware para validar datos de producto
const validarProducto = (req, res, next) => {
  const { nombre, desc, precio, stock, categoria } = req.body;
  
  if (!nombre || !desc || !precio || !stock || !categoria) {
    return res.status(400).json({
      error: 'Datos incompletos',
      message: 'Todos los campos son obligatorios: nombre, desc, precio, stock, categoria'
    });
  }
  
  if (typeof nombre !== 'string' || typeof desc !== 'string' || typeof categoria !== 'string') {
    return res.status(400).json({
      error: 'Tipos de datos inválidos',
      message: 'nombre, desc y categoria deben ser strings'
    });
  }
  
  if (typeof precio !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({
      error: 'Tipos de datos inválidos',
      message: 'precio y stock deben ser numbers'
    });
  }
  
  if (precio <= 0) {
    return res.status(400).json({
      error: 'Precio inválido',
      message: 'El precio debe ser mayor a 0'
    });
  }
  
  if (stock < 0) {
    return res.status(400).json({
      error: 'Stock inválido',
      message: 'El stock no puede ser negativo'
    });
  }
  
  next();
};

// Middleware para verificar si un producto existe
const verificarProductoExistente = (req, res, next) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  
  if (!producto) {
    return res.status(404).json({
      error: 'Producto no encontrado',
      message: `No existe un producto con el ID ${id}`
    });
  }
  
  req.producto = producto;
  next();
};

// GET /api/productos - Obtener todos los productos
router.get('/', (req, res) => {
  try {
    res.json({
      message: 'Productos obtenidos correctamente',
      total: productos.length,
      data: productos
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener productos',
      message: error.message
    });
  }
});

// GET /api/productos/categoria/:categoria - Filtrar productos por categoría
router.get('/categoria/:categoria', (req, res) => {
  try {
    const categoria = req.params.categoria.toLowerCase();
    const productosFiltrados = productos.filter(p => 
      p.categoria.toLowerCase() === categoria
    );
    
    if (productosFiltrados.length === 0) {
      return res.status(404).json({
        error: 'Categoría no encontrada',
        message: `No existen productos en la categoría "${categoria}"`,
        categoriasDisponibles: [...new Set(productos.map(p => p.categoria))]
      });
    }
    
    res.json({
      message: `Productos de la categoría "${categoria}" obtenidos correctamente`,
      categoria: categoria,
      total: productosFiltrados.length,
      data: productosFiltrados
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al filtrar productos por categoría',
      message: error.message
    });
  }
});

// GET /api/productos/disponibles - Obtener solo productos disponibles
router.get('/disponibles', (req, res) => {
  try {
    const productosDisponibles = productos.filter(p => p.disponible && p.stock > 0);
    
    res.json({
      message: 'Productos disponibles obtenidos correctamente',
      total: productosDisponibles.length,
      data: productosDisponibles
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener productos disponibles',
      message: error.message
    });
  }
});

// GET /api/productos/destacados - Obtener productos destacados
router.get('/destacados', (req, res) => {
  try {
    const productosDestacados = productos.filter(p => p.destacado && p.disponible);
    
    res.json({
      message: 'Productos destacados obtenidos correctamente',
      total: productosDestacados.length,
      data: productosDestacados
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener productos destacados',
      message: error.message
    });
  }
});

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', verificarProductoExistente, (req, res) => {
  try {
    res.json({
      message: 'Producto obtenido correctamente',
      data: req.producto
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener producto',
      message: error.message
    });
  }
});

// POST /api/productos - Crear nuevo producto
router.post('/', validarProducto, (req, res) => {
  try {
    const { nombre, desc, precio, imagen, stock, categoria, peso, garantia } = req.body;
    
    // Crear nuevo producto
    const nuevoId = Math.max(...productos.map(p => p.id)) + 1;
    const nuevoProducto = {
      id: nuevoId,
      nombre: nombre.trim(),
      desc: desc.trim(),
      precio: precio,
      imagen: imagen ? imagen.trim() : `https://example.com/images/producto-${nuevoId}.jpg`,
      stock: stock,
      categoria: categoria.trim(),
      disponible: true,
      destacado: false,
      peso: peso ? peso : 1.0,
      garantia: garantia ? garantia : 12
    };
    
    res.status(201).json({
      message: 'Producto creado correctamente',
      data: nuevoProducto
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear producto',
      message: error.message
    });
  }
});

// PUT /api/productos/:id - Actualizar producto existente
router.put('/:id', verificarProductoExistente, (req, res) => {
  try {
    const { nombre, desc, precio, stock, categoria, disponible, destacado } = req.body;
    const productoActualizado = { ...req.producto };
    
    // Actualizar solo los campos proporcionados
    if (nombre !== undefined) productoActualizado.nombre = nombre.trim();
    if (desc !== undefined) productoActualizado.desc = desc.trim();
    if (precio !== undefined) {
      if (precio <= 0) {
        return res.status(400).json({
          error: 'Precio inválido',
          message: 'El precio debe ser mayor a 0'
        });
      }
      productoActualizado.precio = precio;
    }
    if (stock !== undefined) {
      if (stock < 0) {
        return res.status(400).json({
          error: 'Stock inválido',
          message: 'El stock no puede ser negativo'
        });
      }
      productoActualizado.stock = stock;
    }
    if (categoria !== undefined) productoActualizado.categoria = categoria.trim();
    if (disponible !== undefined) productoActualizado.disponible = Boolean(disponible);
    if (destacado !== undefined) productoActualizado.destacado = Boolean(destacado);
    
    res.json({
      message: 'Producto actualizado correctamente',
      data: productoActualizado
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar producto',
      message: error.message
    });
  }
});

module.exports = router;
