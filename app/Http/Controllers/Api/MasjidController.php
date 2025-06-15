<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Masjid;

class MasjidController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Masjid::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $masjid = Masjid::create($request->all());
        return response()->json($masjid, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Masjid::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $masjid = Masjid::findOrFail($id);
        $masjid->update($request->all());
        return response()->json($masjid);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $masjid = Masjid::findOrFail($id);
        $masjid->delete();
        return response()->json(null, 204);
    }
}
