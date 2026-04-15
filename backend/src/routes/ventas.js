const express = require('express');
const router = express.Router();

// Importar datos mock
const ventas = require('../../mock/ventas.json');
const usuarios = require('../../mock/usuarios.json');
const productos = require('../../mock/productos.json');

// Middleware para validar datos de venta
const validarVenta = (req, res, next) => {
  const { id_usuario, direccion, productos: productosVenta, metodo_pago } = req.body;
  
  if (!id_usuario || !direccion || !productosVenta || !metodo_pago) {
    return res.status(400).json({
      error: 'Datos incompletos',
      message: 'Todos los campos son obligatorios: id_usuario, direccion, productos, metodo_pago'
    });
  }
  
  if (!Array.isArray(productosVenta) || productosVenta.length === 0) {
    return res.status(400).json({
      error: 'Productos inválidos',
      message: 'productos debe ser un array con al menos un elemento'
    });
  }
  
  next();
};

// Middleware para verificar si una venta existe
const verificarVentaExistente = (req, res, next) => {
  const id = parseInt(req.params.id);
  const venta = ventas.find(v => v.id === id);
  
  if (!venta) {
    return res.status(404).json({
      error: 'Venta no encontrada',
      message: `No existe una venta con el ID ${id}`
    });
  }
  
  req.venta = venta;
  next();
};

// Middleware para validar integridad de productos en una venta
const validarIntegridadProductos = (req, res, next) => {
  const productosVenta = req.body.productos;
  const productosIds = productosVenta.map(p => p.id_producto);
  
  // Verificar que todos los productos existan
  const productosNoExisten = productosIds.filter(id => 
    !productos.find(p => p.id === id)
  );
  
  if (productosNoExisten.length > 0) {
    return res.status(400).json({
      error: 'Productos no encontrados',
      message: 'Los siguientes productos no existen en el catálogo',
      productosNoExisten: productosNoExisten
    });
  }
  
  // Verificar stock disponible
  const productosSinStock = productosVenta.filter(item => {
    const producto = productos.find(p => p.id === item.id_producto);
    return producto.stock < item.cantidad;
  });
  
  if (productosSinStock.length > 0) {
    return res.status(400).json({
      error: 'Stock insuficiente',
      message: 'Los siguientes productos no tienen stock suficiente',
      productosSinStock: productosSinStock.map(item => {
        const producto = productos.find(p => p.id === item.id_producto);
        return {
          id_producto: item.id_producto,
          nombre: producto.nombre,
          stock_disponible: producto.stock,
          cantidad_requerida: item.cantidad
        };
      })
    });
  }
  
  next();
};

// GET /api/ventas - Obtener todas las ventas
router.get('/', (req, res) => {
  try {
    res.json({
      message: 'Ventas obtenidas correctamente',
      total: ventas.length,
      data: ventas
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener ventas',
      message: error.message
    });
  }
});

// GET /api/ventas/usuario/:id - Obtener ventas por usuario
router.get('/usuario/:id', (req, res) => {
  try {
    const idUsuario = parseInt(req.params.id);
    
    // Verificar si el usuario existe
    const usuario = usuarios.find(u => u.id === idUsuario);
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: `No existe un usuario con el ID ${idUsuario}`
      });
    }
    
    // Obtener ventas del usuario
    const ventasUsuario = ventas.filter(v => v.id_usuario === idUsuario);
    
    res.json({
      message: `Ventas del usuario ${idUsuario} obtenidas correctamente`,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      },
      total: ventasUsuario.length,
      data: ventasUsuario
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener ventas del usuario',
      message: error.message
    });
  }
});

// GET /api/ventas/estado/:estado - Obtener ventas por estado
router.get('/estado/:estado', (req, res) => {
  try {
    const estado = req.params.estado;
    const estadosValidos = ['completado', 'pendiente', 'en_proceso', 'cancelado'];
    
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        error: 'Estado inválido',
        message: `El estado "${estado}" no es válido`,
        estadosValidos: estadosValidos
      });
    }
    
    const ventasPorEstado = ventas.filter(v => v.estado === estado);
    
    res.json({
      message: `Ventas con estado "${estado}" obtenidas correctamente`,
      estado: estado,
      total: ventasPorEstado.length,
      data: ventasPorEstado
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener ventas por estado',
      message: error.message
    });
  }
});

// GET /api/ventas/:id - Obtener venta por ID
router.get('/:id', verificarVentaExistente, (req, res) => {
  try {
    // Enriquecer la respuesta con información del usuario y productos
    const venta = req.venta;
    const usuario = usuarios.find(u => u.id === venta.id_usuario);
    const productosConDetalles = venta.productos.map(item => {
      const producto = productos.find(p => p.id === item.id_producto);
      return {
        ...item,
        nombre_producto: producto.nombre,
        categoria: producto.categoria
      };
    });
    
    res.json({
      message: 'Venta obtenida correctamente',
      data: {
        ...venta,
        productos: productosConDetalles,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener venta',
      message: error.message
    });
  }
});

// POST /api/ventas - Crear nueva venta
router.post('/', validarVenta, validarIntegridadProductos, (req, res) => {
  try {
    const { id_usuario, direccion, productos: productosVenta, metodo_pago, envio_gratis } = req.body;
    
    // Verificar si el usuario existe
    const usuario = usuarios.find(u => u.id === id_usuario);
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: `No existe un usuario con el ID ${id_usuario}`
      });
    }
    
    // Calcular el total de la venta
    let total = 0;
    const productosConSubtotal = productosVenta.map(item => {
      const producto = productos.find(p => p.id === item.id_producto);
      const subtotal = item.cantidad * producto.precio;
      total += subtotal;
      
      return {
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
        subtotal: subtotal
      };
    });
    
    // Crear nueva venta
    const nuevoId = Math.max(...ventas.map(v => v.id)) + 1;
    const nuevaVenta = {
      id: nuevoId,
      id_usuario: id_usuario,
      fecha: new Date().toISOString(),
      total: total,
      direccion: direccion.trim(),
      productos: productosConSubtotal,
      metodo_pago: metodo_pago.trim(),
      envio_gratis: Boolean(envio_gratis),
      estado: 'pendiente',
      codigo_seguimiento: null
    };
    
    res.status(201).json({
      message: 'Venta creada correctamente',
      data: nuevaVenta
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear venta',
      message: error.message
    });
  }
});

// PUT /api/ventas/:id - Actualizar venta existente
router.put('/:id', verificarVentaExistente, (req, res) => {
  try {
    const { direccion, estado, metodo_pago, envio_gratis } = req.body;
    const ventaActualizada = { ...req.venta };
    
    // Actualizar solo los campos proporcionados
    if (direccion !== undefined) ventaActualizada.direccion = direccion.trim();
    if (estado !== undefined) {
      const estadosValidos = ['completado', 'pendiente', 'en_proceso', 'cancelado'];
      if (!estadosValidos.includes(estado)) {
        return res.status(400).json({
          error: 'Estado inválido',
          message: `El estado "${estado}" no es válido`,
          estadosValidos: estadosValidos
        });
      }
      ventaActualizada.estado = estado;
      
      // Si se completa la venta, generar código de seguimiento
      if (estado === 'completado' && !ventaActualizada.codigo_seguimiento) {
        ventaActualizada.codigo_seguimiento = `ARG${Date.now()}${Math.floor(Math.random() * 1000)}`;
      }
    }
    if (metodo_pago !== undefined) ventaActualizada.metodo_pago = metodo_pago.trim();
    if (envio_gratis !== undefined) ventaActualizada.envio_gratis = Boolean(envio_gratis);
    
    res.json({
      message: 'Venta actualizada correctamente',
      data: ventaActualizada
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar venta',
      message: error.message
    });
  }
});

module.exports = router;
