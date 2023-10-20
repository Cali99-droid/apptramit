<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;

class HistoryController extends Controller
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

        $antHist = History::where([
            ['oficina_id', $request->origenId],
            ['documento_id', $request->documentoId]
        ])->update(['estado_id' => 3, 'obs' => $request->obs]);




        $history = new History();
        $history->documento_id = $request->documentoId;
        $history->oficina_id = $request->oficinaId;
        $history->estado_id = 1;

        $history->save();
        return [
            'message' => 'un mensaje post',
            'hist' => $antHist
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(History $history)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, History $history)
    {
        //
        $history->estado_id = 5;
        $history->obs = $request->obs;
        $history->save();
        // $antHist = History::where([
        //     ['id', $request->origenId],

        // ])->update(['estado_id' => 5]);
        return [
            'history' => $history
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(History $history)
    {
        //
    }
}
