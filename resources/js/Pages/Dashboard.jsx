import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , Link, usePage  } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import CreateBot from '@/Components/CreateBot';
import { useState } from "react";
export default function Dashboard() {
const [ModalCreateBot, SetModalCreateBot] = useState(false);
 const bots = usePage().props.bots;
 const user = usePage().props.auth.user;

 
 
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Painel
                </h2>
            }
        >
            <Head title="Painel" />

            <div className="py-12">
   <div className=' px-8'>
   
   </div>
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <CreateBot ModalCreateBot={ModalCreateBot} SetModalCreateBot={SetModalCreateBot}  />

    {bots.length === 0 ? (
        <div className="mt-6 text-center text-gray-500">
            Você ainda não tem nenhum bot.
            <div onClick={() => SetModalCreateBot(true)} className='cursor-pointer text-indigo-500 font-semibold'>Faça um bot</div>
        </div>
    ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bots.map((bot) => (
                <div
                    key={bot.id}
                    className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 text-gray-900 flex items-center justify-between"
                >
                    <span>{bot.name}</span>
                    <Link
                    href={`/dashboard/detalhesbot/${user.id}/${bot.id}`}
                    className='inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900'
                    >Detalhes</Link>
                </div>
            ))}
        </div>
    )}
    </div>
</div>
        </AuthenticatedLayout>
    );
}
