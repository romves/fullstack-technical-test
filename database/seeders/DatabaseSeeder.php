<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
use Database\Factories\VehicleFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);

        Vehicle::factory()->count(20)->create();

        $employee = User::factory()->create([
            'name' => 'Test Employee',
            'email' => 'employee@example.com',
        ]);
        $employee->assignRole('employee');

        $admin = User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
        ]);
        $admin->assignRole('admin');

        $approver = User::factory()->create([
            'name' => 'Test Approver',
            'email' => 'approver@example.com',
        ]);
        $approver->assignRole('approver');
    }
}
