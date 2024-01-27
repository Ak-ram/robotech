'use client'
import { getAnnouncementData } from "@/helpers/getAnnouncement";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AnnouncementT {
    body: string;
    link_text: string;
    link_url: string;
}

const Announcement = () => {
    const [data, setData] = useState<AnnouncementT[]>([]);

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

    return (
        <div className="bg-gray-900 text-white py-3 px-4">
            <div className="container mx-auto flex items-center justify-between">
                <p className="text-sm font-semibold">
                    {data.length > 0 && data[0].body}
                </p>
                {data.length > 0 && (
                    <Link href={data[0].link_url} className="font-bold text-sm underline hover:text-gray-200">
                        {data[0].link_text}

                    </Link>
                )}
            </div>
        </div>
    );
};

export default Announcement;