import { Link, usePage, router } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { useState, useEffect } from 'react';
import footerlogo from '../../../public/images/footerlogo.png';

export default function AuthenticatedLayout({ header, children, title }) {
    // --- Dark Mode Logic ---
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);
    // -----------------------

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['batches'],
                preserveScroll: true,
                preserveState: true,
            });
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const user = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isUser = [
        { name: 'Homepage', href: 'user.homepage' },
        { name: 'Inventory', href: 'user.manageegg' },
    ];
    const isAdmin = [
        { name: 'Dashboard', href: 'admin.dashboard' },
        { name: 'Records', href: 'admin.records' },
        { name: 'Create Batches', href: 'admin.createbatch' },
    ];
    const isSuperAdmin = [
        { name: 'Dashboard', href: 'superadmin.dashboard' },
        { name: 'History', href: 'superadmin.history' },
    ];

    const navigationLinks = user.role === 'superadmin' ? isSuperAdmin : user.role === 'admin' ? isAdmin : isUser;

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">


            {/* SIDEBAR */}
            <aside
                className={'fixed hidden sm:flex h-screen inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 lg:static flex-col'}
            >

                {/* LOGO */}
                <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <Link href={route('user.homepage')}>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Local</span>
                    </Link>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigationLinks.map((item) => (
                        <NavLink
                            key={item.name}
                            href={route(item.href)}
                            active={route().current(item.href)}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">

                {/* HEADER */}
                <header className="min-h-16 hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sm:flex items-center justify-between px-6 transition-colors">

                    <div className="flex items-center gap-4">
                        <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* THEME TOGGLE BUTTON */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            {isDark ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                            )}
                        </button>
                        <div className="relative hidden sm:block">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-gray-800 py-2 px-2 text-sm font-medium leading-4 text-gray-500 dark:text-gray-400 transition duration-150 ease-in-out hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {header && (
                    <header className="sm:hidden bg-white dark:bg-gray-800 shadow sticky top-0 z-40">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                {navigationLinks.map((item) => (
                                    <NavLink key={item.name} href={route(item.href)} active={route().current(item.href)}>
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <button
                                        onClick={() => window.history.back()}
                                        className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 sm:hidden"
                                        aria-label="Go back"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                        </svg>
                                    </button>
                                    <h1 className="sm:hidden text-lg font-bold text-gray-800 dark:text-gray-200">{header}</h1>
                                </div>
                                <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 sm:hidden">
                                    {isDark ? '☀️' : '🌙'}
                                </button>
                            </div>
                        </div>
                    </header>
                )}

                {/* PAGE CONTENT */}
                <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900 transition-colors">
                    {children}
                </main>

                {/* Mobile Bottom Navigation */}
                <footer className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <div className="bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center transition-colors">
                            <div className="bg-white dark:bg-gray-800 w-15 h-15 rounded-full shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
                                <Link href={route('user.homepage')}>
                                    <img src={footerlogo} alt="Logo" className="w-12 h-12 object-contain rounded-full hover:scale-110 transition-transform duration-200" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid h-full w-full grid-cols-4 mx-auto">
                        <Link href={route('user.homepage')} className={`inline-flex flex-col items-center justify-center px-2 ${route().current('user.homepage') ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span className="text-[10px] font-medium uppercase">Home</span>
                        </Link>

                        <Link href={route('user.manageegg')} className={`inline-flex flex-col items-center justify-center px-2 ${route().current('user.manageegg') ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            <span className="text-[10px] font-medium uppercase">Inventory</span>
                        </Link>

                        <Link href={route('profile.edit')} className={`inline-flex flex-col items-center justify-center px-2 ${route().current('profile.edit') ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-[10px] font-medium uppercase">Profile</span>
                        </Link>

                        <Link method="post" href={route('logout')} as="button" className="inline-flex flex-col items-center justify-center px-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                            </svg>
                            <span className="text-[10px] font-medium uppercase">Logout</span>
                        </Link>
                    </div>
                </footer>

                {/* Desktop Footer */}
                <footer className="hidden md:block bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto transition-colors">
                    <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} <span className="text-green-600 dark:text-green-400 font-semibold">Egg Management System</span>. All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    );
}
function NavLink({ href, active, children, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block px-4 py-3 rounded-lg transition
                ${active
                    ? 'bg-green-500 text-white font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}
        >
            {children}
        </Link>
    );
}