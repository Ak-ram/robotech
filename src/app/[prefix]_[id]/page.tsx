'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/proSlice";
import { getOneProduct } from "@/helpers/getOneProduct";
import { ProductType } from "../../../type";
import FormattedPrice from "@/components/FormattedPrice";
import Link from "next/link";
import { Banknote, Check, Dot, Gift, Wallet2 } from "lucide-react";
import CoursePage from "@/components/CoursePage";
import MagnifierComponent from "@/components/Magnifier";
import Product from "@/components/Product";
import { getCategoryProducts } from "@/helpers/getCategoryProducts";
import Related from "@/components/Related";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page: React.FC<Props> = ({ searchParams }: Props) => {
  const [product, setProduct] = useState<ProductType | undefined>();
  const [products, setProducts] = useState<any[]>([]);
  const [mainImg, setMainImg] = useState<1 | 2 | 3>(1);
  const searchPar = useSearchParams();
  const idString = searchPar?.get("id");
  // const id = Number(idString);
  const prefix = searchPar?.get("prefix");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const p = await getCategoryProducts(prefix!);
        setProducts(p);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (typeof window !== 'undefined') {
      // Run the effect only in the browser environment
      fetchProducts();
    }
  }, [prefix]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const p = await getOneProduct(prefix!, idString!);
        console.log('single product', p)
        setProduct(p);
        if (typeof window !== 'undefined' && window.scrollTo) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
  if (prefix === 'courses') return <CoursePage searchParams={{}} />
  return (
    <>
      {
        product ?
          <section className="">
            <div className="py-6 sm:py-12 mx-auto px-4">
              <nav className="flex">
                <ol role="list" className="flex items-center">
                  <li className="text-left">
                    <div className="-m-1">
                      <Link href="/" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Home </Link>
                    </div>
                  </li>
                  <li className="text-left">
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <div className="-m-1">
                        <Link
                          href={`/${(prefix === 'courses' || prefix === '3d_print') ? prefix : ''}`}
                          className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                          aria-current="page"
                        >
                          {prefix}
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li className="text-left">
                    <div className="flex items-end">
                      <span className="mx-2 text-gray-400">/</span>
                      <div className="">
                        <Link href="#" className="overflow-hidden text-ellipsis whitespace-nowrap block w-36 rounded-md text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800" aria-current="page"> {product?.title} </Link>
                      </div>
                    </div>
                  </li>
                </ol>
              </nav>

              <div className="ml-5 lg:col-gap-12 pb-5 xl:col-gap-16 mt-8 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                <div className="lg:col-span-3 lg:row-end-1">
                  <div className="lg:flex lg:items-center">
                    <div className="flex-1 lg:p-10 lg:p-5 lg:order-2 lg:ml-5">
                      <div className="max-w-xl overflow-hidden rounded-lg">
                        {/* <Magnifier
                      className="max-w-xl overflow-hidden rounded-lg"
                      style={{ height: '100%', width: '100%' }}
                      imageSrc={product?.image1!}
                      imageAlt=""
                      // enlargedImagePosition="over"
                    />  */}
                        <MagnifierComponent img={mainImg === 1 ? product?.image1 : mainImg === 2 ? product?.image2 : product?.image3} />
                        {/* <img className="h-full w-full max-w-full object-cover" src={mainImg === 1 ? product?.image1 : mainImg === 2 ? product?.image2 : product?.image3} alt="" /> */}
                      </div>
                    </div>

                    <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                      <div className="flex gap-3 flex-row justify-center items-start lg:flex-col">
                        {product?.image1 ? <button onClick={() => setMainImg(1)} type="button" className="border-gray-300 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 p-2 text-center">
                          <img className="h-full w-full object-cover" src={product?.image1} alt="" />

                        </button> : null}
                        {product?.image2 ? <button onClick={() => setMainImg(2)} type="button" className="border-gray-300 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 p-2 text-center">
                          <img className="h-full w-full object-cover" src={product?.image2} alt="" />
                        </button> : null}
                        {product?.image3 ? <button onClick={() => setMainImg(3)} type="button" className="border-gray-300 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 p-2 text-center">
                          <img className="h-full w-full object-cover" src={product?.image3} alt="" />
                        </button> : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                  <h1 className="sm:text-2xl font-bold text-gray-900 sm:text-3xl">{product?.title}</h1>

                  <div className="mt-5 flex items-center">

                    {/* <p className="ml-2 text-sm font-medium text-gray-500">{product?.count} Piece(s)</p> */}

                    {
                      product?.count > 0 && prefix !== 'print' ? <p className="ml-2 text-sm font-medium text-gray-500">
                        <span className="mr-2">In Stock:</span>
                        {product?.count} Piece(s)</p>
                        : <span className="hidden sm:flex flex-col items-center justify-center">
                          <span className="text-slate-600 flex items-center"><Check size={18} /> Availability :  avilable</span>
                        </span>
                    }



                  </div>

                  <div className="mt-10 flex lg:flex-col lg:items-start gap-4 items-center justify-between border-t border-b py-4 sm:flex-row sm:space-y-0">
                    <div className="flex items-end">

                      {
                        product?.price > 0 && prefix !== 'print' ? <><h1 className="sm:text-lg md:text-3xl font-bold"><FormattedPrice amount={(product?.price!)} /></h1>
                          <span className="text-base">/piece</span></>
                          : <><h1 className="sm:text-lg md:text-3xl font-bold"><FormattedPrice amount={(product?.count!)} /></h1>
                            <span className="text-base">/Minute</span></>
                      }





                    </div>

                    <button onClick={() => {
                      dispatch(addToCart(product));
                      toast.success(`${product?.title} successfully added to the basket`)
                    }} type="button" className="mt-0 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-3 py-2 md:px-12 md:py-3 text-center  text-sm sm:text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Add to cart
                    </button>
                  </div>




                  <ul className="mt-8 space-y-2">
                    {
                      product?.price < product?.previousPrice ?
                        <>
                          <li className="flex items-center text-left text-sm font-medium text-gray-600">
                            <Wallet2 size={18} className="mr-1" />
                            Previous Price:<span className="mr-1"></span> <FormattedPrice amount={(product?.previousPrice!)} /> <span className="ml-1"></span> from this product.
                          </li>
                          <li className="flex items-center text-left text-sm font-medium text-gray-600">
                            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                            </svg>
                            You saved:<span className="mr-1"></span> <FormattedPrice amount={(product?.previousPrice! - product?.price!)} /> <span className="ml-1"></span> from this product.
                          </li>

                        </>
                        : null}

                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                      <Gift size={18} className="mr-2" />
                      Newly added
                    </li>
                    {/* {product?.isNew ? <li className="flex items-center text-left text-sm font-medium text-gray-600">
                      <Gift size={18} className="mr-2" />
                      Newly added
                    </li> : null} */}
                  </ul>
                </div>

                <div className="lg:col-span-3">
                  <div className="border-b border-gray-300">
                    <nav className="flex gap-4">
                      <a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>
                    </nav>
                  </div>

                  <div className="mt-8 flow-root sm:mt-12">
                    <h1 className="text-lg md:text-3xl font-bold">More details about {product?.title}</h1>

                      {product?.description && (
                    <ul className="space-y-1 font-semibold mt-3 text-gray-600 mb-6">
                      <p className="mb-5">{product?.description?.split('|').slice(0,1)}</p>
                        <span className="font-bold text-black">Product Attributes : </span>

                        <>
                          {product?.description?.split('|').slice(1).map((part, index) => {
                            // Check if the part contains bullet points
                            if (part.includes('|')) {
                              // If it contains bullet points, split it further based on '|'
                              const bullets = part.split('|').map(bullet => bullet.trim());
                              return bullets.map((bullet, i) => (
                                <li key={i} className="flex items-center px-2 sm:px-6 py-2.5 hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                                  <span className="w-[5px] h-[5px] mr-2 rounded-full bg-black"></span>
                                  <span>{bullet}</span>
                                </li>
                              ));
                            } else {
                              // If it doesn't contain bullet points, render as ordinary text
                              return (
                                <p className="mt-4 text-xs sm:text-base items-center flex gap-1" key={index}>
                                  <span className="w-[5px] h-[5px] mr-2 rounded-full bg-black"></span>
                                  <span>{part.split('|')[0]}</span>
                                </p>
                              );
                            }
                          })}

                        </>
                    </ul>
                      )}



                    <h1 className="mt-8 text-lg md:text-3xl  font-bold">Quick Order ?</h1>
                    <p className="mt-4 text-xs sm:text-base">Contact Us in Whatsapp : 01066745733</p>
                  </div>
                </div>
              </div>
            </div>
            <Related prefix={prefix} products={products} product={product} />
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
          :
          <Loading />}

    </>
  );
};

export default Page;
