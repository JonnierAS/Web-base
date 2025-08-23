// src/features/navbar/components/BaselayerMap/LayerMapBaseOptions.stories.jsx
import LayerMapBaseOptions from './LayerMapBaseOptions';
import { GlobalStateProvider } from '@/shared/context/GlobalState';
import { mapStyles } from '@/shared/utils/constants_base_map/styles';

export default {
  title: 'features/navbar/components/LayerMapBaseOptions',
  component: LayerMapBaseOptions,
  tags: ['autodocs'],
  args: {
    position: 'top-right',
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'center-left',
        'center-right',
      ],
      description: 'Posición del modal del selector de mapa base',
    },
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story, context) => (
      <GlobalStateProvider initialValue={{ mapType: mapStyles[0] }}>
        <div
          style={{
            background: '#f9fafb',
            padding: '2rem',
            height: '100vh',
            position: 'relative',
          }}
        >
          <p style={{ marginBottom: 8 }}>Cambiar mapa base:</p>
          <Story {...context} />
        </div>
      </GlobalStateProvider>
    ),
  ],
};

export const Basico = {
  args: {
    position: 'top-right',
  },
};

export const CodigoFuente = {
   parameters: {
    docs: {
      source: {
        code: `
        
        import { useState } from "react";
        
        import { mapStyles } from "@/shared/utils/constants_base_map/styles";
        import { useGlobalState } from "@/shared/context/GlobalState";
        
        const positionClasses = {
            'top-left': 'fixed top-[57px] left-5',
            'top-right': 'fixed top-[57px] right-5',
            'bottom-left': 'fixed bottom-[12px] left-5',
            'bottom-right': 'fixed bottom-[12px] right-5',
            'center-right': 'fixed top-[50%] right-5',
            'center-left': 'fixed top-[50%] left-5',
          };
        
        function LayerMapBaseOptions({ position = 'top-right' }) {
        
          const {mapType, setMapType} = useGlobalState()
          
          const [openMapaBase, setopenMapaBase] = useState(false)
        
          const handleOpenMapaBase = ()=>{
            setopenMapaBase(!openMapaBase)
          }
        
          const handleMapTypeChange = (style) => {
            setMapType(style)
          };
        
          const modalPosition = positionClasses[position] || 'top-[57px] right-1';
        
          return (
                <div>
                  <img title="Mapa Base" 
                  className={\`
                  \${openMapaBase && "bg-gray-300 p-1"} rounded cursor-pointer min-w-10 h-9
                  \`} 
                  src={mapType.preview} alt="layers" 
                  onClick={handleOpenMapaBase}
                  />
                  {openMapaBase && (
                    <div
                      className={\` grid grid-cols-6 justify-center bg-[#fff] w-[350px] h-auto shadow-md shadow-[#5a5858b4] border border-gray-400/70 rounded text-[8px] z-50 \${modalPosition}
                      \`}
                    >
                      {mapStyles.map((style) => (
                        <button
                          key={style.id}
                          className="col-span-1 cursor-pointer hover:text-sky-500 max-w-20"
                          onClick={() => handleMapTypeChange(style)}
                        >
                          <img
                            className="rounded w-12 h-8 m-1 hover:scale-[1.5] border border-gray-300"
                            src={style.preview}
                            alt="Preview"
                          />
                          {style.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
          
          );
        }
        
        export default LayerMapBaseOptions;
        
        `
      }
    }
  }
}
