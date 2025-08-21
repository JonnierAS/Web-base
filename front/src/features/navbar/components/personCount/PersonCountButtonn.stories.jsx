// src/shared/ui/PersonCountButtonn.stories.jsx
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PersonCountButtonn from './PersonCountButtonn';

// Simulación de ruta con :id
const WithRouter = ({ id = 'mapa123', name = 'Usuario Ejemplo' }) => {
  return (
    <MemoryRouter initialEntries={[`/map/${id}`]}>
      <Routes>
        <Route path="/map/:id" element={<PersonCountButtonn name={name} />} />
      </Routes>
    </MemoryRouter>
  );
};

export default {
  title: 'features/navbar/components/PersonCountButtonn',
  component: PersonCountButtonn,
  tags: ['autodocs'],
  render: (args) => <WithRouter {...args} />,
  args: {
    id: 'mapa123',
    name: 'Jhon Doe',
  },
  argTypes: {
    id: { control: 'text', description: 'ID del mapa en la URL' },
    name: { control: 'text', description: 'Nombre del usuario mostrado' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: `
            import { useState } from "react";
            import { useParams } from "react-router-dom";
            import { PersonIcon } from "@radix-ui/react-icons";
            import PersonCountHelper from "./helper/PersonCountHelper";

            export default function PersonCountButtonn({name}) {
                const [openCount, setOpenCount] = useState(false)
                const {hanldeNavigate} = PersonCountHelper()
                const {id: idMapa} = useParams()

            return (
                <button
                type="button"
                id="radix-:rn:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
                className="aria-expanded:bg-gray-200 cursor-pointer data-state-on:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none py-1 px-2 text-sm rounded inline-flex items-center gap-x-1 font-medium text-gray-700 outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-purple-500 hover:bg-gray-200 relative"
                onClick={() => setOpenCount(!openCount)}
                >
                <PersonIcon /> <span className="hidden md:block">{name}</span>
                {openCount && (
                    <>
                    <div className="fixed w-full h-full inset-0 z-40" />
                    <div className="absolute bg-white border border-gray-300 z-[1000] w-[180px] top-[40px] py-2 px-0 rounded text-black text-left right-0">
                        <div onClick={()=>hanldeNavigate(idMapa)} className="hover:bg-gray-200 w-full py-1 pl-3 pr-3 text-sm gap-x-2 font-normal">
                        Dashboard
                        </div>
                        <div className="border-t border-gray-100  my-1"></div>
                        <div
                        // onClick={() => logoutSession()}
                        className="hover:bg-gray-200 w-full py-1 pl-3 pr-3 text-sm gap-x-2 text-red-500"
                        >
                        Cerrar Sesión
                        </div>
                    </div>
                    </>
                )}
                </button>
            );
            }

        `,
      },
    },
  },
};

export const Basico = {};
