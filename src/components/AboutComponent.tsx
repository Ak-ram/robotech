// Assuming that 'getAboutData' returns the correct type
'use client'
import { getAboutData } from '@/helpers/getAboutData';
import { ListTodo } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
        <div className="py-16 ">
            <div className="mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                        Robotech space
                    </p>
                </div>
                <h2 className="max-w-lg mb-6 mx-auto font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <svg
                            viewBox="0 0 52 24"
                            fill="currentColor"
                            className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                        >
                            <defs>
                                <pattern
                                    id="27df4f81-c854-45de-942a-fe90f7a300f9"
                                    x="0"
                                    y="0"
                                    width=".135"
                                    height=".30"
                                >
                                    <circle cx="1" cy="1" r=".7" />
                                </pattern>
                            </defs>
                            <rect
                                fill="url(#27df4f81-c854-45de-942a-fe90f7a300f9)"
                                width="52"
                                height="24"
                            />
                        </svg>
                        <span className="relative">A</span>
                    </span>{' '}
                    Mechatronics Engineering Space
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                    We integrate cutting-edge technologies for precision and innovation in spacecraft design, robotics, and control systems.                </p>
            </div>
            <div className="grid gap-8 row-gap-10 md:grid-cols-2">
                {data &&
                    data.map((item) => (
                        <div key={item?.id} className="border p-2 rounded-lg flex flex-col sm:flex-row">
                            <div className="mr-4">
                                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-designColor">
                                    <ListTodo />
                                </div>
                            </div>
                            <div>
                                <h6 className="mb-3 text-xl font-bold leading-5">{item?.title}</h6>
                                <p className="mb-3 text-sm text-gray-900">{item?.description}</p>

                                <Link
                                    href={item?.link_url}
                                    className="w-20 items-center justify-center bg-black text-white p-2 rounded-md inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                >
                                    {item?.link_text.charAt(0).toUpperCase() + item?.link_text.slice(1).toLowerCase()}
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AboutComponent;
