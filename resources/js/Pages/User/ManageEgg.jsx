import DashboardLayout from '@/Layouts/DashboardLayout';
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
        { id: 3, label: 'Egg Meduim:', field: 'medium', placeholder: 'enter medium' },
        { id: 4, label: 'Egg Large:', field: 'large', placeholder: 'enter large' },
        { id: 5, label: 'Egg Extra Large:', field: 'extra_large', placeholder: 'enter extra large' },
        { id: 6, label: 'Egg Jumbo:', field: 'jumbo', placeholder: 'enter jumbo' },
        { id: 7, label: 'Egg Broken: ', field: 'broken', placeholder: 'enter broken' },

    ]
    const getSectionLetters = (count) => {
        const letters = [];
        const limit = Math.min(count, 26);
        for (let i = 0; i < limit; i++) {
            letters.push(String.fromCharCode(65 + i)); // 65 = A
        }
        return letters;
    };

    const openModal = (batch) => {
        setSelectedBatch(batch);
        setIsEdit(false); // null = create, object = edit
        setData({
            name: batch.name,
            sections: {},
        });
        setIsShow(true);
    };
    const openEditModal = (batch) => {
        setSelectedBatch(batch);
        setIsEdit(true); // null = create, object = edit
        setData({
            name: batch.name,
            sections: batch.sections || {},
        });
        setIsShow(true);
    };
    const { data, setData, put, post, processing, reset, } = useForm({
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
        }
        else {
            post(route("user.manageegg.store", selectedBatch.id), {
                onSuccess: () => {
                    setIsShow(false);
                    setSelectedBatch(null);
                    isShowSuccessModal("create");
                },
            });
        }
    };
    return (
        <DashboardLayout
            header={
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Eggs
                </h1>
            }
        >
            <Head title="Create Batch" />
            <div className="py-12">
                <div className="justify-center items-center">
                    <div className="flex items-center">
                        <h1 className="lg:text-4xl">Create Batch</h1>
                    </div>
                    <div>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                            {[...batches]
                                .sort((a, b) => Number(a.name.replace(/\D/g, "")) - Number(b.name.replace(/\D/g, "")))
                                .map(batch => (
                                    <div key={batch.id} className='py-5 px-5 rounded-3xl shadow-md border-2'>
                                        <div>
                                            <h1 className='text-center font-semibold text:md sm:text-4xl mb-5 truncate'>
                                                {batch.name}
                                            </h1>
                                            <div className='flex flex-col items-center'>
                                                <img src={itlog} alt='itlog' className='w-20 h-20 sm:w-40 sm:h-40 mb-5' />
                                                {batch.manage_eggs_count > 0 ? (
                                                    <div className="flex flex-col gap-2">
                                                        <PrimaryButton disabled className="rounded-[80px] text-[10px] sm:text-xs bg-green-500">
                                                            Saved
                                                        </PrimaryButton>

                                                        <PrimaryButton
                                                            onClick={() => openEditModal(batch)}
                                                            className="rounded-[80px] text-[10px] sm:text-xs"
                                                        >
                                                            Edit Record
                                                        </PrimaryButton>
                                                    </div>
                                                ) : (
                                                    <PrimaryButton
                                                        onClick={() => openModal(batch)}
                                                        className="rounded-[80px] text-[10px] sm:text-xs"
                                                    >
                                                        Enter a Record
                                                    </PrimaryButton>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <Modal show={isShow} onClose={() => setIsShow(false)}>
                        <div>
                            <div className="flex justify-between border-b-2">
                                <h1 className="text-2xl font-semibold mb-4 pt-7 pl-7">Create Record</h1>
                                <h1 onClick={() => setIsShow(false)} className="cursor-pointer pt-7 pr-7">x</h1>
                            </div>
                            <div className="w-full flex justify-center items-center p-7">
                                <form onSubmit={submit}>
                                    <div className="mb-4 max-h-[70vh] overflow-y-auto">
                                        {selectedBatch && getSectionLetters(Number(selectedBatch.section)).map(letter => (
                                            <div key={letter}>
                                                <h1 className="block text-gray-700 font-bold mb-2">
                                                    {selectedBatch.name} Section {letter}
                                                </h1>
                                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                                                    {recordForm.map(forms => (
                                                        <div key={forms.id} className='mb-4'>
                                                            <label htmlFor="eggs" className="block text-gray-700 font-bold mb-2">{forms.label}</label>
                                                            <input type="number" id="eggs" name="eggs" value={data.sections?.[letter]?.[forms.field] || ""} onChange={(e) => { setData("sections", { ...data.sections, [letter]: { ...data.sections?.[letter], [forms.field]: e.target.value } }); }} placeholder={forms.placeholder} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <PrimaryButton type="submit" disabled={processing}>
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                    <Modal show={isSuccessModal} onClose={() => setIsSuccessModal(false)}>
                        <div>
                            <h1 className="text-xs font-bold mb-4">
                                Saved
                            </h1>
                            <img src={itlog} alt="" className="h-20 w-20" />
                        </div>
                    </Modal>
                </div>

            </div>
        </DashboardLayout>
    );
}