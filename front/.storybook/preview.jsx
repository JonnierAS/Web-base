// .storybook/preview.js
import React from 'react';
import { Provider } from 'react-redux';
import { testStore } from './testStore';

// ❗ Importá tu provider real del contexto global
// Cambiá el nombre si tu provider se llama distinto:
import { GlobalStateProvider } from '@/shared/context/GlobalState';

// CSS globales
import '../src/app/styles/index.css';        // tu css global (tailwind)
import 'maplibre-gl/dist/maplibre-gl.css';   // estilos de maplibre (si no los traés en index.css)
import './preview-docs-fixes.css';
// Valor inicial para tu contexto global (lo usa MapContainer)
const DEFAULT_GLOBAL_STATE = {
  mapType: { source: 'https://demotiles.maplibre.org/style.json' }, // estilo público de demo
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  layout: 'fullscreen',
};

// Decorator global: aplica a todas las stories
export const decorators = [
  (Story) => (
    <Provider store={testStore}>
      <GlobalStateProvider initialValue={DEFAULT_GLOBAL_STATE}>
        {/* Contenedor con altura razonable para mapas */}
        <div style={{ width: '100%', height: '50dvh' }}>
          <Story />
        </div>
      </GlobalStateProvider>
    </Provider>
  ),
];
