const fs = require('fs');
const path = require('path');

class User {
  constructor() {
    this.users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../mock/usuarios.json'), 'utf8'));
  }

  findAll(filters = {}) {
    let filteredUsers = this.users;

    if (filters.active !== undefined) {
      filteredUsers = filteredUsers.filter(u => 
        u.activo === (filters.active === 'true')
      );
    }

    if (filters.premium !== undefined) {
      filteredUsers = filteredUsers.filter(u => 
        u.premium === (filters.premium === 'true')
      );
    }

    // No incluir contraseñas en la respuesta
    return filteredUsers.map(({ contraseña, ...user }) => user);
  }

  findById(id) {
    const user = this.users.find(u => u.id === parseInt(id));
    if (!user) return null;

    // No incluir contraseña en la respuesta
    const { contraseña, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  findByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  create(userData) {
    const newUser = {
      id: Math.max(...this.users.map(u => u.id)) + 1,
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email,
      contraseña: `hashed_${userData.contraseña}`, // En producción usar bcrypt
      activo: true,
      fecha_registro: new Date().toISOString().split('T')[0],
      telefono: userData.telefono || '',
      premium: false
    };

    this.users.push(newUser);
    
    // No incluir contraseña en la respuesta
    const { contraseña, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  update(id, userData) {
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return null;

    const updatedUser = { ...this.users[index], ...userData };
    this.users[index] = updatedUser;

    // No incluir contraseña en la respuesta
    const { contraseña, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  delete(id) {
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }

  hasRelatedSales(id) {
    const sales = JSON.parse(fs.readFileSync(path.join(__dirname, '../../mock/ventas.json'), 'utf8'));
    const userSales = sales.filter(v => v.id_usuario === parseInt(id));
    return userSales.length > 0;
  }
}

module.exports = User;
