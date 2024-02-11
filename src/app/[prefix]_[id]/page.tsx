'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/proSlice";
import { getOneProduct } from "@/helpers/getOneProduct";
import { ProductType } from "../../../type";
import FormattedPrice from "@/components/FormattedPrice";
import Link from "next/link";
import { Banknote, Check, CheckCircle, Dot, FacebookIcon, Gift, Home, Link2, Link2Icon, PhoneCall, Redo, TwitterIcon, Undo, Wallet2, X } from "lucide-react";
import CoursePage from "@/components/CoursePage";
import MagnifierComponent from "@/components/Magnifier";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { getCategoryProducts } from "@/helpers/getCategoryProducts";
import Related from "@/components/Related";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";
import ProductDetails from "@/components/ProductDetails";
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
            <div className="py-6  mx-auto px-4">
              <nav className="flex">
                <ol role="list" className="flex items-center">
                  {/* Home */}
                  <li className="text-left">
                    <div className="-m-1">
                      <a href="/" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                        <Home className="w-7 h-7 p-1 bg-white rounded-sm border border-blue-500/50 text-blue-600" size={17} />
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
                      <a href="/" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                        <Undo className="w-7 h-7 p-1 bg-white rounded-sm border border-blue-500/50 text-blue-600" size={17} />
                      </a>
                    </div>
                  </li>
                  {/* <li className="text-left">
          <div className="-m-1">
            <a
              href={`/${(prefix === 'courses' || prefix === '3d_print') ? prefix : ''}`}
              className="rounded-md p-1 text-xs xs:text-sm font-medium text-blue-600 focus:text-blue-900 focus:shadow hover:text-blue-800"
              aria-current="page"
            >
              {prefix}
            </a>
          </div>
        </li> */}
                  {/* Separator */}
                  <li className="text-left">
                    <div className="flex items-center">
                      <span className="mx-2 text-blue-400">/</span>
                    </div>
                  </li>

                  {/* Product Title */}
                  <li className="text-left">
                    <div className="">
                      <a href="#" className="py-1 text-blue-600 overflow-hidden text-sm text-ellipsis whitespace-nowrap block  rounded-md font-medium focus:text-blue-900 focus:shadow hover:text-blue-800" aria-current="page">
                        {product?.title?.toLowerCase()}
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>

              <div className="ml-5 lg:col-gap-12 pb-5 xl:col-gap-16 mt-8 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                <div className="lg:col-span-3 lg:row-end-1">
                  <div className="lg:flex lg:items-center">
                    <div className="flex-1 lg:order-2">
                      <div className="max-w-xl mx-auto overflow-hidden rounded-lg">
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

              <ProductDetails product={product} prefix={prefix} dispatch={dispatch} addToCart={addToCart} products={products}/>

                <div className="lg:col-span-3">
                  <div className="border-b border-gray-300">
                    <nav className="flex gap-4">
                      <a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>
                    </nav>
                  </div>

                  <div className="mt-8 flow-root sm:mt-12">
                    <h1 className="text-lg md:text-3xl font-bold">More details about {product?.title}</h1>

                    <>
                      {product?.description?.length && product?.description?.includes('|') ? (
                        <ul className="space-y-1 w-[90%] font-semibold mt-3 text-gray-600 mb-6">
                          <li className="font-bold text-black">Product Attributes:</li>
                          {product?.description?.split('|').slice(1).map((part, index) => {
                            if (part.includes('|')) {
                              const bullets = part.split('|').map(bullet => bullet.trim());
                              return bullets.map((bullet, i) => (
                                <li key={i} className="bg-white border-slate-500 flex items-center px-2 sm:px-6 py-2.5 hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                                  <CheckCircle className="w-4 h-4 mr-2 text-black" />
                                  <span>{bullet}</span>
                                </li>
                              ));
                            } else {
                              return (
                                <li className="mt-4 bg-white border-slate-400 border rounded p-2 text-xs sm:text-base items-center flex gap-1" key={index}>
                                  <CheckCircle className="w-4 h-4 mr-2 text-black" />
                                  <span>{part.split('|')[0]}</span>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      ) : (
                        <p className="my-5">{product?.description?.split('|').slice(0, 1)}</p>
                      )}

                    </>



                    <h1 className="mt-8 text-lg md:text-3xl  font-bold">Quick Order ?</h1>
                    <p className="mt-4 text-xs sm:text-base">Contact Us in Whatsapp : 01102071544</p>
                  </div>
                </div>
              </div>
            </div>
            {
              products?.filter((item: ProductType) => item?.id !== product?.id).length && <Related prefix={prefix} products={products} product={product} />

            }
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
