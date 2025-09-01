import { useEffect } from 'react';
import { LeftPanel } from './LeftPanel';
import { useGlobalState } from '@/shared/context/GlobalState';
import { within, userEvent, expect } from '@storybook/test';

// Wrapper con layout simulado para Storybook
const LeftPanelOpen = ({ title, tabs, footerButtons }) => {
  const { setOpenPanel } = useGlobalState();

  useEffect(() => {
    setOpenPanel(prev => ({ ...prev, left: true }));
  }, [setOpenPanel]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        maxHeight: 500,
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
      }}
    >
      <LeftPanel title={title} tabs={tabs} footerButtons={footerButtons} />
      {/* contenido simulado */}
      <div style={{ position: 'absolute', left: 360, top: 12, opacity: 0.5 }}>
        <p>Contenido de la página (placeholder)</p>
      </div>
    </div>
  );
};

// Botones inferiores
const footerButtons = [
  { label: 'Añadir capa', onClick: () => alert('Añadir capa') },
  { label: 'Limpiar', onClick: () => alert('Limpiar capas') },
];

// Tabs de ejemplo
const sampleTabs = [
  { id: 'capas', label: 'Capas', content: <div>Listado de capas</div> },
  { id: 'leyenda', label: 'Leyenda', content: <div>Contenido de leyenda</div> },
];

const manyTabs = Array.from({ length: 6 }).map((_, i) => ({
  id: `tab-${i + 1}`,
  label: `Tab ${i + 1}`,
  content: <div>Contenido #{i + 1}</div>,
}));

export default {
  title: 'Shared/Layout/LeftPanel',
  component: LeftPanel,
  tags: ['autodocs'],
  render: (args) => <LeftPanelOpen {...args} />,
  args: {
    title: 'Panel Izquierdo',
    tabs: sampleTabs,
  },
  argTypes: {
    title: { control: 'text', description: 'Título del panel' },
    tabs: { control: false, description: 'Pestañas (id, label, content)' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { type: 'code' },
    },
  },
};

// Variantes
export const Basico = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Panel Izquierdo')).toBeInTheDocument();
        await expect(canvas.getByText('Capas')).toBeInTheDocument();
        await expect(canvas.getByText('Listado de capas')).toBeInTheDocument();
        const closeButton = await canvas.getByRole('button', { name: /Cerrar/i });
        await userEvent.click(closeButton);
        await expect(canvas.queryByText('Panel Izquierdo')).not.toBeInTheDocument();
    }
};

export const MuchasTabs = {
  args: { tabs: manyTabs },
  parameters: {
    docs: {
      source: {
        code: `
<LeftPanel
  title="Capas y Leyenda"
  tabs={[
        { key: "tab-1", label: "tab-1", content: <component /> },
        { key: "tab-2", label: "tab-2", content: <component /> },
        { key: "tab-3", label: "tab-3", content: <component /> },
        { key: "tab-4", label: "tab-4", content: <component /> },
    ]}
/>`,
      },
    },
  },
};

// Mostrar el código completo en la pestaña Docs
Basico.parameters = {
  docs: {
    source: {
      code: `import { useGlobalState } from '@/shared/context/GlobalState'
import { ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons"
import { usePanelTabs } from "../hook/usePanelTabs"
import { TabsBar } from "../components/TabsBar"

export const LeftPanel = ({ title = "Panel", tabs = [] }) => {
  const { openPanel, setOpenPanel } = useGlobalState()
  const { activeTab, setActiveTab, currentTab } = usePanelTabs(tabs)

  const handleToggle = () => {
    setOpenPanel(prev => ({ ...prev, left: !openPanel.left }))
  }

  return (
    <>
      <div className={\`\${!openPanel.left && 'hidden'} absolute w-[340px] h-[100dvh] bg-transparent left-0 z-[850]\`}>
        <div className="relative py-2 bg-white h-full border-t-4 border-gray-400/70">
          {/* Header */}
          <div className="mt-12 flex justify-between pr-2 items-center border-b border-gray-300">
            <h1 className="text-lg pl-1">{title}</h1>
            <span
              onClick={handleToggle}
              className="text-gray-400 cursor-pointer p-1 rounded hover:bg-red-300 hover:text-black"
            >
              <Cross1Icon />
            </span>
          </div>

          {/* Tabs */}
          <TabsBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Scrollable Content */}
          <div className="w-full overflow-auto flex-grow">
            {currentTab?.content}
          </div>

          {/* Reusable Footer */}
          <PanelFooterButtons buttons={footerButtons} />
        </div>
      </div>

      {!openPanel.left && (
        <button
          onClick={handleToggle}
          className="bg-white absolute px-0.5 py-2 top-1/2 border border-gray-300 rounded-r-none cursor-pointer z-[950]"
        >
          <ChevronRightIcon />
        </button>
      )}
    </>
  )
}`,
    },
  },
};


export const ConBotonesInferiores = {
  args: {
    footerButtons,
  },
  parameters: {
    docs: {
      source: {
        code: `
<LeftPanel
  title="Capas y Leyenda"
  tabs={[{ key: "layers", label: "Capas", content: <component /> }]}
  footerButtons={[
    { label: "Añadir capa", onClick: () => {} },
    { label: "Limpiar", onClick: () => {} }
  ]}
/>
`,
      },
    },
  },
};


export const UsoCodigo={
    component: LeftPanel,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
<LeftPanel
  title="Capas y Leyenda"
  tabs={[
    { key: "layers", label: "Capas", content: <component /> },
    { key: "leyend", label: "Leyenda", content: <component /> },
  ]}
/>
            `},
        },
      },
}