import { updateJsonFile } from '@/helpers/updateJSONData';
import { Edit, Save } from 'lucide-react';
import { useState } from 'react';

const CustomSelect = ({ jsonData, selectedCat, setSelectedCat, setSelectedSectionIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const [newCategoryValue, setNewCategoryValue] = useState("");

  const handleEditCategory = (categoryName) => {
    setEditedCategory(categoryName);
  };

  const handleSubmitCategory = async () => {
    if (!newCategoryValue.trim()) return; // Prevent saving empty category name
  
    const updatedData = [...jsonData];
    const selectedSectionIndex = updatedData.findIndex(section => section[selectedCat]);
  
    if (selectedSectionIndex !== -1) {
      const categoryIndex = Object.keys(updatedData[selectedSectionIndex]).findIndex(category => category === editedCategory);
      if (categoryIndex !== -1) {
        const newCategoryName = newCategoryValue.trim();
        let updateProductsCat = updatedData[selectedSectionIndex][editedCategory].map(item=> {
          item.category = newCategoryName
          return item
        })
        updatedData[selectedSectionIndex][newCategoryName] = updateProductsCat;
        delete updatedData[selectedSectionIndex][editedCategory];
        
        console.log("Updated Data:", updatedData); // Log updated data before submission
  
        try {
          await updateJsonFile("robotech/pages/categories.json", updatedData);
          setEditedCategory(""); // Reset edited category
          setSelectedCat(newCategoryName); // Update selected category
          setIsOpen(false); // Close the dropdown after saving
        } catch (error) {
          console.error("Error updating JSON file:", error);
        }
      }
    }
  };
  

  return (
    <div className="relative inline-block w-[50%]">
      {/* Hidden original select box */}
      <select
        id="sectionDropdown"
        className="hidden"
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

      {/* Custom select box */}
      <div
        className="relative flex flex-col items-start bg-white border border-gray-300 rounded-md p-2 space-y-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="cursor-pointer flex justify-between items-center w-full">
          <span>{selectedCat || "Select an option"}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        {isOpen && (
          <div className="absolute z-100 h-[200px] text-start overflow-scroll w-full top-full left-0 bg-white border border-gray-300 rounded-b-md overflow-hidden shadow-md">
            {jsonData.flatMap((section, sectionIndex) =>
              Object.keys(section).map((item) => {
                const newIndex = sectionIndex + 1;
                return (
                  <div
                    key={`${newIndex}-${item}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`p-2 gap-2 flex items-center`}
                  >
                    {editedCategory === item ? (
                      <>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmitCategory();
                            setEditedCategory('')
                          }}
                          className="flex w-full items-center"
                        >
                          <input
                            type="text"
                            value={newCategoryValue}
                            placeholder={editedCategory}
                            onChange={(e) => setNewCategoryValue(e.target.value)}
                            className="border border-gray-300 rounded outline-none p-1"
                          />
                          <button type="submit" className="ml-auto cursor-pointer text-blue-500">
                            <Save size={15} />
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <span
                          className="flex-1 cursor-pointer"
                          onClick={() => {
                            setSelectedCat(item);
                            setSelectedSectionIndex(newIndex);
                          }}
                        >
                          {item}
                        </span>
                        <Edit
                          size={15}
                          className="cursor-pointer text-blue-500"
                          onClick={() => handleEditCategory(item)}
                        />
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;