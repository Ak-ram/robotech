"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/proSlice";
import { ProductType } from "../../../type";
import {
  CheckCircle,
  Home,
  Undo,
} from "lucide-react";
import CoursePage from "@/components/CoursePage";
import MagnifierComponent from "@/components/Magnifier";
import { getCategoryProducts } from "@/helpers/getCategoryProducts";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";
import ProductDetails from "@/components/ProductDetails";
import { detectLanguage } from "@/lib/utils";
import supabase from "@/supabase/config";
import NotFound from "@/components/NotFound";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page: React.FC<Props> = ({ searchParams }: Props) => {
  const [product, setProduct] = useState<any>();
  const [mainImg, setMainImg] = useState<1 | 2 | 3>(1);
  const searchPar = useSearchParams();
  const idString = searchPar?.get("id");
  const prefix = searchPar?.get("prefix");

  useEffect(() => {
    const fetchProduct = async () => {
      try {



        const { data } =
          prefix === "print"
            ? await supabase
              .from("services")
              .select("*")
              .eq("id", idString)
              .single()
            : await supabase
              .from('products')
              .select("*")
              .eq("id", idString)
              .single();

        setProduct(data!);
        if (typeof window !== "undefined" && window.scrollTo) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchProduct();
    }
  }, [idString, prefix]);

  const dispatch = useDispatch();
  if (prefix === "courses") return <CoursePage searchParams={{}} />;
  // if (!prefix) return <CoursePage searchParams={{}} />;
  return (
    <>
      {product  ? (
        <section className="">
          <div className="py-6  mx-auto px-4">
            <nav className="flex">
              <ol role="list" className="flex items-center">
                {/* Home */}
                <li className="text-left">
                  <div className="-m-1">
                    <a
                      href="/"
                      className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    >
                      <Home
                        className="w-7 h-7 p-1 bg-white rounded-sm border border-blue-500/50 text-blue-600"
                        size={17}
                      />
                    </a>
                  </div>
                </li>

                {/* Separator */}
                <li className="text-left">
                  <div className="flex items-center">
                    <span className="mx-2 text-blue-400">/</span>
                  </div>
                </li>

                {/* Prefix */}
                <li className="text-left">
                  <div className="-m-1">
                    <a
                      href="/"
                      className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    >
                      <Undo
                        className="w-7 h-7 p-1 bg-white rounded-sm border border-blue-500/50 text-blue-600"
                        size={17}
                      />
                    </a>
                  </div>
                </li>

                {/* Separator */}
                <li className="text-left">
                  <div className="flex items-center">
                    <span className="mx-2 text-blue-400">/</span>
                  </div>
                </li>

                {/* Product Title */}
                <li className="text-left">
                  <div className="">
                    <a
                      href="#"
                      className="py-1 text-blue-600 overflow-hidden text-sm text-ellipsis whitespace-nowrap block w-44 rounded-md font-medium focus:text-blue-900 focus:shadow hover:text-blue-800"
                      aria-current="page"
                    >
                      {product?.title?.toLowerCase()}
                    </a>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="lg:ml-5 lg:col-gap-12 pb-5 xl:col-gap-16 mt-8 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-5 lg:gap-16">
              <div className="lg:col-span-3 lg:row-end-1">
                <div className="lg:flex lg:items-center">
                  <div className="flex-1 lg:order-2 border-slate-300 rounded-md border-2">
                    <div className="max-w-xl mx-auto overflow-hidden rounded-lg">

                      {prefix === "print" ? (
                        <img
                          src={
                            mainImg === 1
                              ? product?.image1
                              : mainImg === 2
                                ? product?.image2
                                : product?.image3
                          }
                        />
                      ) : (
                        <MagnifierComponent
                          img={
                            mainImg === 1
                              ? product?.image1
                              : mainImg === 2
                                ? product?.image2
                                : product?.image3
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                    <div className="flex gap-3 flex-row justify-center items-start lg:flex-col">
                      {product?.image1 ? (
                        <button
                          onClick={() => setMainImg(1)}
                          type="button"
                          className="border-gray-300 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 p-2 text-center"
                        >
                          <img
                            className="h-full w-full object-cover"
                            src={product?.image1}
                            alt=""
                          />
                        </button>
                      ) : null}
                      {product?.image2 ? (
                        <button
                          onClick={() => setMainImg(2)}
                          type="button"
                          className="border-gray-300 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 p-2 text-center"
                        >
                          <img
                            className="h-full w-full object-cover"
                            src={product?.image2}
                            alt=""
                          />
                        </button>
                      ) : null}
                      {product?.image3 ? (
                        <button
                          onClick={() => setMainImg(3)}
                          type="button"
                          className="border-gray-300 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 p-2 text-center"
                        >
                          <img
                            className="h-full w-full object-cover"
                            src={product?.image3}
                            alt=""
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <ProductDetails
                product={product}
                prefix={prefix}
                dispatch={dispatch}
                addToCart={addToCart}
              />

              <div className="lg:col-span-3">
                <div className="border-b border-gray-300">
                  <nav className="flex gap-4">
                    <a
                      href="#"
                      title=""
                      className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                    >
                      {" "}
                      Description{" "}
                    </a>
                  </nav>
                </div>

                <div className="mt-8 flow-root sm:mt-12">
                  <h1 className="text-lg md:text-3xl font-bold">
                    More details about {product?.title}
                  </h1>

                  <>
                    {product?.description?.length
                      && (
                        <ul className="space-y-1 w-[90%] font-semibold mt-3 text-gray-600 mb-6">
                          <li className="font-bold text-black">
                            Product Attributes:
                          </li>
                          {product?.description.split("\n").map((line, i) => (
                            <div
                              dir={detectLanguage(product?.description) === "ar" ? "rtl" : "ltr"}
                              className="w-full"
                              key={i}
                            >
                              {i > 0 && <br />}
                              {line}
                            </div>
                          ))}
                        </ul>
                      )}

                  </>

                  <h1 className="mt-8 text-lg md:text-3xl  font-bold">
                    Quick Order ?
                  </h1>
                  <p className="mt-4 text-xs sm:text-base">
                    Contact Us in Whatsapp : 01102071544
                  </p>

                </div>
              </div>
            </div>
          </div>
          
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000",
                color: "#fff",
              },
            }}
          />
        </section>
      ) : (
        <Loading/>
      )}
    </>
  );
};

export default Page;
