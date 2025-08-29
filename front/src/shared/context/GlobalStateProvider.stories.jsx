// src/shared/context/GlobalState.stories.jsx
import React from 'react';
import { GlobalStateProvider, useGlobalState } from './GlobalState';
import { mapStyles } from '@/shared/map/base/styles';

const DemoComponent = () => {
  const { openPanel, setOpenPanel, mapType, setMapType } = useGlobalState();

  return (
    <div className="space-y-4 p-4 bg-white border rounded shadow-md">
      <div>
        <h3 className="font-semibold">Estado actual:</h3>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify({ openPanel, mapType }, null, 2)}
        </pre>
      </div>

      <div className="space-x-2">
        <button
          className="px-2 py-1 bg-sky-500 text-white rounded"
          onClick={() => setOpenPanel(prev => ({ ...prev, left: !prev.left }))}
        >
          Toggle Left
        </button>
        <button
          className="px-2 py-1 bg-sky-500 text-white rounded"
          onClick={() => setOpenPanel(prev => ({ ...prev, right: !prev.right }))}
        >
          Toggle Right
        </button>
        <button
          className="px-2 py-1 bg-sky-500 text-white rounded"
          onClick={() => setOpenPanel(prev => ({ ...prev, bottom: !prev.bottom }))}
        >
          Toggle Bottom
        </button>
      </div>

      <div>
        <h4 className="font-medium mb-1">Cambiar mapa base:</h4>
        <div className="grid grid-cols-3 gap-2">
          {mapStyles.map(style => (
            <button
              key={style.id}
              onClick={() => setMapType(style)}
              className="flex flex-col items-center p-2 border hover:border-sky-500 rounded"
            >
              <img src={style.preview} alt="preview" className="w-10 h-8 rounded mb-1" />
              <span className="text-xs">{style.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'Shared/context/GlobalStateProvider',
  component: DemoComponent,
  decorators: [
    (Story) => (
      <GlobalStateProvider>
        <Story />
      </GlobalStateProvider>
    )
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Provee estado global para paneles (`left`, `right`, `bottom`) y estilo del mapa base (`mapType`). Usar el hook `useGlobalState()` para acceder.',
      },
      source: {
        code: `
            import { createContext, useContext, useState } from "react";
            import { mapStyles } from "@/shared/utils/constants_base_map/styles";
            
            const GlobalStateContext = createContext();
            
            export const GlobalStateProvider = ({ children }) => {
                const [mapType, setMapType] = useState(mapStyles[0]);
            
                /* sidepanel */
              const [openPanel, setOpenPanel] = useState({
                left: false,
                right: false,
                bottom: false
              })
            
                return (
                    <GlobalStateContext.Provider
                        value={{
                            mapType, setMapType,
                            openPanel, setOpenPanel
                        }}
                    >
                        {children}
                    </GlobalStateContext.Provider>
                )
            }
            
            export const useGlobalState = () => {
              return useContext(GlobalStateContext);
            };
        `
    }
    }
  }
};

export const Default = {};

export const Uso = {
  title: 'Shared/context/GlobalStateProvider',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Provee estado global para paneles (`left`, `right`, `bottom`) y estilo del mapa base (`mapType`). Usar el hook `useGlobalState()` para acceder.',
      },
      source: {
        code: `const { openPanel, setOpenPanel, mapType, setMapType } = useGlobalState();`
    }
    }
  }
}