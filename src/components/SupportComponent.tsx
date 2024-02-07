'use client'
import React, { useState, useEffect } from 'react';
import faq from '@/assets/Faq.png';
import Image from 'next/image';
import { Activity, ChevronDown } from 'lucide-react';
import { getFaq } from '@/helpers/getFaq';

// Define the type for your FAQ item
interface FAQItem {
  question: string;
  answer: string;
  open: boolean; // Add the 'open' property to the FAQItem type
}

function SupportComponent() {
  const [data, setData] = useState<FAQItem[]>([]); // Set the type for 'data'

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const p = await getFaq();
        setData(p);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (typeof window !== 'undefined') {
      // Run the effect only in the browser environment
      fetchFaq();
    }
  }, []);

  const toggleAnswer = (index: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], open: !newData[index].open };
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-white rounded py-1 mt-3">
      <div>
        <div className="flex items-center justify-center gap-2 mx-auto text-center px-4 mt-8 text-2xl text-indigo-900 font-semibold">
          <Activity className='bg-slate-100/80 w-12 h-12 p-2 rounded-full text-rose-400' size={30} /> Frequently Asked Questions
        </div>
        <dl style={{ direction: 'rtl' }} className="mt-8 mx-auto max-w-screen-sm lg:max-w-screen-lg flex flex-col lg:flex-row lg:flex-wrap">
          <div className="lg:w-1/2" >
            {data &&
              data.slice(0, Math.ceil(data?.length / 2)).map((item, i) => (
                <div
                  className="question-and-answer select-none cursor-pointer border-2 mx-8 my-3 rounded-lg group"
                  onClick={() => toggleAnswer(i)}
                  key={`${i}_${item?.question}`}
                >
                  <dt className={`${item.open ? "bg-white" : "hover:bg-slate-100"} py-3 px-2 rounded`}>
                    <div className="flex justify-between items-center">
                      <div className="text-indigo-800 font-semibold cursor-pointer">
                        {item?.question}
                      </div>
                      <div>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </dt>
                  <dd
                    className={`answer bg-white rounded text-gray-700 ${!item.open
                      ? 'h-0 overflow-hidden  duration-300'
                      : 'h-fit  py-3 px-2 border-t -max-height duration-300'
                      }`}
                  >
                    {item?.answer}
                  </dd>
                </div>
              ))}
          </div>
          <div className="lg:w-1/2" >
            {data &&
              data.slice(Math.ceil(data?.length / 2), data?.length).map((item, i) => (
                <div
                  className="question-and-answer select-none cursor-pointer border-2 mx-8 my-3 rounded-lg group"
                  onClick={() => toggleAnswer(i + Math.ceil(data?.length / 2))}
                  key={`${i}_${item?.question}`}
                >
                  <dt className={`${item.open ? "bg-white" : "hover:bg-slate-100"} py-3 px-2 rounded`}>
                    <div className="flex justify-between items-center">
                      <div className="text-indigo-800 font-semibold cursor-pointer">
                        {item?.question}
                      </div>
                      <div>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </dt>
                  <dd
                    className={`answer bg-white rounded text-gray-700 ${!item.open
                      ? 'h-0 overflow-hidden  duration-300'
                      : 'h-fit  py-3 px-2 border-t -max-height duration-300'
                      }`}
                  >
                    {item?.answer}
                  </dd>
                </div>
              ))}
          </div>
        </dl>
      </div>
    </div>

  );
}

export default SupportComponent;
