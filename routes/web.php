<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BotController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware("auth")->group(function (){
Route::get('/dashboard', [BotController::class, "dashBoard"])->name('dashboard');
Route::post("/dashboard/postcreatebot" , [BotController::class, "createBot"])->name("Postcreatebot");
Route::get("/dashboard/detalhesbot/{id_user}/{id}", [BotController::class, "botDetalhes"])->name("botdetalhes");
Route::get("/dashboard/knowbot/{id_user}/{id}", [BotController::class, "knowBotCreate"])->name("knowbot");
Route::post("/dashboard/know-post",[BotController::class,"KnowFilePDFDoc"])->name("KnowPost");
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';