import React, { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Plus } from "lucide-react";

const AdminComponent = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>({
    title: "",
    price: 0,
  });
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonData("robotech/pages/categories.json");
        setJsonData(data);
        if (data.length > 0) {
          setSelectedSectionIndex(0); // Initialize with the first section
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const handleAddItemClick = () => {
    setEditIndex(-1);
    setEditedItem({
      title: "",
      price: 0,
    });
    setError(null);
  };

  const handleRemoveItem = async (sectionIndex: number, itemIndex: number) => {
    const updatedData = [...jsonData];
    updatedData[sectionIndex].sensors.splice(itemIndex, 1);

    try {
      await updateJsonFile("robotech/pages/categories.json", updatedData);
      setJsonData(updatedData);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEditClick = (sectionIndex: number, itemIndex: number) => {
    setEditIndex(itemIndex);
    setEditedItem({ ...jsonData[sectionIndex].sensors[itemIndex] });
  };

  const handleEditSubmit = async (sectionIndex: number) => {
    if (!editedItem.title || editedItem.price === undefined) {
      setError("All fields are required");
      return;
    }

    if (editIndex !== null) {
      let updatedData = [...jsonData];

      if (editIndex === -1) {
        updatedData[sectionIndex].sensors.push(editedItem);
      } else {
        updatedData[sectionIndex].sensors[editIndex] = editedItem;
      }

      try {
        await updateJsonFile("robotech/pages/categories.json", updatedData);
        setJsonData(updatedData);
        setEditIndex(null);
        setError(null);
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
      <div className="overflow-x-auto">
        {jsonData.length > 0 && (
          <div className="mb-5">
            <label htmlFor="sectionDropdown" className="font-bold mb-2">Select Section:</label>
            <select
              id="sectionDropdown"
              className="p-2 border border-gray-300 rounded"
              value={selectedSectionIndex !== null ? selectedSectionIndex.toString() : ''}
              onChange={(e) => setSelectedSectionIndex(parseInt(e.target.value))}
            >
              {jsonData.map((section, index) => (
                <option key={index} value={index.toString()}>
                  {Object.keys(section)[1]}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedSectionIndex !== null && jsonData[selectedSectionIndex] && (
          <div key={selectedSectionIndex} className="mt-5">
            <h2 className="font-bold mb-4">{Object.keys(jsonData[selectedSectionIndex])[1]}</h2>
            <table className="min-w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-zinc-800 text-white ">
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jsonData[selectedSectionIndex].sensors.map((item: any, itemIndex: number) => (
                  <tr key={itemIndex} className="hover:bg-slate-100">
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{item.price}</td>
                    <td className="border px-2 py-2">
                      <button
                        className="mr-1"
                        onClick={() => handleEditClick(selectedSectionIndex, itemIndex)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="mr-1"
                        onClick={() => handleRemoveItem(selectedSectionIndex, itemIndex)}
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {editIndex !== null && (
              <div className="mt-5">
                <h2 className="font-bold mb-2">
                  {editIndex === -1 ? "Add New Item" : "Edit Item"}
                </h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <div className="flex flex-col lg:flex-row">
                  <div className=" mb-2 lg:pr-4">
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={editedItem.title}
                      onChange={(e) => handleInputChange(e, "title")}
                    />
                  </div>
                  <div className=" mb-2 lg:pr-4">
                    <input
                      type="number"
                      placeholder="Price"
                      className="p-2 w-full border border-gray-300 rounded"
                      value={editedItem.price}
                      onChange={(e) => handleInputChange(e, "price")}
                    />
                  </div>
                </div>
                <div className="flex">
                  <button
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEditSubmit(selectedSectionIndex)}
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
          </div>
        )}
      </div>

      <div className="mt-5">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItemClick}
        >
          <Plus size={18} className="mr-1" />
          Add Item
        </button>
      </div>
    </div>
  );
};

export default AdminComponent;
