import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div >
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex justify-between gap-2 py-5">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <ApplicationLogo className="w-16 h-16" />
                            </div>
                            <nav className="-mx-3 gap-2 flex flex-1 items-center justify-end">
                                {auth.user ? (
                                    auth.user.role === "superadmin" ? (
                                        <Link href={route('superadmin.dashboard')}>
                                            Superadmin Dashboard
                                        </Link>
                                    ) : auth.user.role === "admin" ? (
                                        <Link href={route('admin.dashboard')}>
                                            Admin Dashboard
                                        </Link>
                                    ) : (
                                        <Link href={route('user.homepage')}>
                                            User Dashboard
                                        </Link>
                                    )
                                ) : (
                                    <>
                                        <div className='p-2 rounded-xl'>
                                            <Link
                                                href={route('login')}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-green-700 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                        </div>
                                        <div className='p-2 bg-green-600 rounded-xl hover:bg-green-700'>
                                            <Link
                                                href={route('register')}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className='font-semibold text-6xl text-center'>
                                    The smart way to
                                    <br />
                                    <span className="text-green-600">
                                        manage egg inventory.
                                    </span>
                                </h1>
                                <p className='text-center mt-6 text-lg dark:text-gray-500 lg:px-40 lg:mx-40'>
                                    From daily egg collection to stock monitoring and freshness control, manage everything effortlessly and stay ahead of demand.                                
                                </p>
                               <button className='my-4'>
                                    <Link
                                        href={route('register')}
                                        className="mt-6 rounded-md bg-green-600 px-5 py-3 text-lg text-white transition hover:bg-green-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-green-500 dark:hover:bg-green-600 dark:focus-visible:ring-white"
                                    >
                                        Get Started
                                    </Link>
                               </button>
                            </div>
                            <div className='flex gap-6 mt-20 flex-wrap justify-center lg:justify-start'>
                                <div className='flex-1 h-auto rounded-[60px] shadow-md p-5 bg-green-600'>
                                    Hello
                                </div>
                                <div className=' flex flex-col gap-3 w-1/2 lg:w-2/5'>
                                        <div className='bg-yellow-500 rounded-[50px] w-full h-80 flex items-center justify-center' id='background'>
                                            <h1>
                                                Dashboard
                                            </h1>
                                        </div>
                                    <div className='flex gap-3'>
                                        <div className='bg-yellow-500 rounded-[40px] w-auto h-64 flex items-center justify-center lg:w-full' id='screenshot-container'>
                                            <h1>
                                                Record
                                            </h1>
                                        </div> 
                                        <div className='bg-yellow-500 rounded-[40px] w-auto h-64 flex items-center justify-center lg:w-3/4' id='screenshot-container'>
                                            <h1>
                                                Record
                                            </h1>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
