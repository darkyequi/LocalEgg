import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Inventory(params) {
    return (
        <AuthenticatedLayout>
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inventory
                </h2>
            }
            <div>
                <h1>Inventory</h1>
            </div>
        </AuthenticatedLayout>
    );
};
