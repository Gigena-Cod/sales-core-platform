# Referencia de Datos - TP Aplicaciones Web 2

## Estructura Actual (Entrega 1)

Actualmente los datos se almacenan en archivos JSON estáticos en la carpeta `mocks/`. Estos archivos simulan una API REST para fines del desarrollo inicial.

## Endpoints Simulados

### Usuarios

#### GET /mocks/usuarios.json
Obtiene la lista completa de usuarios.

**Response:**
```json
[
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
```

#### GET /mocks/usuarios.json?id={id}
Simula obtener un usuario específico (filtrado cliente).

**JavaScript:**
```javascript
// Obtener usuario por ID
const getUserById = async (id) => {
  const response = await fetch('/mocks/usuarios.json');
  const users = await response.json();
  return users.find(user => user.id === parseInt(id));
};
```

### Productos

#### GET /mocks/productos.json
Obtiene el catálogo completo de productos.

**Response:**
```json
[
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
```

#### GET /mocks/productos.json?categoria={categoria}
Simula filtrado por categoría.

**JavaScript:**
```javascript
// Filtrar productos por categoría
const getProductsByCategory = async (category) => {
  const response = await fetch('/mocks/productos.json');
  const products = await response.json();
  return products.filter(product => product.categoria === category);
};
```

### Ventas

#### GET /mocks/ventas.json
Obtiene el historial completo de ventas.

**Response:**
```json
[
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
```

#### GET /mocks/ventas.json?id_usuario={id}
Simula obtener ventas por usuario.

**JavaScript:**
```javascript
// Obtener ventas por usuario
const getSalesByUser = async (userId) => {
  const response = await fetch('/mocks/ventas.json');
  const sales = await response.json();
  return sales.filter(sale => sale.id_usuario === parseInt(userId));
};
```

## Operaciones CRUD Simuladas

### Crear (Simulado)
```javascript
// Simular creación de usuario
const createUser = async (userData) => {
  const response = await fetch('/mocks/usuarios.json');
  const users = await response.json();
  
  const newUser = {
    id: Math.max(...users.map(u => u.id)) + 1,
    ...userData,
    fecha_registro: new Date().toISOString().split('T')[0]
  };
  
  // En una implementación real, esto se enviaría a un servidor
  console.log('Usuario creado:', newUser);
  return newUser;
};
```

### Actualizar (Simulado)
```javascript
// Simular actualización de producto
const updateProduct = async (id, productData) => {
  const response = await fetch('/mocks/productos.json');
  const products = await response.json();
  
  const updatedProduct = {
    ...products.find(p => p.id === parseInt(id)),
    ...productData
  };
  
  console.log('Producto actualizado:', updatedProduct);
  return updatedProduct;
};
```

### Eliminar (Simulado)
```javascript
// Simular eliminación de venta
const deleteSale = async (id) => {
  const response = await fetch('/mocks/ventas.json');
  const sales = await response.json();
  
  const filteredSales = sales.filter(sale => sale.id !== parseInt(id));
  console.log('Ventas después de eliminar:', filteredSales);
  return filteredSales;
};
```

## Validación de Datos

### Schema Validation
```javascript
// Validar estructura de usuario
const validateUser = (user) => {
  const required = ['id', 'nombre', 'apellido', 'email', 'activo'];
  const missing = required.filter(field => !(field in user));
  
  if (missing.length > 0) {
    throw new Error(`Campos faltantes: ${missing.join(', ')}`);
  }
  
  if (!user.email.includes('@')) {
    throw new Error('Email inválido');
  }
  
  return true;
};

// Validar estructura de producto
const validateProduct = (product) => {
  const required = ['id', 'nombre', 'precio', 'stock', 'disponible'];
  const missing = required.filter(field => !(field in product));
  
  if (missing.length > 0) {
    throw new Error(`Campos faltantes: ${missing.join(', ')}`);
  }
  
  if (product.precio <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }
  
  return true;
};
```

## Relaciones y Consistencia

### Verificación de Integridad
```javascript
// Verificar que los usuarios en ventas existen
const validateSaleUsers = async () => {
  const [users, sales] = await Promise.all([
    fetch('/mocks/usuarios.json').then(r => r.json()),
    fetch('/mocks/ventas.json').then(r => r.json())
  ]);
  
  const userIds = users.map(u => u.id);
  const invalidSales = sales.filter(sale => !userIds.includes(sale.id_usuario));
  
  if (invalidSales.length > 0) {
    console.error('Ventas con usuarios inválidos:', invalidSales);
    return false;
  }
  
  return true;
};

// Verificar que los productos en ventas existen
const validateSaleProducts = async () => {
  const [products, sales] = await Promise.all([
    fetch('/mocks/productos.json').then(r => r.json()),
    fetch('/mocks/ventas.json').then(r => r.json())
  ]);
  
  const productIds = products.map(p => p.id);
  const allValid = sales.every(sale => 
    sale.productos.every(item => productIds.includes(item.id_producto))
  );
  
  return allValid;
};
```

## Evolución a API Real (Entrega 2)

### Plan de Migración
```javascript
// Estructura futura de servicios
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  async getUsers() {
    // Entrega 1: fetch('/mocks/usuarios.json')
    // Entrega 2: fetch(`${this.baseUrl}/users`)
    return fetch('/mocks/usuarios.json').then(r => r.json());
  }
  
  async createUser(userData) {
    // Entrega 1: Simulación local
    // Entrega 2: POST `${this.baseUrl}/users`
    return this.simulateCreate('usuarios', userData);
  }
  
  async simulateCreate(entity, data) {
    console.log(`Creando ${entity}:`, data);
    return { id: Date.now(), ...data };
  }
}
```

## Manejo de Errores

### Errores Actuales
```javascript
// Manejo de errores en fetch
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
```

### Errores Futuros
```javascript
// Estructura de errores para API real
class ApiError extends Error {
  constructor(message, code, details) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

// Ejemplo de uso
const handleApiError = (error) => {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        console.error('Datos inválidos:', error.details);
        break;
      case 'NOT_FOUND':
        console.error('Recurso no encontrado');
        break;
      default:
        console.error('Error desconocido:', error.message);
    }
  }
};
```

## Ejemplos de Uso

### Cargar y Mostrar Datos
```javascript
// Ejemplo completo para cargar y mostrar usuarios
const loadAndDisplayUsers = async () => {
  try {
    const users = await fetchData('/mocks/usuarios.json');
    
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = users.map(user => `
      <div class="user-card">
        <h3>${user.nombre} ${user.apellido}</h3>
        <p>Email: ${user.email}</p>
        <p>Estado: ${user.activo ? 'Activo' : 'Inactivo'}</p>
        <p>Premium: ${user.premium ? 'Sí' : 'No'}</p>
      </div>
    `).join('');
    
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
};
```
