// const CustomSelect = ({ selectedCat, setSelectedCat, categoryList }) => {
//   return (
//     <select
//       id="sectionDropdown"
//       value={selectedCat}
//       onChange={(e) => setSelectedCat(e.target.value)}
//     >
//       {categoryList &&
//         categoryList.map((item) => (
//           <option data-selected={item} key={item} value={item}>
//             {item}
//           </option>
//         ))}
//     </select>
//   );
// };

// export default CustomSelect;

import { useState } from "react";
import { Check, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

const CustomSelect = ({ selectedCat, setSelectedCat, categoryList }) => {
  const [editableOption, setEditableOption] = useState("");
  const [editedOption, setEditedOption] = useState("");
  const [inUpdateMode, setInUpdateMode] = useState(false);
  const handleOptionChange = (e) => {
    setSelectedCat(e.target.value);
  };

  const handleOptionEdit = (option) => {
    setInUpdateMode(true);
    setEditableOption(option);
    setEditedOption(option);
  };

  const handleOptionUpdate = () => {
    if (editedOption) {
      const updatedCategoryList = categoryList.map((category) =>
        category === editableOption ? editedOption : category
      );
      setSelectedCat(editedOption);
      setEditableOption("");
      setInUpdateMode(false);
      // Update the category list in the parent component
      // You can pass a function from the parent component to update the category list
      // For example: updateCategoryList(updatedCategoryList);
      toast.success("category updated successfully");
    }
  };

  const handleOptionInputChange = (e) => {
    setEditedOption(e.target.value);
  };

  return (
    <div className="custom-select flex gap-1 h-8 items-center">
      <select
        id="sectionDropdown"
        value={selectedCat}
        onChange={handleOptionChange}
        className="h-8 rounded border border-blue-400"
      >
        {categoryList &&
          categoryList.map((item) => (
            <option data-selected={item} key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
      {!editableOption && (
        <Edit2
          size={18}
          className="h-8 w-8 cursor-pointer p-1 bg-white rounded border border-blue-400"
          onClick={() => handleOptionEdit(selectedCat)}
        />
      )}
      {inUpdateMode && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">
            <h2 className="font-bold mb-5 text-center text-lg">
              {/* {editIndex === -1 ? "Add Product" : "Edit Product"} */}
              Update Category
            </h2>

            {editableOption && (
              <div className="option-edit">
                <span className="w-full text-gray-600 text-start mb-2 block">
                  New category name:
                </span>
                <input
                  type="text"
                  value={editedOption}
                  onChange={handleOptionInputChange}
                  className="border w-full border-green-400 rounded p-2"
                />
                <button className="bg-green-200 text-green-500 flex w-full rounded my-5 py-2 items-center justify-center font-semibold">
                  Submit
                  <Check
                    className="option-icon bg-white mx-2 rounded-full p-1 w-7 h-7 text-green-600 border border-green-400"
                    onClick={handleOptionUpdate}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
