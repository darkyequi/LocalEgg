import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';
import itlog from '../../../../public/images/itlog.gif';

const batches = [
    {
        id: 1,
        name: 'Batch 1',
    },
    {
        id: 2,
        name: 'Batch 2',
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

export default function Inventory() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inventory Management
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className='flex flex-col my-12 flex-wrap justify-center'>
                <h1 className='text-center text-green-700 text-4xl font-semibold'></h1>
                <div className='flex w-full flex-wrap justify-center gap-10 mt-10'>
                    {batches.map(batch => (
                    <div key ={batch.id}className='py-7 px-7 rounded-3xl shadow-md w-80 h-96 border-2'>
                        <div className=''>
                            <h1 className='text-center font-semibold text-4xl mb-5'>
                                {batch.name}
                            </h1>
                            <div className='flex flex-col items-center'>
                                <img src={itlog} alt='itlog' className='w-40 h-40 mb-5'/>
                                <PrimaryButton className=''>
                                    Enter a Record
                                </PrimaryButton>
                            </div>
                            
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
