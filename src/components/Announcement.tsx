'use client'
import { ReactNode, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Feather, X } from "lucide-react";
import Link from "next/link";
import supabase from "../supabase/config";
import Gift from '../assets/gift.gif'
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
interface AnnouncementT {
    body: string;
    link_url: string;
    image_details: string;
    image: string;
    price: number;
}

const Announcement = () => {
    const [data, setData] = useState<AnnouncementT[]>([]);
    const [isExpand, setExpand] = useState<Boolean>(false);
    const [show, setShow] = useState<Boolean>(true);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const { data: announcementData, error } = await supabase
                    .from('announcements')
                    .select();

                if (error) {
                    throw error;
                }

                setData(announcementData || []);
            } catch (error) {
                console.error('Error fetching announcement data:', error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchAnnouncement();
        }
    }, []);

    const expandAd = () => {
        setExpand((prevExpand) => !prevExpand);
    };

    let announcement: ReactNode | null = null;
    if (data.length > 0 && data[0].body) {
        announcement = (
            <div className="items-start sm:items-center bg-blue-500 text-white py-3 px-2 sm:px-5 flex">
                <div className="container w-[90%] mx-auto sm:gap-3 flex flex-col sm:flex-row">
                    <Link href={data[0]?.link_url || ''} passHref className="flex hover:underline gap-1 items-center overflow-hidden w-fit text-xs sm:text-sm font-semibold">
                        <Feather width={25} height={25} className="hidden xs:inline-block" />
                        {data[0].body}

                    </Link>
                </div>
                <span className="hidden lg:block hover:text-white text-white/80 cursor-pointer" onClick={expandAd}>
                    {isExpand ? <ChevronUp className="" size={20} /> : <ChevronDown className="" size={20} />}
                </span>
                <span className="ml-2 hover:text-white text-white/80 cursor-pointer" onClick={() => setShow(false)}>
                    <X className="" size={20} />
                </span>
            </div>
        );
    }

    return <>{show ? <div>{announcement}{<div style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/021/670/513/non_2x/abstract-science-template-technology-lines-and-dots-connection-background-wallpaper-or-banner-with-a-dna-molecules-illustration-vector.jpg')`
        , backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
    }} className={`hidden lg:flex ${isExpand ? 'h-[280px] py-5 px-10' : 'h-0'}  justify-center gap-40 items-center overflow-hidden transition-all duration-500 bg-white border-b`}>
        {/* <div className="overflow-hidden">
            <Image style={{ transform: 'scale(2)' }} className="transform scale-200 py-1 px-2 h-full" src={Gift} alt="DetailedLogo" width={200} height={50} />
        </div> */}
        <div>
            <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">

                📢 COMMING SOON</h2>

            <div>
                {data.length > 0 && data[0].image_details.split("\n").map((line, i) => (
                    <div
                        className="w-full my-[3px]"
                        key={i}
                    >
                        {i > 0 && <span className=""></span>}
                        {line}
                    </div>
                ))}
            </div>

        </div>
        <div className="relative flex justify-center flex-col items-center gap-2">
            <img style={{ transform: 'scale(1.2)' }} className="py-1 px-2 h-full" src={data.length > 0 ? data[0].image : ''} alt="DetailedLogo" width={200} height={50} />
            <span className="bg-black text-white p-1 rounded px-3  font-bold">
                <FormattedPrice className="text-xl " amount={data.length > 0 ? data[0].price : 0} />
            </span></div>
    </div>}</div>
        : null}</>
};

export default Announcement;