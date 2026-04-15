# Referencia de API - TP Aplicaciones Web 2

## Estructura Actual (Entrega 2)

Actualmente los datos se gestionan a través de una **API REST con Express.js** que corre en `http://localhost:3000`. Esta API reemplaza el acceso directo a archivos JSON estáticos y proporciona endpoints completos para el CRUD de datos.

## Endpoints de la API

### Usuarios

#### GET /api/usuarios
Obtiene la lista completa de usuarios.

**Request:**
```bash
curl http://localhost:3000/api/usuarios
```

**Response:**
```json
{
  "message": "Usuarios obtenidos correctamente",
  "total": 5,
  "data": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan.perez@email.com",
      "contraseña": "hashed_password_123",
      "activo": true,
      "fecha_registro": "2024-01-15",
      "telefono": "11-1234-5678",
      "premium": false
    }
  ]
}
```

#### GET /api/usuarios/:id
Obtiene un usuario específico por ID.

**Request:**
```bash
curl http://localhost:3000/api/usuarios/1
```

**JavaScript:**
```javascript
// Obtener usuario por ID
const getUserById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
  const result = await response.json();
  return result.data;
};
```

### Productos

#### GET /api/productos
Obtiene el catálogo completo de productos.

**Request:**
```bash
curl http://localhost:3000/api/productos
```

**Response:**
```json
{
  "message": "Productos obtenidos correctamente",
  "total": 8,
  "data": [
    {
      "id": 1,
      "nombre": "Laptop Dell Inspiron 15",
      "desc": "Laptop de 15.6 pulgadas con Intel Core i5...",
      "precio": 899.99,
      "imagen": "https://example.com/images/laptop-dell-15.jpg",
      "stock": 25,
      "categoria": "Electrónica",
      "disponible": true,
      "destacado": true,
      "peso": 2.5,
      "garantia": 12
    }
  ]
}
```

#### GET /api/productos/categoria/:categoria
Filtra productos por categoría.

**Request:**
```bash
curl http://localhost:3000/api/productos/categoria/electronica
```

**JavaScript:**
```javascript
// Filtrar productos por categoría
const getProductsByCategory = async (category) => {
  const response = await fetch(`http://localhost:3000/api/productos/categoria/${category}`);
  const result = await response.json();
  return result.data;
};
```

### Ventas

#### GET /api/ventas
Obtiene el historial completo de ventas.

**Request:**
```bash
curl http://localhost:3000/api/ventas
```

**Response:**
```json
{
  "message": "Ventas obtenidas correctamente",
  "total": 6,
  "data": [
    {
      "id": 1,
      "id_usuario": 1,
      "fecha": "2024-04-10T14:30:00Z",
      "total": 999.98,
      "direccion": "Av. Corrientes 1234, Buenos Aires, Argentina",
      "productos": [
        {
          "id_producto": 1,
          "cantidad": 1,
          "precio_unitario": 899.99,
          "subtotal": 899.99
        }
      ],
      "metodo_pago": "tarjeta_credito",
      "envio_gratis": false,
      "estado": "completado",
      "codigo_seguimiento": "ARG123456789"
    }
  ]
}
```

#### GET /api/ventas/usuario/:id
Obtiene ventas por usuario.

**Request:**
```bash
curl http://localhost:3000/api/ventas/usuario/1
```

**JavaScript:**
```javascript
// Obtener ventas por usuario
const getSalesByUser = async (userId) => {
  const response = await fetch(`http://localhost:3000/api/ventas/usuario/${userId}`);
  const result = await response.json();
  return result.data;
};
```

## Operaciones CRUD Reales

### Crear Usuario
```javascript
// Crear nuevo usuario
const createUser = async (userData) => {
  const response = await fetch('http://localhost:3000/api/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  
  const result = await response.json();
  return result.data;
};

// Ejemplo de uso
const newUser = await createUser({
  nombre: 'Nuevo',
  apellido: 'Usuario',
  email: 'nuevo@email.com',
  contraseña: 'password123',
  telefono: '11-9999-9999'
});
```

### Actualizar Producto
```javascript
// Actualizar producto existente
const updateProduct = async (id, productData) => {
  const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  });
  
  const result = await response.json();
  return result.data;
};

// Ejemplo de uso
const updatedProduct = await updateProduct(1, {
  precio: 799.99,
  stock: 30,
  disponible: false
});
```

### Crear Venta
```javascript
// Crear nueva venta
const createSale = async (saleData) => {
  const response = await fetch('http://localhost:3000/api/ventas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(saleData)
  });
  
  const result = await response.json();
  return result.data;
};

// Ejemplo de uso
const newSale = await createSale({
  id_usuario: 1,
  direccion: 'Dirección 123',
  productos: [
    {
      id_producto: 1,
      cantidad: 1
    }
  ],
  metodo_pago: 'tarjeta_credito',
  envio_gratis: false
});
```

### Eliminar Usuario (con verificación de integridad)
```javascript
// Eliminar usuario (si no tiene ventas asociadas)
const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
    method: 'DELETE'
  });
  
  const result = await response.json();
  
  if (response.ok) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
};

// Ejemplo de uso
try {
  const deletedUser = await deleteUser(5);
  console.log('Usuario eliminado:', deletedUser);
} catch (error) {
  console.error('Error al eliminar usuario:', error.message);
}
```

### Validaciones Implementadas

#### Usuarios
- **Campos obligatorios**: nombre, apellido, email, contraseña
- **Email**: Debe contener el símbolo @
- **Tipos**: nombre, apellido, email, contraseña deben ser strings
- **Email único**: Verifica que el email no exista previamente

#### Productos
- **Campos obligatorios**: nombre, desc, precio, stock, categoria
- **Precio**: Debe ser mayor a 0
- **Stock**: No puede ser negativo
- **Tipos**: nombre, desc, categoria deben ser strings; precio, stock deben ser numbers

#### Ventas
- **Campos obligatorios**: id_usuario, dirección, productos, metodo_pago
- **Productos**: Debe ser un array con al menos un elemento
- **Existencia**: Verifica que el usuario exista
- **Stock**: Verifica que haya stock suficiente para todos los productos

## Relaciones y Consistencia

### Verificación de Integridad Automática

#### Eliminación de Usuarios
```javascript
// La API verifica automáticamente las relaciones
const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
    method: 'DELETE'
  });
  
  const result = await response.json();
  
  // Si el usuario tiene ventas asociadas, la API devuelve error 400
  if (!response.ok) {
    throw new Error(result.message);
  }
  
  return result.data;
};
```

#### Creación de Ventas
```javascript
// La API verifica stock y existencia de productos automáticamente
const createSale = async (saleData) => {
  const response = await fetch('http://localhost:3000/api/ventas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(saleData)
  });
  
  const result = await response.json();
  
  // Si no hay stock o productos no existen, la API devuelve error 400
  if (!response.ok) {
    throw new Error(result.message);
  }
  
  return result.data;
};
```

## Manejo de Errores de la API

### Códigos de Error
- **200**: Success - Operación exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos inválidos o incompletos
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error del servidor

### Ejemplos de Respuestas de Error

#### Error de Validación
```json
{
  "error": "Datos incompletos",
  "message": "Todos los campos son obligatorios: nombre, apellido, email, contraseña"
}
```

#### Error de Integridad
```json
{
  "error": "Error de integridad de datos",
  "message": "No se puede eliminar el usuario 1 porque tiene 2 ventas asociadas",
  "ventasAsociadas": [
    {
      "id_venta": 1,
      "fecha": "2024-04-10T14:30:00Z",
      "total": 999.98
    }
  ]
}
```

#### Stock Insuficiente
```json
{
  "error": "Stock insuficiente",
  "message": "Los siguientes productos no tienen stock suficiente",
  "productosSinStock": [
    {
      "id_producto": 1,
      "nombre": "Laptop Dell Inspiron 15",
      "stock_disponible": 2,
      "cantidad_requerida": 5
    }
  ]
}
```

## Ejemplos de Uso Completo

### Frontend con la API Real

```javascript
// Servicio de API para interactuar con el backend
class SalesCoreAPI {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    const response = await fetch(`${this.baseUrl}/api/usuarios`);
    const result = await response.json();
    return result.data;
  }

  async createUser(userData) {
    const response = await fetch(`${this.baseUrl}/api/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message);
    }
    
    return result.data;
  }

  async getProducts() {
    const response = await fetch(`${this.baseUrl}/api/productos`);
    const result = await response.json();
    return result.data;
  }

  async getProductsByCategory(category) {
    const response = await fetch(`${this.baseUrl}/api/productos/categoria/${category}`);
    const result = await response.json();
    return result.data;
  }

  async createSale(saleData) {
    const response = await fetch(`${this.baseUrl}/api/ventas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message);
    }
    
    return result.data;
  }

  async updateUser(id, userData) {
    const response = await fetch(`${this.baseUrl}/api/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    return result.data;
  }

  async deleteUser(id) {
    const response = await fetch(`${this.baseUrl}/api/usuarios/${id}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message);
    }
    
    return result.data;
  }
}

// Uso en el frontend
const api = new SalesCoreAPI();

// Cargar usuarios
const loadUsers = async () => {
  try {
    const users = await api.getUsers();
    renderUsers(users);
  } catch (error) {
    console.error('Error al cargar usuarios:', error.message);
    showError(error.message);
  }
};

// Crear nuevo usuario
const handleCreateUser = async (userData) => {
  try {
    const newUser = await api.createUser(userData);
    showSuccess('Usuario creado correctamente');
    loadUsers(); // Recargar lista
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    showError(error.message);
  }
};
```

### Testing de la API

```javascript
// Funciones de testing
const testAPI = async () => {
  console.log('=== Testing API ===');
  
  try {
    // Test 1: Obtener usuarios
    console.log('1. Obteniendo usuarios...');
    const users = await api.getUsers();
    console.log(`   Usuarios obtenidos: ${users.length}`);
    
    // Test 2: Crear usuario
    console.log('2. Creando usuario...');
    const newUser = await api.createUser({
      nombre: 'Test',
      apellido: 'User',
      email: 'test@email.com',
      contraseña: 'password123'
    });
    console.log(`   Usuario creado: ${newUser.nombre} ${newUser.apellido}`);
    
    // Test 3: Obtener productos
    console.log('3. Obteniendo productos...');
    const products = await api.getProducts();
    console.log(`   Productos obtenidos: ${products.length}`);
    
    console.log('=== Tests completados ===');
  } catch (error) {
    console.error('Error en testing:', error.message);
  }
};

// Ejecutar tests
testAPI();
