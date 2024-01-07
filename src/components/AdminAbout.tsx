import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Delete, Edit, Link } from "lucide-react";

const AdminAbout = () => {
  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonData('robotech/pages/about.json');
        setJsonArray(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const handleRemoveItem = async (index: number) => {
    const updatedArray = [...jsonArray];
    const removedItem = updatedArray.splice(index, 1)[0];

    try {
      await updateJsonFile('robotech/pages/about.json', updatedArray);
      setJsonArray(updatedArray);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedItem({ ...jsonArray[index] });
  };

  const handleEditSubmit = async () => {
    if (editIndex !== null) {
      const updatedArray = [...jsonArray];
      updatedArray[editIndex] = editedItem;

      try {
        await updateJsonFile('robotech/pages/about.json', updatedArray);
        setJsonArray(updatedArray);
        setEditIndex(null);
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditedItem({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditedItem((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className={`lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>
      <h2 className="font-bold mb-4">Current About data:</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-zinc-800 text-white ">
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Link text</th>
              <th className="border px-4 py-2">URL</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jsonArray.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.link_text}</td>
                <td className="cursor-pointer border px-4 py-2 flex hover:underline hover:text-blue-400 group items-center gap-2">
                    {item.link_url} 
                    <Link className="group-hover:opacity-100 opacity-0" size={13}/></td>
                <td className="border px-4 py-2">
                  {editIndex === index ? (
                    <>
                      <button onClick={handleEditSubmit}>Save</button>
                      <button onClick={handleEditCancel}>Cancel</button>
                    </>
                  ) : (
                    <div className="flex gap-1 items-center flex-nowrap">
                      <button  onClick={() => handleEditClick(index)}><Edit size={17}/></button>
                      <button onClick={() => handleRemoveItem(index)}><Delete size={17}/></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editIndex !== null && (
        <div>
          <h2>Edit Item</h2>
          <label>Title: <input type="text" value={editedItem.title} onChange={(e) => handleInputChange(e, 'title')} /></label>
          <label>Description: <input type="text" value={editedItem.description} onChange={(e) => handleInputChange(e, 'description')} /></label>
          <label>Link Text: <input type="text" value={editedItem.link_text} onChange={(e) => handleInputChange(e, 'link_text')} /></label>
          <label>Link URL: <input type="text" value={editedItem.link_url} onChange={(e) => handleInputChange(e, 'link_url')} /></label>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AdminAbout;
