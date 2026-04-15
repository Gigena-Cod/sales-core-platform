# Despliegue - TP Aplicaciones Web 2

## Estrategia de Despliegue por Entregas

### Entrega 1 - Módulo 2 (Documentación y Datos)

#### Despliegue en GitHub Pages (Recomendado)

**Ventajas para el TP:**
- Gratuito y fácil de configurar
- Ideal para documentación estática
- Accesible para evaluadores
- Integración con GitHub

**Pasos:**

1. **Preparar repositorio**
```bash
# Asegurar que el repositorio sea público
git remote -v  # Debe apuntar a GitHub

# Verificar estructura final
ls -la
# mocks/ usuarios.json productos.json ventas.json
# index.html _sidebar.md _navbar.md README.md
```

2. **Configurar GitHub Pages**
```bash
# En GitHub: Settings -> Pages
# Source: Deploy from a branch
# Branch: main / (root)
# Click Save
```

3. **Verificar despliegue**
```bash
# Acceder a: https://TU_USERNAME.github.io/sales-core-platform
# Debería mostrar la documentación de Docsify
```

#### Alternativa: Netlify Drop

1. Arrastrar carpeta del proyecto a https://app.netlify.com/drop
2. Obtener URL automáticamente
3. Compartir URL con evaluadores

### Entrega 2 - Módulo 4 (Frontend)

#### Opción 1: GitHub Pages (Continuación)

**Estructura actualizada:**
```bash
sales-core-platform/
mocks/                 # Datos JSON
public/                # Frontend estático
  index.html          # Aplicación principal
  css/style.css
  js/app.js
docs/                  # Documentación (opcional)
index.html            # Redirección a public/
```

**Configuración:**
```html
<!-- index.html - Redirección a frontend -->
<meta http-equiv="refresh" content="0; url=public/">
```

#### Opción 2: Vercel (Recomendado para Frontend)

**Ventajas:**
- Mejor rendimiento para aplicaciones SPA
- Build process automático
- Variables de entorno
- Deploy previews

**Configuración:**
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Configurar proyecto
vercel

# 3. Desplegar producción
vercel --prod

# 4. Configurar dominio personalizado (opcional)
```

**vercel.json configuration:**
```json
{
  "buildCommand": "echo 'No build needed'",
  "outputDirectory": "public",
  "routes": [
    {
      "src": "/mocks/(.*)",
      "dest": "/mocks/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

#### Opción 3: Netlify

**netlify.toml configuration:**
```toml
[build]
  publish = "public"
  
[[redirects]]
  from = "/mocks/*"
  to = "/mocks/:splat"
  status = 200
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Entrega Final - TP Completo (Full-Stack)

#### Opción 1: Railway (Backend + Frontend)

**Ventajes para TP:**
- Soporte para Node.js + PostgreSQL
- Variables de entorno configuradas
- Deploy automático desde GitHub
- Plan gratuito suficiente para evaluación

**Configuración:**
```bash
# 1. Crear cuenta en Railway
# 2. Conectar repositorio GitHub
# 3. Configurar variables de entorno
# 4. Deploy automático
```

**railway.json:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health"
  }
}
```

#### Opción 2: Heroku (Alternativa)

**Procfile:**
```
web: npm start
```

**Configuración:**
```bash
# 1. Crear app en Heroku
heroku create tu-tp-app

# 2. Configurar variables
heroku config:set NODE_ENV=production
heroku config:set DB_URL=your_database_url

# 3. Deploy
git push heroku main
```

#### Opción 3: Docker + VPS (Avanzado)

**Dockerfile:**
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml:**
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
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: sales_core_tp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Configuración de URLs y Acceso

### URLs para Evaluación

#### Entrega 1
- **GitHub Pages**: `https://TU_USERNAME.github.io/sales-core-platform`
- **Netlify**: `https://random-name-123.netlify.app`
- **Vercel**: `https://sales-core-platform.vercel.app`

#### Entrega 2
- **GitHub Pages**: `https://TU_USERNAME.github.io/sales-core-platform/public`
- **Vercel**: `https://sales-core-platform.vercel.app`
- **Netlify**: `https://tu-tp.netlify.app`

#### Entrega Final
- **Railway**: `https://tu-tp-app.up.railway.app`
- **Heroku**: `https://tu-tp-app.herokuapp.com`
- **VPS**: `https://tu-dominio.com`

## Configuración de Dominio (Opcional)

### Dominio Personalizado

#### GitHub Pages
```bash
# Crear archivo CNAME
echo "tu-dominio.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

#### Vercel
```bash
# Configurar dominio en dashboard
# O via CLI
vercel domains add tu-dominio.com
```

## Monitoreo y Logging

### Health Check Endpoint

```javascript
// health.js - Para verificar que el deploy funciona
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});
```

### Logging para Debug

```javascript
// logger.js - Para monitorear issues
const logger = {
  info: (message) => console.log(`[INFO] ${new Date().toISOString()}: ${message}`),
  error: (message) => console.error(`[ERROR] ${new Date().toISOString()}: ${message}`),
  debug: (message) => process.env.NODE_ENV === 'development' && console.log(`[DEBUG] ${message}`)
};
```

## Testing de Despliegue

### Checklist Pre-Deploy

#### Entrega 1
- [ ] Todos los archivos JSON son válidos
- [ ] Documentación de Docsify funciona
- [ ] Links internos funcionan
- [ ] Repositorio es público
- [ ] URL es accesible

#### Entrega 2
- [ ] Aplicación carga correctamente
- [ ] Consumo de JSON funciona
- [ ] Responsive design funciona
- [ ] No hay errores en consola
- [ ] Performance aceptable

#### Entrega Final
- [ ] API responde correctamente
- [ ] Base de datos conecta
- [ ] Autenticación funciona
- [ ] Testing completo pasa
- [ ] Seguridad básica implementada

### Testing Automatizado

```bash
# Script para verificar deploy
#!/bin/bash
# test-deploy.sh

echo "Testing deployment..."

# Test 1: Check if site is accessible
curl -f https://tu-url.com > /dev/null
if [ $? -eq 0 ]; then
  echo "Site is accessible"
else
  echo "Site is not accessible"
  exit 1
fi

# Test 2: Check JSON files
curl -f https://tu-url.com/mocks/usuarios.json > /dev/null
if [ $? -eq 0 ]; then
  echo "JSON files are accessible"
else
  echo "JSON files are not accessible"
  exit 1
fi

echo "All tests passed!"
```

## Backup y Recovery

### Exportar Datos (si aplica)

```bash
# Backup de datos generados por usuarios
mysqldump -u username -p database_name > backup.sql

# O exportar a JSON
node export-data.js > backup-data.json
```

### Plan de Recovery

1. **GitHub**: Repositorio siempre disponible
2. **Deploy**: Re-deploy desde GitHub
3. **Datos**: Recrear desde JSON originales
4. **Documentación**: Siempre en repositorio

3. Configura variables de entorno en el dashboard de Vercel

#### AWS (Backend)

1. **Configurar EC2**
```bash
# Conectar a instancia EC2
ssh -i your-key.pem ec2-user@your-ec2-ip

# Instalar dependencias
sudo yum update -y
sudo yum install -y nodejs npm
```

2. **Desplegar aplicación**
```bash
git clone https://github.com/Gigena-Cod/sales-core-platform.git
cd sales-core-platform
npm ci --production
npm run build
```

3. **Configurar PM2**
```bash
npm install -g pm2
pm2 start ecosystem.config.js --env production
```

#### Docker

1. **Construir imagen**
```bash
docker build -t sales-core-platform .
```

2. **Ejecutar contenedor**
```bash
docker run -d \
  --name sales-core \
  -p 3000:3000 \
  --env-file .env.production \
  sales-core-platform
```

#### Heroku

1. **Instalar Heroku CLI**
```bash
npm install -g heroku
```

2. **Crear aplicación**
```bash
heroku create your-app-name
```

3. **Configurar variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set DB_URL=your_database_url
```

4. **Desplegar**
```bash
git push heroku main
```

## Monitoreo

### Logs

```bash
# Ver logs de PM2
pm2 logs

# Ver logs de Docker
docker logs sales-core

# Logs de Heroku
heroku logs --tail
```

### Health Check

```bash
# Verificar estado del servidor
curl https://your-domain.com/health
```

## Dominios y SSL

### Configuración de Dominio

1. **Apuntar DNS** a tu servidor
2. **Configurar Nginx** (si es necesario)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d your-domain.com
```

## Backup

### Base de Datos

```bash
# Backup PostgreSQL
pg_dump sales_core > backup.sql

# Restaurar
psql sales_core < backup.sql
```

### Automatización con Cron

```bash
# Editar crontab
crontab -e

# Agregar backup diario
0 2 * * * /path/to/backup-script.sh
```

## Escalado

### Horizontal Scaling

- Usar balanceador de carga
- Múltiples instancias de la aplicación
- Base de datos compartida

### Vertical Scaling

- Aumentar recursos del servidor
- Optimizar consultas de base de datos
- Implementar caché (Redis)
