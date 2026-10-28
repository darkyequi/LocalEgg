<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/EmployeeRegister', [
            'employees' => Employee::select('id', 'name', 'employee_id')->get(),
        ]);
    }

    public function descriptors()
    {
        return response()->json(
            Employee::select('id', 'name', 'employee_id', 'face_descriptor')
                ->get()
                ->map(fn($e) => [
                    'id'         => $e->id,
                    'name'       => $e->name,
                    'employeeId' => $e->employee_id,
                    'descriptor' => $e->face_descriptor,
                ])
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string',
            'employee_id' => 'required|string|unique:employees,employee_id',
            'descriptor'  => 'required|array|size:128',
        ]);

        Employee::create([
            'name'            => $request->name,
            'employee_id'     => $request->employee_id,
            'face_descriptor' => $request->descriptor,
        ]);

        return response()->json(['message' => 'Employee registered successfully']);
    }
}