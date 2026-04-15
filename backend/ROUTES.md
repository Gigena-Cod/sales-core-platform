# Rutas de la API - TP Aplicaciones Web 2

## Información General

- **Base URL**: `http://localhost:3000`
- **Formato**: JSON
- **Autenticación**: No requerida (para esta entrega)

## Rutas de Usuarios (`/api/usuarios`)

### GET /api/usuarios
- **Descripción**: Obtener todos los usuarios
- **Método**: GET
- **Parámetros**: Ninguno
- **Respuesta**:
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

### GET /api/usuarios/:id
- **Descripción**: Obtener usuario por ID
- **Método**: GET
- **Parámetros**: `id` (number) - ID del usuario
- **Respuesta**:
```json
{
  "message": "Usuario obtenido correctamente",
  "data": {
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
}
```

### POST /api/usuarios
- **Descripción**: Crear nuevo usuario
- **Método**: POST
- **Parámetros**: Body con datos del usuario
- **Body**:
```json
{
  "nombre": "Nuevo",
  "apellido": "Usuario",
  "email": "nuevo.usuario@email.com",
  "contraseña": "password123",
  "telefono": "11-9999-9999"
}
```
- **Respuesta**:
```json
{
  "message": "Usuario creado correctamente",
  "data": {
    "id": 6,
    "nombre": "Nuevo",
    "apellido": "Usuario",
    "email": "nuevo.usuario@email.com",
    "contraseña": "password123",
    "activo": true,
    "fecha_registro": "2024-04-15",
    "telefono": "11-9999-9999",
    "premium": false
  }
}
```

### PUT /api/usuarios/:id
- **Descripción**: Actualizar usuario existente
- **Método**: PUT
- **Parámetros**: `id` (number) - ID del usuario
- **Body**:
```json
{
  "nombre": "Juan Actualizado",
  "telefono": "11-1111-1111",
  "premium": true
}
```
- **Respuesta**:
```json
{
  "message": "Usuario actualizado correctamente",
  "data": {
    "id": 1,
    "nombre": "Juan Actualizado",
    "apellido": "Pérez",
    "email": "juan.perez@email.com",
    "contraseña": "hashed_password_123",
    "activo": true,
    "fecha_registro": "2024-01-15",
    "telefono": "11-1111-1111",
    "premium": true
  }
}
```

### DELETE /api/usuarios/:id
- **Descripción**: Eliminar usuario (con verificación de integridad)
- **Método**: DELETE
- **Parámetros**: `id` (number) - ID del usuario
- **Respuesta**:
```json
{
  "message": "Usuario 1 eliminado correctamente",
  "data": {
    "id": 1,
    "nombre": "Juan",
    "email": "juan.perez@email.com",
    "eliminado": true
  }
}
```
- **Error de integridad**:
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

## Rutas de Productos (`/api/productos`)

### GET /api/productos
- **Descripción**: Obtener todos los productos
- **Método**: GET
- **Parámetros**: Ninguno
- **Respuesta**:
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

### GET /api/productos/categoria/:categoria
- **Descripción**: Filtrar productos por categoría
- **Método**: GET
- **Parámetros**: `categoria` (string) - Nombre de la categoría
- **Respuesta**:
```json
{
  "message": "Productos de la categoría \"electrónica\" obtenidos correctamente",
  "categoria": "electrónica",
  "total": 3,
  "data": [
    {
      "id": 1,
      "nombre": "Laptop Dell Inspiron 15",
      "categoria": "Electrónica",
      "precio": 899.99,
      "stock": 25
    }
  ]
}
```

### GET /api/productos/disponibles
- **Descripción**: Obtener solo productos disponibles
- **Método**: GET
- **Parámetros**: Ninguno
- **Respuesta**:
```json
{
  "message": "Productos disponibles obtenidos correctamente",
  "total": 7,
  "data": [
    {
      "id": 1,
      "nombre": "Laptop Dell Inspiron 15",
      "disponible": true,
      "stock": 25
    }
  ]
}
```

### GET /api/productos/destacados
- **Descripción**: Obtener productos destacados
- **Método**: GET
- **Parámetros**: Ninguno
- **Respuesta**:
```json
{
  "message": "Productos destacados obtenidos correctamente",
  "total": 4,
  "data": [
    {
      "id": 1,
      "nombre": "Laptop Dell Inspiron 15",
      "destacado": true,
      "disponible": true
    }
  ]
}
```

### GET /api/productos/:id
- **Descripción**: Obtener producto por ID
- **Método**: GET
- **Parámetros**: `id` (number) - ID del producto
- **Respuesta**:
```json
{
  "message": "Producto obtenido correctamente",
  "data": {
    "id": 1,
    "nombre": "Laptop Dell Inspiron 15",
    "desc": "Laptop de 15.6 pulgadas con Intel Core i5...",
    "precio": 899.99,
    "stock": 25,
    "categoria": "Electrónica",
    "disponible": true,
    "destacado": true
  }
}
```

### POST /api/productos
- **Descripción**: Crear nuevo producto
- **Método**: POST
- **Parámetros**: Body con datos del producto
- **Body**:
```json
{
  "nombre": "Nuevo Producto",
  "desc": "Descripción del nuevo producto",
  "precio": 199.99,
  "stock": 50,
  "categoria": "Accesorios",
  "peso": 0.5,
  "garantia": 12
}
```
- **Respuesta**:
```json
{
  "message": "Producto creado correctamente",
  "data": {
    "id": 9,
    "nombre": "Nuevo Producto",
    "desc": "Descripción del nuevo producto",
    "precio": 199.99,
    "imagen": "https://example.com/images/producto-9.jpg",
    "stock": 50,
    "categoria": "Accesorios",
    "disponible": true,
    "destacado": false,
    "peso": 0.5,
    "garantia": 12
  }
}
```

### PUT /api/productos/:id
- **Descripción**: Actualizar producto existente
- **Método**: PUT
- **Parámetros**: `id` (number) - ID del producto
- **Body**:
```json
{
  "precio": 799.99,
  "stock": 30,
  "disponible": false,
  "destacado": true
}
```
- **Respuesta**:
```json
{
  "message": "Producto actualizado correctamente",
  "data": {
    "id": 1,
    "nombre": "Laptop Dell Inspiron 15",
    "precio": 799.99,
    "stock": 30,
    "disponible": false,
    "destacado": true
  }
}
```

## Rutas de Ventas (`/api/ventas`)

### GET /api/ventas
- **Descripción**: Obtener todas las ventas
- **Método**: GET
- **Parámetros**: Ninguno
- **Respuesta**:
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

### GET /api/ventas/usuario/:id
- **Descripción**: Obtener ventas por usuario
- **Método**: GET
- **Parámetros**: `id` (number) - ID del usuario
- **Respuesta**:
```json
{
  "message": "Ventas del usuario 1 obtenidas correctamente",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@email.com"
  },
  "total": 2,
  "data": [
    {
      "id": 1,
      "id_usuario": 1,
      "total": 999.98,
      "estado": "completado"
    }
  ]
}
```

### GET /api/ventas/estado/:estado
- **Descripción**: Obtener ventas por estado
- **Método**: GET
- **Parámetros**: `estado` (string) - Estado de la venta
- **Estados válidos**: `completado`, `pendiente`, `en_proceso`, `cancelado`
- **Respuesta**:
```json
{
  "message": "Ventas con estado \"completado\" obtenidas correctamente",
  "estado": "completado",
  "total": 2,
  "data": [
    {
      "id": 1,
      "id_usuario": 1,
      "total": 999.98,
      "estado": "completado"
    }
  ]
}
```

### GET /api/ventas/:id
- **Descripción**: Obtener venta por ID (con detalles enriquecidos)
- **Método**: GET
- **Parámetros**: `id` (number) - ID de la venta
- **Respuesta**:
```json
{
  "message": "Venta obtenida correctamente",
  "data": {
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
        "subtotal": 899.99,
        "nombre_producto": "Laptop Dell Inspiron 15",
        "categoria": "Electrónica"
      }
    ],
    "usuario": {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan.perez@email.com"
    }
  }
}
```

### POST /api/ventas
- **Descripción**: Crear nueva venta
- **Método**: POST
- **Parámetros**: Body con datos de la venta
- **Body**:
```json
{
  "id_usuario": 1,
  "direccion": "Nueva Dirección 123",
  "productos": [
    {
      "id_producto": 1,
      "cantidad": 1
    },
    {
      "id_producto": 2,
      "cantidad": 2
    }
  ],
  "metodo_pago": "tarjeta_credito",
  "envio_gratis": false
}
```
- **Respuesta**:
```json
{
  "message": "Venta creada correctamente",
  "data": {
    "id": 7,
    "id_usuario": 1,
    "fecha": "2024-04-15T14:50:00.000Z",
    "total": 1099.97,
    "direccion": "Nueva Dirección 123",
    "productos": [
      {
        "id_producto": 1,
        "cantidad": 1,
        "precio_unitario": 899.99,
        "subtotal": 899.99
      },
      {
        "id_producto": 2,
        "cantidad": 2,
        "precio_unitario": 99.99,
        "subtotal": 199.98
      }
    ],
    "metodo_pago": "tarjeta_credito",
    "envio_gratis": false,
    "estado": "pendiente",
    "codigo_seguimiento": null
  }
}
```

### PUT /api/ventas/:id
- **Descripción**: Actualizar venta existente
- **Método**: PUT
- **Parámetros**: `id` (number) - ID de la venta
- **Body**:
```json
{
  "estado": "completado",
  "direccion": "Dirección actualizada 456"
}
```
- **Respuesta**:
```json
{
  "message": "Venta actualizada correctamente",
  "data": {
    "id": 7,
    "id_usuario": 1,
    "estado": "completado",
    "direccion": "Dirección actualizada 456",
    "codigo_seguimiento": "ARG1715821400000123"
  }
}
```

## Rutas Adicionales

### GET / (Raíz)
- **Descripción**: Información de la API
- **Respuesta**:
```json
{
  "message": "TP Aplicaciones Web 2 - Sales Core Platform API",
  "version": "1.0.0",
  "endpoints": {
    "usuarios": "/api/usuarios",
    "productos": "/api/productos",
    "ventas": "/api/ventas"
  }
}
```

### GET /health
- **Descripción**: Health check del servidor
- **Respuesta**:
```json
{
  "status": "OK",
  "timestamp": "2024-04-15T14:50:00.000Z",
  "uptime": 120.5,
  "environment": "development"
}
```

## Códigos de Error

- **200**: Success
- **201**: Created
- **400**: Bad Request - Datos inválidos
- **404**: Not Found - Recurso no existe
- **500**: Internal Server Error - Error del servidor

## Ejemplos de Uso con cURL

```bash
# Obtener todos los usuarios
curl http://localhost:3000/api/usuarios

# Crear nuevo usuario
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","apellido":"User","email":"test@email.com","contraseña":"password123"}'

# Obtener productos por categoría
curl http://localhost:3000/api/productos/categoria/electronica

# Crear nueva venta
curl -X POST http://localhost:3000/api/ventas \
  -H "Content-Type: application/json" \
  -d '{"id_usuario":1,"direccion":"Test 123","productos":[{"id_producto":1,"cantidad":1}],"metodo_pago":"tarjeta_credito","envio_gratis":false}'

# Actualizar usuario
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Actualizado","premium":true}'
```

## Notas Importantes

1. **Integridad de Datos**: Al eliminar un usuario, se verifica que no tenga ventas asociadas
2. **Validación de Stock**: Al crear una venta, se verifica que haya stock suficiente
3. **Códigos de Seguimiento**: Se generan automáticamente al completar una venta
4. **Datos Sensibles**: Las contraseñas se manejan como strings planos (en producción deberían estar hasheadas)
5. **IDs**: Los IDs se generan automáticamente incrementando el máximo existente
