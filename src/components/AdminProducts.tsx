// import React, { useEffect, useState } from "react";
// import { fetchJsonData } from "@/helpers/getJSONData";
// import { updateJsonFile } from "@/helpers/updateJSONData";
// import { Check, X, Trash, Edit, Plus } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// const AdminComponent = () => {
//   const [jsonData, setJsonData] = useState<any[]>([]);
//   const [toggleNewCat, setToggleNewCat] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedCat, setSelectedCat] = useState<string | null>(null);
//   const [newCategory, setNewCategory] = useState<string>("");
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [editedItem, setEditedItem] = useState<any>({
//     id: "",
//     title: "",
//     price: "",
//     previousPrice: 0,
//     description: "",
//     count: 0,
//     image1: "",
//     image2: "",
//     image3: "",
//     brand: "",
//     isNew: false,
//     quantity: 1,
//   });
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchJsonData("robotech/pages/categories.json");
//         setJsonData(data);
//         if (data.length > 0) {
//           setSelectedSectionIndex(0); // Initialize with the first section
//         }
//       } catch (error) {
//         toast.error(`${(error as Error).message}`);
//       }
//     };

//     fetchData();
//   }, [selectedCat]);

//   const handleAddItemClick = () => {
//     setEditIndex(-1);
//     setEditedItem({
//       id: "",
//       title: "",
//       price: "",
//       previousPrice: 0,
//       description: "",
//       count: 0,
//       image1: "",
//       image2: "",
//       image3: "",
//       brand: "",
//       isNew: false,
//       quantity: 1,
//     });
//     setError(null);
//   };

//   const handleRemoveItem = async (sectionIndex: number, itemIndex: number) => {
//     const updatedData = [...jsonData];
//     updatedData[sectionIndex][selectedCat!].splice(itemIndex, 1);

//     try {
//       await updateJsonFile("robotech/pages/categories.json", updatedData);
//       setJsonData(updatedData);
//       toast.success(`Item removed successfully`);
//     } catch (error) {
//       toast.error(`${(error as Error).message}`);
//     }
//   };

//   const handleEditClick = (sectionIndex: number, itemIndex: number) => {
//     setEditIndex(itemIndex);
//     setEditedItem({ ...jsonData[sectionIndex][selectedCat!][itemIndex] });
//   };

//   const handleEditSubmit = async (sectionIndex: number) => {
//     if (
//       !editedItem.id ||
//       !editedItem.id ||
//       !editedItem.title ||
//       !editedItem.price ||
//       !editedItem.previousPrice ||
//       !editedItem.description ||
//       !editedItem.count ||
//       !editedItem.image1 ||
//       !editedItem.brand
//     ) {
//       toast.error("All fields are required");
//       return;
//     }
//     if (editIndex !== null) {
//       let updatedData = [...jsonData];

//       if (editIndex === -1) {
//         updatedData[sectionIndex][selectedCat!].push(editedItem);
//       } else {
//         updatedData[sectionIndex][selectedCat!][editIndex] = editedItem;
//       }

//       try {
//         await updateJsonFile("robotech/pages/categories.json", updatedData);
//         setJsonData(updatedData);
//         setEditIndex(null);
//         setError(null);
//         toast.success(`Item was updated`);
//       } catch (error) {
//         toast.error(`${(error as Error).message}`);
//       }
//     }
//   };

//   const handleEditCancel = () => {
//     setEditIndex(null);
//     setEditedItem({});
//     toast.success(`The cancellation process was successful.`);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     key: string
//   ) => {
//     setEditedItem((prev) => ({ ...prev, [key]: e.target.value }));
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewCategory(e.target.value);
//   };

//   const handleAddCategory = async () => {
//     if (newCategory.trim() !== "") {
//       const updatedData = [...jsonData];
//       const newCategoryName = newCategory.toLowerCase();

//       if (!updatedData[selectedSectionIndex!][newCategoryName]) {
//         updatedData[selectedSectionIndex!][newCategoryName] = [];
//         setJsonData(updatedData);
//         setSelectedCat(newCategoryName);
//         setNewCategory("");

//         // Update JSON file
//         try {
//           await updateJsonFile("robotech/pages/categories.json", updatedData);
//           setError(null); // Clear any previous error
//           toast.success(`Added new category "${newCategoryName}"`);
//         } catch (error) {
//           toast.error(`${(error as Error).message}`);
//         }
//       } else {
//         toast.error(`Category already exists`);
//       }
//     } else {
//       toast.error(`Category name cannot be empty`);
//     }
//   };

//   const handleDeleteCategory = async () => {
//     if (selectedCat !== null && selectedSectionIndex !== null) {
//       const updatedData = [...jsonData];
//       delete updatedData[selectedSectionIndex][selectedCat];

//       try {
//         await updateJsonFile("robotech/pages/categories.json", updatedData);
//         setJsonData(updatedData);
//         setSelectedCat(null);
//         setNewCategory("");
//         toast.success(`Category "${selectedCat}" has been deleted`);
//       } catch (error) {
//         toast.error(`${(error as Error).message}`);
//       }
//     }
//   };

//   return (
//     <>
//       <div className={`lg:p-3 w-full z-10 bottom-0 left-0 overflow-hidden mt-5`}>
//         <div className="overflow-x-auto">
//           {jsonData.length > 0 && (
//             <div className="mb-5">
//               <label htmlFor="sectionDropdown" className="font-bold mb-2">
//                 Select Category:
//               </label>
//               <select
//                 id="sectionDropdown"
//                 className="p-2 border border-gray-300 rounded"
//                 value={selectedCat !== null ? selectedCat : ""}
//                 onChange={(e) => {
//                   const selectedItem = e.target.value;
//                   setSelectedCat(selectedItem);
//                   const sectionIndex = e.target.selectedIndex;
//                   setSelectedSectionIndex(sectionIndex);
//                 }}
//               >
//                 {/* <optgroup label="Swedish Cars"> */}
//                 {jsonData.flatMap((section, sectionIndex) =>
//                   Object.keys(section).map((item) => {
//                     return <option
//                       data-selected={item}
//                       key={`${sectionIndex}-${item}`}
//                       value={item}
//                     >
//                       {item}
//                     </option>
//                   }))
//                 }
//                 {/* </optgroup> */}
//               </select>
//               {
//                 selectedCat ? <button
//                   className="text-xs rounded-md absolute top-0 right-4 ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
//                   onClick={handleDeleteCategory}
//                 >
//                   Delete {selectedCat} Category
//                 </button> : null
//               }

//               <div>
//                 <span
//                   onClick={() => setToggleNewCat(false)}
//                   className={`${toggleNewCat ? "block" : "hidden"} mt-2`}>Category not exist ? <span className="cursor-pointer text-blue-400">add category</span></span>
//                 <div className={`${toggleNewCat ? "hidden" : "block"}`}>
//                   <input
//                     type="text"
//                     placeholder="New Category"
//                     className="w-full p-2 border mt-3 border-gray-300 rounded"
//                     value={newCategory}
//                     onChange={handleCategoryChange}
//                   />
//                   <button
//                     className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                     onClick={handleAddCategory}
//                   >
//                     Add Category
//                   </button>
//                   <button
//                     className="mt-2 ml-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => setToggleNewCat(true)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {selectedSectionIndex !== null && jsonData[selectedSectionIndex] && selectedCat && (
//             <div key={selectedSectionIndex} className="mt-5">
//               <h2 className="font-bold mb-4">{selectedCat}</h2>
//               <table className="min-w-full border border-gray-300 text-sm">
//                 <thead>
//                   <tr className="bg-zinc-800 text-white ">
//                     <th className="border px-4 py-2">Id</th>
//                     <th className="border px-4 py-2">Title</th>
//                     <th className="border px-4 py-2">Price</th>
//                     <th className="border px-4 py-2">Previous Price</th>
//                     <th className="border px-4 py-2">Image1</th>
//                     <th className="border px-4 py-2">Image2</th>
//                     <th className="border px-4 py-2">Image3</th>
//                     <th className="border px-4 py-2">Description</th>
//                     <th className="border px-4 py-2">Count</th>
//                     <th className="border px-4 py-2">Brand</th>
//                     <th className="border px-4 py-2">Is New</th>
//                     <th className="border px-4 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {jsonData[selectedSectionIndex][selectedCat!]?.map((item: any, itemIndex: number) => (
//                     <tr key={itemIndex} className="hover:bg-slate-100">
//                       <td className="border px-4 py-2">{item.id}</td>
//                       <td className="border px-4 py-2">{item.title}</td>
//                       <td className="border px-4 py-2">{item.price}</td>
//                       <td className="border px-4 py-2">{item.previousPrice}</td>
//                       <td className="border px-4 py-2"><img src={item.image1} alt={`Item ${item.id}`} width="70" /></td>
//                       <td className="border px-4 py-2"><img src={item.image2} alt={`Item ${item.id}`} width="70" /></td>
//                       <td className="border px-4 py-2"><img src={item.image3} alt={`Item ${item.id}`} width="70" /></td>
//                       <td className="border px-4 py-2">{item.description}</td>
//                       <td className="border px-4 py-2">{item.count}</td>
//                       <td className="border px-4 py-2">{item.brand}</td>
//                       {/* <td className="border px-4 py-2">{item.isNew ? "Yes": "No"}</td> */}
//                       <td className="border px-2 py-2">
//                         <button
//                           className="mr-1"
//                           onClick={() => handleEditClick(selectedSectionIndex, itemIndex)}
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button
//                           className="mr-1"
//                           onClick={() => handleRemoveItem(selectedSectionIndex, itemIndex)}
//                         >
//                           <Trash size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {editIndex !== null && (
//                 <div className="mt-5">
//                   <h2 className="font-bold mb-2">
//                     {editIndex === -1 ? "Add New Item" : "Edit Item"}
//                   </h2>
//                   <div className="flex flex-col lg:flex-row flex-wrap">
//                     <div className=" flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="ID"
//                         className="w-full p-2 border border-gray-300 rounded"
//                         value={editedItem.id}
//                         onChange={(e) => handleInputChange(e, "id")}
//                       />
//                     </div>
//                     <div className=" flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Title"
//                         className="w-full p-2 border border-gray-300 rounded"
//                         value={editedItem.title}
//                         onChange={(e) => handleInputChange(e, "title")}
//                       />
//                     </div>
//                     <div className="flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Price"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.price}
//                         onChange={(e) => handleInputChange(e, "price")}
//                       />
//                     </div>
//                     <div className="flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Previous Price"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.previousPrice}
//                         onChange={(e) => handleInputChange(e, "previousPrice")}
//                       />
//                     </div>
//                     <div className="flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Image1"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.image1}
//                         onChange={(e) => handleInputChange(e, "image1")}
//                       />
                      
//                     </div>
//                     <div className="flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Image2"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.image2}
//                         onChange={(e) => handleInputChange(e, "image2")}
//                       />
                      
//                     </div>
//                     <div className="flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Image3"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.image3}
//                         onChange={(e) => handleInputChange(e, "image3")}
//                       />
                      
//                     </div>
//                     <div className="flex-1 mb-2  lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Description"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.description}
//                         onChange={(e) => handleInputChange(e, "description")}
//                       />
//                     </div>
//                     <div className="flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Count"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.count}
//                         onChange={(e) => handleInputChange(e, "count")}
//                       />
//                     </div>
//                     <div className="flex-col mb-2 lg:pr-4">
//                       <input
//                         type="text"
//                         placeholder="Brand"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.brand}
//                         onChange={(e) => handleInputChange(e, "brand")}
//                       />
//                     </div>
//                     {/* <div className="flex-col mb-2 lg:pr-4">
//                       <input
//                         type="quantity"
//                         placeholder="1"
//                         className="p-2 w-full border border-gray-300 rounded"
//                         value={editedItem.quantity}
//                         onChange={(e) => handleInputChange(e, "quantity")}
//                         disabled
//                       />
//                     </div> */}
//                   </div>
//                   <div className="flex">
//                     <button
//                       className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
//                       onClick={() => handleEditSubmit(selectedSectionIndex)}
//                     >
//                       <Check size={18} className="mr-1" />
//                       Save
//                     </button>
//                     <button
//                       className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                       onClick={handleEditCancel}
//                     >
//                       <X size={18} className="mr-1" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>

//               )}
//             </div>
//           )}
//         </div>
//         {selectedCat && <div className="mt-5">
//           <button
//             className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//             onClick={handleAddItemClick}
//           >
//             <Plus size={18} className="mr-1" />
//             Add Item
//           </button>
//         </div>}
//       </div>
//       <Toaster
//         position="bottom-right"
//         toastOptions={{
//           style: {
//             background: "#000",
//             color: "#fff",
//           },
//         }}
//       />
//     </>
//   );
// };

// export default AdminComponent;


import React, { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonData("robotech/pages/categories.json");
        setJsonData(data);
        if (data.length > 0) {
          setSelectedSectionIndex(0);
        }
        if (data.length > 0 && Object.keys(data[0]).length > 0 && !selectedCat ) {
          const firstCategory = Object.keys(data[0])[0];
          setSelectedCat(firstCategory);
        }
        
      } catch (error) {
        toast.error(`${(error as Error).message}`);
      }
    };

    fetchData();
  }, [selectedCat,jsonData]);

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
        toast.loading(`Be patient, changes takes a few moments to be reflected`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
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

        try {
          await updateJsonFile("robotech/pages/categories.json", updatedData);
          toast.success(`Added new category "${newCategoryName}"`);
          toast.loading(`Be patient, changes takes a few moments to be reflected`);
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
    if (selectedCat !== null && selectedSectionIndex !== null) {
      const updatedData = [...jsonData];
      delete updatedData[selectedSectionIndex][selectedCat];

      try {
        await updateJsonFile("robotech/pages/categories.json", updatedData);
        setJsonData(updatedData);
        setSelectedCat(null);
        setNewCategory("");
        toast.success(`Category "${selectedCat}" has been deleted`);
        toast.loading(`Be patient, changes takes a few moments to be reflected`);
        setTimeout(() => {
          toast.dismiss();

        }, 5000);
      } catch (error) {
        toast.error(`${(error as Error).message}`);
      }
    }
  };

  return (
    <>
      <div className="lg:p-3 w-full  min-h-[400px] z-10 bottom-0 left-0 overflow-hidden mt-5">
        <div className="overflow-x-auto">
          {jsonData.length > 0 && (
            <div className="mb-5">
              <label htmlFor="sectionDropdown" className="font-bold mb-2">
                Select Category:
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
              {selectedCat && (
                <button
                  className="text-xs rounded-md absolute top-0 right-4 ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteCategory}
                >
                  Delete {selectedCat} Category
                </button>
              )}

              <div>
                <span
                  onClick={() => setToggleNewCat(false)}
                  className={`${toggleNewCat ? "block" : "hidden"} mt-2`}
                >
                  Category not exist ?{" "}
                  <span className="cursor-pointer text-blue-400">add category</span>
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
              <div key={selectedSectionIndex} className="mt-5">
                <span className="font-bold mb-4">list of {selectedCat} products</span>
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-zinc-800 text-white ">
                      <th className="border px-4 py-2">Id</th>
                      <th className="border px-4 py-2">Title</th>
                      <th className="border px-4 py-2">Price</th>
                      <th className="border px-4 py-2">Previous Price</th>
                      <th className="border px-4 py-2">Image1</th>
                      <th className="border px-4 py-2">Image2</th>
                      <th className="border px-4 py-2">Image3</th>
                      <th className="border px-4 py-2">Description</th>
                      <th className="border px-4 py-2">Count</th>
                      <th className="border px-4 py-2">Brand</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jsonData[selectedSectionIndex][selectedCat!]?.map(
                      (item: any, itemIndex: number) => (
                        <tr key={itemIndex} className="hover:bg-slate-100">
                          <td className="border px-4 py-2">{item.id}</td>
                          <td className="border px-4 py-2">{item.title}</td>
                          <td className="border px-4 py-2">{item.price}</td>
                          <td className="border px-4 py-2">{item.previousPrice}</td>
                          <td className="border px-4 py-2">
                            <img src={item.image1} alt={`Item ${item.id}`} width="70" />
                          </td>
                          <td className="border px-4 py-2">
                            <img src={item.image2} alt={`Item ${item.id}`} width="70" />
                          </td>
                          <td className="border px-4 py-2">
                            <img src={item.image3} alt={`Item ${item.id}`} width="70" />
                          </td>
                          <td className="border px-4 py-2">{item.description}</td>
                          <td className="border px-4 py-2">{item.count}</td>
                          <td className="border px-4 py-2">{item.brand}</td>
                          <td className="border px-2 py-2">
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
                                handleRemoveItem(selectedSectionIndex, itemIndex)
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
                        id: "ID",
                        title: "Title",
                        price: "Price",
                        previousPrice: "Previous Price",
                        image1: "Image1",
                        image2: "Image2",
                        image3: "Image3",
                        description: "Description",
                        count: "Count",
                        brand: "Brand",
                      }).map(([key, placeholder]) => (
                        <div key={key} className=" flex-col mb-2 lg:pr-4">
                          <input
                            type="text"
                            placeholder={placeholder}
                            className="w-full p-2 border border-gray-300 rounded"
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
