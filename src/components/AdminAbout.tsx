// // import { fetchJsonData } from "@/helpers/getJSONData";
// // import { useEffect, useState } from "react";

// // const AdminAbout = () => {

// //     const [jsonArray, setJsonArray] = useState<any[]>([]);
// //     const [error, setError] = useState<string | null>(null);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const data = await fetchJsonData('robotech/pages/about.json');
// //                 setJsonArray(data);
// //             } catch (error) {
// //                 setError((error as Error).message);
// //             }
// //         };

// //         fetchData();
// //     }, []);


// //     return (
// //         <div className={` lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5 `}>
// //             <h2 className="font-bold mb-4">Current About data:</h2>
// //             <div className="overflow-x-auto">
// //                 <table className="min-w-full border border-gray-300">
// //                     <thead>
// //                         <tr className="bg-gray-100">
// //                             <th className="border px-4 py-2">id</th>
// //                             <th className="border px-4 py-2">title</th>
// //                             <th className="border px-4 py-2">description</th>
// //                             <th className="border px-4 py-2">link text</th>
// //                             <th className="border px-4 py-2">link url</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {jsonArray.map((item, index) => (
// //                             <tr key={index}>
// //                                 <td className="border px-4 py-2">{item.id}</td>
// //                                 <td className="border px-4 py-2">{item.title}</td>
// //                                 <td className="border px-4 py-2">{item.description}</td>
// //                                 <td className="border px-4 py-2">{item.link_text}</td>
// //                                 <td className="border px-4 py-2">{item.link_url}</td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>

// //             {error && <p className="text-red-500">{error}</p>}
// //         </div>
// //     );
// // };

// // export default AdminAbout;

// import { useEffect, useState } from "react";
// import { fetchJsonData } from "@/helpers/getJSONData";
// import { updateJsonFile } from "@/helpers/updateJSONData";
// import { Octokit } from "@octokit/rest";
// import { Trash } from "lucide-react";

// const AdminAbout = () => {
//     const [jsonArray, setJsonArray] = useState<any[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await fetchJsonData('robotech/pages/about.json');
//                 setJsonArray(data);
//             } catch (error) {
//                 setError((error as Error).message);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleRemoveItem = async (index: number) => {
//         // Remove the item from the JSON array
//         const updatedArray = [...jsonArray];
//         const removedItem = updatedArray.splice(index, 1)[0];

//         try {
//             // Update the JSON file with the modified array
//             await updateJsonFile('robotech/pages/about.json', updatedArray);

//             // Update the state to reflect the change
//             setJsonArray(updatedArray);
//         } catch (error) {
//             setError((error as Error).message);
//         }
//     };

//     return (
//         <div className={`lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>
//             <h2 className="font-bold mb-4">Current About data:</h2>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border px-4 py-2">id</th>
//                             <th className="border px-4 py-2">title</th>
//                             <th className="border px-4 py-2">description</th>
//                             <th className="border px-4 py-2">link text</th>
//                             <th className="border px-4 py-2">link url</th>
//                             <th className="border px-4 py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {jsonArray.map((item, index) => (
//                             <tr key={index}>
//                                 <td className="border px-4 py-2">{item.id}</td>
//                                 <td className="border px-4 py-2">{item.title}</td>
//                                 <td className="border px-4 py-2">{item.description}</td>
//                                 <td className="border px-4 py-2">{item.link_text}</td>
//                                 <td className="border px-4 py-2">{item.link_url}</td>
//                                 <td className="border px-4 py-2">
//                                     <button onClick={() => handleRemoveItem(index)}><Trash /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {error && <p className="text-red-500">{error}</p>}
//         </div>
//     );
// };

// export default AdminAbout;

import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Octokit } from "@octokit/rest";

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
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">id</th>
              <th className="border px-4 py-2">title</th>
              <th className="border px-4 py-2">description</th>
              <th className="border px-4 py-2">link text</th>
              <th className="border px-4 py-2">link url</th>
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
                <td className="border px-4 py-2">{item.link_url}</td>
                <td className="border px-4 py-2">
                  {editIndex === index ? (
                    <>
                      <button onClick={handleEditSubmit}>Save</button>
                      <button onClick={handleEditCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(index)}>Edit</button>
                      <button onClick={() => handleRemoveItem(index)}>Remove</button>
                    </>
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
