import { useEffect, useState } from "react";
import { Check, X, Plus, TrashIcon, Edit, PhoneCall, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import supabase from "@/supabase/config";
const AdminCustomers = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItemId, setEditedItemId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  interface CustomerType {
    fullName: string;
    phone: string;
    address: string;
    faculty: string;
    age: number;
    total_purchase_transactions: number;
    transactions: {};
  }

  const [editedItem, setEditedItem] = useState<CustomerType>({
    fullName: "",
    phone: "",
    address: "",
    faculty: "",
    age: 0,
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
      age: 0,
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
    // Find the index of the course with the specified ID
    const index = jsonArray.findIndex((item) => item.id === id);
    // Set the editIndex state to the found index
    setEditIndex(index);
    // Set the editedItem state to the corresponding course object
    setEditedItem({ ...jsonArray[index] });
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

  const handleEditSubmit = async () => {
    try {
      // Check for empty fields
      if (!editedItem.fullName || !editedItem.phone || !editedItem.age) {
        toast.error("All fields are required");
        return;
      }

      if (editIndex !== null) {
        let updatedCustomers;
        if (editIndex === -1) {
          // Add a new course
          const { data, error } = await supabase
            .from("customers")
            .insert([editedItem])
            .select();
          setEditedItemId(data![0].id);
          if (error) {
            throw error;
          }
          updatedCustomers = [...jsonArray, editedItem]; // Add a check for empty data array
        } else {
          // Update an existing course
          const { data, error } = await supabase
            .from("customers")
            .update(editedItem)
            .eq("id", editedItemId);
          if (error) {
            throw error;
          }
          updatedCustomers = jsonArray.map((course) =>
            course.id === editedItemId ? editedItem : course
          );
        }

        setJsonArray(updatedCustomers); // Update the state variable
        setEditIndex(null);
        toast.success("Customer Added/Updated successfully");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditedItem({} as CustomerType); // Cast to CustomerType
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setEditedItem((prev) => ({ ...prev, [key]: e.target.value }));
  };

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
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
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
                className={`border border-zinc-300 p-4 rounded-lg bg-white shadow-md transition-all duration-300 transform 
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
                  className={`block`}
                >
                  <span className="block font-bold mb-2 text-xl rtl" dir="rtl">
                    {item.fullName}
                  </span>
                  <span
                    className="block text-gray-600 mb-2 flex items-end gap-1"
                    dir="rtl"
                  >
                    <PhoneCall className="mb-[1px]" size={14} /> رقم التليفون:{" "}
                    {item.phone}
                  </span>
                  <span
                    className="block text-gray-600 mb-2 flex items-center gap-1"
                    dir="rtl"
                  >
                    <User size={15} /> العمر: {item.age}
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
              Your Search Result Goes here...
            </h2>
          </div>
        </div>
      )}

      {editIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[500px] p-8 rounded-lg shadow-md">
              <h2 className="font-bold mb-2 text-center text-lg">
                {editIndex === -1 ? "Add New Customer" : "Edit Customer"}
              </h2>
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <div className="">
                <div className=" mb-2 lg:pr-4">
                  <span className="font-bold mb-1">Full Name</span>

                  <input
                    type="text"
                    placeholder="Akram Ashraf"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editedItem.fullName}
                    onChange={(e) => handleInputChange(e, "fullName")}
                  />
                </div>
                <div className=" mb-2 lg:pr-4">
                  <span className="font-bold mb-1">Phone No.</span>

                  <input
                    type="text"
                    placeholder="01XXXXXXXXX"
                    className="p-2 w-full border border-gray-300 rounded"
                    value={editedItem.phone}
                    onChange={(e) => handleInputChange(e, "phone")}
                  />
                </div>
                <div className=" mb-2 lg:pr-4">
                  <span className="font-bold mb-1">Age</span>

                  <input
                    type="number"
                    placeholder="20"
                    className="p-2 w-full border border-gray-300 rounded"
                    value={editedItem.age}
                    onChange={(e) => handleInputChange(e, "age")}
                  />
                </div>
                <div className=" mb-2 lg:pr-4">
                  <span className="font-bold mb-1">Address</span>

                  <input
                    type="text"
                    placeholder="شرق النيل, بني سويف, مصر"
                    className="p-2 w-full border border-gray-300 rounded"
                    value={editedItem.address}
                    onChange={(e) => handleInputChange(e, "address")}
                  />
                </div>
                <div className=" mb-2 lg:pr-4">
                  <span className="font-bold mb-1">Faculty</span>
                  <input
                    type="text"
                    placeholder="BS, Beni-Suef University"
                    className="p-2 w-full border border-gray-300 rounded"
                    value={editedItem.faculty}
                    onChange={(e) => handleInputChange(e, "faculty")}
                  />
                </div>
              </div>
              <div className="flex mt-5">
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
        </div>
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
