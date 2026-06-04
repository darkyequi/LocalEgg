import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useFaceApi } from '@/Hooks/useFaceApi';
import axios from 'axios';

export default function Attendance({ todayLogs = [], employees = [] }) {

    const videoRef = useRef(null);
    const modelsLoaded = useFaceApi();
    const [labeledDescriptors, setLabeledDescriptors] = useState([]);
    const [status, setStatus] = useState({ text: 'Loading models...', type: 'idle' });
    const [mode, setMode] = useState('time_in');
    const [logs, setLogs] = useState(todayLogs);

    // Load employee face descriptors once models are ready
    useEffect(() => {
        if (!modelsLoaded) return;
        axios.get('/admin/employee-register/descriptors').then(({ data }) => {
            const labeled = data.map(emp =>
                new faceapi.LabeledFaceDescriptors(
                    JSON.stringify({ id: emp.id, name: emp.name }),
                    [new Float32Array(emp.descriptor)]
                )
            );
            setLabeledDescriptors(labeled);
            setStatus({ text: 'Ready — position face within the frame', type: 'ready' });
        });
    }, [modelsLoaded]);

    // Start webcam
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
            .catch(() => setStatus({ text: 'Camera access denied', type: 'error' }));
    }, []);

    const handleScan = async () => {
        if (!modelsLoaded || !labeledDescriptors.length) return;
        setStatus({ text: 'Scanning...', type: 'scanning' });

        const detection = await faceapi
            .detectSingleFace(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!detection) {
            setStatus({ text: 'No face detected. Try again.', type: 'error' });
            return;
        }

        const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);
        const match = matcher.findBestMatch(detection.descriptor);

        if (match.label === 'unknown') {
            setStatus({ text: 'Face not recognized.', type: 'error' });
            return;
        }

        const employee = JSON.parse(match.label);

        try {
            const res = await axios.post('/admin/attendance/record', {
                employee_id: employee.id,
                type: mode,
            });
            setStatus({ text: `✓ ${employee.name} — ${res.data.message}`, type: 'success' });
            setLogs(prev => [{
                employee_name: employee.name,
                type: mode,
                recorded_at: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            }, ...prev]);
        } catch (err) {
            setStatus({ text: err.response?.data?.message ?? 'Error recording attendance', type: 'error' });
        }
    };

    const dotColor = {
        idle: 'bg-gray-400',
        ready: 'bg-green-500',
        scanning: 'bg-yellow-400 animate-pulse',
        success: 'bg-green-600',
        error: 'bg-red-500',
    }[status.type];

    const statusColor = {
        idle: 'text-gray-500 dark:text-gray-400',
        ready: 'text-green-600 dark:text-green-400',
        scanning: 'text-yellow-500 dark:text-yellow-400',
        success: 'text-green-700 dark:text-green-300',
        error: 'text-red-600 dark:text-red-400',
    }[status.type];

    const presentCount = logs.filter(l => l.type === 'time_in').length;
    const timeOutCount = logs.filter(l => l.type === 'time_out').length;
    const absentCount = Math.max(0, employees.length - presentCount);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Attendance
                </h2>
            }
        >
            <Head title="Attendance" />

            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-6">
                        <h1 className="text-3xl font-extrabold text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-300 dark:border-green-700 pb-1 w-max">
                            Attendance
                        </h1>
                        <p className="text-green-700 dark:text-green-200 text-sm">
                            Mark attendance using face recognition.
                        </p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Present today', value: presentCount, color: 'text-green-700 dark:text-green-400' },
                            { label: 'Time-outs', value: timeOutCount, color: 'text-green-700 dark:text-green-400' },
                            { label: 'Absent', value: absentCount, color: 'text-red-600 dark:text-red-400' },
                        ].map(m => (
                            <div key={m.label} className="py-5 px-5 rounded-2xl shadow-md border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{m.label}</p>
                                <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Camera Panel */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6">

                            {/* Mode Tabs */}
                            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-5">
                                {[{ value: 'time_in', label: 'Time in' }, { value: 'time_out', label: 'Time out' }].map(tab => (
                                    <button
                                        key={tab.value}
                                        onClick={() => setMode(tab.value)}
                                        className={`flex-1 py-2 text-sm rounded-lg transition-all ${
                                            mode === tab.value
                                                ? 'bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 font-semibold shadow-sm'
                                                : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Video */}
                            <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
                                <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-40 h-40 border-2 border-green-400 opacity-60 rounded" />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 mb-4">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
                                <span className={`text-sm ${statusColor}`}>{status.text}</span>
                            </div>

                            <button
                                onClick={handleScan}
                                disabled={!modelsLoaded || !labeledDescriptors.length}
                                className="w-full py-3 bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
                            >
                                Scan &amp; mark attendance
                            </button>
                        </div>

                        {/* Logs Panel */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                                Today's logs
                            </h3>

                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-700">
                                        <th className="text-left text-xs text-gray-400 uppercase tracking-wider pb-2 font-medium">Employee</th>
                                        <th className="text-left text-xs text-gray-400 uppercase tracking-wider pb-2 font-medium">Time</th>
                                        <th className="text-left text-xs text-gray-400 uppercase tracking-wider pb-2 font-medium">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log, i) => (
                                        <tr key={i} className="border-b border-gray-50 dark:border-gray-700 last:border-0">
                                            <td className="py-3 text-gray-700 dark:text-gray-300">
                                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold mr-2">
                                                    {log.employee_name?.charAt(0)}
                                                </span>
                                                {log.employee_name}
                                            </td>
                                            <td className="py-3 text-gray-500 dark:text-gray-400">{log.recorded_at}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                                    log.type === 'time_in'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                                }`}>
                                                    {log.type === 'time_in' ? 'Time in' : 'Time out'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {logs.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="py-8 text-center text-gray-400 text-sm">No logs yet today</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}