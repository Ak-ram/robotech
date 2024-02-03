
'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateJsonFile } from '@/helpers/updateJSONData';
import OrderModel from '@/components/orderModel';
import CustomerPageAddProducts from '@/components/CustomerPageAddProducts';
import CustomerPageAddCourses from '@/components/CustomerPageAddCourses';
import CustomerPageAddPrintServices from '@/components/CustomerPageAddPrintServices';

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
    { content: 'tab 4', label: "Drink" },
  ]
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Customer ID: {customerId}</h1>

      {customerData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* ... (Your existing code) */}
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-2">Full Name:</p>
              <p className="font-semibold">{customerData.fullName}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-2">Phone No.:</p>
              <p className="font-semibold">{customerData.phone}</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
            <div className='flex items-center justify-between'>
              {tabs.map((tab, index) => <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              // onClick={() => setShowAddOrderModal(true)}
              >
                Sell {tab.label}
              </button>)}
            </div>
            <section>
              {tabs[currentTab].content}
            </section>



          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;

