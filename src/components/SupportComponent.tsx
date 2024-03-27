'use client'
import React, { useState, useEffect } from 'react';
import { Activity, ChevronDown } from 'lucide-react';
import supabase from '../supabase/config';

// Define the type for your FAQ item
interface FAQItem {
  id: number;
  created_at: string;
  question: string;
  answer: string;
  open: boolean; // Add the 'open' property to the FAQItem type
}

function SupportComponent() {
  const [data, setData] = useState<FAQItem[]>([]); // Set the type for 'data'

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const p = await supabase
          .from('faq')
          .select();
        setData(p.data!);
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
    <div className="min-h-[400px]  rounded">
      <div>
        <div className="flex bg-slate-100 py-2 items-center justify-center gap-1 mx-auto text-center px-4 text-xl md:text-2xl text-indigo-900 font-semibold">
          <Activity className='bg-white w-12 h-12 p-2 rounded-full text-rose-400' size={30} /> Frequently Asked Questions
        </div>
        <dl style={{ direction: 'rtl' }} className="mt-2 mx-auto flex flex-col lg:flex-row lg:flex-wrap">
          <div className="lg:w-1/2">
            {data &&
              data.slice(0, Math.ceil(data?.length / 2)).map((item, i) => (
                <div
                  className="question-and-answer select-none cursor-pointer border-2 mx-2 my-2 rounded-lg group"
                  onClick={() => toggleAnswer(i)}
                  key={`${i}_${item?.question}`}
                >
                  <dt className={`py-3 mb-1 px-2 rounded border border-slate-300 ${item.open ? "bg-white" : "hover:bg-white"}`}>
                    <div className="flex justify-between items-center">
                      <div className="text-indigo-800 text-sm xs:text-base font-semibold cursor-pointer">
                        {item?.question}
                      </div>
                      <div>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </dt>
                  <dd
                    className={`answer overflow-hidden  bg-white rounded text-gray-700 text-sm xs:text-base ${!item.open
                      ? 'h-0  duration-300'
                      : 'h-fit  py-3 px-2 border-t -max-height duration-300'
                      }`}
                  >
                    {item?.answer}
                  </dd>
                </div>
              ))}
          </div>
          <div className="lg:w-1/2">
            {data &&
              data.slice(Math.ceil(data?.length / 2), data?.length).map((item, i) => (
                <div
                  className="question-and-answer select-none cursor-pointer border-2 mx-2 my-2 rounded-lg group"
                  onClick={() => toggleAnswer(i + Math.ceil(data?.length / 2))}
                  key={`${i}_${item?.question}`}
                >
                  <dt className={`py-3 mb-1 px-2 rounded border border-slate-300 ${item.open ? "bg-white" : "hover:bg-white"}`}>
                    <div className="flex justify-between items-center">
                      <div className="text-sm xs:text-base text-indigo-800 font-semibold cursor-pointer">
                        {item?.question}
                      </div>
                      <div>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </dt>
                  <dd
                    className={`answer overflow-hidden transition-height duration-300 bg-white rounded text-gray-700 text-sm xs:text-base ${!item.open
                      ? 'h-0  py-0 px-0 '
                      : 'h-fit  py-3 px-2 border-t -max-height'
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
