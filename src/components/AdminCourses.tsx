import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";

const AdminCourses = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<any>({
        id: 0,
        image1: "",
        image2: "",
        image3: "",
        video: "",
        rate: 0,
        title: "",
        price: 0,
        previousPrice: 0,
        studentsEnrolled: 0,
        description: "",
        enrollmentOpen: false,
        instructor: "",
        instructor_info: "",
        duration: 0,
        category: "",
        startDateTime: "",
        level: "",
        index: [],
        last_updated: "",
        more_details: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchJsonData("robotech/pages/courses.json");
                setJsonArray(data);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchData();
    }, []);

    const handleAddItemClick = () => {
        setEditIndex(-1); // Use -1 to indicate a new item
        setEditedItem({
            id: 0,
            image1: "",
            image2: "",
            image3: "",
            video: "",
            rate: 0,
            title: "",
            price: 0,
            previousPrice: 0,
            studentsEnrolled: 0,
            description: "",
            enrollmentOpen: false,
            instructor: "",
            instructor_info: "",
            duration: 0,
            category: "",
            startDateTime: "",
            level: "",
            index: [],
            last_updated: "",
            more_details: ""
        });
        setError(null); // Reset error state
    };

    const handleRemoveItem = async (index: number) => {
        const updatedArray = [...jsonArray];
        updatedArray.splice(index, 1);

        try {
            await updateJsonFile("robotech/pages/courses.json", updatedArray);
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
        // Check for empty fields
        if (
            !editedItem.id ||
            !editedItem.image||
            !editedItem.video||
            !editedItem.rate ||
            !editedItem.title ||
            !editedItem.price ||
            !editedItem.previousPrice ||
            !editedItem.description ||
            // !editedItem.enrollmentOpen ||
            !editedItem.instructor ||
            !editedItem.instructor_info ||
            !editedItem.duration ||
            !editedItem.category ||
            !editedItem.startDate ||
            !editedItem.level ||
            !editedItem.index ||
            !editedItem.last_updated ||
            !editedItem.more_details
        ) {
            setError("All fields are required");
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
                await updateJsonFile("robotech/pages/courses.json", updatedArray);
                setJsonArray(updatedArray);
                setEditIndex(null);
                setError(null); // Reset error state
            } catch (error) {
                setError((error as Error).message);
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
        <div className={`lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>
            <h2 className="font-bold mb-4">Current courses data:</h2>
            <div className="overflow-x-auto max-w-screen-lg">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-zinc-800 text-white ">
                            <th className="border px-4 py-2">Id</th>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Previous Price</th>
                            <th className="border px-4 py-2">Poster</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Video</th>
                            <th className="border px-4 py-2">Rate</th>
                            <th className="border px-4 py-2">Students Enrolled</th>
                            <th className="border px-4 py-2">Enrollment Open</th>
                            <th className="border px-4 py-2">Instructor</th>
                            <th className="border px-4 py-2">Instructor Info</th>
                            <th className="border px-4 py-2">duration</th>
                            <th className="border px-4 py-2">start Date</th>
                            <th className="border px-4 py-2">category</th>
                            <th className="border px-4 py-2">level</th>
                            <th className="border px-4 py-2">index</th>
                            <th className="border px-4 py-2">last_updated</th>
                            <th className="border px-4 py-2">more_details</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonArray.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-100">
                                <td className="border px-4 py-2">{item.id}</td>
                                <td className="border px-4 py-2">{item.title}</td>
                                <td className="border px-4 py-2">{item.price}</td>
                                <td className="border px-4 py-2">{item.previousPrice}</td>
                                <td className="border px-4 py-2"><img src={item.poster} width="70" /></td>
                                <td className="border px-4 py-2">{item.description}</td>
                                <td className="border px-4 py-2"><video src={item.video} width={70}/></td>
                                <td className="border px-4 py-2">{item.rate}</td>
                                <td className="border px-4 py-2">{item.studentsEnrolled}</td>
                                <td className="border px-4 py-2">{item.enrollmentOpen}</td>
                                <td className="border px-4 py-2">{item.instructor}</td>
                                <td className="border px-4 py-2">{item.instructor_info}</td>
                                <td className="border px-4 py-2">{item.duration}</td>
                                <td className="border px-4 py-2">{item.startDate}</td>
                                <td className="border px-4 py-2">{item.category}</td>
                                <td className="border px-4 py-2">{item.level}</td>
                                <td className="border px-4 py-2">{item.index}</td>
                                <td className="border px-4 py-2">{item.last_updated}</td>
                                <td className="border px-4 py-2">{item.more_details}</td>
                                <td className="border px-2 py-2">
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

            {editIndex !== null && (
                <div className="mt-5">
                    <h2 className="font-bold mb-2">
                        {editIndex === -1 ? "Add New Item" : "Edit Item"}
                    </h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <div className="flex flex-col lg:flex-row mb-2 lg:pr-4 flex-wrap">
                        <div className="lg:w-1/4  mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="ID"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={editedItem.id}
                                onChange={(e) => handleInputChange(e, "id")}
                            />
                        </div>
                        <div className="lg:w-1/4  mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={editedItem.title}
                                onChange={(e) => handleInputChange(e, "title")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Price"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.price}
                                onChange={(e) => handleInputChange(e, "price")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Previous Price"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.previousPrice}
                                onChange={(e) => handleInputChange(e, "previousPrice")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Poster"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.poster}
                                onChange={(e) => handleInputChange(e, "poster")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Description"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.description}
                                onChange={(e) => handleInputChange(e, "description")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Video"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.video}
                                onChange={(e) => handleInputChange(e, "video")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="string"
                                placeholder="Rate"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.rate}
                                onChange={(e) => handleInputChange(e, "rate")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Students Enrolled"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.studentsEnrolled}
                                onChange={(e) => handleInputChange(e, "studentsEnrolled")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Enrollment Open"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.enrollmentOpen}
                                onChange={(e) => handleInputChange(e, "enrollmentOpen")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Instructor"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.instructor}
                                onChange={(e) => handleInputChange(e, "instructor")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Instructor Info"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.instructor_info}
                                onChange={(e) => handleInputChange(e, "instructor_info")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Duration"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.duration}
                                onChange={(e) => handleInputChange(e, "duration")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Start Date"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.startDate}
                                onChange={(e) => handleInputChange(e, "startDate")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Categorye"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.category}
                                onChange={(e) => handleInputChange(e, "category")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Level"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.level}
                                onChange={(e) => handleInputChange(e, "level")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Index"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.index}
                                onChange={(e) => handleInputChange(e, "index")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="last updated"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.last_updated}
                                onChange={(e) => handleInputChange(e, "last_updated")}
                            />
                        </div>
                    
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="More Details"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.more_details}
                                onChange={(e) => handleInputChange(e, "more_details")}
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
            )}

            <div className="mt-5">
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddItemClick}
                >
                    <Plus size={18} className="mr-1" />
                    Add Item
                </button>
            </div>
        </div>
    );
};

export default AdminCourses;