'use client'
import React, { useEffect, useState } from 'react';
import { FileQuestion, Info, ListTodo } from 'lucide-react';
import Link from 'next/link';
import { getAboutData } from '@/helpers/getAboutData';

function AboutComponent() {
    // Assuming this structure fits your data
    interface AboutData {
        id: string;
        title: string;
        description: string;
        link_url: string;
        link_text: string;
    }

    const [data, setData] = useState<AboutData[]>([]);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const aboutDataList = await getAboutData();
                setData(aboutDataList);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };

        if (typeof window !== 'undefined') {
            // Run the effect only in the browser environment
            fetchAboutData();
        }
    }, []);

    return (
        <div className="py-10 px-5 bg-gray-100">
            <div className="container mx-auto px-4 md:px-0">
                <div className="mb-10 text-center">
                    <p className="inline-block px-3 py-px mb-4 text-xs font-bold tracking-wider text-designColor uppercase rounded-full bg-teal-accent-400">
                        Robotech space
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Mechatronics Engineering Space</h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        We integrate cutting-edge technologies for precision and innovation in spacecraft design, robotics, and control systems.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    {data.map((item) => (
                        <div key={item.id} className="border shadow-lg border-blue-400 bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded bg-blue-100">
                                <Info className="text-blue-600" size={35} />
                            </div>
                            <div>
                                <h6 className="text-xl font-bold uppercase leading-5 text-gray-800 mb-3">{item.title}</h6>
                                <p className="text-sm text-gray-700 mb-3">{item.description}</p>
                                <Link href={item.link_url} className="inline-block bg-indigo-600 text-white text-sm py-2 px-4 rounded-md font-semibold transition-colors duration-200 hover:bg-indigo-700">
                                        {item.link_text.charAt(0).toUpperCase() + item.link_text.slice(1).toLowerCase()}
                                    
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AboutComponent;
