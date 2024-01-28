import React, { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Plus, Upload } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import ImageUpload from "./ImageUpload";

const AdminComponent = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [toggleNewCat, setToggleNewCat] = useState<boolean>(true);
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
    image1: "",
    image2: "",
    image3: "",
    brand: "",
    isNew: false,
    quantity: 1,
    category: selectedCat,
  });
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonData("robotech/pages/categories.json");
        setJsonData(data);
        if (data.length > 0) {
          setSelectedSectionIndex(0);
        }
        if (
          data.length > 0 &&
          Object.keys(data[0]).length > 0 &&
          !selectedCat
        ) {
          const firstCategory = Object.keys(data[0])[0];
          setSelectedCat(firstCategory);
        }
      } catch (error) {
        toast.error(`${(error as Error).message}`);
      }
    };

    fetchData();
  }, [selectedCat, jsonData]);

  const handleAddItemClick = () => {
    setEditIndex(-1);
    setEditedItem({
      id: "",
      title: "",
      price: "",
      previousPrice: 0,
      description: "",
      count: 0,
      image1: "",
      image2: "",
      image3: "",
      brand: "",
      isNew: false,
      quantity: 1,
      category: selectedCat,
    });
  };

  const handleRemoveItem = async (sectionIndex: number, itemIndex: number) => {
    const updatedData = [...jsonData];
    updatedData[sectionIndex][selectedCat!].splice(itemIndex, 1);

    try {
      await updateJsonFile("robotech/pages/categories.json", updatedData);
      setJsonData(updatedData);
      toast.success(`Item removed successfully`);
      toast.loading(`Be patient, changes takes a few moments to be reflected`);
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    } catch (error) {
      toast.error(`${(error as Error).message}`);
    }
  };

  const handleEditClick = (sectionIndex: number, itemIndex: number) => {
    setEditIndex(itemIndex);
    setEditedItem({ ...jsonData[sectionIndex][selectedCat!][itemIndex] });
  };

  const handleEditSubmit = async (sectionIndex: number) => {
    const requiredFields = [
      "id",
      "title",
      "price",
      "previousPrice",
      "description",
      "count",
      "image1",
      "brand",
    ];

    if (requiredFields.some((field) => !editedItem[field])) {
      toast.error("All fields are required");
      return;
    }

    if (editIndex !== null) {
      let updatedData = [...jsonData];
      console.log(updatedData)
      if (editIndex === -1) {
        updatedData[sectionIndex][selectedCat!].push(editedItem);
      } else {
        updatedData[sectionIndex][selectedCat!][editIndex] = editedItem;
      }

      try {
        await updateJsonFile("robotech/pages/categories.json", updatedData);
        setJsonData(updatedData);
        setEditIndex(null);
        toast.success(`Item was updated`);
        toast.loading(
          `Be patient, changes takes a few moments to be reflected`
        );
        setTimeout(() => {
          toast.dismiss();
        }, 5000);
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
      console.log(jsonData)
      const newCategoryName = newCategory.toLowerCase();

      if (!updatedData[selectedSectionIndex!][newCategoryName]) {
        updatedData[selectedSectionIndex!][newCategoryName] = [];
        setJsonData(updatedData);
        setSelectedCat(newCategoryName);
        setNewCategory("");

        try {
          await updateJsonFile("robotech/pages/categories.json", updatedData);
          toast.success(`Added new category "${newCategoryName}"`);
          toast.loading(
            `Be patient, changes takes a few moments to be reflected`
          );
          setTimeout(() => {
            toast.dismiss();
          }, 5000);
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
    

    const confirmDelete = window.confirm(
      `Are you sure you want to delete this category?`
    );
   
    


    if (selectedCat !== null && selectedSectionIndex !== null && confirmDelete) {
      const updatedData = [...jsonData];
      delete updatedData[selectedSectionIndex][selectedCat];

      try {
        await updateJsonFile("robotech/pages/categories.json", updatedData);
        setJsonData(updatedData);
        setSelectedCat(null);
        setNewCategory("");
        toast.success(`Category "${selectedCat}" has been deleted`);
        toast.loading(
          `Be patient, changes takes a few moments to be reflected`
        );
        setTimeout(() => {
          toast.dismiss();
        }, 5000);
      } catch (error) {
        toast.error(`${(error as Error).message}`);
      }
    }
  };
  const handleImageChange = (index: number, imageUrl: string | null) => {
    setEditedItem((prev) => ({ ...prev, [`image${index}`]: imageUrl }));
  };
  return (
    <>
      <div className="lg:p-3  min-h-[400px] z-10 bottom-0 left-0 overflow-hidden mt-5">
        <div className="overflow-x-auto">
          {jsonData.length > 0 && (
            <div className="mb-5">
              <label htmlFor="sectionDropdown" className="font-bold mb-2">
                Select Category:
              </label>
              <select
                id="sectionDropdown"
                className="my-2 appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                value={selectedCat !== null ? selectedCat : ""}
                onChange={(e) => {
                  const selectedItem = e.target.value;
                  setSelectedCat(selectedItem);
                  const sectionIndex = e.target.selectedIndex + 1;
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
              {selectedCat && (
                <button
                  className="text-xs rounded-md absolute top-5 right-4 ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteCategory}
                >
                  Delete {selectedCat} Category
                </button>
              )}

              <div>
                <span

                  className={`${toggleNewCat ? "block" : "hidden"} mt-2`}
                >
                  Category not exist ?{" "}
                  <span onClick={() => setToggleNewCat(false)} className="cursor-pointer text-blue-400">
                    add category
                  </span>
                </span>
                <div className={`${toggleNewCat ? "hidden" : "block"}`}>
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
                  <button
                    className="mt-2 ml-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setToggleNewCat(true)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {selectedSectionIndex !== null &&
            jsonData[selectedSectionIndex] &&
            selectedCat && (
              <div key={selectedSectionIndex} className="mt-5 max-w-4xl">
                <span className="font-bold mb-4">
                  list of {selectedCat} products
                </span>
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-zinc-800 text-white ">
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Id
                      </th>
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Title
                      </th>
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Price
                      </th>
                      {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Previous Price
                      </th> */}
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Image1
                      </th>
                      {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Image2
                      </th>
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Image3
                      </th>
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Description
                      </th>
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Count
                      </th>
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Brand
                      </th> */}
                      <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jsonData[selectedSectionIndex][selectedCat!]?.map(
                      (item: any, itemIndex: number) => (
                        <tr key={itemIndex} className="hover:bg-slate-100">
                          <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                            {item.id}
                          </td>
                          <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                            {item.title}
                          </td>
                          <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                            {item.price}
                          </td>
                          {/* <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                            {item.previousPrice}
                          </td> */}
                          <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                            <img
                              src={item.image1}
                              alt={`Item ${item.id}`}
                              width="70"
                            />
                          </td>
                          {/* <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2"> 
                          <img
                              src={item.image2}
                              alt={`Item ${item.id}`}
                              width="70"
                            />
                          </td>
                           <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                            <img
                              src={item.image3}
                              alt={`Item ${item.id}`}
                              width="70"
                            />
                          </td>  
                           <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses order px-4 py-2">
                            {item.description}
                          </td>
                          <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                            {item.count}
                          </td>
                          <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                            {item.brand}
                          </td> */}
                          <td className=" font-semibold text-center max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-2 py-2">
                            <button
                              className="mr-1"
                              onClick={() =>
                                handleEditClick(selectedSectionIndex, itemIndex)
                              }
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="mr-1"
                              onClick={() =>
                                handleRemoveItem(
                                  selectedSectionIndex,
                                  itemIndex
                                )
                              }
                            >
                              <Trash size={16} />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                {editIndex !== null && (
                  <div className="mt-5">
                    <h2 className="font-bold mb-2">
                      {editIndex === -1 ? "Add New Item" : "Edit Item"}
                    </h2>
                    <div className="flex flex-col lg:flex-row flex-wrap">
                      {Object.entries({
                        id: 'ID',
                        title: 'Title',
                        description: 'Description',
                        price: 'Price',
                        previousPrice: 'Previous Price',
                        count: 'Count',
                        brand: 'Brand',
                        image1: 'Image1',
                        image2: 'Image2',
                        image3: 'Image3',
                      }).map(([key, placeholder], index) => (
                        <div key={key} className={`${key.startsWith('image') ? 'h-[200px] border inline-block border-slate-400 rounded flex-col mx-auto flex items-center justify-center gap-3 border-dashed' : 'w-full'} flex-col mb-2 lg:pr-4`}>
                          {/* {key.startsWith('image') ? <ImageUpload onInputChange={(e) => handleInputChange(e, key)} onImageChange={handleImageChange} index={index} /> : null} */}
                          {editedItem[key] && key.startsWith('image') && (
                            <img src={editedItem[key]} alt={`Uploaded ${key}`} className="mt-2" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                          )}
                          <span className="font-bold text-sm mb-2 inline-block ml-1">{placeholder}</span>
                          <input
                            type="text"
                            placeholder={placeholder}
                            className={`outline-none w-full p-2 border-0 rounded`}
                            value={editedItem[key]}
                            onChange={(e) => handleInputChange(e, key)}
                          />
                        </div>
                      ))}
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
        {selectedCat && (
          <div className="mt-5">
            <button
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddItemClick}
            >
              <Plus size={18} className="mr-1" />
              Add Item
            </button>
          </div>
        )}
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
