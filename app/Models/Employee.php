<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //
    protected $fillable = ['name', 'employee_id', 'face_descriptor'];

    protected $casts = [
        'face_descriptor' => 'array',
    ];

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
