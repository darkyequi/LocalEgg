<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Blogpost;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page with a preview of blog posts.
     */
    public function index()
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'blogposts' => Blogpost::with('user')->latest()->take(3)->get(),
        ]);
    }

    /**
     * Display the dedicated blog posts page.
     */
    public function blogposts()
    {
        return Inertia::render('BlogpostView', [
            'blogposts' => Blogpost::with('user')->latest()->get(),
        ]);
    }
}
