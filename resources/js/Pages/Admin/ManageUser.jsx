import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ManageUser({ users = [], deactivatedUsers = [] }) {
    const { flash } = usePage().props;

    const [activeTab, setActiveTab] = useState('active');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showActivateModal, setShowActivateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const displayedUsers = activeTab === 'active' ? users : deactivatedUsers;

    // Create form
    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Edit form
    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('admin.manageusers.store'), {
            onSuccess: () => {
                createForm.reset();
                setShowCreateModal(false);
            },
        });
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
        });
        editForm.clearErrors();
        setShowEditModal(true);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route('admin.manageusers.update', selectedUser.id), {
            onSuccess: () => {
                editForm.reset();
                setShowEditModal(false);
                setSelectedUser(null);
            },
        });
    };

    const openDeactivateModal = (user) => {
        setSelectedUser(user);
        setShowDeactivateModal(true);
    };

    const handleDeactivate = () => {
        router.patch(route('admin.manageusers.deactivate', selectedUser.id), {}, {
            onSuccess: () => {
                setShowDeactivateModal(false);
                setSelectedUser(null);
            },
        });
    };

    const openActivateModal = (user) => {
        setSelectedUser(user);
        setShowActivateModal(true);
    };

    const handleActivate = () => {
        router.patch(route('admin.manageusers.activate', selectedUser.id), {}, {
            onSuccess: () => {
                setShowActivateModal(false);
                setSelectedUser(null);
            },
        });
    };

    return (
        <DashboardLayout title="Manage User">
            <Head title="Manage User" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-300 dark:border-green-700 pb-1 w-max">
                            Manage User
                        </h1>
                        <p className="text-green-700 dark:text-green-200 text-sm">
                            Create new user accounts and view all existing users.
                        </p>
                    </div>
                    <button
                        onClick={() => { createForm.reset(); createForm.clearErrors(); setShowCreateModal(true); }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg shadow transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create User
                    </button>
                </div>

                {/* Success flash */}
                {flash?.success && (
                    <div className="mb-4 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 px-4 py-3 text-green-800 dark:text-green-300 text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`px-6 py-3.5 text-sm font-semibold transition-colors relative ${
                                activeTab === 'active'
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            All Users
                            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                {users.length}
                            </span>
                            {activeTab === 'active' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-t" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('deactivated')}
                            className={`px-6 py-3.5 text-sm font-semibold transition-colors relative ${
                                activeTab === 'deactivated'
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            Deactivated Users
                            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                {deactivatedUsers.length}
                            </span>
                            {activeTab === 'deactivated' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-t" />
                            )}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created At</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {displayedUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-400 dark:text-gray-500">
                                            {activeTab === 'active' ? 'No active users found.' : 'No deactivated users found.'}
                                        </td>
                                    </tr>
                                ) : (
                                    displayedUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">{user.id}</td>
                                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{user.name}</td>
                                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    user.is_active === false || user.is_active === 0
                                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                }`}>
                                                    {user.is_active === false || user.is_active === 0 ? 'Inactive' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    {activeTab === 'active' && (
                                                        <button
                                                            onClick={() => openDeactivateModal(user)}
                                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition"
                                                        >
                                                            Deactivate
                                                        </button>
                                                    )}
                                                    {activeTab === 'deactivated' && (
                                                        <button
                                                            onClick={() => openActivateModal(user)}
                                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition"
                                                        >
                                                            Activate
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ===== CREATE MODAL ===== */}
            {showCreateModal && (
                <ModalOverlay onClose={() => setShowCreateModal(false)}>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Create New User</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <FormField label="Name" error={createForm.errors.name}>
                            <input type="text" value={createForm.data.name} onChange={(e) => createForm.setData('name', e.target.value)} placeholder="Full name" />
                        </FormField>
                        <FormField label="Email" error={createForm.errors.email}>
                            <input type="email" value={createForm.data.email} onChange={(e) => createForm.setData('email', e.target.value)} placeholder="email@example.com" />
                        </FormField>
                        <FormField label="Password" error={createForm.errors.password}>
                            <input type="password" value={createForm.data.password} onChange={(e) => createForm.setData('password', e.target.value)} placeholder="Min. 8 characters" />
                        </FormField>
                        <FormField label="Confirm Password">
                            <input type="password" value={createForm.data.password_confirmation} onChange={(e) => createForm.setData('password_confirmation', e.target.value)} placeholder="Re-enter password" />
                        </FormField>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition">Cancel</button>
                            <button type="submit" disabled={createForm.processing} className="px-5 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg shadow transition">
                                {createForm.processing ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </ModalOverlay>
            )}

            {/* ===== EDIT MODAL ===== */}
            {showEditModal && selectedUser && (
                <ModalOverlay onClose={() => setShowEditModal(false)}>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Edit User</h2>
                    <form onSubmit={handleEdit} className="space-y-4">
                        <FormField label="Name" error={editForm.errors.name}>
                            <input type="text" value={editForm.data.name} onChange={(e) => editForm.setData('name', e.target.value)} />
                        </FormField>
                        <FormField label="Email" error={editForm.errors.email}>
                            <input type="email" value={editForm.data.email} onChange={(e) => editForm.setData('email', e.target.value)} />
                        </FormField>
                        <FormField label="Password (leave blank to keep current)" error={editForm.errors.password}>
                            <input type="password" value={editForm.data.password} onChange={(e) => editForm.setData('password', e.target.value)} placeholder="New password (optional)" />
                        </FormField>
                        <FormField label="Confirm Password">
                            <input type="password" value={editForm.data.password_confirmation} onChange={(e) => editForm.setData('password_confirmation', e.target.value)} placeholder="Re-enter new password" />
                        </FormField>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition">Cancel</button>
                            <button type="submit" disabled={editForm.processing} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow transition">
                                {editForm.processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </ModalOverlay>
            )}

            {/* ===== DEACTIVATE CONFIRMATION MODAL ===== */}
            {showDeactivateModal && selectedUser && (
                <ModalOverlay onClose={() => setShowDeactivateModal(false)}>
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 dark:text-red-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Are you sure to Deactivate it?</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            This will deactivate <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedUser.name}</span>'s account.
                        </p>
                        <div className="flex justify-center gap-3">
                            <button onClick={() => setShowDeactivateModal(false)} className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition">Cancel</button>
                            <button onClick={handleDeactivate} className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow transition">Deactivate</button>
                        </div>
                    </div>
                </ModalOverlay>
            )}

            {/* ===== ACTIVATE CONFIRMATION MODAL ===== */}
            {showActivateModal && selectedUser && (
                <ModalOverlay onClose={() => setShowActivateModal(false)}>
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600 dark:text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Are you sure to Activate it?</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            This will reactivate <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedUser.name}</span>'s account.
                        </p>
                        <div className="flex justify-center gap-3">
                            <button onClick={() => setShowActivateModal(false)} className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition">Cancel</button>
                            <button onClick={handleActivate} className="px-5 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow transition">Activate</button>
                        </div>
                    </div>
                </ModalOverlay>
            )}
        </DashboardLayout>
    );
}

/* ===== Reusable Components ===== */

function ModalOverlay({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md mx-4 z-10">
                {children}
            </div>
        </div>
    );
}

function FormField({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            {React.cloneElement(children, {
                className: 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:ring-green-500 focus:border-green-500',
            })}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
