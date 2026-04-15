# Guía de Contribución - TP Aplicaciones Web 2

## Contexto Académico

Esta guía está diseñada para el trabajo práctico de **Aplicaciones Web 2**. La "contribución" en este contexto se refiere al desarrollo individual del TP según los requisitos de cada entrega.

## Flujo de Trabajo del TP

### 1. Configuración Inicial del Repositorio

**Para el estudiante:**

```bash
# 1. Crear tu propio repositorio
# Ve a GitHub y crea un nuevo repositorio: "sales-core-platform-tp"

# 2. Clonar localmente
git clone https://github.com/TU_USERNAME/sales-core-platform-tp.git
cd sales-core-platform-tp

# 3. Configurar estructura base
mkdir mocks guide
touch index.html README.md _sidebar.md _navbar.md
```

### 2. Desarrollo por Entregas

#### **Entrega 1 - Módulo 2** (Estructura de Datos)

```bash
# Crear archivos JSON
touch mocks/usuarios.json mocks/productos.json mocks/ventas.json

# Implementar datos según especificaciones
# Editar archivos JSON con la estructura requerida

# Crear documentación
# Editar index.html, guías, etc.

# Commit de entrega 1
git add .
git commit -m "feat: entrega 1 - estructura de datos y documentación"
git tag -a "entrega-1" -m "Entrega 1 - Módulo 2"
git push origin main --tags
```

#### **Entrega 2 - Módulo 4** (Frontend)

```bash
# Crear rama de desarrollo
git checkout -b feature/frontend

# Estructura frontend
mkdir -p public/{css,js,images}

# Desarrollo de interfaces
# HTML, CSS, JavaScript

# Testing y validación
# Probar funcionalidad

# Merge y tag
git checkout main
git merge feature/frontend
git tag -a "entrega-2" -m "Entrega 2 - Módulo 4"
git push origin main --tags
```

#### **Entrega Final - TP Completo**

```bash
# Desarrollo final
# Backend, integración, testing

# Commit final
git add .
git commit -m "feat: TP final - integración completa"
git tag -a "final" -m "TP Final - Versión completa"
git push origin main --tags
```

## Requisitos de "Contribución" por Entrega

### Entrega 1 - Estructura de Datos

#### Checklist Obligatorio
- [ ] **3 archivos JSON** en `mocks/`
  - [ ] `usuarios.json` con mínimo 5 usuarios
  - [ ] `productos.json` con mínimo 8 productos  
  - [ ] `ventas.json` con mínimo 6 ventas
- [ ] **Tipos de datos**: numéricos, cadenas, booleanos
- [ ] **Coherencia**: relaciones válidas entre entidades
- [ ] **Documentación** completa con Docsify
- [ ] **README.md** con contexto del TP

#### Validación de Calidad
```javascript
// Script para auto-validar entrega 1
const validateEntrega1 = () => {
  const checks = {
    jsonFiles: validateJSONFiles(),
    dataTypes: validateDataTypes(),
    coherence: validateRelationships(),
    documentation: validateDocsify(),
    readme: validateREADME()
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  return { status: score >= 4 ? 'PASS' : 'FAIL', checks, score };
};
```

### Entrega 2 - Desarrollo Frontend

#### Checklist Obligatorio
- [ ] **Interfaz principal** funcional
- [ ] **Consumo de JSON** desde `mocks/`
- [ ] **Catálogo de productos** con filtrado
- [ ] **Gestión de usuarios** básica
- [ ] **Sistema de ventas** funcional
- [ ] **Responsive design**
- [ ] **Validación de formularios**

#### Validación Funcional
```javascript
// Tests manuales recomendados
const manualTests = [
  "La aplicación carga sin errores",
  "Los datos JSON se consumen correctamente",
  "El catálogo muestra productos",
  "El filtro por categoría funciona",
  "El formulario de venta es válido",
  "Responsive design en móvil"
];
```

### Entrega Final - Integración Completa

#### Checklist Obligatorio (si aplica backend)
- [ ] **API REST** funcional
- [ ] **Base de datos** conectada
- [ ] **Autenticación** implementada
- [ ] **Panel de administración**
- [ ] **Testing** completo
- [ ] **Deploy** en producción

## Estándares de Código para el TP

### Convenciones de Nomenclatura
```javascript
// Variables y funciones: camelCase
const getUserById = async (id) => { /* ... */ };
const userName = 'Juan';

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8080';
const MAX_USERS_PER_PAGE = 10;

// Archivos: kebab-case
// user-service.js, product-list.css, sales-form.html

// Clases: PascalCase
class UserService { /* ... */ }
class ProductManager { /* ... */ }
```

### Estructura de Archivos
```bash
# Estructura recomendada para entrega 2
sales-core-platform/
mocks/                    # Datos JSON
  usuarios.json
  productos.json
  ventas.json

public/                   # Frontend
  index.html             # Página principal
  css/
    style.css            # Estilos principales
    components.css       # Componentes
  js/
    app.js               # Aplicación principal
    api.js               # Consumo de datos
    utils.js             # Utilidades
    validation.js        # Validaciones
  images/               # Imágenes

docs/                   # Documentación
  guide/               # Guías del TP
  _sidebar.md          # Navegación
  _navbar.md           # Barra superior

index.html             # Docsify
README.md              # Contexto del TP
package.json           # Dependencias (si aplica)
```

## Testing y Validación

### Testing Automático (Recomendado)
```javascript
// test/tp-validation.js
const fs = require('fs');
const path = require('path');

class TPValidator {
  validateEntrega1() {
    const results = {
      jsonFiles: this.checkJSONFiles(),
      dataTypes: this.checkDataTypes(),
      coherence: this.checkCoherence(),
      documentation: this.checkDocumentation()
    };
    
    return this.generateReport(results);
  }
  
  checkJSONFiles() {
    const required = ['usuarios.json', 'productos.json', 'ventas.json'];
    return required.every(file => 
      fs.existsSync(path.join('mocks', file))
    );
  }
  
  // ... más métodos de validación
}

module.exports = TPValidator;
```

### Testing Manual (Obligatorio)
```bash
# Script de testing manual
echo "=== Testing Manual TP Aplicaciones Web 2 ==="

# Test 1: Validación JSON
echo "1. Validando archivos JSON..."
python -m json.tool mocks/usuarios.json > /dev/null
python -m json.tool mocks/productos.json > /dev/null  
python -m json.tool mocks/ventas.json > /dev/null

# Test 2: Documentación
echo "2. Probando documentación..."
python -m http.server 8080 &
SERVER_PID=$!
sleep 2
curl -f http://localhost:8080 > /dev/null
kill $SERVER_PID

# Test 3: Coherencia de datos
echo "3. Verificando coherencia..."
node validate-coherence.js

echo "=== Tests completados ==="
```

## Entrega y Evaluación

### Preparación para Entrega

#### 1. Verificación Final
```bash
# Ejecutar todos los tests
npm test  # o node test-all.js

# Verificar estructura
ls -la mocks/ public/ docs/

# Validar JSON
for file in mocks/*.json; do
  python -m json.tool "$file" > /dev/null || echo "Error en $file"
done
```

#### 2. Documentación de Entrega
```markdown
## Entrega 1 - Módulo 2

### Link del Repositorio
https://github.com/TU_USERNAME/sales-core-platform-tp

### Link de Documentación
https://TU_USERNAME.github.io/sales-core-platform-tp

### Características Implementadas
- [x] 3 archivos JSON interrelacionados
- [x] Tipos de datos: numéricos, cadenas, booleanos
- [x] Coherencia entre entidades
- [x] Documentación completa con Docsify

### Testing Realizado
- Validación de sintaxis JSON
- Verificación de relaciones
- Testing de documentación
```

#### 3. Comunicación con Evaluadores
```markdown
### Notas para el Evaluador

1. **Acceso**: El repositorio es público y accesible
2. **Documentación**: Disponible en GitHub Pages
3. **Estructura**: Organizada según requisitos del TP
4. **Testing**: Scripts de validación incluidos
5. **Contexto**: TP para materia Aplicaciones Web 2
```

## Preguntas Frecuentes (FAQ)

### **¿Puedo usar frameworks frontend?**
- **Entrega 1**: No recomendado, enfócate en datos y documentación
- **Entrega 2**: Sí, pero especifica cuál y por qué
- **Entrega Final**: Sí, considera el contexto educativo

### **¿Necesito backend para la entrega 1?**
No, la entrega 1 se enfoca exclusivamente en estructura de datos y documentación.

### **¿Puedo cambiar la estructura de los JSON?**
Sí, siempre que mantengas los tipos de datos requeridos y la coherencia.

### **¿Cómo demuestro que mi TP funciona?**
- Screenshots de la aplicación funcionando
- Videos cortos demostrando funcionalidad
- Links a deploy funcional
- Tests automatizados que pasan

### **¿Qué pasa si no termino todo en una entrega?**
Entrega lo que tengas hecho, documenta lo falta y explica el plan para completarlo.

---

**Importante**: Este es un trabajo práctico educativo. Enfócate en aprender y demostrar los conceptos de la materia, no en crear un producto comercial.

### 2. Configura tu Entorno

```bash
# Agregar upstream remoto
git remote add upstream https://github.com/Gigena-Cod/sales-core-platform.git

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

### 3. Flujo de Trabajo

1. **Crea una rama** para tu feature
```bash
git checkout -b feature/nombre-del-feature
```

2. **Desarrolla** tus cambios
3. **Asegúrate** de que todo funciona
4. **Haz commit** de tus cambios
5. **Push** a tu fork
6. **Crea un Pull Request**

## Tipos de Contribuciones

### Bug Reports

Si encuentras un bug, por favor:

1. **Busca** si ya existe un issue
2. **Crea un nuevo issue** con:
   - Título descriptivo
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Entorno (SO, navegador, versión)
   - Capturas de pantalla si aplica

### Feature Requests

1. **Abre un issue** describiendo el feature
2. **Explica el caso de uso**
3. **Discute la implementación** antes de codificar

### Contribuciones de Código

#### Antes de Codificar

1. **Abre un issue** para discutir cambios grandes
2. **Revisa la arquitectura** existente
3. **Planifica la implementación**

#### Durante el Desarrollo

1. **Sigue las convenciones** de código
2. **Escribe tests** para tu código
3. **Actualiza la documentación**
4. **Mantén los cambios pequeños** y enfocados

#### Convenciones de Código

- **TypeScript** para todo el código nuevo
- **ESLint y Prettier** para formateo
- **Conventional Commits** para mensajes
- **Tests unitarios** para lógica de negocio

### Documentación

- **Corrige typos** y errores gramaticales
- **Mejora la claridad** de las explicaciones
- **Agrega ejemplos** de código
- **Actualiza** documentación obsoleta

## Estándares de Código

### Formato

```bash
# Formatear código
npm run format

# Linting
npm run lint

# Auto-fix
npm run lint:fix
```

### Nomenclatura

- **Componentes**: PascalCase (`UserProfile`)
- **Funciones**: camelCase (`getUserById`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Archivos**: kebab-case (`user-service.ts`)

### Estructura de Componentes

```typescript
// 1. Imports
import React from 'react';
import { User } from '../types/user';

// 2. Interface de props
interface Props {
  user: User;
  onUpdate: (user: User) => void;
}

// 3. Componente
const UserProfile: React.FC<Props> = ({ user, onUpdate }) => {
  // 4. Hooks
  const [isLoading, setIsLoading] = useState(false);
  
  // 5. Handlers
  const handleUpdate = useCallback(() => {
    onUpdate(user);
  }, [user, onUpdate]);
  
  // 6. Render
  return (
    <div className="user-profile">
      {/* JSX */}
    </div>
  );
};

export default UserProfile;
```

## Testing

### Requisitos

- **Cobertura mínima**: 80%
- **Tests unitarios** para lógica de negocio
- **Tests de componentes** para UI

### Ejemplos

```typescript
// Test de servicio
describe('UserService', () => {
  it('should return user by id', async () => {
    const user = await getUserById('1');
    expect(user.email).toBe('user@example.com');
  });
});

// Test de componente
describe('UserProfile', () => {
  it('should render user name', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    render(<UserProfile user={user} onUpdate={jest.fn()} />);
    
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

## Pull Requests

### Antes de Crear el PR

1. **Revisa** los cambios con `git diff`
2. **Ejecuta todos los tests**: `npm test`
3. **Ejecuta el linter**: `npm run lint`
4. **Formatea el código**: `npm run format`
5. **Actualiza la documentación** si es necesario

### Estructura del PR

#### Título
Usa conventional commits:
- `feat: agregar login con Google`
- `fix: corregir validación de email`
- `docs: actualizar guía de API`

#### Descripción
```markdown
## Cambios
- Agregar soporte para login con Google OAuth
- Actualizar componente de login
- Agregar tests para OAuth

## Testing
- [x] Tests unitarios
- [x] Tests de integración
- [x] Tests manuales

## Checklist
- [x] Código sigue las convenciones
- [x] Tests pasan
- [x] Documentación actualizada
```

### Proceso de Revisión

1. **Revisión automática**: CI/CD checks
2. **Revisión por pares**: Al menos un desarrollador
3. **Aprobación**: Required approvals antes de merge
4. **Merge**: Squash and merge para mantener el historial limpio

## Comunidad

### Canales de Comunicación

- **GitHub Issues**: Para bugs y features
- **GitHub Discussions**: Para preguntas generales
- **Discord**: (próximamente)

### Código de Conducta

Nos comprometemos a proporcionar un ambiente amigable y seguro:

- **Sé respetuoso** y considerate
- **Usa lenguaje inclusivo**
- **Acepta y da** feedback constructivo
- **Enfócate en lo que es mejor** para la comunidad

### Obtener Ayuda

Si necesitas ayuda:

1. **Revisa la documentación**
2. **Busca issues existentes**
3. **Crea un nuevo issue** con la etiqueta `question`
4. **Únete a las discusiones**

## Reconocimientos

### Contribuidores

Todos los contribuidores son reconocidos en:

- **README.md**: Lista de contribuidores
- **CHANGELOG.md**: Historial de cambios
- **GitHub Contributors**: Gráfico de contribuciones

### Tipos de Contribuciones Reconocidas

- **Código**: Features, fixes, tests
- **Documentación**: Guías, ejemplos, correcciones
- **Diseño**: UI/UX, logos, iconos
- **Comunidad**: Soporte, mentoring, organización

## Recursos

### Herramientas Recomendadas

- **VS Code**: Editor con extensiones recomendadas
- **GitHub Desktop**: Gestión de repositorios
- **Postman**: Testing de APIs
- **Chrome DevTools**: Debugging

### Aprendizaje

- **Documentación oficial**: React, TypeScript, Node.js
- **Cursos online**: FreeCodeCamp, Udemy
- **Tutoriales**: Blog oficial, YouTube

## Licencia

Al contribuir, aceptas que tus contribuciones estarán bajo la misma licencia del proyecto.

---

¡Gracias por contribuir! Tu ayuda hace que Sales Core Platform sea mejor para todos.
