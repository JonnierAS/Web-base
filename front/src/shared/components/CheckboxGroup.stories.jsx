// src/shared/components/CheckboxGroup.stories.jsx
import { useState } from 'react';
import { CheckboxGroup } from './CheckboxGroup';

// ✅ Items de ejemplo
const baseItems = [
  {
    id: 'predios',
    label: 'Dato 1',
    checked: true,
    icon: '',
  },
  {
    id: 'area-proyecto',
    label: 'Dato 2',
    checked: true,
  },
  {
    id: 'ortofoto',
    label: 'Dato 3',
    checked: false,
  },
];

export default {
  title: 'Shared/components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  args: {
    title: 'Lista de checkboxes',
    items: baseItems,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del grupo de checkboxes',
    },
    items: {
      control: false,
      description: 'Lista de ítems (id, label, checked, icon)',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: `
            export function CheckboxGroup({ title, items = [], onChange }) {
            return (
                <div className="mb-3">
                {title && <h4 className="text-sm font-semibold text-gray-700 mb-1">{title}</h4>}
                <ul className="space-y-1">
                    {items.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                        <input
                        type="checkbox"
                        id={item.id}
                        checked={item.checked}
                        onChange={() => onChange(item.id)}
                        className="accent-sky-600 w-4 h-4"
                        />
                        {item.icon && (
                        <img src={item.icon} alt="icon" className="w-5 h-5" />
                        )}
                        <label htmlFor={item.id} className="text-sm text-gray-800 cursor-pointer">
                        {item.label}
                        </label>
                    </li>
                    ))}
                </ul>
                </div>
            );
            }
        `,
      },
    },
  },
};

// ✅ Story con control interactivo de estado
export const Basico = (args) => {
  const [state, setState] = useState(
    args.items.reduce((acc, item) => {
      acc[item.id] = item.checked;
      return acc;
    }, {})
  );

  const handleToggle = (id) => {
    setState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updatedItems = args.items.map((item) => ({
    ...item,
    checked: state[item.id],
  }));

  return (
    <CheckboxGroup
      title={args.title}
      items={updatedItems}
      onChange={handleToggle}
    />
  );
};


export const UseCodigo={
    component: CheckboxGroup,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
                <CheckboxGroup
                    title="Lista de checkboxes"
                    items={[Array de Objetos]}
                    onChange={handleToggle}
                />
            `},
        },
      },
}