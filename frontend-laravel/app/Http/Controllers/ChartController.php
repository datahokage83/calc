<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChartController extends Controller
{
    public function index(Request $request)
    {
        $response = Http::get('http://localhost:5000/api/users');

        $items = json_decode($response);

        return view('dashboard')->with('items', json_decode($response, true));
    }
}
