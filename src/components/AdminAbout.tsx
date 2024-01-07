import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";

const AdminAbout = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
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
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const handleAddItemClick = () => {
    setEditIndex(-1); // Use -1 to indicate a new item
    setEditedItem({
      id: "",
      title: "",
      description: "",
      link_text: "",
      link_url: "",
    });
    setError(null); // Reset error state
  };

  const handleRemoveItem = async (index: number) => {
    const updatedArray = [...jsonArray];
    updatedArray.splice(index, 1);

    try {
      await updateJsonFile("robotech/pages/about.json", updatedArray);
      setJsonArray(updatedArray);
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
      !editedItem.title ||
      !editedItem.description ||
      !editedItem.link_text ||
      !editedItem.link_url
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
        await updateJsonFile("robotech/pages/about.json", updatedArray);
        setJsonArray(updatedArray);
        setEditIndex(null);
        setError(null); // Reset error state
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
    <div className={`lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>
      <h2 className="font-bold mb-4">Current About data:</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-zinc-800 text-white ">
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Link text</th>
              <th className="border px-4 py-2">URL</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jsonArray.map((item, index) => (
              <tr key={index} className="hover:bg-slate-100">
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.link_text}</td>
                <td className="cursor-pointer border px-4 py-2 flex hover:underline hover:text-blue-400 group:hover:bg-white">
                  <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="group-hover:text-blue-400">
                    {item.link_url}
                  </a>
                </td>
                <td className="border px-2 py-2">
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
      </div>

      {editIndex !== null && (
        <div className="mt-5">
          <h2 className="font-bold mb-2">
            {editIndex === -1 ? "Add New Item" : "Edit Item"}
          </h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 mb-2 lg:pr-4">
              <input
                type="text"
                placeholder="ID"
                className="p-2 border border-gray-300 rounded"
                value={editedItem.id}
                onChange={(e) => handleInputChange(e, "id")}
              />
            </div>
            <div className="lg:w-1/4 mb-2 lg:pr-4">
              <input
                type="text"
                placeholder="Title"
                className="p-2 border border-gray-300 rounded"
                value={editedItem.title}
                onChange={(e) => handleInputChange(e, "title")}
              />
            </div>
            <div className="lg:w-1/4 mb-2 lg:pr-4">
              <input
                type="text"
                placeholder="Description"
                className="p-2 border border-gray-300 rounded"
                value={editedItem.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </div>
            <div className="lg:w-1/4 mb-2 lg:pr-4">
              <input
                type="text"
                placeholder="Link Text"
                className="p-2 border border-gray-300 rounded"
                value={editedItem.link_text}
                onChange={(e) => handleInputChange(e, "link_text")}
              />
            </div>
            <div className="lg:w-1/4 mb-2 lg:pr-4">
              <input
                type="text"
                placeholder="URL"
                className="p-2 border border-gray-300 rounded"
                value={editedItem.link_url}
                onChange={(e) => handleInputChange(e, "link_url")}
              />
            </div>
          </div>
          <div className="flex">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleEditSubmit}
            >
              <Check size={18} className="mr-1" />
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleEditCancel}
            >
              <X size={18} className="mr-1" />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-5">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItemClick}
        >
          <Plus size={18} className="mr-1" />
          Add Item
        </button>
      </div>
    </div>
  );
};

export default AdminAbout;