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
            className={`p-1 rounded-md ${isMenuOpen ? 'bg-red-300' : 'bg-transparent'}`}
          >
            <HamburgerMenuIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Centro: Botón Regresar */}
        <div className="flex-1 flex justify-center">

        </div>

        {/* Derecha: Selector de mapa base */}
        <div className="hidden md:flex items-center justify-end gap-2">
          <LayerMapBaseOptions />
          <PersonCountButtonn name={'Demo person'} />
        </div>
      </div>
    </nav>
  );
}
