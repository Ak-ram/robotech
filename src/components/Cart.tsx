"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import { Minus, Plus, X, RefreshCw, CreditCard, PackageOpen, Wind } from "lucide-react";
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
  const [currentMethod, setCurrentMethod] = useState('cashOnDelivery');
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
    //     <>
    //       {productData.length > 0 ? (
    //         <div className="mt-5 flex flex-col max-w-screen-xl mx-auto">
    //           <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    //             <table className="w-full text-sm text-left">
    //               <thead className="text-xs text-white uppercase bg-zinc-950">
    //                 <tr>
    //                   <th scope="col" className="px-6 py-3">
    //                     Product Information
    //                   </th>
    //                   <th scope="col" className="px-6 py-3">
    //                     Unit Price
    //                   </th>
    //                   <th scope="col" className="px-6 py-3">
    //                     Quantity
    //                   </th>
    //                   <th scope="col" className="px-6 py-3">
    //                     SubTotal
    //                   </th>
    //                   <th scope="col" className="px-6 py-3">
    //                     Saving
    //                   </th>
    //                 </tr>
    //               </thead>
    //               {productData?.map((item: ProductType) => (
    //                 <tbody key={item?.id}>
    //                   <tr className="bg-white border-b-[1px] border-b-zinc-300">
    //                     <th
    //                       scope="row"
    //                       className="px-6 py-4 flex items-center gap-3"
    //                       style={{ width: 'max-content' }}
    //                     >
    //                       <X
    //                         onClick={() => {
    //                           dispatch(deleteProduct(item)),
    //                             toast.success(
    //                               `${item?.title} is removed from Wishlist!`
    //                             );
    //                         }}
    //                         className="w-4 h-4 hover:text-red-600 cursor-pointer duration-200"
    //                       />
    //                       <img
    //                         src={item?.image1}
    //                         alt="proudct image"
    //                         width={500}
    //                         height={500}
    //                         className="w-24 object-contain"
    //                       />
    //                       <p className="text-base font-medium text-black whitespace-nowrap">
    //                         {item?.title}
    //                       </p>
    //                     </th>
    //                     <td className="px-6 py-4">
    //                       <FormattedPrice amount={item?.price} />
    //                     </td>
    //                     <td className="px-6 py-4 flex items-center gap-4">
    //                       <span className="border border-zinc-300 p-1 rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
    //                         <Minus
    //                           onClick={() => handleDecreasement(item)
    //                           }
    //                           className="w-4 h-4"
    //                         />
    //                       </span>
    //                       <span className="font-semibold">{item?.quantity}</span>
    //                       {/* <span className="font-semibold">{productQuantity}</span> */}
    //                       <span className="border border-zinc-300 p-1 rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
    //                         <Plus
    //                           onClick={() => {
    //                             dispatch(increaseQuantity(item)),
    //                               toast.success(`${item?.title} quantity added`);
    //                           }}
    //                           className="w-4 h-4"
    //                         />
    //                       </span>
    //                     </td>
    //                     <td className="px-6 py-4">
    //                       <FormattedPrice amount={item?.price * item?.quantity} />
    //                     </td>
    //                     <td className="px-6 py-4">
    //                       <p className="bg-zinc-900 w-20 text-sm font-semibold text-center text-white py-1 rounded-md">
    //                         {calculatePercentage(item?.price, item?.previousPrice)}{" "}
    //                         %save
    //                       </p>
    //                     </td>
    //                   </tr>
    //                 </tbody>
    //               ))}
    //             </table>
    //           </div>
    //           <button
    //             onClick={handleReset}
    //             className="bg-zinc-950 text-zinc-200 w-36 py-3 mt-5 rounded-md uppercase text-xs font-semibold hover:bg-red-700 hover:text-white duration-200"
    //           >
    //             Reset Cart
    //           </button>
    //           <div className="lg:flex items-start justify-between py-10">
    //             <div className=" mx-auto w-full shadow-lg border border-zinc-400 rounded-[.5rem] bg-white max-w-xl p-4 flex flex-col gap-1">
    //               <p className="border-b-[1px] border-b-designColor py-1">
    //                 Cart Summary
    //               </p>
    //               <p className="flex items-center justify-between">
    //                 Total Items <span>{productData.length}</span>
    //               </p>
    //               <p className="flex items-center justify-between">
    //                 Price{" "}
    //                 <span>
    //                   <FormattedPrice amount={rowPrice} />
    //                 </span>
    //               </p>
    //               <p className="flex items-center justify-between">
    //                 Discount{" "}
    //                 <span>
    //                   <FormattedPrice amount={rowPrice - totalAmt} />
    //                 </span>
    //               </p>
    //               <p className="flex items-center justify-between">
    //                 Total Price{" "}
    //                 <span>
    //                   <FormattedPrice
    //                     amount={totalAmt}
    //                     className="font-semibold text-lg"
    //                   />
    //                 </span>
    //               </p>
    //               <div className="flex flex-wrap items-stretch items-center justify-center gap-1">
    //                 <span className="flex-1 mb-2 min-w-[100px]">Pay with:</span>
    //                 <div className='flex flex-wrap gap-1'>
    //                 <button
    //                   onClick={handleCheckout}
    //                   className="flex items-center max-w-[120px] flex-1 sm:flex-0 gap-1 text-xs bg-zinc-800 px-2 md:px-4 text-zinc-200 md:my-2 py-2 uppercase text-center rounded-md font-semibold hover:bg-black hover:text-white duration-200"
    //                 >
    //                   <CreditCard size={16} /> Cards <span className={`${isCheckout ? 'inline-block' : 'hidden'} animate-spin`}><RefreshCw size={15} /></span>
    //                 </button>

    //                 <button
    //                   onClick={() => setIsVodafoneCashOpened(true)}
    //                   className="flex items-center max-w-[120px] flex-1 sm:flex-0 gap-1 text-xs bg-red-600 px-2 md:px-4 text-zinc-200 md:my-2 py-2 uppercase text-center rounded-md font-semibold hover:bg-red-700 hover:text-white duration-200"
    //                 >
    //                   <Image alt="vodafone cash" src={VodafoneIcon} width={16} height={16} /> Wallet
    //                 </button>

    //                 <button
    //                   onClick={() => setIsCashOnDeliveryOpened(true)}
    //                   className="flex items-center flex-1 sm:flex-0 whitespace-nowrap gap-1 text-xs bg-blue-600 px-2 md:px-4 text-zinc-200 md:my-2 py-2 uppercase text-center rounded-md font-semibold hover:bg-blue-700 hover:text-white duration-200"
    //                 >
    //                   <PackageOpen size={16} /> On Delivery
    //                 </button>
    // </div>              </div>

    //               {/* <div>
    // <span></span>
    // <span>Send price to this number: 010122-----</span>
    // <span>Contact us on whatsapp via 010122-----</span>
    // </div> */}

    //             </div>
    //             <div className="">
    //               <VodafoneCash totalAmt={totalAmt} isVodafoneCashOpened={isVodafoneCashOpened} setIsVodafoneCashOpened={setIsVodafoneCashOpened} />
    //               <CashOnDelivery totalAmt={totalAmt} isCashOnDeliveryOpened={isCashOnDeliveryOpened} setCashOnDeliveryOpened={setIsCashOnDeliveryOpened} />
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="py-10 flex flex-col gap-1 items-center justify-center">
    // <Wind size={70}/>
    //           <p className="text-lg font-bold mt-5">Your Cart is Empty</p>
    //           <Link
    //             href={"/"}
    //             className="text-sm uppercase font-semibold underline underline-offset-2 hover:text-designColor duration-200 cursor-pointer"
    //           >
    //             Go back to Shopping
    //           </Link>
    //         </div>
    //       )}
    //       <Toaster
    //         position="bottom-right"
    //         toastOptions={{
    //           style: {
    //             background: "#000",
    //             color: "#fff",
    //           },
    //         }}
    //       />
    //     </>
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">Checkout</a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg></a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {productData?.map((item: ProductType) => (
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.image1} alt="" />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.title}</span>
                  <span className="float-right text-gray-400"><FormattedPrice amount={item.previousPrice} /></span>
                  <p className="text-lg font-bold"><FormattedPrice amount={item.price} /></p>
                </div>
              </div>

            ))}
          </div>
          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative" onClick={() => setCurrentMethod('')} >
              <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="items-center peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                <CreditCard className="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cards</span>
                  <p className="text-slate-500 text-sm leading-6">Debit & Credit Cards</p>
                </div>
              </label>
            </div>
            <div className="relative" onClick={() => setCurrentMethod('vodafoneCash')} >
              <input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
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
              <input className="peer hidden" id="radio_3" type="radio" name="radio" checked />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="items-center peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_3">
                <PackageOpen />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cash On Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">Pay after receiving your order</p>
                </div>
              </label>
            </div>
          </form>
        </div>
        {currentMethod === 'vodafoneCash' ?
          <VodafoneCash totalAmt={totalAmt} isVodafoneCashOpened={isVodafoneCashOpened} setIsVodafoneCashOpened={setIsVodafoneCashOpened} />
          : currentMethod === 'cashOnDelivery' ?
            <CashOnDelivery rowPrice={rowPrice} totalAmt={totalAmt} isCashOnDeliveryOpened={isCashOnDeliveryOpened} setCashOnDeliveryOpened={setIsCashOnDeliveryOpened} />
            : null}
        {/* */}
      </div>

    </>
  );
};

export default Cart;
