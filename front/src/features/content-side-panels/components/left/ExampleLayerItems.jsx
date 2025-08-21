import { useState } from "react";
import SortableListContainer from "@/shared/components/SortableListContainer";
import { LabelIcon } from "@/shared/assets/svg/LabelIcon";
import { Crosshair1Icon, EyeOpenIcon } from "@radix-ui/react-icons";
const mockData = [
  { id: '1', label: 'Capa: Zonas Urbanasasdadaaaaaaaaaaaaaaaaa' },
  { id: '2', label: 'Capa: Calles Principales' },
  { id: '3', label: 'Capa: Áreas Verdes' },
  { id: '4', label: 'Capa: Instituciones' },
];

export const ExampleLayerItems = () => {
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
};