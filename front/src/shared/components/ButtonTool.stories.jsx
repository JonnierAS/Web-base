import React from 'react';
import { ButtonTool } from './ButtonTool';
import mundo from '@/shared/assets/icons/mundo.png';
import distancia from '@/shared/assets/icons/distancia.png';
import capturar_mapa from '@/shared/assets/icons/capturar_mapa.png';

export default {
  title: 'shared/Components/ButtonTool',
  component: ButtonTool,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Botón** reutilizable que puede mostrar un ícono, un texto o ambos. 
Ideal para barras de herramientas, menús u opciones donde se requiere un botón compacto y personalizado.
        `,
      },
    },
  },
  argTypes: {
    icon: {
      description: 'Objeto que representa el ícono. Requiere al menos la propiedad `src`.',
      control: 'object',
    },
    label: {
      description: 'Texto a mostrar debajo o al lado del ícono.',
      control: 'text',
    },
    isActive: {
      description: 'Define si el botón está activo visualmente.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desactiva el botón (no clickeable y visualmente apagado).',
      control: 'boolean',
    },
    onClick: {
      description: 'Función que se ejecuta al hacer clic en el botón.',
      action: 'clicked',
    },
    layout: {
      description: 'Dirección de layout del botón: columna (default) o fila.',
      control: { type: 'radio' },
      options: ['column', 'row'],
    },
    className: {
      description: 'Clases personalizadas adicionales.',
      control: 'text',
    },
  },
};

const iconMap = {
  mundo: mundo,
  distancia: distancia,
  capturar_mapa: capturar_mapa,
};

// --- EJEMPLOS ---

export const IconAndLabel = {
  name:'Ícono + Label (Activo)',
  args:{
    icon:{ src: iconMap.mundo, alt: 'Mundo', width: 20, height: 20 },
    label:'Mundo',
    isActive:true,
    onClick:() => console.log('Click'),
    className:""
  },
};

export const OnlyLabel = {
  name: 'Solo texto',
  args: {
    label: 'Solo texto',
    onClick: () => alert('Only label'),
  },
};

export const OnlyIcon = {
  name: 'Solo ícono',
  args: {
    icon: { src: iconMap.distancia, alt: 'Distancia' },
    onClick: () => console.log('Distancia'),
  },
};

export const HorizontalLayout = {
  name: 'Layout horizontal',
  args: {
    icon: { src: iconMap.capturar_mapa },
    label: 'Capturar mapa',
    layout: 'row',
    className: 'bg-gray-100',
    onClick: () => console.log('Capturar mapa'),
  },
};

export const DisabledState = {
  name: 'Deshabilitado',
  args: {
    icon: { src: iconMap.mundo },
    label: 'No activo',
    disabled: true,
  },
};


export const CodigoFuente={
    component: ButtonTool,
        parameters: {
        layout: 'padded',
        docs: {
          source:{
        code:`
            
/**
 * Reusable button with optional icon and label
 * 
 * @param {{
 *   icon?: { src: string, alt?: string, width?: number, height?: number },
 *   label?: string,
 *   isActive?: boolean,
 *   disabled?: boolean,
 *   onClick?: () => void,
 *   layout?: 'row' | 'column',
 *   className?: string,
 * }} props 
 */
export const ButtonTool = ({
  icon,
  label = '',
  isActive = false,
  disabled = false,
  onClick,
  layout = 'column',
  className = '',
}) => {
  const flexLayout = layout === 'row' ? 'flex-row gap-1' : 'flex-col';

  const iconElement = icon ? (
    <img
      src={icon.src}
      alt={icon.alt || 'icon'}
      style={{
        width: icon.width || 24,
        height: icon.height || 24,
      }}
      className={\`object-contain transition-all \${
        disabled ? 'grayscale opacity-50' : ''
      }\`}
    />
  ) : null;

  const labelElement = label ? (
    <span
      className={\`mt-1 text-[11px] \${
        disabled
          ? 'text-gray-300'
          : 'text-gray-900 font-medium hover:text-[#49b0f2]'
      }\`}
    >
      {label}
    </span>
  ) : null;

  return (
    <button
      type="button"
      title={icon?.alt || label}
      disabled={disabled}
      onClick={onClick}
      className={\`flex \${flexLayout} items-center justify-center p-1 rounded text-[11px] transition-colors
        \${isActive ? 'text-[#49b0f2] bg-blue-100' : 'hover:text-[#49b0f2]'}
        \${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        \${className}
      \`}
    >
      {iconElement}
      {labelElement}
    </button>
  );
};

        `
      }
    },
      },
}