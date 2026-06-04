import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useFaceApi } from '@/Hooks/useFaceApi';
import axios from 'axios';

export default function EmployeeRegister({ employees = [] }) {

    const videoRef = useRef(null);
    const modelsLoaded = useFaceApi();
    const [status, setStatus] = useState({ text: 'Loading face models...', type: 'idle' });
    const [form, setForm] = useState({ name: '', employee_id: '' });
    const [list, setList] = useState(employees);
    const [captured, setCaptured] = useState(false);
    const [descriptor, setDescriptor] = useState(null);

    useEffect(() => {
        if (modelsLoaded) setStatus({ text: 'Ready — position face within the frame', type: 'ready' });
    }, [modelsLoaded]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
            .catch(() => setStatus({ text: 'Camera access denied', type: 'error' }));
    }, []);

    const handleCapture = async () => {
        if (!modelsLoaded || !videoRef.current) return;
        setStatus({ text: 'Detecting face...', type: 'scanning' });

        const detection = await faceapi
            .detectSingleFace(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!detection) {
            setStatus({ text: 'No face detected. Adjust position and try again.', type: 'error' });
            return;
        }

        setDescriptor(Array.from(detection.descriptor));
        setCaptured(true);
        setStatus({ text: 'Face captured! Fill in the details and save.', type: 'success' });
    };

    const handleRegister = async () => {
        if (!descriptor) return;
        try {
            await axios.post('/admin/employee-register', {
                name: form.name,
                employee_id: form.employee_id,
                descriptor,
            });
            setStatus({ text: `${form.name} registered successfully!`, type: 'success' });
            setList(prev => [...prev, { name: form.name, employee_id: form.employee_id }]);
            setForm({ name: '', employee_id: '' });
            setCaptured(false);
            setDescriptor(null);
        } catch (err) {
            setStatus({ text: err.response?.data?.message ?? 'Registration failed.', type: 'error' });
        }
    };

    const dotColor = {
        idle: 'bg-gray-400', ready: 'bg-green-500',
        scanning: 'bg-yellow-400 animate-pulse',
        success: 'bg-green-600', error: 'bg-red-500',
    }[status.type];

    const statusColor = {
        idle: 'text-gray-500 dark:text-gray-400',
        ready: 'text-green-600 dark:text-green-400',
        scanning: 'text-yellow-500 dark:text-yellow-400',
        success: 'text-green-700 dark:text-green-300',
        error: 'text-red-600 dark:text-red-400',
    }[status.type];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Employee Registration
                </h2>
            }
        >
            <Head title="Employee Registration" />

            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-6">
                        <h1 className="text-3xl font-extrabold text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-300 dark:border-green-700 pb-1 w-max">
                            Employee Registration
                        </h1>
                        <p className="text-green-700 dark:text-green-200 text-sm">
                            Register employees by capturing their face for attendance recognition.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Camera + Form */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                                Face capture
                            </h3>

                            <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
                                <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className={`w-40 h-40 border-2 rounded transition-colors ${captured ? 'border-green-400' : 'border-white opacity-40'}`} />
                                </div>
                                {captured && (
                                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-medium">
                                        ✓ Face captured
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 mb-4">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
                                <span className={`text-sm ${statusColor}`}>{status.text}</span>
                            </div>

                            <button
                                onClick={handleCapture}
                                disabled={!modelsLoaded}
                                className="w-full py-3 mb-6 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
                            >
                                {captured ? 'Recapture face' : 'Capture face'}
                            </button>

                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                                Employee details
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Full name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Juan Dela Cruz"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Employee ID</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. EMP-0042"
                                        value={form.employee_id}
                                        onChange={e => setForm({ ...form, employee_id: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <button
                                    onClick={handleRegister}
                                    disabled={!captured || !form.name || !form.employee_id}
                                    className="w-full py-3 bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
                                >
                                    Save employee
                                </button>
                            </div>
                        </div>

                        {/* Registered List */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                                Registered employees ({list.length})
                            </h3>

                            {list.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                                    <p className="text-sm">No employees registered yet</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {list.map((emp, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                                            <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-sm font-semibold text-green-700 dark:text-green-300 flex-shrink-0">
                                                {emp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800 dark:text-white">{emp.name}</p>
                                                <p className="text-xs text-gray-400">{emp.employee_id}</p>
                                            </div>
                                            <span className="ml-auto text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-md font-medium">
                                                Registered
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}