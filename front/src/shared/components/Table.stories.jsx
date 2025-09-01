import Table from './Table';
import { within, expect } from '@storybook/test';

const sampleData = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  nombre: `Elemento ${i + 1}`,
  categoria: ['A', 'B', 'C'][i % 3],
  cantidad: Math.floor(Math.random() * 100),
}));

export default {
  title: 'shared/Components/Table',
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { key: 'tab1', label: 'Activos' },
    { key: 'tab2', label: 'Inactivos' },
  ],
  activeTabKey: 'tab1',
  onTabChange: (key) => console.log('Cambiar tab:', key),
  onCloseTab: (key) => console.log('Cerrar tab:', key),
  data: sampleData,
  columns: ['id', 'nombre', 'categoria', 'cantidad'],
  currentPage: 1,
  itemsPerPage: 10,
  onPageChange: (page) => console.log('Cambiar página:', page),
  renderActions: (row) => (
    <button
      className="text-blue-500 text-xs underline"
      onClick={() => alert(`Ver ${row.nombre}`)}
    >
      Ver
    </button>
  ),
  sortable: true,
  filterable: true,
  resizable: true,
  stickyHeader: true,
  selectable: true,
  exportable: true,
  onRowSelect: (rows) => console.log('Filas seleccionadas:', rows),
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // Check for headers
  await expect(canvas.getByText('id')).toBeInTheDocument();
  await expect(canvas.getByText('nombre')).toBeInTheDocument();
  await expect(canvas.getByText('categoria')).toBeInTheDocument();
  await expect(canvas.getByText('cantidad')).toBeInTheDocument();

  // Check for first row of data
  await expect(canvas.getByText('Elemento 1')).toBeInTheDocument();
};


export const UsoCodigo={
    component: Table,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
                import { useState } from 'react';
import Table from './components/Table';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('activos');

  const data = Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    nombre: \`Elemento \${i + 1}\`,
    categoria: ['A', 'B', 'C'][i % 3],
    cantidad: Math.floor(Math.random() * 100),
  }));

  const tabs = [
    { key: 'activos', label: 'Activos' },
    { key: 'inactivos', label: 'Inactivos' },
  ];

  const handleCloseTab = (key) => {
    alert(\`Cerrando tab: \${key}\`);
  };

  const handleRowSelect = (selectedRows) => {
    console.log('Seleccionados:', selectedRows);
  };

  return (
    <div className="p-6 h-[90vh]">
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
          <button
            onClick={() => alert(\`Ver \${row.nombre}\`)}
            className="text-blue-600 underline text-sm"
          >
            Ver
          </button>
        )}
        // ✅ Funcionalidades activadas
        sortable={true}
        filterable={true}
        resizable={true}
        stickyHeader={true}
        selectable={true}
        exportable={true}
        onRowSelect={handleRowSelect}
      />
    </div>
  );
};

export default App;

            `},
        },
      },
}


export const CodigoFuente={
    component: Table,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
import React, { useState, useMemo } from 'react';

const Table = ({
  tabs = [],
  activeTabKey,
  onTabChange,
  onCloseTab,
  data = [],
  columns = [],
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
  renderActions,
  sortable = false,
  filterable = false,
  resizable = false,
  stickyHeader = false,
  selectable = false,
  onRowSelect,
  exportable = false,
}) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (col) => {
    if (!sortable) return;
    setSortConfig((prev) =>
      prev?.key === col
        ? { ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key: col, direction: 'asc' }
    );
  };

  const handleFilter = (col, value) => {
    setFilters((prev) => ({ ...prev, [col]: value }));
  };

  const handleRowSelect = (row) => {
    const exists = selectedRows.includes(row);
    const updated = exists
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  const handleExport = () => {
    const headers = columns.join(',');
    const rows = data.map((row) =>
      columns.map((col) => \`"\${row[col]}"\`).join(',')
    );
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.csv';
    link.click();
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) =>
        !filters[col]
          ? true
          : String(row[col])
              .toLowerCase()
              .includes(filters[col].toLowerCase())
      )
    );
  }, [data, filters, columns]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const { key, direction } = sortConfig;
    return [...filteredData].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      return direction === 'asc'
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const visibleData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col h-full border border-gray-300">
      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="flex border-b border-gray-300 text-sm justify-between">
          <div className='flex'>
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onTabChange(key)}
                className={\`px-2 py-1 flex gap-1 items-center cursor-pointer \${
                  activeTabKey === key
                    ? 'bg-[#0079c1] text-white'
                    : 'bg-white text-gray-700 border-r border-gray-300'
                }\`}
              >
                {label}
                <span
                  className="ml-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(key);
                  }}
                >
                  ✕
                </span>
              </button>
            ))}
          </div>

            {/* Export */}
            {exportable && (
              <div className="p-2 text-right">
                <button
                  className="px-2 py-1 bg-[#0079c1] hover:bg-[#026096] text-white text-xs rounded cursor-pointer"
                  onClick={handleExport}
                >
                  Exportar CSV
                </button>
              </div>
            )}
        </div>
      )}


      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="min-w-full border-collapse text-sm">
          <thead
            className={\`bg-gray-100 \${
              stickyHeader ? 'sticky top-0 z-10' : ''
            }\`}
          >
            <tr>
              {selectable && <th className="px-2 py-1">✔</th>}
              {renderActions && <th className="px-2 py-1">Acción</th>}
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className={\`px-2 py-1 text-left text-xs uppercase text-gray-600 \${
                    resizable ? 'resize-x overflow-hidden' : ''
                  }\`}
                  style={{ minWidth: 120 }}
                >
                  {col}
                  {sortable && sortConfig?.key === col && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                  {filterable && (
                    <input
                      type="text"
                      onChange={(e) => handleFilter(col, e.target.value)}
                      className="mt-1 block w-full px-1 focus:outline-none focus:border-[#42a5f5] text-xs border border-gray-300 rounded"
                      placeholder="Filtrar"
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, i) => (
              <tr key={i} className="border-t border-gray-200">
                {selectable && (
                  <td className="px-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelect(row)}
                    />
                  </td>
                )}
                {renderActions && (
                  <td className="px-2 py-1">{renderActions(row)}</td>
                )}
                {columns.map((col) => (
                  <td key={col} className="px-2 py-1">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 text-xs text-gray-700 px-2 py-1 border-t border-gray-400">
        <span>
          Mostrando {(currentPage - 1) * itemsPerPage + 1} -{' '}
          {Math.min(currentPage * itemsPerPage, sortedData.length)} de{' '}
          {sortedData.length}
        </span>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          |&lt;
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;|
        </button>
      </div>
    </div>
  );
};

export default Table;

            `},
        },
      },
}
