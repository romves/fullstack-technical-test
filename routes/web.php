<?php

use App\Http\Controllers\OverviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleRequestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Redirect::route('dashboard');
});

Route::get('/dashboard', [OverviewController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/request-approval', function () {
        return Inertia::render('RequestApproval');
    })->name('request-approval');

    Route::get('/request-approval', function () {
        return Inertia::render('RequestApproval');
    })->name('request-approval');

    Route::prefix('vehicle')->group(function () {

        Route::get('/', [VehicleController::class, 'index'])->name('vehicle.index')->middleware(['role:admin|approver']);
        Route::get('/create', [VehicleController::class, 'create'])->name('vehicle.create');
        Route::post('/store', [VehicleController::class, 'store'])->name('vehicle.store');
        Route::get('/edit/{vehicle}', [VehicleController::class, 'edit'])->name('vehicle.edit');
        Route::patch('/update/{vehicle}', [VehicleController::class, 'update'])->name('vehicle.update');
        Route::delete('/destroy/{vehicle}', [VehicleController::class, 'destroy'])->name('vehicle.destroy');
    });

    Route::prefix('vehicle-request')->group(function () {
        Route::get('/', [VehicleRequestController::class, 'index'])->name('vehicle-request.management');
        Route::get('/create', [VehicleRequestController::class, 'create'])->name('vehicle-request.create');
        Route::post('/store', [VehicleRequestController::class, 'store'])->name('vehicle-request.store');
        Route::delete('/{vehicleRequest}', [VehicleRequestController::class, 'destroy'])->name('vehicle-request.destroy')->middleware(['role:admin']);
        Route::post('/{vehicleRequest}', [VehicleRequestController::class, 'update'])->name('vehicle-request.update');
        Route::get('/{vehicleRequest}', [VehicleRequestController::class, 'show'])->name('vehicle-request.show');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
