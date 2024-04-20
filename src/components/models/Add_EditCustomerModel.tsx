import { validatePhoneNumber } from "@/lib/validatePhoneNumber";
import supabase from "@/supabase/config";
import toast from "react-hot-toast";
import { CustomerType } from "../../../type";
import { Check, X } from "lucide-react";

const AddAndEditCustomerModel = ({setEditIndex,setEditedItem,editIndex,editedItem,editedItemId,setEditedItemId,jsonArray,setJsonArray})=>{
    const handleEditSubmit = async () => {
        try {
          // Check for empty fields
          if (!editedItem.fullName || !editedItem.phone || !editedItem.join_date) {
            toast.error("Name,Phone,Join Date fields are required");
            return;
          }
          if (!validatePhoneNumber(editedItem.phone)) {
            toast.error("Invalid Phone Number");
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
    
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[500px] p-8 rounded-lg shadow-md">
        <h2 className="font-bold mb-2 text-center text-lg">
          {editIndex === -1 ? "Add New Customer" : "Edit Customer"}
        </h2>
        {/* {error && <p className="text-red-500 mb-2">{error}</p>} */}
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
              type="tel"
              pattern="01[0-9]{9}"
              placeholder="01XXXXXXXXX"
              className="p-2 w-full border border-gray-300 rounded"
              value={editedItem.phone}
              onChange={(e) => handleInputChange(e, "phone")}
            />
          </div>
          <div className=" mb-2 lg:pr-4">
            <span className="font-bold mb-1">Join Date</span>

            <input
              type="date"
              placeholder="20"
              className="p-2 w-full border border-gray-300 rounded"
              value={editedItem.join_date}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleInputChange(e, "join_date")}
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
  </div>)
}

export default AddAndEditCustomerModel