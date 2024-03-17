'use client'
import { useEffect, useState } from "react";
import { Feather, X } from "lucide-react";
import Link from "next/link";
import supabase from "../supabase/config";

interface AnnouncementT {
    body: string;
    link_text: string;
    link_url: string;
}

const Announcement = () => {
    const [data, setData] = useState<AnnouncementT[]>([]);
    const [closed, setClosing] = useState<Boolean>(false);

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

    let announcement = closed ? null : (
        <div className="items-start sm:items-center bg-blue-500 text-white py-3 px-2 sm:px-5 flex">
            <div className="container w-[90%] mx-auto sm:gap-3 flex flex-col items-start sm:flex-row sm:items-center">
                <Link href={data[0]?.link_url || ''}
                    className="flex flex-nowrap hover:underline gap-1 items-center overflow-auto w-[99%] text-xs sm:text-sm font-semibold">
                    <Feather width={25} height={25} className="hidden xs:inline-block" />
                    {data.length > 0 && data[0].body}

                </Link>
            </div>
            <span className="hover:text-white text-white/80 cursor-pointer mt-2 sm:mt-0 ml-3" onClick={() => setClosing(true)}>
                <X className="" size={20} />
            </span>
        </div>
    );

    return <>{data.length > 0 && data[0].body && announcement}</>;
};

export default Announcement;
