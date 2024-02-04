
'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateJsonFile } from '@/helpers/updateJSONData';
import OrderModel from '@/components/orderModel';
import CustomerPageAddProducts from '@/components/CustomerPageAddProducts';
import CustomerPageAddCourses from '@/components/CustomerPageAddCourses';
import CustomerPageAddPrintServices from '@/components/CustomerPageAddPrintServices';
import Loading from '@/components/Loading';
import LoadingScreen from '@/components/LoadingScreen';
import FormattedPrice from '@/components/FormattedPrice';

const CustomerPage = () => {
  const router = useRouter();
  const searchPar = useSearchParams();
  const customerId = searchPar?.get("id");
  const data = searchPar?.get("data");

  const initialCustomerData = typeof data === 'string' ? JSON.parse(data) : null;
  const [customerData, setCustomerData] = useState(initialCustomerData);
  const [currentTab, setCurrentTab] = useState(0);


  const tabs = [
    { content: <CustomerPageAddProducts setCustomerData={setCustomerData} customerData={customerData} />, label: "Product" },
    { content: <CustomerPageAddCourses setCustomerData={setCustomerData} customerData={customerData} />, label: "Course" },
    { content: <CustomerPageAddPrintServices setCustomerData={setCustomerData} customerData={customerData} />, label: "Print Service" },
  ]
  return (
    <div className="m-8">
      <h1 className="text-4xl font-semibold mb-6 text-center">Customer ID: {customerId}</h1>

      {customerData && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-8">Customer Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-gray-600 mb-2">Full Name:</p>
              <p className="font-semibold">{customerData.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Age:</p>
              <p className="font-semibold">{customerData.age} Years(s)</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Phone No.:</p>
              <p className="font-semibold">{customerData.phone}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Address:</p>
              <p className="font-semibold">{customerData.address}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-2">Education:</p>
              <p className="font-semibold">{customerData.faculty}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Total Purchase Transactions:</p>
              <p className="font-semibold"><FormattedPrice amount={customerData.total_purchase_transactions || 0} /></p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-8">Transactions</h2>

            <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 bg-slate-200 h-[400px] overflow-auto mb-4 lg:mr-8">
                {tabs[currentTab].content}
              </div>

              <div className="flex flex-col  space-y-4 lg:w-1/4">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTab(index)}
                    className={`py-3 px-5 rounded focus:outline-none ${currentTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-300'}`}
                  >
                    Sell {tab.label}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;

