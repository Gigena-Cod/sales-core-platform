# TP Aplicaciones Web 2 - Sales Core Platform

## Contexto del Cursado

Este trabajo práctico pertenece a la materia **Aplicaciones Web 2** de la carrera. La materia se estructura en seis módulos:

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

## Descripción del Proyecto

Este trabajo práctico consiste en el desarrollo de una plataforma de e-commerce para la gestión de ventas de productos tecnológicos, aplicando los conocimientos adquiridos durante el cursado.

### Objetivos de Aprendizaje

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

- **`backend/mock/usuarios.json`** - Datos de usuarios del sistema
- **`backend/mock/productos.json`** - Catálogo de productos disponibles
- **`backend/mock/ventas.json`** - Registro de transacciones realizadas

### Tipos de Datos Requeridos

- **Numéricos**: IDs, precios, cantidades, stocks, pesos, garantías
- **Cadenas**: Nombres, descripciones, emails, fechas, direcciones
- **Booleanos**: Estados de activación, disponibilidad, envío gratuito, premium

## Entregas del TP (Alineadas con Módulos)

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

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Architecture**: MVC Pattern with Services Layer
- **Datos**: JSON (mock data)
- **Documentación**: Docsify
- **Deploy**: GitHub Pages, Vercel, Netlify

## API Endpoints - Examples

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

## Navegación de la Documentación

Utiliza el menú lateral para explorar:

- **Guía de Inicio**: Configuración y primeros pasos
- **Arquitectura**: Estructura y patrones de diseño
- **API Reference**: Referencia de datos y endpoints
- **Configuración**: Setup del entorno
- **Despliegue**: Estrategias de deploy
- **Guías**: Desarrollo y contribución
- **Troubleshooting**: Solución de problemas

---

**Importante**: Este es un trabajo práctico educativo. Enfócate en aprender y demostrar los conceptos de la materia, no en crear un producto comercial.
