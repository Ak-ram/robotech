"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import { Minus, Plus, X , RefreshCw } from "lucide-react";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
  resetCart,
} from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { calculatePercentage } from "@/helpers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
// import { useSession } from "next-auth/react";
// import AddToCartImg from "@/assets/shop/add_to_cart.png"
const Cart = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const [rowPrice, setRowPrice] = useState(0);
  const { productData } = useSelector((state: StateProps) => state.pro);
  const dispatch = useDispatch();
  const router = useRouter();
  // const { data: session } = useSession();

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your Cart?"
    );
    if (confirmReset) {
      dispatch(resetCart());
      toast.success("Cart Reset Successfully");
      router.push("/");
    }
  };

  // Price value
  useEffect(() => {
    let amt = 0;
    let rowAmt = 0;
    productData.map((item: ProductType) => {
      amt += item.attributes.price * item.attributes.quantity;
      return;
    });
    productData.map((item: ProductType) => {
      rowAmt += item?.attributes.previousPrice * item?.attributes.quantity;
    });
    setTotalAmt(amt);
    setRowPrice(rowAmt);
  }, [productData]);

  //   Stripe Payment
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const handleCheckout = async () => {
    setIsCheckout(true)
    const stripe = await stripePromise;
    // let url = 'https://robotech.vercel.app/api/checkout';
    let url = 'http://localhost:3000/api/checkout';
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: productData,
        // email: session?.user?.email,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      // await dispatch(saveOrder({ order: productData, id: data.id }));
      stripe?.redirectToCheckout({ sessionId: data.id });
      setIsCheckout(false)
      dispatch(resetCart());
    } else {
      throw new Error("Failed to create Stripe Payment");
    }
  };
  // console.log('cart', productData)
  const handleDecreasement = (item: ProductType) => {
    if (item?.attributes?.quantity > 1) {
      dispatch(decreaseQuantity(item)) &&
        toast.success(
          "Quantity decreased Successfully!"
        )

    } else {
      toast.error("Can not delete less than 1")
    }


  }
  return (
    <>
      {productData.length > 0 ? (
        <div className="mt-5 flex flex-col">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-zinc-950">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SubTotal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Saving
                  </th>
                </tr>
              </thead>
              {productData?.map((item: ProductType) => (
                <tbody key={item?.id}>
                  <tr className="bg-white border-b-[1px] border-b-zinc-300">
                    <th
                      scope="row"
                      className="px-6 py-4 flex items-center gap-3"
                      style={{width: 'max-content'}}
                    >
                      <X 
                        onClick={() => {
                          dispatch(deleteProduct(item)),
                            toast.success(
                              `${item?.attributes?.title} is removed from Wishlist!`
                            );
                        }}
                        className="w-4 h-4 hover:text-red-600 cursor-pointer duration-200"
                      />
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.image?.data?.attributes?.url || ""}`}
                        alt="proudct image"
                        width={500}
                        height={500}
                        className="w-24 object-contain"
                      />
                      <p className="text-base font-medium text-black whitespace-nowrap">
                        {item?.attributes?.title}
                      </p>
                    </th>
                    <td className="px-6 py-4">
                      <FormattedPrice amount={item?.attributes?.price} />
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                      <span className="border border-zinc-300 p-1 rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
                        <Minus
                          onClick={() => handleDecreasement(item)
                          }
                          className="w-4 h-4"
                        />
                      </span>
                      <span className="font-semibold">{item?.attributes?.quantity}</span>
                      {/* <span className="font-semibold">{productQuantity}</span> */}
                      <span className="border border-zinc-300 p-1 rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
                        <Plus
                          onClick={() => {
                            dispatch(increaseQuantity(item)),
                              toast.success(`${item?.attributes?.title} quantity added`);
                          }}
                          className="w-4 h-4"
                        />
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <FormattedPrice amount={item?.attributes?.price * item?.attributes?.quantity} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="bg-zinc-900 w-20 text-sm font-semibold text-center text-white py-1 rounded-md">
                        {calculatePercentage(item?.attributes?.price, item?.attributes?.previousPrice)}{" "}
                        %save
                      </p>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <button
            onClick={handleReset}
            className="bg-zinc-950 text-zinc-200 w-36 py-3 mt-5 rounded-md uppercase text-xs font-semibold hover:bg-red-700 hover:text-white duration-200"
          >
            Reset Cart
          </button>
          <div className="m-auto w-full shadow-lg border border-zinc-400 rounded-[.5rem] mt-4 bg-white max-w-xl p-4 flex flex-col gap-1">
            <p className="border-b-[1px] border-b-designColor py-1">
              Cart Summary
            </p>
            <p className="flex items-center justify-between">
              Total Items <span>{productData.length}</span>
            </p>
            <p className="flex items-center justify-between">
              Price{" "}
              <span>
                <FormattedPrice amount={rowPrice} />
              </span>
            </p>
            <p className="flex items-center justify-between">
              Discount{" "}
              <span>
                <FormattedPrice amount={rowPrice - totalAmt} />
              </span>
            </p>
            <p className="flex items-center justify-between">
              Total Price{" "}
              <span>
                <FormattedPrice
                  amount={totalAmt}
                  className="font-semibold text-lg"
                />
              </span>
            </p>

            <button
              onClick={handleCheckout}
              className="bg-zinc-800 text-zinc-200 my-2 py-2 uppercase text-center rounded-md font-semibold hover:bg-black hover:text-white duration-200"
            >
              Proceed to Checkout <span className={`${isCheckout ? 'inline-block' : 'hidden'} animate-spin`}><RefreshCw size={16} /></span>
            </button>




          </div>
        </div>
      ) : (
        <div className="py-10 flex flex-col gap-1 items-center justify-center">
          {/* <img src={AddToCartImg} style={{width: '200px'}}/> */}
          <p className="text-lg font-bold">Your Cart is Empty</p>
          <Link
            href={"/"}
            className="text-sm uppercase font-semibold underline underline-offset-2 hover:text-designColor duration-200 cursor-pointer"
          >
            Go back to Shopping
          </Link>
        </div>
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

export default Cart;
