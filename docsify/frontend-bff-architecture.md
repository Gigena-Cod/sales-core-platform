# Frontend + BFF Architecture

## 📋 Tabla de Contenidos
- [Arquitectura General](#arquitectura-general)
- [Frontend React](#frontend-react)
- [BFF (Backend for Frontend)](#bff-backend-for-frontend)
- [Comunicación con Backend](#comunicación-con-backend)
- [Páginas y Componentes](#páginas-y-componentes)
- [Funcionalidades](#funcionalidades)
- [Flujo de Datos](#flujo-de-datos)
- [API Endpoints](#api-endpoints)

---

## 🏗️ Arquitectura General

### **Estructura del Proyecto**
```
sales-core-platform/
├── backend/           # API Principal (Express.js)
├── frontend/          # Frontend React + BFF
│   ├── bff/          # Backend for Frontend
│   └── src/          # Componentes React
└── docsify/          # Documentación
```

### **Flujo de Comunicación**
```
Frontend (React) → BFF (Express) → Backend (Express)
     5173              3003             3004
```

---

## ⚛️ Frontend React

### **Tecnologías Utilizadas**
- **React 19**: Componentes modernos con hooks
- **Vite**: Build tool rápido y moderno
- **Tailwind CSS**: Estilos responsive y utility-first
- **Axios**: Cliente HTTP para comunicarse con APIs
- **LocalStorage**: Persistencia del carrito de compras

### **Estructura de Componentes**
```
src/
├── components/           # Componentes UI
│   ├── ProductCard.jsx   # Card individual de producto
│   ├── ProductList.jsx   # Grid de productos
│   ├── FilterBar.jsx     # Barra de filtros y búsqueda
│   └── ShoppingCart.jsx  # Carrito de compras
├── hooks/              # Custom Hooks
│   └── useCart.js      # Gestión del carrito
├── services/           # Servicios API
│   └── api.js         # Cliente HTTP configurado
├── App.jsx            # Componente principal
└── main.jsx           # Entry point
```

---

## 🔗 BFF (Backend for Frontend)

### **¿Qué es el BFF?**
El BFF (Backend for Frontend) es un patrón de arquitectura donde creamos una API específica para el frontend que:
- **Simplifica** la comunicación con el backend principal
- **Adapta** los datos al formato que necesita el frontend
- **Optimiza** las respuestas para reducir payload
- **Centraliza** la lógica de negocio del frontend

### **Tecnologías del BFF**
- **Express.js**: Servidor web ligero
- **Axios**: Cliente HTTP para comunicarse con backend
- **CORS**: Habilita cross-origin requests
- **Helmet**: Seguridad HTTP headers
- **Morgan**: Logging de requests

### **Funciones Principales**
```javascript
// Proxy hacia backend principal
const backendRequest = async (method, endpoint, data = null) => {
  const response = await axios({
    method,
    url: `${BACKEND_URL}${endpoint}`,
    data
  });
  return response.data;
};
```

---

## 🌐 Comunicación con Backend

### **Configuración del API Client**
```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:3003'; // BFF

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
```

### **Interceptores**
```javascript
// Request interceptor
api.interceptors.request.use((config) => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

---

## 📄 Páginas y Componentes

### **1. ProductCard.jsx**
**Propósito**: Mostrar información individual de un producto

**Props**:
```javascript
{
  product: {
    id: number,
    nombre: string,
    precio: number,
    stock: number,
    categoria: string,
    destacado: boolean,
    disponible: boolean,
    imagen: string
  },
  onAddToCart: function,
  isInCart: boolean,
  getItemQuantity: function
}
```

**Funcionalidades**:
- ✅ Mostrar imagen del producto (con fallback)
- ✅ Formateo de precios (ARS)
- ✅ Indicadores de stock
- ✅ Badges de destacado/disponibilidad
- ✅ Botón de agregar al carrito

### **2. ProductList.jsx**
**Propósito**: Grid de productos con loading y error states

**Estado**:
```javascript
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

**Funcionalidades**:
- ✅ Fetch de productos desde BFF
- ✅ Loading states
- ✅ Error handling
- ✅ Grid responsive
- ✅ Integración con filtros

### **3. FilterBar.jsx**
**Propósito**: Barra de búsqueda y filtros

**Estado**:
```javascript
const [filters, setFilters] = useState({
  search: '',
  category: '',
  featured: false
});
```

**Funcionalidades**:
- ✅ Búsqueda por nombre
- ✅ Filtro por categoría
- ✅ Filtro de productos destacados
- ✅ Reset de filtros
- ✅ Fetch dinámico de categorías

### **4. ShoppingCart.jsx**
**Propósito**: Carrito de compras lateral con checkout

**Funcionalidades**:
- ✅ Mostrar productos en carrito
- ✅ Actualizar cantidades
- ✅ Eliminar productos
- ✅ Calcular totales
- ✅ Formulario de checkout
- ✅ Procesar compra

### **5. useCart.js (Custom Hook)**
**Propósito**: Gestión centralizada del carrito

**Estado y Funciones**:
```javascript
const {
  cart,                    // Array de productos
  addToCart,              // Agregar producto
  removeFromCart,          // Eliminar producto
  updateQuantity,          // Actualizar cantidad
  clearCart,              // Vaciar carrito
  getTotal,               // Calcular total
  getTotalItems           // Contar items
} = useCart();
```

**LocalStorage Integration**:
```javascript
// Persistencia automática
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

// Recuperación al iniciar
useEffect(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) setCart(JSON.parse(savedCart));
}, []);
```

---

## 🎯 Funcionalidades

### **1. Catálogo de Productos**
- **Listado completo**: Todos los productos disponibles
- **Grid responsive**: Adaptado a mobile/tablet/desktop
- **Loading states**: Indicadores de carga
- **Error handling**: Mensajes claros de error

### **2. Búsqueda y Filtros**
- **Búsqueda textual**: Por nombre de producto
- **Filtro por categoría**: Selección dinámica
- **Productos destacados**: Toggle para ver solo destacados
- **Filtros combinados**: Aplicación múltiple simultánea

### **3. Carrito de Compras**
- **Agregar/Quitar**: Gestión de items
- **Actualizar cantidades**: Incremento/decremento
- **Persistencia**: Guardado en localStorage
- **Cálculo automático**: Subtotal y total
- **Visual feedback**: Estados visuales

### **4. Checkout**
- **Formulario completo**: Datos de usuario y envío
- **Validación**: Campos requeridos
- **Procesamiento**: Envío a backend via BFF
- **Confirmación**: Feedback de éxito/error

### **5. Estados de Carga**
- **Skeleton loading**: Durante fetch de datos
- **Button states**: Durante acciones
- **Error boundaries**: Manejo de errores
- **Empty states**: Cuando no hay datos

---

## 🔄 Flujo de Datos

### **1. Carga de Productos**
```
1. Componente monta → useEffect
2. Llama a productsAPI.getProducts()
3. Axios hace request a BFF (localhost:3003)
4. BFF proxy a backend (localhost:3004)
5. Backend retorna datos
6. BFF procesa y retorna
7. Frontend actualiza estado
8. UI re-renderiza con productos
```

### **2. Agregar al Carrito**
```
1. Usuario clickea "Agregar"
2. Llama a onAddToCart(product)
3. useCart hook actualiza estado
4. LocalStorage se actualiza
5. UI re-renderiza carrito
6. Badge de cantidad se actualiza
```

### **3. Procesar Compra**
```
1. Usuario completa formulario
2. Llama a salesAPI.createSale()
3. Axios POST a BFF (/api/sales)
4. BFF transforma datos
5. BFF POST a backend (/api/sales)
6. Backend procesa venta
7. Backend confirma creación
8. BFF retorna respuesta
9. Frontend muestra confirmación
10. Carrito se vacía
```

---

## 📡 API Endpoints

### **Products API**
```javascript
// GET /api/products - Listar productos
GET /api/products?category=Electrónica
GET /api/products?featured=true
GET /api/products?search=laptop

// GET /api/products/:id - Producto específico
GET /api/products/1

// GET /api/categories - Lista categorías
GET /api/categories
```

### **Users API**
```javascript
// POST /api/users - Crear usuario
POST /api/users
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "password123"
}

// POST /api/users/login - Login
POST /api/users/login
{
  "email": "juan@email.com",
  "password": "password123"
}
```

### **Sales API**
```javascript
// POST /api/sales - Crear venta
POST /api/sales
{
  "user_id": 1,
  "address": "Calle 123",
  "payment_method": "tarjeta",
  "cart": [
    {
      "id": 1,
      "quantity": 2,
      "price": 15000
    }
  ]
}
```

### **Health Check**
```javascript
// GET /health - Estado del BFF
GET /health
{
  "status": "ok",
  "service": "bff",
  "timestamp": "2026-05-07T17:30:00.000Z",
  "backend": "http://localhost:3004"
}
```

---

## 🚀 Ejecución y Deployment

### **Development**
```bash
# Terminal 1: Backend
cd backend && npm start  # localhost:3004

# Terminal 2: Frontend + BFF
cd frontend && npm run start:dev
# Frontend: localhost:5173 (Vite dev server)
# BFF: localhost:3001 (API server)
```

### **Production (Simulado)**
```bash
# Opción 1: Build + BFF (recomendado)
cd frontend && npm run prod
# Frontend servido por BFF en localhost:3001
# Todo en un solo puerto!

# Opción 2: Manual
cd frontend && npm run build
cd frontend/bff && npm start
# Frontend servido por BFF en localhost:3001
```

### **Ventajas de Producción Simulada**
- ✅ **Un solo puerto**: Frontend + API en localhost:3001
- ✅ **Entorno real**: Simula producción exactamente
- ✅ **Sin CORS**: Todo en el mismo dominio
- ✅ **Build optimizado**: Archivos minificados y comprimidos

---

## 🎨 UI/UX Features

### **Responsive Design**
- **Mobile-first**: Diseño adaptativo
- **Breakpoints**: Tailwind responsive utilities
- **Touch-friendly**: Botones y gestures

### **Loading States**
- **Skeleton cards**: Durante carga de productos
- **Spinners**: En botones y acciones
- **Progress indicators**: En formularios

### **Error Handling**
- **User-friendly messages**: Errores comprensibles
- **Retry mechanisms**: Botones de reintentar
- **Fallbacks**: Imágenes por defecto

### **Accessibility**
- **Semantic HTML**: Estructura correcta
- **ARIA labels**: Screen readers
- **Keyboard navigation**: Tab order

---

## 📊 Performance Optimizations

### **Frontend**
- **Code splitting**: Lazy loading de componentes
- **Image optimization**: Lazy loading y placeholders
- **State management**: Efficient re-renders
- **Caching**: LocalStorage para carrito

### **BFF**
- **Request batching**: Múltiples calls en una
- **Data transformation**: Reducir payload
- **Caching headers**: Cache de respuestas
- **Compression**: Gzip enabled

---

## 🔧 Debugging y Monitoring

### **Frontend**
```javascript
// API request logging
console.log('API Request:', method, url);

// Error tracking
console.error('API Error:', error.response?.data);

// Cart state debugging
console.log('Cart updated:', cart);
```

### **BFF**
```javascript
// Morgan logging
app.use(morgan('combined'));

// Error middleware
app.use((err, req, res, next) => {
  console.error('BFF Error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
```

---

## 🎯 Best Practices Implementadas

### **Code Organization**
- **Component-based**: Reutilización y mantenibilidad
- **Custom hooks**: Lógica reutilizable
- **Service layer**: Abstracción de API
- **Error boundaries**: Manejo robusto de errores

### **Security**
- **CORS configurado**: Cross-origin seguro
- **Helmet headers**: Seguridad HTTP
- **Input validation**: Validación en frontend
- **Sanitization**: Limpieza de datos

### **Performance**
- **Lazy loading**: Componentes bajo demanda
- **Memoization**: React.memo y useMemo
- **Debouncing**: Búsqueda optimizada
- **Caching strategy**: LocalStorage inteligente

---

## 🚀 Próximos Pasos

### **Mejoras Planeadas**
- [ ] **React Router**: Navegación entre páginas
- [ ] **Pagination**: Para listados largos
- [ ] **Wishlist**: Lista de deseos
- [ ] **Reviews**: Sistema de calificaciones
- [ ] **Search avanzada**: Filtros múltiples
- [ ] **Admin panel**: Gestión de productos

### **Optimizaciones**
- [ ] **SSR**: Server-side rendering
- [ ] **PWA**: Progressive Web App
- [ ] **Testing**: Unit y E2E tests
- [ ] **CI/CD**: Automatización de deployment
- [ ] **Monitoring**: Métricas y analytics

---

## 📚 Referencias

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [BFF Pattern](https://samnewman.io/patterns/architectural/bff/)
- [Vite](https://vitejs.dev/)

---

*Última actualización: 7 de Mayo de 2026*
