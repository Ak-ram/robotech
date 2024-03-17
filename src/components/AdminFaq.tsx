import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import supabase from "../supabase/config"
const AdminFaq = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>({
    id: "",
    question: "",
    answer: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await fetchJsonData("robotech/pages/faq.json");
        // setJsonArray(data);
        const p = await supabase
          .from('faq')
          .select();
        setJsonArray(p.data!);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const handleAddItemClick = () => {
    setEditIndex(-1); // Use -1 to indicate a new item
    setEditedItem({
      id: uuidv4(),
      question: "",
      answer: "",
    });
    setError(null); // Reset error state
  };

  const handleRemoveItem = async (index: number) => {
    const updatedArray = [...jsonArray];
    updatedArray.splice(index, 1);

    try {
      await updateJsonFile("robotech/pages/faq.json", updatedArray);
      setJsonArray(updatedArray);
      toast.success('Question removed successfully')
      toast.loading(`Be patient, changes takes a few moments to be reflected`);
      setTimeout(() => {
        toast.dismiss();

      }, 5000);
    } catch (error) {
      setError((error as Error).message);
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
      !editedItem.question ||
      !editedItem.answer
    ) {
      setError("All fields are required");
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
        await updateJsonFile("robotech/pages/faq.json", updatedArray);
        setJsonArray(updatedArray);
        setEditIndex(null);
        setError(null); // Reset error state
        toast.success('Question added successfully')
        toast.loading(`Be patient, changes takes a few moments to be reflected`);
        setTimeout(() => {
          toast.dismiss();

        }, 5000);
      } catch (error) {
        setError((error as Error).message);
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

  return (
    <div className={`min-h-[400px] lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

      {!jsonArray && <h2 className="font-bold mb-4">Current FAQ data:</h2>}
      <div className="mb-5 flex items-center justify-end">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItemClick}
        >
          <Plus size={18} className="mr-1" />
          Add Question
        </button>
      </div>
      {jsonArray.length !== 0 ?
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-zinc-800 text-white ">
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Question</th>
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Answer</th>
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jsonArray.map((item, index) => (
                <tr key={index} className="hover:bg-slate-100">
                  <td className="max-w-[150px] text-center font-semibold whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">{item.question}</td>
                  <td className="max-w-[150px] text-center font-semibold whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">{item.answer}</td>
                  <td className="max-w-[150px] text-center font-semibold whitespace-nowrap overflow-x-auto text-ellipses border px-2 py-2">
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
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white max-h-[700px] overflow-auto min-w-[500px] p-8 rounded-lg shadow-md">
          <h2 className="font-bold mb-2 text-center text-lg">
              {editIndex === -1 ? "Add Faq" : "Edit Faq"}
            </h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="">
              <div className=" mb-2 lg:pr-4">
                <span className="font-bold my-2 -ml-2">Question</span>

                <input
                  type="text"
                  placeholder="Question"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editedItem.question}
                  onChange={(e) => handleInputChange(e, "question")}
                />
              </div>
              <div className="mb-2 lg:pr-4">
                <span className="font-bold my-2 -ml-2">Answer</span>

                <input
                  type="text"
                  placeholder="Answer"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.answer}
                  onChange={(e) => handleInputChange(e, "answer")}
                />
              </div>

            </div>
            <div className="flex mt-3">
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

export default AdminFaq;