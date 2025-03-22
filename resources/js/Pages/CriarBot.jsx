import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
export default function CriarBot(){
  return(
  <AuthenticatedLayout
  header={
    <h2 className="text-xl font-semibold leading-tight text-gray-800">
      Criar Bot
    </h2>
}
  >

    <Head title="Criar Bot"/>
    <div className="py-12">
      <div className="flex justify-center items-center ">
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <InputLabel htmlFor="botName" value="Nome do bot"/>

        <TextInput 
        id="botName"
        type="text"
        className="mt-1 block w-full"
        placeholder="Digite o nome do bot"
        />

        <div className="mt-4">
          <PrimaryButton>Criar</PrimaryButton>
        </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
  )
}