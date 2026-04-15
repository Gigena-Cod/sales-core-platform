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

Este trabajo práctico de **Aplicaciones Web 2** consiste en el desarrollo de una plataforma de e-commerce para la gestión de ventas de productos tecnológicos, aplicando los conocimientos adquiridos durante el cursado.

### Objetivos de Aprendizaje

Desarrollar una aplicación web completa que permita:
- Aplicar conceptos de desarrollo frontend y backend
- Implementar estructuras de datos interrelacionadas
- Gestionar usuarios y autenticación
- Crear catálogo de productos con búsqueda y filtrado
- Desarrollar sistema de ventas y procesamiento de pedidos
- Diseñar panel de administración
- Documentar el proyecto de manera profesional

### Objetivo del TP

Desarrollar una aplicación web completa que permita:
- Gestión de usuarios y autenticación
- Catálogo de productos con búsqueda y filtrado
- Sistema de ventas y procesamiento de pedidos
- Panel de administración

### Estructura de Datos

El proyecto utiliza tres archivos JSON interrelacionados como base de datos inicial:

- **`mocks/usuarios.json`** - Datos de usuarios del sistema
- **`mocks/productos.json`** - Catálogo de productos disponibles
- **`mocks/ventas.json`** - Registro de transacciones realizadas

### Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js (próximas entregas)
- **Datos**: JSON (mock data)
- **Documentación**: Docsify

## Documentación

La documentación completa del proyecto está disponible en [http://localhost:8080](http://localhost:8080)

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

## Ejecución

Para visualizar la documentación:

```bash
# Iniciar servidor local
python -m http.server 8080

# O usar cualquier servidor web estático
```

## Licencia

Proyecto educativo para la cátedra de Aplicaciones Web 2.