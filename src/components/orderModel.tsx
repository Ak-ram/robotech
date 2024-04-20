import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { CourseType, ProductType } from "../../type";
import { fetchJsonData } from "@/helpers/getJSONData";
import supabase from "@/supabase/config";
import { handleAddItemClick } from "@/helpers/addJSONItem";

const CustomSelect = ({
  options,
  onSelect,
  newOrder,
  setNewOrder,
  setSelectedItem,
  date,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [options, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    setSearchTerm(option.title); // Set search term to selected option's title
    setSelectedItem(option || null);
    const orderDate = new Date(date).toISOString()

    setNewOrder({
      ...newOrder,
      productId: option?.id,
      productName: option?.title,
      productCategory: option?.category || "",

      piecePrice: +option?.price!,
      wholesalePrice: +option.wholesalePrice || 0,
      isRefund: false,
      discount: +option.discount || 0, // Set discount to 0 as default value
      // date: orderDate.toLocaleDateString("en-US", {
      //   weekday: "short",
      //   year: "numeric",
      //   month: "short",
      //   day: "2-digit",
      //   hour: "2-digit",
      //   minute: "2-digit",
      // }),
      date: orderDate
      // date: new Date().toLocaleDateString("en-US", {
      //   weekday: "short",
      //   year: "numeric",
      //   month: "short",
      //   day: "2-digit",
      //   hour: "2-digit",
      //   minute: "2-digit",
      // }),
    });
  };

  return (
    <div ref={selectRef} className="custom-select relative ">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {isOpen && (
        <ul className="max-h-[300px] border border-slate-400 shadow-lg overflow-auto absolute top-12 w-full left-0 bg-white">
          {filteredOptions.map((option) => (
            <li
              className="px-2 rounded cursor-pointer py-1 my-1 hover:bg-slate-100"
              key={option.id}
              onClick={() => handleSelect(option)}
            >
              {option.title} - <FormattedPrice amount={+option.price} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const OrderModel = ({
  newOrder,
  setNewOrder,
  handleAddOrder,
  setShowAddOrderModal,
  list,
}) => {
  const [selectedItem, setSelectedItem] = useState<
    CourseType | ProductType | null
  >(null);
  const [products, setproducts] = useState<any>([]);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    // Fetch categories data
    const fetchData = async () => {
      try {
        const { data } = await supabase.from("products").select();
        console.log("dara", data);
        setproducts(data);
      } catch (error) {
        toast.error(`${(error as Error).message}`);
      }
    };
    fetchData();
  }, []);

  // Calculate subtotal whenever selectedItem or newOrder changes
  useEffect(() => {
    if (selectedItem && +newOrder.quantity >= 0 && +newOrder.discount >= 0) {
      const subtotal =
        +selectedItem.price * +newOrder.quantity - +newOrder.discount;
      setNewOrder({ ...newOrder, subtotal });
    }
  }, [selectedItem, newOrder.quantity, newOrder.discount, setNewOrder]);


  const handleDate = () => {

  }

  const handleSelect = (option) => {
    const orderDate = new Date(date).toISOString()
    setSelectedItem(option);
    setNewOrder({
      ...newOrder,
      productId: option?.id,
      productName: option.title,
      productCategory: option?.category || "",
      piecePrice: +option.price,
      discount: +option.discount || 0,
      wholesalePrice: +option.wholesalePrice || 0,
      isRefund: false,
      // date: orderDate.toLocaleDateString("en-US", {
      //   weekday: "short",
      //   year: "numeric",
      //   month: "short",
      //   day: "2-digit",
      //   hour: "2-digit",
      //   minute: "2-digit",
      // }),

      date: orderDate
      // date: new Date().toLocaleDateString("en-US", {
      //   weekday: "short",
      //   year: "numeric",
      //   month: "short",
      //   day: "2-digit",
      //   hour: "2-digit",
      //   minute: "2-digit",
      // }),
    });
  };

  const handleAddOrderClick = async () => {
    // Validate selected product
    if (!selectedItem) {
      toast.error("Please select a product");
      return;
    }
    if (newOrder.quantity <= 0) {
      toast.error("Quantity should be greater than zero");
      return;
    }
    if (newOrder.discount < 0) {
      toast.error("Discount should be zero or more");
      return;
    }
    if ("count" in selectedItem!) {
      if (newOrder.quantity > selectedItem.count) {
        toast.error(`only ${selectedItem.count} piece(s) available in-stock`);
        return;
      }
      //  else {
      //   const newStock = selectedItem.count - newOrder.quantity;
      //   console.log("selected product stock", selectedItem.count);
      //   console.log("new order quantity", newOrder.quantity);
      //   console.log("new stock", newStock);
      //   await supabase
      //     .from("products")
      //     .update({ count: newStock })
      //     .eq("id", selectedItem.id);
      // }
    }





    handleAddOrder(newOrder.productId);
  };
  useEffect(() => {
    console.log(newOrder)
  }, [selectedItem])
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center">
        <div className="bg-white min-w-[40rem] p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Order</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <input type="date" onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Name
              </label>
              <CustomSelect
                setSelectedItem={setSelectedItem}
                setNewOrder={setNewOrder}
                newOrder={newOrder}
                options={list}
                onSelect={handleSelect}
                date={date}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={newOrder.quantity || 1}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    quantity: parseInt(e.target.value, 10),
                  })
                }
              />
            </div>

            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <div className="w-full p-2 border border-gray-300 rounded">
                <FormattedPrice
                  amount={
                    (selectedItem?.price! || 0) * (newOrder?.quantity || 1)
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discount
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={newOrder.discount}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    discount: isNaN(parseInt(e.target.value, 10))
                      ? 0
                      : parseInt(e.target.value, 10),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Subtotal
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={newOrder.subtotal}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    subtotal:
                      +selectedItem?.price! * +newOrder.quantity! -
                      (+newOrder.discount! || 0),
                  })
                }
                disabled
              />
            </div>
            <button
              type="button"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddOrderClick}
            >
              Add Order
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => setShowAddOrderModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
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

export default OrderModel;
