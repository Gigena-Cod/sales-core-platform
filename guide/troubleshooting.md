# Troubleshooting

## Problemas Comunes

### Instalación

#### npm install falla

**Problema:**
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Soluciones:**
```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Si persiste, usar --legacy-peer-deps
npm install --legacy-peer-deps
```

#### Permisos denegados

**Problema:**
```bash
npm ERR! code EACCES
npm ERR! syscall open
npm ERR! path /node_modules/.cache
```

**Soluciones:**
```bash
# Cambiar permisos (Unix/Linux)
sudo chown -R $(whoami) ~/.npm

# Usar npx para evitar instalación global
npx create-react-app my-app

# Configurar npm global prefix
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
```

### Desarrollo

#### Puerto en uso

**Problema:**
```bash
Error: listen EADDRINUSE :::3000
```

**Soluciones:**
```bash
# Encontrar proceso usando el puerto
lsof -i :3000

# Matar proceso (Unix/Linux)
kill -9 <PID>

# Cambiar puerto en .env
PORT=3001 npm start

# Usar diferente puerto temporalmente
npm start -- --port=3001
```

#### Hot reload no funciona

**Problema:** Los cambios no se reflejan automáticamente.

**Soluciones:**
```bash
# Reiniciar servidor de desarrollo
npm run dev

# Verificar configuración de webpack
# Asegurarse de que watch=true

# Limpiar caché del navegador
# Hard refresh: Ctrl+Shift+R (Windows/Linux), Cmd+Shift+R (Mac)

# Revisar errores en la consola del navegador
```

### Base de Datos

#### Conexión fallida

**Problema:**
```bash
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Soluciones:**
```bash
# Verificar que PostgreSQL está corriendo
pg_isready

# Iniciar PostgreSQL (macOS)
brew services start postgresql

# Iniciar PostgreSQL (Ubuntu)
sudo systemctl start postgresql

# Verificar configuración en .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sales_core
DB_USER=postgres
DB_PASSWORD=tu_password
```

#### Migraciones fallidas

**Problema:**
```bash
Error: relation "users" already exists
```

**Soluciones:**
```bash
# Resetear base de datos
npm run db:reset

# O manualmente:
# 1. Eliminar base de datos
DROP DATABASE sales_core;

# 2. Crear nueva base de datos
CREATE DATABASE sales_core;

# 3. Correr migraciones
npm run migrate

# 4. Poblar datos de prueba
npm run seed
```

### API

#### CORS errors

**Problema en navegador:**
```
Access to fetch at 'http://localhost:3000/api' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Soluciones:**
```javascript
// En backend (Express)
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// O configurar proxy en frontend (Vite)
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
};
```

#### Timeout de requests

**Problema:** Las llamadas a API tardan demasiado o fallan.

**Soluciones:**
```javascript
// Configurar timeout en axios
const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 10000, // 10 segundos
});

// Implementar retry logic
const retryRequest = async (fn, retries = 3) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};
```

### Frontend

#### Componentes no renderizan

**Problema:** Componente muestra en blanco o error.

**Soluciones:**
```typescript
// Verificar export/import
export default UserProfile; // Asegurarse que exista

// Revisar errores en consola
// Usar React DevTools para inspeccionar

// Agregar Error Boundary
<ErrorBoundary>
  <UserProfile />
</ErrorBoundary>

// Debug con console.log
const UserProfile = ({ user }) => {
  console.log('UserProfile props:', user);
  // ...
};
```

#### Estado no se actualiza

**Problema:** El estado no se actualiza después de una acción.

**Soluciones:**
```typescript
// Evitar mutación directa
// Incorrecto
const updateUser = (user) => {
  user.name = 'New Name'; // Mutación
  setUsers(users);
};

// Correcto
const updateUser = (userId, newName) => {
  setUsers(prevUsers => 
    prevUsers.map(user => 
      user.id === userId 
        ? { ...user, name: newName }
        : user
    )
  );
};

// Usar callback para estado previo
setCount(prevCount => prevCount + 1);
```

### Tests

#### Tests fallan aleatoriamente

**Problema:** Tests pasan a veces, fallan otras.

**Soluciones:**
```typescript
// Evitar asincronía sin await
// Incorrecto
test('should fetch user', () => {
  const result = getUserById('1');
  expect(result.name).toBe('John'); // Race condition
});

// Correcto
test('should fetch user', async () => {
  const result = await getUserById('1');
  expect(result.name).toBe('John');
});

// Mockear dependencias externas
jest.mock('../api', () => ({
  getUserById: jest.fn().mockResolvedValue({ id: '1', name: 'John' })
}));

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});
```

#### Coverage bajo

**Problema:** Cobertura de tests no alcanza el mínimo requerido.

**Soluciones:**
```typescript
// Agregar tests para edge cases
describe('UserService', () => {
  it('should handle user not found', async () => {
    await expect(getUserById('999')).rejects.toThrow('User not found');
  });

  it('should validate email format', () => {
    expect(() => validateEmail('invalid')).toThrow();
    expect(() => validateEmail('valid@email.com')).not.toThrow();
  });
});

// Tests para componentes
describe('UserProfile', () => {
  it('should show loading state', () => {
    render(<UserProfile user={null} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle error state', () => {
    render(<UserProfile user={null} error="Failed to load" />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });
});
```

## Herramientas de Debugging

### VS Code

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["start"],
      "env": {
        "NODE_OPTIONS": "--inspect"
      }
    },
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["test", "--", "--runInBand"]
    }
  ]
}
```

### Chrome DevTools

1. **Elements Panel**: Inspeccionar DOM y CSS
2. **Console Panel**: Ver errores y logs
3. **Network Panel**: Monitorear requests
4. **Sources Panel**: Debug JavaScript
5. **Performance Panel**: Analizar rendimiento

### React DevTools

```bash
# Instalar
npm install -g react-devtools

# Usar en desarrollo
import React from 'react';
if (process.env.NODE_ENV === 'development') {
  import('react-devtools');
}
```

## Rendimiento

### Aplicación lenta

**Síntomas:**
- Tiempo de carga alto
- UI congelada
- Memoria excesiva

**Soluciones:**
```typescript
// React.lazy para code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// React.memo para memoización
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* contenido pesado */}</div>;
});

// useMemo para cálculos pesados
const ExpensiveValue = useMemo(() => {
  return data.reduce((sum, item) => sum + item.value, 0);
}, [data]);

// Virtual scrolling para listas largas
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>
    Row {index}
  </div>
);

const VirtualizedList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={35}
  >
    {Row}
  </List>
);
```

### Memory leaks

**Síntomas:**
- Uso de memoria creciente
- Rendimiento degradado

**Soluciones:**
```typescript
// Limpiar efectos
useEffect(() => {
  const timer = setInterval(() => {
    // ...
  }, 1000);

  return () => clearInterval(timer); // Cleanup
}, []);

// Limpiar event listeners
useEffect(() => {
  const handleResize = () => {
    // ...
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Cancelar requests
useEffect(() => {
  const controller = new AbortController();

  fetchData(controller.signal);

  return () => controller.abort();
}, []);
```

## Obtener Ayuda

### Recursos Internos

1. **Documentación del proyecto**
2. **Issues existentes en GitHub**
3. **Wiki del repositorio**

### Comunidad

1. **Stack Overflow**: Tag con `sales-core-platform`
2. **GitHub Discussions**: Preguntas y respuestas
3. **Discord/Slack**: Chat en tiempo real

### Reportar Issues

Cuando reportes un problema, incluye:

1. **Descripción clara** del problema
2. **Pasos para reproducir**
3. **Comportamiento esperado vs actual**
4. **Entorno** (SO, navegador, versión)
5. **Logs y capturas de pantalla**
6. **Código de ejemplo** si aplica

### Plantilla de Issue

```markdown
## Descripción
Breve descripción del problema.

## Pasos para reproducir
1. Ir a '...'
2. Hacer clic en '....'
3. Ver error

## Comportamiento esperado
Descripción de lo que debería pasar.

## Comportamiento actual
Descripción de lo que realmente pasa.

## Entorno
- OS: [ej. Windows 10, macOS 11.0]
- Navegador: [ej. Chrome 91, Firefox 89]
- Versión: [ej. v1.2.3]

## Capturas de pantalla
Adjunta capturas si aplica.

## Código adicional
Si es relevante, incluye código de ejemplo.
```

---

Si no encuentras solución aquí, no dudes en abrir un issue o contactar al equipo de desarrollo.
