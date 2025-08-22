// src/shared/components/SortableListContainer.stories.jsx
import React, { useState } from 'react';
import SortableListContainer from './SortableListContainer';

export default {
  title: 'Shared/Components/SortableListContainer',
  component: SortableListContainer,
  tags: ['autodocs'],
};

const mockData = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4'}
];

export const Default = () => {
  const [items, setItems] = useState(mockData);

  return (
      <SortableListContainer
        items={items}
        onOrderChange={(newOrder) => setItems(newOrder)}
        renderItem={(item) => (
          <div className="flex justify-between items-center p-2 border rounded mb-2 bg-gray-50 cursor-pointer">
            <span className="truncate">{item.id}</span>
            <div className="flex items-center gap-1">
                <button className="text-xs px-2 py-1 bg-blue-100 rounded hover:bg-blue-200 cursor-pointer">
                Acción
                </button>
            </div>
          </div>
        )}
      />
  );
};
