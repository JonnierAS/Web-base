// src/shared/layout/components/PanelFooterButtons.stories.jsx
import { PanelFooterButtons } from './PanelFooterButtons';

export default {
  title: 'Shared/Layout/components/PanelFooterButtons',
  component: PanelFooterButtons,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

const handleClick = (label) => () => alert(`Clic en botón: ${label}`);

export const Usabilidad = {
  args: {
    buttons: [
      { label: 'Añadir', onClick: handleClick('Añadir Capa') },
      { label: 'Limpiar', onClick: handleClick('Limpiar') },
    ],
  },
};


export const CodigoFuente = {
  component: PanelFooterButtons,
  args: {
    buttons: [
      { label: 'Añadir', onClick: handleClick('Añadir Capa') },
      { label: 'Limpiar', onClick: handleClick('Limpiar') },
    ],
  },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: `
          export const PanelFooterButtons = ({ buttons = [] }) => {
            if (!buttons.length) return null

            return (
              <div className="border-t border-gray-200 px-2 py-2 flex gap-2 ">
                {buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={btn.onClick}
                    className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded cursor-pointer h-full w-full"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )
          }
        `
      }
    }
  }
}
