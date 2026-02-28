import DashboardLayout from "../../Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import itlog from '../../../../public/images/itlog.gif';
import Modal from "@/Components/Modal";
import React, {useState} from "react";

const batches = [
    {
        id: 1,
        name: 'Batch 1',
    },
    {
        id: 2,
        name: 'Batch 2',
    },
    {
        id: 3,
        name: 'Batch 3',
    },
    {
        id: 4,
        name: 'Batch 4',
    },
    
]
const sections = [
    {
        id: 1,
        name: 'Section 1',
    },
    {   id: 2,
        name: 'Section 2',
    },
    {
        id: 3,
        name: 'Section 3',
    },
]   


export default function CreateBatch(params) {

    const [isShow, setIsShow] = useState(false);

    const openModal = () => {
        setIsShow(true);
    }
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
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                             {batches.map(batch => (
                                <div key ={batch.id}className='py-5 px-5 rounded-3xl shadow-md border-2'>
                                    <div className=''>
                                        <h1 className='text-center font-semibold text-4xl mb-5'>
                                            {batch.name}
                                        </h1>
                                        <div className='flex flex-col items-center'>
                                            <img src={itlog} alt='itlog' className='w-40 h-40 mb-5'/>
                                            <PrimaryButton onClick={openModal}>
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
                                    <form action="">
                                        <div className="mb-4">
                                            <label htmlFor="batchName" className="block text-gray-700 font-bold mb-2">Batch Name</label>
                                            <input type="text" id="batchName" name="batchName" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter batch name"/>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="section" className="block text-gray-700 font-bold mb-2">Section</label>
                                            <input type="number" id="section" name="section" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter number of sections"/>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
                                            <input type="date" id="date" name="date" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>
                                        </div>
                                        <div className="flex justify-end gap-4 border">
                                            <PrimaryButton type="submit">
                                                Create Batch
                                            </PrimaryButton>
                                            <SecondaryButton>
                                                Delete
                                            </SecondaryButton>
                                        </div>   
                                    </form>   
                            </div>
                        </div>
                    </Modal>
                </div>
                
            </div>
        </DashboardLayout>
    );    
}