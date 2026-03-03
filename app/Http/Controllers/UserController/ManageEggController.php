<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Batch;
use App\Models\ManageEgg;
use Inertia\Inertia;
use Inertia\Response;

class ManageEggController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $today = now()->toDateString(); // "YYYY-MM-DD"

        $batches = Batch::with(['manageEggs' => function($query) use ($today) {
            $query->whereDate('created_at', $today);
        }])
        ->withCount(['manageEggs as manage_eggs_count' => function ($query) use ($today) {
            $query->whereDate('created_at', $today);
        }])
        ->latest()
        ->get()
        ->map(function($batch) {
            // Transform manageEggs to a sections object for frontend
            $sections = [];
            foreach ($batch->manageEggs as $egg) {
                $sections[$egg->section] = [
                    'pullet' => $egg->pullet,
                    'small' => $egg->small,
                    'medium' => $egg->medium,
                    'large' => $egg->large,
                    'extra_large' => $egg->extra_large,
                    'jumbo' => $egg->jumbo,
                    'broken' => $egg->broken,
                ];
            }
            $batch->sections = $sections;
            return $batch;
    });

    return Inertia::render('User/ManageEgg', [
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
    public function store(Request $request, $batchId)
    {

         $request->validate([
        'sections' => 'required|array',
    ]);

    foreach ($request->sections as $sectionName => $helo) {

        ManageEgg::create([
            'batch_id' => $batchId,
            'section' => $sectionName,
            'pullet' => $helo['pullet'] ?? 0,
            'small' => $helo['small'] ?? 0,
            'medium' => $helo['medium'] ?? 0,
            'large' => $helo['large'] ?? 0,
            'extra_large' => $helo['extra_large'] ?? 0,
            'jumbo' => $helo['jumbo'] ?? 0,
            'broken' => $helo['broken'] ?? 0,
        ]);
    }

    return redirect()->back();
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
    public function update(Request $request,  $batchId )
    {
        //
        $request->validate([
        'sections' => 'required|array',
    ]);

    foreach ($request->sections as $sectionName => $helo) {

        ManageEgg::updateOrCreate(
            [
                'batch_id' => $batchId,
                'section' => $sectionName,
            ],
            [
                'pullet' => $helo['pullet'] ?? 0,
                'small' => $helo['small'] ?? 0,
                'medium' => $helo['medium'] ?? 0,
                'large' => $helo['large'] ?? 0,
                'extra_large' => $helo['extra_large'] ?? 0,
                'jumbo' => $helo['jumbo'] ?? 0,
                'broken' => $helo['broken'] ?? 0,
            ]
        );
    }

    return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
