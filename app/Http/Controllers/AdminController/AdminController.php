<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Batch;
use App\Models\ManageEgg;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
       // totals per year
    $totalsByYear = ManageEgg::select(
        DB::raw('YEAR(created_at) as year'),
        DB::raw('SUM(pullet) as pullet'),
        DB::raw('SUM(small) as small'),
        DB::raw('SUM(medium) as medium'),
        DB::raw('SUM(large) as large'),
        DB::raw('SUM(extra_large) as extra_large'),
        DB::raw('SUM(jumbo) as jumbo'),
        DB::raw('SUM(broken) as broken'),
        DB::raw('SUM(chicken_death) as chicken_death')
    )
    ->groupBy('year')
    ->get()
    ->map(function ($item) {
        $item->total_eggs =
            $item->pullet +
            $item->small +
            $item->medium +
            $item->large +
            $item->extra_large +
            $item->jumbo +
            $item->broken;

        return $item;
    });

    // monthly chart data
    $monthlyData = ManageEgg::select(
        DB::raw('YEAR(created_at) as year'),
        DB::raw('DATE_FORMAT(created_at, "%b") as month'),
        DB::raw('MONTH(created_at) as month_num'),
        DB::raw('SUM(pullet + small + medium + large + extra_large + jumbo + broken) as total')
    )
    ->where('created_at', '>=', now()->subYears(5)->startOfYear())
    ->groupBy('year', 'month', 'month_num')
    ->orderBy('year', 'desc')
    ->orderBy('month_num', 'asc')
    ->get();

    $batches = Batch::with('manageEggs')->get();

    return Inertia::render('Admin/Dashboard', [
        'totalsByYear' => $totalsByYear,
        'batches' => $batches,
        'monthlyData' => $monthlyData,
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
