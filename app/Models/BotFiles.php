<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BotFiles extends Model
{
    //
    protected $table = "bot_files";
    protected $fillable = ["user_id", "bot_id" , "caminho_arquivo" , "file_type"];
    
}