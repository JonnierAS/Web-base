import React, { useState } from 'react'
import Table from '@/shared/components/Table'

export const ExampleBottom = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('activos');

  const data = Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    nombre: `Elemento ${i + 1}`,
    categoria: ['A', 'B', 'C'][i % 3],
    cantidad: Math.floor(Math.random() * 100),
  }));

  const tabs = [
    { key: 'activos', label: 'Activos' },
    { key: 'inactivos', label: 'Inactivos' },
  ];

  const handleCloseTab = (key) => {
    alert(`Cerrando tab: ${key}`);
  };

  const handleRowSelect = (selectedRows) => {
    console.log('Seleccionados:', selectedRows);
  };
  return (
   
    <Table
        tabs={tabs}
        activeTabKey={activeTab}
        onTabChange={setActiveTab}
        onCloseTab={handleCloseTab}
        data={data}
        columns={['id', 'nombre', 'categoria', 'cantidad']}
        currentPage={currentPage}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
        renderActions={(row) => (
            <div className='flex gap-2'>
            <button
                onClick={() => alert(`Ver ${row.nombre}`)}
                className="text-blue-600 text-sm cursor-pointer"
            >
                Boton
            </button>
            <button
                onClick={() => alert(`Ver ${row.nombre}`)}
                className="text-blue-600 text-sm cursor-pointer"
            >
                Boton2
            </button>
            </div>
        )}
        sortable={true}
        filterable={false}
        resizable={false}
        stickyHeader={true}
        selectable={true}
        exportable={true}
        onRowSelect={handleRowSelect}
      />
  )
}
