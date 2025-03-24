<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Bot;
use Inertia\Inertia;
use OpenAI;
use OpenAI\Client; 

class BotController extends Controller
{
    //
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
  dd($bot);
 }
}