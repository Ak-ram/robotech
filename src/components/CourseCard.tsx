"use client";
import { useState } from "react";
import Link from "next/link";
import { CourseType, ProductType, StateProps } from "../../type";
import Image from "next/image";
import { Heart, ShoppingBasket, ShoppingCart, User } from "lucide-react";
import FormattedPrice from "./FormattedPrice";

interface Item {
  products: CourseType[];
  categoryName: string;
}

const CourseCard = ({ products, categoryName }: Item) => {
  return (
    <section className="bg-white py-4 font-sans">
      <div className=" max-w-6xl m-auto gap-2 flex flex-wrap items-start justify-start">
        {products?.map((item) => (
          <>
            <div
              key={item?.id}
              className="w-full  lg:w-[49%]  flex flex-col mb-8 px-3"
            >
              <div className="overflow-hidden border flex flex-col xs:flex-row bg-white rounded-lg shadow hover:shadow-raised hover:translateY-2px transition">
                <Link
                  className="block sm:w-[200px] h-[200px]"
                  href={{
                    pathname: `/id_${item?.id}`,
                    query: { id: item?.id, prefix: categoryName },
                  }}
                >
                  <img
                    className="sm:object-cover h-full w-full"
                    src={item.poster}
                    alt={item.title}
                  />
                </Link>
                <div className="p-3 flex flex-1 flex-col justify-between ">
                  <h5 className="text-zinc-700 text-xs w-fit bg-gray-100 px-2 py-0.5 rounded font-semibold">
                    {item.category}
                  </h5>
                  <Link
                    className="flex justify-between "
                    href={{
                      pathname: `/id_${item?.id}`,
                      query: { id: item?.id, prefix: categoryName },
                    }}
                  >
                    <h3 className="font-bold px-2 text-gray-900 mb-2 leading-normal">
                      {item.title}
                    </h3>
                    <span className="hidden lg:flex text-zinc-700 text-bold text-sm items-center gap-1">
                      <svg
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
                      </svg>{" "}
                      {item.studentsEnrolled} Student
                    </span>
                  </Link>
                  <span className="font-semibold">
                    Price: <FormattedPrice amount={item.price} />
                  </span>
                  <span className="font-semibold">
                    Level:{" "}
                    <span
                      className={`${
                        item?.level.toLowerCase() === "beginner"
                          ? "text-green-700"
                          : item.level.toLowerCase() === "intermediate"
                          ? "text-yellow-700"
                          : item.level.toLowerCase() === "advanced"
                          ? "text-red-700"
                          : ""
                      }`}
                    >
                      {item.level.toLowerCase()}
                    </span>
                  </span>
                  <span className="font-semibold text-zinc-700">
                    Duration: {item.duration} hours
                  </span>

                  <div className="flex w-full items-center justify-end sm:justify-between  sm:mt-4">
                    {item.enrollmentOpen === "open" && item.enrollmentLink ? (
                      <Link
                        className="bg-orange-200 text-orange-600 font-bold rounded-md px-3 py-1.5 text-sm text-center transition"
                        href={item.enrollmentLink!}
                      >
                        Enroll Now
                      </Link>
                    ) : (
                      <button
                        disabled={true}
                        className={`bg-red-200 text-red-500 font-bold my-2 rounded-md px-3 py-1.5 text-sm text-center transition`}
                      >
                        Enrolment Closed
                      </button>
                    )}
                    <div className="hidden lg:flex text-zinc-700 flex-col semibold">
                      <span className="flex items-center gap-1">
                        <User size={15} /> {item.instructor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default CourseCard;
