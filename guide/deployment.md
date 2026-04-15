# Despliegue

## Despliegue en Producción

### Preparación

1. **Build del proyecto**
```bash
npm run build
```

2. **Configuración de variables de entorno**
```bash
cp .env.example .env.production
# Editar .env.production con valores de producción
```

### Opciones de Despliegue

#### Vercel (Recomendado para Frontend)

1. Instala Vercel CLI
```bash
npm i -g vercel
```

2. Despliega
```bash
vercel --prod
```

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
