"use client";
import { useState } from 'react'
import Link from "next/link";
import { CourseType, ProductType, StateProps } from "../../type";
import Image from "next/image";
import { Heart, ShoppingBasket, ShoppingCart, User } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";

interface Item {
    products: CourseType[];
    prefix: string
    categoryName: string
}

const CourseCard = ({ products, prefix, categoryName }: Item) => {
    const { favoriteData } = useSelector((state: StateProps) => state.pro);
    const isFavorite = (productId: any) => {
        return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
    };
    const dispatch = useDispatch();
    return (
        // <div className="flex-1">
        //     <div className="mx-auto">
        //         <div className="group gap-3 gap-x-0 mt-10 grid grid-cols-1 overflow-hidden text-gray-700 transition sm:grid-cols-5">

        //             {products?.map((item) => (
        //                 <>
        //                     <Link href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: categoryName } }}
        //                         className="border shadow hover:shadow-sm col-span-2 text-left text-gray-600 hover:text-gray-700">
        //                         <div className="group flex relative h-full w-full overflow-hidden">
        //                             <img src={item?.poster} alt="" className="w-full border-none object-contain text-gray-700 transition group-hover:scale-115" />
        //                             <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">{item?.category}</span>
        //                         </div>
        //                     </Link>
        //                     <div className="pl-5 bg-white rounded-tr-lg rounded-br-lg border-b col-span-3 flex flex-col space-y-3 pr-8 text-left">
        //                         <Link href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: categoryName } }}
        //                             className="hover:underline mt-3 overflow-hidden text-2xl font-semibold">{item?.title} </Link>
        //                         <p className="overflow-hidden text-sm">{item?.description}</p>
        //                         <span className="text-sm font-semibold text-gray-500 hover:text-gray-700">{item?.instructor}</span>
        //                         <div className="text-gray-700">
        //                             <div className="flex flex-wrap h-fit gap-2 text-sm font-medium">
        //                                 <div className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">level: {item?.level}</div>
        //                                 <div className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700">{item?.duration} weeks</div>
        //                                 <div className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-700">{item?.studentsEnrolled} students</div>
        //                                 <div className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700"><FormattedPrice amount={item.price} /></div>
        //                             </div>
        //                             <button disabled={item.enrollmentOpen ? false : true} className={`${item.enrollmentOpen ? "bg-orange-600 text-white" : "bg-red-200 text-red-500 font-bold"} my-5 rounded-md px-5 py-2 text-sm text-center transition sm:ml-auto`}>
        //                                 {!item.enrollmentOpen ? 'Enrolment closed' : 'Enroll Now'}
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </>
        //             ))}
        //         </div>
        //     </div>
        //     <Toaster
        //         position="bottom-right"
        //         toastOptions={{
        //             style: {
        //                 background: '#000',
        //                 color: '#fff',
        //             },
        //         }}
        //     />
        // </div>
        <section className="bg-white py-4 font-sans">
            <div className=" max-w-6xl m-auto  flex flex-wrap items-start justify-start">
                {products?.map((item) => (
                    <>
                        <div key={item?.id} className="w-full border sm:w-1/2  flex flex-col mb-8 px-3">
                            <div className="overflow-hidden flex bg-white rounded-lg shadow hover:shadow-raised hover:translateY-2px transition">
                                <Link className='block min-w-[150px]' href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: categoryName } }}>


                                    <img className="w-full" src={item.poster} alt={item.title} />
                                </Link>
                                <div className="p-3 flex flex-1 flex-col justify-between ">
                                    <h5 className='text-zinc-700 text-xs w-fit bg-gray-100 px-2 py-0.5 rounded font-semibold'>{item.category}</h5>
                                    <Link className='flex justify-between ' href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: categoryName } }}>

                                        <h3 className="font-bold px-2 text-gray-900 mb-2 leading-normal">{item.title}
                                        </h3>
                                        <span className='text-zinc-700 text-bold text-sm flex items-center gap-1'><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg> {item.studentsEnrolled} Student</span>

                                    </Link>
                                    <span className='font-semibold'>Price: <FormattedPrice amount={item.price} /></span>
                                    <span className='font-semibold'>Level: <span className={`${item?.level.toLowerCase() === 'beginner' ? 'text-green-700' : item.level.toLowerCase() === 'intermediate' ? 'text-yellow-700' : item.level.toLowerCase() === 'advanced' ? "text-red-700" : ""}`}>{item.level.toLowerCase()}</span></span>
                                    <span className='font-semibold text-zinc-700'>Duration: {item.duration} weeks</span>

                                    <div className='flex w-full items-center  justify-between  mt-4'>
                                        {item.enrollmentOpen === 'open' && item.enrollmentLink ? <Link className='bg-orange-200 text-orange-600 font-bold rounded-md px-3 py-1.5 text-sm text-center transition' href={item.enrollmentLink!} >Enroll Now</Link> :
                                            <button disabled={true} className={`bg-red-200 text-red-500 font-bold my-2 rounded-md px-3 py-1.5 text-xs text-center transition`}>
                                                Enrolment Closed
                                            </button>
                                        }
                                        <div className='text-zinc-700 flex flex-col semibold'>
                                            <span className='flex items-center gap-1'><User size={15}/> {item.instructor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </section >
    );
};

export default CourseCard;
