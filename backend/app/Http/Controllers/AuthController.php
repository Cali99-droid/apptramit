<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistroRequest;
use App\Http\Resources\OficinaCollection;
use App\Models\Oficina;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function register(RegistroRequest $request)
    {
        // Validar el registro
        $data = $request->validated();

        // Crear el usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'oficina_id' => $data['office'],

        ]);


        // Retornar una respuesta
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user,
            'status' => $data
        ];
    }

    public function login(LoginRequest $request)
    {

        $data = $request->validated();

        // // Revisar el password
        if (!Auth::attempt($data)) {
            return response([
                'errors' => ['El email o el password son incorrectos']
            ], 422);
        }

        // Autenticar al usuario
        $user = Auth::user();
        if ($user->status === 0) {
            return response([
                'errors' => ['Usuario no activo']
            ], 422);
        }
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return [
            'user' => null
        ];
    }

    public function getUser(Request $request)
    {
        $user =  $request->user();
        $oficina = Oficina::where('id', '=', $user->oficina_id)->first();
        return [
            'user' => $user,
            'oficina' =>  $oficina
        ];
    }
}
