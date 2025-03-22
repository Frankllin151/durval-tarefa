<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BotController extends Controller
{
    //
    public function Createbot()
    {
        return Inertia::render("CriarBot");
    }
}