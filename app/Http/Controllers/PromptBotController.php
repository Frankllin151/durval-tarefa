<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use OpenAI;
use OpenAI\Client; 
class PromptBotController extends Controller
{
    //

    public function promPt($idUser, $idbot)
    {
        // Verifica se o usuário logado é o mesmo do parâmetro
        if (Auth::id() !== (int) $idUser) {
            return response()->json(["error" => "Usuário não autorizado"], 403);
        }
    
        $dado_ids = [
            "id_user" => $idUser,
            "id_bot" => $idbot,
        ];
    
        return Inertia::render("Prompt", ["dados_ids" => $dado_ids]);
    }

    public function returnoPrompt(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = $request->input('message');

        // Integração com a API do ChatGPT
        $apiOpenIa = config("services.api_openia");
        $client = OpenAI::client($apiOpenIa["key"]); // Certifique-se de configurar sua chave no .env
        $response = $client->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'Você é um assistente útil.'],
                ['role' => 'user', 'content' => $userMessage],
            ],
        ]);

        $botResponse = $response['choices'][0]['message']['content'];

        return response()->json(['response' => $botResponse]);
    }
}