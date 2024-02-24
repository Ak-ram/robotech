import { Activity, Briefcase, Book } from "lucide-react"

const CustomerStatsTopSelling = ({ customers }) => {


    const getMostSellingProduct = () => {
        const productMap = new Map();
        customers.forEach((customer) => {
            customer.transactions.products.forEach((product) => {
                const { productName, quantity } = product;
                if (productMap.has(productName)) {
                    productMap.set(productName, productMap.get(productName) + quantity);
                } else {
                    productMap.set(productName, quantity);
                }
            });
        });

        let mostSellingProduct = '';
        let maxQuantity = 0;

        productMap.forEach((quantity, productName) => {
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                mostSellingProduct = productName;
            }
        });

        return { mostSellingProduct, sellingTimes: maxQuantity };
    };
    const getMostSellingService = () => {
        const serviceMap = new Map();
        customers.forEach((customer) => {
            customer.transactions.printServices.forEach((service) => {
                const { productName, quantity } = service;
                if (serviceMap.has(productName)) {
                    serviceMap.set(productName, serviceMap.get(productName) + quantity);
                } else {
                    serviceMap.set(productName, quantity);
                }
            });
        });

        let mostSellingService = '';
        let maxQuantity = 0;

        serviceMap.forEach((quantity, serviceName) => {
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                mostSellingService = serviceName;
            }
        });

        return { mostSellingService, sellingTimes: maxQuantity };
    };
    const getMostSellingCourse = () => {
        const courseMap = new Map();
        customers.forEach((customer) => {
            customer.transactions.courses.forEach((course) => {
                const { productName, quantity } = course;
                if (courseMap.has(productName)) {
                    courseMap.set(productName, courseMap.get(productName) + quantity);
                } else {
                    courseMap.set(productName, quantity);
                }
            });
        });

        let mostSellingCourse = '';
        let maxQuantity = 0;

        courseMap.forEach((quantity, courseName) => {
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                mostSellingCourse = courseName;
            }
        });

        return { mostSellingCourse, sellingTimes: maxQuantity };
    };
    const mostSellingProductData = getMostSellingProduct();
    const mostSellingServiceData = getMostSellingService();
    const mostSellingCourseData = getMostSellingCourse();



    return (
        <div className="top-selling-card flex-1 bg-white my-5 px-3 py-6 rounded-lg shadow-md animate-fade-in">
            <h2 className="top-selling-heading text-2xl font-semibold mb-6 flex items-center justify-center bg-blue-100 py-2 px-4 rounded-md">
                <span className="top-selling-icon mr-2 text-blue-500">
                    <Activity size={24} />
                </span>
                Top Selling
            </h2>

            <div className="top-selling-products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">




                <div className="top-selling-product mb-3 py-3 px-2 rounded-md border border-gray-200">
                    <h3 className="top-selling-title text-lg font-semibold mb-3 flex items-center">
                        <Briefcase className="mr-2 text-yellow-500" size={20} /> Product:
                    </h3>
                    <div className="top-selling-details flex items-center justify-between">
                        <div className="service-name ml-5">{mostSellingProductData.mostSellingProduct || 'No Selling Products'}</div>
                        <div className="sold-count text-zinc-500 text-sm font-semibold">
                            {
                                mostSellingProductData.sellingTimes ? `Sold ${mostSellingProductData.sellingTimes} times` : ''
                            }
                        </div>
                    </div>
                </div>


                <div className="top-selling-service mb-3 py-3 px-2 rounded-md border border-gray-200">
                    <h3 className="top-selling-title text-lg font-semibold mb-3 flex items-center">
                        <Briefcase className="mr-2 text-yellow-500" size={20} /> Service:
                    </h3>
                    <div className="top-selling-details flex items-center justify-between">
                        <div className="service-name  ml-5">{mostSellingServiceData.mostSellingService || 'No Selling Services'}</div>
                        <div className="sold-count text-zinc-500 text-sm font-semibold">
                            {
                                mostSellingServiceData.mostSellingService ? `Sold ${mostSellingServiceData.sellingTimes} times` : ''
                            }
                        </div>
                    </div>
                </div>

                <div className="top-selling-course mb-3 py-3 px-2 rounded-md border border-gray-200">
                    <h3 className="top-selling-title text-lg font-semibold mb-3 flex items-center">
                        <Book className="mr-2 text-indigo-500" size={20} /> Course:
                    </h3>
                    <div className="top-selling-details flex items-center justify-between">
                        <div className="course-name ml-5">{mostSellingCourseData.mostSellingCourse || 'No Selling Courses'}</div>
                        <div className="sold-count text-zinc-500 text-sm font-semibold">
                            {
                                mostSellingCourseData.mostSellingCourse ? `Sold ${mostSellingCourseData.sellingTimes} times` : ''
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CustomerStatsTopSelling