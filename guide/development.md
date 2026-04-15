# Guía de Desarrollo - TP Aplicaciones Web 2

## Contexto Académico

Esta guía está diseñada para el desarrollo progresivo del TP de **Aplicaciones Web 2**, alineado con los módulos y criterios de evaluación de la materia.

### Desarrollo por Módulos

#### **Módulo 2 - Instancia Evaluativa 1** (Semana 3)
**Foco**: Estructura de Datos y Documentación
- Creación de archivos JSON interrelacionados
- Implementación de documentación con Docsify
- Verificación de coherencia de datos

#### **Módulo 4 - Instancia Evaluativa 2** (Semana 6)  
**Foco**: Desarrollo Frontend
- Interfaces de usuario funcionales
- Consumo de datos JSON
- Validación y responsive design

#### **Módulo de Cierre - TP Final**
**Foco**: Integración Completa
- Conexión frontend-backend
- Autenticación y seguridad
- Testing y deploy

## Setup del Entorno de Desarrollo

### Prerrequisitos por Entrega

#### Entrega 1 (Módulo 2)
- Editor de código (VS Code recomendado)
- Servidor web local (Python, Live Server, etc.)
- Git para control de versiones
- Navegador web moderno

#### Entrega 2 (Módulo 4)
- Todo lo anterior +
- Node.js 16+ (opcional para build tools)
- npm o yarn
- Conocimientos de HTML5, CSS3, JavaScript

#### Entrega Final
- Todo lo anterior +
- Conocimientos de backend (Node.js/Express)
- Base de datos (PostgreSQL/MongoDB)

### Instalación Base

```bash
# Clonar repositorio (para el evaluador)
git clone https://github.com/TU_USERNAME/sales-core-platform.git
cd sales-core-platform

# Verificar estructura de archivos
ls mocks/  # Debe contener: usuarios.json, productos.json, ventas.json

# Iniciar servidor para documentación
python -m http.server 8080

# Acceder a http://localhost:8080
```

## Flujo de Trabajo Académico

### Flujo por Entregas del TP

#### **Entrega 1 - Módulo 2** (Estructura de Datos)

```bash
# 1. Verificar estructura base
git clone https://github.com/TU_USERNAME/sales-core-platform.git
cd sales-core-platform

# 2. Crear archivos JSON en mocks/
touch mocks/usuarios.json mocks/productos.json mocks/ventas.json

# 3. Implementar datos con coherencia
# Editar archivos JSON según especificaciones

# 4. Crear documentación con Docsify
# Editar index.html, _sidebar.md, guías

# 5. Validar y hacer commit
git add .
git commit -m "feat: entrega 1 - estructura de datos y documentación"
git push origin main

# 6. Preparar para evaluación
# Asegurar que el repositorio sea público
# Verificar link en la entrega de la materia
```

#### **Entrega 2 - Módulo 4** (Desarrollo Frontend)

```bash
# 1. Crear rama para desarrollo
git checkout -b feature/frontend-development

# 2. Estructura de frontend
mkdir -p public/{css,js,images}
touch public/index.html public/css/style.css public/js/app.js

# 3. Implementar consumo de JSON
# Desarrollar funciones fetch para leer mocks/

# 4. Crear interfaces
# HTML semántico, CSS responsive, JavaScript vanilla

# 5. Testing manual
# Probar en diferentes navegadores
# Verificar responsive design

# 6. Commit y merge
git add .
git commit -m "feat: entrega 2 - desarrollo frontend"
git checkout main
git merge feature/frontend-development
git push origin main
```

#### **Entrega Final - TP Completo**

```bash
# 1. Backend (si aplica)
mkdir -p src/{controllers,services,models}
npm init -y
npm install express cors helmet

# 2. Integración completa
# Conectar frontend con API endpoints
# Implementar autenticación
# Crear panel de administración

# 3. Testing y validación
# Unit tests, integration tests
# Validación de seguridad

# 4. Deploy
# Preparar para producción
# Documentación final

# 5. Entrega final
git add .
git commit -m "feat: TP final - integración completa"
git tag -a v1.0 -m "Versión final del TP"
git push origin main --tags
```

### Buenas Prácticas Académicas

#### 1. Version Control para Entregas
```bash
# Tags para cada entrega
git tag -a "entrega-1" -m "Entrega 1 - Módulo 2"
git tag -a "entrega-2" -m "Entrega 2 - Módulo 4"
git tag -a "final" -m "TP Final"

# Push de tags
git push origin --tags
```

#### 2. Documentación de Cambios
```markdown
## CHANGELOG.md

### [1.0.0] - 2024-04-15
#### TP Final
- Integración frontend-backend completa
- Sistema de autenticación implementado
- Panel de administración funcional
- Testing y validación completos

### [0.2.0] - 2024-04-01
#### Entrega 2 - Módulo 4
- Interfaces de usuario desarrolladas
- Consumo de datos JSON implementado
- Responsive design aplicado
- Validación de formularios

### [0.1.0] - 2024-03-15
#### Entrega 1 - Módulo 2
- Estructura de datos JSON creada
- Documentación con Docsify implementada
- Coherencia de datos validada
```

#### 3. Validación por Entrega
```javascript
// validation.js - Para verificar requisitos
const validateDelivery = (deliveryNumber) => {
  const checks = {
    1: () => {
      return {
        hasJSONFiles: checkFiles(['usuarios.json', 'productos.json', 'ventas.json']),
        hasDocumentation: checkFiles(['index.html', '_sidebar.md', '_navbar.md']),
        hasDataTypes: validateDataTypes(),
        hasCoherence: validateRelationships()
      };
    },
    2: () => {
      return {
        hasFrontend: checkFiles(['public/index.html', 'public/css/style.css', 'public/js/app.js']),
        consumesJSON: validateJSONConsumption(),
        hasResponsive: checkResponsive(),
        hasValidation: validateForms()
      };
    }
  };
  
  return checks[deliveryNumber]();
};
```

### Testing Académico

#### Verificación Automática
```bash
# Script para validar entrega 1
node validate-delivery1.js

# Output esperado:
# {
#   "status": "PASS",
#   "checks": {
#     "jsonFiles": "PASS",
#     "dataTypes": "PASS", 
#     "coherence": "PASS",
#     "documentation": "PASS"
#   },
#   "score": 10
# }
```

#### Testing Manual (Recomendado)
1. **Validación de JSON**: Abrir archivos en editor y verificar sintaxis
2. **Coherencia de datos**: Verificar relaciones manualmente
3. **Documentación**: Navegar por los docs con Docsify
4. **Funcionalidad**: Probar consumo de datos en navegador

## Convenciones de Código

### JavaScript/TypeScript

```typescript
// Usar TypeScript
interface User {
  id: string;
  email: string;
  name: string;
}

// Funciones con tipos
const getUserById = async (id: string): Promise<User> => {
  // implementación
};

// Componentes React
interface Props {
  user: User;
  onUpdate: (user: User) => void;
}

const UserProfile: React.FC<Props> = ({ user, onUpdate }) => {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
```

### CSS

```css
/* Usar BEM methodology */
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.card__header {
  padding: 16px;
  background: #f5f5f5;
}

.card__content {
  padding: 16px;
}

.card--highlighted {
  border-color: #007bff;
}
```

### Commits (Conventional Commits)

```
feat: agregar nueva funcionalidad
fix: corregir bug en login
docs: actualizar documentación
style: formatear código
refactor: refactorizar componente
test: agregar tests para auth
chore: actualizar dependencias
```

## Estructura de Archivos

```
src/
  components/          # Componentes reutilizables
    common/           # Componentes genéricos
    forms/            # Componentes de formularios
  pages/              # Páginas principales
    Dashboard/
    Users/
  hooks/              # Hooks personalizados
    useAuth.ts
    useApi.ts
  services/           # Servicios de API
    api.ts
    auth.ts
  utils/              # Utilidades
    helpers.ts
    constants.ts
  types/              # Definiciones TypeScript
    user.ts
    api.ts
  tests/              # Tests
    components/
    services/
```

## Testing

### Unit Tests con Jest

```typescript
// __tests__/userService.test.ts
import { getUserById } from '../services/userService';
import { mockUser } from './mocks/user';

describe('UserService', () => {
  it('should return user by id', async () => {
    const user = await getUserById('1');
    expect(user).toEqual(mockUser);
  });
});
```

### Component Tests con React Testing Library

```typescript
// __tests__/UserProfile.test.tsx
import { render, screen } from '@testing-library/react';
import { UserProfile } from '../UserProfile';
import { mockUser } from './mocks/user';

describe('UserProfile', () => {
  it('should render user information', () => {
    render(<UserProfile user={mockUser} onUpdate={jest.fn()} />);
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });
});
```

## Debugging

### VS Code Debug Configuration

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["start"]
    }
  ]
}
```

### Chrome DevTools

- Usa React DevTools para inspeccionar componentes
- Redux DevTools para estado de Redux
- Network tab para llamadas API

## Performance

### Optimizaciones

```typescript
// React.memo para componentes
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* contenido pesado */}</div>;
});

// useMemo para cálculos pesados
const ExpensiveCalculation = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return <div>Total: {expensiveValue}</div>;
};

// useCallback para funciones
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return <ChildComponent onClick={handleClick} />;
};
```

### Code Splitting

```typescript
// Lazy loading de componentes
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// En el componente
const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
```

## Buenas Prácticas

### 1. Manejo de Errores

```typescript
// Error boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Try-catch en async functions
const fetchData = async () => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
```

### 2. Seguridad

```typescript
// Sanitizar inputs
import DOMPurify from 'dompurify';

const SafeHTML = ({ html }) => {
  const cleanHTML = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

// Validación de datos
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
```

### 3. Accesibilidad

```typescript
// ARIA labels
<button 
  aria-label="Cerrar modal"
  onClick={handleClose}
>
  ×
</button>

// Keyboard navigation
const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);
  
  // ...
};
```
