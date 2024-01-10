'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/proSlice";
import { getOneProduct } from "@/helpers/getOneProduct";
import { ProductType } from "../../../type";
import Container from "@/components/Container";
import FormattedPrice from "@/components/FormattedPrice";
import Link from "next/link";
import { Gift } from "lucide-react";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page: React.FC<Props> = ({ searchParams }: Props) => {
  const [product, setProduct] = useState<ProductType | undefined>();
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
        setProduct(p);
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
    <section className="py-6 sm:py-12">
      <div className="container mx-auto px-4">
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
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <Link href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800" aria-current="page"> {product?.title} </Link>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img className="h-full w-full max-w-full object-cover" src={mainImg === 1 ? product?.image1 : mainImg === 2 ? product?.image2 : product?.image3} alt="" />

                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex gap-3 flex-row items-start lg:flex-col">
                  {product?.image1 ? <button onClick={() => setMainImg(1)} type="button" className="p-2 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                    <img className="h-full w-full object-cover" src={product?.image1} alt="" />
                  </button> : null}
                  {product?.image2 ? <button onClick={() => setMainImg(2)} type="button" className="p-2 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                    <img className="h-full w-full object-cover" src={product?.image2} alt="" />
                  </button> : null}
                  {product?.image3 ? <button onClick={() => setMainImg(3)} type="button" className="p-2 flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                    <img className="h-full w-full object-cover" src={product?.image3} alt="" />
                  </button> : null}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product?.title}</h1>

            <div className="mt-5 flex items-center">
              <div className="flex items-center">

                In Stock:
              </div>
              <p className="ml-2 text-sm font-medium text-gray-500">{product?.count} Piece(s)</p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold"><FormattedPrice amount={(product?.price!)} /></h1>
                <span className="text-base">/piece</span>
              </div>

              <button onClick={() => dispatch(addToCart(product))} type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to cart
              </button>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                </svg>
                You saved:<span className="mr-1"></span> <FormattedPrice amount={(product?.previousPrice! - product?.price!)} /> <span className="ml-1"></span> from this product.
              </li>

              {product?.isNew ? <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <Gift size={18} className="mr-2" />
                Newly added
              </li> : null}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>
              </nav>
            </div>

            <div className="mt-8 flow-root sm:mt-12">
              <h1 className="text-3xl font-bold">More details about {product?.title}</h1>
              <p className="mt-4">{product?.description}</p>
              <h1 className="mt-8 text-3xl font-bold">Quick Order ?</h1>
              <p className="mt-4">Contact Us in Whatsapp : 01066745733</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
