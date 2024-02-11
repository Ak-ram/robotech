import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const Admin3DComponent = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
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
    quantity: 1,
    externalLink:''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonData("robotech/pages/3d.json");
        setJsonArray(data);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const handleAddItemClick = () => {
    setEditIndex(-1); // Use -1 to indicate a new item
    setEditedItem({
      id: uuidv4(),
      title: "",
      price: "",
      previousPrice: 0,
      description: "",
      // count: 0,
      image1: "",
      image2: "",
      image3: "",
      brand: "",
      quantity: 1,
      externalLink:''
    });
  };

  const handleRemoveItem = async (index: number) => {
    const updatedArray = [...jsonArray];
    updatedArray.splice(index, 1);

    try {
      await updateJsonFile("robotech/pages/3d.json", updatedArray);
      setJsonArray(updatedArray);
      toast.success(`Item removed successfully`);
      toast.loading(`Be patient, changes takes a few moments to be reflected`);
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedItem({ ...jsonArray[index] });
  };

  const handleEditSubmit = async () => {
    // Check for empty fields
    if (
      !editedItem.id ||
      !editedItem.title ||
      !editedItem.price ||
      // !editedItem.previousPrice ||
      !editedItem.description ||
      !editedItem.count ||
      !editedItem.image1 ||
      !editedItem.brand
    ) {
      toast.error("All fields are required");
      return;
    }

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
        await updateJsonFile("robotech/pages/3d.json", updatedArray);
        setJsonArray(updatedArray);
        setEditIndex(null);
        toast.success(`Item Added/Updated successfully`);
        toast.loading(
          `Be patient, changes takes a few moments to be reflected`
        );
        setTimeout(() => {
          toast.dismiss();
        }, 5000);
      } catch (error) {
        toast.error((error as Error).message);
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
    <div
      className={`lg:p-3 min-h-[400px] w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}
    >
      {!jsonArray && <h2 className="font-bold mb-4">Current Printing data:</h2>}
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
                  PPM
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
                      onClick={() => handleEditClick(index)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="mr-1"
                      onClick={() => handleRemoveItem(index)}
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
                        {editIndex === -1 ? "Add Print Service" : "Edit Print Service"}
                    </h2>
          <div className="flex flex-col">
         
            <div className="w-full mb-2 lg:pr-4">
              <span className="text-sm font-bold my-2 -ml-2">Title</span>

              <input
                type="text"
                placeholder="3d Print"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedItem.title}
                onChange={(e) => handleInputChange(e, "title")}
              />
            </div>
            <div className="w-full mb-2 lg:pr-4">
              <span className="text-sm font-bold my-2 -ml-2">PPM</span>

              <input
                type="text"
                placeholder="Price Per Minute"
                className="p-2 w-full border border-gray-300 rounded"
                value={editedItem.price}
                onChange={(e) => {
                  handleInputChange(e, "price")
                  handleInputChange(e, "count")
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
                placeholder="Print 3d shapes with X material"
                className="p-2 w-full border border-gray-300 rounded"
                value={editedItem.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </div>
            <div className="w-full mb-2 lg:pr-4">
              <span className="text-sm font-bold my-2 -ml-2">Colors</span>

              <input
                type="text"
                placeholder="colors list, separated by |"
                className="p-2 w-full border border-gray-300 rounded"
                value={editedItem.colors}
                onChange={(e) => handleInputChange(e, "colors")}
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
              <span className="text-sm font-bold my-2 -ml-2">Printing Type</span>

              <input
                type="text"
                placeholder="Prototype 3d"
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
