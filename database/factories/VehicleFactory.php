<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ownership = $this->faker->randomElement(['rented', 'owned']);
        $rentalCompany = $ownership === 'rented' ? $this->faker->company() : null;

        return [
            'name' => $this->faker->randomElement([
                'Excavator X200', 'Dump Truck D400', 'Crew Transporter T200', 'Pickup Truck P100'
            ]),
            'year' => $this->faker->numberBetween(2015, 2023),
            'color' => $this->faker->safeColorName(),
            'plate' => strtoupper($this->faker->bothify('MN-#####')),
            'last_maintenance' => $this->faker->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'fuel_consumption' => $this->faker->randomFloat(1, 8, 30),
            'ownership' => $ownership,
            'load_type' => $this->faker->randomElement(['people', 'goods']),
            'rental_company' => $rentalCompany,
        ];
    }
}
