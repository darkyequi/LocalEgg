import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import welcome from '../../../public/images/welcome.png';


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
                    <div className="relative w-full px-6 lg:max-w-7xl">
                        <header className="flex justify-between gap-2 py-5">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <ApplicationLogo className="w-26 h-16" />
                            </div>
                            <nav className="-mx-3 gap-1 flex flex-1 items-center justify-end">
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
                                <h1 className='font-semibold text-4xl md:text-6xl text-center'>
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
                            <div className='flex gap-6 w-full mt-20 flex-wrap justify-center md:justify-start'>
                                <div className='w-full  bg-[url("images/background-nest.png")] md:bg-auto flex-1 h-[600px] rounded-[60px] shadow-md p-5 justify-start items-center border-2 md:w-3/5 md:h-auto'>
                                    <h1 className='md:text-4xl text-xl font-semibold p-5 text-green-800'>Innovate your Poultry Farm</h1>
                                    <div className='place-items-center overflow-hidden md:flex md:flex-col md:mt-7 md:gap-5'>
                                        <img src={welcome} alt="Welcome" className=" w-44 h-44 rounded-[60px] md:w-52 md:h-52 lg:w-72 lg:h-72 "></img>
                                        <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. At consectetur delectus repellat ullam, recusandae consequuntur ducimus incidunt illo quia veniam fugit id quaerat doloribus architecto officia exercitationem ea? Cumque, dolorum!Improve your poultry farm operations with our smart inventory management system.</p>
                                    </div>
                                </div>
                                <div className='w-full flex flex-2 flex-col gap-3 md:w-2/5'>
                                        <div className='items-center justify-center text-white bg-green-500 bg-opacity-90 rounded-[50px] w-full h-64 shadow-md border-2 p-7 md:h-80'>
                                            <ApplicationLogo className="w-34 h-24 mx-auto hidden sm:block"/>
                                            <h1 className='text-3xl font-semibold'>
                                                <a href="" className='text-4xl sm:text-3xl'><i class="fa-solid fa-egg"></i></a> Inventory Management
                                            </h1>
                                            <br />
                                            <p className=''>Track and manage your egg inventory with ease. Help grow your poultry business efficiently.</p>
                                        </div>
                                    <div className='flex flex-wrap gap-3 md:flex-nowrap'>
                                        <div className='bg-green-800 rounded-[40px] text-white w-full h-48 p-7 items-center justify-center md:w-full md:h-64'>
                                            <h1 className='text-3xl font-semibold'>
                                                <a href=""><i class="fa-regular fa-clipboard"></i></a><br />Record
                                            </h1>
                                            <p>Record your daily egg inventory details.</p>
                                        </div> 
                                        <div className='bg-green-200 rounded-[40px] w-full h-48 p-7 items-center justify-center md:w-2/3 md:h-64'>
                                            <h1 className='text-3xl font-semibold'>
                                                <a href=""><i class="fa-solid fa-chart-simple"></i></a><br />Metrics
                                            </h1>
                                            <p>View and analyze your egg inventory data.</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black">
                            @LocalEgg 2026. All rights reserved.
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
