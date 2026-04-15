# Arquitectura - TP Aplicaciones Web 2

## Visión General

La arquitectura del TP de **Aplicaciones Web 2** está diseñada para ser progresiva, comenzando con una estructura simple basada en JSON estático y evolucionando hacia una aplicación full-stack completa.

## Stack Tecnológico (Por Entregas)

### Entrega 1 - Datos y Documentación
- **Datos**: JSON estático (mocks)
- **Documentación**: Docsify
- **Servidor**: HTTP server estático
- **Validación**: JavaScript básico

### Entrega 2 - Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos y responsive design
- **JavaScript Vanilla**: Lógica del cliente
- **Fetch API**: Consumo de datos JSON

### Entrega 3 - Backend (Opcional/Avanzado)
- **Node.js**: Servidor backend
- **Express.js**: Framework web
- **Database**: PostgreSQL o MongoDB
- **API REST**: Endpoints completos

## Estructura del Proyecto

```
sales-core-platform/
mocks/                 # Datos JSON (Entrega 1)
  usuarios.json       # Usuarios del sistema
  productos.json      # Catálogo de productos
  ventas.json         # Registro de ventas

docs/                  # Documentación (Entrega 1)
  guide/              # Guías del proyecto
  _sidebar.md         # Navegación lateral
  _navbar.md          # Navegación superior

public/                # Recursos estáticos (Entrega 2)
  css/                # Hojas de estilo
  js/                 # Scripts del cliente
  images/             # Imágenes de productos

src/                   # Código fuente (Entrega 3)
  components/         # Componentes UI
  services/           # Servicios de API
  utils/              # Utilidades
```

## Modelo de Datos

### Relaciones entre Entidades

```
Usuarios (1) ----< (N) Ventas > (N) ---- (1) Productos
```

### Flujo de Datos Actual (Entrega 1)

1. **Datos Estáticos**: Archivos JSON en carpeta `mocks/`
2. **Lectura**: Fetch API desde JavaScript
3. **Validación**: Verificación de integridad de datos
4. **Presentación**: UI que consume los datos

### Flujo de Datos Futuro (Entrega 2)

1. **Interacción del Usuario**: Eventos en la UI
2. **Procesamiento**: JavaScript vanilla
3. **Manipulación de Datos**: CRUD sobre JSON
4. **Actualización de UI**: DOM manipulation

## Patrones de Diseño Aplicados

### 1. Separación de Responsabilidades
- **Datos**: JSON files
- **Presentación**: HTML/CSS
- **Lógica**: JavaScript
- **Documentación**: Markdown

### 2. Arquitectura Basada en Componentes (Futura)
```javascript
// Estructura de componentes planificada
const AppComponent = {
  users: new UserService(),
  products: new ProductService(),
  sales: new SalesService()
};
```

### 3. Patrón Repository (Para Backend)
```javascript
class UserRepository {
  async findAll() { /* ... */ }
  async findById(id) { /* ... */ }
  async create(user) { /* ... */ }
  async update(id, user) { /* ... */ }
  async delete(id) { /* ... */ }
}
```

## Consideraciones de Escalabilidad

### De JSON a Base de Datos
```javascript
// Transición planificada
// JSON actual -> MongoDB/PostgreSQL
{
  "id": 1,           // -> ObjectId / SERIAL
  "nombre": "Juan",  // -> VARCHAR
  "activo": true     // -> BOOLEAN
}
```

### De Cliente a Full-Stack
- **Phase 1**: Static JSON + Client-side processing
- **Phase 2**: Server-side API + Database
- **Phase 3**: Authentication + Security

## Validación de Datos

### Reglas de Negocio Implementadas
```javascript
// Validaciones actuales
const validateUser = (user) => {
  return user.email.includes('@') && 
         user.nombre.length > 0 &&
         typeof user.activo === 'boolean';
};

const validateSale = (sale) => {
  return sale.total > 0 && 
         sale.productos.length > 0 &&
         sale.id_usuario > 0;
};
```

## Seguridad (Consideraciones Futuras)

### Nivel 1 - Validación Cliente
- Validación de formularios
- Sanitización de entrada
- Verificación de tipos

### Nivel 2 - Seguridad Backend
- Autenticación JWT
- Rate limiting
- CORS configuration
- Input validation

## Testing Strategy

### Entrega 1
- Validación de estructura JSON
- Verificación de tipos de datos
- Consistencia de relaciones

### Entrega 2
- Unit tests para funciones JavaScript
- Integration tests para UI
- Manual testing de flujo completo

### Entrega 3
- API endpoint testing
- Database integration tests
- Security testing

## Deploy Strategy

### Entrega 1 - GitHub Pages
- Documentación estática
- JSON files accesibles
- No requiere backend

### Entrega 2 - Netlify/Vercel
- Frontend estático
- Serverless functions opcionales
- CDN para assets

### Entrega 3 - Cloud Platform
- Full-stack application
- Database hosting
- CI/CD pipeline
