import React, { useState } from 'react';
import { FileUploadModal } from './FileUploadModal';

export default {
  title: 'Shared/Components/FileUploadModal',
  component: FileUploadModal,
  decorators: [
    (Story) => (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes:{
    title:{
        control: 'text',
        description: 'Título del modal',
        defaultValue: 'Subir archivo'
    },
    accept:{
        control: 'text',
        description: 'Tipo de archivos aceptados',
        defaultValue: '.csv'
    },
    maxFileSize:{
        control: 'number',
        description: 'Tamaño máximo del archivo en bytes',
        defaultValue: 5 * 1024 * 1024 // 5MB
    },
    onClose:{
        action: 'Cerrar',
        description: 'Acción al cerrar el modal',
    },
    onSubmit:{
        action: 'Enviar',
        description: 'Acción al enviar el archivo',
    },
    isVisible:{
        control: 'boolean',
        description: 'Estado del modal',
        defaultValue: true
    },
    
  }
};

const Template = (args) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => setIsVisible(false);

  const handleSubmit = (file) => {
    alert(`Archivo subido: ${file.name}`);
    setIsVisible(false);
  };

  return (
    <>
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Abrir modal
        </button>
      )}
      <FileUploadModal {...args} isVisible={isVisible} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Subir archivo CSV',
  accept: '.csv',
};

export const CustomMaxSize = Template.bind({});
CustomMaxSize.args = {
  title: 'Subir archivo de hasta 2MB',
  accept: '.csv, .xlsx',
  maxFileSize: 2 * 1024 * 1024, // 2MB
};

export const CustomFileTypes = Template.bind({});
CustomFileTypes.args = {
  title: 'Subir archivo Geo (SHP/KML)',
  accept: '.shp, .kml',
};
