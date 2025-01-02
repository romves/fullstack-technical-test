<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index()
    {
        return Inertia::render('Vehicle/Index', [
            'vehicles' => Vehicle::orderBy('name')
                ->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Vehicle/Create');
    }

    public function store(Request $request)
    {
        try {
            Vehicle::create(
                $request->validate([
                    'name' => ['required', 'max:50'],
                    'color' => ['required', 'max:50'],
                    'year' => ['required', 'max:50'],
                    'plate' => ['required', 'max:50'],
                    'last_maintenance' => ['required', 'date'],
                    'fuel_consumption' => ['required', 'numeric'],
                    'load_type' => ['required', 'in:people,goods'],
                    'ownership' => ['required', 'in:rented,owned'],
                    'rental_company' => ['nullable', 'max:50'],
                ])
            );
        } catch (\Throwable $th) {
            return Redirect::back()->withInput()->with('error', 'Vehicle not created.');
        }

        return Redirect::route('vehicle.index')->with('success', 'Vehicle created.');
    }

    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('Vehicles/Edit', [
            'vehicle' => [
                'id' => $vehicle->id,
                'name' => $vehicle->name,
                'color' => $vehicle->color,
                'year' => $vehicle->year,
                'plate' => $vehicle->plate,
                'last_maintenance' => $vehicle->last_maintenance,
                'fuel_consumption' => $vehicle->fuel_consumption,
                'load_type' => $vehicle->load_type,
                'rental_company' => $vehicle->rental_company,
                'ownership' => $vehicle->ownership,
                'created_at' => $vehicle->created_at,
                'updated_at' => $vehicle->updated_at,
            ],
        ]);
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return Redirect::route('vehicle.index')->with('success', 'Vehicle deleted.');
    }
}
