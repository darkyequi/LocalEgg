import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Dashboard({totals, batches}) {
    const [selectedBatch, setSelectedBatch] = useState(batches[0] || null);

    const metrics = [
        { id: 1, name: 'Total Eggs', value: totals?.total_eggs || 0 },
        { id: 2, name: 'Total Pullet', value: totals?.pullet || 0 },
        { id: 3, name: 'Total Small', value: totals?.small || 0 },
        { id: 4, name: 'Total Medium', value: totals?.medium || 0 },
        { id: 5, name: 'Total Large', value: totals?.large || 0 },
        { id: 6, name: 'Total XL', value: totals?.extra_large || 0 },
        { id: 7, name: 'Total Jumbo', value: totals?.jumbo || 0 },
        { id: 8, name: 'Total Broken', value: totals?.broken || 0 },
    ];
    const death = [
        {id: 1, name: 'Total Death', value: totals?.chicken_death || 0},
    ]

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="flex flex-wrap justify-center sm:px-6 lg:px-8">
                    {/* Top Metrics Grid */}
                    <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                        {metrics.map(metric => (
                            <div key={metric.id} className='py-5 px-5 rounded-2xl shadow-md border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 lg:h-28 transition-colors duration-200'>
                                <h1 className='text-center font-semibold text-md mb-5 text-gray-700 dark:text-gray-300'>
                                    {metric.name}
                                </h1>
                                <div>
                                    <h1 className='text-xl text-center font-bold text-green-700 dark:text-green-400'>
                                        {metric.value}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                
                    {/* Bottom Summary Grid */}
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5'>
                            <div className='py-5 px-5 rounded-3xl shadow-md bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 transition-colors duration-200'>
                                <h1 className='text-center font-semibold text-md mb-5 text-gray-700 dark:text-gray-300'>
                                    total batch
                                </h1>
                                <div>
                                    <h1 className='text-xl text-center font-bold text-green-700 dark:text-green-400'>
                                        {batches.length}
                                    </h1>
                                </div>
                            </div>
                            {death.map(d => (
                                <div key={d.id} className='py-5 px-5 rounded-3xl shadow-md bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 transition-colors duration-200'>
                                    <h1 className='text-center font-semibold text-md mb-5 text-gray-700 dark:text-gray-300'>
                                        {d.name}
                                    </h1>
                                    <div>
                                        <h1 className='text-xl text-center font-bold text-green-700 dark:text-green-400'>
                                            {d.value}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}