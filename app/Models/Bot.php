<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    //
    protected $table = "bots";
    protected $fillable  = ["user_id" , "name" , "indetidade" , "status"];
}