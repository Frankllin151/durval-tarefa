import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import CreateBot from '@/Components/CreateBot';
export default function Dashboard() {
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
    <CreateBot/>

        <div className="mt-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 text-gray-900 flex items-center justify-between">
                <span>You're logged in!</span>
                <PrimaryButton>Edit</PrimaryButton>
            </div>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 text-gray-900 flex items-center justify-between">
                <span>Another content</span>
                <PrimaryButton>Edit</PrimaryButton>
            </div>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 text-gray-900 flex items-center justify-between">
                <span>More content</span>
                <PrimaryButton>Edit</PrimaryButton>
            </div>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 text-gray-900 flex items-center justify-between">
                <span>Final content</span>
                <PrimaryButton>Edit</PrimaryButton>
            </div>
        </div>
    </div>
</div>
        </AuthenticatedLayout>
    );
}
