import { AccordionPanel } from './AccordionPanel';

export default {
  title: 'Shared/components/AccordionPanel',
  component: AccordionPanel,
  tags: ['autodocs'],
  args: {
    title: 'Estilo base',
    defaultOpen: false,
    children: (
      <div>
        <p>Color de Línea:</p>
        <input type="text" className="border p-1 rounded w-full mb-2" defaultValue="#000" />
        <p>Desenfoque:</p>
        <input type="number" className="border p-1 rounded w-full mb-2" defaultValue={0} />
        <p>Ancho de Línea:</p>
        <input type="number" className="border p-1 rounded w-full mb-2" defaultValue={3} />
        <p>Zoom Mínimo:</p>
        <input type="number" className="border p-1 rounded w-full" defaultValue={0} />
      </div>
    ),
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del panel',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Indica si el panel debe estar abierto por defecto',
    },
    children: {
      control: false,
      description: 'Contenido del panel',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      source: {code:`
           import { useState } from 'react';
           import { ChevronDownIcon } from '@radix-ui/react-icons';
           
           export function AccordionPanel({ title, children, defaultOpen = false }) {
             const [open, setOpen] = useState(defaultOpen);
           
             return (
               <div className="border border-gray-200 rounded-md overflow-hidden mb-2">
                 <button
                   onClick={() => setOpen(!open)}
                   className={\`w-full flex items-center justify-between px-4 py-2 text-left font-semibold text-sm 
                   \${
                     open ? 'bg-white' : 'bg-gray-100'
                   }\`}
                 >
                   <span>{title}</span>
                   <ChevronDownIcon
                     className={\`transition-transform duration-200 \${
                       open ? 'rotate-180' : ''
                     }\`}
                   />
                 </button>
                 {open && <div className="p-4 text-sm">{children}</div>}
               </div>
             );
           }
           
        `},
    },
  },
};

export const Basico = {};

export const UsoDeAccordionPanel = {
    component: AccordionPanel,
    parameters: {
    layout: 'padded',
    docs: {
      source: {code:`
           <AccordionPanel title="Estilo base">
            <div>
                <p>Color de línea:</p>
                <input type="text" value="#000" className="border p-1 rounded w-full" />
                <p>Desenfoque:</p>
                <input type="number" value="0" className="border p-1 rounded w-full" />
            </div>
            </AccordionPanel>
        `},
    },
  },
}