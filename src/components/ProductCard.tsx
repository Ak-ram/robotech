import { calculatePercentage } from "@/helpers";
import Link from "next/link";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import { AlertCircle, Ban, Heart, ShoppingBasketIcon } from "lucide-react";
import { StateProps } from "../../type";

const ProductCard = ({item, prefix}) => {
    const dispatch = useDispatch();
    const { favoriteData, compareData } = useSelector((state: StateProps) => state.pro);

    const isFavorite = (productId: any) => {
        return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
    };
    return (
        <div
            title={item?.title}
            key={`${item.id}_${item.title}`}
            className="p-0  flex rounded-md xs:block w-full mx-auto relative bg-white group border-[1px] border-slate-300 hover:border-designColor/60 duration-300 hover:shadow-xl overflow-hidden xs:rounded-md"
        >

            <Link
                href={{
                    pathname: `/id_${item?.id}`,
                    query: {
                        id: item?.id,
                        prefix: (prefix === "print" ? prefix : item?.category),
                    },
                }}
                className="min-w-[130px] relative my-auto flex mx-auto h-28 xs:h-48 lg:h-68 overflow-hidden"
            >

                <img
                    className="peer group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 transition-timing-function ease-in-out shadow-lg absolute top-0 right-0 h-full w-full" // object-contain
                    src={item.image1}
                    alt="product image"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://makeplaceholder.com?text=Broken+Url&size=500x400&tcolor=333333"; // Set placeholder image on error
                      }}
                />


                {item.image2 ? (
                    <img
                        className="peer  bg-white sm:absolute  top-0 -right-96 h-full w-full   transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                        src={item.image2}
                        alt="product image"
                    />
                ) : null}


            </Link>
            {
                item.price < item.previousPrice && calculatePercentage(item?.price, item?.previousPrice) ?
                    <span className="absolute text-xs xs:text-base py-1 top-[10px] m-2 rounded bg-black px-2 text-center  md: font-medium text-white">
                        {calculatePercentage(item?.price, item?.previousPrice)}% OFF
                    </span>
                    : null}

            <div className="group border-l border-slate-200 xs:border-0 w-[60%] flex justify-center w-full items-start flex-col">
                {/* <div className="absolute top-4 right-2 flex items-center space-x-2">

               <ShoppingCart
                 onClick={() => {
                   dispatch(addToCart(item));
                   toast.success(`${item?.title} is added to Cart!`);
                 }}
                 className="text-zinc-500  cursor-pointer duration-200 hover:text-black"
               />
             </div> */}
                {/* <div className="py-3 px-10 backdrop-blur-2xl bg-opacity-20 bottom-0 left-0 translate-y-full transition-all group-hover:translate-y-0 w-full absolute"> */}
                <div className="py-3  transition-all px-3 xs:px-5 backdrop-blur-2xl bg-opacity-20 bottom-0 left-0 xs:border-t border-slate-300 rounded transition-all w-full ">
                    <p
                        className="pr-2 max-h-[60px] text-zinc-500 xs:text-black text-xl xs:whitespace-nowrap text-ellipsis overflow-hidden duration-300 font-semibold xs:font-bold">
                        {item?.title}
                    </p>
                    <p className="flex mt-1 items-center justify-start w-full text-black font-semibold">
                        {typeof +item?.previousPrice === 'number' && +item?.previousPrice > +item?.price ? <del><FormattedPrice className={'mr-2 text-base  text-zinc-500'} amount={+item?.previousPrice} /></del>
                            : null}
                        <FormattedPrice className={'text-xl'} amount={item?.price} />
                        {prefix === 'print' ? <span className="text-lg">/{item?.unit?.toLowerCase()} </span> : null}
                    </p>
                    <div className="flex  w-full items-center justify-end gap-1 xs:justify-between mt-2">



                        {item?.count > 0 || prefix === 'print' ? (

                            <span onClick={() => {
                                dispatch(addToCart(item));
                                // toast.success(`${item?.title} is added to Cart!`);
                            }} className=" flex cursor-pointer gap-2 font-semibold items-center text-gray-600 xs:bg-designColor/30 xs:px-2 xs:py-1 rounded">
                                {/* <span className="text-sm xs:text-base xs:hidden">Buy</span> */}
                                <span className="hidden whitespace-nowrap xs:inline text-sm xs:text-base inline">Order Now</span>
                                <ShoppingBasketIcon

                                    className=" ustify-center rounded flex items-center gap-1 font-semibold text-designColor rounded  duration-300 bg-white text-blue-500 px-[3px] p-[1px] w-8 h-8 xs:w-7 xs:h-7 duration-200 "
                                />
                            </span>




                        ) : (
                            <>
                                <span className="text-xs xs:text-base flex cursor-not-allowed gap-2 font-semibold items-center text-red-400 bg-red-100 px-2 py-1 rounded">
                                    <span className="text-sm xs:text-base inline">Out of stock</span>
                                    <Ban
                                        className=" ustify-center rounded flex items-center gap-1 font-semibold text-rose-400 bg-white rounded-sm  duration-300 text-zinc-500 px-[3px] p-[1px] w-7 h-7 duration-200 "
                                    />
                                </span>
                            </>
                        )}

                        <div className="flex gap-1">

                            {prefix !== 'print' ? <Heart
                                fill={isFavorite(item.id) ? "red" : "#222"}
                                onClick={() => {
                                    dispatch(addToFavorite(item));
                                    // if (isFavorite(item?.id)) {
                                    //   toast.error(`${item?.title} removed from favorites!`);
                                    // } else {
                                    //   toast.success(`${item?.title} added to favorites!`);
                                    // }
                                }}
                                className="text-zinc-500 block  cursor-pointer duration-200 hover:text-black"
                            /> : null
                            }


                            {
                                item?.count < 3 && item?.count > 0 &&
                                <span title="Hurry to buy! Limited stock!🏃‍♂️">
                                    <AlertCircle size={23} className="text-rose-600  mr-2" />
                                </span>

                            }
                            {/* <span onClick={() => {
             dispatch(addToCompare(item));
             // if (isFavorite(item?.id)) {
             //   toast.error(`${item?.title} removed from favorites!`);
             // } else {
             //   toast.success(`${item?.title} added to favorites!`);
             // }
           }} title="Add to compare page" className="cursor-pointer">
             <GitCompareArrows
               size={23} className={`${isCompare(item.id) ? "text-blue-500" : "text-slate-400"} w-5 xs:w-fit mr-2`} />
           </span> */}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductCard