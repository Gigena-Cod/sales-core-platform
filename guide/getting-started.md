# Guía de Inicio - TP Aplicaciones Web 2

Bienvenido al trabajo práctico de **Aplicaciones Web 2**. Esta guía te ayudará a entender y trabajar con la plataforma Sales Core Platform dentro del contexto del cursado.

## Contexto del Cursado

### Estructura de la Materia
La materia **Aplicaciones Web 2** se organiza en seis módulos:

- **Módulo Introductorio**: Presentación general y objetivos de aprendizaje
- **Módulo 1**: Contenido temático + Autoevaluación (formulario)
- **Módulo 2**: Contenido temático + **Instancia Evaluativa 1** (caso práctico)
- **Módulo 3**: Contenido temático + Autoevaluación (formulario)
- **Módulo 4**: Contenido temático + **Instancia Evaluativa 2** (situación profesional)
- **Módulo de Cierre**: Síntesis y proyecto final

### Condiciones para Ser Alumno Regular
- Obtener **4 puntos (60%)** o más en Instancia Evaluativa 1 (Módulo 2)
- Obtener **4 puntos (60%)** o más en Instancia Evaluativa 2 (Módulo 4)
- Obtener **4 puntos (60%)** o más en el promedio de actividades prácticas
- Participación activa en debates y foros propuestos por el tutor

## Contexto del TP

Este trabajo práctico consiste en desarrollar una plataforma de e-commerce para la venta de productos tecnológicos, aplicando progresivamente los conocimientos de cada módulo.

### Alineación con Módulos

#### **Módulo 2 - Instancia Evaluativa 1** (Semana 3)
**Entrega Actual**: Estructura de Datos y Documentación
- Crear archivos JSON interrelacionados
- Definir contexto de negocio coherente
- Implementar documentación profesional
- Verificar tipos de datos requeridos

#### **Módulo 4 - Instancia Evaluativa 2** (Semana 6)
**Próxima Entrega**: Desarrollo Frontend
- Implementar interfaces de usuario
- Crear catálogo de productos funcional
- Desarrollar sistema de ventas
- Aplicar validaciones y responsive design

#### **Módulo de Cierre - TP Final**
**Entrega Final**: Integración Completa
- Conectar frontend con backend
- Implementar autenticación y seguridad
- Crear panel de administración
- Realizar testing y deploy

## Estructura de Datos

### Archivos JSON Principales

El proyecto utiliza tres archivos JSON interrelacionados ubicados en la carpeta `mocks/`:

#### `mocks/usuarios.json`
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

#### `mocks/productos.json`
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

#### `mocks/ventas.json`
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

## Requisitos de la Entrega 1 (Módulo 2)

### Criterios de Evaluación - Instancia Evaluativa 1
**Nota mínima para regularidad**: 4 puntos (60%)

#### Aspectos Evaluados
1. **Estructura de Datos** (25%)
   - Creación correcta de archivos JSON interrelacionados
   - Implementación de todos los tipos de datos requeridos
   - Coherencia en las relaciones entre entidades

2. **Contexto de Negocio** (20%)
   - Definición clara del modelo de negocio
   - Lógica de las relaciones entre usuarios, productos y ventas
   - Escenarios realistas y consistentes

3. **Tipos de Datos Requeridos** (15%)
   - **Numéricos**: IDs, precios, cantidades, stocks, pesos, garantías
   - **Cadenas**: Nombres, descripciones, emails, fechas, direcciones
   - **Booleanos**: Estados de activación, disponibilidad, envío gratuito, premium

4. **Coherencia y Validación** (20%)
   - Los `id_usuario` en ventas corresponden a usuarios existentes
   - Los `id_producto` en ventas corresponden a productos existentes
   - Los cálculos de totales y subtotales son consistentes
   - Estados lógicos de ventas (completado, pendiente, cancelado)

5. **Documentación** (20%)
   - Documentación completa con Docsify
   - Guías claras y estructuradas
   - Explicación del contexto académico
   - Referencias y ejemplos de uso

### Verificación de Calidad

#### Validación Automática
```javascript
// Ejemplo de validación que puedes implementar
const validateTP1 = async () => {
  // Verificar existencia de archivos
  const files = ['usuarios.json', 'productos.json', 'ventas.json'];
  
  // Validar tipos de datos
  const hasNumeric = data => typeof data === 'number';
  const hasString = data => typeof data === 'string';
  const hasBoolean = data => typeof data === 'boolean';
  
  // Verificar coherencia de relaciones
  const validateRelationships = async () => {
    // Implementar validaciones aquí
  };
};
```

#### Checklist de Entrega
- [ ] **3 archivos JSON** en carpeta `mocks/`
- [ ] **Mínimo 5 usuarios** con datos completos
- [ ] **Mínimo 8 productos** con categorías variadas
- [ ] **Mínimo 6 ventas** con diferentes estados
- [ ] **Tipos de datos**: numéricos, cadenas, booleanos
- [ ] **Coherencia**: relaciones válidas entre entidades
- [ ] **Documentación**: completa con Docsify
- [ ] **README**: contexto del TP y criterios de evaluación
- [ ] **Link al repositorio**: GitHub público

### Puntos Críticos para Aprobación
1. **No tener errores de sintaxis JSON**
2. **Cumplir con todos los tipos de datos requeridos**
3. **Mantener coherencia en las relaciones**
4. **Documentación clara y profesional**
5. **Contexto académico bien definido**

## Visualización de la Documentación

Para ver la documentación completa:

```bash
# Iniciar servidor local
python -m http.server 8080

# Acceder a http://localhost:8080
```

## Próximos Pasos del TP

### Entrega 2 - Desarrollo Frontend
- Crear interfaces para gestión de usuarios
- Implementar catálogo de productos
- Desarrollar sistema de ventas

### Entrega 3 - Backend
- Implementar API REST
- Conectar con base de datos real
- Autenticación y seguridad

## Verificación de Datos

Puedes verificar la integridad de los datos JSON:

```javascript
// Ejemplo de verificación en consola
fetch('/mocks/usuarios.json')
  .then(response => response.json())
  .then(usuarios => console.log('Usuarios cargados:', usuarios.length));
```

## Recursos Adicionales

- [Documentación de arquitectura](architecture.md)
- [Referencia de datos](api.md)
- [Guía de desarrollo](development.md)
