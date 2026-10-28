<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        $todayLogs = Attendance::with('employee')
            ->whereDate('recorded_at', today())
            ->orderByDesc('recorded_at')
            ->get()
            ->map(fn($a) => [
                'employee_name' => $a->employee->name,
                'type'          => $a->type,
                'recorded_at'   => $a->recorded_at->format('h:i A'),
            ]);

        return Inertia::render('Admin/Attendance', [
            'todayLogs' => $todayLogs,
            'employees' => Employee::select('id', 'name')->get(),
        ]);
    }

    public function record(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'type'        => 'required|in:time_in,time_out',
        ]);

        $existing = Attendance::where('employee_id', $request->employee_id)
            ->where('type', $request->type)
            ->whereDate('recorded_at', today())
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Already recorded today'], 409);
        }

        Attendance::create([
            'employee_id' => $request->employee_id,
            'type'        => $request->type,
            'recorded_at' => now(),
        ]);

        return response()->json(['message' => 'Attendance recorded']);
    }
}