<?php

namespace App\Http\Controllers;

use App\Http\Resources\OficinaCollection;
use App\Models\Oficina;
use Illuminate\Http\Request;

class OficinaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new OficinaCollection(Oficina::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $oficina = Oficina::create([
            'nombre' => $request->officeName

        ]);


        return [

            'oficina' =>  $oficina

        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Oficina $oficina)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Oficina $oficina)
    {
        //

        $oficina->nombre = $request->officeName;
        $oficina->save();
        return [
            'message' => 'Se guardo correctamente',
            'oficina' => $oficina
        ];
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Oficina $oficina)
    {
        //
    }
}
