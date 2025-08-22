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
