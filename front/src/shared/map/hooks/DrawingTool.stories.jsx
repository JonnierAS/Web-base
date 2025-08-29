// src/features/map/drawing/DrawingToolWithExistingMap.stories.jsx
import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import seleccionar from "@/shared/assets/icons/seleccionar.png";
import selec1 from "@/shared/assets/icons/selec_1.png";
import selec2 from "@/shared/assets/icons/selec_2.png";
import selec3 from "@/shared/assets/icons/selec_3.png";
import selec4 from "@/shared/assets/icons/selec_4.png";

// ⬇️ importa tu reducer real (ajusta la ruta a la tuya)
import mapReducer from '@/shared/redux/features/mapSlice';

// ⬇️ proveedor de tu estado global (si MapContainer lo necesita)
import { GlobalStateProvider } from '@/shared/context/GlobalState';

// ⬇️ tu mapa existente (ya setea setMapref y monta tu DrawControl)
import { MapContainer } from '@/features/map/MapContainer';

// ⬇️ tu hook
import { useDrawingTool } from '@/shared/map/hooks/useDrawingTool';

import { ButtonTool } from '../../components/ButtonTool';
import { Card } from '../../components/Card';
const makeStore = () =>
  configureStore({
    reducer: {
      mapReducer, // debe llamarse igual que en tu app
    },
  });

// ---------- Overlay con botones de dibujo ----------
const DrawingOverlay = () => {
  const mapRef = useSelector((state) => state.mapReducer.mapRef);
  const drawRef = useSelector((state) => state.mapReducer.mapBoxDrawStateRef);

  const [lastFeature, setLastFeature] = useState(null);
  const [activeMode, setActiveMode] = useState(null);

  const polygonTool = useDrawingTool({
    mode: 'draw_polygon',
    mapRef,
    drawRef,
    onDrawComplete: (feature) => {
      setLastFeature(feature);
      setActiveMode(null);
    },
    autoReset: false,
  });

  const lineTool = useDrawingTool({
    mode: 'draw_line_string',
    mapRef,
    drawRef,
    onDrawComplete: (feature) => {
      setLastFeature(feature);
      setActiveMode(null);
    },
    autoReset: false,
  });



  const disabled = !mapRef || !drawRef;

  return (
    <>
        <Card
            position='bottom-left'
            layout='column'
            width='170'
            height=''
            className=''
        >

            <ButtonTool 
                icon={{
                    src:selec1,

                }}
                label='Polígono'
                disabled={disabled}
                onClick={() => {
                setActiveMode('polygon');
                polygonTool.activate();
                }}
                layout='row'
                className='w-full justify-start hover:bg-gray-300  rounded-none'
            />
            <ButtonTool 
                icon={{
                    src:selec3,

                }}
                label='Línea'
                disabled={disabled}
                onClick={() => {
                setActiveMode('line');
                lineTool.activate();
                }}
                layout='row'
                className='w-full justify-start hover:bg-gray-300 rounded-none'
            />

        </Card>
    </>
  );
};

// ---------- Canvas de la story ----------
const StoryCanvas = () => {
  return (
    <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
      <MapContainer />
      <DrawingOverlay />
    </div>
  );
};

// ---------- Store solo para la story ----------


// ---------- Decorator que envuelve con Providers ----------
const withProviders = (Story) => {
  const store = makeStore();
  // valor mínimo para GlobalStateProvider (si tu MapContainer lo usa)
  const initialGlobal = {
    mapType: { source: 'https://demotiles.maplibre.org/style.json' },
  };

  return (
    <Provider store={store}>
      <GlobalStateProvider initialValue={initialGlobal}>
        <Story />
      </GlobalStateProvider>
    </Provider>
  );
};

export default {
  title: 'shared/Map/hooks/DrawingTool',
  component: StoryCanvas,
  decorators: [withProviders],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Esta story usa tu **MapContainer** real y la instancia de **MapboxDraw** que registras en Redux.

### Requisitos en tu app
- \`MapContainer\` debe despachar \`setMapref(ref)\` en \`onLoad\`.
- Tu \`DrawControl\` debe crear \`new MapboxDraw(...)\` y despachar \`setMapboxDrawRef(draw)\`.

### Hook \`useDrawingTool\`
- \`mode\`: \`'draw_polygon' | 'draw_line_string' | 'draw_point' | 'draw_rectangle' | 'draw_circle' | 'draw_freehand' | 'scaleRotateMode'\`
- \`mapRef\`: ref del mapa
- \`drawRef\`: instancia de MapboxDraw
- \`onDrawComplete(feature)\`: callback tras \`draw.create\`
- \`autoReset\`: borra lo dibujado al completar \`false | true\`
        `,
      },
    },
  },
};

export const Basico = () => <StoryCanvas />;


export const UsoCodigo = {
  parameters: {
    docs: {
      description: {
        story: `
Ejemplo básico de cómo inicializar el hook **useDrawingTool** para dibujar un polígono:

- \`mode\`: establece el modo de dibujo (ej: 'draw_polygon')
- \`mapRef\`: referencia al mapa (MapLibre / react-map-gl)
- \`drawRef\`: instancia de MapboxDraw
- \`onDrawComplete\`: función que recibe el feature creado
- \`autoReset\`: limpia automáticamente el dibujo tras completarlo
        `,
      },
      source: {
        code: `
const polygonTool = useDrawingTool({
  mode: 'draw_polygon',
  mapRef,
  drawRef,
  onDrawComplete: (feature) => {
    setLastFeature(feature);
    setActiveMode(null);
    console.log('Feature:', feature);
  },
  autoReset: false,
});

// Para activarlo:
<ButtonTool 
    icon={{ src:selec1}}
    label='Polígono'
    disabled={disabled}
    onClick={() => {
    polygonTool.activate();
    }}
    layout='row'
    className='w-full justify-start hover:bg-gray-300  rounded-none'
/>
        `,
        language: 'jsx',
      },
    },
  },
};


export const CodigoFuente = {
  parameters: {
    docs: {
      source: {
        code: `
// src/shared/map/hooks/useDrawingTool.js

import { useEffect } from 'react';
import { setDrawMode } from '@/shared/map/tools/setDrawMode';

export const useDrawingTool = ({
  mode,
  mapRef,
  drawRef,
  onDrawComplete = () => {},
  autoReset = true,
}) => {
  useEffect(() => {
    if (!mapRef || !drawRef) return;

    const map = mapRef.getMap();

    const handleCreate = (e) => {
      const feature = e.features?.[0];
      if (feature) {
        onDrawComplete(feature);
        if (autoReset) {
          drawRef.deleteAll();
        }
      }
    };

    map.on('draw.create', handleCreate);
    return () => {
      map.off('draw.create', handleCreate);
    };
  }, [mapRef, drawRef, onDrawComplete]);

  const activate = () => {
    setDrawMode(mapRef, drawRef, mode);
  };

  return {
    activate,
  };
};

// src/shared/map/tools/setDrawMode.js

export const setDrawMode = (mapRef, drawRef, mode) => {
  if (!drawRef || !mapRef) return;

  const mapCanvas = mapRef.getCanvas();
  drawRef.changeMode(mode);

  mapCanvas.classList.remove("cursor-default", "cursor-crosshair", "cursor-pointer");
  mapCanvas.classList.add("cursor-crosshair");
};

          
        `,
        language: 'jsx',
      },
    },
  },
};
