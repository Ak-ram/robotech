import { updateJsonFile } from "@/helpers/updateJSONData";
import OrderModel from "./orderModel";
import { useEffect, useState } from "react";
import { getProducts } from "@/helpers/getProducts";
import { fetchJsonData } from "@/helpers/getJSONData";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { Check, Edit, Edit2, Redo, ScrollText, Trash } from "lucide-react";
import Bill from "./Bill";

const CustomerPageAddProducts = ({ billData,setBillData,customerData, setCustomerData }) => {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [updatedCustomerData, setUpdatedCustomerData] = useState(customerData);
  const [list, setList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lastOrderId, setLastOrderId] = useState("");

  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [categoriesArray, setCategoriesArray] = useState<any[]>([]);
  const [newOrder, setNewOrder] = useState({
    productName: "",
    quantity: 1,
    date: "",
    discount: 0,
    subtotal: 0,
    piecePrice: 0,
  });
  useEffect(() => {
    setUpdatedCustomerData(customerData);
  }, [customerData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cusomterData = await fetchJsonData(
          "robotech/pages/customers.json"
        );
        const categoriesData = await fetchJsonData(
          "robotech/pages/categories.json"
        );
        setJsonArray(cusomterData);
        setCategoriesArray(categoriesData);
      } catch (error) {
        new Error((error as Error).message);
      }
    };

    fetchData();
  }, []);
  const handleRefundProductCount = async (product) => {
    try {
      const updatedData = [...categoriesArray];
      const category = updatedData[0][product.productCategory];
      if (category) {
        const productIndex = category.findIndex(
          (item) => item.id === product.productId
        );
        if (productIndex !== -1) {
          const updatedCategory = [...category]; // Create a copy of the category array
          const refundedProduct = updatedCategory[productIndex];
          refundedProduct.count = Number(refundedProduct.count) + Number(product.quantity); // Increment the count by refunded quantity
          updatedCategory[productIndex] = refundedProduct; // Update the product in the category array
  
          updatedData[0][product.productCategory] = updatedCategory; // Update the category array in the updatedData
  
          await updateJsonFile("robotech/pages/categories.json", updatedData);
          console.log("Product count updated successfully");
        } else {
          console.log("Product not found in category");
        }
      } else {
        console.log("Category not found");
      }
    } catch (error) {
      console.error("Error updating product count:", error);
    }
  };
  
  
  
  // const handleRefundProductCount = async (product) => {
  //   const updatedData = [...categoriesArray];
  //   const category = updatedData[0][product.productCategory];
  //   if (category) {
  //     const productIndex = category.findIndex(
  //       (item) => item.id === product.productId
  //     );
  //     if (productIndex !== -1) {
  //       let obj = updatedData[0][product.productCategory].find(
  //         (item) => item.id === product.productId
  //       );
  //       let updatedObject = {
  //         ...obj,
  //         count: `${+obj?.count + +product?.quantity}`,
  //       };
  //       updatedData[0][product.productCategory].map((product) => {
  //         if (product.id === product.productId) {
  //           return updatedObject;
  //         }
  //         return product;
  //       });
  
  //       await updateJsonFile("robotech/pages/categories.json", updatedData);
  //     } else {
  //       console.log("Product not found in category");
  //     }
  //   } else {
  //     console.log("Category not found");
  //   }
  // };

  const handleRefundOrder = async (product) => {
    // Confirm with the user before proceeding with the refund
    if (window.confirm("Are you sure you want to refund this product?")) {
      // Remove the refunded product from the products array
      const updatedProducts = customerData.transactions.products.filter(
        (p) => p !== product
      );

      // Calculate the refund amount
      const refundAmount = product.subtotal;

      // Update the total purchase transactions for the customer
      const existingCustomerIndex = jsonArray.findIndex(
        (customer) => customer.id === customerData.id
      );

      if (existingCustomerIndex !== -1) {
        const existingCustomer = { ...jsonArray[existingCustomerIndex] }; // Make a copy to avoid mutation
        // Subtract the refund amount from total_purchase_transactions
        existingCustomer.total_purchase_transactions -= refundAmount;
        // Update the transactions array with the updated products
        existingCustomer.transactions.products = updatedProducts;
        // Recalculate total purchase transactions based on remaining transactions
        existingCustomer.total_purchase_transactions =
          existingCustomer.transactions.products.reduce(
            (total, transaction) => total + transaction.subtotal,
            0
          );

        try {
          jsonArray[existingCustomerIndex] = existingCustomer;
          await updateJsonFile("robotech/pages/customers.json", [...jsonArray]);
          setCustomerData(existingCustomer);
          toast.success(`Product refunded successfully`);
        } catch (error) {
          // Display error message if update fails
          toast.error((error as Error).message);
        }
      }
    }
    handleRefundProductCount(product)
  };

  const handleAddOrder = async (productId) => {
    if (lastOrderId === productId) {
      toast.error(
        "Sorry, you cannot add the same order twice in a row. Please try later or adding a different order."
      );
      setShowAddOrderModal(false)
      return;
    }
    setLastOrderId(productId);
    setTimeout(() => {
      setLastOrderId("");
    }, 3 * 1000 * 60);
    // Validate order details if needed
    const existingCustomerIndex = jsonArray.findIndex(
      (customer) => customer.id === customerData.id
    );

    if (existingCustomerIndex !== -1) {
      const existingCustomer = jsonArray[existingCustomerIndex];

      if (!existingCustomer.transactions) {
        existingCustomer.transactions = {
          courses: [],
          printServices: [],
          products: [],
        };
      } else if (!existingCustomer.transactions.products) {
        existingCustomer.transactions.products = [];
      }

      existingCustomer.transactions.products.push(newOrder);

      // Update the JSON file with the modified JSON array
      try {
        // Calculate the total purchase transactions
        existingCustomer.total_purchase_transactions =
          existingCustomer.transactions.products.reduce(
            (total, transaction) => total + transaction.subtotal,
            0
          );

        jsonArray[existingCustomerIndex] = existingCustomer;
        // Update the JSON file with the modified JSON array
        setShowAddOrderModal(false);
        await updateJsonFile("robotech/pages/customers.json", [...jsonArray]);

        // Update the customerData state with the new transaction
        setCustomerData(existingCustomer);
        setBillData([...billData,newOrder])
        // Reset newOrder fields
        setNewOrder({
          productName: "",
          quantity: 1,
          date: "",
          discount: 0,
          subtotal: 0,
          piecePrice: 0,
        });
        toast.success(`Item Added/Updated successfully`);
        toast.loading(`Be patient, changes take a few moments to be reflected`);
        setTimeout(() => {
          toast.dismiss();
        }, 5000);
      } catch (error) {
        toast.error((error as Error).message);
      }
    } else {
      // Handle the case where the customer doesn't exist or show an error message
      console.error("Customer not found for ID:", customerData.id);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const p = await getProducts();
        setList(p);
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    if (typeof window !== "undefined") {
      // Run the effect only in the browser environment
      fetchProducts();
    }
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto my-8">
        <button
          className={`mb-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300`}
          onClick={() => setShowAddOrderModal(true)}
        >
          Add Product
        </button>
        {updatedCustomerData?.transactions?.products
          ?.slice()
          .reverse()
          .map((product, index) => (
            <div
              key={index}
              className={`bg-white flex gap-3 p-6 rounded-lg shadow-md mb-4`}
            >
              <div className="flex-1">
                <p className="text-gray-600 mb-2">
                  Transaction date: {product["date"]}
                </p>
                <p className="text-gray-600 mb-2">
                  Product name: {product["productName"]}
                </p>
                <p className="text-gray-600 mb-2">
                  Product price:{" "}
                  <FormattedPrice amount={+product["piecePrice"]} />
                </p>
                <p className="text-gray-600 mb-2">
                  Discound: <FormattedPrice amount={+product["discount"]!} />
                </p>
                <p className="text-gray-600 mb-2">
                  Sub-total price:{" "}
                  <FormattedPrice amount={+product["subtotal"]!} />
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex-1">
                  <ScrollText
                    onClick={() => {
                      setShowBill(true);
                      setSelectedProduct(product);
                    }}
                    className="my-2 ml-auto cursor-pointer text-blue-600"
                    size={20}
                  />
                </div>

                <span
                  onClick={() => handleRefundOrder(product)}
                  className="flex gap-1 text-red-600  cursor-pointer items-center justify-center"
                >
                  Refund
                  <Redo className="ml-auto mr-2" size={20} />
                </span>
              </div>
              {showBill && selectedProduct && (
                <Bill
                  transactionData={[selectedProduct]}
                  setShowBill={setShowBill}
                />
              )}
            </div>
          ))}
      </div>

      {showAddOrderModal && (
        <OrderModel
          list={list}
          newOrder={newOrder}
          setNewOrder={setNewOrder}
          handleAddOrder={handleAddOrder}
          setShowAddOrderModal={setShowAddOrderModal}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default CustomerPageAddProducts;
