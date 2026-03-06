import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';




export default function Records({batches}) {
    const [selectedBatch, setSelectedBatch] = useState(batches[0] || null);

    const metrics = [
        { id: 1, name: 'Total Eggs', value: selectedBatch?.total_eggs || 0 },
        { id: 2, name: 'Total Pullet', value: selectedBatch?.pullet || 0 },
        { id: 3, name: 'Total Small', value: selectedBatch?.small || 0 },
        { id: 4, name: 'Total Medium', value: selectedBatch?.medium || 0 },
        { id: 5, name: 'Total Large', value: selectedBatch?.large || 0 },
        { id: 6, name: 'Total XL', value: selectedBatch?.extra_large || 0 },
        { id: 7, name: 'Total Jumbo', value: selectedBatch?.jumbo || 0 },
        { id: 8, name: 'Total Broken', value: selectedBatch?.broken || 0 },
    ];
    const death = [
        {id: 1, name: 'Total Death', value: selectedBatch.chicken_death || 0},
    ]
    const columnName = [
        {id: 1, name: 'Batch'},
        {id: 2, name: 'Section'},
        {id: 3, name: 'Date'},
        {id: 4, name: 'Pullet'},
        {id: 5, name: 'Small'},
        {id: 6, name: 'Meduim'},
        {id: 7, name: 'Large'},
        {id: 8, name: 'Extra Large'},
        {id: 9, name: 'Jumbo'},
        {id: 10, name: 'Broken'},
        {id: 11, name: 'Death'},

    ]
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Records
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="flex flex-wrap justify-center sm:px-6 lg:px-8 lg:justify-start">
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
                    
                    
                        <div className='w-full grid grid-cols-1 mt-5'>
                                {death.map(d => (
                                <div key={d.id} className='py-5 px-5 rounded-3xl shadow-md'>
                                    <h1 className='text-center font-semibold text-md mb-5'>
                                        {d.name}
                                    </h1>
                                    <div>
                                        <h1 className='text-xl text-center font-bold text-green-700'>
                                            {d.value}
                                        </h1>
                                    </div>
                                </div>
                                ))} 
                        </div>
                        <div className='w-full'>
                            <select
                                    value={selectedBatch?.id || ''}
                                    onChange={e => {
                                        const batch = batches.find(b => b.id == e.target.value);
                                        setSelectedBatch(batch);
                                    }} className='mt-8'
                                    >
                                        
                                        {batches.map(batch => (
                                        <option key={batch.id} value={batch.id}>
                                                {batch.name}
                                        </option>
                                    ))}
                            </select>
                            <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                                {selectedBatch?.sections?.map(section => (
                                    <div key={section.id} className='w-full py-5 px-5 rounded-3xl shadow-md'>
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
                            <div className="bg-white mt-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            {columnName.map(cn =>(
                                            <th key={cn.id} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{cn.name}</th>
                                            ))}
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {selectedBatch?.manage_eggs?.map (record => (
                                            <tr key={record.id} className={'hover:bg-slate-50/50 transition-colors group'}>
                                                <td className="px-6 py-4">
                                                    <p>{selectedBatch.name}</p>
                                                </td>

                                                <td className='px-6 py-4'>
                                                    <p>Section {record.section}</p>
                                                </td>

                                                <td className='px-6 py-4'>
                                                    <p>{new Date(record.created_at).toLocaleDateString()}</p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p>{record.pullet}</p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p>{record.small}</p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p>{record.medium}</p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p>{record.large}</p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p>{record.extra_large}</p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p>{record.jumbo}</p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p>{record.broken}</p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p>{record.chicken_death}</p>
                                                </td>

                                                

                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
