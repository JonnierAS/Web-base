// src/shared/components/Select.stories.jsx
import { useState } from 'react';
import { Select } from './Select';
import { parameters } from '../../../.storybook/preview';

export default {
  title: 'Shared/components/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Selecciona un idioma',
    placeholder: 'Elige una opción',
    width: 280,
    height: 30,
    disabled: false,
    required: false,
    error: '',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
  },
  parameters:{
    layout: 'padded',
    docs:{
        source:{
            code: `
                import { useState } from 'react';
    
                export const Select = ({
                label,
                options = [],
                placeholder = 'Seleccione...',
                value,
                onChange,
                width = 300,
                height = 30,
                disabled = false,
                required = false,
                error = '',
                }) => {
                const [open, setOpen] = useState(false);
                const [searchTerm, setSearchTerm] = useState('');
    
                const filteredOptions = options.filter(opt =>
                    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
                );
    
                const handleSelect = (val) => {
                    onChange(val);
                    setOpen(false);
                    setSearchTerm('');
                };
    
                return (
                    <div style={{ width }} className="relative text-sm">
                    {label && (
                        <label className="text-gray-700 block mb-1">{label}</label>
                    )}
    
                    <div
                        className={\`\${open ? 'border-[#42a5f5]': 'border-gray-400'} border rounded px-2 py-1 text-black bg-white cursor-pointer border-gray-400 focus-within:border-[#42a5f5] \${
                        disabled ? 'opacity-50 cursor-not-allowed' : ''
                        }\`}
                        onClick={() => !disabled && setOpen(!open)}
                        style={{ height }}
                    >
                        {options.find((opt) => opt.value === value)?.label || (
                        <span className="text-gray-400">{placeholder}</span>
                        )}
                    </div>
    
                    {/* Opciones */}
                    {open && (
                        <div
                        className="absolute left-0 z-50 mt-1 w-full bg-white border border-gray-300 shadow-md rounded max-h-48 overflow-auto"
                        style={{ maxHeight: 180 }}
                        >
                        {options.length > 5 && (
                            <div className="p-2">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#42a5f5]"
                            />
                            </div>
                        )}
                        {filteredOptions.map((opt) => (
                            <div
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            className="px-3 py-1 hover:bg-[#42a5f5] cursor-pointer"
                            >
                            {opt.label}
                            </div>
                        ))}
                        {!filteredOptions.length && (
                            <div className="px-3 py-2 text-gray-400">Sin resultados</div>
                        )}
                        </div>
                    )}
    
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                    </div>
                );
                };
    
            `
        }
    }
  }
};

export const Basico = (args) => {
  const [selected, setSelected] = useState('');

  const opciones = [
    { label: 'Español', value: 'es' },
    { label: 'Inglés', value: 'en' },
    { label: 'Francés', value: 'fr' },
    { label: 'Alemán', value: 'de' },
    { label: 'Italiano', value: 'it' },
    { label: 'Portugués', value: 'pt' },
    { label: 'Japonés', value: 'jp' },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Select
        {...args}
        options={opciones}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};


export const UsoCodigo={
    component: Select,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
                import { useState } from 'react';
                import { Select } from '@/shared/components/Select';

                export default function LanguageSelector() {
                const [lang, setLang] = useState('');

                const languages = [
                    { label: 'Español', value: 'es' },
                    { label: 'Inglés', value: 'en' },
                    { label: 'Francés', value: 'fr' },
                    { label: 'Alemán', value: 'de' },
                    { label: 'Italiano', value: 'it' },
                    { label: 'Portugués', value: 'pt' },
                    { label: 'Japonés', value: 'jp' },
                ];

                return (
                    <div>
                    <Select
                        label="Selecciona un idioma"
                        options={languages}
                        value={lang}
                        onChange={setLang}
                        placeholder="Elige uno"
                        width={300}
                    />
                    </div>
                );
                }

            `},
        },
      },
}