# Backend - TP Aplicaciones Web 2

## Descripción

Backend desarrollado con Express.js para la segunda entrega del TP de Aplicaciones Web 2. Implementa rutas de enrutamiento para gestionar las solicitudes relacionadas con las estructuras de datos previamente creadas (usuarios, productos, ventas).

## Características Implementadas

### Rutas Desarrolladas

#### Usuarios (`/api/usuarios`)
- **GET /api/usuarios** - Obtener todos los usuarios
- **GET /api/usuarios/:id** - Obtener usuario por ID
- **POST /api/usuarios** - Crear nuevo usuario
- **PUT /api/usuarios/:id** - Actualizar usuario existente
- **DELETE /api/usuarios/:id** - Eliminar usuario (con verificación de integridad)

#### Productos (`/api/productos`)
- **GET /api/productos** - Obtener todos los productos
- **GET /api/productos/categoria/:categoria** - Filtrar productos por categoría
- **POST /api/productos** - Crear nuevo producto
- **PUT /api/productos/:id** - Actualizar producto existente

#### Ventas (`/api/ventas`)
- **GET /api/ventas** - Obtener todas las ventas
- **GET /api/ventas/usuario/:id** - Obtener ventas por usuario
- **POST /api/ventas** - Crear nueva venta
- **PUT /api/ventas/:id** - Actualizar venta existente

### Validaciones y Seguridad

#### Validación de Datos
- Verificación de campos obligatorios
- Validación de tipos de datos
- Verificación de formatos (email, precios, etc.)
- Validación de stock en ventas

#### Integridad de Datos
- **Eliminación de usuarios**: Verifica que no tenga ventas asociadas
- **Creación de ventas**: Verifica existencia de productos y stock disponible
- **Actualizaciones**: Mantiene coherencia en las relaciones

#### Middleware Implementado
- **Helmet**: Seguridad HTTP
- **CORS**: Permitir solicitudes desde orígenes específicos
- **Error Handler**: Manejo centralizado de errores
- **Validación**: Validación de datos de entrada

## Instalación y Ejecución

### Requisitos Previos
- Node.js 16+
- npm o yarn

### Instalación
```bash
# Entrar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# O con yarn
yarn install
```

### Ejecución
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start

# El servidor correrá en http://localhost:3000
```

## Estructura del Proyecto

```
backend/
src/
  index.js                 # Servidor principal
  routes/
    usuarios.js           # Rutas de usuarios
    productos.js          # Rutas de productos
    ventas.js              # Rutas de ventas
  middleware/
    errorHandler.js       # Manejo de errores
mock/                      # Datos JSON
  usuarios.json           # Datos de usuarios
  productos.json          # Datos de productos
  ventas.json             # Datos de ventas
package.json              # Dependencias del proyecto
ROUTES.md                 # Documentación de rutas
README.md                 # Este archivo
```

## Documentación de Rutas

La documentación completa de todas las rutas está disponible en:
- **Archivo**: `backend/ROUTES.md`
- **Online**: http://localhost:3000 (cuando el servidor está corriendo)

## Ejemplos de Uso

### Obtener todos los usuarios
```bash
curl http://localhost:3000/api/usuarios
```

### Crear nuevo usuario
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","apellido":"Pérez","email":"juan@email.com","contraseña":"password123"}'
```

### Filtrar productos por categoría
```bash
curl http://localhost:3000/api/productos/categoria/electronica
```

### Crear nueva venta
```bash
curl -X POST http://localhost:3000/api/ventas \
  -H "Content-Type: application/json" \
  -d '{"id_usuario":1,"direccion":"Dirección 123","productos":[{"id_producto":1,"cantidad":1}],"metodo_pago":"tarjeta_credito","envio_gratis":false}'
```

### Eliminar usuario (con verificación de integridad)
```bash
curl -X DELETE http://localhost:3000/api/usuarios/5
```

## Testing y Validación

### Health Check
```bash
curl http://localhost:3000/health
```

### Información de la API
```bash
curl http://localhost:3000/
```

### Testing de Errores
```bash
# Usuario no encontrado
curl http://localhost:3000/api/usuarios/999

# Datos inválidos
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"","email":"invalido"}'

# Integridad de datos
curl -X DELETE http://localhost:3000/api/usuarios/1
```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express.js**: Framework web
- **Helmet**: Middleware de seguridad
- **CORS**: Middleware para CORS
- **JSON**: Formato de datos

## Características Destacadas

### 1. Manejo de Errores
- Errores de validación claros y específicos
- Códigos de estado HTTP apropiados
- Mensajes de error en español

### 2. Validación de Integridad
- No permite eliminar usuarios con ventas asociadas
- Verifica stock disponible al crear ventas
- Mantiene coherencia en las relaciones

### 3. Flexibilidad en Actualizaciones
- Permite actualizar solo los campos enviados
- Validación de datos en cada actualización
- Preservación de datos no modificados

### 4. Enriquecimiento de Datos
- Las respuestas incluyen información relacionada
- Detalles adicionales en consultas específicas
- Cálculos automáticos (totales, subtotales)

## Próximos Pasos (Para futuras entregas)

1. **Autenticación**: Implementar JWT
2. **Base de Datos**: Migrar de JSON a MongoDB/PostgreSQL
3. **Testing**: Unit tests e integration tests
4. **Logging**: Sistema de logs centralizado
5. **Rate Limiting**: Limitar solicitudes por IP
6. **Documentación**: Swagger/OpenAPI

## Notas para el Evaluador

### Requisitos Cumplidos
- [x] 2 solicitudes GET para consultar datos
- [x] 2 solicitudes POST para crear registros
- [x] 1 solicitud PUT para actualizar registros
- [x] 1 solicitud DELETE con verificación de integridad
- [x] Archivo .gitignore configurado
- [x] Documentación completa de rutas

### Aspectos Destacados
- **Validación robusta**: Todos los endpoints validan datos de entrada
- **Integridad de datos**: Verificación de relaciones al eliminar
- **Manejo de errores**: Centralizado y descriptivo
- **Documentación completa**: Detallada en archivo ROUTES.md
- **Código limpio**: Estructura modular y mantenible

### Archivos para Evaluación
- `backend/src/index.js` - Servidor principal
- `backend/src/routes/` - Rutas implementadas
- `backend/src/middleware/errorHandler.js` - Manejo de errores
- `backend/ROUTES.md` - Documentación completa
- `backend/package.json` - Dependencias
- `.gitignore` - Archivo de configuración

---

**Desarrollado para TP Aplicaciones Web 2 - Segunda Entrega**
