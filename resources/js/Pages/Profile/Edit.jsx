import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {

    const { auth } = usePage().props;
    const role = auth.user.role;

    // Choose layout based on role
    const Layout = role === 'admin'
        ? DashboardLayout
        : AuthenticatedLayout;

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile Information Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow sm:rounded-lg sm:p-8 transition-colors duration-200">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Update Password Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow sm:rounded-lg sm:p-8 transition-colors duration-200">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Delete Account Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow sm:rounded-lg sm:p-8 transition-colors duration-200">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}