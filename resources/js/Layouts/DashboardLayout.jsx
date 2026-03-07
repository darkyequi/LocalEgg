import React, { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

export default function DashboardLayout({ children, title }) {
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

    const { auth } = usePage().props;
    const user = auth.user;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const userRole = user?.role;

    const userNav = [
        { name: 'Homepage', href: 'user.homepage' },
        { name: 'Manage Egg', href: 'user.manageegg' },
    ];

    const adminNav = [
        { name: 'Dashboard', href: 'admin.dashboard' },
        { name: 'Records', href: 'admin.records' },
        { name: 'Create Batches', href: 'admin.createbatch' },
    ];

    const superAdminNav = [
        { name: 'Dashboard', href: 'superadmin.dashboard' },
        { name: 'History', href: 'superadmin.history' },
    ];

    const navigation =
        userRole === 'superadmin'
            ? superAdminNav
            : userRole === 'admin'
                ? adminNav
                : userNav;

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

            {/* MOBILE OVERLAY */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed h-screen inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:static flex flex-col`}
            >

                {/* LOGO */}
                <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <Link href={route(`${userRole}.dashboard`)}>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Local</span>
                    </Link>

                    <button
                        className="lg:hidden text-gray-500 dark:text-gray-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigation.map((item) => (
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
                <header className="min-h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors">

                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-gray-500 dark:text-gray-400"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>

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
                        
                        {/* USER DROPDOWN */}
                        <div className="relative">
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

                {/* PAGE CONTENT */}
                <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900 transition-colors">
                    {children}
                </main>

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