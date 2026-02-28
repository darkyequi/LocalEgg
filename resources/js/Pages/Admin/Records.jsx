import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Records(params) {
    return (
        <DashboardLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Records
                </h2>
            }
        >
            <Head title="Records" />
            <div className="py-12">
                <h1>Records</h1>
            </div>
        </DashboardLayout>
    );    
};
