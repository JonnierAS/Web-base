// src/shared/layout/bottom/BottomPanel.stories.jsx
import { useEffect } from 'react';
import { BottomPanel } from './BottomPanel';
import { useGlobalState } from '@/shared/context/GlobalState';

// Wrapper para abrir/cerrar el panel desde args y simular left/right abiertos
const BottomPanelOpen = ({ title, tabs, leftOpen = false, rightOpen = false }) => {
  const { setOpenPanel } = useGlobalState();

  // Abrimos/cerramos según args cuando monta/cambian
  useEffect(() => {
    setOpenPanel((prev) => ({
      ...prev,
      bottom: true,
      left: leftOpen,
      right: rightOpen,
    }));
  }, [leftOpen, rightOpen, setOpenPanel]);

  // Contenedor relativo para que el absolute del panel funcione en Storybook
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 400, // ajustá si querés
        background: '#f7fafc',
        border: '1px solid #e5e7eb',
      }}
    >
      <BottomPanel title={title} tabs={tabs} />
      {/* placeholder para simular contenido de página detrás */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ padding: 12, opacity: 0.5 }}>
          <p>Contenido de la página (placeholder)</p>
        </div>
      </div>
    </div>
  );
};

// Tabs de ejemplo (React nodes)
const sampleTabs = [
  { id: 'capas', label: 'Capas', content: <div>Listado de capas…</div> },
  { id: 'leyenda', label: 'Leyenda', content: <div>Leyenda del mapa…</div> },
  { id: 'mediciones', label: 'Mediciones', content: <div>Herramientas de medición…</div> },
];

const manyTabs = Array.from({ length: 8 }).map((_, i) => ({
  id: `tab-${i + 1}`,
  label: `Tab ${i + 1}`,
  content: <div>Contenido #{i + 1}</div>,
}));

export default {
  title: 'Shared/Layout/BottomPanel',
  component: BottomPanel,
  tags: ['autodocs'],
  render: (args) => <BottomPanelOpen {...args} />,
  args: {
    title: 'Panel',
    tabs: sampleTabs,
    leftOpen: false,
    rightOpen: false,
  },
  argTypes: {
    title: { control: 'text', description: 'Título del panel' },
    tabs: { control: false, description: 'Pestañas a renderizar (id, label, content)' },
    leftOpen: {
      control: 'boolean',
      description: 'Simula panel izquierdo abierto (desplaza el bottom panel)',
    },
    rightOpen: {
      control: 'boolean',
      description: 'Simula panel derecho abierto (desplaza el bottom panel)',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Basico = {};

export const MuchasTabs = {
  args: { tabs: manyTabs },
  parameters: {
    layout: 'padded',
    docs: {
      source: {code:`
            <BottomPanel
            title="Multiple Tabs"
            tabs={[
                { key: "tab-1", label: "tab-1", content: <component /> },
                { key: "tab-2", label: "tab-2", content: <component /> },
                { key: "tab-3", label: "tab-3", content: <component /> },
                { key: "tab-4", label: "tab-4", content: <component /> },
            ]}
            />
        `},
    },
  },
};

// Snippet de uso para la pestaña Docs
Basico.parameters = {
  docs: {
    source: {
      code: `import { useEffect, useState } from 'react'
import { useGlobalState } from '@/shared/context/GlobalState'
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { usePanelTabs } from "../hook/usePanelTabs"
import { TabsBar } from '../components/TabsBar'

export const BottomPanel = ({ title = "Panel", tabs = [] }) => {
  const { openPanel, setOpenPanel } = useGlobalState()
  const { activeTab, setActiveTab, currentTab } = usePanelTabs(tabs)

  const [height, setHeight] = useState(250)
  const [isDragging, setIsDragging] = useState(false)

  const startResize = (e) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const onMouseMove = (e) => {
    if (!isDragging) return
    const windowHeight = window.innerHeight
    const newHeight = windowHeight - e.clientY
    if (newHeight >= 150 && newHeight <= windowHeight - 100) {
      setHeight(newHeight)
    }
  }

  const stopResize = () => setIsDragging(false)

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", stopResize)
      return () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", stopResize)
      }
    }
  }, [isDragging])

  return (
    <>
      {openPanel.bottom && (
        <div
          className="absolute z-[799] cursor-n-resize bg-gray-300 mx-2"
          style={{
            height: 5,
            bottom: \`\${height}px\`,
            left: openPanel.left ? 335 : 0,
            right: openPanel.right ? 352 : 0
          }}
          onMouseDown={startResize}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-0.5 bg-gray-400 rounded" />
          </div>
        </div>
      )}

      <div
        className={\`
          absolute bg-white z-[1000] border-2 border-t-0 border-gray-400/70 mx-2
          \${openPanel.left ? 'left-[335px]' : 'left-0'}
          \${openPanel.right ? 'right-[352px]' : 'right-0'}
          \${!openPanel.bottom && 'hidden'}
        \`}
        style={{ bottom: 0, height }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-2 border-b border-gray-300">
          <h1 className="text-lg">{title}</h1>
          <button
            onClick={() => setOpenPanel(prev => ({ ...prev, bottom: false }))}
            className="text-gray-400 cursor-pointer p-1 rounded hover:bg-red-300 hover:text-black"
          >
            <ChevronDownIcon />
          </button>
        </div>

        {/* Tabs */}
        <TabsBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="p-2 overflow-auto" style={{ height: \`calc(\${height}px - 120px)\` }}>
          {currentTab?.content}
        </div>
      </div>

      {!openPanel.bottom && (
        <button
          onClick={() => setOpenPanel(prev => ({ ...prev, bottom: true }))}
          className="bg-white absolute bottom-[-10px] px-1 h-[40px] left-[47%] border border-gray-300 rounded-t cursor-pointer z-[950] rotate-270"
        >
          <ChevronRightIcon />
        </button>
      )}
    </>
  )
}
`,
    },
  },
};
