import { useEffect, useState } from "react";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import supabase from "@/supabase/config";

const Admin3DComponent = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>({
    title: "",
    price: "",
    previousPrice: 0,
    description: "",
    image1: "",
    image2: "",
    image3: "",
    brand: "",
    quantity: 1,
    externalLink: '',
    unit: '',
    wholesalePrice: 0

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from('services').select();
        setJsonArray(data!);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const handleAddItemClick = () => {
    setEditIndex(-1); // Use -1 to indicate a new item
    setEditedItem({
      title: "",
      price: "",
      previousPrice: 0,
      description: "",
      image1: "",
      image2: "",
      image3: "",
      brand: "",
      quantity: 1,
      externalLink: '',
      unit: '',
      wholesalePrice: 0

    });
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await supabase
        .from('services')
        .delete()
        .eq('id', id);

      setJsonArray(jsonArray.filter(item => item.id !== id));
      toast.success('Service removed successfully');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };


  const handleEditClick = (id: number) => {
    const edited = jsonArray.find(item => item.id === id);
    if (edited) {
      setEditIndex(id);
      setEditedItem(edited);
    }
  };



  const handleEditSubmit = async () => {
    try {
      if (
        !editedItem.title ||
        !editedItem.price ||
        !editedItem.description ||
        !editedItem.image1 ||
        !editedItem.unit
      ) {
        toast.error("All fields are required");
        return;
      } toast.error("All fields are required");


      if (editIndex === -1) {
        await supabase
          .from('services')
          .insert([editedItem]);
        setJsonArray([...jsonArray, editedItem]);
        toast.success('Announcement added successfully');
      } else {
        await supabase
          .from('services')
          .update(editedItem)
          .eq('id', editIndex);

        setJsonArray(jsonArray.map(item => item.id === editIndex ? editedItem : item));
        toast.success('Announcement updated successfully');
      }

      setEditIndex(null);
      toast.error(null); // Reset error state
    } catch (error) {
      toast.error((error as Error).message);
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
    <div
      className={`lg:p-3 min-h-[400px] w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}
    >
      {!jsonArray && <h2 className="font-bold mb-4">Current Service data:</h2>}
      <div className="mb-5 flex items-center justify-end">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItemClick}
        >
          <Plus size={18} className="mr-1" />
          Add Service
        </button>
      </div>
      {jsonArray.length !== 0 ? (
        <div className="overflow-x-auto max-w-4xl">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-zinc-800 text-white ">

                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Title
                </th>
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  PP Unit
                </th>
                {/* <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Previous Price
                </th> */}
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Image 1
                </th>
                {/* <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Image 2
                </th>
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Image 3
                </th> */}
                {/* <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Description
                </th> */}
                {/* <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Per Minute
                </th> */}
                {/* <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Brand
                </th> */}
                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses  border px-4 py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jsonArray.map((item, index) => (
                <tr key={index} className="hover:bg-slate-100">

                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    {item.title}
                  </td>
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    {item.price}
                  </td>
                  {/* <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    {item.previousPrice}
                  </td> */}
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    <img src={item.image1} width="70" />
                  </td>
                  {/* <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    {item.count}
                  </td> */}
                  {/* <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    <img src={item.image2} width="70" />
                  </td>
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    <img src={item.image3} width="70" />
                  </td>
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    {item.description}
                  </td>
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                    {item.brand}
                  </td> */}
                  <td className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-2 py-2">
                    <button
                      className="mr-1"
                      onClick={() => handleEditClick(+item.id!)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="mr-1"
                      onClick={() => handleRemoveItem(+item.id!)}
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoContent />
      )}

      {editIndex !== null && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">

            <h2 className="font-bold mb-2 text-center text-lg">
              {editIndex === -1 ? "Add Service" : "Edit Service"}
            </h2>
            <div className="flex flex-col">

              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Title</span>

                <input
                  type="text"
                  placeholder="3d Print, Caramel Macchiato"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editedItem.title}
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </div>
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Price Per Unit</span>

                <input
                  type="text"
                  placeholder="Price Per Unit"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.price}
                  onChange={(e) => {
                    handleInputChange(e, "price")
                  }

                  }
                />
              </div>
              {/* <div className="w-full mb-2 lg:pr-4">
              <input
                type="text"
                placeholder="Previous Price"
                className="p-2 w-full border border-gray-300 rounded"
                value={editedItem.previousPrice}
                onChange={(e) => handleInputChange(e, "previousPrice")}
              />
            </div> */}
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Image 1</span>

                <input
                  type="text"
                  placeholder="https://www.image-example.com"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.image1}
                  onChange={(e) => handleInputChange(e, "image1")}
                />
              </div>
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Image 2</span>

                <input
                  type="text"
                  placeholder="https://www.image-example.com"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.image2}
                  onChange={(e) => handleInputChange(e, "image2")}
                />
              </div>
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Image 3</span>

                <input
                  type="text"
                  placeholder="https://www.image-example.com"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.image3}
                  onChange={(e) => handleInputChange(e, "image3")}
                />
              </div>
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Description</span>

                <input
                  type="text"
                  placeholder="Description..."
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.description}
                  onChange={(e) => handleInputChange(e, "description")}
                />
              </div>
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Variations List</span>

                <input
                  type="text"
                  placeholder="variations list, separated by |, e.g., Red | Blue | Black"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.variations}
                  onChange={(e) => handleInputChange(e, "variations")}
                />
              </div>
              {/* <div className="w-full mb-2 lg:pr-4">
             <span className="text-sm font-bold my-2 -ml-2">Count</span>

              <input
                type="text"
                placeholder="Price Per Minute"
                className="p-2 w-full border border-gray-300 rounded"
                value={editedItem.count}
                onChange={(e) => handleInputChange(e, "count")}
              />
            </div>   */}
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Per Unit</span>

                <input
                  type="text"
                  placeholder="gram / minute..."
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.unit}
                  onChange={(e) => handleInputChange(e, "unit")}
                />
              </div>
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">Extra Field</span>

                <input
                  type="text"
                  placeholder="Additional details, like service type, e.g., 3D Prototype."
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.brand}
                  onChange={(e) => handleInputChange(e, "brand")}
                />
              </div>
              <div className="w-full mb-2 lg:pr-4">
                <span className="text-sm font-bold my-2 -ml-2">External Link</span>

                <input
                  type="text"
                  placeholder="Link to video, or anything else"
                  className="p-2 w-full border border-gray-300 rounded"
                  value={editedItem.externalLink}
                  onChange={(e) => handleInputChange(e, "externalLink")}
                />
              </div>
            </div>
            <div className="flex">
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
      )}
      {/* 
      <div className="mt-5">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItemClick}
        >
          <Plus size={18} className="mr-1" />
          Add Item
        </button>
      </div> */}
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

export default Admin3DComponent;
