import React, { useEffect } from 'react';
import { MapContainer } from './MapContainer.jsx';
import { useGlobalState } from '@/shared/context/GlobalState';
import { within, expect } from '@storybook/test';
import { mapStyles } from '@/shared/map/base/styles';

const MapWithArgs = ({ mapStyle }) => {
  const { setMapType } = useGlobalState?.() ?? {};

  useEffect(() => {
    if (setMapType && mapStyle) {
      setMapType({ source: mapStyle });
    }
  }, [mapStyle, setMapType]);

  return (
    <div >
      <MapContainer />
    </div>
  );
};

const OPTIONS = Array.isArray(mapStyles) && mapStyles.length
  ? mapStyles.map(s => ({
      label: s?.name || s?.label || s?.source?.split('/').pop() || 'style',
      value: s?.source,
    }))
  : [
      { label: 'MapLibre Demo', value: 'https://demotiles.maplibre.org/style.json' },
    ];

export default {
  title: 'Features/Map/MapContainer',
  component: MapContainer,
  render: (args) => <MapWithArgs {...args} />,
   tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  args: {
    mapStyle: OPTIONS[0]?.value,
  },
  argTypes: {
    mapStyle: {
      name: 'mapType.source',
      control: { type: 'select' },
      options: OPTIONS.map(o => o.value),
      labels: OPTIONS.reduce((acc, o) => ({ ...acc, [o.value]: o.label }), {}),
      description: 'URL del style.json usado por maplibre',
    },
    NavigationControl: {
      name: 'NavigationControl',
      description: 'Controlador de zoom Posiciones ( top-left, bottom-left, top-right, bottom-right)',
    },
    ScaleControl: {
      name: 'ScaleControl',
      description: 'Controlador de escala ( top-left, bottom-left, top-right, bottom-right)',
    }
  },
};

// --- Variantes ---
export const Basico = {
  parameters: {
    docs: {
      source: {
        code: `
          import { useEffect, useRef } from 'react'
          import Map from 'react-map-gl/maplibre';
          import mapLibregl from 'maplibre-gl';
          import { useDispatch } from 'react-redux';
          import { NavigationControl, ScaleControl } from 'react-map-gl';

          //components
          import { setMapref } from '@/shared/redux/features/mapSlice';
          import { useGlobalState } from '@/shared/context/GlobalState';

          export const MapContainer = () => {
              const dispatch = useDispatch()

              const INITIAL_POSITION = {
                  latitude: -12.020545729298373,
                  longitude: -77.0269319335112,
              }
              const ZOOM = 9;
              const mapRef = useRef(null);

              const {mapType} = useGlobalState()
              
              const onLoad = () => {
                dispatch(setMapref(mapRef.current))    

              }


              const onStyleData = (e) => {

              };


            const modeChange = (event) => {
              const mapCanvas = mapRef.current.getCanvas();
              switch(event.mode){
                case 'direct_select':
                  mapCanvas.classList.remove("cursor-crosshair", "cursor-pointer-icon");
                  mapCanvas.classList.add("cursor-pointer-icon");
                  break;
                default:
                  mapCanvas.classList.remove("cursor-crosshair", "cursor-pointer-icon");
              }
            };
              
            return (
                  <Map
                      ref={mapRef}    
                      onLoad={onLoad}
                      onStyleData={onStyleData}
                      attributionControl={false}
                      initialViewState={{longitude: INITIAL_POSITION.longitude, latitude: INITIAL_POSITION.latitude, zoom: ZOOM}}
                      mapLib={mapLibregl}  interactive={true}
                      mapStyle={mapType.source}
                      style={{width: '100dvw', height: '100dvh'}}
                      preserveDrawingBuffer={true}
                  >  
                    <NavigationControl position='top-left' />
                    <ScaleControl position='bottom-left' maxWidth={100} unit='metric'/>
                  </Map>
            )
          }

        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const map = await canvas.findByRole('region', { name: /Map/i });
    await expect(map).toBeInTheDocument();
  }
};


export const UsoCodigo={
    component: MapContainer,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
<MapContainer />
            `},
        },
      },
}