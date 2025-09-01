import React, { useState } from 'react';
import { FileUploadModal } from './FileUploadModal';
import { within, userEvent, expect } from '@storybook/test';

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

const render = (args) => {
  const [isVisible, setIsVisible] = useState(args.isVisible);

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
}

export const Default = {
  args: {
    title: 'Subir archivo CSV',
    accept: '.csv',
    isVisible: true,
  },
  render: render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Modal is initially open
    await expect(canvas.getByText('Subir archivo CSV')).toBeInTheDocument();

    // Close modal
    const cancelButton = await canvas.getByRole('button', { name: /Cancelar/i });
    await userEvent.click(cancelButton);
    await expect(canvas.queryByText('Subir archivo CSV')).not.toBeInTheDocument();

    // Reopen modal
    const openButton = await canvas.getByRole('button', { name: /Abrir modal/i });
    await userEvent.click(openButton);
    await expect(canvas.getByText('Subir archivo CSV')).toBeInTheDocument();

    // Check for file input
    const fileInput = await canvas.getByLabelText(/Seleccioná o arrastrá el archivo acá/i);
    await expect(fileInput).toBeInTheDocument();
  },
};

export const CustomMaxSize = {
  args: {
    title: 'Subir archivo de hasta 2MB',
    accept: '.csv, .xlsx',
    maxFileSize: 2 * 1024 * 1024, // 2MB
    isVisible: true,
  },
  render: render,
};

export const CustomFileTypes = {
  args: {
    title: 'Subir archivo Geo (SHP/KML)',
    accept: '.shp, .kml',
    isVisible: true,
  },
  render: render,
};


export const UseCodigo={
    component: FileUploadModal,
        parameters: {
        layout: 'padded',
        docs: {
          source: {code:`
                <FileUploadModal
                    isVisible={true}
                    onClose={() => {}}
                    onSubmit={() => {}}
                    title="Subir archivo"
                    accept=".csv"
                    maxFileSize={5 * 1024 * 1024}
                />
            `},
        },
      },
}