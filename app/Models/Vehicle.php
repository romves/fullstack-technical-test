<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color',
        'year',
        'plate',
        'last_maintenance',
        'fuel_consumption',
        'load_type',
        'rental_company',
        'ownership',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 0);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'like', '%' . $search . '%')
            ->orWhere('model', 'like', '%' . $search . '%')
            ->orWhere('year', 'like', '%' . $search . '%')
            ->orWhere('price', 'like', '%' . $search . '%')
            ->orWhere('description', 'like', '%' . $search . '%');
    }

    public function scopeFilter($query, $filter)
    {
        if ($filter == 'active') {
            return $query->active();
        } elseif ($filter == 'inactive') {
            return $query->inactive();
        } else {
            return $query;
        }
    }
}
