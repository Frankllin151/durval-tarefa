<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Bot;
use App\Models\BotFiles;
use Inertia\Inertia;
use OpenAI;
use OpenAI\Client; 

class BotController extends Controller
{
    //
    public function dashBoard()
  {
    $user = Auth::user();
    $bots = Bot::where("user_id", $user->id)->get();

    return Inertia::render('Dashboard' , ["bots" => $bots]); 
  }
    public function createBot(Request $request)
    {
   $apiOpenIa = config("services.api_openia");
   $client  = OpenAI::client($apiOpenIa["key"]);
   $result = $client->chat()->create([
   "model" => "gpt-4", 
   "messages" => [
    ["role" => "user" , "content" => "gere um nome baseado nisso com 10 letras:" . $request->input("indetidade")]
   ]
   ]);
  $nomeDoBot = $result->choices[0]->message->content;
  $user_id = Auth::user();
   $botDados = [
    "name" => $nomeDoBot, 
    "indetidade" => $request->input("indetidade"),
    "user_id" => $user_id->id
   ];
$idbot = $this->InsertBotMysql($botDados);
return redirect()->route("botdetalhes", ["id_user" => $user_id->id , "id" => $idbot]);
    }
 private function InsertBotMysql($botDados)
 {
 $bot = Bot::create([
    "user_id" =>  $botDados["user_id"], 
    "indetidade" => $botDados["indetidade"], 
    "name" => $botDados["name"] 
  ]);
 return $bot->id;

 }

 public function botDetalhes($iduser, $id)
 {
  $bot = Bot::where("id" , $id)->where("user_id", $iduser)->first();

  if(!$bot){
    return response()->json(['error' => 'Bot não encontrado'], 404);
  }

  return Inertia::render("Bot", ["bot" => $bot]);
 }

 public function knowBotCreate($idUser, $idbot)
 {
  // Verifica se o usuário logado é o mesmo do parâmetro
  if (Auth::id() !== (int) $idUser) {
    return response()->json(["error" => "Usuário não autorizado"], 403);
}

// Verifica se o bot pertence ao usuário
$bot = Bot::where('id', $idbot)
    ->where('user_id', $idUser)
    ->first();

if (!$bot) {
    return response()->json(["error" => "Bot não encontrado ou não pertence ao usuário"], 404);
}
  $dados = [
 "id_User" => $idUser, 
 "id_bot" => $idbot
  ];

  return Inertia::render("KnowBot", ["dados_ids" => $dados]);
 }
 public function KnowFilePDFDoc(Request $request)
 {
 $request->validate([
 'id_user' => 'required|exists:users,id', 
 'id_bot' => 'required|exists:bots,id',  
 'files' => 'required|array',
  'files.*' => 'file|mimes:pdf,doc,docx|max:102400',
 ]);
 $uploadPath = public_path("uploads");
 foreach ($request->file('files') as $file) {
  // Gera um nome único para o arquivo
  $uniqueFileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

  // Move o arquivo para a pasta uploads
  $file->move($uploadPath, $uniqueFileName);

  // Identifica o tipo de arquivo
  $fileType = $file->getClientOriginalExtension();

  // Salva os dados na tabela bot_files
  BotFiles::create([
    'user_id' => $request->input('id_user'),
    'bot_id' => $request->input('id_bot'),
    'caminho_arquivo' => 'uploads/' . $uniqueFileName,
    'file_type' => $fileType,
]);
} 
 return redirect()->route("botdetalhes",  ["id_user" =>$request->input('id_user'), "id" => $request->input('id_bot')]);
 }
}