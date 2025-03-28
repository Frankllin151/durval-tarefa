import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useDropzone } from 'react-dropzone';

const KnowBot = () => {
  const dadosIds = usePage().props.dados_ids; // Obtém os dados do backend
  const [values, setValues] = useState({
    id_user: dadosIds.id_User,
    id_bot: dadosIds.id_bot,
    files: [], // Lista de arquivos
  });

  const onDrop = (acceptedFiles) => {
    // Filtra apenas arquivos PDF e DOC/DOCX
    const filteredFiles = acceptedFiles.filter((file) =>
      ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
    );

    if (filteredFiles.length + values.files.length > 10) {
      alert('Você pode enviar no máximo 10 arquivos.');
      return;
    }

    setValues((prevValues) => ({
      ...prevValues,
      files: [...prevValues.files, ...filteredFiles], // Atualiza a lista de arquivos
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 10,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
if(values.files.length === 0){
  alert("Você precisa adicionar algum arquivo")
  return;
}
    // Faz a requisição usando o Inertia
    router.post('/dashboard/know-post', values, {
    onSuccess: () => {
     console.log(" Arquivos enviados com sucesso!");
     
      setValues({
        id_user: dadosIds.id_User,
        id_bot: dadosIds.id_bot,
        files: [], // Limpa os arquivos após o envio
      });
    },
    onError: (errors) => {
      console.error('Erro ao enviar os arquivos:', errors);
      alert('Erro ao enviar os arquivos.');
    },
  });
     
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Adicionar Conhecimento
        </h2>
      }
    >
      <Head title="Adicionar conhecimento" />
      <div className="py-6 px-8">
        <h1 className="text-2xl font-bold mb-4">Criar Memoria do Bot</h1>
        <p className="mb-4">Arraste e solte arquivos PDF ou DOC abaixo (máximo de 10 arquivos).</p>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-indigo-500"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">Arraste e solte seus arquivos aqui, ou clique para selecionar.</p>
        </div>

        {values.files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Arquivos selecionados:</h3>
            <ul className="list-disc list-inside">
              {values.files.map((file, index) => (
                <li key={index} className="text-gray-700">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Enviar Arquivos
        </button>
      </div>
    </AuthenticatedLayout>
  );
};

export default KnowBot;