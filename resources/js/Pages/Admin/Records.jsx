import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Records({ batches }) {
    const [selectedBatch, setSelectedBatch] = useState(batches[0] || null);
    const [isShow, setIsShow] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 2;

    const records = selectedBatch?.manage_eggs || [];
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(records.length / recordsPerPage);

    const openRecords = (record) => {
        setSelectedRecord(record);
        setIsShow(true);
    };

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
        { id: 1, name: 'Total Death', value: selectedBatch?.chicken_death || 0 },
    ]

    const columnName = [
        { id: 3, name: 'Date' },
        { id: 4, name: 'Pullet' },
        { id: 5, name: 'Small' },
        { id: 6, name: 'Medium' },
        { id: 7, name: 'Large' },
        { id: 8, name: 'Extra Large' },
        { id: 9, name: 'Jumbo' },
        { id: 10, name: 'Broken' },
        { id: 11, name: 'Death' },
    ]

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Records
                </h2>
            }
        >
            <Head title="Records" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Metrics Grid */}
                    <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                        {metrics.map(metric => (
                            <div key={metric.id} className='py-5 px-5 rounded-2xl shadow-md border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 lg:h-28 transition-colors'>
                                <h1 className='text-center font-semibold text-md mb-5 text-gray-700 dark:text-gray-300'>
                                    {metric.name}
                                </h1>
                                <h1 className='text-xl text-center font-bold text-green-700 dark:text-green-400'>
                                    {metric.value}
                                </h1>
                            </div>
                        ))}
                    </div>

                    <div className='w-full grid grid-cols-1 mt-5'>
                        {death.map(d => (
                            <div key={d.id} className='py-5 px-5 rounded-3xl shadow-md bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 transition-colors'>
                                <h1 className='text-center font-semibold text-md mb-5 text-gray-700 dark:text-gray-300'>
                                    {d.name}
                                </h1>
                                <h1 className='text-xl text-center font-bold text-green-700 dark:text-green-400'>
                                    {d.value}
                                </h1>
                            </div>
                        ))}
                    </div>

                    {/* Batch Selector */}
                    <div className='w-full'>
                        <select
                            value={selectedBatch?.id || ''}
                            onChange={e => {
                                const batch = batches.find(b => b.id == e.target.value);
                                setSelectedBatch(batch); setCurrentPage(1);
                            }} 
                            className='mt-8 block w-full md:w-64 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-blue-500 transition-colors'
                        >
                            {batches.map(batch => (
                                <option key={batch.id} value={batch.id}>
                                    {batch.name}
                                </option>
                            ))}
                        </select>

                        {/* Sections Grid */}
                        <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-8'>
                            {selectedBatch?.sections?.map(section => (
                                <div key={section.id} className='w-full py-5 px-5 rounded-3xl shadow-md bg-white dark:bg-gray-800 border dark:border-gray-700'>
                                    <h1 className='text-center font-semibold text-md mb-5 text-gray-700 dark:text-gray-300'>
                                        Section {section.name}
                                    </h1>
                                    <h1 className='text-xl text-center font-bold text-green-700 dark:text-green-400'>
                                        {section.total_eggs}
                                    </h1>
                                </div>
                            ))}
                        </div>

                        {/* Table Section */}
                        <div className="bg-white dark:bg-gray-800 mt-8 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead className="bg-slate-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-4 font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Batch</th>
                                            <th className="px-6 py-4 font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Section</th>
                                            {columnName.map(cn => (
                                                <th key={cn.id} className="px-6 py-4 sm:table-cell hidden font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">{cn.name}</th>
                                            ))}
                                            <th className="px-6 py-4 table-cell sm:hidden font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                                        {currentRecords.map(record => (
                                            <tr key={record.id} className='hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300'>
                                                <td className="px-6 py-4">{selectedBatch.name}</td>
                                                <td className='px-6 py-4'>Section {record.section}</td>
                                                <td className='px-6 py-4 hidden sm:table-cell'>{new Date(record.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 hidden sm:table-cell">{record.pullet}</td>
                                                <td className="px-6 py-4 hidden sm:table-cell">{record.small}</td>
                                                <td className="px-6 py-4 hidden sm:table-cell">{record.medium}</td>
                                                <td className="px-6 py-4 hidden sm:table-cell">{record.large}</td>
                                                <td className="px-6 py-4 hidden sm:table-cell">{record.extra_large}</td>
                                                <td className="px-6 py-4 hidden sm:table-cell">{record.jumbo}</td>
                                                <td className="px-6 py-4 hidden sm:table-cell">{record.broken}</td>
                                                <td className="px-6 py-4 hidden sm:table-cell">{record.chicken_death}</td>
                                                <td className='sm:hidden px-6 py-4'>
                                                    <PrimaryButton onClick={() => openRecords(record)} className='text-[8px]'>
                                                        View Details
                                                    </PrimaryButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-3 p-6 border-t dark:border-gray-700 bg-slate-50 dark:bg-gray-900/30">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg disabled:opacity-50 transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg disabled:opacity-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Modal */}
                <Modal show={isShow} onClose={() => setIsShow(false)}>
                    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
                        <h2 className="text-lg font-bold mb-4 border-b dark:border-gray-700 pb-2">Record Details</h2>
                        {selectedRecord && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <p><strong className="text-gray-500 dark:text-gray-400">Batch:</strong> {selectedBatch.name}</p>
                                <p><strong className="text-gray-500 dark:text-gray-400">Section:</strong> {selectedRecord.section}</p>
                                <p className="col-span-2"><strong className="text-gray-500 dark:text-gray-400">Date:</strong> {new Date(selectedRecord.created_at).toLocaleDateString()}</p>
                                <div className="col-span-2 grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl">
                                    <p><strong>Pullet:</strong> {selectedRecord.pullet}</p>
                                    <p><strong>Small:</strong> {selectedRecord.small}</p>
                                    <p><strong>Medium:</strong> {selectedRecord.medium}</p>
                                    <p><strong>Large:</strong> {selectedRecord.large}</p>
                                    <p><strong>XL:</strong> {selectedRecord.extra_large}</p>
                                    <p><strong>Jumbo:</strong> {selectedRecord.jumbo}</p>
                                    <p className="text-red-500"><strong>Broken:</strong> {selectedRecord.broken}</p>
                                    <p className="text-red-600"><strong>Death:</strong> {selectedRecord.chicken_death}</p>
                                </div>
                            </div>
                        )}
                        <div className="mt-6 flex justify-end">
                            <PrimaryButton onClick={() => setIsShow(false)}>Close</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}