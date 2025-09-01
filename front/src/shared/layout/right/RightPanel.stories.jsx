import { useEffect } from 'react';
import { RightPanel } from './RightPanel';
import { useGlobalState } from '@/shared/context/GlobalState';
import { within, userEvent, expect } from '@storybook/test';

// Wrapper para simular el layout de página + apertura del panel derecho
const RightPanelOpen = ({ title, tabs, footerButtons }) => {
  const { setOpenPanel } = useGlobalState();

  useEffect(() => {
    setOpenPanel((prev) => ({ ...prev, right: true }));
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
      <RightPanel title={title} tabs={tabs} footerButtons={footerButtons} />
      <div style={{ position: 'absolute', left: 12, top: 12, opacity: 0.5 }}>
        <p>Contenido de la página (placeholder)</p>
      </div>
    </div>
  );
};

// botones inferiores
const footerButtons = [
  { label: 'Guardar', onClick: () => alert('Guardado') },
  { label: 'Cancelar', onClick: () => alert('Cancelado') },
];


// Tabs de ejemplo
const sampleTabs = [
  { id: 'info', label: 'Info', content: <div>Información general</div> },
  { id: 'config', label: 'Configuración', content: <div>Configuración avanzada</div> },
];

const manyTabs = Array.from({ length: 7 }).map((_, i) => ({
  id: `tab-${i + 1}`,
  label: `Tab ${i + 1}`,
  content: <div>Contenido #{i + 1}</div>,
}));

export default {
  title: 'Shared/Layout/RightPanel',
  component: RightPanel,
  tags: ['autodocs'],
  render: (args) => <RightPanelOpen {...args} />,
  args: {
    title: 'Panel Derecho',
    tabs: sampleTabs,
  },
  argTypes: {
    title: { control: 'text', description: 'Título del panel' },
    tabs: { control: false, description: 'Pestañas del panel (id, label, content)' },
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
        await expect(canvas.getByText('Panel Derecho')).toBeInTheDocument();
        await expect(canvas.getByText('Info')).toBeInTheDocument();
        await expect(canvas.getByText('Información general')).toBeInTheDocument();
        const closeButton = await canvas.getByRole('button', { name: /Cerrar/i });
        await userEvent.click(closeButton);
        await expect(canvas.queryByText('Panel Derecho')).not.toBeInTheDocument();
    }
};

export const MuchasTabs = {
  args: { tabs: manyTabs },
  parameters: {
    docs: {
      source: {
        code: `
<RightPanel
  title="Opciones"
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
      code: `import { useEffect, useState } from "react"
import { useGlobalState } from '@/shared/context/GlobalState'
import { ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons"
import { usePanelTabs } from "../hook/usePanelTabs"
import { TabsBar } from "../components/TabsBar"

export const RightPanel = ({ title = "Panel", tabs = [] }) => {
  const { openPanel, setOpenPanel } = useGlobalState()
  const { activeTab, setActiveTab, currentTab } = usePanelTabs(tabs)
  const [width, setWidth] = useState(350)
  const [isDragging, setIsDragging] = useState(false)

  const handleClose = () => {
    setOpenPanel(prev => ({ ...prev, right: false }))
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newWidth = window.innerWidth - e.clientX
    if (newWidth > 250 && newWidth < window.innerWidth - 100) {
      setWidth(newWidth)
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <>
      <div style={{ width }} className={\`\${!openPanel.right && 'hidden'} absolute h-[100dvh] right-0 z-[950]\`}>
        <div className="relative mt-12 py-2 bg-white h-full border-t-4 border-gray-400/70">
          {/* Header */}
          <div className="flex justify-between items-center p-2 border-b border-gray-300">
            <h1 className="text-lg">{title}</h1>
            <span
              onClick={handleClose}
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

      {/* Toggle + Resizer */}
      {!openPanel.right ? (
        <button
          onClick={() => setOpenPanel(prev => ({ ...prev, right: true }))}
          className="bg-white absolute px-0.5 py-2 top-1/2 border border-gray-300 rounded-l-none cursor-pointer rotate-180 right-0 z-[950]"
        >
          <ChevronRightIcon />
        </button>
      ) : (
        <div
          style={{ right: \`\${width}px\` }}
          className="z-[900] absolute h-full w-2 bg-gray-200 cursor-e-resize hover:bg-gray-300 border-x border-gray-300"
          onMouseDown={handleMouseDown}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-0.5 h-8 bg-gray-400 rounded"></div>
          </div>
        </div>
      )}
    </>
  )
}`,
    },
  },
};



export const ConFooter = {
  args: {
    footerButtons,
  },
  parameters: {
    docs: {
      source: {
        code: `
<RightPanel
  title="Configuración"
  tabs={[{ key: "config", label: "Configuración", content: <component /> }]}
  footerButtons={[
    { label: "Guardar", onClick: () => {} },
    { label: "Cancelar", onClick: () => {} }
  ]}
/>
`,
      },
    },
  },
};


export const UsoCodigo={
    component: RightPanel,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
<RightPanel
  title="Opciones"
  tabs={[
    { key: "info", label: "Info", content: <component /> },
    { key: "config", label: "Configuración", content: <component /> },
  ]}
/>
            `},
        },
      },
}