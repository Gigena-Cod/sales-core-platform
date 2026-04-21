# TP Aplicaciones Web 2 - Sales Core Platform

## Descripción del Proyecto

Este es el trabajo práctico de la materia **Aplicaciones Web 2** que consiste en el desarrollo de una plataforma de e-commerce para la gestión de ventas de productos tecnológicos.

## Contexto Académico

### Estructura de la Materia
- **Módulo Introductorio**: Presentación general y objetivos
- **Módulos 1-4**: Contenido temático con actividades evaluativas
- **Módulo de Cierre**: Síntesis y proyecto final

### Actividades Evaluativas
- **Módulo 1**: Evaluación autoevaluable (formulario)
- **Módulo 2**: Instancia Evaluativa 1 - Caso práctico
- **Módulo 3**: Evaluación autoevaluable (formulario)
- **Módulo 4**: Instancia Evaluativa 2 - Situación profesional

### Condiciones de Regularidad
- Nota >= 4 (60%) en Instancia Evaluativa 1 (Módulo 2)
- Nota >= 4 (60%) en Instancia Evaluativa 2 (Módulo 4)
- Nota >= 4 (60%) en promedio de actividades prácticas
- Participación activa en debates y foros

## Estructura del Proyecto

```
sales-core-platform/
README.md                   # README principal de la aplicación
docsify/                    # Documentación completa del TP
  index.html               # Configuración de Docsify
  README.md                # Página principal de la documentación
  _sidebar.md              # Navegación lateral
  _navbar.md               # Barra superior
  guide/                   # Guías del proyecto
    getting-started.md     # Guía de inicio
    architecture.md         # Arquitectura
    api.md                  # Referencia de datos
    configuration.md       # Configuración
    deployment.md           # Despliegue
    development.md          # Desarrollo
    contributing.md         # Contribución
    troubleshooting.md      # Troubleshooting
backend/                    # Backend y datos
  src/
    index.js               # Servidor principal
  mock/                    # Datos JSON
    usuarios.json           # Usuarios del sistema
    productos.json          # Catálogo de productos
    ventas.json             # Registro de ventas
```

## Objetivos de Aprendizaje

Desarrollar una aplicación web completa que permita:
- Aplicar conceptos de desarrollo frontend y backend
- Implementar estructuras de datos interrelacionadas
- Gestionar usuarios y autenticación
- Crear catálogo de productos con búsqueda y filtrado
- Desarrollar sistema de ventas y procesamiento de pedidos
- Diseñar panel de administración
- Documentar el proyecto de manera profesional

## Estructura de Datos

El proyecto utiliza tres archivos JSON interrelacionados como base de datos inicial:

### Usuarios (`backend/mock/usuarios.json`)
```json
{
  "id": number,
  "nombre": string,
  "apellido": string,
  "email": string,
  "contraseña": string,
  "activo": boolean,
  "fecha_registro": string,
  "telefono": string,
  "premium": boolean
}
```

### Productos (`backend/mock/productos.json`)
```json
{
  "id": number,
  "nombre": string,
  "desc": string,
  "precio": number,
  "imagen": string,
  "stock": number,
  "categoria": string,
  "disponible": boolean,
  "destacado": boolean,
  "peso": number,
  "garantia": number
}
```

### Ventas (`backend/mock/ventas.json`)
```json
{
  "id": number,
  "id_usuario": number,
  "fecha": string,
  "total": number,
  "direccion": string,
  "productos": [
    {
      "id_producto": number,
      "cantidad": number,
      "precio_unitario": number,
      "subtotal": number
    }
  ],
  "metodo_pago": string,
  "envio_gratis": boolean,
  "estado": string,
  "codigo_seguimiento": string
}
```

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos y responsive design
- **JavaScript Vanilla**: Lógica del cliente
- **Fetch API**: Consumo de datos

### Backend
- **Node.js**: Entorno de ejecución
- **Express.js**: Framework web
- **JSON**: Datos mock para desarrollo

### Documentación
- **Docsify**: Generación de documentación estática
- **Markdown**: Escritura de documentación

### Deploy
- **GitHub Pages**: Documentación estática
- **Vercel/Netlify**: Frontend estático
- **Railway/Heroku**: Backend completo

## Entregas del TP

### Módulo 2 - Instancia Evaluativa 1
**Fecha**: Tercera semana de clases
- [x] **Entrega 1 - Estructura de Datos**
  - [x] Creación de archivos JSON interrelacionados
  - [x] Definición de contexto de negocio
  - [x] Verificación de tipos de datos (numéricos, cadenas, booleanos)
  - [x] Documentación con Docsify
  - [x] Coherencia entre entidades

### Módulo 4 - Instancia Evaluativa 2
**Fecha**: Sexta semana de clases
- [ ] **Entrega 2 - Desarrollo Frontend**
  - [ ] Interfaz de gestión de usuarios
  - [ ] Catálogo de productos con filtrado
  - [ ] Sistema de ventas funcional
  - [ ] Validación de formularios
  - [ ] Responsive design

### Módulo de Cierre - Trabajo Práctico Final
- [ ] **Entrega 3 - Integración Completa**
  - [ ] Conexión frontend-backend
  - [ ] Autenticación y seguridad
  - [ ] Panel de administración
  - [ ] Testing y validación
  - [ ] Deploy y documentación final

## Criterios de Evaluación

### Nota Mínima para Regularidad
- **4 puntos (60%)** en cada instancia evaluativa
- **4 puntos (60%)** en promedio de actividades prácticas
- Participación activa en debates y foros

### Rúbrica de Evaluación
- **Estructura de Datos**: 25% - Coherencia y tipos de datos
- **Desarrollo Frontend**: 35% - Funcionalidad y UX
- **Integración**: 30% - Conexión y arquitectura
- **Documentación**: 10% - Claridad y completitud

## Instalación y Ejecución

### Requisitos Previos
- Node.js 16+
- npm o yarn
- Python 3+ (para servidor de documentación)

### Ejecución del Backend
```bash
# Entrar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Iniciar servidor
npm start

# El servidor correrá en http://localhost:3000
```

### Visualización de Documentación
```bash
# Entrar a la carpeta docsify
cd docsify

# Iniciar servidor local
python -m http.server 8080

# Acceder a http://localhost:8080
```

### Ejecución Completa
```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Documentación
cd docsify && python -m http.server 8080

# Terminal 3: Frontend (cuando esté desarrollado)
cd public && python -m http.server 3001
```

## 2° Etapa - Servidor Express.js y Rutas de Enrutamiento

### Requisitos Cumplidos

#### Productos - 2 GET, 2 POST, 1 PUT
- **GET** `/api/products` - Consultar todos los productos
- **GET** `/api/products/:id` - Consultar producto por ID
- **POST** `/api/products` - Crear nuevo producto
- **POST** `/api/products/search` - Búsqueda avanzada (parámetros sensibles)
- **PUT** `/api/products/:id` - Actualizar producto existente

#### Usuarios - 2 GET, 2 POST, 1 PUT, 1 DELETE
- **GET** `/api/users` - Consultar todos los usuarios
- **GET** `/api/users/:id` - Consultar usuario por ID
- **POST** `/api/users` - Crear nuevo usuario
- **POST** `/api/users/login` - Inicio de sesión (parámetros sensibles: email, contraseña)
- **PUT** `/api/users/:id` - Actualizar usuario existente
- **DELETE** `/api/users/:id` - Eliminar usuario **con integridad de datos**

#### Ventas - 2 GET, 2 POST, 1 PUT
- **GET** `/api/sales` - Consultar todas las ventas
- **GET** `/api/sales/:id` - Consultar venta por ID
- **POST** `/api/sales` - Crear nueva venta
- **POST** `/api/sales/statistics` - Estadísticas (parámetros sensibles: fechas, user_id)
- **PUT** `/api/sales/:id` - Actualizar venta existente

### Integridad de Datos Implementada
- **DELETE `/api/users/:id`** verifica integridad referencial:
  - No permite eliminar usuarios con ventas asociadas
  - Retorna error 400 si el usuario tiene ventas
  - Protege contra ventas huérfanas

### Archivos de Configuración
- **.gitignore** configurado con:
  ```
  # Dependencias de Node.js
  node_modules/
  
  # Directorio de dependencias generadas por npm
  package-lock.json
  ```

## API Endpoints

### Products (`/api/products`)
- `GET /api/products` - Get all products (optional filters: category, available, featured)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (required: nombre, precio, categoria)
- `POST /api/products/search` - Advanced product search (body: query, price_min, price_max, category)
- `PUT /api/products/:id` - Update existing product

### Users (`/api/users`)
- `GET /api/users` - Get all users (optional filters: active, premium)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user (required: nombre, apellido, email, contraseña)
- `POST /api/users/login` - User login (required: email, contraseña)
- `PUT /api/users/:id` - Update existing user
- `DELETE /api/users/:id` - Delete user (checks data integrity with associated sales)

### Sales (`/api/sales`)
- `GET /api/sales` - Get all sales (optional filters: status, user_id, payment_method)
- `GET /api/sales/:id` - Get sale by ID
- `POST /api/sales` - Create new sale (required: user_id, address, products, payment_method)
- `POST /api/sales/statistics` - Get sales statistics (body: start_date, end_date, user_id)
- `PUT /api/sales/:id` - Update existing sale

### General
- `GET /` - Welcome route with API information

## API Usage Examples

### Products (`/api/products`)
```bash
# Get all products
curl http://localhost:3000/api/products

# Filter products by category
curl http://localhost:3000/api/products?category=Electrónica

# Get featured products
curl http://localhost:3000/api/products?featured=true

# Create new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Nuevo Producto","precio":299.99,"categoria":"Electrónica"}'

# Advanced search
curl -X POST http://localhost:3000/api/products/search \
  -H "Content-Type: application/json" \
  -d '{"query":"laptop","price_min":500,"price_max":1500}'
```

### Users (`/api/users`)
```bash
# Get active users
curl http://localhost:3000/api/users?active=true

# Create new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","apellido":"Pérez","email":"juan@email.com","contraseña":"password123"}'

# Login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@email.com","contraseña":"password123"}'
```

### Sales (`/api/sales`)
```bash
# Get completed sales
curl http://localhost:3000/api/sales?status=completado

# Create new sale
curl -X POST http://localhost:3000/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "address": "Calle 123, Ciudad",
    "products": [{"product_id": 1, "quantity": 2}],
    "payment_method": "tarjeta_credito"
  }'

# Get statistics
curl -X POST http://localhost:3000/api/sales/statistics \
  -H "Content-Type: application/json" \
  -d '{"start_date":"2024-01-01","end_date":"2024-12-31"}'
```

## Entrega 2° Etapa - Verificación Final

### Checklist de Requisitos Cumplidos

#### Servidor Express.js
- [x] **Servidor creado** con Express.js
- [x] **Middleware configurado**: helmet, cors, morgan
- [x] **Puerto 3000** para desarrollo local

#### Rutas de Enrutamiento por Entidad

**Productos:**
- [x] **2 GET**: `/api/products`, `/api/products/:id`
- [x] **2 POST**: `/api/products`, `/api/products/search`
- [x] **1 PUT**: `/api/products/:id`

**Usuarios:**
- [x] **2 GET**: `/api/users`, `/api/users/:id`
- [x] **2 POST**: `/api/users`, `/api/users/login`
- [x] **1 PUT**: `/api/users/:id`
- [x] **1 DELETE**: `/api/users/:id` con integridad

**Ventas:**
- [x] **2 GET**: `/api/sales`, `/api/sales/:id`
- [x] **2 POST**: `/api/sales`, `/api/sales/statistics`
- [x] **1 PUT**: `/api/sales/:id`

#### Parámetros Sensibles
- [x] **POST `/api/products/search`**: filtros de precio, categoría
- [x] **POST `/api/users/login`**: email, contraseña
- [x] **POST `/api/sales/statistics`**: fechas, user_id

#### Integridad de Datos
- [x] **DELETE `/api/users/:id`** verifica ventas asociadas
- [x] **Error 400** si intenta eliminar usuario con ventas
- [x] **Protección contra datos huérfanos**

#### Archivos de Configuración
- [x] **.gitignore** con `node_modules/` y `package-lock.json`
- [x] **Documentación de rutas** en README principal
- [x] **Ejemplos cURL** para testing

#### Arquitectura Adicional
- [x] **Patrón MVC** implementado
- [x] **Notación de puntos** en nombres
- [x] **Endpoints en inglés**
- [x] **Separación de responsabilidades**

### Para Testing
```bash
# Instalar y ejecutar
cd backend
npm install
npm start

# Probar endpoints
curl http://localhost:3000/api/products
curl http://localhost:3000/api/users
curl http://localhost:3000/api/sales
```

### Entrega
**Link del repositorio**: [Enviar URL de GitHub]

## Características de Seguridad

- **Validación de datos**: Todos los endpoints validan los datos de entrada
- **Integridad referencial**: No se permite eliminar usuarios con ventas asociadas
- **Verificación de stock**: Las ventas verifican disponibilidad de productos
- **Passwords seguros**: Las contraseñas se hashean (simulado para desarrollo)
- **CORS habilitado**: Para permitir conexiones desde frontend
- **Headers de seguridad**: Helmet para protección básica

## Documentación

La documentación completa del proyecto está disponible en:

### Local
```bash
cd docsify
python -m http.server 8080
# Acceder a http://localhost:8080
```

### Online
- **GitHub Pages**: `https://TU_USERNAME.github.io/sales-core-platform/docsify`
- **Documentación completa**: Guías, API reference, troubleshooting

## Testing

### Validación de Datos
```bash
# Validar archivos JSON
node backend/validate-data.js

# Verificar coherencia de relaciones
node backend/check-coherence.js
```

### Testing de API
```bash
# Ejecutar tests de API
npm test

# Testing manual
curl http://localhost:3000/api/usuarios
curl http://localhost:3000/api/productos
curl http://localhost:3000/api/ventas
```

## Deploy

### Backend (Producción)
```bash
# Variables de entorno
export NODE_ENV=production
export PORT=3000

# Iniciar producción
npm start
```

### Frontend (GitHub Pages)
1. Hacer commit de cambios
2. Configurar GitHub Pages en el repositorio
3. Seleccionar fuente `main/docsify`
4. Acceder a la URL generada

### Full Stack (Vercel/Railway)
1. Conectar repositorio con Vercel/Railway
2. Configurar variables de entorno
3. Deploy automático en cada push

## Contribución

Este es un trabajo práctico educativo. Para contribuir:

1. Fork del repositorio
2. Crear rama para tu feature
3. Implementar cambios
4. Hacer commit con mensajes claros
5. Push y crear Pull Request

## Licencia

Proyecto educativo para la cátedra de Aplicaciones Web 2.

## Contacto

- **Materia**: Aplicaciones Web 2
- **Repositorio**: https://github.com/TU_USERNAME/sales-core-platform
- **Documentación**: https://TU_USERNAME.github.io/sales-core-platform/docsify
- **Issues**: Reportar problemas en GitHub

---

**Importante**: Este es un trabajo práctico educativo. Enfócate en aprender y demostrar los conceptos de la materia, no en crear un producto comercial.
