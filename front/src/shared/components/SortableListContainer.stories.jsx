// src/shared/components/SortableListContainer.stories.jsx
import React, { useState } from 'react';
import SortableListContainer from './SortableListContainer';
import { parameters } from '../../../.storybook/preview';

export default {
  title: 'Shared/Components/SortableListContainer',
  component: SortableListContainer,
  tags: ['autodocs'],
  parameters:{
    layout: 'padded',
    docs:{
      source:{
        type: 'code',
        code: `
          // src/shared/components/SortableListContainer.jsx
          import {
            DndContext,
            closestCenter,
            KeyboardSensor,
            PointerSensor,
            useSensor,
            useSensors,
          } from '@dnd-kit/core';
          import {
            SortableContext,
            verticalListSortingStrategy,
            arrayMove,
            useSortable,
          } from '@dnd-kit/sortable';
          import { CSS } from '@dnd-kit/utilities';
          import { useEffect, useState } from 'react';
          
          export const SortableItemWrapper = ({ id, children }) => {
            const {
              attributes,
              listeners,
              setNodeRef,
              transform,
              transition,
              isDragging,
            } = useSortable({ id });
          
            const style = {
              transform: CSS.Transform.toString(transform),
              transition,
              zIndex: isDragging ? 999 : 'auto',
              opacity: isDragging ? 0.5 : 1,
            };
          
            return (
              <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {children}
              </div>
            );
          };
          
          export default function SortableListContainer({
            items = [],
            onOrderChange,
            renderItem,
          }) {
            const sensors = useSensors(
              useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
              useSensor(KeyboardSensor)
            );
          
            const [orderedItems, setOrderedItems] = useState(items);
          
            useEffect(() => {
              setOrderedItems(items);
            }, [items]);
          
            const handleDragEnd = (event) => {
              const { active, over } = event;
          
              if (active.id !== over?.id) {
                const oldIndex = orderedItems.findIndex((i) => i.id === active.id);
                const newIndex = orderedItems.findIndex((i) => i.id === over.id);
                const newOrder = arrayMove(orderedItems, oldIndex, newIndex);
          
                setOrderedItems(newOrder);
                onOrderChange?.(newOrder);
              }
            };
          
            return (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={orderedItems.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                  {orderedItems.map((item) => (
                    <SortableItemWrapper key={item.id} id={item.id}>
                      {renderItem(item)}
                    </SortableItemWrapper>
                  ))}
                </SortableContext>
              </DndContext>
            );
          }
          
        `
      }
    }
  }
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


export const UsoCodigo={
    component: SortableListContainer,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
                const [items, setItems] = useState(mockData);
                
                  return (
                    <div className="w-full">
                      <SortableListContainer
                        items={items}
                        onOrderChange={(newOrder) => setItems(newOrder)}
                        renderItem={(item) => (
                          <div className="flex justify-between items-center p-2 border border-gray-200 bg-gray-50 cursor-pointer">
                            <span className="truncate">{item.label}</span>
                            <div className="flex items-center gap-1">
                                <button className="text-xs p-1 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                                <LabelIcon />
                                </button>
                
                                <button className="text-xs p-1 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                                <Crosshair1Icon />
                                </button>
                                
                                <button className="text-xs p-1 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                                <EyeOpenIcon />
                                </button>
                            </div>
                            
                          </div>
                        )}
                      />
                    </div>
                  );
            `},
        },
      },
}
