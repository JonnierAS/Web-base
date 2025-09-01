import { useState } from 'react';
import { Input } from './Input';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Shared/components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    id: 'input-example',
    name: 'input-example',
    label: 'Nombre',
    placeholder: 'Ingresa tu nombre',
    value: '',
    type: 'text',
    width: 300,
    height: 30,
    disabled: false,
    readOnly: false,
    required: false,
    autoComplete: 'off',
    autoFocus: false,
    error: '',
  },
  argTypes: {
    label: { control: 'text', description: 'Texto de la etiqueta (label)' },
    placeholder: { control: 'text', description: 'Texto dentro del input cuando está vacío' },
    value: { control: 'text', description: 'Valor del input' },
    type: { control: 'text', description: 'Tipo de input (text, email, password...)' },
    width: { control: 'number', description: 'Ancho en píxeles' },
    height: { control: 'number', description: 'Alto en píxeles' },
    disabled: { control: 'boolean', description: 'Desactiva el input' },
    readOnly: { control: 'boolean', description: 'Solo lectura' },
    required: { control: 'boolean', description: 'Es requerido' },
    autoComplete: { control: 'text', description: 'Autocompletado del navegador' },
    autoFocus: { control: 'boolean', description: 'Autofoco al cargar' },
    error: { control: 'text', description: 'Mensaje de error' },
    className: { control: false },
    style: { control: false },
    onChange: { action: 'changed', description: 'Callback al cambiar valor' },
    onBlur: { action: 'blurred', description: 'Callback al salir del campo' },
    onFocus: { action: 'focused', description: 'Callback al enfocar el campo' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      source: { 
        type: 'code', 
        code: `
            export const Input = ({
            id,
            name,
            label,
            placeholder,
            value,
            onChange,
            onBlur,
            onFocus,
            type = "text",
            width = 300,
            height = 33,
            disabled = false,
            readOnly = false,
            required = false,
            autoComplete = "off",
            autoFocus = false,
            className = "",
            style = {},
            error = "",
            }) => {
            return (
                <div style={{ width }}>
                {label && (
                    <label htmlFor={id} className="text-sm text-gray-700 mb-1 block">
                    {label}
                    </label>
                )}
                <input
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    type={type}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    className={\`text-sm text-black border border-gray-400 focus:outline-none focus:border-[#42a5f5] px-2 py-1 rounded w-full \${className}\`}
                    style={{ height, ...style }}
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>
            );
            };

        `
    },
    },
  },
};

const render = (args) => {
  const [val, setVal] = useState(args.value || '');

  return (
    <Input
      {...args}
      value={val}
      onChange={(newValue) => {
        setVal(newValue);
        args.onChange?.(newValue); // para trigger de acción en Storybook
      }}
    />
  );
}

// Story controlada con estado interno
export const Basico = {
  render: render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByLabelText('Nombre');
    await userEvent.type(input, 'John Doe');
    await expect(input.value).toBe('John Doe');
  }
};


export const UsoCodigo={
    component: Input,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
                <Input
                    id="email"
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="tucorreo@ejemplo.com"
                    required
                />
            `},
        },
      },
}