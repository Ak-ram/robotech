'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/proSlice";
import { getOneProduct } from "@/helpers/getOneProduct";
import { CourseType } from "../../type";
import FormattedPrice from "@/components/FormattedPrice";
import { Gift } from "lucide-react";
import toast from "react-hot-toast";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const CoursePage: React.FC<Props> = ({ searchParams }: Props) => {
  const [course, setCourse] = useState<CourseType | undefined>();
  const [mainImg, setMainImg] = useState<1 | 2 | 3>(1);
  const searchPar = useSearchParams();
  const idString = searchPar.get("id");
  const id = Number(idString);
  const prefix = searchPar.get("prefix");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const p = await getOneProduct(prefix, id);
        console.log(p)
        setCourse(p);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchProduct();
    }
  }, [id, prefix]);

  const dispatch = useDispatch();

  return (
    <><div className="w-screen overflow-hidden">
      <div className="mx-auto max-w-screen-lg px-3 py-10">
        <div className="space-y-3">
          <h5 className="text-sm font-medium uppercase text-gray-400">{course?.category}</h5>
          <h1 className="text-3xl font-semibold">{course?.title}</h1>
          <video className="w-full p-5" height="360" controls>
            <source src={course?.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="">{course?.description}</p>
          <ul className="flex gap-4">
            <li className="flex items-center">
              <span className="mr-1.5 rounded bg-gray-900 px-2 text-sm font-semibold text-white"> {course?.rate} </span>
              <div className="flex items-center justify-center">
                {(course?.rate ? Array(course.rate).fill(null) : []).map((_, index) => (
                  <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-purple-500">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>

            </li>
            <li className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {course?.studentsEnrolled} Enrolled
            </li>
          </ul>
          <ul className="sm:flex items-center text-sm text-gray-500">
            <li>Created by <a href="#" className="font-bold"> {course?.instructor} </a></li>
            <span className="hidden sm:inline mx-3 text-2xl">·</span>
            <li>Last updated {course?.last_updated} </li>

          </ul>
        </div>
        <div className="bg-white p-3 rounded-[.5rem] flex gap-4 items-center">
          
          <div className="flex-1">Price: <FormattedPrice amount={course?.price!} /></div>
          {course?.enrollmentOpen ? <button
            onClick={() => {
              dispatch(addToCart(course));
              toast.success(`${course?.title} is added to Cart!`);
            }}
            className="uppercase text-xs font-semibold text-white bg-designColor py-2 px-2 rounded-sm hover:bg-opacity-80 duration-300"
          >
            Add to Cart
          </button> : null}
        </div>
        <div className="mt-10 bg-white py-2">
          <nav className="flex flex-wrap gap-4">
            <a href="#" className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out border-b-purple-600 text-purple-600"> Announcements </a>
          </nav>
        </div>

        <ul className="mt-2 space-y-4">
          <li className="text-left">
            <label htmlFor="accordion-1" className="relative flex flex-col rounded-md border border-gray-100 shadow-md">
              <input className="peer hidden" type="checkbox" id="accordion-1" checked />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
                <h3 className="text-base font-bold text-gray-600 lg:text-base">In this course</h3>
              </div>
              <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
                <ul className="space-y-1 font-semibold text-gray-600 mb-6">
                  {course?.index.map((item => (
                    <li className="flex px-2 sm:px-6 py-2.5 hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-2 w-6">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                      </svg>
                      {item}
                      {/* <span className="ml-auto text-sm"> 23 min </span> */}
                    </li>
                  )))}



                </ul>
              </div>
            </label>
          </li>
          <li className="text-left">
            <label htmlFor="accordion-2" className="relative flex flex-col rounded-md border border-gray-100 shadow-md">
              <input className="peer hidden" type="checkbox" id="accordion-2" />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
                <h3 className="text-base font-bold text-gray-600 lg:text-base">About the Instructor</h3>
              </div>
              <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
                <ul className="pl-5 space-y-1 font-semibold text-gray-600 mb-6">
                  <li>Name: {course?.instructor}</li>
                  <li>Info: {course?.instructor}</li>
                </ul>

              </div>
            </label>
          </li>
          <li className="text-left">
            <label htmlFor="accordion-3" className="relative flex flex-col rounded-md border border-gray-100 shadow-md">
              <input className="peer hidden" type="checkbox" id="accordion-3" />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
                <h3 className="text-base font-bold text-gray-600 lg:text-base">More Details</h3>
              </div>
              <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
                <p className="px-4 font-semibold text-gray-600 mb-6">
                  {course?.more_details}
                </p>
              </div>
            </label>
          </li>

        </ul>
      </div>

    </div></>
  );
};

export default CoursePage;
