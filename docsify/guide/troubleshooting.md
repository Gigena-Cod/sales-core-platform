# Troubleshooting - TP Aplicaciones Web 2

## Problemas Comunes del TP

### Entrega 1 - Estructura de Datos

#### JSON no válido

**Problema:**
```bash
Error: Unexpected token } in JSON at position 123
```

**Causas Comunes:**
- Comas extra al final de arrays/objetos
- Comillas faltantes en strings
- Comentarios en archivos JSON (no permitidos)

**Soluciones:**
```bash
# Validar JSON con Python
python -m json.tool mocks/usuarios.json

# Validar con Node.js
node -e "console.log(JSON.parse(require('fs').readFileSync('mocks/usuarios.json')))"

# Herramienta online: https://jsonlint.com/
```

#### Relaciones inconsistentes

**Problema:**
```javascript
// ventas.json tiene id_usuario que no existe en usuarios.json
{
  "id_usuario": 999,  // Este usuario no existe
  // ...
}
```

**Solución:**
```javascript
// Script para verificar relaciones
const validateRelationships = () => {
  const users = require('./mocks/usuarios.json');
  const products = require('./mocks/productos.json');
  const sales = require('./mocks/ventas.json');
  
  const userIds = users.map(u => u.id);
  const productIds = products.map(p => p.id);
  
  sales.forEach(sale => {
    if (!userIds.includes(sale.id_usuario)) {
      console.error(`Venta ${sale.id}: Usuario ${sale.id_usuario} no existe`);
    }
    
    sale.productos.forEach(item => {
      if (!productIds.includes(item.id_producto)) {
        console.error(`Venta ${sale.id}: Producto ${item.id_producto} no existe`);
      }
    });
  });
};
```

#### Docsify no funciona

**Problema:**
- La documentación no carga
- Menú lateral no aparece
- Búsqueda no funciona

**Soluciones:**
```html
<!-- Verificar configuración en index.html -->
<script>
  window.$docsify = {
    name: 'TP Aplicaciones Web 2',
    loadSidebar: true,      // Asegurar que sea true
    loadNavbar: true,       // Asegurar que sea true
    search: 'auto',         // Para búsqueda
    maxLevel: 4,
    subMaxLevel: 2
  }
</script>

<!-- Verificar que los archivos existan -->
<!-- _sidebar.md y _navbar.md deben existir -->
```

#### Servidor local no funciona

**Problema:**
```bash
python -m http.server 8080
# Error: Address already in use
```

**Soluciones:**
```bash
# Opción 1: Cambiar puerto
python -m http.server 8081

# Opción 2: Matar proceso en puerto 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8080 | xargs kill -9

# Opción 3: Usar VS Code Live Server
# Extensión: Live Server
# Click derecho -> Open with Live Server
```

### Entrega 2 - Frontend

#### Fetch API no encuentra archivos JSON

**Problema:**
```javascript
// Error en consola
GET http://localhost:8080/mocks/usuarios.json 404 (Not Found)
```

**Causas:**
- Archivos JSON en ubicación incorrecta
- Problemas de CORS
- Rutas relativas incorrectas

**Soluciones:**
```javascript
// Usar rutas absolutas
const response = await fetch('/mocks/usuarios.json');

// O verificar ubicación actual
console.log(window.location.origin);

// Estructura correcta:
// public/
//   index.html
// mocks/           // JSON debe estar aquí o en raíz
```

#### Responsive design no funciona

**Problema:**
- La aplicación se ve mal en móvil
- Elementos se superponen
- Texto ilegible

**Soluciones:**
```css
/* Agregar viewport meta tag */
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* Media queries básicas */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Usar unidades relativas */
.container {
  width: 95%; /* En lugar de px fijos */
  max-width: 1200px;
}
```

#### Validación de formularios no funciona

**Problema:**
```javascript
// Formulario se envía vacío
// Validaciones no se ejecutan
```

**Soluciones:**
```html
<!-- Prevenir envío por defecto -->
<form id="saleForm" onsubmit="return validateForm(event)">

<script>
function validateForm(event) {
  event.preventDefault(); // Importante!
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // Validaciones
  if (!data.customerName) {
    alert('El nombre del cliente es requerido');
    return false;
  }
  
  // Procesar formulario
  submitForm(data);
  return false;
}
</script>
```

### Problemas Generales del TP

#### Git y GitHub Issues

**Problema:**
```bash
# Push rechazado
! [rejected] main -> main (non-fast-forward)
```

**Soluciones:**
```bash
# Opción 1: Forzar push (cuidado!)
git push --force origin main

# Opción 2: Pull y merge
git pull origin main --rebase
git push origin main

# Opción 3: Clonar fresh
cd ..
git clone https://github.com/TU_USERNAME/sales-core-platform.git
# Copiar archivos del repo viejo al nuevo
```

#### GitHub Pages no actualiza

**Problema:**
- Los cambios no aparecen en GitHub Pages
- Muestra versión antigua

**Soluciones:**
```bash
# 1. Verificar que el repo sea público
# GitHub Settings -> Pages -> Source

# 2. Forzar rebuild
git commit --allow-empty -m "Trigger rebuild"
git push origin main

# 3. Esperar 10 minutos (GitHub Pages tiene cache)

# 4. Limpiar cache del navegador
# Ctrl+Shift+R o Cmd+Shift+R
```

#### Evaluador no puede acceder

**Problema:**
- El evaluador reporta "404 Not Found"
- No puede ver la documentación

**Checklist de Accesibilidad:**
```bash
# 1. Verificar que el repo sea PÚBLICO
# GitHub Settings -> Scroll down -> Danger Zone -> Change visibility

# 2. Verificar GitHub Pages activado
# Settings -> Pages -> Source: Deploy from a branch

# 3. Testear URL en modo incógnito
# https://TU_USERNAME.github.io/sales-core-platform

# 4. Verificar estructura mínima
ls -la
# Debe existir: index.html
```

## Debugging Tools

### Browser DevTools

#### Console Errors
```javascript
// Para debugging de JSON
fetch('/mocks/usuarios.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log('Data loaded:', data))
  .catch(error => console.error('Error:', error));
```

#### Network Tab
- Verificar que los archivos JSON carguen (Status 200)
- Checkear tiempos de carga
- Identificar archivos no encontrados (404)

#### Responsive Testing
- DevTools -> Toggle device toolbar
- Probar diferentes tamaños de pantalla
- Verificar media queries

### Scripts de Validación

#### validate-tp.js
```javascript
// Script completo para validar entrega 1
const fs = require('fs');
const path = require('path');

class TPValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  validateEntrega1() {
    console.log('=== Validando Entrega 1 - TP Aplicaciones Web 2 ===');
    
    this.checkJSONFiles();
    this.checkDataTypes();
    this.checkCoherence();
    this.checkDocumentation();
    
    this.generateReport();
  }

  checkJSONFiles() {
    const requiredFiles = ['usuarios.json', 'productos.json', 'ventas.json'];
    
    requiredFiles.forEach(file => {
      const filePath = path.join('mocks', file);
      if (!fs.existsSync(filePath)) {
        this.errors.push(`Archivo faltante: ${file}`);
        return;
      }
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
        console.log(`\u2713 ${file} - JSON válido`);
      } catch (error) {
        this.errors.push(`JSON inválido en ${file}: ${error.message}`);
      }
    });
  }

  checkDataTypes() {
    try {
      const users = JSON.parse(fs.readFileSync('mocks/usuarios.json', 'utf8'));
      const products = JSON.parse(fs.readFileSync('mocks/productos.json', 'utf8'));
      const sales = JSON.parse(fs.readFileSync('mocks/ventas.json', 'utf8'));

      // Verificar tipos de datos en usuarios
      users.forEach((user, index) => {
        if (typeof user.id !== 'number') {
          this.errors.push(`Usuario ${index + 1}: id debe ser number`);
        }
        if (typeof user.activo !== 'boolean') {
          this.errors.push(`Usuario ${index + 1}: activo debe ser boolean`);
        }
        if (typeof user.premium !== 'boolean') {
          this.warnings.push(`Usuario ${index + 1}: premium debería ser boolean`);
        }
      });

      console.log('\u2713 Tipos de datos verificados');
    } catch (error) {
      this.errors.push(`Error verificando tipos: ${error.message}`);
    }
  }

  checkCoherence() {
    try {
      const users = JSON.parse(fs.readFileSync('mocks/usuarios.json', 'utf8'));
      const products = JSON.parse(fs.readFileSync('mocks/productos.json', 'utf8'));
      const sales = JSON.parse(fs.readFileSync('mocks/ventas.json', 'utf8'));

      const userIds = users.map(u => u.id);
      const productIds = products.map(p => p.id);

      sales.forEach((sale, index) => {
        if (!userIds.includes(sale.id_usuario)) {
          this.errors.push(`Venta ${index + 1}: id_usuario ${sale.id_usuario} no existe`);
        }
        
        sale.productos.forEach((item, itemIndex) => {
          if (!productIds.includes(item.id_producto)) {
            this.errors.push(`Venta ${index + 1}, producto ${itemIndex + 1}: id_producto ${item.id_producto} no existe`);
          }
        });
      });

      console.log('\u2713 Coherencia de datos verificada');
    } catch (error) {
      this.errors.push(`Error verificando coherencia: ${error.message}`);
    }
  }

  checkDocumentation() {
    const requiredDocs = ['index.html', '_sidebar.md', '_navbar.md', 'README.md'];
    
    requiredDocs.forEach(doc => {
      if (!fs.existsSync(doc)) {
        this.errors.push(`Documento faltante: ${doc}`);
      }
    });

    // Verificar configuración de Docsify
    if (fs.existsSync('index.html')) {
      const content = fs.readFileSync('index.html', 'utf8');
      if (!content.includes('window.$docsify')) {
        this.warnings.push('index.html no tiene configuración de Docsify');
      }
    }

    console.log('\u2713 Documentación verificada');
  }

  generateReport() {
    console.log('\n=== REPORTE DE VALIDACIÓN ===');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\u2705 VALIDACIÓN EXITOSA - Todo está correcto');
      return true;
    }

    if (this.errors.length > 0) {
      console.log('\n\u274c ERRORES (deben corregirse):');
      this.errors.forEach(error => console.log(`  - ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n\u26a0\ufe0f ADVERTENCIAS (recomendado corregir):');
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    const score = Math.max(0, 10 - this.errors.length - (this.warnings.length * 0.5));
    console.log(`\n\ud83d\udcca Calificación estimada: ${score.toFixed(1)}/10`);

    return this.errors.length === 0;
  }
}

// Ejecutar validación
const validator = new TPValidator();
validator.validateEntrega1();
```

## Contacto y Soporte

### Para Problemas del TP

1. **Revisa esta guía primero** - La mayoría de los problemas están documentados
2. **Consulta el foro de la materia** - Otros estudiantes pueden haber tenido el mismo problema
3. **Contacta al tutor** - Si el problema persiste después de intentar las soluciones

### Información de Soporte

```markdown
### Reporte de Problemas

**Contexto:**
- Materia: Aplicaciones Web 2
- Entrega: [1/2/Final]
- Problema: [Descripción breve]

**Pasos ya intentados:**
1. [Listar soluciones intentadas]

**Screenshots:**
[Adjuntar capturas de errores]

**Links:**
- Repositorio: https://github.com/TU_USERNAME/sales-core-platform
- Deploy: https://TU_USERNAME.github.io/sales-core-platform
```

---

**Recuerda**: Los problemas técnicos son normales en el desarrollo. Lo importante es documentarlos, intentar soluciones sistemáticas, y aprender del proceso de debugging.
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
