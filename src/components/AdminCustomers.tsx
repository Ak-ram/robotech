// import { useEffect, useState } from "react";
// import { Plus, TrashIcon, Edit, PhoneCall, User } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import Link from "next/link";
// import supabase from "@/supabase/config";
// import { calculatePeriod } from "@/lib/calculatePeriod";
// import AddAndEditCustomerModel from "./models/Add_EditCustomerModel";
// import { CustomerType } from "../../type";
// const AdminCustomers = () => {
//   const [jsonArray, setJsonArray] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [editedItemId, setEditedItemId] = useState<number | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");


//   const [editedItem, setEditedItem] = useState<CustomerType>({
//     fullName: "",
//     phone: "",
//     address: "",
//     faculty: "",
//     join_date: new Date().toString(),
//     total_purchase_transactions: 0,
//     transactions: {
//       products: [],
//       courses: [],
//       printServices: [],
//     },
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await supabase.from("customers").select();
//         setJsonArray(data!);
//       } catch (error) {
//         setError((error as Error).message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddItemClick = () => {
//     setEditIndex(-1); // Use -1 to indicate a new item
//     setEditedItem({
//       fullName: "",
//       phone: "",
//       join_date: "",
//       address: "",
//       faculty: "",
//       total_purchase_transactions: 0,
//       transactions: {
//         products: [],
//         courses: [],
//         printServices: [],
//       },
//     });
//     setError(null); // Reset error state
//     setSearchTerm("");
//   };


//   const handleEditClick = (id: number) => {
//     const index = jsonArray.findIndex((item) => item.id === id);
//     setEditIndex(index);
//     setEditedItem({ ...jsonArray[index] });
//     setEditedItemId(id); // Add this line
//   };

//   const handleRemoveItem = async (id: number) => {
//     let confirmDel = window.confirm(
//       "Deleting this customer will also remove associated data such as transactions, products, courses, and print services purchased, impacting the stats page."
//     );
//     if (confirmDel) {
//       try {
//         // Remove the course from jsonArray
//         const updatedArray = jsonArray.filter((item) => item.id !== id);

//         // Update jsonArray state with the filtered array
//         setJsonArray(updatedArray);

//         // Perform deletion operation in Supabase based on the course ID
//         await supabase.from("customers").delete().eq("id", id);

//         // Show success toast message
//         toast.success(`Item removed successfully`);
//       } catch (error) {
//         // Show error toast message
//         toast.error((error as Error).message);
//       }
//     }
//   };



//   useEffect(() => {
//     // console.log('new style', typeof calculatePeriod('1-4-2023'))
//   }, [editedItem])


//   return (
//     <div
//       className={`min-h-[400px] lg:p-3 w-full bottom-0 left-0 lg:relative overflow-hidden mt-5`}
//     >
//       {!jsonArray && <h2 className="font-bold mb-4">Current Customer data:</h2>}

//       <div className="mb-5 flex flex-col lg:flex-row items-center justify-between">
//         <input
//           type="text"
//           placeholder="Search By Name, Phone"
//           className="text-black mb-2 p-2 border border-gray-300 rounded w-full lg:w-[60%] focus:outline-none focus:border-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <div className="flex items-end space-x-4 mb-2 lg:mb-0">
//           <button
//             className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
//             onClick={handleAddItemClick}
//           >
//             <Plus size={18} className="mr-1" />
//             Add Customer
//           </button>
//         </div>
//       </div>
//       {searchTerm.length >= 3 && jsonArray.length !== 0 ? (
//         <div className={"grid h-[400px] overflow-auto bg-white p-5 rounded grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
//           {jsonArray
//             .filter((item) => {
//               const fullName = item.fullName.toLowerCase();
//               const phone = item.phone.toLowerCase();
//               const search = searchTerm.toLowerCase();
//               return fullName.includes(search) || phone.includes(search);
//             })
//             .map((item, index) => (
//               <div
//                 key={index}
//                 className={`border border-zinc-300 p-4 rounded-lg bg-white shadow-md transition-all duration-300 transform 
//                             `}
//               >
//                 <Link
//                   key={index}
//                   href={{
//                     pathname: `admin/id_${item?.id || editedItemId}`,
//                     query: {
//                       id: item?.id || editedItemId,
//                     },
//                   }}
//                   className={`block`}
//                 >
//                   <span className="block font-bold mb-2 text-xl rtl" dir="rtl">
//                     {item.fullName}
//                   </span>
//                   <span
//                     className="block text-gray-600 mb-2 flex items-end gap-1"
//                   >
//                     <PhoneCall className="mb-[1px]" size={14} /> Phone:{" "}
//                     {item.phone}
//                   </span>
//                   <span
//                     className="block text-gray-600 mb-2 flex items-center gap-1"
//                   >
//                     <User size={15} /> Since: {calculatePeriod(item.join_date)}
//                   </span>
//                 </Link>
//                 <div className="flex justify-end">
//                   <button
//                     className="flex gap-1 items-center  bg-blue-100 py-1 px-2 rounded text-blue-500 hover:text-blue-600 mr-2 transition-colors duration-300"
//                     onClick={() => handleEditClick(+item.id)}
//                   >
//                     <Edit size={17} /> Edit
//                   </button>
//                   <button
//                     className="flex gap-1 items-center bg-red-100 py-1 px-2 rounded text-red-500 hover:text-red-600 transition-colors duration-300"
//                     onClick={() => handleRemoveItem(+item.id)}
//                   >
//                     <TrashIcon size={17} /> Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       ) : (
//         <div className="bg-white h-[300px] flex items-center justify-center">
//           <div className="text-center">
//             <h2 className="text-xl font-semibold mb-4">
//               No Customers to display...
//             </h2>
//           </div>
//         </div>
//       )}

//       {editIndex !== null && (
//         <AddAndEditCustomerModel {...{ setEditedItem, setEditIndex, editedItem, editIndex, editedItemId, setEditedItemId, jsonArray, setJsonArray }} />
//       )}

//       <Toaster
//         position="bottom-right"
//         toastOptions={{
//           style: {
//             background: "#000",
//             color: "#fff",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default AdminCustomers;

import { useEffect, useState } from "react";
import { Plus, TrashIcon, Edit, PhoneCall, User, LoaderIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import supabase from "@/supabase/config";
import { calculatePeriod } from "@/lib/calculatePeriod";
import AddAndEditCustomerModel from "./models/Add_EditCustomerModel";
import { CustomerType } from "../../type";
const AdminCustomers = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItemId, setEditedItemId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");


  const [editedItem, setEditedItem] = useState<CustomerType>({
    fullName: "",
    phone: "",
    address: "",
    faculty: "",
    join_date: new Date().toString(),
    total_purchase_transactions: 0,
    transactions: {
      products: [],
      courses: [],
      printServices: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from("customers").select();
        setJsonArray(data!);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const handleAddItemClick = () => {
    setEditIndex(-1); // Use -1 to indicate a new item
    setEditedItem({
      fullName: "",
      phone: "",
      join_date: "",
      address: "",
      faculty: "",
      total_purchase_transactions: 0,
      transactions: {
        products: [],
        courses: [],
        printServices: [],
      },
    });
    setError(null); // Reset error state
    setSearchTerm("");
  };


  const handleEditClick = (id: number) => {
    const index = jsonArray.findIndex((item) => item.id === id);
    setEditIndex(index);
    setEditedItem({ ...jsonArray[index] });
    setEditedItemId(id); // Add this line
  };

  const handleRemoveItem = async (id: number) => {
    let confirmDel = window.confirm(
      "Deleting this customer will also remove associated data such as transactions, products, courses, and print services purchased, impacting the stats page."
    );
    if (confirmDel) {
      try {
        // Remove the course from jsonArray
        const updatedArray = jsonArray.filter((item) => item.id !== id);

        // Update jsonArray state with the filtered array
        setJsonArray(updatedArray);

        // Perform deletion operation in Supabase based on the course ID
        await supabase.from("customers").delete().eq("id", id);

        // Show success toast message
        toast.success(`Item removed successfully`);
      } catch (error) {
        // Show error toast message
        toast.error((error as Error).message);
      }
    }
  };



  useEffect(() => {
    // console.log('new style', typeof calculatePeriod('1-4-2023'))
  }, [editedItem])


  return (
    <div
      className={`min-h-[400px] lg:p-3 w-full bottom-0 left-0 lg:relative overflow-hidden mt-5`}
    >
      {!jsonArray && <h2 className="font-bold mb-4">Current Customer data:</h2>}

      <div className="mb-5 flex flex-col lg:flex-row items-center justify-between">
        <input
          type="text"
          placeholder="Search By Name, Phone"
          className="text-black mb-2 p-2 border border-gray-300 rounded w-full lg:w-[60%] focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-end space-x-4 mb-2 lg:mb-0">
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
            onClick={handleAddItemClick}
          >
            <Plus size={18} className="mr-1" />
            Add Customer
          </button>
        </div>
      </div>
      {searchTerm.length >= 3 && jsonArray.length !== 0 ? (
        <div className={"grid h-[400px] overflow-auto bg-white p-5 rounded grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
          {jsonArray
            .filter((item) => {
              const fullName = item.fullName.toLowerCase();
              const phone = item.phone.toLowerCase();
              const search = searchTerm.toLowerCase();
              return fullName.includes(search) || phone.includes(search);
            })
            .map((item, index) => (
              <div
                key={index}
                className={`border h-fit border-zinc-300 p-4 rounded-lg bg-white shadow-md transition-all duration-300 transform 
                            `}
              >
                <Link
                  key={index}
                  href={{
                    pathname: `admin/id_${item?.id || editedItemId}`,
                    query: {
                      id: item?.id || editedItemId,
                    },
                  }}
                  onClick={() => setShowLoader(true)}
                  className={`block`}
                >
                  <span className="flex justify-between items-center font-bold mb-2 text-xl rtl" dir="rtl">
                    {item.fullName}
                    {showLoader && <LoaderIcon className=" animate-spin" size={18} />}
                  </span>
                  <span
                    className="block text-gray-600 mb-2 flex items-end gap-1"
                  >
                    <PhoneCall className="mb-[1px]" size={14} /> Phone:{" "}
                    {item.phone}
                  </span>
                  <span
                    className="block text-gray-600 mb-2 flex items-center gap-1"
                  >
                    <User size={15} /> Since: {calculatePeriod(item.join_date)}
                  </span>
                </Link>
                <div className="flex justify-end">
                  <button
                    className="flex gap-1 items-center  bg-blue-100 py-1 px-2 rounded text-blue-500 hover:text-blue-600 mr-2 transition-colors duration-300"
                    onClick={() => handleEditClick(+item.id)}
                  >
                    <Edit size={17} /> Edit
                  </button>
                  <button
                    className="flex gap-1 items-center bg-red-100 py-1 px-2 rounded text-red-500 hover:text-red-600 transition-colors duration-300"
                    onClick={() => handleRemoveItem(+item.id)}
                  >
                    <TrashIcon size={17} /> Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="bg-white h-[300px] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              No Customers to display...
            </h2>
          </div>
        </div>
      )}

      {editIndex !== null && (
        <AddAndEditCustomerModel {...{ setEditedItem, setEditIndex, editedItem, editIndex, editedItemId, setEditedItemId, jsonArray, setJsonArray }} />
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

export default AdminCustomers;
