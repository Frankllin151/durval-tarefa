import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from "@/Components/PrimaryButton";
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {usePage, router} from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
const Bot = () => {
  const bot = usePage().props.bot;
  const user = usePage().props.auth.user;

 
  
  return (
   <AuthenticatedLayout
   header={
    <h2 className="text-xl font-semibold leading-tight text-gray-800">
    {bot.name}
    </h2>
}
   >
    <Head title={ "Bot:"+bot.name} />

    <div className="px-4 sm:px-6 lg:px-12">
  <div className="shadow-md rounded-md p-4 sm:p-6 bg-white mt-5">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h3 className="text-lg font-semibold">Informações do Bot</h3>
        <p className="text-sm sm:text-base text-gray-600">
          Atualize as informações e configurações do seu bot.
        </p>
      </div>
      <div className="mt-4 sm:mt-0">
        <PrimaryButton>Prompt</PrimaryButton>
      </div>
    </div>
    <div className="mt-5">
      <InputLabel>
        <p className="font-medium text-[16px] sm:text-[18px]">Nome do Bot:</p>
        <TextInput
          name="namebot"
          type="text"
          className="w-full mt-2"
          value={bot.name}
        />
      </InputLabel>
    </div>
    <div className="mt-5">
      <InputLabel>
        <p className="font-medium text-[16px] sm:text-[18px]">Identidade:</p>
        <TextArea
          rows={5}
          maxLength={500}
          className="w-full mt-2"
          value={bot.indetidade}
        />
      </InputLabel>
    </div>
    <div className='mt-5'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
        <div>
          <small>Próximo Passo: </small>
          <Link
           className="text-indigo-500 font-semibold"
           href={`/dashboard/knowbot/${user.id}/${bot.id}`}
          >Conhecimento do Bot</Link>
         
        </div>
        <div className='sm:mt-5 md:mt-5 lg:mt-0'>
          <PrimaryButton>Salvar</PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</div>

   </AuthenticatedLayout>
  );
};

export default Bot;