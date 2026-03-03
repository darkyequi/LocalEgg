<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController\AdminController;
use App\Http\Controllers\UserController\UserController;
use App\Http\Controllers\UserController\ManageEggController;
use App\Http\Controllers\SuperAdminController\SuperAdminController;
use App\Http\Controllers\AdminController\BatchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware('auth')->group(function () {
    //User
    Route::middleware(['role:user'])->prefix('user')->name('user.')->group(function () {
        Route::get('/homepage', [UserController::class, 'index'])->name('homepage');
        Route::get('/manage_egg', [ManageEggController::class, 'index'])->name('manageegg');
        Route::post('/manage_egg/{batch}', [ManageEggController::class, 'store'])->name('manageegg.store');
        Route::put('/manage_egg/{batch}', [ManageEggController::class, 'update'])->name('manageegg.update');
    });
    //Admin
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::get('/records', [AdminController::class, 'records'])->name('records');
        Route::get('/createbatch', [BatchController::class, 'index'])->name('createbatch');
        Route::post('/createbatch', [BatchController::class, 'store'])->name('createbatches.store');
        Route::put('/createbatch/{batch}', [BatchController::class, 'update'])->name('createbatches.update');
        Route::delete('/createbatch/{batch}', [BatchController::class, 'destroy'])->name('createbatches.destroy');
    });
    //Super Admin
     Route::middleware(['role:superadmin'])->prefix('superadmin')->name('superadmin.')->group(function () {
        Route::get('/dashboard', [SuperAdminController::class, 'index'])->name('dashboard');
    });








    // Route::get('/dashboard', function () {
    //     return Inertia::render('Dashboard');
    // })->middleware(['auth', 'role:user'])->name('dashboard');

    // Route::get('/admin', function () {
    //     return Inertia::render('Admin/Dashboard');
    // })->middleware(['auth', 'role:admin'])->name('admin');


        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
