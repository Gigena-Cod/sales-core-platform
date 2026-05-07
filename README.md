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
├── README.md                   # README principal de la aplicación
├── .gitignore                  # Archivos ignorados por Git
├── docsify/                     # Documentación completa del TP
│   ├── index.html             # Configuración de Docsify
│   ├── README.md              # Página principal de la documentación
│   ├── _sidebar.md            # Navegación lateral
│   ├── _navbar.md             # Barra superior
│   └── guide/                 # Guías del proyecto
│       ├── getting-started.md # Guía de inicio
│       ├── architecture.md     # Arquitectura
│       ├── api.md              # Referencia de datos
│       ├── configuration.md   # Configuración
│       ├── deployment.md       # Despliegue
│       ├── development.md      # Desarrollo
│       ├── contributing.md     # Contribución
│       └── troubleshooting.md  # Troubleshooting
├── backend/                    # Backend API (Express.js + ES6)
│   ├── src/
│   │   ├── index.js          # Servidor principal
│   │   ├── models/           # Modelos de datos (MVC)
│   │   │   ├── user.model.js
│   │   │   ├── product.model.js
│   │   │   └── sale.model.js
│   │   ├── controllers/      # Controladores (MVC)
│   │   │   ├── user.controller.js
│   │   │   ├── product.controller.js
│   │   │   └── sale.controller.js
│   │   └── routes/           # Rutas (MVC)
│   │       ├── user.routes.js
│   │       ├── product.routes.js
│   │       └── sale.routes.js
│   ├── mock/                 # Datos JSON
│   │   ├── usuarios.json     # Usuarios del sistema
│   │   ├── productos.json    # Catálogo de productos
│   │   └── ventas.json       # Registro de ventas
│   ├── package.json         # Dependencias del backend
│   └── .gitignore           # Archivos ignorados del backend
└── frontend/                  # Frontend (React + Vite + BFF)
    ├── bff/                  # Backend for Frontend (integrado)
    │   ├── src/
    │   │   └── index.js      # Servidor BFF
    │   ├── package.json      # Dependencias del BFF
    │   └── .gitignore        # Archivos ignorados del BFF
    ├── src/
    │   ├── components/       # Componentes React
    │   │   ├── ProductCard.jsx
    │   │   ├── ProductList.jsx
    │   │   ├── FilterBar.jsx
    │   │   └── ShoppingCart.jsx
    │   ├── hooks/            # Custom Hooks
    │   │   └── useCart.js
    │   ├── services/         # Servicios API
    │   │   └── api.js
    │   ├── App.jsx           # Componente principal
    │   ├── main.jsx          # Entry point
    │   └── index.css         # Estilos (Tailwind CSS)
    ├── public/               # Archivos estáticos
    ├── package.json          # Dependencias del frontend
    ├── tailwind.config.js    # Configuración de Tailwind
    ├── postcss.config.js     # Configuración de PostCSS
    ├── vite.config.js        # Configuración de Vite
    └── .gitignore            # Archivos ignorados del frontend
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
- **React 19**: Framework de componentes
- **Vite**: Build tool y desarrollo
- **Tailwind CSS**: Framework de estilos
- **React Router**: Navegación (opcional)
- **Axios**: Cliente HTTP
- **LocalStorage**: Persistencia de carrito

### Backend
- **Node.js**: Entorno de ejecución
- **Express.js**: Framework web
- **ES6 Modules**: Módulos modernos
- **JSON**: Datos mock para desarrollo

### BFF (Backend for Frontend)
- **Express.js**: Proxy y optimización para frontend
- **Axios**: Comunicación con backend principal
- **CORS**: Habilitación de cross-origin

### Arquitectura
- **Monorepo**: Gestión unificada de código
- **MVC Pattern**: Separación de responsabilidades
- **BFF Pattern**: Backend optimizado para frontend
- **ES6+**: Sintaxis moderna JavaScript

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

## 🚀 **Cómo Levantar el Proyecto**

### **📋 Opción 1: Iniciar con Documentación (Recomendado)**

#### **Paso 1: Levantar Documentación Docsify**
```bash
# Terminal 1: Documentación
cd docsify
python -m http.server 8080
```
**📖 Abrir**: `http://localhost:8080` y revisar la guía completa

#### **Paso 2: Seguir Guía de Ejecución**
1. Navegar a **"Frontend + BFF"** → **"🎨 Arquitectura Frontend"**
2. Revisar sección **"🚀 Ejecución y Deployment"**
3. Seguir las instrucciones paso a paso

---

### **📋 Opción 2: Ejecución Rápida (Sin Documentación)**

#### **Modo Desarrollo (Separado)**
```bash
# Terminal 1: Backend API
cd backend && npm install && npm start
# → http://localhost:3004

# Terminal 2: Frontend + BFF
cd frontend && npm install
cd frontend/bff && npm install
cd .. && npm run start:dev
# → Frontend: http://localhost:5173
# → BFF API: http://localhost:3001
```

#### **Modo Producción Simulada (Junto)**
```bash
# Terminal 1: Backend API
cd backend && npm install && npm start
# → http://localhost:3004

# Terminal 2: Frontend + BFF (todo junto)
cd frontend && npm install
cd frontend/bff && npm install
npm run prod
# → Frontend + BFF: http://localhost:3001
```

---

### **📚 Documentación Completa**

#### **¿Qué encontrarás en Docsify?**
- 📖 **Guía completa**: Paso a paso para entender el proyecto
- 🏗️ **Arquitectura**: Frontend, BFF, Backend explicados
- 🔌 **API Reference**: Todos los endpoints disponibles
- 🎨 **Componentes**: Detalle de cada componente React
- 🔄 **Flujo de datos**: Cómo se comunican las partes
- 🛠️ **Troubleshooting**: Solución de problemas comunes

#### **Acceso a Documentación**
```bash
cd docsify
python -m http.server 8080
# Abrir: http://localhost:8080
```

#### **Navegación en Docsify**
- **Inicio**: Vista general del proyecto
- **Frontend + BFF**: Arquitectura del frontend
- **Guías**: Desarrollo y configuración
- **Documentación**: API y backend

---

### **🌐 URLs Finales**

| Servicio | Desarrollo | Producción Simulada |
|-----------|-------------|-------------------|
| **Documentación** | `http://localhost:8080` | `http://localhost:8080` |
| **Backend API** | `http://localhost:3004` | `http://localhost:3004` |
| **Frontend Dev** | `http://localhost:5173` | - |
| **BFF API** | `http://localhost:3001` | `http://localhost:3001` |
| **Frontend + BFF** | - | `http://localhost:3001` |

---

### **🎯 Flujo Recomendado**

1. **📖 Levantar Docsify** y revisar documentación
2. **🚀 Ejecutar** según modo deseado (dev/prod)
3. **🌐 Navegar** a la URL correspondiente
4. **✅ Validar** que todo funcione correctamente

### **🔍 Verificación de Funcionamiento**

#### **Backend API**
```bash
curl http://localhost:3004/
# Debe responder: "Sales Core Platform API"
```

#### **BFF**
```bash
curl http://localhost:3001/health
# Debe responder: {"status": "ok", "service": "bff"}
```

#### **Frontend**
- Abrir URL en navegador
- Ver listado de productos
- Probar agregar al carrito
- Validar que carguen imágenes

---

## 📚 **Para Saber Más**

### **📖 Documentación Detallada**
- **Frontend Architecture**: `docsify/frontend-bff-architecture.md`
- **API Endpoints**: `docsify/backend/api-endpoints.md`
- **Guía de Desarrollo**: `docsify/guide/development.md`

### **🎯 Recomendación**
**Levantar primero la documentación Docsify** y seguir la guía paso a paso. Ahí encontrarás:
- Explicación detallada de cada componente
- Diagramas de flujo
- Ejemplos de código
- Solución de problemas comunes

## 3° Etapa - Frontend React + BFF Pattern

### 📋 **Enunciado Oficial del TP**

> **3° Etapa del trabajo práctico**
> 
> En esta tercera entrega, el objetivo es crear una interfaz o usar una existente para vincular nuestro servidor con ella usando el modelo de multirepo o monorepo según sea su preferencia. Se debe tener en cuenta las estructuras estudiadas de la materia para poder tener una buena organización entre ambas partes de la aplicación.
> 
> **Se deberá desarrollar vistas que cumplan estas funciones:**
> 
> - Un listado de todos los productos a la venta.
> - Una pagina donde se puedan filtrar productos por su categoria o tipo de producto.
> - La funcionalidad de añadir productos a un carrito de compra que puede guardar su información en el localStorage.
> - La funcionalidad de comprar que debería interactuar con el back-end para poder generar una orden de compra de los productos y el usuario.
> - Es opcional el uso cualquier framework de desarrollo front-end como de estilos. Se recomienda ver el material extra sobre tailwind y Astro para explorar más herramientas.
> 
> **La entrega de esta etapa debe ser enviando el link de su repositorio.**
> 
> **Abierta desde 05/05/2026 00:00 hasta 16/05/2026 23:59**

---

### ✅ **Requisitos Cumplidos**

#### **🎯 Funcionalidades Requeridas**
- [x] **Listado de productos**: ✅ Grid responsive con cards
- [x] **Filtrado por categoría**: ✅ Filtros dinámicos y búsqueda
- [x] **Carrito de compras**: ✅ LocalStorage persistencia
- [x] **Funcionalidad de compra**: ✅ Integración con backend

#### **🏗️ Arquitectura Implementada**
- [x] **Monorepo**: ✅ Estructura organizada
- [x] **BFF Pattern**: ✅ Backend for Frontend
- [x] **ES6 Modules**: ✅ Sintaxis moderna en todo el proyecto

#### **🛠️ Tecnologías Utilizadas**
- [x] **React 19**: ✅ Componentes modernos con hooks
- [x] **Tailwind CSS**: ✅ Estilos responsive y modernos
- [x] **Express.js**: ✅ BFF y Backend
- [x] **Axios**: ✅ Cliente HTTP
- [x] **LocalStorage**: ✅ Persistencia del carrito

#### **🎨 Frontend React**
- [x] **ProductCard**: ✅ Card individual de producto
- [x] **ProductList**: ✅ Grid con loading/error states
- [x] **FilterBar**: ✅ Búsqueda y filtros dinámicos
- [x] **ShoppingCart**: ✅ Carrito lateral con checkout
- [x] **useCart**: ✅ Hook personalizado para gestión

#### **🔗 BFF (Backend for Frontend)**
- [x] **Proxy API**: ✅ Comunicación optimizada con backend
- [x] **Endpoints frontend**: ✅ Adaptados para UI
- [x] **CORS configurado**: ✅ Cross-origin habilitado
- [x] **Error handling**: ✅ Manejo centralizado de errores

#### **🌟 Características Adicionales**
- [x] **Responsive Design**: ✅ Mobile-first con Tailwind
- [x] **Loading states**: ✅ UX mejorada
- [x] **Error handling**: ✅ Mensajes claros para usuario
- [x] **Imagen por defecto**: ✅ PNG con fallback
- [x] **Producción simulada**: ✅ BFF sirve frontend

---

### 🚀 **Funcionalidades del E-commerce Implementadas**

#### **📦 Catálogo de Productos**
- ✅ **Listado completo**: Todos los productos disponibles
- ✅ **Grid responsive**: Adaptado a mobile/tablet/desktop
- ✅ **Cards informativas**: Imagen, precio, stock, badges
- ✅ **Loading states**: Indicadores durante carga
- ✅ **Error handling**: Mensajes claros de error

#### **🔍 Búsqueda y Filtros**
- ✅ **Búsqueda textual**: Por nombre de producto
- ✅ **Filtro por categoría**: Selección dinámica
- ✅ **Productos destacados**: Toggle para ver solo destacados
- ✅ **Filtros combinados**: Aplicación múltiple simultánea
- ✅ **Reset de filtros**: Volver al estado inicial

#### **🛒 Carrito de Compras**
- ✅ **Agregar/Quitar**: Gestión completa de items
- ✅ **Actualizar cantidades**: Incremento/decremento
- ✅ **Persistencia**: Guardado automático en localStorage
- ✅ **Cálculo automático**: Subtotal y total
- ✅ **Visual feedback**: Estados visuales del carrito

#### **💳 Checkout y Compra**
- ✅ **Formulario completo**: Datos de usuario y envío
- ✅ **Validación**: Campos requeridos
- ✅ **Procesamiento**: Envío a backend via BFF
- ✅ **Confirmación**: Feedback de éxito/error
- ✅ **Limpieza**: Carrito se vacía tras compra

---

### 📊 **Entrega y Repositorio**

#### **🔗 Link del Repositorio**
- **URL**: `https://github.com/TU_USERNAME/sales-core-platform`
- **Estructura**: Monorepo con frontend, bff, backend
- **Documentación**: Docsify con guía completa

#### **📅 Fechas del TP**
- **Apertura**: 05/05/2026 00:00
- **Cierre**: 16/05/2026 23:59
- **Estado**: ✅ **COMPLETADO Y ENTREGADO**

#### **🎯 Cumplimiento Total**
- ✅ **Todos los requisitos**: Implementados y funcionando
- ✅ **Estructura organizada**: Monorepo limpio
- ✅ **Documentación completa**: Docsify + README
- ✅ **Funcionalidades extras**: BFF, producción simulada
- ✅ **Código calidad**: ES6, hooks, componentes modernos

## 2° Etapa - Servidor Express.js y Rutas de Enrutamiento

### 📋 **Enunciado Oficial del TP**

> **2° Etapa del trabajo práctico**
> 
> **Requisitos mínimos de endpoints:**
> - ✅ **2 solicitudes con el método GET** para consultar datos
> - ✅ **2 solicitudes con el método POST** para crear nuevos registros o solicitar datos donde los parámetros sean sensibles
> - ✅ **1 solicitud con el método PUT** para actualizar registros existentes
> - ✅ **En al menos una de las estructuras, debe incluirse una solicitud de DELETE**
> 
> **Integridad de datos:**
> - Es importante destacar que al eliminar un registro, se debe considerar la integridad de los datos. Por ejemplo, si se tiene una estructura en la que un usuario está relacionado con una venta, no se puede eliminar al usuario sin antes eliminar o modificar la venta correspondiente. Esto garantiza la consistencia de los datos, evitando situaciones en las que una venta esté relacionada con un ID que ya no existe.

---

### ✅ **Requisitos Cumplidos**

#### **🎯 Requisitos Mínimos de Métodos HTTP**
- ✅ **2 solicitudes GET**: Consulta de datos implementada
- ✅ **2 solicitudes POST**: Creación y parámetros sensibles implementados
- ✅ **1 solicitud PUT**: Actualización de registros implementada
- ✅ **1 solicitud DELETE**: Eliminación con integridad de datos implementada

#### **📦 Productos - Cumple Requisitos (2 GET, 2 POST, 1 PUT)**
- ✅ **GET** `/api/products` - Consultar todos los productos
- ✅ **GET** `/api/products/:id` - Consultar producto por ID
- ✅ **POST** `/api/products` - Crear nuevo producto
- ✅ **POST** `/api/products/search` - Búsqueda avanzada (parámetros sensibles)
- ✅ **PUT** `/api/products/:id` - Actualizar producto existente

#### **👥 Usuarios - Cumple Requisitos + DELETE (2 GET, 2 POST, 1 PUT, 1 DELETE)**
- ✅ **GET** `/api/users` - Consultar todos los usuarios
- ✅ **GET** `/api/users/:id` - Consultar usuario por ID
- ✅ **POST** `/api/users` - Crear nuevo usuario
- ✅ **POST** `/api/users/login` - Inicio de sesión (parámetros sensibles: email, contraseña)
- ✅ **PUT** `/api/users/:id` - Actualizar usuario existente
- ✅ **DELETE** `/api/users/:id` - Eliminar usuario **con integridad de datos**

#### **💰 Ventas - Cumple Requisitos (2 GET, 2 POST, 1 PUT)**
- ✅ **GET** `/api/sales` - Consultar todas las ventas
- ✅ **GET** `/api/sales/:id` - Consultar venta por ID
- ✅ **POST** `/api/sales` - Crear nueva venta
- ✅ **POST** `/api/sales/statistics` - Estadísticas (parámetros sensibles: fechas, user_id)
- ✅ **PUT** `/api/sales/:id` - Actualizar venta existente

---

### 🔒 **Integridad de Datos Implementada**

#### **DELETE `/api/users/:id` - Verificación Completa**
```javascript
// Verificación de integridad referencial
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  
  // 1. Verificar si el usuario tiene ventas asociadas
  const userSales = sales.filter(sale => sale.user_id === userId);
  
  if (userSales.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'No se puede eliminar el usuario',
      message: 'El usuario tiene ventas asociadas. Elimine primero las ventas o modifique el user_id'
    });
  }
  
  // 2. Si no hay ventas, proceder con eliminación
  const filteredUsers = users.filter(user => user.id !== userId);
  saveUsers(filteredUsers);
  
  res.json({
    success: true,
    message: 'Usuario eliminado correctamente'
  });
};
```

#### **🛡️ Protección de Datos**
- ✅ **Verificación previa**: Revisa relaciones antes de eliminar
- ✅ **Error descriptivo**: Mensaje claro de por qué no se puede eliminar
- ✅ **Consistencia**: Evita ventas huérfanas
- ✅ **Código 400**: Respuesta HTTP apropiada para error del cliente

---

### 📊 **Persistencia y Respuestas Implementadas**

#### **💾 Persistencia en Ventas**
- ✅ **Archivo JSON**: `backend/mock/ventas.json`
- ✅ **Auto-increment**: ID automático para nuevas ventas
- ✅ **Timestamp**: Fecha y hora de creación
- ✅ **Relaciones**: user_id y productos asociados

#### **🔐 Respuesta de User/Login**
```javascript
// POST /api/users/login - Respuesta implementada
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "token": "jwt_token_aqui"  // Token de sesión
  },
  "message": "Login exitoso"
}

// Error de login
{
  "success": false,
  "error": "Credenciales inválidas",
  "message": "Email o contraseña incorrectos"
}
```

#### **📈 Estadísticas de Ventas**
- ✅ **Filtrado por fechas**: Rango temporal configurable
- ✅ **Filtrado por usuario**: Ventas por user_id específico
- ✅ **Cálculos automáticos**: Total, promedio, cantidad
- ✅ **Parámetros sensibles**: En body POST (no en URL)

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
