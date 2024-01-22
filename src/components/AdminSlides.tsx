import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";

const AdminSlides = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<any>({
        id: "",
        image: "",
        link_url: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchJsonData("robotech/pages/slides.json");
                setJsonArray(data);
            } catch (error) {
                toast.error((error as Error).message);
            }
        };

        fetchData();
    }, []);

    const handleAddItemClick = () => {
        setEditIndex(-1); // Use -1 to indicate a new item
        setEditedItem({
            id: "",
            image: "",
            link_url: ""
        });
    };

    const handleRemoveItem = async (index: number) => {
        const updatedArray = [...jsonArray];
        updatedArray.splice(index, 1);

        try {
            await updateJsonFile("robotech/pages/slides.json", updatedArray);
            setJsonArray(updatedArray);
            toast.success(`Slide Removed successfully`);
            toast.loading(`Be patient, changes takes a few moments to be reflected`);
            setTimeout(() => {
                toast.dismiss();

            }, 5000);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditedItem({ ...jsonArray[index] });
    };

    const handleEditSubmit = async () => {
        // Check for empty fields
        if (
            !editedItem.id ||
            !editedItem.image ||
            !editedItem.link_url
        ) {
            toast.error("All fields are required");
            return;
        }

        if (editIndex !== null) {
            let updatedArray;

            if (editIndex === -1) {
                // Add a new item
                updatedArray = [...jsonArray, editedItem];
            } else {
                // Update an existing item
                updatedArray = jsonArray.map((item, index) =>
                    index === editIndex ? editedItem : item
                );
            }

            try {
                await updateJsonFile("robotech/pages/slides.json", updatedArray);
                setJsonArray(updatedArray);
                setEditIndex(null);
                toast.success(`Slide Added/Updated successfully`);
                toast.loading(`Be patient, changes takes a few moments to be reflected`);
                setTimeout(() => {
                    toast.dismiss();

                }, 5000);
            } catch (error) {
                toast.error((error as Error).message);
            }
        }
    };

    const handleEditCancel = () => {
        setEditIndex(null);
        setEditedItem({});
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        setEditedItem((prev) => ({ ...prev, [key]: e.target.value }));
    };
    // if(jsonArray.length ===0) return 'no items' 
    return (
        <div className={`min-h-[400px] lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>
            {!jsonArray && <h2 className="font-bold mb-4">Current Slides data:</h2>}
            <div className="mb-5 flex items-center justify-end">
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddItemClick}
                >
                    <Plus size={18} className="mr-1" />
                    Add Slide
                </button>
            </div>
            {jsonArray.length !== 0 ?

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-zinc-800 text-white ">
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Id</th>
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Img</th>
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Link</th>
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jsonArray.map((item, index) => (
                                <tr key={index} className="hover:bg-slate-100">
                                    <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">{item.id}</td>
                                    <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2"><img width={50} height={50} src={item.image} /></td>
                                    <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2"><Link href={item.link_url}>{item.link_url}</Link></td>
                                    <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-2 py-2">
                                        <button
                                            className="mr-1"
                                            onClick={() => handleEditClick(index)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="mr-1"
                                            onClick={() => handleRemoveItem(index)}
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
                <div className="mt-5">
                    <h2 className="font-bold mb-2">
                        {editIndex === -1 ? "Add New Item" : "Edit Item"}
                    </h2>
                    <div className="flex flex-col lg:flex-row">
                        <div className=" mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="ID"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={editedItem.id}
                                onChange={(e) => handleInputChange(e, "id")}
                            />
                        </div>
                      
                       
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="image"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.image}
                                onChange={(e) => handleInputChange(e, "image")}
                            />
                        </div>
                      
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Link URL: /3d"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.link_url}
                                onChange={(e) => handleInputChange(e, "link_url")}
                            />
                        </div>
                    </div>
                    <div className="flex  justify-center">
                        <button
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={handleEditSubmit}
                        >
                            <Check size={18} className="mr-1" />
                            Save
                        </button>
                        <button
                            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleEditCancel}
                        >
                            <X size={18} className="mr-1" />
                            Cancel
                        </button>
                    </div>
                </div>
            )}

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

export default AdminSlides;