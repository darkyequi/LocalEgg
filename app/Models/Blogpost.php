<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blogpost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'pictures',
        'user_id',
    ];

    protected $casts = [
        'pictures' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
