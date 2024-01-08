import React, { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const AdminComponent = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>({
    id: "",
    title: "",
    price: "",
    previousPrice: 0,
    description: "",
    count: 0,
    image: "",
    brand: ""
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
        toast.error(`${(error as Error).message}`);
      }
    };

    fetchData();
  }, [selectedCat]);

  const handleAddItemClick = () => {
    setEditIndex(-1);
    setEditedItem({
      id: "",
      title: "",
      price: "",
      previousPrice: 0,
      description: "",
      count: 0,
      image: "",
      brand: ""
    });
    setError(null);
  };

  const handleRemoveItem = async (sectionIndex: number, itemIndex: number) => {
    const updatedData = [...jsonData];
    updatedData[sectionIndex][selectedCat!].splice(itemIndex, 1);

    try {
      await updateJsonFile("robotech/pages/categories.json", updatedData);
      setJsonData(updatedData);
      toast.success(`Item removed successfully`);
    } catch (error) {
      toast.error(`${(error as Error).message}`);
    }
  };

  const handleEditClick = (sectionIndex: number, itemIndex: number) => {
    setEditIndex(itemIndex);
    setEditedItem({ ...jsonData[sectionIndex][selectedCat!][itemIndex] });
  };

  const handleEditSubmit = async (sectionIndex: number) => {
    // ... (same as before)

    if (editIndex !== null) {
      let updatedData = [...jsonData];

      if (editIndex === -1) {
        updatedData[sectionIndex][selectedCat!].push(editedItem);
      } else {
        updatedData[sectionIndex][selectedCat!][editIndex] = editedItem;
      }

      try {
        await updateJsonFile("robotech/pages/categories.json", updatedData);
        setJsonData(updatedData);
        setEditIndex(null);
        setError(null);
        toast.success(`Item was updated`);
      } catch (error) {
        toast.error(`${(error as Error).message}`);
      }
    }
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditedItem({});
    toast.success(`The cancellation process was successful.`);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setEditedItem((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      const updatedData = [...jsonData];
      const newCategoryName = newCategory.toLowerCase();

      if (!updatedData[selectedSectionIndex!][newCategoryName]) {
        updatedData[selectedSectionIndex!][newCategoryName] = [];
        setJsonData(updatedData);
        setSelectedCat(newCategoryName);
        setNewCategory("");

        // Update JSON file
        try {
          await updateJsonFile("robotech/pages/categories.json", updatedData);
          setError(null); // Clear any previous error
          toast.success(`Added new category "${newCategoryName}"`);
        } catch (error) {
          toast.error(`${(error as Error).message}`);
        }
      } else {
        toast.error(`Category already exists`);
      }
    } else {
      toast.error(`Category name cannot be empty`);
    }
  };

  const handleDeleteCategory = async () => {
    if (selectedCat !== null && selectedSectionIndex !== null) {
      const updatedData = [...jsonData];
      delete updatedData[selectedSectionIndex][selectedCat];

      try {
        await updateJsonFile("robotech/pages/categories.json", updatedData);
        setJsonData(updatedData);
        setSelectedCat(null);
        setNewCategory("");
        toast.success(`Category "${selectedCat}" has been deleted`);
      } catch (error) {
        toast.error(`${(error as Error).message}`);
      }
    }
  };

  return (
    <>
      <div className={`lg:p-3 w-full z-10 bottom-0 left-0 overflow-hidden mt-5`}>
        <div className="overflow-x-auto">
          {jsonData.length > 0 && (
            <div className="mb-5">
              <label htmlFor="sectionDropdown" className="font-bold mb-2">
                Select Section:
              </label>
              <select
                id="sectionDropdown"
                className="p-2 border border-gray-300 rounded"
                value={selectedCat !== null ? selectedCat : ""}
                onChange={(e) => {
                  const selectedItem = e.target.value;
                  setSelectedCat(selectedItem);
                  const sectionIndex = e.target.selectedIndex;
                  setSelectedSectionIndex(sectionIndex);
                }}
              >
                {jsonData.flatMap((section, sectionIndex) =>
                  Object.keys(section).map((item) => (
                    <option
                      data-selected={item}
                      key={`${sectionIndex}-${item}`}
                      value={item}
                    >
                      {item}
                    </option>
                  ))
                )}
              </select>
              <button
                className="text-xs rounded-md absolute top-0 right-4 ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                onClick={handleDeleteCategory}
              >
                Delete {selectedCat} Category
              </button>
              <input
                type="text"
                placeholder="New Category"
                className="w-full p-2 border mt-3 border-gray-300 rounded"
                value={newCategory}
                onChange={handleCategoryChange}
              />
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
            </div>
          )}
          {selectedSectionIndex !== null && jsonData[selectedSectionIndex] && (
            <div key={selectedSectionIndex} className="mt-5">
              <h2 className="font-bold mb-4">{selectedCat}</h2>
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-zinc-800 text-white ">
                    <th className="border px-4 py-2">Id</th>
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Previous Price</th>
                    <th className="border px-4 py-2">Image</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Count</th>
                    <th className="border px-4 py-2">Brand</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jsonData[selectedSectionIndex][selectedCat!]?.map((item: any, itemIndex: number) => (
                    <tr key={itemIndex} className="hover:bg-slate-100">
                      <td className="border px-4 py-2">{item.id}</td>
                      <td className="border px-4 py-2">{item.title}</td>
                      <td className="border px-4 py-2">{item.price}</td>
                      <td className="border px-4 py-2">{item.previousPrice}</td>
                      <td className="border px-4 py-2"><img src={item.image} alt={`Item ${item.id}`} width="70" /></td>
                      <td className="border px-4 py-2">{item.description}</td>
                      <td className="border px-4 py-2">{item.count}</td>
                      <td className="border px-4 py-2">{item.brand}</td>
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
                  <div className="flex flex-col lg:flex-row">
                    {/* ... (existing JSX for input fields) */}
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
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default AdminComponent;
