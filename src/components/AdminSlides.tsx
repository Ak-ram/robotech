import { useEffect, useState } from "react";
import { Check, X, Trash, Edit, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../supabase/config"
import Link from "next/link";

const AdminSlides = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>({
    image: "",
    link_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('slides')
          .select();
        if (error) {
          throw error;
        }
        setJsonArray(data || []);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, [editedItem]);

  const handleAddItemClick = () => {
    setEditIndex(-1); // Use -1 to indicate a new item
    setEditedItem({
      image: "",
      link_url: "",
    });
    setError(null); // Reset error state
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await supabase
        .from('slides')
        .delete()
        .eq('id', id);
      
      setJsonArray(jsonArray.filter(item => item.id !== id));
      toast.success('Slide removed successfully');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEditClick = (id: number) => {
    const edited = jsonArray.find(item => item.id === id);
    if (edited) {
      setEditIndex(id);
      setEditedItem(edited);
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (!editedItem.image || !editedItem.link_url) {
        setError("All fields are required");
        return;
      }

      if (editIndex === -1) {
        await supabase
          .from('slides')
          .insert([editedItem]);
        setJsonArray([...jsonArray, editedItem]);
        toast.success('Slide added successfully');
      } else {
        await supabase
          .from('slides')
          .update(editedItem)
          .eq('id', editIndex);
        setJsonArray(jsonArray.map(item => item.id === editIndex ? editedItem : item));
        toast.success('Slide updated successfully');
      }

      setEditIndex(null);
      setError(null); // Reset error state
    } catch (error) {
      setError((error as Error).message);
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
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Img</th>
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Link</th>
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jsonArray.map((item, index) => (
                                <tr key={item.id} className="hover:bg-slate-100">
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2"><img width={50} height={50} src={item.image} /></td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2"><Link href={item.link_url}>{item.link_url}</Link></td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-2 py-2">
                                        <button
                                            className="mr-1"
                                            onClick={() => handleEditClick(item.id)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="mr-1"
                                            onClick={() => handleRemoveItem(item.id)}
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
                <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">
                        <div className="">
                            <h2 className="font-bold text-center text-lg mb-2">
                                {editIndex === -1 ? "Add New Slide " : "Edit Item"}
                            </h2>
   


                            <div className="mb-2 lg:pr-4">
                                <span className="text-sm font-bold my-2 -ml-2">Image</span>

                                <input
                                    type="text"
                                    placeholder="image"
                                    className="p-2 w-full border border-gray-300 rounded"
                                    value={editedItem.image}
                                    onChange={(e) => handleInputChange(e, "image")}
                                />
                            </div>

                            <div className="mb-2 lg:pr-4">
                                <span className="text-sm font-bold my-2 -ml-2">Link</span>

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