import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from "./TextArea";
import { router } from "@inertiajs/react";
export default function CreateBot({ModalCreateBot, SetModalCreateBot})
{

const [NameBotValue , SetNameBotValue] = useState("");

const handleModalOpen = () =>{
 SetModalCreateBot(true)
}
const handleChatBot = (e) =>{
const value = e.target.value;

SetNameBotValue(value)
}

const submitHandleCriarBot = (e) =>{
  e.preventDefault();
  router.post("/dashboard/postcreatebot" ,{indetidade:NameBotValue});
  SetModalCreateBot(false);
}
  return (
    <>
    <div className="bg-white p-2 rounded-md">
        <div className="flex justify-between items-center flex-col sm:flex-row">
            <h6 className="text-lg font-medium text-gray-800">Seus bots</h6>
            <PrimaryButton className="mt-2 sm:mt-0"
            onClick={handleModalOpen}
            >Criar Bot</PrimaryButton>
        </div>
    </div>
    <Modal show={ModalCreateBot} onClose={() => SetModalCreateBot(false)}>
   <form onSubmit={submitHandleCriarBot}>
   <div className="p-6 sm:p-8 bg-white rounded-md max-w-lg mx-auto">
        <p className="text-gray-700 text-sm sm:text-base mb-4">
            Após criar seu Bot, você poderá adicionar conhecimento e treiná-lo.
        </p>
        <TextArea
            className="w-full resize-none"
            rows={5}
            name="namebot"
            maxLength={500}
            onChange={handleChatBot}
            placeholder="Por exemplo, &quot;crie um chatbot que gere conteúdo otimizado para SEO&quot; ou &quot;crie um chatbot que responda perguntas "
        />
        <div className="mt-4 flex justify-end">
            <PrimaryButton>
               Criar
            </PrimaryButton>
        </div>
    </div>
   </form>
</Modal>
    </>
  )
}