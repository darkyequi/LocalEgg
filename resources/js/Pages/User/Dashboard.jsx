import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({ totals, batches }) {
    // We use a variety of green shades to create visual interest
    const metrics = [
        { id: 1, name: 'Total Eggs', value: totals?.total_eggs || 0, bg: 'bg-emerald-600', text: 'text-white', label: 'text-emerald-100' },
        { id: 2, name: 'Pullet', value: totals?.pullet || 0, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
        { id: 3, name: 'Small', value: totals?.small || 0, bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' },
        { id: 4, name: 'Medium', value: totals?.medium || 0, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
        { id: 5, name: 'Large', value: totals?.large || 0, bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' },
        { id: 6, name: 'XL', value: totals?.extra_large || 0, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
        { id: 7, name: 'Jumbo', value: totals?.jumbo || 0, bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' },
        { id: 8, name: 'Broken', value: totals?.broken || 0, bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-200' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-emerald-900 dark:text-emerald-100">
                    Farm Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 dark:bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className='mb-10 border-l-4 border-emerald-500 pl-4'>
                        <h1 className='text-3xl font-extrabold text-gray-900 dark:text-white'>
                            Farm Overview
                        </h1>
                        <p className='text-gray-500 dark:text-gray-400 mt-1 font-medium'>
                            Monitoring production efficiency and flock health.
                        </p>
                    </div>

                    {/* Main Metrics Grid */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6'>
                        {metrics.map(metric => (
                            <div 
                                key={metric.id} 
                                className={`${metric.bg} ${metric.border || 'border-transparent'} border-2 p-5 rounded-3xl shadow-sm transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700`}
                            >
                                <h3 className={`text-xs font-bold uppercase tracking-widest ${metric.label || 'text-emerald-600/70 dark:text-emerald-400/70'}`}>
                                    {metric.name}
                                </h3>
                                <p className={`text-2xl lg:text-3xl font-black mt-2 ${metric.text} dark:text-white`}>
                                    {metric.value.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Secondary Metrics Section */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
                        
                        {/* Total Batch Card */}
                        <div className='relative overflow-hidden p-8 rounded-[2rem] bg-emerald-900 text-white shadow-xl'>
                            {/* Decorative background element */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-800 rounded-full opacity-50" />
                            
                            <h3 className='text-emerald-300 font-bold text-sm uppercase tracking-[0.2em] relative z-10'>
                                Active Batches
                            </h3>
                            <p className='text-6xl font-black mt-4 relative z-10'>
                                {batches.length}
                            </p>
                            <p className='mt-2 text-emerald-400 text-sm font-medium italic relative z-10'>Currently in production</p>
                        </div>

                        {/* Death Metrics Card */}
                        <div className='p-8 rounded-[2rem] bg-emerald-50 dark:bg-gray-800 border-2 border-dashed border-emerald-200 dark:border-emerald-900/50'>
                            <h3 className='text-emerald-800 dark:text-emerald-400 font-bold text-sm uppercase tracking-[0.2em]'>
                                Total Losses
                            </h3>
                            <div className='flex items-baseline gap-2 mt-4'>
                                <p className='text-6xl font-black text-emerald-950 dark:text-white'>
                                    {totals?.chicken_death || 0}
                                </p>
                                <span className='text-emerald-600 font-bold text-lg'>birds</span>
                            </div>
                            <div className="mt-4 h-2 w-full bg-emerald-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-600 w-1/3 opacity-50"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}