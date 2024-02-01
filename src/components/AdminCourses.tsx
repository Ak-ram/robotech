import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Link, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const AdminCourses = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<any>({
        id: 0,
        image1: "",
        rate: 0,
        title: "",
        price: 0,
        previousPrice: 0,
        studentsEnrolled: 0,
        description: "",
        enrollmentOpen: 'close',
        enrollmentLink: '',
        instructor: "",
        instructor_info: "",
        duration: 0,
        category: "",
        startDateTime: "",
        level: "",
        index: [],
        last_updated: "",
        more_details: "",
        quantity: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchJsonData("robotech/pages/courses.json");
                setJsonArray(data);
            } catch (error) {
                toast.error((error as Error).message)
            }
        };

        fetchData();
    }, []);

    const handleAddItemClick = () => {
        setEditIndex(-1); // Use -1 to indicate a new item
        setEditedItem({
            id: uuidv4(),
            image1: "",
            video: "",
            rate: 0,
            title: "",
            price: 0,
            previousPrice: 0,
            studentsEnrolled: 0,
            description: "",
            enrollmentOpen: 'close',
            enrollmentLink: '',
            instructor: "",
            instructor_info: "",
            duration: 0,
            category: "",
            startDateTime: "",
            level: "",
            index: [],
            last_updated: "",
            more_details: "",
            quantity: 1
        });
    };

    const handleRemoveItem = async (index: number) => {
        const updatedArray = [...jsonArray];
        updatedArray.splice(index, 1);

        try {
            await updateJsonFile("robotech/pages/courses.json", updatedArray);
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
            !editedItem.image1 ||
            !editedItem.video ||
            !editedItem.rate ||
            !editedItem.title ||
            !editedItem.price ||
            !editedItem.previousPrice ||
            !editedItem.description ||
            !editedItem.enrollmentOpen ||
            !editedItem.enrollmentLink ||
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
            toast.error("All fields are required")
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
                toast.success(`Item Added/Updated successfully`);
                toast.loading(`Be patient, changes takes a few moments to be reflected`);
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
        <div className={`min-h-[400px] lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

            {!jsonArray && <h2 className="font-bold mb-4">Current courses data:</h2>}
            <div className="mb-5 flex items-center justify-end">
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddItemClick}
                >
                    <Plus size={18} className="mr-1" />
                    Add Course
                </button>
            </div>
            {jsonArray.length !== 0 ?
                <div className="overflow-x-auto max-w-4xl">
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-zinc-800 text-white ">
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Id</th>
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Title</th>
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Price</th>
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Previous Price</th> */}
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">image1</th>
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Description</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Video</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Rate</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Students Enrolled</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Enrollment Open</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Enrollment Link</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Instructor</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Instructor Info</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">duration</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">start Date</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">category</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">level</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">index</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">last_updated</th> */}
                                {/* <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">more_details</th> */}
                                <th className="max-w-[150px] whitespace-nowrap text-ellipses border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jsonArray.map((item, index) => (
                                <tr key={index} className="hover:bg-slate-100">
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.id}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.title}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.price}</td>
                                    {/* <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.previousPrice}</td> */}
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2"><img src={item.image1} width="70" /></td>
                                    {/* <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.description}</td> */}
                                    {/* <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2"><video src={item.video} width={70} /></td> */}
                                    {/* <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.rate}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.studentsEnrolled}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.enrollmentOpen}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.enrollmentLink}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.instructor}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.instructor_info}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.duration}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.startDate}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.category}</td> */}
                                    {/* <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.level}</td> */}
                                    {/* <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.index}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.last_updated}</td>
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-4 py-2">{item.more_details}</td> */}
                                    <td className="text-center font-semibold max-w-[150px] whitespace-nowrap text-ellipses overflow-x-auto border px-2 py-2">
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
                </div> : <NoContent />}

            {editIndex !== null && (
                <div className="mt-5">
                    <h2 className="font-bold mb-2">
                        {editIndex === -1 ? "Add New Item" : "Edit Item"}
                    </h2>
                    <div className="flex flex-col lg:flex-row mb-2 lg:pr-4 flex-wrap">
                       
                        <div className="w-full  mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Title</span>

                            <input
                                required
                                type="text"
                                placeholder="Arduino Workshop"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={editedItem.title}
                                onChange={(e) => handleInputChange(e, "title")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                            <span className="text-sm font-bold my-2 -ml-2">Price</span>
                            <input
                                required
                                type="text"
                                placeholder="1000"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.price}
                                onChange={(e) => handleInputChange(e, "price")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Previous Price</span>

                            <input
                                required
                                type="text"
                                placeholder="1400"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.previousPrice}
                                onChange={(e) => handleInputChange(e, "previousPrice")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Image Poster</span>

                            <input
                                required
                                type="text"
                                placeholder="https://www.image-example.com"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.image1}
                                onChange={(e) => handleInputChange(e, "image1")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Description</span>

                            <input
                                required
                                type="text"
                                placeholder="Learn what is arduino and how to develop it..."
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.description}
                                onChange={(e) => handleInputChange(e, "description")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Video Sample</span>

                            <input

                                type="text"
                                placeholder="https://www.your-video.com"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.video}
                                onChange={(e) => handleInputChange(e, "video")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Rate</span>

                            <input
                                type="string"
                                placeholder="NO. from 1 to 5"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.rate}
                                onChange={(e) => handleInputChange(e, "rate")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Students Enrolled</span>

                            <input
                                type="text"
                                placeholder="NO. of Enrolled Students; ex: 210 "
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.studentsEnrolled}
                                onChange={(e) => handleInputChange(e, "studentsEnrolled")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Is Enrollment Open ?</span>

                            <input
                                required
                                type="text"
                                placeholder="open or close"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.enrollmentOpen}
                                onChange={(e) => handleInputChange(e, "enrollmentOpen")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Enrollment Link</span>

                            <input
                                required
                                type="text"
                                placeholder="Link to you registeration form"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.enrollmentLink}
                                onChange={(e) => handleInputChange(e, "enrollmentLink")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Instructor Name</span>
                            <input
                                required
                                type="text"
                                placeholder="JOE DOE M."
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.instructor}
                                onChange={(e) => handleInputChange(e, "instructor")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Instructor Info</span>

                            <input
                                type="text"
                                placeholder="More about the Instructor"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.instructor_info}
                                onChange={(e) => handleInputChange(e, "instructor_info")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Course Duration in weeks</span>

                            <input
                                type="text"
                                placeholder="5"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.duration}
                                onChange={(e) => handleInputChange(e, "duration")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Expected Start Date</span>

                            <input
                                type="text"
                                placeholder="1-3-2026"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.startDate}
                                onChange={(e) => handleInputChange(e, "startDate")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Category</span>
                            <input
                                type="text"
                                placeholder="Design"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.category}
                                onChange={(e) => handleInputChange(e, "category")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Course Level</span>

                            <input
                                type="text"
                                placeholder="Beginner or Intermediate or Advanced"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.level}
                                onChange={(e) => handleInputChange(e, "level")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Course Map</span>

                            <input
                                type="text"
                                placeholder="Indices separated by |, ex; topic 1 | topic 2 | ..."
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.index}
                                onChange={(e) => handleInputChange(e, "index")}
                            />
                        </div>
                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">Last Updated</span>

                            <input
                                type="text"
                                placeholder="2024"
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.last_updated}
                                onChange={(e) => handleInputChange(e, "last_updated")}
                            />
                        </div>

                        <div className="w-full mb-2 lg:pr-4">
                        <span className="text-sm font-bold my-2 -ml-2">More Details</span>

                            <input
                                type="text"
                                placeholder="All rights reserved..."
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

            {/* <div className="mt-5">
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

export default AdminCourses;