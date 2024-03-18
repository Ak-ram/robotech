// import React, { useEffect, useState } from "react";
// import { fetchJsonData } from "@/helpers/getJSONData";
// import { updateJsonFile } from "@/helpers/updateJSONData";
// import { Check, X, Trash, Edit, Plus, Upload, Search } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import ImageUpload from "./ImageUpload";
// import Stats from "./Stats";
// import Loading from "./Loading";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import FormattedPrice from "./FormattedPrice";
// import { v4 as uuidv4 } from "uuid";
// import CustomSelect from "./CustomSelectbox";
// import { createClient } from "@supabase/supabase-js";
// const AdminComponent = () => {
//   const [jsonData, setJsonData] = useState<any[]>([]);
//   const [toggleNewCat, setToggleNewCat] = useState<boolean>(true);
//   const [selectedCat, setSelectedCat] = useState<string>("sensors");
//   const [newCategory, setNewCategory] = useState<string>("");
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryProducts, setCategoryProducts] = useState<any>([]);
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
//     // brand: "",
//     wholesalePrice: 0,
//     isNew: false,
//     quantity: 1,
//     externalLink: "",
//     category: selectedCat,
//   });
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState<
//     number | null
//   >(null);

import { Edit, Plus, Search, Trash } from "lucide-react";
import { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

//   useEffect(() => {
//     const getList = async () => {
//       const supabase = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//         { db: { schema: "products" } }
//       );

//       const { data } = await supabase.from(selectedCat).select();
//       setCategoryProducts(data!);
//       console.log(data!);
//     };
//     getList();
//   }, []);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const data = await fetchJsonData("robotech/pages/categories.json");
//   //       setJsonData(data);
//   //       if (data.length > 0) {
//   //         setSelectedSectionIndex(0);
//   //       }
//   //       if (
//   //         data.length > 0 &&
//   //         Object.keys(data[0]).length > 0 &&
//   //         !selectedCat
//   //       ) {
//   //         const firstCategory = Object.keys(data[0])[0];
//   //         setSelectedCat(firstCategory);
//   //       }
//   //     } catch (error) {
//   //       toast.error(`${(error as Error).message}`);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [selectedCat, jsonData]);

//   const handleAddItemClick = () => {
//     setEditIndex(-1);
//     setEditedItem({
//       id: uuidv4(),
//       title: "",
//       price: "",
//       previousPrice: "",
//       description: "",
//       count: 1,
//       image1: "",
//       image2: "",
//       image3: "",
//       externalLink: "",
//       isNew: false,
//       quantity: 1,
//       category: selectedCat,
//       wholesalePrice: 0,
//     });
//   };

//   const handleRemoveItem = async (sectionIndex: number, itemIndex: number) => {
//     const confirm = window.confirm("Sure to Delete ?");
//     if (confirm) {
//       const updatedData = [...jsonData];
//       updatedData[sectionIndex][selectedCat!].splice(itemIndex, 1);

//       try {
//         await updateJsonFile("robotech/pages/categories.json", updatedData);
//         setJsonData(updatedData);
//         toast.success(`Item removed successfully`);
//         toast.loading(
//           `Be patient, changes takes a few moments to be reflected`
//         );
//         setTimeout(() => {
//           toast.dismiss();
//         }, 5000);
//       } catch (error) {
//         toast.error(`${(error as Error).message}`);
//       }
//     }
//   };

//   const handleEditClick = (sectionIndex: number, itemIndex: number) => {
//     setEditIndex(itemIndex);
//     setEditedItem({ ...jsonData[sectionIndex][selectedCat!][itemIndex] });
//   };

//   const handleEditSubmit = async (sectionIndex: number) => {
//     const requiredFields = [
//       "id",
//       "title",
//       "price",
//       "previousPrice",
//       "description",
//       "count",
//       "image1",
//       // "brand",
//     ];

//     if (requiredFields.some((field) => !editedItem[field])) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (editIndex !== null) {
//       let updatedData = [...jsonData];
//       console.log(updatedData);
//       if (editIndex === -1) {
//         updatedData[sectionIndex][selectedCat!].push(editedItem);
//       } else {
//         updatedData[sectionIndex][selectedCat!][editIndex] = editedItem;
//       }

//       try {
//         await updateJsonFile("robotech/pages/categories.json", updatedData);
//         setJsonData(updatedData);
//         setEditIndex(null);
//         toast.success(`Item was updated`);
//         toast.loading(
//           `Be patient, changes takes a few moments to be reflected`
//         );
//         setTimeout(() => {
//           toast.dismiss();
//         }, 5000);
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
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     key: string
//   ) => {
//     const { name, value } = e.target;
//     // Validate input value for numeric characters only
//     if (
//       (key === "count" || key === "price" || key === "previousPrice") &&
//       !/^\d*\.?\d*$/.test(value)
//     ) {
//       // If input value contains non-numeric characters, do not update state
//       return;
//     }
//     // Update state with the new input value
//     setEditedItem((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewCategory(e.target.value);
//   };

//   const handleAddCategory = async () => {
//     if (newCategory.trim() !== "") {
//       const updatedData = [...jsonData];
//       console.log(jsonData);
//       const newCategoryName = newCategory.toLowerCase();

//       if (!updatedData[selectedSectionIndex!][newCategoryName]) {
//         updatedData[selectedSectionIndex!][newCategoryName] = [];
//         setJsonData(updatedData);
//         setSelectedCat(newCategoryName);
//         setNewCategory("");

//         try {
//           await updateJsonFile("robotech/pages/categories.json", updatedData);
//           toast.success(`Added new category "${newCategoryName}"`);
//           toast.loading(
//             `Be patient, changes takes a few moments to be reflected`
//           );
//           setTimeout(() => {
//             toast.dismiss();
//           }, 5000);
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
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete this category?`
//     );

//     if (
//       selectedCat !== null &&
//       selectedSectionIndex !== null &&
//       confirmDelete
//     ) {
//       const updatedData = [...jsonData];
//       delete updatedData[selectedSectionIndex][selectedCat];

//       try {
//         await updateJsonFile("robotech/pages/categories.json", updatedData);
//         setJsonData(updatedData);
//         setSelectedCat("");
//         setNewCategory("");
//         toast.success(`Category "${selectedCat}" has been deleted`);
//         toast.loading(
//           `Be patient, changes takes a few moments to be reflected`
//         );
//         setTimeout(() => {
//           toast.dismiss();
//         }, 5000);
//       } catch (error) {
//         toast.error(`${(error as Error).message}`);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="lg:p-3  min-h-[400px] z-10 bottom-0 left-0 overflow-hidden mt-5">
//         {/* <Stats /> */}
//         <div className="">
//           {selectedCat ? (
//             <div key={selectedSectionIndex} className="mt-5">
//               <span className="my-3 block flex items-center justify-end text-end text-sm">
//                 <div className="flex-1 flex items-center gap-2">
//                   <CustomSelect
//                     selectedCat={selectedCat}
//                     setSelectedCat={setSelectedCat}
//                     setSelectedSectionIndex={setSelectedSectionIndex}
//                     jsonData={jsonData}
//                   />

//                   <button
//                     className="text-xs rounded-md absolute top-5 right-4 ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
//                     onClick={handleDeleteCategory}
//                   >
//                     Delete {selectedCat} Category
//                   </button>

//                   <div>
//                     <span
//                       className={`${
//                         toggleNewCat ? "flex items-center" : "hidden"
//                       } mt-2`}
//                     >
//                       Category not exist ?{" "}
//                       <span
//                         onClick={() => setToggleNewCat(false)}
//                         className="cursor-pointer text-blue-400"
//                       >
//                         add category
//                       </span>
//                     </span>
//                     <div
//                       className={`${
//                         toggleNewCat ? "hidden" : "flex items-center"
//                       }`}
//                     >
//                       <input
//                         type="text"
//                         placeholder="New Category"
//                         className="p-2 h-9 border mr-3 border-gray-300 rounded"
//                         value={newCategory}
//                         onChange={handleCategoryChange}
//                       />
//                       <button
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                         onClick={handleAddCategory}
//                       >
//                         Add
//                       </button>
//                       <button
//                         className="ml-2 border border-red-400 text-red-500 font-bold py-2 px-4 rounded"
//                         onClick={() => setToggleNewCat(true)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 Count:{" "}
//                 <span className="font-bold ml-1">
//                   {/* {jsonData[selectedSectionIndex][selectedCat!]?.length}{" "} */}
//                   Product(s)
//                 </span>
//                 {selectedCat && (
//                   <span
//                     onClick={handleAddItemClick}
//                     className="cursor-pointer inline-flex items-center justify-end w-fit mr-2 ml-3 py-2 px-3 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
//                   >
//                     <Plus className="inline-block w-5 h-5 mr-1" size={20} />
//                     New
//                   </span>
//                 )}
//               </span>
//               <div className="flex w-full  flex-col gap-3 border-2 rounded border-zinc-400">
//                 <div className="flex items-center text-white bg-zinc-900 px-5 py-3 rounded ">
//                   <div className="  rounded-sm">Image</div>
//                   <div className="ml-4 flex-1 flex items-center gap-2">
//                     <p className="text-sm">Product Name</p>
//                     <span className="relative">
//                       <Search className="w-5 h-5 text-gray-500 absolute top-2 right-3" />
//                       <input
//                         type="text"
//                         placeholder="Search by Name"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="pl-2 pr-10 py-1 border border-slate-300 rounded bg-white text-black text-sm focus:outline-none focus:border-blue-500"
//                       />
//                     </span>
//                   </div>
//                   <div className="text-xs sm:text-sm">Price</div>
//                   <div className="text-xs sm:text-sm ml-8">Actions</div>
//                 </div>
//                 <div className="max-h-[500px] p-3 overflow-auto ">
//                   {categoryProducts &&
//                     categoryProducts
//                       ?.filter((product) =>
//                         product.title
//                           .toLowerCase()
//                           .includes(searchTerm.toLowerCase())
//                       )
//                       .map((product: any, itemIndex: number) => (
//                         <div
//                           key={product.id}
//                           // href={`/product/${product.id}`}
//                           className={`${cn(
//                             +product.count === 0
//                               ? "bg-red-200 animate-pulse"
//                               : "bg-gray-200 hover:bg-white",
//                             "text-xs font-medium"
//                           )} flex group items-start hover:no-underline my-2 p-2 rounded `}
//                         >
//                           <div className="w-10 h-10 min-w-[2.5rem]  rounded-sm">
//                             <img
//                               className="w-full h-full object-cover rounded-sm"
//                               src={product.image1}
//                               alt={product.image1}
//                             />
//                           </div>
//                           <div className="ml-4 flex-1">
//                             <p className="text-sm text-gray-800 font-bold">
//                               {product.title}
//                             </p>
//                             <span
//                               className={cn(
//                                 +product.count === 0
//                                   ? "text-red-500"
//                                   : +product.count > 10
//                                   ? "text-green-500"
//                                   : "text-orange-500",
//                                 "text-xs font-medium"
//                               )}
//                             >
//                               {product.count === 0
//                                 ? "Out of Stock"
//                                 : product.count + " in Stock"}
//                             </span>
//                             <span className="opacity-0 transition text-sm font-semibold group-hover:opacity-100 ml-2 italic">
//                               #{product?.id}
//                             </span>
//                           </div>
//                           <div className="font-bold text-xs sm:text-sm text-zinc-700 pl-1.5">
//                             <FormattedPrice amount={product.price} />
//                           </div>
//                           <div className="ml-8">
//                             <button
//                               className="mr-1"
//                               // onClick={() =>
//                               //   // handleEditClick(selectedSectionIndex, itemIndex)
//                               // }
//                             >
//                               <Edit size={16} />
//                             </button>
//                             <button
//                               className="mr-1"
//                               // onClick={() =>
//                               //   // handleRemoveItem(selectedSectionIndex, itemIndex)
//                               // }
//                             >
//                               <Trash size={16} />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                 </div>
//               </div>

//               {editIndex !== null && (
//                 <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                   <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">
//                     <h2 className="font-bold mb-2 text-center text-lg">
//                       {editIndex === -1 ? "Add Product" : "Edit Product"}
//                     </h2>

//                     <div className="">
//                       {Object.entries({
//                         // id: 'ID',
//                         title: "Title",
//                         description: "Description",
//                         price: "Price",
//                         previousPrice: "Previous Price",
//                         count: "Count",
//                         // brand: 'Brand',
//                         image1: "Image1",
//                         image2: "Image2",
//                         image3: "Image3",
//                         externalLink: "External Link",
//                       }).map(([key, placeholder], index) => (
//                         <div key={key} className={`flex-col mb-2 lg:pr-4`}>
//                           <span className="font-bold text-sm mb-2 inline-block ml-1">
//                             {placeholder}
//                           </span>
//                           {key === "description" ? (
//                             <textarea
//                               placeholder={placeholder}
//                               className={`border border-gray-300 rounded outline-none w-full p-2 `}
//                               value={editedItem[key]}
//                               onChange={(e) => handleInputChange(e, key)}
//                             />
//                           ) : (
//                             <input
//                               // type={key === "count" ? "number" : "text"}
//                               type={"text"}
//                               placeholder={placeholder}
//                               className={`border border-gray-300 rounded outline-none w-full p-2 `}
//                               value={editedItem[key]}
//                               onChange={(e) => handleInputChange(e, key)}
//                             />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex">
//                       <button
//                         className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
//                         // onClick={() => handleEditSubmit(selectedSectionIndex)}
//                       >
//                         <Check size={18} className="mr-1" />
//                         Save
//                       </button>
//                       <button
//                         className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                         onClick={handleEditCancel}
//                       >
//                         <X size={18} className="mr-1" />
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Loading />
//           )}
//         </div>
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

const AdminComponent = () => {
  const [categoryProducts, setCategoryProducts] = useState<any>([]);
  const [selectedCat, setSelectedCat] = useState("sensors");
  const [categoryList, setcategoryList] = useState<string[]>([]);

  useEffect(() => {
    const getTablesList = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { db: { schema: "products" } }
      );

      const { data } = await supabase.from("schema_tables").select();
      const tableNames = data!.map((item) => item.table_name);
      setcategoryList(tableNames);
    };
    getTablesList();
  }, []);

  useEffect(() => {
    const getList = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { db: { schema: "products" } }
      );

      const { data } = await supabase.from(selectedCat).select();
      setCategoryProducts(data!);
      console.log(data!);
    };
    getList();
  }, [selectedCat]);
  return (
    <>
      <div className="lg:p-3  min-h-[400px] z-10 bottom-0 left-0 overflow-hidden mt-5">
        {/* <Stats /> */}
        <div className="">
          <div className="mt-5">
            <span className="my-3 block flex items-center justify-end text-end text-sm">
              <div className="flex-1 flex items-center gap-2">
                {/* <CustomSelect
                      selectedCat={selectedCat}
                      setSelectedCat={setSelectedCat}
                      setSelectedSectionIndex={setSelectedSectionIndex}
                      jsonData={jsonData}
                    /> */}
                <select
                  id="sectionDropdown"
                  // value={selectedCat !== null ? selectedCat : ""}
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                >
                  {categoryList &&
                    categoryList.map((item) => (
                      <option data-selected={item} key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  {/* )}  */}
                </select>
                <button className="text-xs rounded-md absolute top-5 right-4 ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                  Delete Category
                </button>

                <div>
                  <span className={"flex items-center"}>
                    Category not exist ?{" "}
                    <span className="cursor-pointer text-blue-400">
                      add category
                    </span>
                  </span>
                  <div>
                    <input
                      type="text"
                      placeholder="New Category"
                      className="p-2 h-9 border mr-3 border-gray-300 rounded"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      Add
                    </button>
                    <button className="ml-2 border border-red-400 text-red-500 font-bold py-2 px-4 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              Count: <span className="font-bold ml-1">Product(s)</span>
              <span className="cursor-pointer inline-flex items-center justify-end w-fit mr-2 ml-3 py-2 px-3 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
                <Plus className="inline-block w-5 h-5 mr-1" size={20} />
                New
              </span>
            </span>
            <div className="flex w-full  flex-col gap-3 border-2 rounded border-zinc-400">
              <div className="flex items-center text-white bg-zinc-900 px-5 py-3 rounded ">
                <div className="  rounded-sm">Image</div>
                <div className="ml-4 flex-1 flex items-center gap-2">
                  <p className="text-sm">Product Name</p>
                  <span className="relative">
                    <Search className="w-5 h-5 text-gray-500 absolute top-2 right-3" />
                    <input
                      type="text"
                      placeholder="Search by Name"
                      // value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-2 pr-10 py-1 border border-slate-300 rounded bg-white text-black text-sm focus:outline-none focus:border-blue-500"
                    />
                  </span>
                </div>
                <div className="text-xs sm:text-sm">Price</div>
                <div className="text-xs sm:text-sm ml-8">Actions</div>
              </div>
              <div className="max-h-[500px] p-3 overflow-auto ">
                {categoryProducts &&
                  categoryProducts
                    .filter(
                      (product) => product.title.toLowerCase()
                      // .includes(searchTerm.toLowerCase())
                    )
                    .map((product: any, itemIndex: number) => (
                      <div
                        key={product.id}
                        // href={`/product/${product.id}`}
                        className={`${cn(
                          +product.count === 0
                            ? "bg-red-200 animate-pulse"
                            : "bg-gray-200 hover:bg-white",
                          "text-xs font-medium"
                        )} flex group items-start hover:no-underline my-2 p-2 rounded `}
                      >
                        <div className="w-10 h-10 min-w-[2.5rem]  rounded-sm">
                          <img
                            className="w-full h-full object-cover rounded-sm"
                            src={product.image1}
                            alt={product.image1}
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm text-gray-800 font-bold">
                            {product.title}
                          </p>
                          <span
                            className={cn(
                              +product.count === 0
                                ? "text-red-500"
                                : +product.count > 10
                                ? "text-green-500"
                                : "text-orange-500",
                              "text-xs font-medium"
                            )}
                          >
                            {product.count === 0
                              ? "Out of Stock"
                              : product.count + " in Stock"}
                          </span>
                          <span className="opacity-0 transition text-sm font-semibold group-hover:opacity-100 ml-2 italic">
                            #{product?.id}
                          </span>
                        </div>
                        <div className="font-bold text-xs sm:text-sm text-zinc-700 pl-1.5">
                          <FormattedPrice amount={product.price} />
                        </div>
                        <div className="ml-8">
                          <button
                            className="mr-1"
                            // onClick={() =>
                            //   // handleEditClick(selectedSectionIndex, itemIndex)
                            // }
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="mr-1"
                            // onClick={() =>
                            //   // handleRemoveItem(selectedSectionIndex, itemIndex)
                            // }
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
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
