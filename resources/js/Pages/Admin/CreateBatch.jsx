import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import itlog from '../../../../public/images/itlog.gif';
import Modal from "@/Components/Modal";
import React, {useState} from "react";
import { useForm } from "@inertiajs/react";




export default function CreateBatch({ batches }) {

    const [isShow, setIsShow] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [successType, setSuccessType] = useState("");



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
        setSelectedBatch(batch); // null = create, object = edit
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
                isShowSuccessModal();
            },
        });
    };
    const submit = (e) => {
        e.preventDefault();

        if (selectedBatch) {
            put(route("admin.createbatches.update", selectedBatch.id),{
                onSuccess: () => {
                setIsShow(false);
                setSelectedBatch(null);
                isShowSuccessModal("create");
                },
            });
        } else {
        post(route("admin.createbatches.store"), {
            onSuccess: () => {
                reset();
                setIsShow(false);
                isShowSuccessModal();
                },
            });
        }
    };
    return (
        <DashboardLayout
            header={
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Batch
                </h1>
            }
        >
            <Head title="Create Batch" />
            <div className="py-12">
                <div className="justify-center items-center">
                    <div className="flex justify-between items-center">
                        <h1 className="lg:text-4xl">Create Batch</h1>

                        <div>
                            <PrimaryButton onClick={openModal}>
                                + Add Batch
                            </PrimaryButton>
                        </div>
                    </div>
                    <div>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                             {[...batches]
                                .sort((a, b) => Number(a.name.replace(/\D/g, "")) - Number(b.name.replace(/\D/g, "")))
                                .map(batch => (
                                <div key ={batch.id}className='py-5 px-5 rounded-3xl shadow-md border-2'>
                                    <div>
                                        <h1 className='text-center font-semibold text:md sm:text-4xl mb-5 truncate'>
                                            {batch.name}
                                        </h1>
                                        <div className='flex flex-col items-center'>
                                            <img src={itlog} alt='itlog' className='w-20 h-20 sm:w-40 sm:h-40 mb-5'/>
                                            <PrimaryButton onClick={() => openEditModal(batch)} className="rounded-[80px] text-[10px] sm:text-xs">
                                                Edit Batch
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Modal show={isShow} onClose={() => setIsShow(false)}>
                        <div>
                            <div className="flex justify-between border-b-2">
                                <h1 className="text-2xl font-semibold mb-4 pt-7 pl-7">Create Batch</h1>
                                <h1 onClick={() => setIsShow(false)} className="cursor-pointer pt-7 pr-7">x</h1>
                            </div>
                            <div className="w-full flex justify-center items-center p-7">
                                    <form onSubmit={submit}>
                                        <div className="mb-4">
                                            <label htmlFor="batchName" className="block text-gray-700 font-bold mb-2">Batch Name</label>
                                            <input type="text" id="batchName" name="name" value={data.name} onChange={(e) => setData("name", e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter batch name"/>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="section" className="block text-gray-700 font-bold mb-2">Section</label>
                                            <input type="number" id="section" name="section" value={data.section} onChange={(e) => {const value = e.target.value;if (value.length <= 2) {setData("section", value);}}} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter number of sections"/>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
                                            <input type="date" id="date" name="date" value={data.date} onChange={(e) => setData("date", e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>
                                        </div>
                                        <div className="flex justify-end gap-4 border">
                                            <PrimaryButton type="submit" disabled={processing}>
                                                {selectedBatch ? "Update Batch" : "Create Batch"}
                                            </PrimaryButton>
                                            <SecondaryButton type="button" onClick={() => openDeleteModal(selectedBatch)}>
                                                Delete
                                            </SecondaryButton>
                                        </div>   
                                    </form>   
                            </div>
                        </div>
                    </Modal>
                    <Modal show={isDeleteModal} onClose={() => setIsDeleteModal(false)}>
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                            <p>Are you sure you want to delete <strong>{selectedBatch?.name}</strong>?</p>
                            <div className="mt-6 flex justify-end gap-4">
                                <SecondaryButton onClick={() => setIsDeleteModal(false)}>
                                    Cancel
                                </SecondaryButton>
                                <PrimaryButton onClick={handleDelete}>
                                    Yes, Delete
                                </PrimaryButton>
                            </div>
                        </div>
                    </Modal>
                    <Modal show={isSuccessModal} onClose={() => setIsSuccessModal(false)}>
                        <div>
                            <h1 className="text-xs font-bold mb-4">
                                {successType === "create" && "Successfully Created Batch"}
                                {successType === "update" && "Successfully Updated Batch"}
                                {successType === "delete" && "Successfully Deleted Batch"}
                            </h1>
                            <img src={itlog} alt="" className="h-20 w-20" />
                        </div>
                    </Modal>
                </div>
                
            </div>
        </DashboardLayout>
    );    
}