// src/shared/hooks/usePanelTabs.stories.jsx

import { usePanelTabs } from './usePanelTabs';
import { TabsBar } from '../components/TabsBar';
import { GlobalStateProvider } from '@/shared/context/GlobalState';

// --- Componente wrapper para mostrar el hook visualmente
const DemoUsePanelTabs = ({ tabs }) => {
  const { activeTab, setActiveTab, currentTab } = usePanelTabs(tabs);

  return (
    <div style={{ padding: 20 }}>
      <TabsBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ marginTop: 16 }}>
        <h3 className="text-md font-semibold mb-1">Contenido actual:</h3>
        <div className="border p-3 rounded bg-gray-50">{currentTab?.content}</div>
      </div>
    </div>
  );
};

// --- Tabs de ejemplo
const exampleTabs = [
  { key: 'capas', label: 'Capas', content: 'Contenido de capas' },
  { key: 'leyenda', label: 'Leyenda', content: 'Contenido de leyenda' },
  { key: 'mediciones', label: 'Mediciones', content: 'Contenido de medición' },
];

export default {
  title: 'shared/layout/hooks/usePanelTabs',
  component: DemoUsePanelTabs,
  render: (args) => (
    <GlobalStateProvider>
      <DemoUsePanelTabs {...args} />
    </GlobalStateProvider>
  ),
  args: {
    tabs: exampleTabs,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Hook personalizado que gestiona pestañas y sincroniza con el estado global (`left`, `bottom`). También aplica clases DOM condicionalmente.',
      },
      source: {
        code: `
            import { useEffect, useState } from "react"
            import { useGlobalState } from "@/shared/context/GlobalState"
            
            export const usePanelTabs = (tabs = []) => {
              const [activeTab, setActiveTab] = useState(tabs[0]?.key || null)
              const { openPanel } = useGlobalState()
            
              const currentTab = tabs.find(tab => tab.key === activeTab)
            
                useEffect(() => {
                    const group = document.querySelector('.maplibregl-ctrl-group');
                    const scale = document.querySelector('.maplibregl-ctrl-bottom-left');
            
                    if (group) {
                        group.classList.toggle('maplibregl-ctrl-group-left-360', openPanel.left);
                    }
            
                    if (scale) {
                        scale.classList.toggle('maplibregl-ctrl-group-left-360', openPanel.left);
                    }
            
                    if (scale) {
                        scale.classList.toggle('maplibregl-ctrl-scale-bottom-250', openPanel.bottom);
                    }
                }, [openPanel.left, openPanel.bottom]);
            
            
              return {
                activeTab,
                setActiveTab,
                currentTab,
                tabs
              }
            }
            
        `,
      },
    },
  },
};

export const Basico = {};
