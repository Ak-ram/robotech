// In your pages/admin/[customerId]/id_[customerId].tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CustomerPage = () => {
  const router = useRouter();
  // const { customerId, data } = router.query;
  const searchPar = useSearchParams();
  const idString = searchPar?.get("id");
  const data = searchPar?.get("data");
  // Parse data based on its type
  const customerData = typeof data === 'string' ? JSON.parse(data) : null;

  useEffect(() => {
    // Access customerData and perform any necessary actions
    console.log(customerData);
  }, [customerData]);

  return (
    <div>
      <h1>Customer ID: {idString}</h1>
      <h1>Customer ID: {customerData.fullName}</h1>
      <h1>Customer ID: {customerData.phone}</h1>
      {/* Render customerData in your component */}
    </div>
  );
};

export default CustomerPage;
