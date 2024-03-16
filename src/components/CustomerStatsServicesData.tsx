import { Ban, Check, CheckCheck, ChevronDown, Edit, Search, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductType } from "../../type";
import { getPrintServices } from "@/helpers/getPrintServices";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";

const CustomerStatsServicesData = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState<ProductType | null>(null);
    const [services, setServices] = useState<any[]>([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [editedService, setEditedService] = useState<ProductType | null>(null);
    const [jsonData, setJsonData] = useState<any[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesList = await getPrintServices();
                setServices(servicesList); // Initial sorting based on sortOrder

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (typeof window !== "undefined") {
            fetchData();
        }
    }, []);



    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const openEditPopup = (service: ProductType) => {
        setSelectedService(service);
        setEditedService({ ...service }); // Create a copy of the selected product for editing
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof ProductType) => {
        if (editedService) {
            setEditedService({ ...editedService, [key]: e.target.value });
        }
    };





    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchJsonData("robotech/pages/3d.json");
                setJsonData(data);


            } catch (error) {
            }
        };

        fetchData();
    }, []);
    const handleSave = async () => {
        if (editedService) {
            setIsEditPopupOpen(false);

            // Update the state immediately with the modified service
            setServices(prevServices => {
                return prevServices.map(service => {
                    if (service.id === editedService.id) {
                        return editedService;
                    } else {
                        return service;
                    }
                });
            });
            setEditedService(null);
            // Update the JSON file in the background
            if (jsonData.length > 0 && Array.isArray(jsonData[0][editedService.category])) {
                let updatedData = [...jsonData];
                updatedData[0][editedService.category] = updatedData[0][editedService.category].map(service => {
                    if (service.id === editedService.id) {
                        return editedService;
                    } else {
                        return service;
                    }
                });

                // No need to await, updating JSON file in the background
                updateJsonFile("robotech/pages/3d.json", updatedData)
                    .then(() => console.log("JSON file updated successfully"))
                    .catch(error => console.error("Error updating JSON file:", error));

                // Update the state with the new JSON data
                setJsonData(updatedData);
            } else {
                console.error("jsonData is empty or does not contain the expected structure.");
            }
        }
    };

    return (
        <div className={`${!show ? "border border-indigo-500 border-dashed" : ""} bg-white rounded-lg mb-5 overflow-hidden`}>
            <div
                className="flex items-center p-5 justify-between cursor-pointer"
                onClick={() => setShow(!show)}
            >
                <h3 className="transform  transition-transform duration-500 font-semibold text-indigo-500">
                    {show ? "Click to Collapse" : "Expand Services Data"}
                </h3>
                <ChevronDown
                    className={`transform text-indigo-500 transition-transform duration-300 ${show ? "rotate-180" : ""
                        }`}
                    size={25}
                />
            </div>
            {show && <div className={`bg-white my-5 px-3  rounded-lg shadow-md animate-fade-in`}>

                <h2 className="whitespace-nowrap font-semibold  flex items-center justify-center text-indigo-500 bg-indigo-100 py-2 px-4 rounded-md">
                    <CheckCheck className="mr-2 text-indigo-500" size={22} /> Services
                    <span className="mx-4 relative">
                        <Search className="w-5 h-5 text-indigo-500 absolute top-1.5 right-3" />
                        <input
                            type="text"
                            placeholder="Service Name..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="pl-2 pr-10 w-[180px] placeholder-indigo-300 py-1 text-sm border border-indigo-200 rounded focus:outline-none focus:border-indigo-500"
                        />
                    </span>
                    <span className="ml-auto text-sm">
                        {services &&
                            services.length}{' '}
                        Items(s)
                    </span>
                </h2>

                <div className="mb-3 h-[380px] overflow-auto py-3 px-2 rounded-md">
                    {services &&
                        services
                            .filter((service) =>
                                service.title.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((service) => (
                                <div
                                    className="flex items-center justify-start gap-1 border-b border-indigo-300 py-2"
                                    key={`${service.id}_${service.title}`}
                                >
                                    <img
                                        className="w-8 h-8 rounded"
                                        src={service?.image1}
                                        alt={service.title}
                                    />{' '}
                                    <div className="pl-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{service.title}</div>
                                    <div className="ml-auto">
                                        <button
                                            className="mr-1"
                                            onClick={() => openEditPopup(service)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                </div>

                {/* Popup */}
                {isEditPopupOpen && editedService && (
                    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">
                            <h2 className="font-bold mb-2 text-center text-lg">Edit Service</h2>
                            <div className="">
                                {Object.entries({
                                    title: 'Title',
                                    description: 'Description',
                                    price: 'Price',
                                    wholesalePrice: 'Wholesale Price', // Add the Wholesale Price field
                                    previousPrice: 'Previous Price',
                                    count: 'Count',
                                    image1: 'Image1',
                                    image2: 'Image2',
                                    image3: 'Image3',
                                    externalLink: "External Link",
                                }).map(([key, placeholder], index) => (
                                    <div key={key} className={`flex-col mb-2 lg:pr-4`}>
                                        <span className="font-bold text-sm mb-2 inline-block ml-1">{placeholder}</span>
                                        {key === 'description' ? (
                                            <textarea
                                                placeholder={placeholder}
                                                className={`border border-indigo-300 rounded outline-none w-full p-2 `}
                                                value={editedService[key]}
                                                onChange={(e) => handleInputChange(e, key as keyof ProductType)}
                                            />
                                        ) : (
                                            <input
                                                type={key === 'price' || key === 'wholesalePrice' ? 'number' : 'text'} // Set the type for price and wholesalePrice to 'number'
                                                placeholder={placeholder}
                                                className={`border border-indigo-300 rounded outline-none w-full p-2 `}
                                                value={editedService[key]}
                                                onChange={(e) => handleInputChange(e, key as keyof ProductType)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex">
                                <button
                                    className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={handleSave}
                                >
                                    <Check size={18} className="mr-1" />
                                    Save
                                </button>
                                <button
                                    className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={closeEditPopup}
                                >
                                    <X size={18} className="mr-1" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>}
        </div>
    );
}

export default CustomerStatsServicesData;