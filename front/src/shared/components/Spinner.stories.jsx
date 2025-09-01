import Spinner from './Spinner';
import { within, expect } from '@storybook/test';

export default {
  title: 'shared/Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
        backgroundColor: '#f9fafb',
      }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del spinner (small / medium / large)'
    },
    message: { 
        control: 'text', 
        description: 'Mensaje del spinner' 
    },
    border: { 
        control: 'object', 
        description: 'Borde del spinner' 
    },

    className: { 
        control: 'text',
        description: 'Estilo tailwindcss personalizado para el spinner'
     },
  },
  parameter:{
    layout: 'padded',
  }
};

const Template = (args) => <Spinner {...args} />;



export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  message: 'Cargando...',
  border: [
    { side: 'top', color: '#42a5f5', size: 'medium', style: 'solid' },
  ],
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const messageElement = await canvas.findByText('Cargando...');
  await expect(messageElement).toBeInTheDocument();
};

export const AllSides = Template.bind({});
AllSides.args = {
  size: 'large',
  message: 'Procesando...',
  border: [
    { side: 'all', color: '#42a5f5', size: 'large', style: 'dashed' },
  ],
};

export const CustomBorders = Template.bind({});
CustomBorders.args = {
  size: 'medium',
  border: [
    { side: 'top', color: '#42a5f5', size: 'small', style: 'solid' },
    { side: 'bottom', color: '#a855f7', size: 'medium', style: 'dotted' },
    { side: 'left', color: '#42a5f5', size: 'large', style: 'solid' },
  ],
};

export const SmallWithMessage = Template.bind({});
SmallWithMessage.args = {
  size: 'small',
  message: 'Guardando...',
  border: [
    { side: 'right', color: '#a855f7', size: 'medium', style: 'solid' },
  ],
};

export const NoMessage = Template.bind({});
NoMessage.args = {
  size: 'medium',
  border: [
    { side: 'all', color: '#a855f7', size: 'medium', style: 'dotted' },
  ],
};


export const CodigoFuente={
    component: Spinner,
        parameters: {
        layout: 'padded',
        docs: {
          source:{
        code:`
            
import React from 'react';

const sizeMap = {
  small: 20,
  medium: 40,
  large: 60,
};

const borderSizeMap = {
  small: '2px',
  medium: '4px',
  large: '6px',
};

function Spinner({
  size = 'medium',
  border = [{ side: 'all', color: '#3b82f6', size: 'medium', style: 'solid' }],
  message = '',
  className = '',
}) {
  const sizePx = sizeMap[size] || 40;

  const generateBorderStyle = () => {
    const styles = {};

    border.forEach(({ side, color = '#3b82f6', size = 'medium', style = 'solid' }) => {
      const borderValue = \`\${borderSizeMap[size] || '4px'} \${style} \${color}\`;

      switch (side) {
        case 'all':
          styles.border = borderValue;
          break;
        case 'top':
          styles.borderTop = borderValue;
          break;
        case 'right':
          styles.borderRight = borderValue;
          break;
        case 'bottom':
          styles.borderBottom = borderValue;
          break;
        case 'left':
          styles.borderLeft = borderValue;
          break;
        case 'horizontal':
          styles.borderLeft = borderValue;
          styles.borderRight = borderValue;
          break;
        case 'vertical':
          styles.borderTop = borderValue;
          styles.borderBottom = borderValue;
          break;
        default:
          break;
      }
    });

    return styles;
  };

  return (
    <div className={\`flex items-center gap-2 \${className}\`}>
      <div
        className="rounded-full animate-spin box-border"
        style={{
          width: sizePx,
          height: sizePx,
          ...generateBorderStyle(),
        }}
      />
      {message && <span className="text-gray-700 text-sm">{message}</span>}
    </div>
  );
}

export default Spinner;

        `
      }
    },
      },
}