import { Edit, Plus, Search, Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import supabase from "@/supabase/config";
import EditProductsModel from "./EditProductsModel";
import { handleRemoveItem } from "@/helpers/deleteJSONItem";
import Product from "./Product";
import CustomSelect from "./CustomSelectbox";

const AdminComponent = () => {
  const [categoryProducts, setCategoryProducts] = useState<any>([]);
  const [selectedCat, setSelectedCat] = useState("sensors");
  const [categoryList, setcategoryList] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [ItemToEditId, setItemToEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const getTablesList = async () => {
      const { data } = await supabase.from("schema_table").select("*");
      const tableNames = data!.map((item) => item.table_name);
      setcategoryList(tableNames);
    };
    getTablesList();
  }, []);

  useEffect(() => {
    const getList = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category", selectedCat);
      setCategoryProducts(data!);
    };
    getList();
  }, [selectedCat]);

  const handleAddCategory = async () => {
    // Check if the new category name already exists in the table
    const { data: existingCategory, error } = await supabase
      .from("schema_table")
      .select("*")
      .eq("table_name", newCategoryName.toLowerCase());

    if (error) {
      toast.error(`Error checking existing category`);
      return;
    }

    // If the category does not exist, insert it
    if (!existingCategory || existingCategory.length === 0) {
      const { data, error: insertError } = await supabase
        .from("schema_table")
        .insert([{ table_name: newCategoryName.toLowerCase() }]);

      if (insertError) {
        toast.error(`Error adding category`);
        return;
      }

      toast.success(`Category added successfully: ${data}`);
      setcategoryList((prevList) => [
        ...prevList,
        newCategoryName.toLowerCase(),
      ]);
    } else {
      toast.error(`Category already exists`);
    }
    setSelectedCat(newCategoryName);
    setNewCategoryName("");
  };
  const handleAddCategoryProducts = async (id = null) => {
    setIsOpen(true);
    if (id) {
      setItemToEditId(id);
    }
  };

  const handleRemoveItem = async (id) => {
    const confirm = window.confirm("Sure to delete");
    if (confirm) {
      try {
        await supabase.from("products").delete().eq("id", id);

        let newList = categoryProducts.filter((item) => item.id !== id);
        setCategoryProducts(newList);

        toast.success("Item Deleted Successfully");
      } catch (error) {
        toast.error("Error Deleting Item. Please try again later.");
      }
    }
  };
  const handleDeleteCategory = async () => {
    const confirm = window.confirm("Sure to delete this category ?");
    if (confirm) {
      await supabase
        .from("schema_table")
        .delete()
        .eq("table_name", selectedCat)
        .single();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", selectedCat);
      data!.map(async (item) => {
        await supabase.from("products").delete().eq("id", item.id);
      });
      // Remove the deleted category from the category list
      setcategoryList((prevList) =>
        prevList.filter((cat) => cat !== selectedCat)
      );

      // Update the selected category to the first category in the list
      if (categoryList.length > 0) {
        setSelectedCat(categoryList[0]);
      } else {
        setSelectedCat("");
      }

      // Clear the category products
      setCategoryProducts([]);

      toast.success("Category deleted successfully");
    }
  };
  // const handleDeleteCategory = async () => {
  //   const confirm = window.confirm("Sure to delete this category ?");
  //   if (confirm) {
  //     await supabase
  //       .from("schema_table")
  //       .delete()
  //       .eq("table_name", selectedCat)
  //       .single();
  //     const { data, error } = await supabase
  //       .from("products")
  //       .select("*")
  //       .eq("category", selectedCat);
  //     const extractIds = data!.map(async(item) => {
  //       await supabase.from("products").delete().eq('id',item.id);
  //     });

  //     console.log(extractIds);
  //   }
  // };
  return (
    <>
      <div className="lg:p-3  min-h-[400px] z-10 bottom-0 left-0 overflow-hidden mt-5">
        {/* <Stats /> */}
        <div className="">
          <div className="mt-5">
            <span className="my-3 block flex items-center justify-end text-end text-sm">
              <div className="flex-1 flex items-center gap-2">
                <CustomSelect
                  {...{
                    categoryProducts,
                    categoryList,
                    selectedCat,
                    setSelectedCat,
                  }}
                />
                <button
                  onClick={handleDeleteCategory}
                  className="text-xs rounded-md absolute top-5 right-4 ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Category
                </button>

                <div>
                  <span
                    className={`flex ${show ? "hidden" : "block"} items-center`}
                  >
                    category not exist ?{" "}
                    <span
                      onClick={() => setShow(true)}
                      className="cursor-pointer text-blue-400 mx-1"
                    >
                      add it
                    </span>
                  </span>
                  <div className={show ? "block" : "hidden"}>
                    <input
                      type="text"
                      placeholder="New Category"
                      className="p-2 h-9 border mr-3 border-gray-300 rounded"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button
                      onClick={handleAddCategory}
                      className="bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold py-2 px-4 rounded"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShow(false)}
                      className="ml-2 text-sm border border-red-400 text-red-500 font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              count: {categoryProducts?.length} Product(s)
              <span
                onClick={() => handleAddCategoryProducts()}
                className="cursor-pointer inline-flex items-center justify-end w-fit mr-2 ml-3 py-2 px-3 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                <Plus className="inline-block w-5 h-5 mr-1" size={20} />
                New
              </span>
            </span>
            <div className="flex w-full  flex-col gap-3 border-2 rounded border-zinc-400">
              <div className="flex items-center text-white bg-zinc-900 px-5 py-3 rounded ">
                <div className="  rounded-sm">Image</div>
                <div className="ml-4 flex-1 flex items-center gap-2">
                  <p className="text-sm">Product Name</p>
                  <span className="relative">
                    <Search className="w-5 h-5 text-gray-500 absolute top-2 right-3" />
                    <input
                      type="text"
                      placeholder="Search by Name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-2 pr-10 py-1 border border-slate-300 rounded bg-white text-black text-sm focus:outline-none focus:border-blue-500"
                    />
                  </span>
                </div>
                <div className="text-xs sm:text-sm">Price</div>
                <div className="text-xs sm:text-sm ml-8">Actions</div>
              </div>
              <div className="max-h-[500px] p-3 overflow-auto ">
                {categoryProducts &&
                  categoryProducts
                    .filter((product) =>
                      product.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((product: any, itemIndex: number) => (
                      <div
                        key={product.id}
                        // href={`/product/${product.id}`}
                        className={`${cn(
                          +product.count === 0
                            ? "bg-red-200 animate-pulse"
                            : "bg-gray-200 hover:bg-white",
                          "text-xs font-medium"
                        )} flex group items-start hover:no-underline my-2 p-2 rounded `}
                      >
                        <div className="w-10 h-10 min-w-[2.5rem]  rounded-sm">
                          <img
                            className="w-full h-full object-cover rounded-sm"
                            src={product.image1}
                            alt={product.image1}
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm text-gray-800 font-bold">
                            {product.title}
                          </p>
                          <span
                            className={cn(
                              +product.count === 0
                                ? "text-red-500"
                                : +product.count > 10
                                ? "text-green-500"
                                : "text-orange-500",
                              "text-xs font-medium"
                            )}
                          >
                            {product.count === 0
                              ? "Out of Stock"
                              : product.count + " in Stock"}
                          </span>
                          <span className="opacity-0 transition text-sm font-semibold group-hover:opacity-100 ml-2 italic">
                            #{product?.id}
                          </span>
                        </div>
                        <div className="font-bold text-xs sm:text-sm text-zinc-700 pl-1.5">
                          <FormattedPrice amount={product.price} />
                        </div>
                        <div className="ml-8">
                          <button
                            className="mr-1"
                            onClick={() =>
                              handleAddCategoryProducts(product.id)
                            }
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="mr-1"
                            onClick={() => handleRemoveItem(product.id)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <EditProductsModel
          setCategoryProducts={setCategoryProducts}
          categoryProducts={categoryProducts}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCat={selectedCat}
          itemToEditId={ItemToEditId}
          setItemToEditId={setItemToEditId}
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

export default AdminComponent;
