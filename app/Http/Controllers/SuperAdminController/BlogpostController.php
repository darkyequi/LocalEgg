<?php

namespace App\Http\Controllers\SuperAdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blogpost;
use Inertia\Inertia;

class BlogpostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogposts = Blogpost::with('user')->latest()->get();

        return Inertia::render('SuperAdmin/Blogpost', [
            'blogposts' => $blogposts,
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'pictures' => 'required|array|min:1',
            'pictures.*' => 'image|mimes:jpg,png,jpeg|max:2048',
        ]);

        $paths = [];
        foreach ($request->file('pictures') as $picture) {
            $paths[] = $picture->store('blogposts', 'public');
        }

        Blogpost::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'pictures' => $paths,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('superadmin.blogpost')->with('success', 'Blog post created successfully!');
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
