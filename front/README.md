# Estructura base Basada en modulos (Clean-ish)
Separacion por feature (dominio funcional), no solo por tipo de archivo:

👉 Siguiendo la idea de Clean Architecture/Hexagonal adaptada a front:

- Cada feature es autónomo (puede vivir solo).

# Estructura de carpetas
```bash
📦src
 ┣ 📂app
 ┃ ┣ 📂routes                           → Configuración de rutas globales (protegidas/públicas)
 ┃ ┃ ┣ 📜allRoutes.js
 ┃ ┃ ┣ 📜AuthProtected.jsx
 ┃ ┃ ┣ 📜Index.jsx
 ┃ ┃ ┗ 📜PublicRoute.jsx
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┗ 📜maplibre-gl.css
 ┃ ┣ 📜App.jsx
 ┃ ┗ 📜main.jsx
 ┣ 📂features                           → Features (módulos funcionales de la app)
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜local.service.js
 ┃ ┃ ┃ ┗ 📜login.service.js
 ┃ ┃ ┣ 📂validations
 ┃ ┃ ┃ ┗ 📜LoginValidation.js
 ┃ ┃ ┗ 📂views
 ┃ ┃ ┃ ┗ 📜Login.jsx
 ┃ ┣ 📂content-side-panels
 ┃ ┣ 📂dashboard
 ┃ ┣ 📂map
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜MapContainer.jsx
 ┃ ┣ 📂navbar
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📂BaselayerMap
 ┃ ┃ ┃ ┃ ┗ 📜LayerMapBaseOptions.jsx
 ┃ ┃ ┗ 📜NavbarContainer.jsx
 ┃ ┣ 📂toolbox                      
 ┃ ┗ 📜FeatureContainer.jsx
 ┗ 📂shared                              → Código compartido, agnóstico al dominio
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📜react.svg
 ┃ ┣ 📂context
 ┃ ┃ ┗ 📜GlobalState.jsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂bottom
 ┃ ┃ ┃ ┗ 📜BottomPanel.jsx
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📜TabsBar.jsx
 ┃ ┃ ┣ 📂hook
 ┃ ┃ ┃ ┗ 📜usePanelTabs.jsx
 ┃ ┃ ┣ 📂left
 ┃ ┃ ┃ ┗ 📜LeftPanel.jsx
 ┃ ┃ ┗ 📂right
 ┃ ┃ ┃ ┗ 📜RightPanel.jsx
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂features
 ┃ ┃ ┃ ┣ 📜mapSlice.js
 ┃ ┃ ┃ ┗ 📜userSlice.js
 ┃ ┃ ┣ 📜provider.jsx
 ┃ ┃ ┗ 📜store.js
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜api.js
 ┃ ┃ ┗ 📜dashboardServices.js
 ┃ ┗ 📂utils
 ┃ ┃ ┗ 📂constants_base_map
 ┃ ┃ ┃ ┣ 📂map_styles
 ┃ ┃ ┃ ┃ ┣ 📂preview
 ┃ ┃ ┃ ┃ ┃ ┣ 📜google_satelite.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜google_streets.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mapa_base.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜openstreet.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜satelite.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜sin_etiqueta.png
 ┃ ┃ ┃ ┃ ┣ 📜google_satelite_hybrid.json
 ┃ ┃ ┃ ┃ ┗ 📜google_streets.json
 ┃ ┃ ┃ ┣ 📜sources.js
 ┃ ┃ ┃ ┗ 📜styles.js
```
