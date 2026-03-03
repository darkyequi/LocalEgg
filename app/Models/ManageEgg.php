<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Http\Controllers\AdminController\BatchController;

class ManageEgg extends Model
{
    use HasFactory;

    protected $fillable = [
        'batch_id',
        'section',
        'pullet',
        'small',
        'medium',
        'large',
        'extra_large',
        'jumbo',
        'broken',
    ];
    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }
}
