<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OficinaController;
use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/oficina', OficinaController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/documento', DocumentoController::class);
    Route::apiResource('/history', HistoryController::class);
    // Route::apiResource('/history', HistoryController::class);
    Route::post('/registro', [AuthController::class, 'register']);
});


// Autenticacion

Route::post('/login', [AuthController::class, 'login']);
Route::post('/solicitud', [DocumentoController::class, 'upload']);
Route::get('/consulta/{code}', [DocumentoController::class, 'consulta']);
Route::get('/download/{docName}', [DocumentoController::class, 'download']);
// Route::post('/login', [AuthController::class, 'login']);
