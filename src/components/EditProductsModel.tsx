import supabase from "@/supabase/config";
import { Check, X } from "lucide-react";
import { useState } from "react";

const EditProductsModel = ({ selectedCat, isOpen, setIsOpen }) => {
  const [editedItem, setEditedItem] = useState<any>({
    title: "",
    price: "",
    previousPrice: 0,
    description: "",
    count: 0,
    image1: "",
    image2: "",
    image3: "",
    wholesalePrice: 0,
    isNew: false,
    quantity: 1,
    externalLink: "",
    category: selectedCat,
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const { name, value } = e.target;
    if (
      (key === "count" || key === "price" || key === "previousPrice") &&
      !/^\d*\.?\d*$/.test(value)
    ) {
      return;
    }
    // Update state with the new input value
    setEditedItem((prev) => ({ ...prev, [key]: value }));
  };
  const handleEditSubmit = async () => {
    await supabase.from("products").insert([editedItem]);
    console.log(editedItem);
  };
  //   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setNewCategory(e.target.value);
  //   };

  return (
    <>
      {isOpen !== null && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">
            <h2 className="font-bold mb-2 text-center text-lg">
              {/* {editIndex === -1 ? "Add Product" : "Edit Product"} */}
              Add Product
            </h2>

            <div className="">
              {Object.entries({
                title: "Title",
                description: "Description",
                price: "Price",
                previousPrice: "Previous Price",
                count: "Count",
                image1: "Image1",
                image2: "Image2",
                image3: "Image3",
                externalLink: "External Link",
              }).map(([key, placeholder], index) => (
                <div key={key} className={`flex-col mb-2 lg:pr-4`}>
                  <span className="font-bold text-sm mb-2 inline-block ml-1">
                    {placeholder}
                  </span>
                  {key === "description" ? (
                    <textarea
                      placeholder={placeholder}
                      className={`border border-gray-300 rounded outline-none w-full p-2 `}
                      value={editedItem[key]}
                      onChange={(e) => handleInputChange(e, key)}
                    />
                  ) : (
                    <input
                      // type={key === "count" ? "number" : "text"}
                      type={"text"}
                      placeholder={placeholder}
                      className={`border border-gray-300 rounded outline-none w-full p-2 `}
                      value={editedItem[key]}
                      onChange={(e) => handleInputChange(e, key)}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex">
              <button
                className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleEditSubmit()}
              >
                <Check size={18} className="mr-1" />
                Save
              </button>
              <button
                className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} className="mr-1" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductsModel;
