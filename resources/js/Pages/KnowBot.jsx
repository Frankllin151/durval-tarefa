import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const KnowBot = () => {
  const page = usePage();
  console.log('usePage data:', page);

  return (
   <AuthenticatedLayout
   header={
    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                   Adicionar Conhecimento
                </h2>
   }
   >
    <Head title='Adicionar conhecimento'/>
     <div>
      <h1>KnowBot Page</h1>
      <p>Check the console to see the data returned by usePage.</p>
    </div>
   </AuthenticatedLayout>
  );
};

export default KnowBot;