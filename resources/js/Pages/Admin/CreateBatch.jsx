import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import itlog from '../../../../public/images/itlog.gif';
import Modal from "@/Components/Modal";
import React, { useState } from "react";

export default function CreateBatch({ batches }) {
    const [isShow, setIsShow] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [successType, setSuccessType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const batchesPerPage = 6;

    const sortedBatches = [...batches].sort(
        (a, b) => Number(a.name.replace(/\D/g, "")) - Number(b.name.replace(/\D/g, ""))
    );

    const [isErrorModal, setIsErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const showErrorModal = (message) => {
        setErrorMessage(message);
        setIsErrorModal(true);
        setTimeout(() => {
            setIsErrorModal(false);
            setErrorMessage("");
        }, 2500);
    };
    const indexOfLast = currentPage * batchesPerPage;
    const indexOfFirst = indexOfLast - batchesPerPage;
    const currentBatches = sortedBatches.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(sortedBatches.length / batchesPerPage);

    const isShowSuccessModal = (type) => {
        setSuccessType(type);
        setIsSuccessModal(true);
        setTimeout(() => {
            setIsSuccessModal(false);
            setSuccessType("");
        }, 2000);
    }

    const openDeleteModal = (batch) => {
        setSelectedBatch(batch);
        setIsDeleteModal(true);
        setIsShow(false);
    }

    const openModal = () => {
        setSelectedBatch(null);
        reset();
        setIsShow(true);
    };

    const openEditModal = (batch) => {
        setSelectedBatch(batch);
        setData({
            name: batch.name,
            section: batch.section,
            date: batch.date,
        });
        setIsShow(true);
    };

    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
        name: "",
        section: "",
        date: "",
    });

    const handleDelete = () => {
        if (!selectedBatch) return;
        destroy(route("admin.createbatches.destroy", selectedBatch.id), {
            onSuccess: () => {
                setIsDeleteModal(false);
                reset();
                setSelectedBatch(null);
                isShowSuccessModal("delete");
            },
        });
    };

    const submit = (e) => {
        e.preventDefault();
        if (selectedBatch) {
            put(route("admin.createbatches.update", selectedBatch.id), {
                onSuccess: () => {
                    setIsShow(false);
                    setSelectedBatch(null);
                    isShowSuccessModal("update");
                },
                onError: (errors) => {
                if (errors.name) showErrorModal(errors.name);
            },
            });
        } else {
            post(route("admin.createbatches.store"), {
                onSuccess: () => {
                    reset();
                    setIsShow(false);
                    isShowSuccessModal("create");
                },
                onError: (errors) => {
                if (errors.name) showErrorModal(errors.name);
            },
            });
        }
    };

    return (
        <DashboardLayout
            header={
                <h1 className="text-xl font-bold leading-tight text-emerald-800 dark:text-emerald-100 uppercase tracking-tighter">
                    Batch Management
                </h1>
            }
        >
            <Head title="Create Batch" />
            <div className="py-12 bg-emerald-50/30 dark:bg-gray-900 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Info */}
                    <div className="mb-8 sm:flex sm:justify-between sm:items-end gap-4">
                        <div className="mb-4 sm:mb-0">
                            <h2 className="text-4xl font-black text-emerald-950 dark:text-white uppercase tracking-tight">Create Batch</h2>
                            <p className="text-emerald-600 font-medium mt-1">Setup and organize your poultry farm batches.</p>
                        </div>
                        <button 
                            onClick={openModal} 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-8 rounded-[2rem] shadow-lg shadow-emerald-200 dark:shadow-none transition-all flex items-center gap-2 group whitespace-nowrap"
                        >
                            <span className="text-2xl group-hover:rotate-90 transition-transform">+</span>
                            New Batch
                        </button>
                    </div>

                    {/* 2-Column Grid (Styled like ManageEgg) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {currentBatches.map(batch => (
                            <div key={batch.id} className='flex bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-emerald-100 dark:border-gray-700 hover:shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 group'>
                                {/* Left Side: Visual Identity */}
                                <div className="w-1/3 bg-emerald-50 dark:bg-gray-700 flex flex-col items-center justify-center p-4 transition-colors group-hover:bg-emerald-100">
                                    <img src={itlog} alt='itlog' className='w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md group-hover:scale-110 transition-transform duration-500' />
                                    <div className="mt-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                        Batch ID: {batch.id}
                                    </div>
                                </div>

                                {/* Right Side: Info & Actions */}
                                <div className="w-2/3 p-6 flex flex-col justify-between">
                                    <div>
                                        <h1 className='font-black text-2xl text-emerald-950 dark:text-emerald-50 truncate'>
                                            {batch.name}
                                        </h1>
                                        <div className="flex flex-col gap-1 mt-1">
                                            <p className="text-xs text-emerald-600/60 font-bold uppercase tracking-tighter">
                                                {batch.section} Sections Defined
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                                                Started: {batch.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button 
                                            onClick={() => openEditModal(batch)} 
                                            className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all"
                                        >
                                            Edit Batch Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

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

                    {/* CREATE/EDIT MODAL */}
                    <Modal show={isShow} onClose={() => setIsShow(false)} maxWidth="2xl">
                        <div className="bg-white dark:bg-gray-800 p-8">
                            <div className="flex justify-between items-center mb-8 border-b border-emerald-50 dark:border-gray-700 pb-4">
                                <h1 className="text-2xl font-black text-emerald-950 dark:text-white uppercase tracking-tight">
                                    {selectedBatch ? 'Modify Batch' : 'Register New Batch'}
                                </h1>
                                <button onClick={() => setIsShow(false)} className="text-emerald-300 hover:text-emerald-600 text-3xl font-light">&times;</button>
                            </div>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div className="bg-emerald-50/30 dark:bg-gray-900 p-6 rounded-3xl border border-emerald-50 dark:border-gray-700">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-emerald-700/60 mb-2 tracking-widest">Batch Name</label>
                                            <input 
                                                type="text" 
                                                value={data.name} 
                                                onChange={(e) => setData("name", e.target.value)} 
                                                required 
                                                className="w-full px-4 py-3 border-emerald-100 bg-white dark:bg-gray-800 rounded-2xl focus:ring-emerald-500 focus:border-emerald-500 font-bold" 
                                                placeholder="e.g. Batch 01 - 2024"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase text-emerald-700/60 mb-2 tracking-widest">Total Sections</label>
                                                <input 
                                                    type="number" 
                                                    value={data.section} 
                                                    onChange={(e) => { if (e.target.value.length <= 2) setData("section", e.target.value); }} 
                                                    required 
                                                    className="w-full px-4 py-3 border-emerald-100 bg-white dark:bg-gray-800 rounded-2xl font-bold" 
                                                    placeholder="1-26"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase text-emerald-700/60 mb-2 tracking-widest">Start Date</label>
                                                <input 
                                                    type="date" 
                                                    value={data.date} 
                                                    onChange={(e) => setData("date", e.target.value)} 
                                                    required 
                                                    className="w-full px-4 py-3 border-emerald-100 bg-white dark:bg-gray-800 rounded-2xl font-bold text-sm" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <PrimaryButton type="submit" disabled={processing} className="w-full justify-center py-4 rounded-2xl text-lg font-black bg-emerald-600">
                                        {selectedBatch ? "Update Configuration" : "Finalize Batch"}
                                    </PrimaryButton>
                                    
                                    {selectedBatch && (
                                        <button 
                                            type="button" 
                                            onClick={() => openDeleteModal(selectedBatch)} 
                                            className="text-red-400 text-xs font-black uppercase hover:text-red-600 transition-colors py-2"
                                        >
                                            Permanently Delete Batch
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </Modal>

                    {/* DELETE MODAL */}
                    <Modal show={isDeleteModal} onClose={() => setIsDeleteModal(false)}>
                        <div className="p-10 text-center">
                            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 uppercase">Delete Batch?</h2>
                            <p className="text-gray-500 font-medium mt-2">This action is irreversible. All history for <span className="text-red-600 font-black">{selectedBatch?.name}</span> will be lost.</p>
                            <div className="mt-8 flex flex-col gap-2">
                                <button onClick={handleDelete} className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-100">Confirm Deletion</button>
                                <button onClick={() => setIsDeleteModal(false)} className="w-full py-3 text-gray-400 font-bold hover:text-gray-600">Cancel</button>
                            </div>
                        </div>
                    </Modal>

                    {/* SUCCESS MODAL */}
                    <Modal show={isSuccessModal} onClose={() => setIsSuccessModal(false)}>
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-50 rounded-full mb-6">
                                <img src={itlog} alt="Success" className="h-16 w-16 drop-shadow-xl" />
                            </div>
                            <h1 className="text-2xl font-black text-emerald-950 dark:text-emerald-950 uppercase tracking-tight">
                                {successType === "create" && "Batch Registered"}
                                {successType === "update" && "Details Updated"}
                                {successType === "delete" && "Batch Removed"}
                            </h1>
                            <p className="text-emerald-600 font-medium mt-2 italic">Operation Successful</p>
                        </div>
                    </Modal>
                    <Modal show={isErrorModal} onClose={() => setIsErrorModal(false)}>
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-6">
                                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-black text-red-600 uppercase tracking-tight">
                                Error
                            </h1>
                            <p className="text-red-500 font-medium mt-2 italic">{errorMessage}</p>
                        </div>
                    </Modal>
                </div>
            </div>
        </DashboardLayout>
    );
}