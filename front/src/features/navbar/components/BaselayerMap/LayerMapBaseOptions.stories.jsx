// src/features/navbar/components/BaselayerMap/LayerMapBaseOptions.stories.jsx
import LayerMapBaseOptions from './LayerMapBaseOptions';
import { GlobalStateProvider } from '@/shared/context/GlobalState';
import { mapStyles } from '@/shared/utils/constants_base_map/styles';

const DEFAULT_STYLE = mapStyles[0];

const Wrapper = () => (
  <GlobalStateProvider initialValue={{ mapType: DEFAULT_STYLE }}>
    <div
      style={{
        background: '#f9fafb',
        padding: '2rem',
        height: '100vh',
        position: 'relative',
      }}
    >
      <p style={{ marginBottom: 8 }}>Cambiar mapa base:</p>
      <LayerMapBaseOptions />
    </div>
  </GlobalStateProvider>
);

export default {
  title: 'features/navbar/components/LayerMapBaseOptions',
  component: LayerMapBaseOptions,
  render: () => <Wrapper />,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Basico = {
  parameters: {
    docs: {
      source: {
        code: `
import { useState } from "react";
import { mapStyles } from "@/shared/utils/constants_base_map/styles";
import { useGlobalState } from "@/shared/context/GlobalState";

function LayerMapBaseOptions() {
  const { mapType, setMapType } = useGlobalState();
  const [openMapaBase, setopenMapaBase] = useState(false);

  const handleOpenMapaBase = () => {
    setopenMapaBase(!openMapaBase);
  };

  const handleMapTypeChange = (style) => {
    setMapType(style);
  };

  return (
    <div>
      <img
        title="Mapa Base"
        className={\`\${openMapaBase && "bg-gray-300 p-1"} rounded cursor-pointer min-w-10 h-9\`}
        src={mapType.preview}
        alt="layers"
        onClick={handleOpenMapaBase}
      />
      {openMapaBase && (
        <div className="absolute grid grid-cols-6 justify-center bg-[#fff] w-[350px] h-auto right-1 md:right-4 top-[57px] shadow-md shadow-[#5a5858b4] border border-gray-400/70 rounded text-[8px]">
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
        `,
      },
    },
  },
};
