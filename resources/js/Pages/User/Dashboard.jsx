import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';
import itlog from '../../../../public/images/itlog.gif';
import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
const batches = [
    {
        id: 1,
        name: 'Batch 1',
        section: [
            {id: 1, name: 'Section 1'},
        ]
    },
    {
        id: 2,
        name: 'Batch 2',
        section: [
            {id: 1, name: 'Section 1'},
            {id: 2, name: 'Section 2'},
            {id: 3, name: 'Section 3'},
        ]
    },
    {
        id: 3,
        name: 'Batch 3',
    },
    {
        id: 4,
        name: 'Batch 4',
    },
]



const usermetrics = [
    {
        id: 1,
        name: 'Total User',
        value: 500,
    },
    
    {
        id: 2,
        name: 'Total Batches',
        value: 200,
    },
]
const metrics = [
    {
        id: 1,
        name: 'Total Eggs',
        value: 300,
    },
    {
        id: 2,
        name: 'Total Pullet',
        value: 500,
    },
    {
        id: 3,
        name: 'Total Small',
        value: 300,
    },
    {
        id: 4,
        name: 'Total Medium',
        value: 200,
    },
    {
        id: 5,
        name: 'Total Large',
        value: 100,
    },
    {
        id: 6,
        name: 'Total XL',
        value: 50,
    },
    {
        id: 7,
        name: 'Total Jumbo',
        value: 10,
    },
    {
        id: 8,
        name: 'Total Broken',
        value: 5,
    }
]   

export default function Dashboard() {
    const [isShow, setIsShow] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const openModal = (batch) => {
            setSelectedBatch(batch);
            setIsShow(true);
        }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inventory Management
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
                            {usermetrics.map(usermetric => (
                                <div key={usermetric.id} className='py-5 px-5 rounded-3xl shadow-md'>
                                    <h1 className='text-center font-semibold text-md mb-5'>
                                        {usermetric.name}
                                    </h1>
                                    <div>
                                        <h1 className='text-xl text-center font-bold text-green-700'>
                                            {usermetric.value}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className=' w-full mt-8 flex flex-col flex-wrap justify-center'>
                            <h1 className='text-center text-green-700 text-6xl font-semibold'>Batches</h1>
                            <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8'>
                                {batches.map(batch => (
                                <div key ={batch.id}className='py-7 px-7 rounded-3xl shadow-md border-2'>
                                    <div className=''>
                                        <h1 className='text-center font-semibold text-4xl mb-5'>
                                            {batch.name}
                                        </h1>
                                        <div className='flex flex-col items-center'>
                                            <img src={itlog} alt='itlog' className='w-40 h-40 mb-5'/>
                                            <PrimaryButton onClick={() => openModal(batch)}>
                                                Enter a Record
                                            </PrimaryButton>
                                        </div>
                                        
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                </div>
                    <Modal show={isShow} onClose={() => setIsShow(false)}>
                        <div className="p-7">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-semibold mb-4">{selectedBatch ? selectedBatch.name : 'Batch Name'}</h1>
                                <h1 onClick={() => setIsShow(false)} className="cursor-pointer">x</h1>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                {selectedBatch && selectedBatch.section ? (
                                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 rounded-2xl  shadow-md sm:max-w-md sm:rounded-lg max-h-[70vh] overflow-y-auto">
                                    <form action="">
                                        {selectedBatch.section.map(section => ( 
                                            <div className="mb-4">
                                                <h1 key={section.id} className="block text-gray-700 font-bold mb-2">{selectedBatch.name} - {section.name}</h1>
                                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                                                <div className='mb-4'>
                                                    <label htmlFor="eggs" className="block text-gray-700 font-bold mb-2">Eggs Pullet:</label>
                                                    <input type="number" id="eggs" name="eggs" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                </div>
                                                <div className='mb-4'>
                                                    <label htmlFor="small" className="block text-gray-700 font-bold mb-2">Small Eggs:</label>
                                                    <input type="number" id="small" name="small" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                </div>
                                                <div className='mb-4'>
                                                    <label htmlFor="medium" className="block text-gray-700 font-bold mb-2">Medium Eggs:</label>
                                                    <input type="number" id="medium" name="medium" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                </div>
                                                <div className='mb-4'>
                                                    <label htmlFor="large" className="block text-gray-700 font-bold mb-2">Large Eggs:</label>
                                                    <input type="number" id="large" name="large" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                </div>
                                                <div className='mb-4'>
                                                    <label htmlFor="xl" className="block text-gray-700 font-bold mb-2">XL Eggs:</label>
                                                    <input type="number" id="xl" name="xl" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                </div>
                                                <div className='mb-4'>
                                                    <label htmlFor="jumbo" className="block text-gray-700 font-bold mb-2">Jumbo Eggs:</label>
                                                    <input type="number" id="jumbo" name="jumbo" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                </div>
                                                <div className='mb-4'>
                                                    <label htmlFor="broken" className="block text-gray-700 font-bold mb-2">Broken Eggs:</label>
                                                    <input type="number" id="broken" name="broken" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        ))} 
                                        <div className="flex justify-center gap-4 sm:justify-end">
                                            <PrimaryButton type="submit">
                                                Save
                                            </PrimaryButton>
                                            <SecondaryButton onClick={() => setIsShow(false)}>
                                                Cancel
                                            </SecondaryButton>
                                        </div>   
                                    </form> 
                                     
                                </div>
                                ) : (
                                    <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 rounded-2xl  shadow-md sm:max-w-md sm:rounded-lg">
                                        <h1>No batch selected yet</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
