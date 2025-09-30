
import { BottomPanel } from '@/shared/layout/bottom/BottomPanel'
import { LeftPanel } from '@/shared/layout/left/LeftPanel'
import { RightPanel } from '@/shared/layout/right/RightPanel'
import { ExampleLayerItems } from './components/left/ExampleLayerItems'
import { ExampleBottom } from './components/bottom/ExampleBottom'
import QueryBuilderComponent  from '@/shared/components/QueryBuilderComponent'

export const Sidepanels = () => {
  const fieldsExample = [
  { name: "name", label: "Nombre", valueEditorType: "text" },
  { name: "age", label: "Edad", valueEditorType: "number" },
  {
    name: "status",
    label: "Estado",
    valueEditorType: "select",
    values: [
      { name: "Activo", value: "active" },
      { name: "Inactivo", value: "inactive" },
      { name: "Pendiente", value: "pending" },
    ],
  },
  { name: "city", label: "Ciudad", valueEditorType: "text" },
  { name: "createdAt", label: "Creado", valueEditorType: "date" },
  { name: "revenue", label: "Ingresos", valueEditorType: "number" },
];
  
    const handleApply = (query) => {
      alert('Query aplicado:\n' + JSON.stringify(query, null, 2));
    };
  
    const handleClear = () => {
    };
  return (
    <>
        <LeftPanel
        title="Capas y Leyenda"
        tabs={[
          { key: "layers", label: "Capas", content: <ExampleLayerItems /> },
        ]}
        footerButtons={[
          { label: "Añadir capa", onClick: () => console.log("añadir capa") },
          { label: "Limpiar", onClick: () => console.log("limpiar") },
        ]}
        />
        <RightPanel 
          title="Filtros"
          tabs={[
          { key: "filter", label: "", content: 
              <QueryBuilderComponent
                fields={fieldsExample}
                onApply={handleApply}
                onClear={handleClear}
              />},
        ]}
        />
        <BottomPanel 
          title="Tabla de datos"
          tabs={[
            { key: "layers", label: "", content: <ExampleBottom /> },
          ]}
          renderContent={()=>(
            <>
              <button className='border border-gray-300 p-1 rounded cursor-pointer'>
                  N Boton
                </button>
            </>

          )}
        
        />
    </>
  )
}
