# Configuración - TP Aplicaciones Web 2

## Configuración por Entregas

### Entrega 1 - Módulo 2 (Estructura de Datos)

#### Configuración Mínima Requerida
```bash
# Estructura de archivos
sales-core-platform/
mocks/                 # Datos JSON
  usuarios.json       # Usuarios del sistema
  productos.json      # Catálogo de productos
  ventas.json         # Registro de ventas

docs/                  # Documentación
  guide/              # Guías del proyecto
  _sidebar.md         # Navegación
  _navbar.md          # Barra superior

index.html            # Docsify configuration
README.md             # Contexto del TP
```

#### Configuración de Documentación
```html
<!-- index.html - Configuración de Docsify -->
<script>
  window.$docsify = {
    name: 'TP Aplicaciones Web 2',
    repo: 'https://github.com/TU_USERNAME/sales-core-platform',
    loadSidebar: true,
    loadNavbar: true,
    search: 'auto',
    maxLevel: 4,
    subMaxLevel: 2
  }
</script>
```

### Entrega 2 - Módulo 4 (Frontend)

#### Estructura Frontend
```bash
public/                # Recursos estáticos
  index.html          # Página principal
  css/
    style.css         # Estilos principales
  js/
    app.js            # Lógica principal
    api.js            # Consumo de JSON
    utils.js          # Utilidades
  images/             # Imágenes de productos
```

#### Configuración de Servidor Local
```bash
# Opción 1: Python
python -m http.server 8080

# Opción 2: Node.js (si se usa)
npm install -g http-server
http-server -p 8080

# Opción 3: VS Code Live Server
# Extensión: Live Server
# Click derecho -> Open with Live Server
```

### Entrega Final - TP Completo (Backend Opcional)

#### Variables de Entorno (.env)
```env
# Base de Datos (si se implementa backend)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sales_core_tp
DB_USER=postgres
DB_PASSWORD=your_password

# API (si se implementa backend)
API_PORT=3000
API_HOST=localhost
JWT_SECRET=tp_jwt_secret_key
JWT_EXPIRES_IN=24h

# Frontend
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME="TP Aplicaciones Web 2"
```

## Configuración de Datos JSON

### Validación de Estructura
```javascript
// config/validation.js - Para verificar archivos JSON
const validateJSONStructure = {
  usuarios: {
    required: ['id', 'nombre', 'apellido', 'email', 'contraseña', 'activo'],
    types: {
      id: 'number',
      nombre: 'string',
      apellido: 'string',
      email: 'string',
      contraseña: 'string',
      activo: 'boolean',
      fecha_registro: 'string',
      telefono: 'string',
      premium: 'boolean'
    }
  },
  productos: {
    required: ['id', 'nombre', 'desc', 'precio', 'imagen', 'stock', 'disponible'],
    types: {
      id: 'number',
      nombre: 'string',
      desc: 'string',
      precio: 'number',
      imagen: 'string',
      stock: 'number',
      categoria: 'string',
      disponible: 'boolean',
      destacado: 'boolean',
      peso: 'number',
      garantia: 'number'
    }
  },
  ventas: {
    required: ['id', 'id_usuario', 'fecha', 'total', 'direccion', 'productos'],
    types: {
      id: 'number',
      id_usuario: 'number',
      fecha: 'string',
      total: 'number',
      direccion: 'string',
      metodo_pago: 'string',
      envio_gratis: 'boolean',
      estado: 'string',
      codigo_seguimiento: 'string'
    }
  }
};
```

## Configuración de Desarrollo

### VS Code Settings (.vscode/settings.json)
```json
{
  "json.validate.enable": true,
  "files.associations": {
    "*.json": "jsonc"
  },
  "emmet.includeLanguages": {
    "markdown": "html"
  },
  "liveServer.settings.port": 8080,
  "liveServer.settings.root": "/"
}
```

### Extensiones Recomendadas
```json
{
  "recommendations": [
    "ritwickdey.liveserver",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode"
  ]
}
```

## Configuración de Git

### .gitignore para TP
```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Environment files
.env
.env.local
.env.production

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Build outputs
dist/
build/

# Temporary files
*.tmp
*.temp
```

### Configuración de Repositorio
```bash
# Configuración inicial
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"

# Inicializar repositorio
git init
git add .
git commit -m "Initial commit - TP Aplicaciones Web 2"

# Conectar con GitHub
git remote add origin https://github.com/TU_USERNAME/sales-core-platform.git
git push -u origin main
```

## Configuración de Testing

### Validación Automática (validate-tp.js)
```javascript
// Script para validar requisitos del TP
const fs = require('fs');
const path = require('path');

const validateTP = () => {
  const results = {
    entrega1: {
      jsonFiles: false,
      documentation: false,
      dataTypes: false,
      coherence: false
    },
    overall: false
  };

  // Validar archivos JSON
  const jsonFiles = ['usuarios.json', 'productos.json', 'ventas.json'];
  results.entrega1.jsonFiles = jsonFiles.every(file => 
    fs.existsSync(path.join('mocks', file))
  );

  // Validar documentación
  const docFiles = ['index.html', '_sidebar.md', '_navbar.md'];
  results.entrega1.documentation = docFiles.every(file => 
    fs.existsSync(file)
  );

  // Validar tipos de datos y coherencia
  // ... implementación específica

  return results;
};

module.exports = validateTP;
```

### Frontend
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Sales Core Platform
```

## Configuración de Base de Datos

### PostgreSQL

1. Instala PostgreSQL
2. Crea la base de datos:
```sql
CREATE DATABASE sales_core;
CREATE USER sales_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE sales_core TO sales_user;
```

3. Ejecuta las migraciones:
```bash
npm run migrate
```

### Redis

1. Instala Redis
2. Inicia el servidor:
```bash
redis-server
```

## Configuración de Desarrollo

### VS Code Extensions recomendadas
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- GitLens

### Scripts Útiles

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:api\" \"npm run dev:frontend\"",
    "dev:api": "cd api && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build": "npm run build:api && npm run build:frontend",
    "test": "npm run test:api && npm run test:frontend",
    "lint": "npm run lint:api && npm run lint:frontend"
  }
}
```

## Configuración de Producción

### Docker

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: sales_core
      POSTGRES_USER: sales_user
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:6-alpine
    
volumes:
  postgres_data:
```
