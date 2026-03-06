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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="flex flex-wrap justify-center sm:px-6 lg:px-8">
                        <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                            {metrics.map(metric => (
                                <div key={metric.id} className='py-5 px-5 rounded-2xl shadow-md border-2 lg:h-28'>
                                    <h1 className='text-center font-semibold text-md mb-5'>
                                        {metric.name}
                                    </h1>
                                    <div>
                                        <h1 className='text-xl text-center font-bold text-green-700'>
                                            {metric.value}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    
                    
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5'>
                                <div className='py-5 px-5 rounded-3xl shadow-md'>
                                    <h1 className='text-center font-semibold text-md mb-5'>
                                        total batch
                                    </h1>
                                    <div>
                                        <h1 className='text-xl text-center font-bold text-green-700'>
                                            {batches.length}
                                        </h1>
                                    </div>
                                </div>
                                {death.map(d => (
                                <div className='py-5 px-5 rounded-3xl shadow-md'>
                                    <h1 className='text-center font-semibold text-md mb-5'>
                                        {d.name}
                                    </h1>
                                    <div>
                                        <h1 className='text-xl text-center font-bold text-green-700'>
                                            {d.value}
                                        </h1>
                                    </div>
                                </div>
                                ))};
                                
                            <select
                                value={selectedBatch?.id || ''}
                                onChange={e => {
                                    const batch = batches.find(b => b.id == e.target.value);
                                    setSelectedBatch(batch);
                                }}
                                >
                                <option value="">Select Batch</option>
                                {batches.map(batch => (
                                    <option key={batch.id} value={batch.id}>
                                    {batch.name}
                                    </option>
                                ))}
                            </select>
                            {selectedBatch?.sections?.map(section => (
                                <div key={section.id} className='py-5 px-5 rounded-3xl shadow-md'>
                                    <h1 className='text-center font-semibold text-md mb-5'>
                                        Section {section.name}
                                    </h1>
                                    <div>
                                        <h1 className='text-xl text-center font-bold text-green-700'>
                                            {section.total_eggs}
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
