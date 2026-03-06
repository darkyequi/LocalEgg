import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function DashboardLayout({ children, title }) {

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
        <div className="flex min-h-screen bg-gray-100">

            {/* MOBILE OVERLAY */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:static flex flex-col`}
            >

                {/* LOGO */}
                <div className="p-6 flex justify-between items-center border-b">
                    <Link href={route(`${userRole}.dashboard`)}>
                        <span className="text-xl font-bold">EggTrack</span>
                    </Link>

                    <button
                        className="lg:hidden"
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

                {/* PROFILE */}
                <div className="p-4 border-t bg-gray-50">

                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border hover:border-orange-400"
                    >

                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="text-sm font-semibold">
                                {user?.name}
                            </p>

                            <p className="text-xs text-orange-500 uppercase font-bold">
                                {userRole}
                            </p>
                        </div>

                    </Link>

                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">

                {/* HEADER */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6">

                    <div className="flex items-center gap-4">

                        <button
                            className="lg:hidden"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            ☰
                        </button>

                        <h1 className="font-bold text-lg">
                            {title}
                        </h1>

                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-red-500 font-semibold"
                    >
                        Logout
                    </Link>

                </header>

                {/* PAGE CONTENT */}
                <main className="p-6 flex-1">
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
                    ? 'bg-orange-500 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-200'}
            `}
        >
            {children}
        </Link>
    );
}