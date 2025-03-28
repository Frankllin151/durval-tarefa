import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Prompt() {
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
  const [input, setInput] = useState(''); // Estado para o campo de entrada
const response = usePage().props;
console.log(response);

  const handleSendMessage = () => {
    if (input.trim() === '') return; // Não envia mensagens vazias

    // Adiciona a mensagem do usuário ao estado
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: input },
    ]);

    // Envia a mensagem para o backend
    router.post(
      '/dashboard/prompt',
      { message: input },
      {
        onSuccess: (page) => {
          const botResponse = page.props.response; // Resposta do backend
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: botResponse },
          ]);
        },
        onError: (errors) => {
          console.error('Erro ao enviar mensagem:', errors);
        },
      }
    );

    // Limpa o campo de entrada
    setInput('');
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Chat do Bot
        </h2>
      }
    >
      <Head title="Prompt" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="chat-container">
                {/* Área de mensagens */}
                <div className="messages h-64 overflow-y-auto border p-4 mb-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        message.sender === 'user'
                          ? 'text-right text-blue-600'
                          : 'text-left text-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block px-3 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-100'
                            : 'bg-gray-100'
                        }`}
                      >
                        {message.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Campo de entrada e botão */}
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 border rounded-l-lg p-2"
                    placeholder="Digite sua mensagem..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}