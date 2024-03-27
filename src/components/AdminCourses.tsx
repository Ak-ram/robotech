import { TextareaHTMLAttributes, useEffect, useState } from "react";
// import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import supabase from "@/supabase/config";
import EditCourseModel from "./EditCourseModel";

const AdminCourses = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<any>({
        poster: "",
        rate: 0,
        title: "",
        price: 0,
        previousPrice: 0,
        studentsEnrolled: 0,
        description: "",
        enrollmentOpen: 'close',
        enrollmentLink: '',
        instructor: "",
        instructor_info: "",
        duration: 0,
        category: "",
        startDateTime: "",
        level: "",
        index: [],
        last_updated: "",
        more_details: "",
        quantity: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('courses')
                    .select();
                if (error) {
                    throw error;
                }
                setJsonArray(data || []);
            } catch (error) {
                toast.error((error as Error).message)
            }
        };

        fetchData();
    }, []);

    const handleAddItemClick = () => {
        setEditIndex(-1); // Use -1 to indicate a new item
        setEditedItem({
            poster: "",
            video: "",
            rate: 0,
            title: "",
            price: 0,
            previousPrice: 0,
            studentsEnrolled: 0,
            description: "",
            enrollmentOpen: 'close',
            enrollmentLink: '',
            instructor: "",
            instructor_info: "",
            duration: 0,
            category: "",
            startDateTime: "",
            level: "",
            index: [],
            last_updated: "",
            more_details: "",
            quantity: 1
        });
    };
    const handleRemoveItem = async (id: number) => {
        try {
            // Remove the course from jsonArray
            const updatedArray = jsonArray.filter(item => item.id !== id);

            // Update jsonArray state with the filtered array
            setJsonArray(updatedArray);

            // Perform deletion operation in Supabase based on the course ID
            await supabase
                .from('courses')
                .delete()
                .eq('id', id);

            // Show success toast message
            toast.success(`Item removed successfully`);
        } catch (error) {
            // Show error toast message
            toast.error((error as Error).message);
        }
    };

    const handleEditClick = (id: number) => {
        // Find the index of the course with the specified ID
        const index = jsonArray.findIndex(item => item.id === id);
        // Set the editIndex state to the found index
        setEditIndex(index);
        // Set the editedItem state to the corresponding course object
        setEditedItem({ ...jsonArray[index] });
    };





    return (
        <div className={`min-h-[400px] lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

            {!jsonArray && <h2 className="font-bold mb-4">Current courses data:</h2>}
            <div className="mb-5 flex items-center justify-end">
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddItemClick}
                >
                    <Plus size={18} className="mr-1" />
                    Add Course
                </button>
            </div>
            {jsonArray.length !== 0 ?
                <div className="overflow-x-auto max-w-4xl">
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-zinc-800 text-white ">
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Title</th>
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Price</th>
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Poster</th>
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jsonArray.map((item, index) => (
                                <tr key={index} className="hover:bg-slate-100">
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.title}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.price}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2"><img src={item.poster} width="70" /></td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-2 py-2">
                                        <button
                                            className="mr-1"
                                            onClick={() => handleEditClick(+item.id)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="mr-1"
                                            onClick={() => handleRemoveItem(+item.id)}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <NoContent />}

            {editIndex !== null && (
                <EditCourseModel {...{ editIndex, editedItem, setEditedItem, setEditIndex, jsonArray, setJsonArray }} />
            )}

            {/* <div className="mt-5">
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddItemClick}
                >
                    <Plus size={18} className="mr-1" />
                    Add Item
                </button>
            </div> */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                    },
                }}
            />
        </div>
    );
};

export default AdminCourses;