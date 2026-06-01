import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function Dashboard({ totalsByYear = [], batches = [], monthlyData = [] }) {

    const currentYear = new Date().getFullYear();

    // Years + All option
    const years = ["all", ...Array.from({ length: 6 }, (_, i) => currentYear - i)];

    const [selectedYear, setSelectedYear] = useState("all");

    /*
    |--------------------------------------------------------------------------
    | Totals based on selected year
    |--------------------------------------------------------------------------
    */

    const totals = useMemo(() => {

        const base = {
            total_eggs: 0,
            pullet: 0,
            small: 0,
            medium: 0,
            large: 0,
            extra_large: 0,
            jumbo: 0,
            broken: 0,
            chicken_death: 0
        };

        if (selectedYear === "all") {

            return totalsByYear.reduce((acc, item) => {

                acc.total_eggs += Number(item.total_eggs || 0);
                acc.pullet += Number(item.pullet || 0);
                acc.small += Number(item.small || 0);
                acc.medium += Number(item.medium || 0);
                acc.large += Number(item.large || 0);
                acc.extra_large += Number(item.extra_large || 0);
                acc.jumbo += Number(item.jumbo || 0);
                acc.broken += Number(item.broken || 0);
                acc.chicken_death += Number(item.chicken_death || 0);

                return acc;

            }, base);

        }

        const found = totalsByYear.find(t => String(t.year) === String(selectedYear));

        return found || base;

    }, [selectedYear, totalsByYear]);



    /*
    |--------------------------------------------------------------------------
    | Chart Data
    |--------------------------------------------------------------------------
    */

    const chartData = useMemo(() => {

        const months = [
            'Jan','Feb','Mar','Apr','May','Jun',
            'Jul','Aug','Sep','Oct','Nov','Dec'
        ];

        let filtered = monthlyData;

        if (selectedYear !== "all") {
            filtered = monthlyData.filter(
                d => String(d.year) === String(selectedYear)
            );
        }

        return months.map(month => {

            const total = filtered
                .filter(d => d.month === month)
                .reduce((sum, item) => sum + Number(item.total || 0), 0);

            return {
                name: month,
                total
            };

        });

    }, [selectedYear, monthlyData]);



    /*
    |--------------------------------------------------------------------------
    | Metrics
    |--------------------------------------------------------------------------
    */

    const metrics = [
        { id: 1, name: 'Total Eggs', value: totals.total_eggs },
        { id: 2, name: 'Total Pullet', value: totals.pullet },
        { id: 3, name: 'Total Small', value: totals.small },
        { id: 4, name: 'Total Medium', value: totals.medium },
        { id: 5, name: 'Total Large', value: totals.large },
        { id: 6, name: 'Total XL', value: totals.extra_large },
        { id: 7, name: 'Total Jumbo', value: totals.jumbo },
        { id: 8, name: 'Total Broken', value: totals.broken },
    ];



    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >

            <Head title="Dashboard" />

            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-extrabold text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-300 dark:border-green-700 pb-1 w-max">
                            Dashboard
                        </h1>
                        <p className="text-green-700 dark:text-green-200 text-sm">
                            Overview of egg production and batch performance. Filter by year to analyze monthly trends.
                        </p>
                    </div>
                    {/* Top Metrics */}
                    <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>

                        {metrics.map(metric => (

                            <div
                                key={metric.id}
                                className='py-5 px-5 rounded-2xl shadow-md border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
                            >

                                <h1 className='text-center font-semibold text-sm mb-3 text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                                    {metric.name}
                                </h1>

                                <h1 className='text-2xl text-center font-bold text-green-700 dark:text-green-400'>
                                    {metric.value.toLocaleString()}
                                </h1>

                            </div>

                        ))}

                    </div>



                    
                    {/* Bottom Cards */}
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>

                        <div className='py-5 px-5 rounded-3xl shadow-md bg-white dark:bg-gray-800 text-center'>

                            <h1 className='font-semibold text-md mb-3 text-gray-700 dark:text-gray-300 uppercase'>
                                Total Batches
                            </h1>

                            <h1 className='text-3xl font-bold text-green-700 dark:text-green-400'>
                                {batches.length}
                            </h1>

                        </div>



                        <div className='py-5 px-5 rounded-3xl shadow-md bg-white dark:bg-gray-800 text-center'>

                            <h1 className='font-semibold text-md mb-3 text-gray-700 dark:text-gray-300 uppercase'>
                                Total Death
                            </h1>

                            <h1 className='text-3xl font-bold text-red-600 dark:text-red-400'>
                                {totals.chicken_death.toLocaleString()}
                            </h1>

                        </div>

                    </div>
                    


                    {/* Graph */}
                    <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-gray-700">

                        <div className="flex justify-between items-center mb-6">

                            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                                Monthly Egg Production
                            </h3>

                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-gray-50 border pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >

                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year === "all" ? "All Years" : year}
                                    </option>
                                ))}

                            </select>

                        </div>



                        <div className="h-[300px] w-full">

                            <ResponsiveContainer width="100%" height="100%">

                                <BarChart data={chartData}>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#374151"
                                        opacity={0.1}
                                    />

                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    />

                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{
                                            borderRadius: '10px',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />

                                    <Bar dataKey="total" radius={[4,4,0,0]}>

                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={entry.total > 0 ? '#15803d' : '#e5e7eb'}
                                            />
                                        ))}

                                    </Bar>

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>



                </div>
                
            </div>

        </AuthenticatedLayout>
    );
}