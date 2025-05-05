<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($request->only('email', 'password'), true)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales son incorrectas.'],
            ]);
        }

        $request->session()->regenerate();

        return response()->json(Auth::user());
    }
    
    public function logout(Request $request)
    {
        Auth::guard('web')->logout(); // Auth::logout no porque guard es de api
    
        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }
    
        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }
}
