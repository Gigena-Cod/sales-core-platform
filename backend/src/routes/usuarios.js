const express = require('express');
const router = express.Router();

// Importar datos mock
const usuarios = require('../../mock/usuarios.json');
const ventas = require('../../mock/ventas.json');

// Middleware para validar datos de usuario
const validarUsuario = (req, res, next) => {
  const { nombre, apellido, email, contraseña } = req.body;
  
  if (!nombre || !apellido || !email || !contraseña) {
    return res.status(400).json({
      error: 'Datos incompletos',
      message: 'Todos los campos son obligatorios: nombre, apellido, email, contraseña'
    });
  }
  
  if (typeof nombre !== 'string' || typeof apellido !== 'string' || typeof email !== 'string' || typeof contraseña !== 'string') {
    return res.status(400).json({
      error: 'Tipos de datos inválidos',
      message: 'nombre, apellido, email y contraseña deben ser strings'
    });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({
      error: 'Email inválido',
      message: 'El email debe contener el símbolo @'
    });
  }
  
  next();
};

// Middleware para verificar si un usuario existe
const verificarUsuarioExistente = (req, res, next) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  if (!usuario) {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      message: `No existe un usuario con el ID ${id}`
    });
  }
  
  req.usuario = usuario;
  next();
};

// Middleware para verificar integridad de datos al eliminar
const verificarIntegridadUsuario = (req, res, next) => {
  const id = parseInt(req.params.id);
  
  // Verificar si el usuario tiene ventas asociadas
  const ventasAsociadas = ventas.filter(v => v.id_usuario === id);
  
  if (ventasAsociadas.length > 0) {
    return res.status(400).json({
      error: 'Error de integridad de datos',
      message: `No se puede eliminar el usuario ${id} porque tiene ${ventasAsociadas.length} ventas asociadas`,
      ventasAsociadas: ventasAsociadas.map(v => ({
        id_venta: v.id,
        fecha: v.fecha,
        total: v.total
      }))
    });
  }
  
  next();
};

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', (req, res) => {
  try {
    res.json({
      message: 'Usuarios obtenidos correctamente',
      total: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener usuarios',
      message: error.message
    });
  }
});

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', verificarUsuarioExistente, (req, res) => {
  try {
    res.json({
      message: 'Usuario obtenido correctamente',
      data: req.usuario
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener usuario',
      message: error.message
    });
  }
});

// POST /api/usuarios - Crear nuevo usuario
router.post('/', validarUsuario, (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, telefono } = req.body;
    
    // Verificar si el email ya existe
    const emailExistente = usuarios.find(u => u.email === email);
    if (emailExistente) {
      return res.status(400).json({
        error: 'Email ya existente',
        message: `El email ${email} ya está registrado`
      });
    }
    
    // Crear nuevo usuario
    const nuevoId = Math.max(...usuarios.map(u => u.id)) + 1;
    const nuevoUsuario = {
      id: nuevoId,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim().toLowerCase(),
      contraseña: contraseña, // En producción, debería estar hasheado
      activo: true,
      fecha_registro: new Date().toISOString().split('T')[0],
      telefono: telefono ? telefono.trim() : '',
      premium: false
    };
    
    res.status(201).json({
      message: 'Usuario creado correctamente',
      data: nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear usuario',
      message: error.message
    });
  }
});

// PUT /api/usuarios/:id - Actualizar usuario existente
router.put('/:id', verificarUsuarioExistente, (req, res) => {
  try {
    const { nombre, apellido, email, telefono, premium } = req.body;
    const usuarioActualizado = { ...req.usuario };
    
    // Actualizar solo los campos proporcionados
    if (nombre !== undefined) usuarioActualizado.nombre = nombre.trim();
    if (apellido !== undefined) usuarioActualizado.apellido = apellido.trim();
    if (email !== undefined) {
      if (!email.includes('@')) {
        return res.status(400).json({
          error: 'Email inválido',
          message: 'El email debe contener el símbolo @'
        });
      }
      usuarioActualizado.email = email.trim().toLowerCase();
    }
    if (telefono !== undefined) usuarioActualizado.telefono = telefono.trim();
    if (premium !== undefined) usuarioActualizado.premium = Boolean(premium);
    
    res.json({
      message: 'Usuario actualizado correctamente',
      data: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar usuario',
      message: error.message
    });
  }
});

// DELETE /api/usuarios/:id - Eliminar usuario (con verificación de integridad)
router.delete('/:id', verificarUsuarioExistente, verificarIntegridadUsuario, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // En una aplicación real, aquí se eliminaría el usuario de la base de datos
    // Por ahora, simulamos la eliminación
    
    res.json({
      message: `Usuario ${id} eliminado correctamente`,
      data: {
        id: id,
        nombre: req.usuario.nombre,
        email: req.usuario.email,
        eliminado: true
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar usuario',
      message: error.message
    });
  }
});

module.exports = router;
