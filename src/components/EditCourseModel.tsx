import supabase from "@/supabase/config";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";

const EditCourseModel = ({editIndex,editedItem,setEditIndex,setEditedItem,jsonArray,setJsonArray})=>{
    
    const handleEditSubmit = async () => {
        try {
            // Check for empty fields
            if (
                !editedItem.title ||
                !editedItem.price ||
                !editedItem.previousPrice ||
                !editedItem.description ||
                !editedItem.enrollmentOpen ||
                !editedItem.enrollmentLink ||
                !editedItem.instructor ||
                !editedItem.level ||
                !editedItem.index
            ) {
                toast.error("some fields are required");
                return;
            }


            if(editedItem.rate > 5 ){
                toast.error('Maximum rate value is 5')
                return;
            }


            if (editIndex !== null) {
                let updatedCourses;
                if (editIndex === -1) {
                    // Add a new course
                    const { data, error } = await supabase
                        .from('courses')
                        .insert([editedItem]);
                    if (error) {
                        throw error;
                    }
                    updatedCourses = [...jsonArray, editedItem]; // Add a check for empty data array
                } else {
                    // Update an existing course
                    const { data, error } = await supabase
                        .from('courses')
                        .update(editedItem)
                        .eq('id', editedItem.id);
                    if (error) {
                        throw error;
                    }
                    updatedCourses = jsonArray.map(course =>
                        course.id === editedItem.id ? editedItem : course
                    );
                }

                setJsonArray(updatedCourses); // Update the state variable
                setEditIndex(null);
                toast.success("Course Added/Updated successfully");
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };
   
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: string
    ) => {
        setEditedItem((prev) => ({ ...prev, [key]: e.target.value }));
    };
    const handleEditCancel = () => {
        setEditIndex(null);
        setEditedItem({});
    };

    return (
        <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white max-h-[600px] overflow-auto max-w-[600px] p-8 rounded-lg shadow-md">
            <h2 className="font-bold mb-2 text-center text-lg">
                {editIndex === -1 ? "Add Course" : "Edit Course"}
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
                        value={editedItem.poster}
                        onChange={(e) => handleInputChange(e, "poster")}
                    />
                </div>
                <div className="w-full mb-2 lg:pr-4">
                    <span className="text-sm font-bold my-2 -ml-2">Description</span>

                    <textarea
                        required
                        placeholder="Learn what is arduino and how to develop it..."
                        className="p-2 w-full border border-gray-300 rounded"
                        value={editedItem.description}
                        onChange={(e) => handleInputChange(e, "description")}
                    ></textarea>
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
                        type="number"
                        max={5}
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

                    <textarea
                        placeholder="More about the Instructor"
                        className="p-2 w-full border border-gray-300 rounded"
                        value={editedItem.instructor_info}
                        onChange={(e) => handleInputChange(e, "instructor_info")}
                    ></textarea>
                </div>
                <div className="w-full mb-2 lg:pr-4">
                    <span className="text-sm font-bold my-2 -ml-2">Course Duration in hours</span>

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

                    <textarea
                        placeholder="Indices separated by |, ex; topic 1 | topic 2 | ..."
                        className="p-2 w-full border border-gray-300 rounded"
                        value={editedItem.index}
                        onChange={(e) => handleInputChange(e, "index")}
                    ></textarea>
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

                    <textarea
                        placeholder="All rights reserved..."
                        className="p-2 w-full border border-gray-300 rounded"
                        value={editedItem.more_details}
                        onChange={(e) => handleInputChange(e, "more_details")}
                    ></textarea>
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
    )
}

export default EditCourseModel