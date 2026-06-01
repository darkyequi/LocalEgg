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
    const [currentPage, setCurrentPage] = useState(1);
    const batchesPerPage = 6;
    const sortedBatches = [...batches].sort(
        (a, b) => Number(a.name.replace(/\D/g, "")) - Number(b.name.replace(/\D/g, ""))
    );
    const indexOfLast = currentPage * batchesPerPage;
    const indexOfFirst = indexOfLast - batchesPerPage;
    const currentBatches = sortedBatches.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(sortedBatches.length / batchesPerPage);
    const isShowSuccessModal = () => {
        setIsSuccessModal(true);
        setTimeout(() => {
            setIsSuccessModal(false);
        }, 2000);
    }

    const recordForm = [
        { id: 1, label: 'Pullet', field: 'pullet' },
        { id: 2, label: 'Small', field: 'small' },
        { id: 3, label: 'Medium', field: 'medium' },
        { id: 4, label: 'Large', field: 'large' },
        { id: 5, label: 'XL', field: 'extra_large' },
        { id: 6, label: 'Jumbo', field: 'jumbo' },
        { id: 7, label: 'Broken', field: 'broken' },
        { id: 8, label: 'Death', field: 'chicken_death' },
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
                <h1 className="text-xl font-bold leading-tight text-emerald-800 dark:text-emerald-100">
                    Production Logs
                </h1>
            }
        >
            <Head title="Manage Eggs" />
            <div className="py-12 bg-emerald-50/30 dark:bg-gray-900 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Info */}
                    <div className="mb-8 sm:flex sm:justify-between sm:items-end">
                        <div className='mb-2'>
                            <h2 className="text-3xl font-black text-emerald-950 dark:text-white">Batches</h2>
                            <p className="text-emerald-600 font-medium">Select a batch to record daily production.</p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xs font-bold uppercase text-emerald-400 tracking-widest">Total Active</span>
                            <p className="text-2xl font-black text-emerald-900 dark:text-white">{batches.length}</p>
                        </div>
                        <div className='relative overflow-hidden p-6 rounded-[2rem] bg-emerald-900 text-white shadow-xl sm:hidden'>
                            {/* Decorative background element */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-800 rounded-full opacity-50" />
                            
                            <h3 className='text-emerald-300 font-bold text-sm uppercase tracking-[0.2em] relative z-10'>
                                Total Active Batches
                            </h3>
                            <p className='text-4xl font-black mt-1 relative z-10'>
                                {batches.length}
                            </p>
                            <p className='mt-2 text-emerald-400 text-sm font-medium italic relative z-10'>Currently in production</p>
                        </div>
                    </div>

                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentBatches.map(batch => (
                                <div 
                                    key={batch.id} 
                                    className="flex bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-emerald-100 dark:border-gray-700 hover:shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 group"
                                >
                                    {/* Left Side: Visual Identity */}
                                    <div className={`w-1/3 flex flex-col items-center justify-center p-4 transition-colors ${batch.manage_eggs_count > 0 ? 'bg-emerald-500' : 'bg-emerald-50 dark:bg-gray-700'}`}>
                                        <img src={itlog} alt='itlog' className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md group-hover:scale-110 transition-transform" />
                                        <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase ${batch.manage_eggs_count > 0 ? 'bg-white text-emerald-600' : 'bg-emerald-200 text-emerald-700'}`}>
                                            {batch.manage_eggs_count > 0 ? 'Done' : 'Pending'}
                                        </div>
                                    </div>

                                    {/* Right Side: Info & Actions */}
                                    <div className="w-2/3 p-6 flex flex-col justify-between">
                                        <div>
                                            <h1 className='font-black text-2xl text-emerald-950 dark:text-emerald-50 truncate'>
                                                {batch.name}
                                            </h1>
                                            <p className="text-xs text-emerald-600/60 dark:text-emerald-400 font-bold uppercase tracking-tighter">
                                                {batch.section} Sections Available
                                            </p>
                                        </div>

                                        <div className="mt-6">
                                            {batch.manage_eggs_count > 0 ? (
                                                <button
                                                    onClick={() => openEditModal(batch)}
                                                    className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-sm hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                                                >
                                                    Modify Record
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => openModal(batch)}
                                                    className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100 dark:shadow-none transition-all"
                                                >
                                                    Enter Data
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Simple Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-6 gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-5 py-2 bg-white dark:bg-gray-800 text-emerald-600 font-black rounded-xl border border-emerald-100 disabled:opacity-30 transition-all"
                            >
                                Previous
                            </button>
                            <span className="text-emerald-950 dark:text-emerald-100 font-black text-sm uppercase tracking-widest">
                                Page {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-5 py-2 bg-white dark:bg-gray-800 text-emerald-600 font-black rounded-xl border border-emerald-100 disabled:opacity-30 transition-all"
                            >
                                Next
                            </button>
                        </div>
                    )}
                    </div>

                    {/* Form Modal (Enhanced) */}
                    <Modal show={isShow} onClose={() => setIsShow(false)} maxWidth="3xl">
                        <div className="bg-white dark:bg-gray-800 p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h1 className="text-2xl font-black text-emerald-950 dark:text-white uppercase tracking-tight">
                                        {isEdit ? 'Edit' : 'New'} Log: <span className="text-emerald-600">{selectedBatch?.name}</span>
                                    </h1>
                                </div>
                                <button onClick={() => setIsShow(false)} className="text-gray-400 hover:text-emerald-600 text-3xl">&times;</button>
                            </div>

                            <form onSubmit={submit}>
                                <div className="max-h-[30vh] overflow-y-auto custom-scrollbar">
                                    {selectedBatch && getSectionLetters(Number(selectedBatch.section)).map(letter => (
                                        <div key={letter} className="mb-6 last:mb-0 bg-emerald-50/50 dark:bg-gray-900 p-6 rounded-3xl border border-emerald-50 dark:border-gray-700">
                                            <div className="flex items-center gap-2 mb-4 border-b border-emerald-100 dark:border-gray-700 pb-2">
                                                <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
                                                <h2 className="text-lg font-black text-emerald-900 dark:text-emerald-100">Section {letter}</h2>
                                            </div>

                                            <div className='grid grid-cols-2 gap-3'>
                                                {recordForm.map(forms => (
                                                    <div key={forms.id} className="space-y-1">
                                                        <label className="text-[10px] font-black uppercase text-emerald-700/60 dark:text-emerald-400">
                                                            {forms.label}
                                                        </label>
                                                        <input 
                                                            type="number" 
                                                            value={data.sections?.[letter]?.[forms.field] || ""} 
                                                            onChange={(e) => { setData("sections", { ...data.sections, [letter]: { ...data.sections?.[letter], [forms.field]: e.target.value } }); }} 
                                                            className="w-full rounded-xl border-emerald-100 bg-white dark:bg-gray-700 focus:ring-emerald-500 focus:border-emerald-500 font-bold text-emerald-900 dark:text-white text-sm" 
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <PrimaryButton type="submit" disabled={processing} className="w-full justify-center py-4 rounded-2xl text-lg font-black bg-emerald-600">
                                        {isEdit ? 'Update Daily Records' : 'Save Daily Records'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </Modal>

                    {/* Success Message */}
                    <Modal show={isSuccessModal} onClose={() => setIsSuccessModal(false)}>
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
                                <img src={itlog} className="w-12 h-12" alt="Success" />
                            </div>
                            <h2 className="text-2xl font-black text-emerald-950 uppercase">Success!</h2>
                            <p className="text-emerald-600 font-medium">Record has been securely saved.</p>
                        </div>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}