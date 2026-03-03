<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Batch;
use App\Models\ManageEgg;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totals = [
        'pullet' => ManageEgg::sum('pullet'),
        'small' => ManageEgg::sum('small'),
        'medium' => ManageEgg::sum('medium'),
        'large' => ManageEgg::sum('large'),
        'extra_large' => ManageEgg::sum('extra_large'),
        'jumbo' => ManageEgg::sum('jumbo'),
        'broken' => ManageEgg::sum('broken'),
    ];
    $batches = Batch::with('manageEggs')->get()->map(function($batch) {
    $batch->total_eggs = $batch->manageEggs->sum('pullet')
        + $batch->manageEggs->sum('small')
        + $batch->manageEggs->sum('medium')
        + $batch->manageEggs->sum('large')
        + $batch->manageEggs->sum('extra_large')
        + $batch->manageEggs->sum('jumbo')
        + $batch->manageEggs->sum('broken');
});
    $section = 
    // total of all eggs
    $totals['total_eggs'] = array_sum($totals);

    return Inertia::render('User/Dashboard', [
        'totals' => $totals,
        'batches' => $batches
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
