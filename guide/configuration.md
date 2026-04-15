# Configuración

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

### Base de Datos
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sales_core
DB_USER=postgres
DB_PASSWORD=your_password
```

### API
```env
API_PORT=3000
API_HOST=localhost
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

### Servicios Externos
```env
REDIS_URL=redis://localhost:6379
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
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
