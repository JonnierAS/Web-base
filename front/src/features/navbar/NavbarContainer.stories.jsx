// src/features/navbar/NavbarContainer.stories.jsx
import NavbarContainer from './NavbarContainer';
import { MemoryRouter } from 'react-router-dom';

// Wrapper que simula una página con fondo y espacio para el navbar
const NavbarWrapper = () => {
  return (
    <MemoryRouter initialEntries={['/map/test-id']}>
      <div style={{ height: '100vh', background: '#f7fafc', position: 'relative' }}>
        <NavbarContainer />
        <div style={{ paddingTop: '4rem', textAlign: 'center' }}>
          <p>Contenido de la página debajo del Navbar…</p>
        </div>
      </div>
    </MemoryRouter>
  );
};

export default {
  title: 'Features/navbar/NavbarContainer',
  component: NavbarContainer,
  tags: ['autodocs'],
  render: () => <NavbarWrapper />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const Basico = {
  parameters: {
    docs: {
      source: {
        code: `
import { useState } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import LayerMapBaseOptions from './components/BaselayerMap/LayerMapBaseOptions';
import PersonCountButtonn from './components/personCount/PersonCountButtonn';

export default function NavbarContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="bg-white w-full h-14 border-b border-gray-300 text-xs"
      style={{ position: 'absolute', zIndex: 998 }}
    >
      <div className="flex items-center justify-between h-full px-4">
        
        {/* Izquierda: Botón hamburguesa */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={\`p-1 rounded-md \${isMenuOpen ? 'bg-red-300' : 'bg-transparent'}\`}
          >
            <HamburgerMenuIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Centro: (vacío) */}
        <div className="flex-1 flex justify-center"></div>

        {/* Derecha: Selector de mapa base */}
        <div className="hidden md:flex items-center justify-end">
          <LayerMapBaseOptions />
          <PersonCountButtonn name={'Demo person'} />
        </div>
      </div>
    </nav>
  );
}
        `,
      },
    },
  },
};
