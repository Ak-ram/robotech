// pages/admin/[customerId]/page.tsx
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { customerId } = router.query;

  return <h1>Page for customer ID: {customerId}</h1>;
};

export default Page;
