<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Batch;
use App\Models\ManageEgg;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $totals = [
        'pullet' => ManageEgg::sum('pullet'),
        'small' => ManageEgg::sum('small'),
        'medium' => ManageEgg::sum('medium'),
        'large' => ManageEgg::sum('large'),
        'extra_large' => ManageEgg::sum('extra_large'),
        'jumbo' => ManageEgg::sum('jumbo'),
        'broken' => ManageEgg::sum('broken'),
        'chicken_death' => ManageEgg::sum('chicken_death'),
    ];
    $batches = Batch::with('manageEggs')->get()->map(function($batch) {

        // Total eggs per batch
        $batch->total_eggs =
            $batch->manageEggs->sum('pullet') +
            $batch->manageEggs->sum('small') +
            $batch->manageEggs->sum('medium') +
            $batch->manageEggs->sum('large') +
            $batch->manageEggs->sum('extra_large') +
            $batch->manageEggs->sum('jumbo') +
            $batch->manageEggs->sum('broken');

        // Group by section
        $batch->sections = $batch->manageEggs
            ->groupBy('section')
            ->map(function ($items, $sectionName) {

                return [
                    'id' => $sectionName,
                    'name' => $sectionName,
                    'total_eggs' =>
                        $items->sum('pullet') +
                        $items->sum('small') +
                        $items->sum('medium') +
                        $items->sum('large') +
                        $items->sum('extra_large') +
                        $items->sum('jumbo') +
                        $items->sum('broken'),
                ];
            })
            ->values(); // important to make it array

        return $batch;
    });

    
    // total of all eggs
    $totals['total_eggs'] = array_sum($totals);

    return Inertia::render('Admin/Dashboard', [
        'totals' => $totals,
        'batches' => $batches,
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

    public function records()
    {
        $today = now()->toDateString();

    $batches = Batch::with(['manageEggs' => function ($query) {
        $query->orderBy('created_at', 'desc');
    }])->get()->map(function($batch) {

        
        $batch->total_eggs =
            $batch->manageEggs->sum('pullet') +
            $batch->manageEggs->sum('small') +
            $batch->manageEggs->sum('medium') +
            $batch->manageEggs->sum('large') +
            $batch->manageEggs->sum('extra_large') +
            $batch->manageEggs->sum('jumbo') +
            $batch->manageEggs->sum('broken');
        $batch->pullet      = $batch->manageEggs->sum('pullet');
        $batch->small       = $batch->manageEggs->sum('small');
        $batch->medium      = $batch->manageEggs->sum('medium');
        $batch->large       = $batch->manageEggs->sum('large');
        $batch->extra_large = $batch->manageEggs->sum('extra_large');
        $batch->jumbo       = $batch->manageEggs->sum('jumbo');
        $batch->broken      = $batch->manageEggs->sum('broken');
        $batch->chicken_death = $batch->manageEggs->sum('chicken_death');
        
        
        $batch->sections = $batch->manageEggs
            ->groupBy('section')
            ->map(function ($items, $sectionName) {

                return [
                    'id' => $sectionName,
                    'name' => $sectionName,
                    'total_eggs' =>
                        $items->sum('pullet') +
                        $items->sum('small') +
                        $items->sum('medium') +
                        $items->sum('large') +
                        $items->sum('extra_large') +
                        $items->sum('jumbo') +
                        $items->sum('broken'),
                ];
            })

            ->values(); 

        return $batch;
    });


    return Inertia::render('Admin/Records', [
        'batches' => $batches,
    ]);
    }
    
}
