import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

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
    return (
        <DashboardLayout
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
                </div>
            </div>
        </DashboardLayout>
    );
}
