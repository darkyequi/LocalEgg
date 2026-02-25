import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';


export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className='flex my-12 flex-wrap justify-center lg:justify-start gap-10'>
                <div className='py-7 px-7 rounded-3xl shadow-md w-96 h-96 border-2'>
                    <div className=''>
                        <h1 className='text-center'>
                            Local Egg
                        </h1>
                        <div className='flex flex-col items-center'>
                            <ApplicationLogo className='w-40 h-40 my-5'></ApplicationLogo>
                            <PrimaryButton className=''>
                                View
                            </PrimaryButton>
                        </div>
                        
                    </div>
                    <div className='items-center'>
                        <PrimaryButton className='bg-green-600'>
                            Save
                        </PrimaryButton>
                    </div>
                </div>
               
                
            </div>
        </AuthenticatedLayout>
    );
}
