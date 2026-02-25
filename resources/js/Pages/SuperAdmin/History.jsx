import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function History() {
    return (
        <AuthenticatedLayout>
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    History
                </h2>
            }
            <div>
                <h1>History</h1>
            </div>
        </AuthenticatedLayout>
    );
};
