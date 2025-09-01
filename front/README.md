# Estructura base Basada en modulos (Clean-ish)

Este proyecto implementa una arquitectura frontend inspirada en los principios de Clean Architecture, con un enfoque en la modularidad a través de "features" o dominios funcionales.

👉 **Filosofía Principal**:
- **Separación por Dominio**: En lugar de agrupar archivos por tipo (ej. `components`, `hooks`), se agrupan por funcionalidad (`auth`, `map`, `dashboard`).
- **Autonomía de Features**: Cada feature debe ser lo más autónomo posible, conteniendo sus propias vistas, lógica de estado, servicios y componentes.
- **Código Compartido (Shared)**: El directorio `shared` contiene código reutilizable y agnóstico a cualquier dominio específico, como componentes de UI genéricos, configuración de estado global y servicios base.

---

# Arquitectura y Conceptos Clave

### 1. Gestión de Estado Híbrida

El proyecto utiliza una combinación de Redux Toolkit y React Context para una gestión de estado eficiente y organizada.

- **Redux Toolkit (`shared/redux`)**: Se reserva para el estado global complejo y crítico que es accedido o modificado por múltiples features.
    - **`store.js`**: Configura el store principal. Notablemente, deshabilita `serializableCheck` para permitir almacenar referencias no serializables, como la instancia del objeto mapa, lo cual es útil para interacciones programáticas directas.
    - **Slices (`mapSlice.js`, `userSlice.js`)**: Cada slice gestiona una pieza del estado global (ej. la referencia al mapa, datos del usuario), manteniendo la lógica de reducers contenida y organizada.

- **React Context (`shared/context/GlobalState.jsx`)**: Se utiliza para estado global más simple y relacionado con la UI, que no requiere la complejidad de Redux.
    - **`GlobalStateProvider`**: Provee información como el estilo de mapa actual (`mapType`), el estado de visibilidad de los paneles laterales (`openPanel`) y las capas activas. Esto evita sobrecargar Redux con estado que no es transversalmente crítico.

### 2. Enrutamiento

El sistema de enrutamiento (`src/app/routes`) está diseñado para separar claramente las rutas públicas de las protegidas.

- **`Index.jsx`**: Es el componente central que renderiza las rutas. Itera sobre dos arreglos: `publicRoutes` y `authProtectedRoutes`.
- **`AuthProtected.jsx`**: Un componente de orden superior (HOC) que envuelve las rutas que requieren autenticación. Verifica si el usuario tiene una sesión activa; de lo contrario, lo redirige a la página de login.
- **`PublicRoute.jsx`**: Protege las rutas públicas (como el login) para que no sean accesibles si el usuario ya está autenticado, redirigiéndolo al dashboard.

### 3. Estructura de Features

Cada directorio dentro de `src/features` representa un módulo funcional. Por ejemplo, el feature `auth`:

- **`views/Login.jsx`**: Es el componente de UI principal del feature.
- **`services/login.service.js`**: Contiene la lógica para realizar la llamada a la API de login, separando la comunicación de la capa de presentación.
- **`validations/LoginValidation.js`**: Define el esquema de validación (usando Zod) para el formulario de login, asegurando la integridad de los datos antes de ser enviados.

---

# Estructura de Carpetas (Detallada)

```bash
📦src
 ┣ 📂app                 # Punto de entrada y configuración global.
 ┃ ┣ 📂routes            # Define las rutas de la aplicación.
 ┃ ┃ ┣ 📜Index.jsx       # Componente que renderiza rutas públicas y protegidas.
 ┃ ┃ ┗ ...
 ┃ ┣ 📂styles            # Hojas de estilo globales (CSS, MapLibre GL).
 ┃ ┣ 📜App.jsx           # Componente raíz que carga el enrutador principal.
 ┃ ┗ 📜main.jsx          # Inicializa la aplicación React en el DOM.
 ┣ 📂features            # Módulos de negocio, cada uno representa una funcionalidad.
 ┃ ┣ 📂auth              # Autenticación. Contiene vistas (Login), servicios y validaciones.
 ┃ ┣ 📂map               # Funcionalidad principal del mapa.
 ┃ ┃ ┣ 📜MapContainer.jsx  # Componente que renderiza y configura el mapa de MapLibre.
 ┃ ┃ ┗ ...
 ┃ ┗ ...                 # Otros módulos como 'dashboard', 'navbar', etc.
 ┗ 📂shared              # Código no específico de un dominio, reutilizable.
   ┣ 📂assets            # Recursos estáticos (imágenes, iconos).
   ┣ 📂components        # Componentes de UI reutilizables (Button, Modal, etc.).
   ┣ 📂context           # State management con React Context.
   ┃ ┗ 📜GlobalState.jsx   # Provee estado global para UI (tema del mapa, paneles).
   ┣ 📂layout            # Componentes para la estructura visual (paneles laterales/inferiores).
   ┣ 📂map               # Configuraciones base del mapa (estilos, fuentes).
   ┣ 📂redux             # State management con Redux Toolkit.
   ┃ ┣ 📂features        # Slices de Redux para manejar estados específicos.
   ┃ ┃ ┣ 📜mapSlice.js   # Slice para estado del mapa (referencia al objeto map).
   ┃ ┃ ┗ 📜userSlice.js  # Slice para estado del usuario.
   ┃ ┗ 📜store.js         # Configuración del store principal de Redux.
   ┗ 📂services          # Lógica para comunicarse con APIs externas.
```

---

# Inicialización

Ejecutamos:

Para instalar las dependencias
```bash
npm install
```

Para la inicializacion normal de la aplicacion
```bash
npm run dev
```
Para ver la documentacion en Storybook
```bash
npm run storybook
```
