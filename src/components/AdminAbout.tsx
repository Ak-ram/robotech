import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";

const AdminAbout = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonData('robotech/pages/about.json');
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
  };
  const handleRemoveItem = async (index: number) => {
    const updatedArray = [...jsonArray];
    updatedArray.splice(index, 1);

    try {
      await updateJsonFile('robotech/pages/about.json', updatedArray);
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
        await updateJsonFile('robotech/pages/about.json', updatedArray);
        setJsonArray(updatedArray);
        setEditIndex(null);
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };
  const handleEditCancel = () => {
    setEditIndex(null);
    setEditedItem({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditedItem((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleAddItemSubmit = async () => {
    // Logic to submit the new item
    const updatedArray = [...jsonArray, editedItem];
  
    try {
      await updateJsonFile("robotech/pages/about.json", updatedArray);
      setJsonArray(updatedArray);
      setEditIndex(null);
      setEditedItem({
        id: "",
        title: "",
        description: "",
        link_text: "",
        link_url: "",
      });
    } catch (error) {
      setError(error.message);
    }
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
                <td className="cursor-pointer border px-4 py-2 flex hover:underline hover:text-blue-400 group items-center gap-2">
                  {item.link_url}
                  <Link className="group-hover:opacity-100 opacity-0" size={13} />
                </td>
                <td className="border px-2 py-2">
                  {editIndex === index ? (
                    <>
                      <button className="text-green-400 mr-1" onClick={handleEditSubmit}><Check size={17} /></button>
                      <button className="text-red-400" onClick={handleEditCancel}><X size={17} /></button>
                    </>
                  ) : (
                    <div className="flex gap-1 items-center flex-nowrap">
                      <button onClick={() => handleEditClick(index)}><Edit size={17} /></button>
                      <button className="text-red-400 hover:text-red-500" onClick={() => handleRemoveItem(index)}><Trash size={17} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddItemClick}
      >
        <Plus size={17} className="mr-2" /> Add New Item
      </button>

      {editIndex !== null && (
        <div className="bg-gray-100 p-5 mt-5 border rounded">
          <h2 className="font-bold text-lg mb-3">Edit Item</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              value={editedItem.title}
              onChange={(e) => handleInputChange(e, 'title')}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <input
              type="text"
              value={editedItem.description}
              onChange={(e) => handleInputChange(e, 'description')}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Link Text</label>
            <input
              type="text"
              value={editedItem.link_text}
              onChange={(e) => handleInputChange(e, 'link_text')}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Link URL</label>
            <input
              type="text"
              value={editedItem.link_url}
              onChange={(e) => handleInputChange(e, 'link_url')}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={editIndex !== null ? handleEditSubmit : handleAddItemSubmit}
          >
            {editIndex !== null ? "Update" : "Add"} Item
          </button>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AdminAbout;
