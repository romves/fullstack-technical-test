<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class VehicleRequestController extends Controller
{
    /**
     * Display a listing of the vehicle requests.
     */
    public function index()
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        if ($user->hasRole('admin')) {
            $requests = VehicleRequest::with(['renter', 'approver', 'admin', 'vehicle'])->get();
        } elseif ($user->hasRole('approver')) {
            $requests = VehicleRequest::with(['renter', 'vehicle'])
                ->where('approver_id', $user->id)
                ->orWhere('is_approved_by_approver', false)
                ->get();
            // ->paginate(10);
        } else {
            $requests = VehicleRequest::with(['approver', 'admin', 'vehicle'])
                ->where('renter_id', $user->id)
                ->get();
            // ->paginate(10);
        }

        return Inertia::render('VehicleRequest/Management', [
            'vehicleRequests' => $requests
        ]);
    }

    public function create()
    {
        return Inertia::render('VehicleRequest/Create', [
            'vehicles' => Vehicle::orderBy('name')->get()
        ]);
    }

    /**
     * Store a newly created vehicle request.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'vehicle_id' => 'required|exists:vehicles,id',
            'purpose' => 'required|string|max:1000',
        ]);

        VehicleRequest::create([
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'vehicle_id' => $validated['vehicle_id'],
            'purpose' => $validated['purpose'],
            'renter_id' => Auth::id(),
            'status' => 'pending'
        ]);

        /** @var \App\Models\User */
        $user = Auth::user();
        if ($user->hasRole('employee')) {
            return Redirect::route('vehicle-request.create')->with('success', 'Request created.');
        }
        return Redirect::route('vehicle-request.management')->with('success', 'Request created.');
    }

    /**
     * Display the specified vehicle request.
     */
    public function show(VehicleRequest $vehicleRequest)
    {
        $vehicleRequest->load(['renter', 'approver', 'admin', 'vehicle']);
        $vehicles = Vehicle::orderBy('name')->get();
        $approvers = User::get()->filter(function ($user) {
            return $user->hasRole('approver');
        })->values()->toArray();
        return Inertia::render('VehicleRequest/Show', [
            'approvers' => $approvers,
            'vehicleRequest' => $vehicleRequest,
            'vehicles' => $vehicles
        ]);
    }

    /**
     * Update the specified vehicle request.
     */
    public function update(Request $request, VehicleRequest $vehicleRequest)
    {
        if ($vehicleRequest->status !== 'pending') {
            return response()->json(['message' => 'Cannot update processed requests'], 403);
        }

        $validated = $request->validate([
            'approver_id' => 'sometimes|exists:users,id',
            'is_approved_by_approver' => 'sometimes|boolean',
            'is_approved_by_admin' => 'sometimes|boolean',
        ]);

        $vehicleRequest->update($validated);

        return Redirect::route('vehicle-request.management')->with('success', 'Request updated.');
    }

    public function approve()
    {
        return Inertia::render('VehicleRequest/Approve');
    }

    /**
     * Remove the specified vehicle request.
     */
    public function destroy(VehicleRequest $vehicleRequest)
    {
        if ($vehicleRequest->status !== 'pending') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $vehicleRequest->delete();

        return Redirect::route('vehicle-request.management')->with('success', 'Request deleted.');
    }
}
