"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/proSlice";
import { getOneProduct } from "@/helpers/getOneProduct";
import { CourseType } from "../../type";
import FormattedPrice from "@/components/FormattedPrice";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import supabase from "@/supabase/config";
import { detectLanguage } from "@/lib/utils";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const CoursePage: React.FC<Props> = ({ searchParams }: Props) => {
  const [course, setCourse] = useState<any>();
  const searchPar = useSearchParams();
  const idString = searchPar.get("id");
  const prefix = searchPar.get("prefix");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const p = await getOneProduct(prefix!, idString!);
        const { data } = await supabase
          .from('courses')
          .select('*')
          .eq('id', +idString!)
          .single();
        setCourse(data!);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchProduct();
    }
  }, [idString, prefix]);

  const dispatch = useDispatch();

  return (
    <>
      <div className="w-screen overflow-hidden">
        <div className="mx-auto max-w-screen-lg px-3 py-10">
          <div className="space-y-3">
            <h5 className="text-sm font-medium uppercase text-gray-400">
              {course?.category}
            </h5>
            <h1 className="text-3xl font-semibold">{course?.title}</h1>
            <div className="video-player-wrapper">
              {/* <video height="250" className=" p-5 video-player w-full" controls poster={course?.poster}>
        <source src={course?.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
            </div>


            {course?.video && course.video.includes('http') ? <div className='player-wrapper'> <ReactPlayer
              url={course?.video}
              light={course?.poster}
              controls={true}
              playing
              className="w-full h-full p-5 react-player "
              width='100%'
              height='100%'
            /> </div>
              : <img src={course?.poster} width={"100%"} height={"50%"}  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://makeplaceholder.com?text=Broken+Url&size=400x200&tcolor=333333";
              }}/>
            }

            {course?.description.split("\n").map((line, i) => (
              <div
                dir={detectLanguage(course?.description) === "ar" ? "rtl" : "ltr"}
                className="w-full"
                key={i}
              >
                {i > 0 && <br />}
                {line}
              </div>
            ))}
            <ul className="flex gap-4">
              <li className="flex items-center">
                <span className="mr-1.5 rounded bg-gray-900 px-2 text-sm font-semibold text-white">
                  {" "}
                  {course?.rate}{" "}
                </span>
                <div className="flex items-center justify-center">
                  {(course?.rate ? Array(5).fill(null).map(
                    (_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={index < course.rate ? "currentColor" : "none"}
                        stroke="currentColor"
                        className="h-5 w-5 text-purple-500"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )
                  ) : [])}

                </div>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {course?.studentsEnrolled} Enrolled
              </li>
            </ul>
            <ul className="sm:flex items-center text-sm text-gray-500">
              <li>
                Created by{" "}
                <span className="font-bold">
                  {" "}
                  {course?.instructor}{" "}
                </span>
              </li>
              <span className="hidden sm:inline mx-3 text-2xl">·</span>
              <li>Last updated {course?.last_updated} </li>
            </ul>
          </div>
          <div className="my-1"><span className="font-medium text-gray-500">Duration:</span> <span className="font-medium mx-1"> {course?.duration} Hours </span></div>
          <div className="bg-white p-3 rounded-[.5rem] flex gap-4 items-center">
            <div className="flex-1 font-bold">
              Price: <FormattedPrice amount={course?.price!} />
            </div>
            {course?.enrollmentOpen === 'open' ? (
              <button
                onClick={() => {
                  dispatch(addToCart(course));
                  toast.success(`${course?.title} is added to Cart!`);
                }}
                className="uppercase text-xs font-semibold text-white bg-designColor py-2 px-2 rounded-md hover:bg-opacity-80 duration-300"
              >
                Add to Cart
              </button>
            ) : <span className="cursor-not-allowed sm:text-sm text-red-500 font-bold text-xs ">Register Closed</span>}
          </div>


          <ul className="mt-2 space-y-4 mt-10 py-2">
            <li className="bg-white text-left">
              <label
                htmlFor="accordion-1"
                className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
              >
                <input
                  className="peer hidden"
                  type="checkbox"
                  id="accordion-1"

                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
                  <h3 className="text-base font-bold text-gray-600 lg:text-base">
                    In this course
                  </h3>
                </div>
                <div className="max-h-0 overflow-auto transition-all duration-500 peer-checked:max-h-96">
                  <ul className="space-y-1 font-semibold text-gray-600 mb-6">
                    {course?.index.split("\n").map((line, i) => (
                      <div
                        dir={detectLanguage(course?.index) === "ar" ? "rtl" : "ltr"}
                        className="px-4 font-semibold text-gray-600 mb-1 pb-2 w-full"
                        key={i}
                      >
                        {i > 0 &&  <span className="mb-2 block"></span>}
                        {line}
                      </div>
                    ))}
                  </ul>
                </div>
              </label>
            </li>
            <li className="bg-white text-left">
              <label
                htmlFor="accordion-2"
                className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
              >
                <input
                  className="peer hidden"
                  type="checkbox"
                  id="accordion-2"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
                  <h3 className="text-base font-bold text-gray-600 lg:text-base">
                    About the Instructor
                  </h3>
                </div>
                <div className="max-h-0 overflow-auto transition-all duration-500 peer-checked:max-h-96">
                  <ul className="pl-5 space-y-1 font-semibold text-gray-600 mb-6">
                    <li>Name: {course?.instructor}</li>
                    <li>{course?.instructor_info}</li>
                  </ul>
                </div>
              </label>
            </li>

            {course?.more_details && <li className="bg-white text-left">
              <label
                htmlFor="accordion-3"
                className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
              >
                <input
                  className="peer hidden"
                  type="checkbox"
                  id="accordion-3"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
                  <h3 className="text-base font-bold text-gray-600 lg:text-base">
                    More Details
                  </h3>
                </div>
                <div className="max-h-0 overflow-auto transition-all duration-500 peer-checked:max-h-96">
                  {course?.more_details.split("\n").map((line, i) => (
                    <div
                      dir={detectLanguage(course?.more_details) === "ar" ? "rtl" : "ltr"}
                      className="px-4 font-semibold text-gray-600 mb-1 w-full  pb-2"
                      key={i}
                    >
                      {i > 0 && <span className="mb-2 block"></span>}
                      {line}
                    </div>
                  ))}

                </div>
              </label>
            </li>}


          </ul>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
