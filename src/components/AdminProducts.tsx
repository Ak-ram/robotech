const AdminProducts = () => {
    return (
        <div className={`min-w-[300px] lg:w-[300px] lg:p-3 border w-full z-10 fixed bottom-0 left-0 lg:relative overflow-hidden bg-white mt-5 shadow-lg border-zinc-400 lg:rounded-md`}>
            <h3 className="font-bold text-lg mt-3 hidden lg:inline-block ">List Of Products</h3>
            <div className="h-[1px] w-full bg-gray-400 mt-2 hidden lg:inline-block"></div>
            <ul className="text-zinc-600 flex lg:block overflow-x-auto">
            </ul>
        </div>
    );
};

export default AdminProducts;