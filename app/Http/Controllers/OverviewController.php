<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\VehicleRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OverviewController extends Controller
{

    public function index()
    {
        $vehicles = Vehicle::all();
        $vehicleRequest = VehicleRequest::all();
        return Inertia::render('Overview', [
            'vehicles' => $vehicles,
            'vehicleRequests' => $vehicleRequest
        ]);
    }
}
