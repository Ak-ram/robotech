'use client'
import { ReactNode, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Feather, X } from "lucide-react";
import Link from "next/link";
import supabase from "../supabase/config";

interface AnnouncementT {
    body: string;
    link_text: string;
    link_url: string;
}

const Announcement = () => {
    const [data, setData] = useState<AnnouncementT[]>([]);
    const [isExpand, setExpand] = useState<Boolean>(false);
    const [show, setShow] = useState<Boolean>(false);

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
                <span className="hover:text-white text-white/80 cursor-pointer" onClick={expandAd}>
                    {isExpand ? <ChevronUp className="" size={20} /> : <ChevronDown className="" size={20} />}
                </span>
                <span className="ml-2 hover:text-white text-white/80 cursor-pointer" onClick={() => setShow(false)}>
                    <X className="" size={20} />
                </span>
            </div>
        );
    }

    return <>{show ? <div>{announcement}{<div className={`${isExpand ? 'h-44' : 'h-0'} transition-all bg-indigo-400`}>
        <img src={'https:robotechspace.com/' + data[0]?.link_url} />
    </div>}</div>
        : null};</>
};

export default Announcement;