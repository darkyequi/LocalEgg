import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center px-7 justify-center bg-gray-100 pt-6 md:justify-center md:pt-0">

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 rounded-2xl  shadow-md sm:max-w-md sm:rounded-lg">
                <div className='flex justify-center'>
                    <Link href="/">
                        <ApplicationLogo className=" w-40 h-30 mb-10 text-gray-500" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
