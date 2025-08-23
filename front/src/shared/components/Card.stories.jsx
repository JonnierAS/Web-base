import { Card } from './Card';

export default {
  title: 'Shared/components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    title: 'Resumen',
    children: <p>Este es un resumen rápido del estado actual del sistema. Puedes personalizar el contenido aquí según lo que necesites mostrar.</p>,
    height: '250',
    width: '350',
    position: 'top-left',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título que aparece en la parte superior de la tarjeta',
    },
    children: {
      control: 'text',
      description: 'Contenido interno de la tarjeta',
    },
    height:{
      control: 'number',
      description: 'Clase estilo para el alto (ej. 350, 250)',
    },
    width: {
      control: 'number',
      description: 'Clase estilo para el ancho (ej. 350, 250)',
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center-left', 'center-right'],
      description: 'Ubicación de la tarjeta en pantalla',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `
        export function Card({ title, children, height = '250', width = '350', position = 'top-left' }) {
        const positionMap = {
            'top-left': 'top-[57px] left-5',
            'top-right': 'top-[57px] right-5',
            'bottom-left': 'bottom-[12px] left-5',
            'bottom-right': 'bottom-[12px] right-5',
            'center-left': 'top-[40%]  left-5',
            'center-right': 'top-[40%] right-5'
        };

        const resolvedPosition = positionMap[position] || positionMap['top-left'];

        return (
            <div style={{ width: \`\${width}px\`, height: \`\${height}px\`, overflowY: 'auto', scrollbarWidth: 'thin' }} className={\`absolute 
            \${resolvedPosition} rounded border border-gray-200 bg-white px-2 pb-2 shadow-sm z-[800]
            \`}>
            <h3 className="text-sm font-medium text-gray-700 mb-2 py-1 sticky top-0 bg-white w-full z-[800]">{title}</h3>
            <div>{children}</div>
            </div>
        );
        }

        
        `,
      },
    },
  },
};

export const Basico = (args) => (
  <div className="relative w-full h-screen bg-gray-50">
    <Card {...args} />
  </div>
);

export const UsoDeCard = {
    component: Card,
    parameters: {
    layout: 'padded',
    docs: {
      source: {code:`
            <Card
                title="Resumen General"
                position="top-right"
                height="350"
                width="350"
            >
                <p className="text-sm text-gray-600">
                Este es un resumen rápido del estado actual del sistema. Puedes personalizar el contenido aquí según lo que necesites mostrar.
                </p>
            </Card>
        `},
    },
  },
}

