"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import { Minus, Plus, X, RefreshCw, CreditCard, PackageOpen, Wind, ArrowUp, ChevronUp, ChevronDown } from "lucide-react";
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
import EmptyCard from "@/assets/empty.png"
import VodafoneCash from "./VodafoneCash";
import VodafoneIcon from '@/assets/vodafoneIcon.png';
import { json } from "stream/consumers";
import CashOnDelivery from "./CashOnDeliver";
const Cart = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const [rowPrice, setRowPrice] = useState(0);
  const { productData } = useSelector((state: StateProps) => state.pro);
  const [isVodafoneCashOpened, setIsVodafoneCashOpened] = useState(false);
  const [isCashOnDeliveryOpened, setIsCashOnDeliveryOpened] = useState(false);
  const [currentMethod, setCurrentMethod] = useState('vodafoneCash');
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
      "amount_cents": totalAmt * 100,
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
    setCurrentMethod("")
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
      <div className="-mt-10 flex px-3 flex-col items-center border-b bg-white py-4 sm:flex-row">
        <a href="#" className="text-2xl font-bold text-gray-800">Checkout</a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative ">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"                 ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                </span>
                <Link href={'./'}>

                  <span className="font-semibold text-gray-900">Shop</span>
                </Link>
              </li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                  2
                </span>
                <Link href={'./cart'} >

                  <span className="font-semibold text-gray-900">Payment</span>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable payment method.</p>
          <div className="h-[300px] overflow-y-auto mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {productData?.map((item: ProductType, i) => (
              <div className={`flex flex-col items-center ${(i + 1) === productData.length ? "" : "border-b"} rounded-lg bg-white sm:flex-row`}>

                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.image1} alt="" />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.title}</span>
                  <div className="flex items-center gap-1">
                    {
                      item.price !== item.previousPrice ? <del className="text-xs float-right text-gray-400"><FormattedPrice amount={item.previousPrice} /></del>
                        : null
                    }
                    <p className="text-lg font-bold"><FormattedPrice amount={item.price} /></p>
                  </div>
                  {
                    item.price !== item.previousPrice ? <span className="font-bold text-sm">Save: {calculatePercentage(item?.price, item?.previousPrice)}%</span>

                      : null
                  }
                </div>
                <div className="flex flex-col items-center mx-2">
                  <span className=" rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
                    <ChevronUp
                      onClick={() => {
                        dispatch(increaseQuantity(item)),
                          toast.success(`${item?.title} quantity added`);
                      }}
                      className="w-4 h-4"
                    />
                  </span>
                  <span className="text-sm font-semibold">{item?.quantity}</span>
                  {/* <span className="font-semibold">{productQuantity}</span> */}
                  <span className=" rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
                    <ChevronDown
                      onClick={() => handleDecreasement(item)
                      }
                      className="w-4 h-4"
                    />
                  </span>
                </div>
                <X
                  onClick={() => {
                    dispatch(deleteProduct(item)),
                      toast.success(
                        `${item?.title} is removed from Wishlist!`
                      );
                  }}
                  className="w-8 h-8 hover:text-red-600 cursor-pointer duration-200"
                />
              </div>

            ))}

          </div>
          <div className="flex items-center justify-between my-4">
            <span className="text-gray-400">Total items: {productData.length}</span>
            <button
              onClick={handleReset}
              className="bg-zinc-950 text-zinc-200 w-24 py-2 rounded-md uppercase text-xs font-semibold hover:bg-red-700 hover:text-white duration-200"
            >
              Reset Cart
            </button>
          </div>

          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">

            <div className="relative" onClick={() => setCurrentMethod('vodafoneCash')} >
              <input className="peer hidden" id="radio_2" type="radio" name="radio" />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="items-center peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                <Image className="h-[25px] w-[25px]" alt="vodafone cash" src={VodafoneIcon} width={25} height={25} />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Vodafone Cash</span>
                  <p className="text-slate-500 text-sm leading-6">Pay after receiving your order</p>
                </div>
              </label>
            </div>
            <div className="relative" onClick={() => setCurrentMethod('cashOnDelivery')} >
              <input className="peer hidden" id="radio_3" type="radio" name="radio" />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="items-center peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_3">
                <PackageOpen />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cash On Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">Pay after receiving your order</p>
                </div>
              </label>
            </div>
            <div className="relative"
              onClick={() => setCurrentMethod("cards")}
            // onClick={handleCheckout}  
            >
              <input className="peer hidden" id="radio_1" type="radio" name="radio" />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="items-center peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                <CreditCard className="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cards</span>
                  <p className="text-slate-500 text-sm leading-6">Debit & Credit Cards</p>
                </div>
              </label>
            </div>
          </form>
        </div>
        {currentMethod === 'vodafoneCash' ?
          <VodafoneCash totalAmt={totalAmt} isVodafoneCashOpened={isVodafoneCashOpened} setIsVodafoneCashOpened={setIsVodafoneCashOpened} />
          : currentMethod === 'cashOnDelivery' ?
            <CashOnDelivery rowPrice={rowPrice} totalAmt={totalAmt} isCashOnDeliveryOpened={isCashOnDeliveryOpened} setCashOnDeliveryOpened={setIsCashOnDeliveryOpened} />
            : <div
              className="flex gap-2 bg-white items-center justify-center flex-col pt-8 mt-8 bg-gray-50 lg:mt-0"

            >
              <span className={`animate-spin`}><RefreshCw size={25} /></span>
              <p>Wait, You will be redirected to payment page</p>
            </div>}
        {/* */}
      </div>

    </>
  );
};

export default Cart;
