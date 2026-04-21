const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar datos mock
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '../mock/productos.json'), 'utf8'));
const usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../mock/usuarios.json'), 'utf8'));
const ventas = JSON.parse(fs.readFileSync(path.join(__dirname, '../mock/ventas.json'), 'utf8'));

// Rutas para productos
app.get('/api/productos', (req, res) => {
  try {
    const { categoria, disponible, destacado } = req.query;
    let filteredProductos = productos;

    if (categoria) {
      filteredProductos = filteredProductos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }
    if (disponible !== undefined) {
      filteredProductos = filteredProductos.filter(p => p.disponible === (disponible === 'true'));
    }
    if (destacado !== undefined) {
      filteredProductos = filteredProductos.filter(p => p.destacado === (destacado === 'true'));
    }

    res.json({
      success: true,
      data: filteredProductos,
      total: filteredProductos.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/productos/:id', (req, res) => {
  try {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }
    res.json({ success: true, data: producto });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/productos', (req, res) => {
  try {
    const { nombre, desc, precio, imagen, stock, categoria, disponible, destacado, peso, garantia } = req.body;
    
    if (!nombre || !precio || !categoria) {
      return res.status(400).json({ success: false, error: 'Nombre, precio y categoría son obligatorios' });
    }

    const nuevoProducto = {
      id: Math.max(...productos.map(p => p.id)) + 1,
      nombre,
      desc: desc || '',
      precio: parseFloat(precio),
      imagen: imagen || '',
      stock: parseInt(stock) || 0,
      categoria,
      disponible: disponible !== undefined ? disponible : true,
      destacado: destacado || false,
      peso: parseFloat(peso) || 0,
      garantia: parseInt(garantia) || 12
    };

    productos.push(nuevoProducto);
    res.status(201).json({ success: true, data: nuevoProducto });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/productos/search', (req, res) => {
  try {
    const { query, precio_min, precio_max, categoria } = req.body;
    let filteredProductos = productos;

    if (query) {
      filteredProductos = filteredProductos.filter(p => 
        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (precio_min !== undefined) {
      filteredProductos = filteredProductos.filter(p => p.precio >= parseFloat(precio_min));
    }

    if (precio_max !== undefined) {
      filteredProductos = filteredProductos.filter(p => p.precio <= parseFloat(precio_max));
    }

    if (categoria) {
      filteredProductos = filteredProductos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    res.json({
      success: true,
      data: filteredProductos,
      total: filteredProductos.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/productos/:id', (req, res) => {
  try {
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }

    const productoActualizado = { ...productos[index], ...req.body };
    productos[index] = productoActualizado;

    res.json({ success: true, data: productoActualizado });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rutas para usuarios
app.get('/api/usuarios', (req, res) => {
  try {
    const { activo, premium } = req.query;
    let filteredUsuarios = usuarios;

    if (activo !== undefined) {
      filteredUsuarios = filteredUsuarios.filter(u => u.activo === (activo === 'true'));
    }

    if (premium !== undefined) {
      filteredUsuarios = filteredUsuarios.filter(u => u.premium === (premium === 'true'));
    }

    // No incluir contraseñas en la respuesta
    const usuariosSinPassword = filteredUsuarios.map(({ contraseña, ...usuario }) => usuario);

    res.json({
      success: true,
      data: usuariosSinPassword,
      total: usuariosSinPassword.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/usuarios/:id', (req, res) => {
  try {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    // No incluir contraseña en la respuesta
    const { contraseña, ...usuarioSinPassword } = usuario;
    res.json({ success: true, data: usuarioSinPassword });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/usuarios', (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, telefono } = req.body;
    
    if (!nombre || !apellido || !email || !contraseña) {
      return res.status(400).json({ success: false, error: 'Nombre, apellido, email y contraseña son obligatorios' });
    }

    // Verificar si el email ya existe
    const emailExistente = usuarios.find(u => u.email === email);
    if (emailExistente) {
      return res.status(400).json({ success: false, error: 'El email ya está registrado' });
    }

    const nuevoUsuario = {
      id: Math.max(...usuarios.map(u => u.id)) + 1,
      nombre,
      apellido,
      email,
      contraseña: `hashed_${contraseña}`, // En producción usar bcrypt
      activo: true,
      fecha_registro: new Date().toISOString().split('T')[0],
      telefono: telefono || '',
      premium: false
    };

    usuarios.push(nuevoUsuario);
    
    // No incluir contraseña en la respuesta
    const { contraseña: _, ...usuarioSinPassword } = nuevoUsuario;
    
    res.status(201).json({ success: true, data: usuarioSinPassword });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/usuarios/login', (req, res) => {
  try {
    const { email, contraseña } = req.body;
    
    if (!email || !contraseña) {
      return res.status(400).json({ success: false, error: 'Email y contraseña son obligatorios' });
    }

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario || !usuario.activo) {
      return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }

    // En producción verificar contraseña con bcrypt
    const { contraseña: _, ...usuarioSinPassword } = usuario;
    
    res.json({ success: true, data: usuarioSinPassword });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/usuarios/:id', (req, res) => {
  try {
    const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    // No permitir cambiar el email a uno existente
    if (req.body.email) {
      const emailExistente = usuarios.find(u => u.email === req.body.email && u.id !== parseInt(req.params.id));
      if (emailExistente) {
        return res.status(400).json({ success: false, error: 'El email ya está registrado' });
      }
    }

    const usuarioActualizado = { ...usuarios[index], ...req.body };
    usuarios[index] = usuarioActualizado;

    // No incluir contraseña en la respuesta
    const { contraseña, ...usuarioSinPassword } = usuarioActualizado;
    
    res.json({ success: true, data: usuarioSinPassword });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/usuarios/:id', (req, res) => {
  try {
    const usuarioId = parseInt(req.params.id);
    
    // Verificar si el usuario tiene ventas asociadas
    const ventasDelUsuario = ventas.filter(v => v.id_usuario === usuarioId);
    if (ventasDelUsuario.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No se puede eliminar el usuario porque tiene ventas asociadas. Elimine primero las ventas del usuario.' 
      });
    }

    const index = usuarios.findIndex(u => u.id === usuarioId);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    usuarios.splice(index, 1);
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rutas para ventas
app.get('/api/ventas', (req, res) => {
  try {
    const { estado, id_usuario, metodo_pago } = req.query;
    let filteredVentas = ventas;

    if (estado) {
      filteredVentas = filteredVentas.filter(v => v.estado === estado);
    }

    if (id_usuario) {
      filteredVentas = filteredVentas.filter(v => v.id_usuario === parseInt(id_usuario));
    }

    if (metodo_pago) {
      filteredVentas = filteredVentas.filter(v => v.metodo_pago === metodo_pago);
    }

    res.json({
      success: true,
      data: filteredVentas,
      total: filteredVentas.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/ventas/:id', (req, res) => {
  try {
    const venta = ventas.find(v => v.id === parseInt(req.params.id));
    if (!venta) {
      return res.status(404).json({ success: false, error: 'Venta no encontrada' });
    }
    res.json({ success: true, data: venta });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/ventas', (req, res) => {
  try {
    const { id_usuario, direccion, productos, metodo_pago } = req.body;
    
    if (!id_usuario || !direccion || !productos || !metodo_pago) {
      return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario existe y está activo
    const usuario = usuarios.find(u => u.id === parseInt(id_usuario));
    if (!usuario || !usuario.activo) {
      return res.status(400).json({ success: false, error: 'Usuario no válido o inactivo' });
    }

    // Verificar stock de productos y calcular total
    let total = 0;
    for (const item of productos) {
      const productoEncontrado = productos.find(p => p.id === item.id_producto);
      if (!productoEncontrado) {
        return res.status(400).json({ success: false, error: `Producto ${item.id_producto} no encontrado` });
      }
      if (productoEncontrado.stock < item.cantidad) {
        return res.status(400).json({ success: false, error: `Stock insuficiente para ${productoEncontrado.nombre}` });
      }
      item.precio_unitario = productoEncontrado.precio;
      item.subtotal = productoEncontrado.precio * item.cantidad;
      total += item.subtotal;
    }

    const nuevaVenta = {
      id: Math.max(...ventas.map(v => v.id)) + 1,
      id_usuario: parseInt(id_usuario),
      fecha: new Date().toISOString(),
      total,
      direccion,
      productos,
      metodo_pago,
      envio_gratis: total >= 500,
      estado: 'pendiente',
      codigo_seguimiento: `ARG${Date.now()}`
    };

    ventas.push(nuevaVenta);
    res.status(201).json({ success: true, data: nuevaVenta });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/ventas/estadisticas', (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, id_usuario } = req.body;
    
    let filteredVentas = ventas;
    
    if (fecha_inicio && fecha_fin) {
      filteredVentas = filteredVentas.filter(v => {
        const ventaDate = new Date(v.fecha);
        return ventaDate >= new Date(fecha_inicio) && ventaDate <= new Date(fecha_fin);
      });
    }

    if (id_usuario) {
      filteredVentas = filteredVentas.filter(v => v.id_usuario === parseInt(id_usuario));
    }

    const estadisticas = {
      total_ventas: filteredVentas.length,
      total_ingresos: filteredVentas.reduce((sum, v) => sum + v.total, 0),
      ventas_por_estado: filteredVentas.reduce((acc, v) => {
        acc[v.estado] = (acc[v.estado] || 0) + 1;
        return acc;
      }, {}),
      ventas_por_metodo_pago: filteredVentas.reduce((acc, v) => {
        acc[v.metodo_pago] = (acc[v.metodo_pago] || 0) + 1;
        return acc;
      }, {})
    };

    res.json({ success: true, data: estadisticas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/ventas/:id', (req, res) => {
  try {
    const index = ventas.findIndex(v => v.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Venta no encontrada' });
    }

    const ventaActualizada = { ...ventas[index], ...req.body };
    ventas[index] = ventaActualizada;

    res.json({ success: true, data: ventaActualizada });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sales Core Platform API',
    version: '1.0.0',
    endpoints: {
      productos: '/api/productos',
      usuarios: '/api/usuarios',
      ventas: '/api/ventas'
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Error interno del servidor' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});