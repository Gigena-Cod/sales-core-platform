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

## Endpoints de la API

### Productos
- `GET /api/productos` - Obtener todos los productos (con filtros opcionales: categoria, disponible, destacado)
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto (requiere: nombre, precio, categoria)
- `POST /api/productos/search` - Búsqueda avanzada de productos (body: query, precio_min, precio_max, categoria)
- `PUT /api/productos/:id` - Actualizar producto existente

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios (con filtros opcionales: activo, premium)
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `POST /api/usuarios` - Crear nuevo usuario (requiere: nombre, apellido, email, contraseña)
- `POST /api/usuarios/login` - Inicio de sesión (requiere: email, contraseña)
- `PUT /api/usuarios/:id` - Actualizar usuario existente
- `DELETE /api/usuarios/:id` - Eliminar usuario (verifica integridad de datos con ventas asociadas)

### Ventas
- `GET /api/ventas` - Obtener todas las ventas (con filtros opcionales: estado, id_usuario, metodo_pago)
- `GET /api/ventas/:id` - Obtener venta por ID
- `POST /api/ventas` - Crear nueva venta (requiere: id_usuario, direccion, productos, metodo_pago)
- `POST /api/ventas/estadisticas` - Obtener estadísticas de ventas (body: fecha_inicio, fecha_fin, id_usuario)
- `PUT /api/ventas/:id` - Actualizar venta existente

### General
- `GET /` - Ruta de bienvenida con información de la API

## Ejemplos de Uso de la API

### Productos
```bash
# Obtener todos los productos
curl http://localhost:3000/api/productos

# Filtrar productos por categoría
curl http://localhost:3000/api/productos?categoria=Electrónica

# Obtener productos destacados
curl http://localhost:3000/api/productos?destacado=true

# Crear nuevo producto
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Nuevo Producto","precio":299.99,"categoria":"Electrónica"}'

# Búsqueda avanzada
curl -X POST http://localhost:3000/api/productos/search \
  -H "Content-Type: application/json" \
  -d '{"query":"laptop","precio_min":500,"precio_max":1500}'
```

### Usuarios
```bash
# Obtener usuarios activos
curl http://localhost:3000/api/usuarios?activo=true

# Crear nuevo usuario
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","apellido":"Pérez","email":"juan@email.com","contraseña":"password123"}'

# Iniciar sesión
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@email.com","contraseña":"password123"}'
```

### Ventas
```bash
# Obtener ventas completadas
curl http://localhost:3000/api/ventas?estado=completado

# Crear nueva venta
curl -X POST http://localhost:3000/api/ventas \
  -H "Content-Type: application/json" \
  -d '{
    "id_usuario": 1,
    "direccion": "Calle 123, Ciudad",
    "productos": [{"id_producto": 1, "cantidad": 2}],
    "metodo_pago": "tarjeta_credito"
  }'

# Obtener estadísticas
curl -X POST http://localhost:3000/api/ventas/estadisticas \
  -H "Content-Type: application/json" \
  -d '{"fecha_inicio":"2024-01-01","fecha_fin":"2024-12-31"}'
```

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
