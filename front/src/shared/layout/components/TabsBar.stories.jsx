import { useState } from 'react';
import { TabsBar } from './TabsBar';
import { within, userEvent, expect } from '@storybook/test';

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
        className={\`px-3 py-1 text-sm border-b-2 border-gray-400 cursor-pointer 
        \${tab.label.length === 0 ? "hidden" : ""}
        \${
          activeTab === tab.key
            ? "border-sky-500 text-sky-600 font-medium"
            : "border-transparent text-gray-600 hover:text-sky-500"
        }\`}
      >
        {tab.label}
      </button>
    ))}
  </div>
)
}
        `,
      },
    },
  },
};

export const Basico = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const tab1 = await canvas.getByRole('button', { name: /Capas/i });
        const tab2 = await canvas.getByRole('button', { name: /Leyenda/i });
        const tab3 = await canvas.getByRole('button', { name: /Mediciones/i });

        await expect(tab1).toBeInTheDocument();
        await expect(tab2).toBeInTheDocument();
        await expect(tab3).toBeInTheDocument();

        await userEvent.click(tab2);
        await expect(canvas.getByText('Leyenda')).toBeInTheDocument();

        await userEvent.click(tab3);
        await expect(canvas.getByText('Mediciones')).toBeInTheDocument();
    }
};


export const UsoCodigo={
    component: TabsBar,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
                const [activeTab, setActiveTab] = useState('capas');

                const tabs = [
                { key: 'capas', label: 'Capas' },
                { key: 'leyenda', label: 'Leyenda' },
                ];

                return (
                <TabsBar
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                );
            `},
        },
      },
}