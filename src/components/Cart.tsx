"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import { Minus, Plus, X, RefreshCw } from "lucide-react";
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
import EmptyCard from "@/assets/empty.jpeg"
import VodafoneCash from "./VodafoneCash";
import { json } from "stream/consumers";
const Cart = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const [rowPrice, setRowPrice] = useState(0);
  const { productData } = useSelector((state: StateProps) => state.pro);
  const [isVodafoneCashOpened, setIsVodafoneCashOpened] = useState(false);
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
      amt += item.price * item.quantity;
      return;
    });
    productData.map((item: ProductType) => {
      rowAmt += item?.previousPrice * item?.quantity;
    });
    setTotalAmt(amt);
    setRowPrice(rowAmt);
    console.log(productData)
  }, [productData]);

  let thirdStep = async (token, id) => {
    let data = {
      "auth_token": token,
      "amount_cents": "100",
      "expiration": 3600,
      "order_id": id,
      "billing_data": {
        "apartment": "803",
        "email": "claudette09@exa.com",
        "floor": "42",
        "first_name": "Clifford",
        "street": "Ethan Land",
        "building": "8028",
        "phone_number": "+86(8)9135210487",
        "shipping_method": "PKG",
        "postal_code": "01898",
        "city": "Jaskolskiburgh",
        "country": "CR",
        "last_name": "Nicolas",
        "state": "Utah"
      },
      "currency": "EGP",
      "integration_id": 4423017
    }
    let request = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    let response = await request?.json();
    let _token = response.token;
    cardPayment(_token)
  }

  let secondStep = async (token) => {
    let items = productData.map((item) => ({
      name: item.title,
      amount_cents: item.price * 100, // Convert to cents
      description: item.description,
      // quantity: item.quantity,
    }));
    let data = {
      "auth_token": token,
      "delivery_needed": "false",
      "amount_cents": totalAmt,
      "currency": "EGP",
      "items": items
    };
    let request = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    let response = await request?.json();
    let id = response.id;
    thirdStep(token, id)
  }

  const cardPayment = async (_token) => {
    let iframeURL = `https://accept.paymob.com/api/acceptance/iframes/811079?payment_token=${_token}`;
    location.href = iframeURL
  }

  const handleCheckout = async () => {
    setIsCheckout(true)
    let data = {
      "api_key": process.env.NEXT_PUBLIC_PAYMOB_API
    }
    let request = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    let response = await request.json();
    let token = response.token;
    secondStep(token)
  };
  // console.log('cart', productData)
  const handleDecreasement = (item: ProductType) => {
    if (item?.quantity > 1) {
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
        <div className="mt-5 flex flex-col max-w-screen-xl mx-auto">
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
                      style={{ width: 'max-content' }}
                    >
                      <X
                        onClick={() => {
                          dispatch(deleteProduct(item)),
                            toast.success(
                              `${item?.title} is removed from Wishlist!`
                            );
                        }}
                        className="w-4 h-4 hover:text-red-600 cursor-pointer duration-200"
                      />
                      <img
                        src={item?.image1}
                        alt="proudct image"
                        width={500}
                        height={500}
                        className="w-24 object-contain"
                      />
                      <p className="text-base font-medium text-black whitespace-nowrap">
                        {item?.title}
                      </p>
                    </th>
                    <td className="px-6 py-4">
                      <FormattedPrice amount={item?.price} />
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                      <span className="border border-zinc-300 p-1 rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
                        <Minus
                          onClick={() => handleDecreasement(item)
                          }
                          className="w-4 h-4"
                        />
                      </span>
                      <span className="font-semibold">{item?.quantity}</span>
                      {/* <span className="font-semibold">{productQuantity}</span> */}
                      <span className="border border-zinc-300 p-1 rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
                        <Plus
                          onClick={() => {
                            dispatch(increaseQuantity(item)),
                              toast.success(`${item?.title} quantity added`);
                          }}
                          className="w-4 h-4"
                        />
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <FormattedPrice amount={item?.price * item?.quantity} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="bg-zinc-900 w-20 text-sm font-semibold text-center text-white py-1 rounded-md">
                        {calculatePercentage(item?.price, item?.previousPrice)}{" "}
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
          <div className="lg:flex items-start justify-between py-10">
            <div className="w-full shadow-lg border border-zinc-400 rounded-[.5rem] bg-white max-w-xl p-4 flex flex-col gap-1">
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
              <div className="flex items-center justify-center gap-1">
                <span className="flex-1">Pay with:</span>
                <button
                  onClick={handleCheckout}
                  className="text-xs bg-zinc-800 px-4 text-zinc-200 my-2 py-2 uppercase text-center rounded-md font-semibold hover:bg-black hover:text-white duration-200"
                >
                  Cards <span className={`${isCheckout ? 'inline-block' : 'hidden'} animate-spin`}><RefreshCw size={16} /></span>
                </button>

                <button
                  onClick={() => setIsVodafoneCashOpened(true)}
                  className="text-xs bg-red-600 px-4 text-zinc-200 my-2 py-2 uppercase text-center rounded-md font-semibold hover:bg-red-700 hover:text-white duration-200"
                >
                  Vodafone Cash
                </button>
              </div>

              {/* <div>
<span></span>
<span>Send price to this number: 010122-----</span>
<span>Contact us on whatsapp via 010122-----</span>
</div> */}

            </div>
            <div className="">
              <VodafoneCash isVodafoneCashOpened={isVodafoneCashOpened} setIsVodafoneCashOpened={setIsVodafoneCashOpened} />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-10 flex flex-col gap-1 items-center justify-center">
          <Image className="" src={EmptyCard} alt="ShortLogo" width={200} height={200} />

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
