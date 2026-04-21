const User = require('../models/user.model');

class UserController {
  constructor() {
    this.userModel = new User();
  }

  // GET /api/usuarios
  async getUsers(req, res) {
    try {
      const { active, premium } = req.query;
      const users = this.userModel.findAll({ active, premium });
      
      res.json({
        success: true,
        data: users,
        total: users.length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // GET /api/usuarios/:id
  async getUserById(req, res) {
    try {
      const user = this.userModel.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }
      
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST /api/usuarios
  async createUser(req, res) {
    try {
      const { nombre, apellido, email, contraseña, telefono } = req.body;
      
      if (!nombre || !apellido || !email || !contraseña) {
        return res.status(400).json({ success: false, error: 'Nombre, apellido, email y contraseña son obligatorios' });
      }

      // Verificar si el email ya existe
      const emailExistente = this.userModel.findByEmail(email);
      if (emailExistente) {
        return res.status(400).json({ success: false, error: 'El email ya está registrado' });
      }

      const newUser = this.userModel.create({ nombre, apellido, email, contraseña, telefono });
      
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST /api/usuarios/login
  async login(req, res) {
    try {
      const { email, contraseña } = req.body;
      
      if (!email || !contraseña) {
        return res.status(400).json({ success: false, error: 'Email y contraseña son obligatorios' });
      }

      const usuario = this.usuarioModel.findByEmail(email);
      if (!usuario || !usuario.activo) {
        return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
      }

      // En producción verificar contraseña con bcrypt
      const { contraseña: _, ...usuarioSinPassword } = usuario;
      
      res.json({ success: true, data: usuarioSinPassword });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // PUT /api/usuarios/:id
  async updateUser(req, res) {
    try {
      // No permitir cambiar el email a uno existente
      if (req.body.email) {
        const emailExistente = this.userModel.findByEmail(req.body.email);
        if (emailExistente && emailExistente.id !== parseInt(req.params.id)) {
          return res.status(400).json({ success: false, error: 'El email ya está registrado' });
        }
      }

      const updatedUser = this.userModel.update(req.params.id, req.body);
      
      if (!updatedUser) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }
      
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // DELETE /api/usuarios/:id
  async deleteUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      
      // Verificar si el usuario tiene ventas asociadas
      const hasSales = this.userModel.hasRelatedSales(userId);
      if (hasSales) {
        return res.status(400).json({ 
          success: false, 
          error: 'No se puede eliminar el usuario porque tiene ventas asociadas. Elimine primero las ventas del usuario.' 
        });
      }

      const deleted = this.userModel.delete(userId);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      res.json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = UserController;
