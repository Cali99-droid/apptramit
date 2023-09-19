<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use Illuminate\Http\Request;

class DocumentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // $documento = new Documento();
        // $documento->tipo_persona = $request->values['personaType'];
        // $documento->dni = $request->values['dni'];
        // $documento->nombre_interesado = $request->values['name'];
        // $documento->telefono = $request->values['telefono'];
        // $documento->email = $request->values['email'];
        // $documento->direccion = $request->values['direccion'];
        // $documento->nombre_documento = $request->values['documentName'];
        // $documento->folios = $request->values['folio'];
        // $documento->asunto = $request->values['asunto'];
        // $documento->estado_id = 1;
        // $pdfFile = $request->values['pdfFile'];
        // // Generar un nombre único para el archivo
        // $uniqueName = time() . '_' . $pdfFile->getClientOriginalName();

        // // Guardar el archivo en el directorio de almacenamiento
        // $pdfFile->storeAs('pdfs', $uniqueName);
        //guradar documento
        //guardar historial



        // $documento->nombre_documento = $request->values['documentName'];

        return [
            'message' => 'un mensaje post documetno',
            'doc' =>   $request->values['pdfFile'],
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Documento $documento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Documento $documento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Documento $documento)
    {
        //
    }
}
