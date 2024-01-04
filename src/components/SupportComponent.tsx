'use client'
// Import the required types
import React, { useState, useEffect } from 'react';
import faq from '@/assets/Faq.png';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
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
        console.log(p);
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
    <div className="min-h-screen">
      <div>
        <div className="mt-8 opacity-75">
          <Image className="m-auto" src={faq} alt="faq" width={600} height={400} />
        </div>
        <div>
          <div className="mx-auto text-center px-4 mt-8 text-2xl text-indigo-900 font-semibold">
            Frequently Asked Questions
          </div>
          <dl className="mt-8 mx-auto max-w-screen-sm lg:max-w-screen-lg flex flex-col lg:flex-row lg:flex-wrap">
            {data &&
              data.map((item, i) => (
                <div className="lg:w-1/2" key={`${i}_${item?.question}`}>
                  <div
                    className="question-and-answer select-none cursor-pointer border-2 mx-8 my-3 px-6 py-4 rounded-lg group"
                    onClick={() => toggleAnswer(i)}
                  >
                    <dt className="">
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
                      className={`answer mt-2 leading-snug text-gray-700 ${!item.open
                        ? 'max-h-0 overflow-hidden transition-max-height duration-300'
                        : 'max-h-screen border-t pt-3 transition-max-height duration-300'
                        }`}
                    >
                      {item?.answer}
                    </dd>
                  </div>
                </div>
              ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default SupportComponent;
