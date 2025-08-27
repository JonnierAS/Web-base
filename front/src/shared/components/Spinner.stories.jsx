import Spinner from './Spinner';

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
