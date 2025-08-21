// src/shared/layout/components/TabsBar.stories.jsx
import { useState } from 'react';
import { TabsBar } from './TabsBar';

const TabsBarWrapper = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');

  return (
    <div style={{ padding: 16 }}>
      <TabsBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ marginTop: 16 }}>
        <p>Contenido activo: <strong>{tabs.find(tab => tab.key === activeTab)?.label}</strong></p>
      </div>
    </div>
  );
};

const sampleTabs = [
  { key: 'tab-1', label: 'Capas' },
  { key: 'tab-2', label: 'Leyenda' },
  { key: 'tab-3', label: 'Mediciones' },
];

export default {
  title: 'Shared/Layout/components/TabsBar',
  component: TabsBar,
  tags: ['autodocs'],
  render: (args) => <TabsBarWrapper {...args} />,
  args: {
    tabs: sampleTabs,
  },
  argTypes: {
    tabs: {
      control: false,
      description: 'Array de objetos con { key, label }',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        code: `
            export const TabsBar = ({ tabs, activeTab, setActiveTab }) => {
            return (
                <div className="flex border-b border-gray-200">
                {tabs.map(tab => (
                    <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={\`
                        px-3 py-1 text-sm border-b-2 border-gray-400 cursor-pointer 
                        \${activeTab === tab.key
                        ? "border-sky-500 text-sky-600 font-medium"
                        : "border-transparent text-gray-600 hover:text-sky-500"
                        }\`}
                    >
                    {tab.label}
                    </button>
                ))}
                </div>
            )}

        `,
      },
    },
  },
};

export const Basico = {};
