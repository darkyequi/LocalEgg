<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ManageAccountController extends Controller
{
    /**
     * Display all users with role 'user'.
     */
    public function manageUsers()
    {
        $users = User::where('role', 'user')
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        $deactivatedUsers = User::where('role', 'user')
            ->where('is_active', false)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('Admin/ManageUser', [
            'users' => $users,
            'deactivatedUsers' => $deactivatedUsers,
        ]);
    }

    /**
     * Create a new user with role 'user'.
     */
    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        return redirect()->route('admin.manageusers')
            ->with('success', 'User created successfully.');
    }

    /**
     * Update an existing user.
     */
    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('admin.manageusers')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Deactivate (soft-disable) a user.
     */
    public function deactivateUser(User $user)
    {
        $user->update(['is_active' => false]);

        return redirect()->route('admin.manageusers')
            ->with('success', 'User deactivated successfully.');
    }

    /**
     * Activate a user.
     */
    public function activateUser(User $user)
    {
        $user->update(['is_active' => true]);

        return redirect()->route('admin.manageusers')
            ->with('success', 'User activated successfully.');
    }

    /**
     * Display all users with role 'admin'.
     */
    public function manageAdmins()
    {
        $admins = User::where('role', 'admin')
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        $deactivatedAdmins = User::where('role', 'admin')
            ->where('is_active', false)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('Admin/ManageAdmin', [
            'admins' => $admins,
            'deactivatedAdmins' => $deactivatedAdmins,
        ]);
    }

    /**
     * Create a new user with role 'admin'.
     */
    public function storeAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return redirect()->route('admin.manageadmins')
            ->with('success', 'Admin created successfully.');
    }

    /**
     * Update an existing admin.
     */
    public function updateAdmin(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('admin.manageadmins')
            ->with('success', 'Admin updated successfully.');
    }

    /**
     * Deactivate (soft-disable) an admin.
     */
    public function deactivateAdmin(User $user)
    {
        $user->update(['is_active' => false]);

        return redirect()->route('admin.manageadmins')
            ->with('success', 'Admin deactivated successfully.');
    }

    /**
     * Activate an admin.
     */
    public function activateAdmin(User $user)
    {
        $user->update(['is_active' => true]);

        return redirect()->route('admin.manageadmins')
            ->with('success', 'Admin activated successfully.');
    }
}
