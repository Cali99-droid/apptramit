<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentoCollection;
use App\Models\Documento;
use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new DocumentoCollection(Documento::with('oficinas')->orderBy('id', 'DESC')->get());
    }
    public function download($docName)
    {
        //actualizar estado del documento

        $path = storage_path("app/pdfs/$docName");
        if (!Storage::exists("pdfs/$docName")) {
            abort(404, 'El archivo no existe.');
        }

        //
        return response()->file($path);
    }
    public function upload(Request $request)
    {
        //cambiso
        $request->validate([
            'name' => 'required|string',
            'pdfFile' => 'required|file|mimes:pdf|max:10240', // Validación del archivo PDF
        ]);
        $recaptchaSecret = env('RECAPTCHA_SECRET_KEY');
        $recaptchaResponse = $request->input('captcha');
        $recaptcha = new \ReCaptcha\ReCaptcha($recaptchaSecret);
        $response = $recaptcha->verify($recaptchaResponse);
        if ($response->isSuccess()) {
            $documento = new Documento();
            $documento->tipo_persona = $request->input('personaType');
            $documento->dni = $request->input('dni');
            $documento->nombre_interesado = $request->input('name');
            $documento->telefono = $request->input('telefono');
            $documento->email = $request->input('email');
            $documento->direccion = $request->input('direccion');
            $documento->nombre_documento = $request->input('documentName');
            $documento->tipo = $request->input('documentType');
            $documento->folios = $request->input('folio');
            $documento->asunto = $request->input('asunto');
            $documento->estado_id = 1;
            $documento->code = Str::upper(Str::random(6));

            $pdfFile = $request->file('pdfFile');

            // Generar un nombre único para el archivo
            // $uniqueName = 'EXP' . '_' . time() . $pdfFile->getClientOriginalName();
            $uniqueName = 'EXP' . '_' . time();
            $documento->dir = $uniqueName;
            // Guardar el archivo en el directorio de almacenamiento
            $pdfFile->storeAs('pdfs', $uniqueName);
            //guradar documento
            $documento->save();

            //obtener id del documento
            // Obtener el ID del pedido
            $id =   $documento->id;
            //guardar historial
            $history = new History();
            $history->oficina_id = 1;
            $history->documento_id = $id;
            $history->estado_id = 1;
            $history->save();

            return [
                'code' => $documento->code,

            ];
        } else {
            abort(404, 'Captcha no válido, por favor, inténtalo de nuevo.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // $request->validate([
        //     'name' => 'required|string',
        //     'pdfFile' => 'required|file|mimes:pdf|max:10240', // Validación del archivo PDF
        // ]);
        // $documento = new Documento();
        // $documento->tipo_persona = $request->input('personaType');
        // $documento->dni = $request->input('dni');
        // $documento->nombre_interesado = $request->input('name');
        // $documento->telefono = $request->input('telefono');
        // $documento->email = $request->input('email');
        // $documento->direccion = $request->input('direccion');
        // $documento->nombre_documento = $request->input('documentName');
        // $documento->folios = $request->input('folio');
        // $documento->asunto = $request->input('asunto');
        // $documento->estado_id = 1;


        // $pdfFile = $request->file('pdfFile');

        // // Generar un nombre único para el archivo
        // $uniqueName = time() . '_' . $pdfFile->getClientOriginalName();
        // $documento->dir = $uniqueName;
        // // Guardar el archivo en el directorio de almacenamiento
        // $pdfFile->storeAs('pdfs', $uniqueName);
        // //guradar documento
        // $documento->save();

        // //obtener id del documento
        // // Obtener el ID del pedido
        // $id =   $documento->id;
        // //guardar historial
        // $history = new History();
        // $history->oficina_id = 1;
        // $history->documento_id = $id;
        // $history->save();

        // return [
        //     'message' => 'Se guardo el documento',

        // ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Documento $documento)
    {
    }
    public function consulta($code)
    {


        return new DocumentoCollection(Documento::with('oficinas')->where('code', '=', $code)->orderBy('id', 'DESC')->get());
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
