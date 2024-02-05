import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const AdminAbout = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>({
    id: "",
    title: "",
    description: "",
    link_text: "",
    link_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonData("robotech/pages/about.json");
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
      id: uuidv4(),
      title: "",
      description: "",
      link_text: "",
      link_url: "",
    });
  };

  const handleRemoveItem = async (index: number) => {
    const updatedArray = [...jsonArray];
    updatedArray.splice(index, 1);

    try {
      await updateJsonFile("robotech/pages/about.json", updatedArray);
      setJsonArray(updatedArray);
      toast.success(`Item removed successfully`);
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
      !editedItem.title ||
      !editedItem.description ||
      !editedItem.link_text ||
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
        await updateJsonFile("robotech/pages/about.json", updatedArray);
        setJsonArray(updatedArray);
        setEditIndex(null);
        toast.success(`Item Added/Updated successfully`);
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

  return (
    <div className={`min-h-[400px] lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

      {!jsonArray && <h2 className="font-bold mb-4">Current About data:</h2>}
      <div className="mb-5 flex items-center justify-end">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItemClick}
        >
          <Plus size={18} className="mr-1" />
          Add Data
        </button>
      </div>
      {jsonArray.length !== 0 ?
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-zinc-800 text-white ">
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">Title</th>
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">Description</th>
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">Link text</th>
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">URL</th>
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jsonArray.map((item, index) => (
                <tr key={index} className="hover:bg-slate-100">
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">{item.title}</td>
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">{item.description}</td>
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">{item.link_text}</td>
                  <td className="cursor-pointer max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2 flex hover:underline hover:text-blue-400 group:hover:bg-white">
                    <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="group-hover:text-blue-400">
                      {item.link_url}
                    </a>
                  </td>
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-2 py-2">
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
          <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">


          <h2 className="font-bold mb-2 text-center text-lg">
              {editIndex === -1 ? "Add About Data" : "Edit About Data"}
            </h2>
            <div className="">
              <div className=" mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Title</span>

                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editedItem.title}
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </div>
              <div className="mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Description</span>

                <input
                  type="text"
                  placeholder="Description"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.description}
                  onChange={(e) => handleInputChange(e, "description")}
                />
              </div>
              <div className="mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Link Text</span>

                <input
                  type="text"
                  placeholder="Link Text"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.link_text}
                  onChange={(e) => handleInputChange(e, "link_text")}
                />
              </div>
              <div className=" mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">URL</span>

                <input
                  type="text"
                  placeholder="URL"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editedItem.link_url}
                  onChange={(e) => handleInputChange(e, "link_url")}
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

export default AdminAbout;