import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import itlog from '../../../../public/images/itlog.gif';

export default function ManageEgg({ batches }) {
    const [isShow, setIsShow] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const isShowSuccessModal = () => {
        setIsSuccessModal(true);
        setTimeout(() => {
            setIsSuccessModal(false);
        }, 2000);
    }

    const recordForm = [
        { id: 1, label: 'Egg Pullet:', field: 'pullet', placeholder: "enter pullet" },
        { id: 2, label: 'Egg Small:', field: 'small', placeholder: 'enter small' },
        { id: 3, label: 'Egg Medium:', field: 'medium', placeholder: 'enter medium' },
        { id: 4, label: 'Egg Large:', field: 'large', placeholder: 'enter large' },
        { id: 5, label: 'Egg Extra Large:', field: 'extra_large', placeholder: 'enter extra large' },
        { id: 6, label: 'Egg Jumbo:', field: 'jumbo', placeholder: 'enter jumbo' },
        { id: 7, label: 'Egg Broken: ', field: 'broken', placeholder: 'enter broken' },
        { id: 8, label: 'Chicken Death: ', field: 'chicken_death', placeholder: 'enter death' },
    ]

    const getSectionLetters = (count) => {
        const letters = [];
        const limit = Math.min(count, 26);
        for (let i = 0; i < limit; i++) {
            letters.push(String.fromCharCode(65 + i));
        }
        return letters;
    };

    const openModal = (batch) => {
        setSelectedBatch(batch);
        setIsEdit(false);
        setData({ name: batch.name, sections: {} });
        setIsShow(true);
    };

    const openEditModal = (batch) => {
        setSelectedBatch(batch);
        setIsEdit(true);
        setData({ name: batch.name, sections: batch.sections || {} });
        setIsShow(true);
    };

    const { data, setData, put, post, processing } = useForm({
        name: "",
        sections: {},
    });

    const submit = (e) => {
        e.preventDefault();
        if (!selectedBatch) return;

        if(isEdit){
            put(route("user.manageegg.update", selectedBatch.id),{
                onSuccess: () => {
                    setIsShow(false);
                    isShowSuccessModal();
                }
            })
        } else {
            post(route("user.manageegg.store", selectedBatch.id), {
                onSuccess: () => {
                    setIsShow(false);
                    setSelectedBatch(null);
                    isShowSuccessModal();
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manage Eggs
                </h1>
            }
        >
            <Head title="Create Batch" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...batches]
                            .sort((a, b) => Number(a.name.replace(/\D/g, "")) - Number(b.name.replace(/\D/g, "")))
                            .map(batch => (
                                <div key={batch.id} className='py-5 px-5 rounded-3xl shadow-md border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200'>
                                    <h1 className='text-center font-semibold text-xl sm:text-4xl mb-5 truncate text-gray-800 dark:text-gray-100'>
                                        {batch.name}
                                    </h1>
                                    <div className='flex flex-col items-center'>
                                        <img src={itlog} alt='itlog' className='w-20 h-20 sm:w-40 sm:h-40 mb-5' />
                                        {batch.manage_eggs_count > 0 ? (
                                            <div className="flex flex-col gap-2 w-full px-2">
                                                <PrimaryButton disabled className="justify-center rounded-[80px] text-[10px] sm:text-xs bg-green-500 hover:bg-green-500 opacity-100">
                                                    Saved
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    onClick={() => openEditModal(batch)}
                                                    className="justify-center rounded-[80px] text-[10px] sm:text-xs dark:bg-gray-700 dark:text-white"
                                                >
                                                    Edit Record
                                                </PrimaryButton>
                                            </div>
                                        ) : (
                                            <PrimaryButton
                                                onClick={() => openModal(batch)}
                                                className="justify-center rounded-[80px] text-[10px] sm:text-xs"
                                            >
                                                Enter a Record
                                            </PrimaryButton>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Create/Edit Modal */}
                    <Modal show={isShow} onClose={() => setIsShow(false)}>
                        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between border-b-2 border-gray-100 dark:border-gray-700">
                                <h1 className="text-2xl font-semibold mb-4 pt-7 pl-7">
                                    {isEdit ? 'Update Record' : 'Create Record'}
                                </h1>
                                <h1 onClick={() => setIsShow(false)} className="cursor-pointer pt-7 pr-7 text-2xl">&times;</h1>
                            </div>
                            <div className="w-full p-7">
                                <form onSubmit={submit}>
                                    <div className="mb-4 max-h-[60vh] overflow-y-auto px-2">
                                        {selectedBatch && getSectionLetters(Number(selectedBatch.section)).map(letter => (
                                            <div key={letter} className="mb-8 border-b dark:border-gray-700 pb-4 last:border-0">
                                                <h1 className="block text-green-600 dark:text-green-400 font-bold mb-4 text-lg">
                                                    {selectedBatch.name} Section {letter}
                                                </h1>
                                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                                                    {recordForm.map(forms => (
                                                        <div key={forms.id} className='mb-4'>
                                                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                                                                {forms.label}
                                                            </label>
                                                            <input 
                                                                type="number" 
                                                                value={data.sections?.[letter]?.[forms.field] || ""} 
                                                                onChange={(e) => { setData("sections", { ...data.sections, [letter]: { ...data.sections?.[letter], [forms.field]: e.target.value } }); }} 
                                                                placeholder={forms.placeholder} 
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500" 
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-center mt-6">
                                        <PrimaryButton type="submit" disabled={processing} className="px-12 py-3">
                                            {isEdit ? 'Update' : 'Save'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>

                    {/* Success Modal */}
                    <Modal show={isSuccessModal} onClose={() => setIsSuccessModal(false)}>
                        <div className="bg-white dark:bg-gray-800 p-10 flex flex-col items-center justify-center rounded-2xl">
                            <h1 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400 uppercase">
                                Saved Successfully!
                            </h1>
                            <img src={itlog} alt="Success" className="h-40 w-40" />
                        </div>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}