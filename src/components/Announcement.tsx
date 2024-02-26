'use client'
import { getAnnouncementData } from "@/helpers/getAnnouncement";
import shortLogo from '@/assets/ShortLogo.png'
import { ChevronRight, Feather, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface AnnouncementT {
    body: string;
    link_text: string;
    link_url: string;
}

const Announcement = () => {
    const [data, setData] = useState<AnnouncementT[]>([]);
    const [closed, setClosing] = useState<Boolean>(false)
    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const announcementData = await getAnnouncementData();
                setData(announcementData);
            } catch (error) {
                console.error('Error fetching announcement data:', error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchAnnouncement();
        }
    }, []);
    let announcement = closed ? null : <div className="items-start sm:items-center  bg-blue-500 text-white py-3 px-2 sm:px-5 flex">
        <div className="container w-[90%] mx-auto sm:gap-3 flex flex-col items-start sm:flex-row sm:items-center">
            <Link href={data[0]?.link_url! || ''}
                className="flex flex-nowrap hover:underline gap-1 items-center overflow-auto w-[99%]  text-xs sm:text-sm font-semibold">
                <Feather width={25} height={25} className=" hidden xs:inline-block" />
                {data.length > 0 && data[0].body}

            </Link>
            {/* {data.length > 0 && (
                <Link href={data[0].link_url} className="flex items-end gap-1 flex-nowrap whitespace-nowrap font-bold text-xs sm:text-sm mt-2 sm:mt-0 underline hover:text-gray-200">
                    {data[0].link_text}
                </Link>
            )} */}
        </div>
        <span className="hover:text-white text-white/80 cursor-pointer mt-2 sm:mt-0 ml-3" onClick={() => setClosing(true)}><X className="" size={20} /></span>
    </div>
    return (
        announcement
    );
};

export default Announcement;