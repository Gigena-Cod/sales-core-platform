# Contribución

¡Gracias por tu interés en contribuir a Sales Core Platform! Esta guía te ayudará a empezar.

## Cómo Contribuir

### 1. Fork del Repositorio

1. Ve a https://github.com/Gigena-Cod/sales-core-platform
2. Haz clic en "Fork"
3. Clona tu fork localmente

```bash
git clone https://github.com/TU_USERNAME/sales-core-platform.git
cd sales-core-platform
```

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
